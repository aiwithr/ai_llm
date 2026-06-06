# AI Work Flow Docs — Roadmap

> **Living plan.** This file is the single source of truth. Every future session reads it first.
> Last updated: 2026-06-06

---

## 1. Brand & Framing (locked)

| Field | Value |
| --- | --- |
| Project name | **AI Work Flow** |
| Docs site name | **AI Work Flow Docs** |
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

## 9. Open questions

- _None at this time. Add new ones here as they come up._

## 10. How to use this file

1. **Start of every session:** read this file top to bottom.
2. **Before writing code or pages:** check the relevant phase is unlocked and gates are passed.
3. **After completing work:** update the decision log with anything new that was decided.
4. **If a decision changes:** add a new row, never edit history.

---

_Auto-deployed via GitHub Pages on push to `master`._
