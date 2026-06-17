# Reference — Glossary

> **Audience:** anyone reading the docs who hits a term they don't recognise.
> **Conventions:** one sentence per term, then a link to the canonical page where it is used. Terms are alphabetised. Acronyms are spelled out on first use; if you don't know one, search the page (Ctrl+F).

---

## A

**Actor**
The caller of a module's `run()` method. Either `human` (a person, with a name and a tenant) or `service` (a downstream system, with a service account and a tenant). Captured in [`ModuleMeta.actor`](python-api.md#the-workflowrun-contract) for the audit log.
*First used in:* [Python API: the Workflow.run() contract](python-api.md#the-workflowrun-contract)

**Adoption journey**
The four phases a deployment moves through: Discover, Pilot, Build, Scale. Each phase has its own page in the Adoption section, and each case study maps its timeline to a phase.
*First used in:* [Adoption: overview](../adoption/index.md)

**Audit log**
A JSON-lines file written by the `aiwf` runtime. Every module call produces one row with the request id, the actor, the module version, the prompt version, the model id, the latency, the validator rejections, and the final output. The log is the source of truth for "what did the system actually do at 14:23 on Tuesday?".
*First used in:* [Reference: conventions](conventions.md#5-audit-log-format)

**aiwf**
The short name for the deployment described in this site. The CLI is `aiwf`; the Python package is `aiwf`. Pronounced "A-I-W-F" or "ay-wiff" — both are fine.
*First used in:* [Reference: CLI](cli.md)

---

## B

**Bar**
A floor, not a target. A CISO-signed-off number that a metric must meet or exceed for a release to ship. The bar moves only when the CISO moves it.
*First used in:* [Reference: benchmarks: the bar](benchmarks.md#4-the-bar-and-why-it-is-the-bar)

**BM25**
A classic lexical retrieval method, used in the bank's RAG pipeline alongside vector search. The hybrid score is `0.5 * bm25 + 0.5 * vector`. BM25 alone is good for "exact term" queries; vector alone is good for "semantic" queries; the hybrid is good for both.
*First used in:* [Case study: bank IT](../case-studies/bank-it.md)

**Build (phase)**
The third phase of the adoption journey. 24/7 uptime, observability, on-call. The factory case study is the canonical Build-phase example.
*First used in:* [Adoption: build](../adoption/build.md)

---

## C

**Citation-in-set**
A property of an RAG response: every `citation.chunk_id` in the response must be in the `retrieval_trace` (the set of chunks the model was actually given). The validator rejects responses that fail this. 100% citation-in-set is the bank CISO's bar.
*First used in:* [Reference: prompts: RAG with citations](prompts.md#2-rag-with-citations)

**Containment check**
A substring test applied to fields of a `ShiftSummary`: at least 90% of the tokens in the field must appear in the input note. It is what makes the factory's summarization task a *summarization* task and not a *generation* task. The model is being asked to extract, not to invent.
*First used in:* [Reference: prompts: shift summary](prompts.md#3-shift-summary-strict-schema)

---

## D

**Discover (phase)**
The first phase of the adoption journey. The team identifies a problem, runs a feasibility study, decides if a model is the right tool. No production deployment.
*First used in:* [Adoption: discover](../adoption/discover.md)

---

## E

**Engineer-in-the-loop**
The deployment pattern where a model produces a draft, a human reviews it, and the human's decision is what goes to the customer. The model is a productivity multiplier for the engineer, not a replacement. The ISP tier-1 triage is the canonical example: the model classifies; the engineer dispatches.
*First used in:* [Case study: ISP support](../case-studies/isp-support.md)

**Eval set**
A frozen, hand-labelled set of cases used to grade a module. Eval sets are checked into the repo under `eval/`. Adding a new module requires a new eval set with a CISO-signed bar.
*First used in:* [Reference: benchmarks: the five frozen eval sets](benchmarks.md#2-the-five-frozen-eval-sets)

---

## F

**FDE (Forward Deployed Engineer)**
An engineer embedded with a customer to ship custom AI agents on the customer's own data and infrastructure. FDEs are the role that emerged from cloud-model companies (Palantir, OpenAI, Anthropic); in local-LLM enterprises they are essential because there is no SaaS escape hatch for the data — the model has to run on the customer's hardware, the FDE has to be on the customer's site, and the handoff is the deliverable. The four phases in [adoption](../adoption/index.md) are the FDE playbook, written in operational language.
*First used in:* [Adoption: Forward Deployed Engineering](../adoption/fde.md)

---

**Frozen eval set**
An eval set that is not edited after it is merged. The cases, the gold labels, the bar — all of it is fixed. This is what makes a number reproducible. If the set is edited, the old number is no longer comparable to the new one.
*First used in:* [Reference: benchmarks: the eval set contract](benchmarks.md#3-the-eval-set-contract)

---

## G

**Golden path**
The recommended way to deploy, including the model choice, the prompt, the validators, the eval set, and the bar. The "non-golden path" is allowed but the case studies do not document it.

---

## H

**Hallucinated content**
In an RAG response, any claim that is not in a cited retrieved passage. The bar is 0%. The validator enforces it. A response that says "the system requires X" without a citation is a hallucination, even if X is true.
*First used in:* [Reference: prompts: RAG with citations](prompts.md#2-rag-with-citations)

---

## L

**LM Studio**
A local inference server. The site assumes the model runs on LM Studio, accessible at `http://localhost:1234/v1`. The `LMStudioClient` is a thin wrapper around the OpenAI-compatible `/chat/completions` endpoint with retry and health-check.
*First used in:* [Reference: Python API: LM Studio client](python-api.md#the-lm-studio-client)

---

## M

**Module**
A single-purpose wrapper around a model call. The three production modules are `sla_classifier`, `qwen_rag`, and `factory_summary`. Each module has its own prompt, its own validators, its own eval set, and its own `ModuleMeta` audit fields.
*First used in:* [Reference: Python API: the module contracts](python-api.md#the-module-contracts)

**ModuleMeta**
The audit fields added to every module response by the application layer. Includes `request_id`, `actor`, `module_version`, `prompt_version`, `model_id`, `latency_ms`, `validator_rejections`. The audit log row is built from `ModuleMeta` + the parsed output.
*First used in:* [Reference: Python API: the Workflow.run() contract](python-api.md#the-workflowrun-contract)

---

## P

**p95**
The 95th percentile of a latency distribution. The ISP case study's bar is 3 s p95. "p95 under 3 s" means 95% of requests complete in 3 s; 5% can be slower.
*First used in:* [Case study: ISP support](../case-studies/isp-support.md)

**Pilot (phase)**
The second phase of the adoption journey. A single team, a single workflow, a single bar. The bank's IT helpdesk is the canonical Pilot-phase example.
*First used in:* [Adoption: pilot](../adoption/pilot.md)

**Pydantic**
The Python validation library used for every typed object on this site. `ChatRequest`, `ChatResult`, `TriageOutput`, `RAGOutput`, `ShiftSummary` are all Pydantic models. The validator runs on every response.
*First used in:* [Reference: Python API: the typed contracts](python-api.md#the-typed-contracts)

---

## R

**RAG**
Retrieval-Augmented Generation. The pattern of retrieving relevant passages from a corpus and passing them to the model as context. The bank's helpdesk is the canonical example.
*First used in:* [Case study: bank IT](../case-studies/bank-it.md)

**Request id**
A UUID assigned to each `run()` call. Returned to the caller, written to the audit log, attached to the user-visible response. The request id is the join key for "what did the user see, what did the model produce, and what did the validator say".
*First used in:* [Reference: Python API: the Workflow.run() contract](python-api.md#the-workflowrun-contract)

**Retrieval trace**
The list of chunk_ids the model was given in the prompt, even if not cited in the response. Used to validate that every cited chunk_id is one the model actually saw.
*First used in:* [Reference: prompts: RAG with citations](prompts.md#2-rag-with-citations)

---

## S

**Scale (phase)**
The fourth phase of the adoption journey. Multiple teams, multiple workflows, a shared platform. The site does not have a case study for this phase yet; the work is ongoing.
*First used in:* [Adoption: scale](../adoption/scale.md)

**Schema validation**
The first stage of validation: the response must parse as the module's Pydantic model. A response that is valid JSON but not a `TriageOutput` is rejected here.
*First used in:* [Reference: Python API: the module contracts](python-api.md#the-module-contracts)

---

## T

**Tenant id**
An identifier for the customer organisation. Multi-tenant deployments route by tenant id, isolate data by tenant id, and audit by tenant id. The bank's helpdesk is single-tenant; the ISP's triage is single-tenant; the factory is single-tenant. Tenant isolation is a prerequisite for the bank and ISP deployments to grow into multi-tenant.
*First used in:* [Reference: Python API: the Workflow.run() contract](python-api.md#the-workflowrun-contract)

**Triage**
The act of routing a ticket to the right queue. The ISP's tier-1 triage is the canonical example. The model produces a `TriageOutput` (category + rationale + free-text confidence); the application looks up the priority in a matrix and writes the ticket.
*First used in:* [Case study: ISP support](../case-studies/isp-support.md)

**Typed object**
A Pydantic model that constrains the shape and types of a value. "The response is a typed object" means "the response must parse as `TriageOutput` (or whichever model); anything that does not parse is rejected." The site uses typed objects as a first-class design tool.
*First used in:* [Reference: Python API: the typed contracts](python-api.md#the-typed-contracts)

---

## V

**Validator**
A function that runs after the model produces a response. The site has three kinds:
- **Schema validator** (Pydantic). "Does this parse as `TriageOutput`?"
- **Citation-in-set validator** (RAG). "Are all cited chunk_ids in the retrieval trace?"
- **Containment-check validator** (shift summary). "Are all the tokens in the field in the input?"

A response that fails any validator is rejected. The model is re-prompted once; on the second failure, the system falls back to a safe default ("please open a ticket" for RAG, `category=other` for triage, an empty summary for shifts).
*First used in:* [Reference: Python API: the module contracts](python-api.md#the-module-contracts)

**Version (module)**
The version of a module's code, prompt, and schema, in semver. `module_version` is a `ModuleMeta` field and an audit-log field. A breaking change to a typed object's schema is a major version bump.
*First used in:* [Reference: Python API: versioning](python-api.md#versioning)

**Version (prompt)**
The version of the prompt text the module is using, in the form `vN`. A change to the prompt text is a new file (`prompts/triage.v4.txt`) and a new `prompt_version` field. The bar is the same; the eval set is re-run.
*First used in:* [Reference: prompts: prompt versioning](prompts.md#5-prompt-versioning)

---

## See also

- [Reference: Python API](python-api.md) — most of the type-level terms
- [Reference: prompts](prompts.md) — the prompt-design terms
- [Reference: benchmarks](benchmarks.md) — the eval-set and bar terms
- [Reference: conventions](conventions.md) — the deployment-shape terms
- [Reference: CLI](cli.md) — the operator-facing terms
- [Adoption: overview](../adoption/index.md) — the phase names
