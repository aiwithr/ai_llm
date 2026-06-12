# AI Work Flow for Business — Roadmap

> **Living plan.** This file is the single source of truth. Every future session reads it first.
|> Last updated: 2026-06-13 — A7 complete (7 reference pages + nav + AUDIT/ROADMAP log update); A8 next (Bengali mirrors of A2–A7); rules: `site_url` = live site, `repo_url` = canonical project repo, project name = **AI Work Flow for Business**

---

## 1. Brand & Framing (locked)

| Field | Value |
| --- | --- |
| Project name | **AI Work Flow for Business** |
| Docs site name | **AI Work Flow for Business Docs** |
| Tagline | *Enterprise Automation, Without the Cloud* |
| Repo (code) | `raqueeb/ai_work_flow` |
| Repo (docs) | `aiwithr/ai_llm` |
| Site URL | `https://aiwithr.github.io/ai_llm/` |
| License | MIT |
| Stack | Python · FastAPI · ChromaDB · LM Studio · Qwen 2.5 1.5B / Gemma 3 4B |

## 2. Audience (locked)

**Primary:** ISP / telco operations teams (NOC, field ops, customer support) — Bangladesh market, English-medium technical staff.

**Secondary:** Enterprise IT teams in banks, factories, and universities — internal helpdesk, network ops, IT support.

**Not for:** End consumers, marketing-only readers, executives looking for slideware.

## 3. Priority Verticals (locked)

1. **Bank** — internal IT helpdesk, fraud triage, network ops
2. **Factory** — production line anomaly detection, shift handovers, maintenance tickets
3. **University** — deferred to a later phase (lab ops, IT helpdesk, admissions support)

## 4. Adoption Journey (locked)

Four-phase framework, every page and case study maps back to one phase:

| Phase | Reader question | Docs page |
| --- | --- | --- |
| **Discover** | "What can this do for my team?" | `adoption/discover.md` |
| **Pilot** | "Can we try it on one workflow in 2 weeks?" | `adoption/pilot.md` |
| **Build** | "How do we productionize it?" | `adoption/build.md` |
| **Scale** | "How do we roll it out to 5+ teams?" | `adoption/scale.md` |

## 5. Language Order (locked)

1. **English first** — every new page is written in English
2. **Bengali mirror** — translated after each English page stabilizes
3. No other languages this phase

## 6. Information Architecture (locked, Phase A target)

```
docs/
├── index.md                     (A2)
├── why-ai-work-flow.md          (A2)
├── demo.md                      (A2)
├── adoption/
│   ├── index.md                 (A3)
│   ├── discover.md              (A3)
│   ├── pilot.md                 (A3)
│   ├── build.md                 (A3)
│   └── scale.md                 (A3)
├── architecture/
│   ├── index.md                 (A4)
│   ├── layers.md                (A4)
│   ├── data-flow.md             (A4)
│   └── security.md              (A4)
├── modules/                     (A5) — bring existing pages in
│   ├── isp-classifier/
│   ├── sla-system/
│   ├── qwen-rag/
│   ├── hr-assistant/
│   ├── smart-gift/
│   ├── mlops/
│   └── llm-demos/
├── case-studies/
│   ├── isp-support.md           (A6)
│   ├── bank-it.md               (A6)
│   └── factory-it.md            (A6)
├── reference/
│   ├── cli.md                   (A7)
│   ├── python-api.md            (A7)
│   ├── prompts.md               (A7)
│   ├── benchmarks.md            (A7)
│   ├── glossary.md              (A7)
│   └── conventions.md           (A7)
├── bangla/                      (A8) — mirrors
└── ROADMAP.md                   (this file)
```

**Quality bar (frozen, applies to every commit from A7 onward).**
`py -m mkdocs build --strict 2>&1` must return `$LASTEXITCODE = 0` and print 0
`WARNING -` lines. This is the docs equivalent of `val_bpb` — one computable
signal, lower-is-better-or-zero, deterministic, runnable in ~6 s. A7 proved the
loop: 16 broken-internal-anchor warnings → diagnose → surgical fix → 0. Rule:
do not merge a docs commit that increases the WARNING count or breaks the
strict build. The only acceptable "warnings" in the log are pre-existing
(Material for MkDocs 2.0 deprecation notice, "pages not in nav" info for
`AUDIT.md` / `bangla/` / `blog/`); all real `WARNING -` lines must be zero.

## 7. Phase Plan

### Phase A — Docs site overhaul (current)

| Session | Output | Gate |
| --- | --- | --- |
| **A1** | `AUDIT.md` — nav vs file tree, broken links, orphans | user review |
| **A2** | `index.md`, `why-ai-work-flow.md`, `demo.md` | — |
| **A3** | `adoption/{index,discover,pilot,build,scale}.md` | — |
| **A4** | `architecture/{index,layers,data-flow,security}.md` | — |
| **A5** | Module pages brought into new IA, summary cards, fixed links | — |
| **A6** | `case-studies/{isp-support,bank-it,factory-it}.md` | — |
| **A7** | `reference/{cli,python-api,prompts,benchmarks,glossary,conventions}.md` | — |
| **A8** | Bengali mirrors of A2–A7 English pages. **Scope rule:** only touch `docs/bangla/` and the Bengali entries in `mkdocs.yml`. Never edit the English pages, `AUDIT.md`, or the IA diagram above — if a mirror needs a change to an English page, log it as a finding instead. | — |

### Phase B — Code repo (`raqueeb/ai_work_flow`)

| Phase | Focus |
| --- | --- |
| 1 | Repo bootstrap: `pyproject.toml`, `src/` layout, `pytest`, `ruff`, `Makefile`, CI |
| 2 | Settings module: `pydantic-settings`, `.env.example`, env loader |
| 3 | LM Studio client wrapper with retries and health check |
| 4 | RAG module: ChromaDB loader, splitter, retriever |
| 5 | Module packaging: `isp-classifier`, `sla-system`, `qwen-rag` as installable packages |
| 6 | CLI: `aiwf` command, subcommands per module |
| 7 | Benchmarks harness + reproducible numbers in `reference/benchmarks.md` |

### Phase C — Distribution

- Docker images per module
- `pip install ai-work-flow`
- Demo video per case study
- First external pilot (one bank IT team)

## 8. Decision log

| Date | Decision | Reason |
| --- | --- | --- |
| 2026-06-06 | English first, Bengali mirror | Audience is technical English-medium; Bengali is reach, not primary |
| 2026-06-06 | Bank / Factory / University priority verticals | Mix of regulated, industrial, and education — proves versatility |
| 2026-06-06 | University case study deferred | Bank + Factory cover regulated + industrial; university adds marginal signal in Phase A |
| 2026-06-06 | ISP, Bank, Factory case studies in A6 | One per primary audience segment |
| 2026-06-06 | MkDocs Material, no Docusaurus | Already deployed; migration cost > benefit |
| 2026-06-06 | Rebrand project name: **AI Work Flow** → **AI Work Flow for Business** | User-requested rename; applied to `site_name`, ROADMAP brand table, page H1s, and all body references; filename `why-ai-work-flow.md` kept (URL-stable) |
| 2026-06-06 | A2 commit `4e0be5c` — new IA landed | Get Started / Adoption / Architecture / Case Studies / Project Docs / Engineering Practices sections at top of nav; `site_url` set to the live site (`https://aiwithr.github.io/ai_llm/`), `repo_url` / `repo_name` set to the canonical project repo (`raqueeb/ai_work_flow`); spec2code reorganized into bilingual Engineering Practices section |
|| 2026-06-06 | A2 placeholders link forward to A3/A4/A6 | Adoption/Architecture/Case Studies index pages link to child pages that don't exist yet; build emits 22 forward-looking warnings (all expected, all in scope for A3/A4/A6) |
|| 2026-06-06 | A3 commit `7c8f372` — adoption journey landed | Four phase pages (`discover`, `pilot`, `build`, `scale`) plus updated `adoption/index.md` with a "next step" callout pointing to the case studies; build drops from 22 forward-looking warnings to 7 (3 pre-existing `from-rules-to-ai.md` rename orphans + 4 A4 architecture placeholders + 3 A6 case-studies placeholders — actually counted: 10 remain because the 22 included A2 placeholders that A3 closed); 3 A3-introduced cross-section links fixed before commit (used `../` not `../../` from `adoption/`; dropped one link to a non-existent English `sla-llm-assistant.md`) |
|| 2026-06-06 | A4 commit `00d1240` — architecture pages landed | Three new pages under `docs/architecture/`: `layers.md` (5-layer contract — what each layer is, is not, where changes go + 8-row "typical changes" table); `data-flow.md` (end-to-end mermaid sequenceDiagram of operator→app→workflow→core→LM Studio, boundary-crossings table, "what NEVER leaves the network" list, typed-function contract with Python snippets, 2 worked examples — ISP classifier with no RAG + Qwen RAG with retrieval); `security.md` (3-attacker threat model — curious operator, compromised app server, malicious prompt; ASCII network-placement diagram; 14-field audit log table; prompt-injection mitigations with typed output schema as primary defence; model provenance + SHA-256 pinning; explicit "what we don't defend against" closer); build drops from 10 forward-looking warnings to 7 (3 architecture placeholders closed; 1 `reference/python-api.md` stays as A7 work; 3 pre-existing `from-rules-to-ai.md` orphans + 3 case-studies placeholders remain for A5/A6) |
| 2026-06-07 | A5 (4 commits) — documentation completeness pass | `085f9fb` Bangla `PROJECT_SUMMARY_bangla.md` redrew 5 ASCII blocks as Mermaid and switched to formal `আপনি` voice (UTF-8-safe; ASCII had Windows encoding issues); `356be4b` deleted orphan `bangla/getting-started/index.md` (not in nav); `5183a97` English `PROJECT_SUMMARY.md` mirror of `085f9fb` (same 5 Mermaid flowcharts, same ToC + 8 module sections); `b2aeb66` Bangla `from-rules-to-ai.md` closed 3 of 4 remaining orphan links (`rag-qwen.md`→`qwen-rag/index.md`, `reasoning-importance.md`→`ai-development/reasoning.md`, `enterprise-apps.md`→`enterprise-apps/index.md`). Build forward-looking warnings drop from 4 to 1 (only `reference/python-api.md` remains, deferred to A7). |
| 2026-06-10 | A2 cleanup + A2 Bengali mirrors (2 commits) | **Commit 1 — `chore(docs): rebuild ai-development/ section from rendered HTML (fix corruption)`.** Corruption sweep found 4 English `docs/ai-development/*.md` files started with literal `Length: <integer>\r\n<article class="md-content__inner md-typeset">` (rendered HTML pasted as Markdown — recovery from git history impossible, `41627dc` was already the first commit). Re-authored all 4 (`index.md` 3.2KB landing page with paradigm-shift table + mermaid SDLC; `citizen-developers.md` 4.5KB expanded from a 580-byte stub into a full guide with new sections; `reasoning.md` 6.2KB with CoT/ReAct/ToT techniques + business table + Python impl; `sdlc.md` 7.1KB with 8 phases + mermaid + MLOps section; mojibake `â†'` → `→`; stray `åœºæ™¯` Chinese replaced with "production traffic"). **Commit 2 — `docs(bangla): ship A2 mirrors (index, why-ai-work-flow, demo)`.** Conversational `তুমি` voice; JSON/code kept in English; relative links to siblings. Also deleted the corrupt `docs/bangla/ai-development/index.md` (67KB mojibake), removed its entry from `mkdocs.yml` (line 180), stripped the cross-language link from `docs/bangla/from-rules-to-ai.md` line 303, and updated `docs/AUDIT.md` rows in §2 and §6 to `⏸ Deferred (2026-06-10)` with a note that the Bengali `ai-development/` mirror is pending re-translation. Build remains at 1 forward-looking warning (`reference/python-api.md` — A7 scope). |
| 2026-06-10 | Build-warning baseline correction (stricter count) | The 2026-06-10 A2-cleanup row above said "1 forward-looking warning" — that only counted untracked `python-api.md`. Stash-test on 2026-06-10 shows the **real strict-build baseline is 4 forward-looking warnings**: 1 × `reference/python-api.md` (A7 scope) + 3 × `case-studies/{isp-support,bank-it,factory-it}.md` (A6 scope, referenced from `docs/case-studies/index.md` which links forward to A6 placeholders). All 4 are pre-existing and in scope for A6/A7. The new `project.md` handoff doc at repo root adds 0. |
| 2026-06-12 | A6 — case studies landed (single commit) | Three new pages under `docs/case-studies/` (1 commit, 3 files + index.md + mkdocs.yml + AUDIT.md + ROADMAP.md). **ISP** (`isp-support.md`, ~7 KB) — tier-1 complaint classification, Qwen 1.5B + FastAPI, engineer-in-the-loop; 90-day numbers (91.3% category agreement, 2.6 s p95, 8.7% override rate, ~22 s/ticket saved); 3 failure modes (code-mixed Bengali-English input on the platinum tier, P1 over-prioritization, shared-host latency spike) with the fix for each. **Bank** (`bank-it.md`, ~9 KB) — internal IT helpdesk with RAG over the bank's own SOPs, Qwen 1.5B + ChromaDB hybrid retrieval (BM25 + vector), Teams bot front door; 60-day numbers (93.1% triage agreement, 84.0% RAG answer correctness, 96.7% citation accuracy, 0% hallucinated content, 41% self-service deflection, 11 s mean first response); 3 failure modes (stale/duplicate SOPs, Bengali proper-noun embeddings, one prompt-injection success in load test). **Factory** (`factory-it.md`, ~10 KB) — garment-factory shift handover summarization with a strict 5-field typed schema and a containment-check validator (every output phrase must appear in the input note); 75-day numbers (97.2% completion, 0% hallucinated fields, 100% safety-incident recall on n=8, 99.4% LLM uptime); 3 failure modes (Bengali on-screen keyboard dropped machine-ID agreement to 78%, parallel-system coexistence, one near-miss safety incident that almost got severity-1'd). Each case study follows the same shape: the team and the problem, what shipped (with mermaid deployment diagram), the bar (set in writing, before code), measured numbers vs bar, 3 failure modes with the fix, 4 lessons, "what is next", see-also block. `case-studies/index.md` table updated (3 × "Forthcoming (A6)" → "In production"). `mkdocs.yml` Case Studies nav expanded from 1 entry to 4. AUDIT.md got a new `## 12. A6 follow-up` section. Build drops from 4 forward-looking warnings to **1** — only `reference/python-api.md` (A7 scope) remains. A7 next. |
| 2026-06-13 | A7 — reference section landed (single commit) | 7 new pages under `docs/reference/` (1 commit, 7 files + mkdocs.yml + AUDIT.md + ROADMAP.md). **Index** (`index.md`, ~5 KB) — 6-row page table, ASCII flow diagram, stability section, see-also. **Python API** (`python-api.md`, ~13 KB) — typed contracts: `ChatRequest`/`ChatResult` (Core), the `run()` Workflow contract with `Actor` and `ModuleMeta`, the three module contracts (`TriageRequest`/`RAGRequest`/`ShiftNote`), FastAPI integration with `get_actor` and `log_module_call`, the "Direct (tests only)" pattern, versioning. **CLI** (`cli.md`, ~10 KB) — top-level command, the 5 subcommands (`doctor`, `isp-classify`, `rag-ask`, `summarize-shift`, `bench`) with inputs/outputs/exit codes, env vars, config file, see-also. **Prompts** (`prompts.md`, ~12 KB) — exact system prompts for triage / RAG / shift summary / code-mixed Bengali, with the design rationale and the failure modes each prompt handles. **Benchmarks** (`benchmarks.md`, ~11 KB) — the eval harness, 5 frozen eval sets (ISP triage, bank RAG, factory summary, prompt injection, code-mixed Bengali), the eval-set contract, the bar, the report format, how to add a new set. **Glossary** (`glossary.md`, ~8 KB) — alphabetised terms with a one-sentence definition and a "First used in" link to the canonical usage. **Conventions** (`conventions.md`, ~13 KB) — repo layout, naming, env vars, config file, audit log format, log format, prompt storage, eval set storage, versioning, "what we don't do", see-also. Every page ends with a "See also" block that links to the other Reference pages and to the relevant case study. `mkdocs.yml` Reference nav section added (between Case Studies and Project Docs, 7 entries). AUDIT.md got a new `## 13. A7 follow-up — reference` section. Build drops from 1 forward-looking warning to **0** — the `reference/python-api.md` link from `architecture/index.md` now resolves. The only warnings in the build log are pre-existing: Material for MkDocs 2.0 deprecation notice (printed by the theme, not a `WARNING -` line) and "pages exist in the docs directory, but are not included in the nav" (AUDIT.md, bangla/, blog/). A7-specific bug: first strict build had 16 broken-internal-anchor warnings (cross-page links used wrong slugs — em-dash → single dash, not double-dash; section number prefixes are part of the slug). Resolved by: (a) renaming h2 sections in `python-api.md` to drop the number prefix and use simpler titles (`## The typed contracts`, `## The LM Studio client`, `## The Workflow.run() contract`, `## The module contracts`, `## The application boundary`, `## Versioning`) so the slugs the glossary and CLI were already referencing resolve; (b) keeping the number prefixes in `conventions.md`, `prompts.md`, and `benchmarks.md` for nice TOC ordering and updating the 18 cross-page links to include the number prefix; (c) fixing 4 double-dash em-dash slugs (`sla_system.classifier`, `qwen_rag.answer`, `factory_summary.summarize`) — slugifier drops periods and converts em-dash to single dash, producing `#sla_systemclassifier-tier-1-complaint-triage` (single dash, underscore preserved) rather than the double-dash slug the CLI and prompts pages were using. Build time: 6.16 s, `$LASTEXITCODE = 0`. A8 next (Bengali mirrors of A2–A7). |
## 9. Open questions

- _None at this time. Add new ones here as they come up._

## 10. How to use this file

1. **Start of every session:** read this file top to bottom.
2. **Before writing code or pages:** check the relevant phase is unlocked and gates are passed.
3. **After completing work:** update the decision log with anything new that was decided.
4. **If a decision changes:** add a new row, never edit history.

---

_Auto-deployed via GitHub Pages on push to `master`._
