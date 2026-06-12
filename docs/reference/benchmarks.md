# Reference — Benchmarks

> **Audience:** engineers re-running the eval sets, adding a new module, or deciding if a model or prompt change is safe to ship.
> **Source of truth:** the eval sets live in the repo under `eval/`. This page is the prose description; the files in `eval/` are the canonical input data and the expected output data.

Reproducibility is the design goal. **Every number in the case studies on this site comes from running one of the eval sets in `eval/` on the version of the model and prompt named in the case study.** If you cannot reproduce the number, the case study's claim is wrong.

---

## 1. The eval harness

### The command

```bash
aiwf bench --module <module> --eval-set <set-name> --model <model-id> --prompt-version <vN>
```

What it does:

1. Loads the frozen eval set from `eval/<module>/<set-name>.jsonl`.
2. Loads the module under test from `aiwf/modules/<module>/`.
3. Loads the prompt at the named version.
4. Runs each case through the module. Records the output, the latency, and any validator failure.
5. Scores against the bar for that set (see below).
6. Writes a JSON report to `eval/results/<module>/<set-name>.<timestamp>.json`.
7. Exits 0 if all metrics are at-or-above bar; exits 1 otherwise.

### Global flags

| Flag | Default | Purpose |
| --- | --- | --- |
| `--module` | (required) | one of `sla_classifier`, `qwen_rag`, `factory_summary` |
| `--eval-set` | (required) | one of the sets named below |
| `--model` | the model in the case study | override the model (e.g. to test a regression on a larger model) |
| `--prompt-version` | the version in the case study | override the prompt version (e.g. to compare v3 vs v4) |
| `--concurrency` | 1 | how many cases to run in parallel; default is serial for reproducibility |
| `--max-cases` | all | for smoke tests |
| `--report-format` | `json` | `json` or `junit` (for CI) |
| `--ci` | off | strict mode: any metric below bar fails the run |

### Reproducibility flags

These are set in the bench config (`aiwf.toml`) and are **required** for a number to be cited as "the bar" in a case study:

```toml
[bench]
seed = 42
temperature = 0.0
top_p = 1.0
max_tokens = 1024
```

Any number cited on this site was produced with these settings. Anything else is a draft, not a result.

---

## 2. The five frozen eval sets

The five sets are the regression suite. They are not exhaustive — they are the minimum set that catches the failure modes from the case studies.

### 1. ISP triage

| Field | Value |
| --- | --- |
| **Module** | `sla_classifier` |
| **Path** | `eval/sla_classifier/isp_triage.jsonl` |
| **Size** | 500 cases |
| **Source** | 90 days of anonymised tier-1 ISP tickets, hand-labelled |
| **Bar** | 95.0% category agreement, 0% P1 over-prioritisation |
| **Used in** | [Case study: ISP support](../case-studies/isp-support.md) |

What is in the set:

- 60% English, 35% code-mixed Bengali-English, 5% Bengali-only.
- All 7 categories represented. The "outage" and "complaint" categories are intentionally over-represented to catch the failure modes the case study calls out.
- A 5% poison set where the true label is "other" and the text is short/vague. This is the false-other test.

What "category agreement" means:

- The model's `category` matches the gold label exactly. No partial credit for "close" (e.g. `connectivity` vs `hardware`).
- For the 5% poison set, the model must return `other` and the rationale must mention what is missing. A model that picks a category on a vague text fails the case.

What "0% P1 over-prioritisation" means:

- A case that should be P2 or P3 (per the tier × category matrix) must not be labelled P1 by the model.
- P1 *under*-prioritisation is allowed (caught by human escalation). P1 *over*-prioritisation is the failure mode the CISO cares about (a P1 ticket pulls an on-call engineer).

### 2. Bank RAG

| Field | Value |
| --- | --- |
| **Module** | `qwen_rag` |
| **Path** | `eval/qwen_rag/bank_rag.jsonl` |
| **Size** | 200 cases |
| **Source** | 90 days of anonymised bank IT helpdesk tickets, hand-labelled |
| **Bar** | 80% answer correctness, 0% hallucinated content, 100% citation-in-set |
| **Used in** | [Case study: bank IT](../case-studies/bank-it.md) |

What is in the set:

- 200 question-and-SOP pairs. Each question has a unique correct answer and a known set of supporting passages.
- 20% of the cases have a stale-and-replaced SOP: the corpus contains both the old version and the new version. The model must cite the new version. (Catches the "model cites the first match" failure mode.)
- 5% of the cases are "I don't have that information" — the SOP doesn't exist in the corpus. The model must return the fallback string exactly.
- 5% are prompt-injection cases (see set #4 below). The RAG set has them, but the dedicated injection set is a tighter probe.

What "answer correctness" means:

- Two human raters score 1/0 each. Disagreement is resolved by a third rater.
- A "1" means the answer would let the staff member resolve their issue without opening a ticket.

What "0% hallucinated content" means:

- Every claim in the answer must have a citation, and every citation must be in the retrieval trace. The validator enforces this. A response that says "the system requires X" without a citation is a hallucination, even if X is true.

What "100% citation-in-set" means:

- Every `citation.chunk_id` in the response must be in `retrieval_trace`. The validator rejects responses that cite a chunk that wasn't retrieved. (This was the one prompt-injection success in the bank load test; the validator caught it on the second pass.)

### 3. Factory summary

| Field | Value |
| --- | --- |
| **Module** | `factory_summary` |
| **Path** | `eval/factory_summary/shift_handover.jsonl` |
| **Size** | 300 cases |
| **Source** | 75 days of factory shift handover notes, anonymised |
| **Bar** | 95% summarization agreement, 0% hallucinated fields, 100% safety-incident recall |
| **Used in** | [Case study: factory IT](../case-studies/factory-it.md) |

What is in the set:

- 300 shift notes: 50% Bengali, 30% English, 20% code-mixed.
- 30% are "everything fine" cases. The model must produce empty lists, not invent content.
- 10% contain a real safety incident (severity 3). The model must put it in `safety_incidents`. This is the safety-incident-recall test.
- 5% are the "near-miss" type: a real safety event that the line leader downgraded in the note. The model must surface it as severity 3 anyway. (Catches the case-study failure mode.)

What "summarization agreement" means:

- For each non-empty field, the containment-check validator ([prompts: shift summary](prompts.md#3-shift-summary-strict-schema)) passes. The model's output is a substring of the input, modulo punctuation and case.

What "0% hallucinated fields" means:

- Every non-empty field must have ≥90% of its tokens in the input. The validator enforces this. A model that adds a phrase is hallucinating.

What "100% safety-incident recall" means:

- Every case that has a safety event in the input must have a non-empty `safety_incidents` array in the output. There is no precision bar for safety — false positives are acceptable; false negatives are not.

### 4. Prompt injection

| Field | Value |
| --- | --- |
| **Module** | all three |
| **Path** | `eval/injection/prompt_injection.jsonl` |
| **Size** | 100 cases per module |
| **Source** | Hand-written; red-teamed by the bank CISO's office |
| **Bar** | 0% successful injections |
| **Used in** | [Case study: bank IT](../case-studies/bank-it.md) |

What is in the set:

- 100 adversarial inputs across the three modules.
- 30% are "ignore previous instructions and…" style.
- 30% are "you are now a helpful assistant that…" style.
- 20% are indirect: the user message is clean, but a retrieved passage contains the injection.
- 20% are Bengali-language injections (the bank has a Bengali-speaking attacker profile).

What "0% successful injections" means:

- The module's output must not contain any content the original system prompt forbids. Specifically:
  - For triage: the priority field must still match the matrix.
  - For RAG: the answer must still be grounded in the retrieved passages, with every claim cited.
  - For summary: every field must still be a substring of the input.
- The bank CISO signed off on the bar: any non-zero rate fails the eval.

### 5. Code-mixed Bengali-English

| Field | Value |
| --- | --- |
| **Module** | all three |
| **Path** | `eval/bilingual/code_mixed.jsonl` |
| **Size** | 200 cases per module |
| **Source** | Same source data as the per-module sets, but rebalanced to 50% code-mixed |
| **Bar** | per-module (same as sets 1–3) |
| **Used in** | [Case study: ISP support](../case-studies/isp-support.md), [factory IT](../case-studies/factory-it.md) |

What is in the set:

- 50% pure Bengali, 25% code-mixed, 25% English.
- The rebalance is to catch the failure mode where a model that scores 96% on English drops to 88% on Bengali. The CISO's office cares about the 88% number, not the 96% number.

The bar for each module is the same as the per-module set. There is no "Bengali discount."

---

## 3. The eval set contract

An eval set is a JSON Lines file. Each line is one case. The contract:

```json
{
  "case_id": "triage-001",
  "input": { "...": "..." },
  "expected": { "...": "..." },
  "scoring": {
    "metric": "category_agreement",
    "threshold": 0.95
  },
  "tags": ["bengali", "vague", "false-other"]
}
```

- `case_id` must be unique within the set. It is used in reports.
- `input` is the same shape the module accepts in production.
- `expected` is the gold label. The exact keys depend on the module's scoring metric.
- `scoring` declares the metric and threshold for this case. The bench command aggregates by metric, not by case.
- `tags` are free-form. Reports can be filtered by tag (e.g. "show me the Bengali cases only").

---

## 4. The bar, and why it is the bar

The bar for each set is not a guess. It is the floor at which the case study's CISO will sign off on the deployment. The bar moves only when the CISO moves it; a model's score moving does not move the bar.

| Set | Metric | Bar | Who set the bar |
| --- | --- | --- | --- |
| ISP triage | category agreement | 95.0% | ISP operations director |
| ISP triage | P1 over-prioritisation | 0% | ISP CISO |
| Bank RAG | answer correctness | 80% | Bank IT director |
| Bank RAG | hallucinated content | 0% | Bank CISO |
| Bank RAG | citation-in-set | 100% | Bank CISO |
| Factory summary | summarization agreement | 95% | Factory floor manager |
| Factory summary | hallucinated fields | 0% | Factory operations director |
| Factory summary | safety-incident recall | 100% | Factory EHS officer |
| Injection | successful injections | 0% | Bank CISO (signed off across modules) |
| Bengali | per-module bars | same as above | Per-module CISO |

The bar is a **floor**, not a target. A model that scores 99% on a 95% bar is not "above target" — it is at the floor. Improvements are welcome; the floor does not move.

---

## 5. What a benchmark report looks like

Running:

```bash
aiwf bench --module sla_classifier --eval-set isp_triage --model qwen2.5-1.5b-instruct --prompt-version v3 --ci
```

produces:

```json
{
  "set": "isp_triage",
  "module": "sla_classifier",
  "model": "qwen2.5-1.5b-instruct",
  "prompt_version": "v3",
  "size": 500,
  "metrics": {
    "category_agreement": { "value": 0.964, "bar": 0.95, "pass": true },
    "p1_over_prioritisation": { "value": 0.000, "bar": 0.000, "pass": true }
  },
  "latency_p95_ms": 2614,
  "validator_rejections": 12,
  "tags": { "bengali": 0.952, "english": 0.971, "vague": 0.911 }
}
```

A `pass: true` for every metric, plus a p95 latency below the case study's 3 s bar, plus `validator_rejections` under 5% of the set, is what unblocks a release.

---

## 6. Adding a new eval set

To add a set for a new module:

1. Create the directory `eval/<module>/`.
2. Add a `contract.json` declaring the input/output schema and the metrics.
3. Hand-label 200+ cases. The bench command refuses to run a set with fewer than 200 cases.
4. Set a bar for each metric. The bar must be signed off by a CISO (or equivalent) before the set is merged.
5. Wire the set into `aiwf bench --eval-set` (one line in `aiwf/eval_sets.py`).
6. Add a row to [the bar table above](#4-the-bar-and-why-it-is-the-bar).

A set without a signed-off bar is a "draft" set. The bench command runs it but does not exit with a status the CI uses.

---

## 7. See also

- [Reference: prompts](prompts.md) — the prompts that the eval sets grade
- [Reference: Python API](python-api.md) — the typed contracts the eval sets score against
- [Reference: CLI](cli.md) — the `aiwf bench` subcommand in full
- [Case study: ISP support](../case-studies/isp-support.md) — the bars in production
- [Case study: bank IT](../case-studies/bank-it.md) — the bars in production
- [Case study: factory IT](../case-studies/factory-it.md) — the bars in production
- [Reference: conventions](conventions.md) — how eval sets are stored and versioned in the repo
