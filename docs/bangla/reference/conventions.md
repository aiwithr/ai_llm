# Reference — Conventions

> **পাঠক:** codebase-এ contribute করা ইঞ্জিনিয়ার, audit/review pass করা reviewer।
> **Stability:** stable। Doctrine change করতে হলে ADR (architecture decision record)-এ commit যোগ করতে হবে।

এই পেজটা codebase-এর shared rules — module-এর shape, env vars, log format, নামকরণ, সেটা যেকোনো engineer-এর পক্ষে follow করা উচিত। **কোনো rule ship করার আগে enforce হতে হবে**, code-এর comment-এ না।

---

## ১. Doctrine

কোনো doctrine-ই code-এ comment-এ নেই — সবকিছুই validator, contract, বা test দিয়ে enforce। Comment-এ থাকা rule-ই bug।

### ১.১ "Ship মডেল না, ship contract।"

Model-এর output-এর সাথে ব্যবহারকারীর interaction-এর একমাত্র surface হলো **typed contract** — Pydantic schema। Model-এর token sampling, prompt-এর exact wording, বা temperature পরিবর্তন হলে contract-এর field সব থাকতে হবে, একই meaning-এ। CISO bar-এর actual defense এটাই।

Enforcement: প্রতিটা module-এর output `Pydantic` model-এ parse হয়। Parse failure-এ result reject; re-prompt নেই।

### ১.২ "Bar আগে, code পরে।"

কোনো module-এর release-pipeline-এ entry হলো **eval-set file ও bar definition**। Bar-এর পরে model-এর output enforce করার জন্য code লেখা হয়। Bar পরে বদলালে audit-এর entry দরকার।

Enforcement: `aiwf bench <module>` release pipeline-এর প্রথম step। Bar miss করলে release block।

### ১.৩ "Everything fine valid answer।"

Module-এর output-এ `other`, "I don't have that information", বা empty list একইভাবে first-class উত্তর। Model-কে সমস্যা invent করতে বাধ্য করা যাবে না।

Enforcement: prompt ও validator। Triage-র `other` rate 3.2%; RAG-এর "I don't have…" rate 6.8% (production)।

### ১.৪ "Code base-এ inner `triple-double-quote ... triple-double-quote` docstring নেই।"

কোনো module/function/class-এর docstring single-line comment + indented prose, **multi-line triple-quoted string নয়**। কারণ Bengali mirror content raw-string script-এর ভিতরে inner `triple-double-quote ... triple-double-quote` terminate outer `r'''...'''` raw string। Codebase-wide rule, script-only না।

Enforcement: CI-তে pre-commit hook `ruff` (custom rule) + script generation-এ grep।

### ১.৫ "Prompt = prose, validator = enforcement।"

System prompt-ই "ভদ্র অনুরোধ"। Hard rule validator-ই enforce করে (cite-in-set, containment, priority-within-matrix)। Prompt পরিবর্তন ship হতে পারে বিনা release-এর, validator পরিবর্তন ship হয় `module_version` bump সহ।

Enforcement: prompt text-এর পরিবর্তন `v<n+1>` file-এ; validator পরিবর্তন `MAJOR` bump।

### ১.৬ "Telemetry off।"

`AIWF_TELEMETRY=off` একমাত্র supported value। CLI কোথাও phone home করে না। External API শুধু LM Studio local server।

Enforcement: codebase-এ কোনো HTTP egress নেই; CI-তে firewall egress test।

---

## ২. Naming

| Surface | Rule | Example |
| --- | --- | --- |
| Module name | `snake_case` (Python package) | `sla_system`, `qwen_rag`, `factory_summary` |
| Module entry | `module.snake_case_verb` | `sla_system.classify`, `qwen_rag.answer`, `factory_summary.summarize` |
| CLI subcommand | `kebab-case` (corresponds to module name) | `isp-classify`, `rag-ask`, `summarize-shift` |
| TOML config key | `snake_case`, scoped | `[sla_classify]`, `[rag_ask]`, `[factory_summary]` |
| Env var | `UPPER_SNAKE`, `AIWF_*` prefix | `LMSTUDIO_BASE_URL`, `AIWF_AUDIT_LOG` |
| Audit log field | `snake_case` | `request_id`, `started_at`, `module_version` |
| Eval set file | `kebab-case-v<n>.json` | `isp-triage-v3.json`, `bank-rag-v2.json` |
| Prompt file | `snake_case.v<n>.txt` | `triage.v3.txt`, `rag.v2.txt`, `shift_summary.v4.txt` |
| Documentation | English `kebab-case.md`, Bengali `kebab-case.md` | `isp-classification.md`, `bangla/isp-classification.md` |

### Module name conflict

English ও Bengali mirror-এ একই module-এর জন্য আলাদা module name **নেই**। Bengali mirror-এ module-কে `Module` হিসেবে refer করো, English technical id ব্যবহার করো (যেমন `sla_system.classifier` কোড-ভিত্তিক)। `বাংলা - ক্লাসিফায়ার` বলবে না।

---

## ৩. Environment variables

`AIWF_*` prefix ছাড়া অন্য কোনো env var use হয় না, except: LM Studio endpoint-এর জন্য `LMSTUDIO_BASE_URL` (LM Studio-র standard)।

| Variable | Default | Surface | Description |
| --- | --- | --- | --- |
| `LMSTUDIO_BASE_URL` | `http://localhost:1234/v1` | core | LM Studio OpenAI-compatible endpoint |
| `AIWF_MODEL_DEFAULT` | `qwen2.5-1.5b-instruct` | core | যেসব module override করে না, তাদের জন্য |
| `AIWF_AUDIT_LOG` | `/var/log/aiwf/audit.log` | core | append-only JSONL log path |
| `AIWF_CHROMADB_PATH` | `/var/lib/aiwf/chromadb` | rag | ChromaDB persistent store |
| `AIWF_LOG_LEVEL` | `info` | core | `debug` / `info` / `warning` / `error` |
| `AIWF_TELEMETRY` | `off` | core | `off` একমাত্র supported value |
| `AIWF_BENCH_OUTPUT_DIR` | `./bench-results` | bench | eval result JSON-এর dir |

যেকোনো deployment-এ [exhaustive `.env.example`](https://example.com/aiwf-env-example)-এ পুরো তালিকা সহ default doc।

---

## ৪. Config file

TOML ফরম্যাট, `aiwf.toml` (default)। Schema module-specific, common section `[core]`:

```toml
[core]
base_url = "http://localhost:1234/v1"
timeout_s = 10.0
max_retries = 2

[sla_classify]
model = "qwen2.5-1.5b-instruct"
temperature = 0.0
max_tokens = 256

[rag_ask]
default_top_k = 4
min_score = 0.55
re_prompt_on_missing_citation = true

[factory_summary]
containment_strict = true
max_re_prompts = 1
```

CLI flag-এর precedence: `flag > env var > config file > default`। Config file-এ সব option define না — যা নেই, সেটা env var-এর precedence, env var-ও না থাকলে default।

---

## ৫. Audit log format

JSONL — প্রতি line-এ একটা record। Schema (Python-এর `TypedDict` notation):

```python
class AuditRecord(TypedDict):
    ts: str               # ISO 8601 UTC
    request_id: str       # ULID
    module_name: str      # e.g. "sla_system.classifier"
    module_version: str   # e.g. "1.4.2"
    model_id: str         # e.g. "qwen2.5-1.5b-instruct"
    request_hash: str     # sha256(input), operator PII redaction সহ
    started_at: str       # ISO 8601
    finished_at: str      # ISO 8601
    latency_ms: int
    outcome: str          # "success" | "validation_failed" | "refused" | "human_review"
    usage: dict           # {"prompt_tokens": int, "completion_tokens": int, "total_tokens": int}
    error: Optional[str]  # validation_failed হলে message
```

Append-only; rotate by `logrotate(8)` `daily` ও `compress`। CISO-র audit trail-এর primary source।

---

## ৬. Logging

`logging` module (stdlib), JSON formatter, no color। Default level `info`, `AIWF_LOG_LEVEL` env var দিয়ে override।

```python
import logging
log = logging.getLogger("aiwf.sla_classifier")
log.info("triage", extra={"request_id": rid, "latency_ms": l})
```

Structure: `level`, `ts`, `logger`, `msg`, `extra`। `print()` ব্যবহার নিষিদ্ধ।

---

## ৭. File layout

```
aiwf/                                # main package
├── __init__.py
├── core/
│   ├── bilingual/                   # code-mixed Bengali-English rule
│   ├── lm_studio_client.py
│   └── audit.py
├── modules/
│   ├── sla_system/                  # `sla_system.classifier`
│   │   ├── __init__.py
│   │   ├── classifier.py
│   │   ├── contracts.py             # Pydantic models
│   │   ├── prompts/
│   │   │   └── triage.v3.txt
│   │   └── tests/
│   │       ├── test_classifier.py
│   │       └── test_contracts.py
│   ├── qwen_rag/                    # `qwen_rag.answer`
│   │   ├── __init__.py
│   │   ├── answer.py
│   │   ├── contracts.py
│   │   ├── retrieval.py             # BM25 + vector hybrid
│   │   ├── prompts/
│   │   │   └── rag.v2.txt
│   │   └── tests/
│   └── factory_summary/             # `factory_summary.summarize`
│       ├── __init__.py
│       ├── summarize.py
│       ├── contracts.py
│       ├── containment.py           # validator
│       ├── prompts/
│       │   └── shift_summary.v4.txt
│       └── tests/
└── bench/
    ├── __init__.py
    └── run.py                       # `aiwf bench <module>`

eval/                                # frozen eval sets
├── isp-triage-v3.json
├── bank-rag-v2.json
├── factory-shift-v4.json
└── prompt-injection-v1.json

docs/
├── index.md
├── from-rules-to-ai/
├── getting-started/
├── adoption/
├── architecture/
├── ai-development/
├── case-studies/
├── reference/                       # এই section
└── bangla/                          # Bengali mirrors
    └── reference/                   # Bengali reference mirrors
```

---

## ৮. Versioning

[Semver](https://semver.org/) (`MAJOR.MINOR.PATCH`)।

| Change | Bump | Example |
| --- | --- | --- |
| Module-এর public contract-এ required field বদলানো বা remove করা | `MAJOR` | 1.4.2 → 2.0.0 |
| Module-এর public contract-এ নতুন optional field | `MINOR` | 1.4.2 → 1.5.0 |
| Prompt text-এর ভিতরের wording (validator অপরিবর্তিত) | `MINOR` | 1.4.2 → 1.5.0 |
| Validator পরিবর্তন | `MAJOR` | 1.4.2 → 2.0.0 |
| Bug fix যা contract-এ বা validator-এ ছিল | `PATCH` | 1.4.2 → 1.4.3 |

CLI flag-এর backward-compatible add = `MINOR`; remove বা behavior change = `MAJOR`।

---

## ৯. Pre-commit

```yaml
# .pre-commit-config.yaml
repos:
  - repo: local
    hooks:
      - id: ruff
        entry: py -m ruff check
        language: system
        types: [python]
      - id: no-triple-quote-docstring
        entry: py -m aiwf.tools.scan_docstrings
        language: system
        types: [python]
      - id: mypy
        entry: py -m mypy aiwf/
        language: system
        types: [python]
      - id: license-check
        entry: py -m aiwf.tools.license_check
        language: system
        types: [python]
      - id: build
        entry: py -m mkdocs build --strict
        language: system
        pass_filenames: false
```

Local hook "no-triple-quote-docstring" `'''` ও `triple-double-quote` দুটোকেই multi-line docstring-এ flag করে, **module/function/class-এর শুরুতে বসানো** (inner raw-string script-এ না — script tool layer-এ পরে check হয়)।

---

## ১০. Module contract template

প্রতিটা module-ই same file shape follow করে:

```python
# aiwf/modules/<name>/__init__.py
from .contracts import ModuleInput, ModuleOutput, ModuleMeta
from .<verb> import run

__all__ = ["ModuleInput", "ModuleOutput", "ModuleMeta", "run"]
```

```python
# contracts.py
from pydantic import BaseModel, Field
from typing import Literal

class ModuleInput(BaseModel):
    # module-specific fields
    ...

class ModuleOutput(BaseModel):
    # module-specific fields
    ...

class ModuleMeta(BaseModel):
    request_id: str
    started_at: str
    finished_at: str
    model_id: str
    usage: dict
    latency_ms: int
    module_version: str
```

```python
# prompts/<name>.v<n>.txt
# Plain text, system prompt, no JSON wrapping.
```

```python
# tests/test_contracts.py
# Schema validation: bad input, good input, good output, bad output.
```

```python
# tests/test_classifier.py
# Eval set frozen; bench numbers match published.
```

---

## ১১. Commit message

`<scope>: <imperative>`।

- `feat(sla_classify): support gold tier override`
- `fix(rag_ask): re-prompt on citation-in-set miss`
- `chore(eval): freeze bank-rag-v2`
- `docs(bangla): ship A8 mirrors (A2-A7, 24 pages)`
- `refactor(containment): move to validator package`
- `test(factory): add 240-note eval set`

PR title format = commit message। Squash-merge default।

---

## ১২. Code style

- **Black** format, 100 char line।
- **Ruff** lint (`E`, `F`, `I`, `B`, `UP`, `N`, `SIM` rules)।
- **Mypy** strict (`--strict`); কোনো `Any` module public surface-এ না।
- **Pydantic v2** সব contract-এর জন্য।
- **অন্য dependency-র default নেই**। `pyproject.toml`-এ যা আছে, তাই।

---

## ১৩. Security posture

| Domain | Default | Override |
| --- | --- | --- |
| Telemetry | off | `--telemetry on` flag নেই |
| Network egress | LM Studio local + ChromaDB local | কোনো external API নেই |
| Audit | সব invocation append-only | opt-out flag নেই |
| Customer PII | request_hash-এ redaction rule | `aiwf.tools.pii.Redactor` |
| Model output | validator enforce | re-prompt budget = 1 (per module) |
| Prompt injection | cite-in-set, containment, priority-within-matrix | re-prompt, second fail → `refused` |

---

## ১৪. Bengali mirror content

`docs/bangla/`-এর সব mirror page-এর prose-ই Bengali, JSON/code/identifier ইংরেজিতে। Voice conversational (`তুমি` voice)। Mermaid diagram-এর label ইংরেজিতে (Mermaid syntax-এ Bengali কাজ করে না)।

প্রতিটা Bengali mirror page-এ cross-link English original-এর (relative `../../<path>`)। কোনো English-এর cross-link back to Bengali নেই — যে কেউ English পড়ে সে Bengali-ওয়ালা না।

আরও বিস্তারিত [index-এ](../index.md) "বাংলা mirror section"।

---

## ১৫. Decisions যা এই পেজে ship হয়নি

- Multi-model ensemble-এর support এই release-এ। `module_version` field আছে, কিন্তু ensemble-এর wiring-এর code নেই।
- Streaming response। Module-এর output atomic JSON; partial update নেই।
- Tool/function calling (MCP integration)। Roadmap-এ আছে, এই release-এ নেই।
- Vector store-এ Pinecone/Weaviate support। শুধু ChromaDB-তে pinned।
- Multi-language UI। Bengali mirror-এ conversational `তুমি` voice; কিন্তু UI-এ i18n এই release-এ নেই।
