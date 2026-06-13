# Reference — CLI

> **পাঠক:** operator ও CI pipeline। CLI-ই cron job, smoke test, বা one-off debug session-এ একই surface।
> **Stability:** stable। CLI-ই public interface; পরিবর্তনের জন্য changelog-এ deprecation notice দরকার।

প্রজেক্ট একটাই command ship করে, `aiwf`, প্রতিটা মডিউলের জন্য একটা সাবকমান্ড। প্রতিটা সাবকমান্ডের shape একই: stdin বা file থেকে পড়ে, stdout-এ লেখে, fail-এ non-zero exit, কখনো prompt করে না।

---

## ১. Top-level command

```bash
aiwf --help
aiwf --version
aiwf doctor              # install যাচাই: মডেল পাওয়া যাচ্ছে, corpus mounted ইত্যাদি
aiwf isp-classify        # একটা মডিউল
aiwf rag-ask             # আরেকটা
aiwf summarize-shift     # আরেকটা
aiwf bench               # eval harness চালাও
```

`aiwf --version` `aiwf`-এর নিজের ভার্সন দেখায়। মডিউল ভার্সন থাকে প্রতিটা সাবকমান্ডের `--version`-এ (অথবা JSON output-এর `meta.module_version` field-এ)।

### Global flags

| Flag | কাজ | Default |
| --- | --- | --- |
| `--json` | human-readable text-এর বদলে machine-readable JSON দাও | `false` |
| `--quiet` | progress সরাও, শুধু result ও error দেখাও | `false` |
| `--config PATH` | TOML config file-এর path ([conventions](conventions.md#4-config-file) দেখো) | `./aiwf.toml` |
| `--log-level LEVEL` | `debug` / `info` / `warning` / `error` | `info` |
| `--no-color` | ANSI colour code বন্ধ করো (CI-friendly) | `false` |

### Exit codes

| Code | মানে |
| --- | --- |
| `0` | success |
| `1` | generic error |
| `2` | invalid arguments (parse / validation failure) |
| `3` | LM Studio পাওয়া যাচ্ছে না (`aiwf doctor` দেখো) |
| `4` | corpus missing বা unreadable (শুধু RAG) |
| `5` | output validation ব্যর্থ ও re-prompt শেষ (সম্ভবত model / data সমস্যা) |
| `64`–`78` | `sysexits.h` code-এর জন্য reserved (`grep`-এর convention) |

CI pipeline-এর উচিত নির্দিষ্ট code match করা, "non-zero" না। `5` হলো data সমস্যা, deploy সমস্যা না।

---

## ২. `aiwf doctor`

Install যাচাই। `pip install ai-work-flow`-এর পর এবং প্রতিটা CI build-এ এটাই প্রথম command।

```bash
aiwf doctor
```

এটা ধারাবাহিকভাবে যাচাই করে:

1. **LM Studio reachable** `http://localhost:1234/v1`-এ (অথবা `LMSTUDIO_BASE_URL`-এ যা আছে)।
2. **Model loaded** — configured model id `/v1/models` response-এ আছে।
3. **Corpus mounted** (শুধু RAG) — configured ChromaDB path readable।
4. **Audit log writable** — `AIWF_AUDIT_LOG`-এ যে path, সেটা append mode-এ open-able।
5. **Disk space** — ChromaDB ও audit log যে volume-এ, সেখানে至少 5 GB free।

Output একটা JSON object (`--json` দিয়ে) বা colored table। প্রতিটা row-এ status (`ok` / `warn` / `fail`) আর এক-লাইনের message। সব row `ok` হলেই কেবল exit code `0`।

---

## ৩. `aiwf isp-classify`

Tier-1 complaint triage, [ISP case study](../../case-studies/isp-support.md) ব্যবহার করে।

```bash
aiwf isp-classify --subject "No internet since 6am" \
                  --body "..." \
                  --tier platinum
```

### Input

| Flag | Required | মন্তব্য |
| --- | --- | --- |
| `--subject` | হ্যাঁ | free-form complaint subject |
| `--body` | হ্যাঁ | free-form complaint body |
| `--tier` | হ্যাঁ | `platinum` / `gold` / `silver` |
| `--from-file` | না | উপরের field-সহ JSON file-এর path; individual flag-এর চেয়ে অগ্রাধিকার পায় |

### Output (default)

```
category:     connectivity
priority:     P1
suggested_owner: noc-tier-2
confidence:   0.93
rationale:    Customer reports complete loss of service, platinum tier.
```

### Output (`--json`)

```json
{
  "output": {
    "category": "connectivity",
    "priority": "P1",
    "suggested_owner": "noc-tier-2",
    "confidence": 0.93,
    "rationale": "Customer reports complete loss of service, platinum tier."
  },
  "meta": {
    "module_name": "sla_system.classifier",
    "module_version": "1.4.2",
    "request_id": "01J9X3...",
    "started_at": "2026-06-12T10:14:23.412Z",
    "finished_at": "2026-06-12T10:14:24.781Z",
    "model_id": "qwen2.5-1.5b-instruct",
    "usage": {"prompt_tokens": 412, "completion_tokens": 38, "total_tokens": 450},
    "latency_ms": 1369
  }
}
```

### আরও পড়ার জন্য

- [Python API: `TriageRequest` / `TriageResult`](python-api.md#sla_systemclassifier-tier-1-complaint-triage)
- [Reference: prompts — triage](prompts.md#1-triage)

---

## ৪. `aiwf rag-ask`

Internal corpus-এর against "how do I…" প্রশ্নের উত্তর দেয়, [bank case study](../../case-studies/bank-it.md) ব্যবহার করে।

```bash
aiwf rag-ask "How do I reset a user's CBS password?" \
            --corpus bank-it-sops \
            --top-k 4
```

### Input

| Flag | Required | মন্তব্য |
| --- | --- | --- |
| `question` (positional) | হ্যাঁ | প্রশ্নের text |
| `--corpus` | হ্যাঁ | corpus id; ChromaDB-তে থাকতে হবে |
| `--top-k` | না | default `4`; max `10` |
| `--min-score` | না | cosine threshold; এর নিচে result "I don't know" |
| `--require-citation` | না | default `true`; `false` হলে citation বাদ দিতে পারে (শুধু ad-hoc exploration-এ) |

### Output (default)

```
answer:  To reset a user's CBS password, the operator must be on the
         branch network and have an active session. From the CBS admin
         console, navigate to Users → Reset Password. The temporary
         password is valid for 15 minutes.

citations:
  - bank-it-sop-114  (CBS User Management v3.2, 2025-11-04)
  - bank-it-sop-087  (Password Reset Procedure v2.1, 2025-09-18)

retrieval_trace: [bank-it-sop-114, bank-it-sop-087, bank-it-sop-203, bank-it-sop-099]
```

Corpus-এ উত্তর না থাকলে output:

```
answer:  I don't have that information in the SOPs. Please open a ticket.
citations: []
```

…এবং exit code তবুও `0`। উত্তর না পাওয়া error না।

### আরও পড়ার জন্য

- [Python API: `RAGRequest` / `RAGResult`](python-api.md#qwen_raganswer-rag-over-an-internal-corpus)
- [Reference: prompts — RAG](prompts.md#2-rag-with-citations)

---

## ৫. `aiwf summarize-shift`

Line leader-এর handwritten shift note summarize করে, [factory case study](../../case-studies/factory-it.md) ব্যবহার করে।

```bash
aiwf summarize-shift --line L2 --shift morning --note-file note-2026-06-12.txt
```

### Input

| Flag | Required | মন্তব্য |
| --- | --- | --- |
| `--line` | হ্যাঁ | `L1` / `L2` |
| `--shift` | হ্যাঁ | `morning` / `afternoon` / `night` |
| `--note` | না | note-এর text (এটা অথবা `--note-file`) |
| `--note-file` | না | UTF-8 file-এ note-এর text |
| `--author-id` | না | default `unknown`; audit log-এ রেকর্ড হয় |

### Output (default)

```
line:                 L2
shift:                morning
machine_issues:       1
  - M3 (severity 2):  overlock tension drifting, recalibrated at 06:40
qa_defects:           2
  - 12 stitches skipped on batch 4471 (rework done at 07:15)
  - 1 frayed button on batch 4470 (sorted out)
safety_incidents:     0
focus_for_next_shift: Watch M3 for tension drift; finish batch 4471 QC.
validated:            true
```

Note summarize করা না গেলে (containment check দু'বার fail), output হয় `validated: false` এবং note "human review" queue-তে লেখা হয়। Exit code `0`; অ্যাপ্লিকেশন `validated` পড়ে সেই অনুযায়ী act করবে।

### আরও পড়ার জন্য

- [Python API: `ShiftNote` / `ShiftSummary`](python-api.md#factory_summarysummarize-shift-handover-summarization)
- [Reference: prompts — shift summary](prompts.md#3-shift-summary-strict-schema)

---

## ৬. `aiwf bench`

Frozen eval set মডিউলের against চালাও। Case study-র ও [benchmarks](benchmarks.md) পেজের নম্বর এখান থেকেই আসে।

```bash
aiwf bench sla-classify            # ISP eval set
aiwf bench rag-ask                 # bank eval set
aiwf bench summarize-shift         # factory eval set
aiwf bench prompt-injection        # security eval
aiwf bench code-mixed-bn-en        # Bengali-English code-mixing eval
```

### Output

```
$ aiwf bench sla-classify
eval_set:   eval/isp-triage-v3.json (n=200)
model:      qwen2.5-1.5b-instruct
category_agreement:  0.913  (bar: 0.95)
latency_p95_ms:      2610   (bar: 3000)
override_rate:       0.087
status:              BELOW_BAR_ON_AGREEMENT
```

প্রতিটা মেট্রিক বার meet করলে exit code `0`, নইলে `5`। Output `bench-results/<module>-<timestamp>.json`-এ audit log-এর জন্য লেখা হয়।

### আরও পড়ার জন্য

- [Reference: benchmarks](benchmarks.md) — প্রতিটা eval set কী measure করে ও bar কোথা থেকে

---

## ৭. Environment variables

CLI flags না, পুরো call-জুড়ে একই জিনিসের জন্য environment পড়ে। Convention: `AIWF_*` (uppercase, snake_case)।

| Variable | Default | কাজ |
| --- | --- | --- |
| `LMSTUDIO_BASE_URL` | `http://localhost:1234/v1` | LM Studio endpoint |
| `AIWF_MODEL_DEFAULT` | `qwen2.5-1.5b-instruct` | যেসব সাবকমান্ড override করে না, তাদের জন্য model id |
| `AIWF_AUDIT_LOG` | `/var/log/aiwf/audit.log` | append-only audit log-এর path |
| `AIWF_CHROMADB_PATH` | `/var/lib/aiwf/chromadb` | RAG corpus-এর location |
| `AIWF_LOG_LEVEL` | `info` | `--log-level`-এর মতো |
| `AIWF_TELEMETRY` | `off` | `off` একমাত্র supported value; CLI কোথাও phone home করে না |

সম্পূর্ণ env-var contract-এর জন্য [conventions](conventions.md#3-environment-variables) দেখো।

---

## ৮. Configuration file

Flags ও env vars যথেষ্ট না এমন deploy-এর জন্য (যেমন per-module model override, custom retry budget) TOML file ব্যবহার করো:

```toml
# aiwf.toml
[core]
base_url = "http://lm-studio.internal:1234/v1"
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

CLI default হিসেবে `./aiwf.toml` load করে। `--config PATH` দিয়ে override করো।

---

## ৯. আরও পড়ার জন্য

- [Reference: Python API](python-api.md) — প্রতিটা সাবকমান্ডের typed contract
- [Reference: prompts](prompts.md) — exact system prompt
- [Reference: benchmarks](benchmarks.md) — case study-গুলো যে eval set-এর against measure হয়
- [Reference: conventions](conventions.md) — env vars, log format, audit log field
