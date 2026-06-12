# Reference — Conventions

> **Audience:** anyone writing code, prompts, eval sets, or audit-log consumers that have to interoperate with the rest of the system. The conventions on this page are enforced. If you violate one, the bench command fails, the audit log won't parse, or the deployment won't deploy.

---

## Repository layout

The site's documentation lives in `docs/`. The code it describes lives in a sibling repo (`aiwithr/ai_llm`) with this layout:

```
ai_llm/
├── aiwf/                          # the Python package
│   ├── __init__.py
│   ├── cli/                       # the `aiwf` CLI
│   │   └── main.py
│   ├── core/                      # shared runtime
│   │   ├── lm_studio.py           # LMStudioClient
│   │   ├── workflow.py            # Workflow.run() contract
│   │   ├── bilingual.py           # code-mixed Bengali-English rule
│   │   └── audit.py               # audit log writer
│   ├── modules/
│   │   ├── sla_classifier/        # ISP triage
│   │   │   ├── __init__.py
│   │   │   ├── workflow.py
│   │   │   ├── schemas.py         # TriageRequest, TriageOutput
│   │   │   ├── prompts/
│   │   │   │   ├── triage.v3.txt
│   │   │   │   └── CHANGELOG.md
│   │   │   └── validators.py
│   │   ├── qwen_rag/              # bank RAG
│   │   │   ├── __init__.py
│   │   │   ├── workflow.py
│   │   │   ├── schemas.py         # RAGRequest, RAGOutput, Citation
│   │   │   ├── retrievers/
│   │   │   │   └── hybrid.py      # BM25 + vector
│   │   │   ├── prompts/
│   │   │   │   └── rag.v2.txt
│   │   │   └── validators.py
│   │   └── factory_summary/       # factory shift summary
│   │       ├── __init__.py
│   │       ├── workflow.py
│   │       ├── schemas.py         # ShiftNote, ShiftSummary, MachineIssue
│   │       ├── prompts/
│   │       │   └── shift_summary.v4.txt
│   │       └── validators.py      # containment check
│   ├── eval_sets.py               # wired-up eval set registry
│   └── toml_config.py             # aiwf.toml parser
├── eval/                          # the frozen eval sets
│   ├── sla_classifier/
│   │   ├── isp_triage.jsonl
│   │   └── contract.json
│   ├── qwen_rag/
│   │   ├── bank_rag.jsonl
│   │   └── contract.json
│   ├── factory_summary/
│   │   ├── shift_handover.jsonl
│   │   └── contract.json
│   ├── injection/
│   │   └── prompt_injection.jsonl
│   ├── bilingual/
│   │   └── code_mixed.jsonl
│   └── results/                   # bench reports, by module and timestamp
├── deploy/
│   ├── fastapi_app.py             # the FastAPI wrapper
│   ├── teams_bot.py               # the bank's Teams bot front door
│   └── systemd/                   # the factory's systemd unit
├── aiwf.toml                      # the config file
└── pyproject.toml
```

---

## Naming

| What | Convention | Example |
| --- | --- | --- |
| Python modules | `snake_case` | `qwen_rag`, `factory_summary` |
| Python classes | `PascalCase` | `TriageOutput`, `RAGRequest`, `ShiftSummary` |
| Python functions and methods | `snake_case` | `run`, `validate_citations` |
| Pydantic models | `PascalCase`, suffix `Request` for input, `Output` or `Result` for output | `TriageRequest`, `TriageOutput`, `ChatResult` |
| Prompt files | `<purpose>.v<N>.txt` | `triage.v3.txt` |
| Eval set files | `<purpose>.jsonl` | `isp_triage.jsonl` |
| Audit log files | `audit-YYYY-MM-DD.jsonl` | `audit-2026-06-12.jsonl` |
| Env vars | `AIWF_*` or `LMSTUDIO_*` | `AIWF_AUDIT_LOG`, `LMSTUDIO_BASE_URL` |
| CLI subcommands | `kebab-case` | `isp-classify`, `rag-ask`, `summarize-shift` |
| Bangla document filenames | English; the Bangla content is inside the file | `isp-classification.md` |
| Mermaid diagram names | not named; in-page only | n/a |

---

## 3. Environment variables

| Var | Default | Required by | Purpose |
| --- | --- | --- | --- |
| `LMSTUDIO_BASE_URL` | `http://localhost:1234/v1` | all modules | the OpenAI-compatible endpoint |
| `LMSTUDIO_API_KEY` | `lm-studio` | all modules | the API key LM Studio expects; matches what the server is configured to accept |
| `AIWF_AUDIT_LOG` | `./audit.jsonl` | all modules | the audit log file path; rotated daily by the runtime |
| `AIWF_CHROMADB_PATH` | `./chroma/` | `qwen_rag` | the ChromaDB on-disk path |
| `AIWF_BM25_PATH` | `./bm25/` | `qwen_rag` | the BM25 index path |
| `AIWF_SOP_CORPUS` | `./corpus/` | `qwen_rag` | the SOP source directory; de-duplicated by content hash on ingest |
| `AIWF_FACTORY_DB` | `./factory.sqlite` | `factory_summary` | the SQLite FTS5 index of historical shift notes |
| `AIWF_TENANT_ID` | `default` | all modules | the tenant id for single-tenant deployments |
| `AIWF_TELEMETRY` | `off` | all modules | the runtime never phones home; this is the kill switch |
| `AIWF_LOG_LEVEL` | `info` | all modules | one of `debug`, `info`, `warn`, `error` |
| `AIWF_LOG_FORMAT` | `json` | all modules | `json` for production; `text` for local dev |
| `AIWF_BENCH_SEED` | `42` | `aiwf bench` | the seed for any randomness in the harness |
| `AIWF_BENCH_CONCURRENCY` | `1` | `aiwf bench` | the number of cases in flight; default is serial for reproducibility |

**Never log an env var's value.** The audit log records the var's *name* (so the operator can see which override is in effect), not its *value*. The values of `LMSTUDIO_API_KEY`, `AIWF_CHROMADB_PATH`, and any path-like var are redacted from log output.

---

## 4. Config file

The runtime config is a TOML file at `./aiwf.toml`:

```toml
[general]
tenant_id = "default"
log_level = "info"
log_format = "json"

[lm_studio]
base_url = "http://localhost:1234/v1"
api_key = "lm-studio"
timeout_s = 30
max_retries = 3
retry_backoff_s = 0.5

[audit]
path = "./audit.jsonl"
rotate = "daily"           # or "hourly", "size:100MB", "never"

[modules.sla_classifier]
prompt_version = "v3"
model_id = "qwen2.5-1.5b-instruct"
temperature = 0.0
max_tokens = 512

[modules.qwen_rag]
prompt_version = "v2"
model_id = "qwen2.5-1.5b-instruct"
retriever = "hybrid"
top_k = 8
citation_reprompt_max = 1   # how many times to re-prompt on validator failure

[modules.factory_summary]
prompt_version = "v4"
model_id = "qwen2.5-1.5b-instruct"
containment_threshold = 0.90

[bench]
seed = 42
temperature = 0.0
top_p = 1.0
max_tokens = 1024
concurrency = 1
```

Env vars override TOML. CLI flags override env vars. This is the precedence order, and it is not configurable.

---

## 5. Audit log format

One JSON object per line. One line per `run()` call. The line is written **after** the response is finalised (i.e. after the validators run and the system has decided what to return to the caller). The line is written **before** the response is sent.

```json
{
  "ts": "2026-06-12T14:23:11.482Z",
  "request_id": "0c5f2c1e-7a8b-4d3a-9b1c-2e4a5f6b7c8d",
  "actor": {
    "kind": "human",
    "id": "agent-7421",
    "tenant_id": "default"
  },
  "module": "sla_classifier",
  "module_version": "1.4.2",
  "prompt_version": "v3",
  "model_id": "qwen2.5-1.5b-instruct",
  "input": {
    "complaint": "net slow from 11am",
    "customer_tier": "silver"
  },
  "output": {
    "category": "connectivity",
    "rationale": "Customer reports slow speeds; the time pattern (started 11am) suggests a network issue.",
    "priority": "P3"
  },
  "latency_ms": 2614,
  "validator_rejections": 0,
  "validator_results": [
    { "name": "schema", "pass": true, "duration_ms": 4 }
  ],
  "outcome": "delivered",
  "error": null
}
```

### Required fields

| Field | Type | Notes |
| --- | --- | --- |
| `ts` | ISO 8601 string, UTC, ms precision | |
| `request_id` | UUID v4 | assigned at the start of the call |
| `actor.kind` | `"human"` or `"service"` | |
| `actor.id` | string | opaque identifier for the actor |
| `actor.tenant_id` | string | always present, even in single-tenant deployments |
| `module` | string | one of the registered module names |
| `module_version` | semver string | |
| `prompt_version` | `vN` string | |
| `model_id` | string | the model that produced the response |
| `input` | object | the module's `Request` schema, as JSON |
| `output` | object or `null` | the module's `Output` schema, as JSON, or `null` on unrecoverable failure |
| `latency_ms` | int | end-to-end wall time of the `run()` call |
| `validator_rejections` | int | how many validators rejected a response before the final one was accepted |
| `validator_results` | array | one entry per validator that ran |
| `outcome` | enum | one of `delivered`, `fallback`, `error` |
| `error` | object or `null` | on `outcome=error`, the error class and message |

### `outcome` values

- `delivered` — the response is the model's output, all validators passed.
- `fallback` — the response is the safe default (e.g. `"I don't have that information in the SOPs. Please open a ticket."` for RAG), reached after the model failed validators twice.
- `error` — the system could not produce a response at all (e.g. LM Studio was down). The `error` field has the class and message.

The audit log is the source of truth for "what happened". If the audit log says `outcome=delivered` and the customer says they never got a response, the bug is in the HTTP layer, not the model.

---

## Log format

Application logs are JSON lines to stdout, one event per line. Each event has:

```json
{
  "ts": "2026-06-12T14:23:11.482Z",
  "level": "info",
  "module": "sla_classifier",
  "request_id": "0c5f2c1e-...",
  "event": "module.run.start",
  "fields": { "...": "..." }
}
```

### Required fields

| Field | Type | Notes |
| --- | --- | --- |
| `ts` | ISO 8601 string, UTC, ms precision | same as audit log |
| `level` | one of `debug`, `info`, `warn`, `error` | |
| `module` | string | the module emitting the event |
| `request_id` | UUID or `null` | the request id, if known; `null` for startup events |
| `event` | dotted string | the event name; see below |
| `fields` | object | event-specific fields |

### Event names

| Event | When | Fields |
| --- | --- | --- |
| `module.run.start` | A `run()` call begins | `actor.kind`, `actor.id` |
| `module.run.llm_call.start` | The HTTP call to LM Studio starts | `model_id`, `prompt_version` |
| `module.run.llm_call.end` | The HTTP call returns | `model_id`, `status`, `latency_ms` |
| `module.run.validator.fail` | A validator rejected a response | `validator`, `attempt`, `reason` |
| `module.run.validator.pass` | A validator passed | `validator`, `attempt`, `duration_ms` |
| `module.run.fallback` | The system returned the safe default | `reason` |
| `module.run.end` | The `run()` call returns | `outcome`, `latency_ms` |
| `audit.write` | An audit log row was written | `path`, `bytes` |
| `config.load` | The config file was loaded | `path`, `keys_loaded` |

A log consumer can reconstruct the lifecycle of a `run()` call by following the `request_id` field across events. The audit log row is the canonical record; the application log is the trace.

---

## Prompt storage

Prompts live in `aiwf/modules/<module>/prompts/`. Each prompt is a single `.txt` file with the version in the name:

```
aiwf/modules/sla_classifier/prompts/triage.v3.txt
aiwf/modules/qwen_rag/prompts/rag.v2.txt
aiwf/modules/factory_summary/prompts/shift_summary.v4.txt
```

A `CHANGELOG.md` in the same directory records what changed in each version and why. A new version is a new file, a new entry in `CHANGELOG.md`, a new run on the eval set, and (if the eval passes) a bump to the default `prompt_version` in `aiwf.toml`.

The site documents the design intent of each prompt in [Reference: prompts](prompts.md). The prompt files themselves are the canonical source. If they diverge, the code wins.

---

## Eval set storage

Eval sets live in `eval/<module>/`. The eval-set file is a JSON Lines file, one case per line, matching the contract in [Reference: benchmarks: the eval set contract](benchmarks.md#3-the-eval-set-contract). A `contract.json` in the same directory declares the input/output schema and the metrics.

Eval sets are frozen. **Editing an existing case in a frozen set is a breaking change to the eval history.** The right way to fix a bad label is to add a new case with the correct label, not to edit the existing one. The old case is left in place; the bench report shows the old and new cases separately.

A new eval set for a new module requires a `contract.json` and at least 200 hand-labelled cases.

---

## Versioning

| What | Scheme | When it bumps |
| --- | --- | --- |
| `module_version` (the `aiwf.modules.*` package) | semver | breaking change to a typed schema, or a major behaviour change |
| `prompt_version` | `vN` integer | any change to the prompt text |
| `model_id` | the upstream model's id string | any change to the model |
| `validator` version | implicit in `module_version` | any change to a validator's logic |
| Eval set | dated filename | any change to the bar, the cases, or the gold labels |
| `aiwf` CLI | semver | breaking change to a subcommand's flag or output |
| Audit log schema | dated schema string in the row | any change to a required field |

The `module_version` is recorded in `ModuleMeta` and the audit log row. A new `module_version` is the trigger to re-run the eval set. A new `prompt_version` is the trigger to re-run the eval set. A new `model_id` is the trigger to re-run the eval set. **A new module without a re-run of the eval set is a release-blocker.**

---

## What we don't do

- **No background jobs in the request path.** A `run()` call is synchronous from the caller's perspective. Long-running work (audit-log compaction, BM25 reindex) runs in a separate process, owned by the deployer.
- **No silent fallbacks.** If the system returns the safe default, the audit log says `outcome=fallback` and `validator_rejections` is non-zero. There is no "the model kind of answered" path.
- **No "best effort" telemetry.** `AIWF_TELEMETRY=off` is the default and the kill switch. The runtime does not call home. If the deployer wants telemetry, they wire it up to the audit log.
- **No model selection in the request path.** The `model_id` is config, not a request field. A caller cannot say "use the bigger model for this request". A deployer that wants per-tenant or per-tier model selection implements it as a routing layer that picks the `aiwf` configuration to use, not as a model_id in the request.
- **No translation layer.** The code-mixed Bengali-English rule is "pass the text through". See [Reference: prompts: code-mixed handling](prompts.md#4-code-mixed-bengali-english-handling).

---

## See also

- [Reference: Python API](python-api.md) — the typed contracts that this page's conventions support
- [Reference: prompts](prompts.md) — the prompts this page's conventions store
- [Reference: benchmarks](benchmarks.md) — the eval sets this page's conventions freeze
- [Reference: CLI](cli.md) — the CLI that consumes `aiwf.toml`
- [Reference: glossary](glossary.md) — the terms this page's conventions use
