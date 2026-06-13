# Reference

> **পাঠক:** ইঞ্জিনিয়ার, ডিপ্লয়ার, অডিটর — যাদের গল্প না, কন্ট্র্যাক্ট দরকার।
> Adoption সেকশন বলে কেন; Reference সেকশন হলো সেই জিনিস যেটা তুমি ওয়্যার করো।

Reference সেকশন হলো স্পেক। ছোট, নির্দিষ্ট, ভার্সনযুক্ত। এই সেকশনের কোনো নম্বর, সিগনেচার বা ফাইলনেম যদি কোডের সাথে না মেলে, কোড জেতে — এবং এই সেকশন পরবর্তী কমিটে আপডেট হয়।

---

## এই সেকশনের পেজগুলো

| পেজ | কী স্পেসিফাই করে |
| --- | --- |
| [Python API](python-api.md) | প্রতিটা মডিউল expose করা typed contract (`ChatRequest`, `ChatResult`, `TriageOutput`, `RAGOutput`, `ShiftSummary`), `Workflow.run()` contract, `LMStudioClient` wrapper, FastAPI integration। |
| [CLI](cli.md) | `aiwf` কমান্ড, প্রতিটা সাবকমান্ড (`isp-classify`, `rag-ask`, `summarize-shift`, `bench`, `doctor`), গ্লোবাল ফ্ল্যাগ, exit code, env vars, TOML config। |
| [Prompts](prompts.md) | প্রোডাকশনে থাকা চারটা system prompt (triage, RAG-with-citations, shift summary, code-mixed Bengali handling), প্রতিটার ডিজাইন র‍্যাশনেল, ভার্সনিং। |
| [Benchmarks](benchmarks.md) | reproducible eval harness, পাঁচটা frozen eval set, প্রতিটা মেট্রিকের বার, benchmark report-এর ফরম্যাট। |
| [Glossary](glossary.md) | সাইটে ব্যবহৃত প্রতিটা টার্মের বর্ণানুক্রমিক সংজ্ঞা, canonical পেজে লিঙ্কসহ। |
| [Conventions](conventions.md) | রিপোজিটরি লেআউট, naming, env vars, config file, audit log format, log format, prompt ও eval-set storage, versioning, runtime যা করে না। |

---

## পেজগুলো কীভাবে একসাথে বসে

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

"একটা request কী করে" — জানতে চাইলে উপর থেকে নিচে পড়ো। "audit log কী বলে" — জানতে চাইলে নিচ থেকে উপরে পড়ো।

---

## স্টেবিলিটি

- **Typed contract** (Pydantic মডেল, [Python API](python-api.md)-এ) একটা major `module_version`-এর মধ্যে semver-stable। ফিল্ড যোগ হলে minor bump; ফিল্ড rename বা remove হলে major bump।
- **CLI** ([CLI](cli.md)-তে) একটা major `aiwf` ভার্সনে semver-stable। ফ্ল্যাগ যোগ মানে minor bump; ফ্ল্যাগ rename বা remove মানে major bump।
- **Prompt** ([Prompts](prompts.md)-এ) eval set-এর গতিতে পরিবর্তন হয়। বার ধরে রেখে prompt-এ যে পরিবর্তন, সেটা `module_version` bump না, `v(N+1)` prompt ভার্সন।
- **Bar** ([Benchmarks](benchmarks.md)-এ) শুধু CISO নাড়ালে নড়ে।
- **Audit log schema** ([Conventions](conventions.md)-এ) একটা major `audit_schema` ভার্সনে append-only।

`module_version 1.4.2`-এ যে ডিপ্লয়মেন্ট কাজ করেছে, `1.4.3`-এও করবে, `1.5.0`-তেও। `2.0.0`-তে migration ছাড়া করবে না।

---

## আরও পড়ার জন্য

- [Adoption: overview](../../adoption/index.md) — চারটা ফেজ
- [Architecture: overview](../../architecture/index.md) — লেয়ার করা সিস্টেম
- [Case studies: overview](../../case-studies/index.md) — তিনটা প্রোডাকশন ডিপ্লয়মেন্ট
- [Reference: glossary](glossary.md) — এই পেজগুলোতে ব্যবহৃত টার্ম
