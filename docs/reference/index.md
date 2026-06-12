# Reference

> **Audience:** engineers, deployers, and auditors who need the contract, not the story. The Adoption section explains why; the Reference section is what you wire up.

The Reference section is the spec. It is short, exact, and versioned. If a number, signature, or filename on this section disagrees with the code, the code wins — and this section gets updated in the next commit.

---

## Pages in this section

| Page | What it specifies |
| --- | --- |
| [Python API](python-api.md) | The typed contracts every module exposes (`ChatRequest`, `ChatResult`, `TriageOutput`, `RAGOutput`, `ShiftSummary`), the `Workflow.run()` contract, the `LMStudioClient` wrapper, and the FastAPI integration shape. |
| [CLI](cli.md) | The `aiwf` command, every subcommand (`isp-classify`, `rag-ask`, `summarize-shift`, `bench`, `doctor`), global flags, exit codes, env vars, and the TOML config file. |
| [Prompts](prompts.md) | The four system prompts in production (triage, RAG-with-citations, shift summary, code-mixed Bengali handling), the design rationale for each, and how they are versioned. |
| [Benchmarks](benchmarks.md) | The reproducible eval harness, the five frozen eval sets, the bar for each metric, and the format of a benchmark report. |
| [Glossary](glossary.md) | Alphabetised definitions of every term used on the site, with links to the canonical page. |
| [Conventions](conventions.md) | Repository layout, naming, env vars, the config file, the audit log format, the log format, prompt and eval-set storage, versioning, and what the runtime does not do. |

---

## How the pages fit together

```
                        ┌──────────────────────┐
                        │       Caller         │
                        │  (HTTP / CLI / etc.) │
                        └──────────┬───────────┘
                                   │
                        ┌──────────▼───────────┐
                        │   CLI (aiwf ...)     │  ←  Reference: CLI
                        │   or  HTTP (FastAPI) │  ←  Reference: Python API
                        └──────────┬───────────┘
                                   │
                        ┌──────────▼───────────┐
                        │  Workflow.run()      │  ←  Reference: Python API
                        │  + ModuleMeta        │     (ModuleMeta, Actor)
                        └──────────┬───────────┘
                                   │
                        ┌──────────▼───────────┐
                        │  Module              │  ←  Reference: Python API
                        │  (sla_classifier,    │     (TriageRequest, etc.)
                        │   qwen_rag, …)       │
                        │                      │  ←  Reference: Prompts
                        │  • prompt            │     (the system prompt)
                        │  • LLM call          │  ←  Reference: Python API
                        │  • validators        │     (LMStudioClient)
                        └──────────┬───────────┘
                                   │
                        ┌──────────▼───────────┐
                        │  Output              │  ←  Reference: Python API
                        │  + ModuleMeta        │     (TriageOutput, etc.)
                        │  → audit log         │  ←  Reference: Conventions
                        │                      │     (audit log format)
                        └──────────┬───────────┘
                                   │
                        ┌──────────▼───────────┐
                        │  Bench / Spot-check  │  ←  Reference: Benchmarks
                        │  (aiwf bench …)      │
                        └──────────────────────┘
```

Read top-to-bottom for "what does a request do". Read bottom-to-top for "what does the audit log tell me".

---

## Stability

- The **typed contracts** (Pydantic models in [Python API](python-api.md)) are semver-stable within a major `module_version`. A field added is a minor bump; a field renamed or removed is a major bump.
- The **CLI** (in [CLI](cli.md)) is semver-stable within a major `aiwf` version. A flag added is a minor bump; a flag renamed or removed is a major bump.
- The **prompts** (in [Prompts](prompts.md)) change at the speed of the eval set. A prompt change that holds the bar is a `v(N+1)` prompt version, not a `module_version` bump.
- The **bars** (in [Benchmarks](benchmarks.md)) move only when the CISO moves them.
- The **audit log schema** (in [Conventions](conventions.md)) is append-only within a major `audit_schema` version.

A deployment that worked on `module_version 1.4.2` will work on `1.4.3` and on `1.5.0`. It will not work on `2.0.0` without a migration.

---

## See also

- [Adoption: overview](../adoption/index.md) — the four phases
- [Architecture: overview](../architecture/index.md) — the layered system
- [Case studies: overview](../case-studies/index.md) — the three production deployments
- [Reference: glossary](glossary.md) — terms used across these pages
