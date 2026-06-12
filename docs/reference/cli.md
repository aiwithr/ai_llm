# Reference — CLI

> **Audience:** operators and CI pipelines. The CLI is the same surface you would use in a cron job, a smoke test, or a one-off debugging session.
> **Stability:** stable. The CLI is the public interface; changes require a deprecation notice in the changelog.

The project ships a single command, `aiwf`, with subcommands per module. Every subcommand follows the same shape: read from stdin or a file, write to stdout, exit non-zero on failure, and never prompt.

---

## 1. The top-level command

```bash
aiwf --help
aiwf --version
aiwf doctor              # verify the install: model reachable, corpus mounted, etc.
aiwf isp-classify        # one module
aiwf rag-ask            # another
aiwf summarize-shift    # another
aiwf bench              # run the eval harness
```

`aiwf --version` prints the version of `aiwf` itself. The module version is in the output of each subcommand's `--version` (or in the `meta.module_version` field of the JSON output).

### Global flags

| Flag | Purpose | Default |
| --- | --- | --- |
| `--json` | emit machine-readable JSON instead of human-readable text | `false` |
| `--quiet` | suppress progress, only print the result and errors | `false` |
| `--config PATH` | path to a TOML config file (see [conventions](conventions.md#4-config-file)) | `./aiwf.toml` |
| `--log-level LEVEL` | `debug` / `info` / `warning` / `error` | `info` |
| `--no-color` | disable ANSI colour codes (CI-friendly) | `false` |

### Exit codes

| Code | Meaning |
| --- | --- |
| `0` | success |
| `1` | generic error |
| `2` | invalid arguments (parse / validation failure) |
| `3` | LM Studio unreachable (see `aiwf doctor`) |
| `4` | corpus missing or unreadable (RAG only) |
| `5` | output validation failed and re-prompt exhausted (likely model / data issue) |
| `64`–`78` | reserved for `sysexits.h` codes (matches `grep`'s convention) |

CI pipelines should match on the specific codes, not on "non-zero". A `5` is a data problem, not a deploy problem.

---

## 2. `aiwf doctor`

Verify the install. This is the first command to run after `pip install ai-work-flow` and on every CI build.

```bash
aiwf doctor
```

It checks, in order:

1. **LM Studio reachable** at `http://localhost:1234/v1` (or the URL in `LMSTUDIO_BASE_URL`).
2. **Model loaded** — the configured model id is in the `/v1/models` response.
3. **Corpus mounted** (RAG only) — the configured ChromaDB path is readable.
4. **Audit log writable** — the path in `AIWF_AUDIT_LOG` is openable in append mode.
5. **Disk space** — at least 5 GB free on the volume that holds ChromaDB and the audit log.

Output is a JSON object (with `--json`) or a coloured table. Each row has a status (`ok` / `warn` / `fail`) and a one-line message. Exit code is `0` only if all rows are `ok`.

---

## 3. `aiwf isp-classify`

Tier-1 complaint triage, used by the [ISP case study](../case-studies/isp-support.md).

```bash
aiwf isp-classify --subject "No internet since 6am" \
                  --body "..." \
                  --tier platinum
```

### Input

| Flag | Required | Notes |
| --- | --- | --- |
| `--subject` | yes | free-form complaint subject |
| `--body` | yes | free-form complaint body |
| `--tier` | yes | `platinum` / `gold` / `silver` |
| `--from-file` | no | path to a JSON file with the above fields; takes precedence over individual flags |

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

### See also

- [Python API: `TriageRequest` / `TriageResult`](python-api.md#sla_systemclassifier-tier-1-complaint-triage)
- [Reference: prompts — triage](prompts.md#1-triage)

---

## 4. `aiwf rag-ask`

Answer a "how do I…" question against an internal corpus, used by the [bank case study](../case-studies/bank-it.md).

```bash
aiwf rag-ask "How do I reset a user's CBS password?" \
            --corpus bank-it-sops \
            --top-k 4
```

### Input

| Flag | Required | Notes |
| --- | --- | --- |
| `question` (positional) | yes | the question text |
| `--corpus` | yes | corpus id; must exist in ChromaDB |
| `--top-k` | no | default `4`; max `10` |
| `--min-score` | no | cosine threshold; below this the result is "I don't know" |
| `--require-citation` | no | default `true`; if `false`, the answer may omit citations (only for ad-hoc exploration) |

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

If the corpus does not contain an answer, the output is:

```
answer:  I don't have that information in the SOPs. Please open a ticket.
citations: []
```

…and the exit code is still `0`. A missing answer is not an error.

### See also

- [Python API: `RAGRequest` / `RAGResult`](python-api.md#qwen_raganswer-rag-over-an-internal-corpus)
- [Reference: prompts — RAG](prompts.md#2-rag-with-citations)

---

## 5. `aiwf summarize-shift`

Summarize a line-leader's handwritten shift note, used by the [factory case study](../case-studies/factory-it.md).

```bash
aiwf summarize-shift --line L2 --shift morning --note-file note-2026-06-12.txt
```

### Input

| Flag | Required | Notes |
| --- | --- | --- |
| `--line` | yes | `L1` / `L2` |
| `--shift` | yes | `morning` / `afternoon` / `night` |
| `--note` | no | the note text (use this OR `--note-file`) |
| `--note-file` | no | path to a UTF-8 file with the note text |
| `--author-id` | no | default `unknown`; recorded in audit log |

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

If the note cannot be summarized (containment check fails twice), the output is `validated: false` and the note is written to a "human review" queue. Exit code is `0`; the application is expected to read `validated` and act accordingly.

### See also

- [Python API: `ShiftNote` / `ShiftSummary`](python-api.md#factory_summarysummarize-shift-handover-summarization)
- [Reference: prompts — shift summary](prompts.md#3-shift-summary-strict-schema)

---

## 6. `aiwf bench`

Run the frozen eval set against a module. This is what produces the numbers in the case studies and the [benchmarks](benchmarks.md) page.

```bash
aiwf bench sla-classify            # run ISP eval set
aiwf bench rag-ask                 # run bank eval set
aiwf bench summarize-shift         # run factory eval set
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

Exit code is `0` if every metric meets its bar, `5` otherwise. The output is also written to `bench-results/<module>-<timestamp>.json` for the audit log.

### See also

- [Reference: benchmarks](benchmarks.md) — what each eval set measures and where the bars come from

---

## 7. Environment variables

The CLI reads from the environment, not from flags, for anything that is the same across calls. The convention is `AIWF_*` (uppercase, snake_case).

| Variable | Default | Purpose |
| --- | --- | --- |
| `LMSTUDIO_BASE_URL` | `http://localhost:1234/v1` | LM Studio endpoint |
| `AIWF_MODEL_DEFAULT` | `qwen2.5-1.5b-instruct` | model id for all subcommands that don't override |
| `AIWF_AUDIT_LOG` | `/var/log/aiwf/audit.log` | path to the append-only audit log |
| `AIWF_CHROMADB_PATH` | `/var/lib/aiwf/chromadb` | RAG corpus location |
| `AIWF_LOG_LEVEL` | `info` | same as `--log-level` |
| `AIWF_TELEMETRY` | `off` | `off` is the only supported value; the CLI does not phone home |

See [conventions](conventions.md#3-environment-variables) for the full env-var contract.

---

## 8. Configuration file

For deployments where flags and env vars are not enough (e.g., per-module model overrides, custom retry budgets), use a TOML file:

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

The CLI loads `./aiwf.toml` by default. Override with `--config PATH`.

---

## 9. See also

- [Reference: Python API](python-api.md) — the typed contracts behind each subcommand
- [Reference: prompts](prompts.md) — the exact system prompts
- [Reference: benchmarks](benchmarks.md) — the eval sets the case studies are measured against
- [Reference: conventions](conventions.md) — env vars, log format, audit log fields
