# 1. Layers — the five contracts

> **One sentence:** the system is a stack of five layers, each with a narrow job, and most changes only touch one layer.

The architecture overview introduced five layers — Edge, Application, Workflow, Core, Infrastructure. This page makes those layers into a **contract**: what each one is responsible for, what it is not, and where a typical change lives. If the rest of the project has one rule, it is this — **when in doubt, change one layer, not the boundary between two layers**.

---

## The five layers

### 1. Edge

The operator's browser, terminal, or phone. The person asking the question, or the system that triggered the workflow without a human (a ticketing system, a cron job, a router pushing a log line).

- **Is:** the source of the request and the destination of the response.
- **Is NOT:** a place that holds model state, prompt templates, or any business logic. If the Edge "knows" anything about the workflow, the layering is broken.
- **Where changes go:** UI copy, CSS, the shape of the form the operator fills in, the webhook payload the upstream system sends. Anything visible to the operator, and nothing more.

### 2. Application

Your existing systems — the intranet, Slack bot, ticketing UI, Streamlit dashboard, the operator's portal. This is the layer that **surfaces** the AI to the rest of the business. It speaks HTTP. It does not speak "prompt".

- **Is:** an HTTP front door in front of one or more workflow modules. Authentication, rate limiting, request id, audit log row, and a thin orchestration over the Workflow layer.
- **Is NOT:** the place where prompts are written, where the model is called, or where business decisions are encoded. If the Application layer contains the words "few-shot" or "temperature", something is wrong.
- **Where changes go:** new routes, new auth integrations, new upstream connectors (a new ticketing system, a new chat client), changes to the user-facing error messages.

### 3. Workflow

The actual narrow AI task — classify the complaint, assess the SLA risk, retrieve from the runbook. This is where the **prompt lives, the business rule lives, and the typed output contract lives**. One module = one workflow = one job.

- **Is:** a function `input → output` where the function is implemented as "send a prompt to the model, validate the response against a Pydantic schema, return the typed object". The module owns the prompt, the few-shot examples, the system prompt, and the schema.
- **Is NOT:** aware of which UI is calling it, aware of which model is running, or aware that other modules exist. A Workflow module is replaceable, copy-pasteable, and runnable from a notebook for evaluation.
- **Where changes go:** prompt edits, new few-shot examples, schema additions, the eval set. The most-edited layer in the system, by design.

### 4. Core

Shared libraries used by every Workflow module: the LM Studio / vLLM / Ollama client with retries and timeouts, the ChromaDB retriever, the settings loader (`pydantic-settings`), the structured-logging helper.

- **Is:** a set of typed utilities that hide the model runtime and the vector store behind stable APIs.
- **Is NOT:** aware of any specific business workflow. The Core layer does not know what an "ISP complaint" is. It knows what a "chat completion request" and an "embedding search" are.
- **Where changes go:** swap the model runtime (LM Studio → vLLM), upgrade the ChromaDB client, add a retry policy, fix a bug in the logger. Touching Core affects every Workflow module — keep changes small and version-pinned.

### 5. Infrastructure

The hardware and the model runtime: the GPU box, the CPU box, LM Studio's local server, vLLM, Ollama, the model weight files on disk.

- **Is:** the place where inference actually happens. Owns the model weights, the GPU driver, the operating system, the firewall rules at the host level.
- **Is NOT:** aware of prompts, schemas, or operators. The Infrastructure layer answers "given this token stream, return this token stream" and nothing more.
- **Where changes go:** model upgrades (Qwen 2.5 1.5B → Gemma 3 4B, or 1.5B → a newer 1.5B), driver upgrades, hardware swaps, LM Studio version bumps. Every model upgrade triggers a re-run of the frozen eval set in CI.

---

## Where does a typical change go?

Most engineering work in this project touches exactly one layer. Use this table as a sanity check before opening a PR.

| Change | Layer | Also touches |
| --- | --- | --- |
| "We added a new category to the complaint classifier" | Workflow | Application (new enum value in the API response) |
| "We're moving from LM Studio to vLLM" | Infrastructure | Core (URL/transport swap); eval set re-run |
| "The operator dashboard now shows the model's confidence" | Application | Workflow (response now includes `confidence`) |
| "We need to log who triggered each model call" | Core | Application (passes user id) |
| "We added a new ticketing system integration" | Application | — |
| "The runbook retrieval now uses a different embedding model" | Infrastructure | Core (retriever config); Workflow (eval set re-run) |
| "The intranet URL changed" | Application | — |
| "We split the SLA classifier into two — risk and approver" | Workflow | Application (two routes instead of one) |

If a change touches three or more layers, pause and ask whether you are rebuilding a boundary. Most of the time the answer is to push the change down (to Workflow or Core) so the upper layers do not need to know.

---

## What this page is NOT

- **Not a code-level map.** The Workflow modules are not libraries that import each other; they are independent entry points that share Core. For the code-level view, see [Adoption → Build](../adoption/build.md).
- **Not a deployment diagram.** This page is about responsibilities. The network placement — which box runs what, which port, which firewall — is in [Security](security.md).
- **Not an excuse for the Application layer to call the model directly.** The whole point of the Workflow layer is that the Application never sees a prompt. If it does, the structured-output contract is gone.

---

## See also

- [Architecture overview](index.md) — the five-layer stack at a glance, with a diagram
- [Data flow](data-flow.md) — what crosses each boundary, in what format, and what never leaves the network
- [Security](security.md) — threat model, network placement, audit logging
- [Adoption → Build](../adoption/build.md) — the four workstreams that put this stack in production
