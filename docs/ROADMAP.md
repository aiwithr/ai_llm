# AI Work Flow for Business — Roadmap

> **Living plan.** This file is the single source of truth. Every future session reads it first.
|> Last updated: 2026-06-06 — A4 complete (commit `00d1240`), A5 next; rules: `site_url` = live site, `repo_url` = canonical project repo, project name = **AI Work Flow for Business**

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
| **A8** | Bengali mirrors of A2–A7 English pages | — |

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
## 9. Open questions

- _None at this time. Add new ones here as they come up._

## 10. How to use this file

1. **Start of every session:** read this file top to bottom.
2. **Before writing code or pages:** check the relevant phase is unlocked and gates are passed.
3. **After completing work:** update the decision log with anything new that was decided.
4. **If a decision changes:** add a new row, never edit history.

---

_Auto-deployed via GitHub Pages on push to `master`._
