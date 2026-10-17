# Content Inventory & Cross-Language Delta Tracker (English vs. বাংলা)

> **Purpose:** This file documents the exact content divergence between the English source files and the Bangla mirrors. It identifies content-rich Bangla chapters containing domain knowledge not present in English, as well as English chapters that currently lack Bangla mirrors.
> **Source of Truth Doctrine:** English is the primary source of truth. Any unique operational insights or deep explanations discovered in Bangla must be elevated into English, and Bangla mirrors must subsequently align with the canonical English text.

---

## 1. Executive Summary of Cross-Language State

* **Total English Documentation Files:** 59 files (~13,500 lines)
* **Total Bangla Documentation Files:** 38 files (~8,500 lines)
* **Paired (Bilingual) Files:** 38 files
* **English-Only Files:** 21 files (mostly child pages of the 8 technical modules)
* **Bangla-Only Files:** 0 files (all have English parent or counterpart)
* **Orphaned from Navigation:** 8 files (7 Bangla files + `AUDIT.md`)

---

## 2. High-Priority "Bangla-Rich" Chapters

The following Bangla chapters were found to contain significant, high-value domain explanations, operational tables, or real-world numbers that are **either missing or significantly abbreviated** in the current English version. These must be elevated into English during Stage 1 and Stage 2:

### A. `docs/bangla/adoption/index.md` vs. `docs/adoption/index.md`
* **Divergence:** English has 51 lines; Bangla has 98 lines (Size Ratio: 5.7x).
* **Unique Bangla Content to Back-Port into English:**
  1. **6-Column Comprehensive Phase Table:** Includes concrete columns missing in English: *Timebox ("সময়")*, *Team Allocation ("১ দিন, ১ জন ইঞ্জিনিয়ার")*, *Exit Criteria ("বের-হওয়ার মানদণ্ড")*, and *Core Activities*.
  2. **Step-by-Step Practical Deep-Dives:**
     * *Discover:* Explicit hardware fit checks (30-50 GB VRAM requirement calculation), business value formula (cost savings per hour vs. error reduction), and 1-page decision memo template (Yes / No / Yes-but).
     * *Pilot:* 100-case real ticket evaluation set, 1-week shadow mode protocol (human makes final call, model acts as co-pilot), precision/recall bars, and hard 4-week sunset rule.
     * *Build:* Productionizing criteria (health checks, alerts, runbooks, tested rollback plan), ops integration.
     * *Scale:* Center of Excellence (CoE) definition, shared multi-tenant platform guidelines, 5+ independent team onboarding requirement.
  3. **Handoff & Retrospective Protocol:** How to transition between phases (deliverable artifact + exit criteria verification + 30-minute retrospective).
  4. **Common Anti-Patterns Table ("সাধারণ ভুল"):**
     * Skipping Discover to Pilot: discovering hardware incompatibility 6 weeks late.
     * Skipping Pilot to Build: discovering accuracy failure after 3 months of engineering.
     * Scaling without a Shared Platform: duplicate LM Studio clients, fractured runbooks.
     * Designing Enterprise Platform before a single working workflow: architecture astronautics.

### B. `docs/bangla/overview.md` vs. `docs/overview.md`
* **Divergence:** English is a sterile 39-line navigation summary; Bangla is a 100-line manifesto titled **"সহজ আলাপ"**.
* **Unique Bangla Content to Back-Port into English:**
  1. **The Non-Technical Manager Empowerment Thesis:**
     * Traditional software: HR, Accounts, or Logistics managers need a custom tool $\rightarrow$ submitted ticket to IT $\rightarrow$ 3-month backlog queue $\rightarrow$ delivered tool does not match operational nuance.
     * AI-driven paradigm: Domain experts possess the most valuable business insight (e.g., an accounts manager knows exactly where invoices get stuck; a logistics officer knows which transit routes fail). Local LLMs / SLMs empower non-coders to generate prototypes and direct workflows without waiting for IT queues.
  2. **Old vs. New Approach Mermaid Flowchart:** Contrasting 3-month IT queue bottlenecks with immediate local tool creation.
  3. **Domain Map:** Visual categorization of use cases across HR (onboarding tracking), Accounts (invoice validation), and Logistics (delivery tracking).

### C. `docs/bangla/reference/glossary.md` vs. `docs/reference/glossary.md`
* **Divergence:** English has 213 lines and truncates at letter "V"; Bangla has 320 lines and covers A–Z.
* **Missing Terms in English Glossary:**
  * `raw string` (Python string safety patterns)
  * `retrieval trace` (chunk citation traces)
  * `semver` (semantic versioning rules for prompt & module schemas)
  * `severity (1/2/3)` (severity definitions across factory and ISP triage)
  * `sla_system` (triage and escalation module definition)
  * `SOP` (Standard Operating Procedure integration)
  * `stability` (stability guarantees for API, CLI, and prompt contracts)
  * `temperature` (determinism via 0.0 temperature in enterprise operations)
  * `tier × category matrix` (P1/P2/P3 ISP business rule lookup)
  * `token` (tokenizer mechanics for Latin, Bengali, and code-mixed inputs)
  * `triage` (first-pass ticket routing specification)
  * `TOML` (`aiwf.toml` configuration specification)
  * `uptime_24h` (24/7 industrial availability SLA)
  * `validator` (schema, citation-in-set, and containment defense layers)
  * `vector store` (ChromaDB on-prem persistence)
  * `workflow` (typed `Workflow.run(actor: Actor)` entry point)

### D. `docs/bangla/case-studies/factory-it.md` vs. `docs/case-studies/factory-it.md`
* **Divergence:** Bangla has 143 lines vs English 114 lines.
* **Unique Bangla Content to Back-Port into English:**
  * Detailed breakdown of the **input device failure mode**: On-screen Bengali keyboard caused code-mixed input tokenization drops (78% model agreement). Switching to physical keyboard + English auto-suggest restored agreement to 96%.
  * Worker adoption behavioral dynamics: Overcoming dual-logging (workers logging both on paper and tablet) by formal retirement of paper logs.
  * The containment validator double-rule: substring check plus automated severity escalation for ambiguous terms ("problem", "check", "issue").

---

## 3. The 21 English-Only Child Pages (Lacking Bangla Mirrors)

The following technical module child pages exist in English but currently do not have corresponding files under `docs/bangla/`. During Stage 5, Bangla mirrors will be created for these:

| Module | English Path | Topic Covered |
|---|---|---|
| **ISP Classifier** | `docs/isp-classifier/baseline.md` | Keyword-based baseline router |
| | `docs/isp-classifier/llm-classifier.md` | Few-shot Qwen classifier |
| | `docs/isp-classifier/comparison.md` | Benchmark metrics: accuracy vs latency |
| **ISP Reasoning** | `docs/isp-classifier-reasoning/reasoning.md`| Chain-of-thought routing |
| **Qwen + RAG** | `docs/qwen-rag/simple-rag.md` | In-memory similarity retrieval |
| | `docs/qwen-rag/vector-storage.md` | ChromaDB vector storage |
| | `docs/qwen-rag/qwen-rag-demo.md` | End-to-end interactive CLI demo |
| **Gemma E4B** | `docs/gemma-e4b/standard-apps.md` | Standard precision vs 4-bit quantization |
| | `docs/gemma-e4b/slm-apps.md` | Security log parsing with Gemma |
| **HR Assistant** | `docs/hr-assistant/hr-manager.md` | Leave policy validation engine |
| | `docs/hr-assistant/hr-assistant.md` | Multi-turn policy conversation |
| | `docs/hr-assistant/sales-funnel.md` | B2B lead score triage |
| **SLA System** | `docs/sla-system/classifier.md` | Breach probability calculation |
| | `docs/sla-system/erp-approval.md` | Multi-level approval escalation |
| **Smart Gift** | `docs/smart-gift/admin.md` | Catalog administration & curation |
| **LLM Demos** | `docs/llm-demos/lm-demos.md` | LM Studio integration harness |
| | `docs/llm-demos/hierarchy.md` | Supervisor-worker multi-model routing |
| | `docs/llm-demos/mini-quick.md` | 50-millisecond cached triage |
| | `docs/llm-demos/stress-test.md` | Concurrency & memory leak tests |
| **MLOps** | `docs/mlops/churn-prediction.md` | Churn feature pipeline |
| | `docs/mlops/model-registry.md` | Pinned model weights & hash check |
| | `docs/mlops/monitoring.md` | Token latency & drift metrics |
| | `docs/mlops/ab-testing.md` | Shadow traffic splitting |
| | `docs/mlops/retraining.md` | Scheduled fine-tuning trigger |

---

## 4. Cross-Language Harmonization Rules

When updating or translating between English and Bangla:

1. **English Prose Style:**
   * Direct, operational, and conversational *you*.
   * Code snippets must be valid Python 3.11+ using Pydantic V2.
   * Concrete metrics (latency in ms, throughput in tokens/sec, precision/recall percentages).

2. **Bangla Prose Style:**
   * Honorific: Consistent formal **আপনি** (respectful, professional tone).
   * Punctuation: Clean single hyphen (` - `) or colon, avoiding broken em-dashes (`—`).
   * Technical Loanwords: Keep standard technical terms in English inside code tags or transliterated Bengali (e.g., `LLM`, `RAG`, `token`, `latency`, `FastAPI`, `ChromaDB`, `Pydantic`).
   * Structure: Mirror the identical section headings, callouts, and Mermaid diagrams as the English source.
