# 3. Security — threat model and the boundaries that hold

> **One sentence:** the architecture's safety comes from typed outputs, private subnets, and audit logging — not from prompt engineering tricks.

The layers page and the data-flow page defined what the system is. This page defines **what it defends against, what it does not, and why the defenses are at the network and contract boundaries, not inside the prompt**.

---

## The threat model — three profiles

A threat model is only useful if it names the adversary. Here are the three profiles this architecture is designed to handle, in increasing severity. Anything outside these three is out of scope; that is stated explicitly at the end.

### 1. The curious operator

**Who:** a legitimate operator who can submit requests and read their own responses.

**Can do:**

- Submit any prompt within the operator form.
- Read the model's response to their own request.
- See their own request id, latency, and outcome in the audit log (if you expose it to operators).

**Cannot do:**

- Read other operators' prompts or responses — log namespace is per-tenant.
- Bypass the output schema — the model's response is validated against a Pydantic model before it leaves the Workflow layer; malformed outputs are rejected, not passed through.
- Call the model directly — the application server is the only client LM Studio accepts.
- Read documents the operator is not authorized to see — see [prompt injection](#prompt-injection-and-the-output-schema) below.

**Why this profile is contained:** every layer above the model is a typed contract. Free-form text is allowed only inside the model's own response object. A schema-violating response is a server error, not a leak.

### 2. The compromised application server

**Who:** an attacker who has gained code execution on the application server but not on the LM Studio host.

**Can do:**

- Call LM Studio directly from the application server (it is the only host LM Studio will accept connections from).
- Forge audit log rows.
- Read the operator's prompts and responses in flight.

**Cannot do:**

- Exfiltrate the model weights — the LM Studio host is on a separate subnet with no internet egress.
- Reach any other internal service that the application server cannot already reach — the firewall rules are the same.
- Persist outside the application server's blast radius — model runtime is untouched, retrieval store is on a third subnet, the audit log writes to a fourth.

**Why this profile is contained:** the network topology is the defence. Even with full application-server compromise, the attacker has not gained a path to data they did not already have. The blast radius equals the application's existing permissions.

### 3. The malicious prompt

**Who:** an operator, an upstream ticketing system, or a chunk in the retrieval store whose text is crafted to make the model behave outside its contract.

**Can do:**

- Try to make the model return a category it should not return (e.g. force `priority=low` on a critical incident).
- Try to extract the system prompt verbatim.
- Try to make the model reveal chunks the operator is not authorized to read (RAG case).
- Try to make the model emit free-form text into a downstream system that expects a typed object.

**Cannot do (given the architecture's defaults):**

- Return a typed object the schema does not permit. The Pydantic model rejects unknown fields and values outside the allowed set.
- Bypass the retrieval source filter. The Workflow module passes an explicit `source_filter` to the retriever; chunks from unauthorized sources are not even retrieved.
- Persist across requests. Each request is independent. There is no shared state in the model between calls.

**Why this profile is contained:** the output schema is the first line of defence. Prompt injection that succeeds in producing free-form text still fails at the schema-validation step, and the caller gets an error, not a payload. The retrieval source filter is the second line; even a successful injection cannot retrieve data the operator is not authorized for.

---

## Network placement

```text
                          Internet
                              │
                              │  (egress: blocked except monitoring/CI)
                              │
                       ┌──────┴──────┐
                       │  Firewall   │
                       └──────┬──────┘
                              │
                ┌─────────────┴─────────────┐
                │   Operator subnet          │
                │   10.0.1.0/24              │
                │   - Operator workstations  │
                │   - Operator VPN clients   │
                └─────────────┬─────────────┘
                              │  (allow 443 in, no other inbound)
                              │
                ┌─────────────┴─────────────┐
                │   Application subnet       │
                │   10.0.2.0/24              │
                │   - Application server     │
                │   - Internal API           │
                │   - Workflow modules       │
                └─────────────┬─────────────┘
                              │  (allow 1234/tcp to inference subnet only)
                              │
                ┌─────────────┴─────────────┐
                │   Inference subnet         │
                │   10.0.3.0/24              │
                │   - LM Studio / vLLM       │
                │   - NO internet egress     │
                └─────────────┬─────────────┘
                              │  (allow 8000/tcp to retrieval subnet only)
                              │
                ┌─────────────┴─────────────┐
                │   Retrieval subnet         │
                │   10.0.4.0/24              │
                │   - ChromaDB               │
                │   - Document loader jobs   │
                │   - NO internet egress     │
                └────────────────────────────┘
```

Three rules to remember:

1. **Inference and retrieval subnets have no internet egress.** Period. The model does not call out. The retriever does not call out.
2. **The firewall is allow-list, not deny-list.** The application subnet can only reach the inference subnet on the LM Studio port. The inference subnet can only reach the retrieval subnet on the ChromaDB port.
3. **Monitoring is the only exception, and it goes the other way.** Prometheus scrapes the application server; the application server does not push to a third-party SaaS. Keep monitoring pull-based.

---

## Audit logging

Every model call produces a log row. The row is written by the Application layer **before** the response is returned to the operator, so a crashed response still leaves a trail.

| Field | Type | Notes |
| --- | --- | --- |
| `request_id` | UUID | Generated at the Edge, propagated through every layer |
| `actor` | string | Operator id or system principal |
| `tenant` | string | Multi-tenant deployments — required |
| `module` | string | Which Workflow module was called (e.g. `isp_classifier.triage`) |
| `model` | string | Model version string (e.g. `qwen2.5-1.5b-instruct-gguf-q4_k_m`) |
| `input` | typed object | Serialized input, **redacted** of any field marked `secret` |
| `output` | typed object | Serialized output, validated against the output schema |
| `latency_ms` | int | End-to-end, Application edge to Application edge |
| `prompt_tokens` | int | From the model's `usage` field |
| `completion_tokens` | int | From the model's `usage` field |
| `agreement_score` | float \| null | Sampled agreement with the eval set; null for unsampled |
| `outcome` | enum | `ok`, `schema_validation_failed`, `upstream_timeout`, `rate_limited`, `auth_failed` |
| `timestamp` | RFC 3339 | UTC |

**What is NOT in the log:**

- Secrets (API keys, passwords, tokens). Stripped at the Edge before the log row is built.
- Raw operator text in jurisdictions where the regulator requires it be redacted. The `redact_pii` workflow rewriter is the Workflow layer's job, not the logger's.
- Free-form model text in deployments where the output schema is the contract. The schema-validated typed object is logged, not the model's raw text.

The log destination is **your** log store — your SIEM, your retention, your jurisdiction. The model vendor never sees it.

---

## Prompt injection and the output schema

Prompt injection is the most-discussed attack on LLM systems and the least well-handled by prompt engineering. The architecture's answer is structural, not linguistic:

1. **The output is a typed object, not text.** The model's raw text response is parsed and validated against a Pydantic model. Unknown fields are dropped. Values outside the allowed set are rejected. A successful injection that produces free-form text fails at this step, and the caller gets a `schema_validation_failed` outcome, not a payload.
2. **The system prompt is server-side.** The Edge does not control the system prompt. The operator submits user-side fields only. The system prompt lives in the Workflow module's source code, which the operator cannot edit from the Edge.
3. **Retrieval is filtered, not trusted.** The Workflow module passes an explicit `source_filter` to the retriever. Chunks from sources outside the filter are not retrieved; the model never sees them. This means a poisoned chunk in a public document cannot leak a chunk from a restricted document.
4. **Agreement-rate monitoring catches drift.** The eval set is run on a sample of production traffic (5% by default). If the model's outputs start agreeing less with the eval set's expected answers, that is the drift signal — and a successful prompt-injection campaign shows up as drift before it shows up as a leak.
5. **Per-tenant log namespacing.** A successful injection on one tenant's data does not let the attacker read another tenant's prompts or responses. Logs are partitioned by `tenant`.

For the deep treatment of agreement-rate monitoring, see [Adoption → Build](../adoption/build.md), Workstream 3 (Observability).

---

## Model provenance and supply chain

The model weight is the largest single piece of code in the system. Treat it the same way you treat a third-party binary dependency.

- **Pinned model version.** The LM Studio host loads exactly one model at a time, and the deploy record includes the model id, the quantization, and the SHA-256 of the GGUF.
- **Frozen eval set on every model change.** Promoting a new model version — even the same model with a newer quantization — re-runs the frozen eval set. If agreement drops below the bar, the promotion is blocked.
- **Source allow-list.** Model weights are pulled from one of: Hugging Face (with the org and repo pinned), a local mirror, or an offline copy. Air-gapped deployments load from offline media.
- **No runtime model download.** The model is loaded at host startup. The host does not phone home at request time. If a model version mismatch is detected at startup, the host refuses to start.

---

## What this architecture does NOT defend against

Stating the boundary so the reader knows where to invest additional controls.

- **A determined insider with shell on the LM Studio host.** They can read prompts, completions, and the model weights. Mitigation is physical security, disk encryption, and host-level access control — not architecture.
- **Physical access to the GPU box.** They can pull the drives. Mitigation is physical security.
- **Side-channel model extraction.** A well-resourced attacker with timing or power-analysis access to the host can in principle extract weight information. Out of scope for this threat model.
- **A bug in the model itself.** Models can produce biased, factually wrong, or unsafe outputs regardless of the prompt. The eval set and agreement monitoring are how this is detected; the architecture cannot prevent it.
- **Social engineering of an operator.** If an operator can be convinced to submit a harmful prompt, no schema can stop them. The audit log is the trace.

If your threat model includes any of these, you need additional controls on top of this architecture — typically a separate data-loss-prevention layer, hardware security modules, or a fully air-gapped deployment with a dedicated security operations team.

---

## What this page is NOT

- **Not a compliance certification.** Local-first is a strong default for regulated workloads, but it is not, by itself, a substitute for whatever your regulator requires (GDPR, HIPAA, Bangladesh Bank ICT guidelines, etc.). Map the audit log fields and the network placement to your control framework.
- **Not a substitute for application-layer security.** Authentication, authorization, input validation, and rate limiting live in the Application layer and are out of scope for this page.
- **Not a guide to securing LM Studio itself.** The LM Studio project publishes its own hardening notes; this page assumes the host is hardened by your normal server-baseline process.

---

## See also

- [Architecture overview](index.md) — the five-layer stack
- [Layers](layers.md) — what each layer is responsible for
- [Data flow](data-flow.md) — what crosses each boundary
- [Adoption → Build](../adoption/build.md) — observability and on-call runbooks
- [Why AI Work Flow for Business?](../why-ai-work-flow.md) — the data-residency argument
