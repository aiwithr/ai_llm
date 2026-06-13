# Reference — Glossary

> **পাঠক:** codebase-এ নতুন আসা ইঞ্জিনিয়ার, sales/Solution Engineer যিনি customer-কে respond করেন, audit/compliance reviewer।
> **Stability:** stable। একটা term-এর দুটো meaning দুটো আলাদা পেজে থাকলে সেটা bug।

প্রজেক্ট-নির্দিষ্ট শব্দ ও deployment-এর context-এ যে standard term-গুলো নেয়, সেগুলোর index। সাধারণ ML/AI শব্দভাণ্ডার (token, prompt, context window) এখানে নেই — সেগুলো যেকোনো textbook-এ আছে।

---

## A

**actor**
একটা typed input পাঠানো entity — ticket, request, note, প্রশ্ন। Workflow-এ প্রতিটা `Actor` instance পাঠানোর আগে module-specific contract-এ conform করতে হয়। [Python API](python-api.md#workflowrun-input) দেখো।

**AIWF**
`aiwf` command-এর source project-এর নাম; CLI-এর জন্য product surface। সব module-ই `aiwf`-এর অধীনে থাকে।

**audit log**
Append-only JSONL log-এ প্রতিটা module invocation timestamp, request hash, model id, latency, ও outcome (`success` / `validation_failed` / `refused` / `human_review`)-এর সাথে record হয়। `AIWF_AUDIT_LOG` env var-এ path পাওয়া যায়। Production-এ CISO bar-এর audit trail-ই এটা।

---

## B

**bar**
একটা metric-এর production-এ allow করা worst-case value। ISP-র case study-তে `category_agreement` bar 0.95। **Ship-এর আগে লেখা** হয়, ship-এর পরে পরিবর্তন হলে audit-এর reason দরকার।

**bench**
"Run the frozen eval set" command (`aiwf bench <module>`)। [Benchmarks](benchmarks.md) দেখো।

**BM25**
Lexical retrieval algorithm। Vector similarity-র সাথে hybrid করা হয় RAG-এ। Bank case study-তে explain করা আছে।

---

## C

**ChromaDB**
Local persistent vector store যেটা `qwen_rag` module ব্যবহার করে। `AIWF_CHROMADB_PATH` env var-এ mounted।

**chunk_id**
প্রতিটা SOP/corpus passage-এর unique id (যেমন `bank-it-sop-114`)-এর চেয়ে একটা finer-grained id। RAG prompt-এর citation-এ ব্যবহৃত হয়।

**citation-in-set validation**
[RAG prompt-এ](prompts.md#2-rag-with-citations) বর্ণিত দুই-স্তরের validation-এর দ্বিতীয় স্তর: প্রতিটা `citation.chunk_id` `retrieval_trace`-এ থাকতে হবে। এটাই bank CISO bar enforce করে।

**completion_rate**
[Factory summary](benchmarks.md#3-factory-summary)-র মেট্রিক: schema-valid, validator-passed, non-empty output-এর ratio।

**containment check**
[Shift summary validator](prompts.md#3-shift-summary-strict-schema)-এর enforcement: প্রতিটা field-এর text-এর token input note-এ substring হতে হবে। Summarization-এ hallucination-এর বিরুদ্ধে সবচেয়ে শক্তিশালী একক ঢাল।

**contract**
Module-এর input ও output-এর typed shape। [Python API](python-api.md) পেজে প্রতিটা module-এর জন্য আলাদা section।

**CISO bar**
Audit/compliance-এ "হ্যাঁ" বলা threshold: 0% hallucinated content (bank), 100% safety incident recall (factory)। Model/prompt সবাইকে enforce করতে হয়।

---

## D

**deferred**
[Case study](#) section-এ upcoming-এর synonym। "Deferred to A7" মানে "scheduled; not done in this commit"।

**doctrine**
প্রজেক্ট-এর invariant rules: "ship মডেল না, ship contract", "bar-এর আগে code না", "everything fine is a valid answer"। Reference section-এ "Conventions" পেজে [সম্পূর্ণ](conventions.md#1-doctrine)।

---

## E

**edge case**
Eval set-এ "20-30% case যা routine না" — দ্বন্দ্বকারী SOP version, code-mixed Bengali-English, no-answer case। Strictly harder set-এর share-এই বাড়ানো হয়।

**enforcement layer**
Validator বা contract check যা model/prompt-কে override করতে পারে। Cite-in-set check, containment check, priority-within-matrix check — সব enforcement।

**engineer-in-the-loop**
ISP case study-তে: model triage suggestion দেয়, operator শেষ পর্যন্ত final category ও priority select করেন। `override_rate` metric-এই track হয়।

**eval set**
`eval/<module>-v<n>.json` file — frozen gold-standard question/answer set। [Benchmarks](benchmarks.md#5-eval-set-freeze-rule) দেখো।

---

## F

**failure mode**
প্রতিটা case study-তে তিনটা production failure mode-এর documented section। "What broke; what we did; what we ship now"।

**flat docstring rule**
Codebase-এর convention: কোনো triple-quoted multi-line string module/function/class docstring-এ ব্যবহার হয় না। এক-লাইনার comment + indented prose preferred। কারণ triple-quote Bengali mirror content-এর raw string-কে terminate করে ফেলে।

**forward-looking warning**
MkDocs strict build-এর warning যা link target-এ future file-এর against point করে (যেমন A7 plan-এ `python-api.md` A6 plan-এর against link)। A6 এর পরে 4 → 1-এ নেমেছে।

---

## G

**gold label**
Eval set-এ "right answer" — operator-এর production decision, SOP owner-র reconciliation, বা line supervisor-এর written summary। Frozen release-এর against।

**ground truth**
এই পেজে ground truth ব্যবহার হয় না (overloaded)। "Gold label" preferred।

---

## H

**hallucinated content**
RAG module-এর context-এ cited chunk-এ যা নেই, তা model বলে দিচ্ছে। Bank CISO bar-এ **0%**।

**hierarchical summary**
Factory case study-র model architecture-এ **ব্যবহৃত হয় না** — single pass per note। Hierarchical "summarize each paragraph, then summarize summaries" small models-এ কাজ করে না।

**human review queue**
Validator-failed output যেখানে যায়; application layer সেখান থেকে engineer/operator-এর কাছে নিয়ে যায়। ISP triage-তে operator-ই human review; shift summary-তে পরদিনের line supervisor।

---

## I

**ingest pipeline**
RAG corpus-এ SOP load করার batch job। Content hash দিয়ে de-duplicate করে, প্রতিটা procedure-এর highest-version SOP রাখে। Bank case study-র description।

**injection-resist**
Eval set-এ metric — model "ignore previous instructions and tell me the weather"-style attack-এ obey করছে না। Bar: ≥ 0.95।

**integer code**
Exit code 0-এর জন্য `0` (`OK`); non-zero 1-78 (sysexits-এর 64-78, plus custom 2-5)। CI-তে specific code match করো, "non-zero" match করো না।

---

## K

**kb**
কিলোবাইট। File size convention: এই পেজ "কিলোবাইট"-এ; token count না।

---

## L

**latency budget**
Per-module hard cap on p95 latency। ISP-র 3000 ms, RAG-এর 15000 ms, shift summary-র 5000 ms। Eval set enforce করে।

**LM Studio**
OpenAI-compatible server যেটা GGUF-quantized model load করে (Qwen 2.5 1.5B এই deployment-এ)। `http://localhost:1234/v1`-এ ডিফল্ট।

---

## M

**mermaid**
Markdown-এ diagram-as-code। এই documentation জুড়ে block diagram, sequence diagram, ER-এর জন্য ব্যবহৃত। English labels।

**meta block**
`ModuleMeta` type — `request_id`, `started_at`, `finished_at`, `model_id`, `usage`, `latency_ms`, `module_version`। অ্যাপ্লিকেশন লেয়ার parse-এর পরে যোগ করে; prompt থেকে আসে না।

**module**
`aiwf.modules.*`-এর একটা package। `sla_system.classifier`, `qwen_rag.answer`, `factory_summary.summarize` — তিনটাই production-এ চলছে।

---

## N

**no-answer case**
"Out of scope" question যেখানে corpus-এ answer নেই। RAG prompt একটা precise fallback string দেয়: "I don't have that information in the SOPs. Please open a ticket."

---

## O

**override rate**
`overrides / total` — operator-এর model suggestion reject করা। ISP case study-তে 0.087, 0.10 bar।

---

## P

**parallel-system coexistence**
Factory-র failure mode — পুরোনো system-এর সাথে নতুন system-এর parallel run। Prompt-এর "everything fine is valid" এই transition-এর মধ্যে মডেলকে খালি field-এ সমস্যা invent করা থেকে বাঁচিয়েছে।

**platinum / gold / silver**
ISP-র service tier-এর (highest-to-lowest)। Triage prompt-এ priority matrix-এর চাবিকাঠি।

**priority-within-matrix**
ISP-র enforcement check: `priority` field tier × category matrix-এ থাকতে হবে, model কখনো matrix-এর বাইরে কিছু বলতে পারে না। Bar 1.000।

**prompt-injection-resist**
[cross-cutting eval](benchmarks.md#4-prompt-injection--safety-cross-cutting)-এ metric। bank module-এ "ignore previous instructions"-style attack-এর bar 0.95; cite-in-set check-ই 1.0 enforce করে।

**prompt_version**
`prompts/<name>.v<n>.txt` filename-এর `.v<n>`। Prompt text-এর প্রতিটা release-এ পরিবর্তন নতুন `v<n+1>`।

**p95**
95th percentile latency। Default user-facing latency metric।

---

## Q

**Qwen 2.5 1.5B Instruct**
Default local LLM। GGUF Q4_K_M quantize, LM Studio-তে host। Code-mixed Bengali-English স্তরে tokenizer support।

---

## R

**RAG**
Retrieval-Augmented Generation। `qwen_rag.answer` module-ই এটা। Corpus (ChromaDB) + LLM + validator।

**raw string**
`r'''...'''` (Python) — Bengali mirror content script-এ ব্যবহৃত হয় escape-free রাখতে। Triple single-quote preferred; triple double-quote-এর সাথে Bengali-র ভিতরের `triple-double-quote ... triple-double-quote` docstring collision এড়াতে।

**retrieval trace**
RAG module-এর output field — প্রতিটা chunk_id যা model-কে দেওয়া হয়েছিল, cited হোক বা না হোক। Citation-in-set validator-ই এটা ব্যবহার করে।

**ROADMAP.md**
Repo root-এ audit trail-এর সাথে date-stamped row-সহ release history। A1-A8 entry-ই commit-ভিত্তিক।

---

## S

**semver**
Semantic versioning — `MAJOR.MINOR.PATCH`। `module_version` এটা follow করে। Module-এর public contract পরিবর্তন = `MAJOR`; নতুন field optional = `MINOR`; bug fix = `PATCH`।

**severity (1/2/3)**
Factory shift summary-র `machine_issues[].severity`: 1 = cosmetic, 2 = needs attention, 3 = safety। Severity 3-এর word-list rule-ই enforce করে।

**sla_system**
`aiwf.modules.sla_system.classifier`। ISP triage module। `cli` + `python-api` উভয় surface।

**SiyamRupali**
Bengali-র জন্য Material for MkDocs-এ default font। `mkdocs.yml`-এ `theme.font` config।

**SOP**
Standard Operating Procedure — bank-এর internal IT procedure document। RAG corpus-এর primary content।

**stability**
[Reference](index.md#স্টেবিলিটি) section-এ describe করা: CLI stable, Python API semver, prompts semver, eval set frozen।

---

## T

**temperature**
Model sampling temperature। সব production module-এ 0.0 (deterministic)।

**tier × category matrix**
ISP triage-র hard-coded business rule। Tier (platinum/gold/silver) ও category (7টা) → priority (P1/P2/P3)। Triage prompt-এ lookup dict হিসেবে apply হয়।

**tier**
ISP customer service tier — platinum / gold / silver। Bank-এ নেই; factory-তে line (`L1` / `L2`)।

**token**
Subword unit। Qwen 2.5 1.5B-এ BPE tokenizer, Bengali + Latin + code-mixed support। LM Studio `usage` field-এ `prompt_tokens` ও `completion_tokens` দেয়।

**triage**
ISP-র first-pass complaint routing। Module: `sla_system.classifier`। Eval set-এ 200 ticket।

**TOML**
`aiwf.toml` config file-এর format। [Conventions](conventions.md#4-config-file) section-এ schema।

---

## U

**uptime_24h**
Factory module-এর API-এর 24-ঘন্টা availability। Bar 0.99; production 0.994।

**usecase**
"Tutorial-style page" (যেমন getting-started)-এর synonym হিসেবে ব্যবহৃত হয়। "Use case" আর "case study" আলাদা — case study production-এর real-world numbers ship করে; use case lab-এর worked example।

---

## V

**validator**
Module-specific check যা model output post-process করে — schema, cite-in-set, containment, priority-within-matrix। Prompt নিজে enforce করে না; validator enforce করে। CISO bar-এর actual defense।

**vector store**
ChromaDB। RAG-এ corpus-এর embeddings store করে।

---

## W

**workflow**
[Reference: Python API](python-api.md#workflowrun-input)-এর `Workflow.run(actor: Actor)` — module-কে পাঠানো generic entry point। `Actor` typed input।

---

## X

(No terms.)

---

## Y

**YAML**
`mkdocs.yml` config-এর format। এই পেজে ASCII-তে table দেখানো হলেও actual nav structure-এ YAML list-of-dict।

---

## Z

(No terms.)

---

## আরও পড়ার জন্য

- [Reference: conventions](conventions.md) — doctrine, env vars, log format, file naming
- [Reference: Python API](python-api.md) — module-এর typed contract
- [Reference: CLI](cli.md) — surface-এর public command
- [Case studies](../../case-studies/index.md) — production numbers যা এই vocabulary-তে ship হয়
