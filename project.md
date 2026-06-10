# AI Work Flow for Business — Portable Project Brief

> **Purpose of this file.** This is the single, self-contained handoff document for
> the **AI Work Flow for Business** project. It is written so that any new model,
> any harness / editor / agent framework, and any machine can pick it up cold and
> understand: (a) what the project is, (b) everything we discussed and decided,
> (c) everything that was built, and (d) how to keep building on it.
>
> **No external context required.** Every fact you need is inline. If something is
> not in this file, treat it as unknown — do not guess, do not infer from the
> surrounding prose.
>
> **Last updated:** 2026-06-10.

---

## 0. Import recipe (read this first)

To onboard a new model / harness / machine, follow this exact sequence:

1. **Read this file top to bottom.** Do not skim. The structure below is the
   canonical mental model.
2. **Confirm the repository state** with these commands, in order:
   ```bash
   git log --oneline -10
   git status -s
   ls docs/                # should show: index.md, why-ai-work-flow.md, demo.md,
                           # adoption/, ai-development/, architecture/, archive/,
                           # getting-started/, qwen-rag/, isp-classifier/,
                           # sla-system/, hr-assistant/, llm-demos/, mlops/,
                           # enterprise-apps/, gemma-e4b/, smart-gift/, overview/,
                           # search/, reference/, blog/, bangla/, assets/,
                           # stylesheets/, AUDIT.md, ROADMAP.md, PROJECT_SUMMARY.md,
                           # mkdocs.yml (at repo root), site/ (build output)
   python -m mkdocs build --strict
   ```
3. **Trust the build output.** If `mkdocs build --strict` exits non-zero, count
   the warnings. The known baseline (last verified 2026-06-10) is **4 forward-
   looking warnings**: 1 × `reference/python-api.md` (A7 scope) and 3 ×
   `case-studies/{isp-support,bank-it,factory-it}.md` (A6 scope). All four
   are documented in `ROADMAP.md` §7. Anything beyond those four is a
   regression — fix or document before moving on.
4. **Read `docs/ROADMAP.md` next.** It is the authoritative phased plan. Section
   8 is the append-only decision log; section 9 is open questions. Do not edit
   history — append rows.
5. **Read `docs/PROJECT_SUMMARY.md`.** The 8-module tour.
6. **Read `docs/AUDIT.md`.** Page-by-page status. Anything marked
   `⏸ Deferred (date)` is intentionally out of scope for the current phase.
7. **Then** start the task you were given. If the task is "continue where we
   left off", look at the most recent row of `ROADMAP.md` §8 and act on it.

### What is portable vs. what is machine-local

| Thing | Portable? | Notes |
| --- | --- | --- |
| This `project.md` | ✅ Yes | Lives in git, UTF-8, no machine-specific paths. |
| `docs/ROADMAP.md` | ✅ Yes | Same. |
| `mkdocs.yml` | ✅ Yes | Relative paths only. `site_url` and `repo_url` are the only absolute URLs and both are stable. |
| Source Markdown under `docs/` | ✅ Yes | All paths are relative. Bengali and English are siblings under `docs/`. |
| `site/` directory | ⚠️ Build artifact | Regenerate with `python -m mkdocs build`. Do not edit; do not commit (`.gitignore` excludes it). |
| `C:\Users\...\AppData\Local\Temp\commit*.txt` patterns in history | ❌ No | Those are local-only paths used for `git commit -F` on Windows due to PowerShell parser quirks. Do not hard-code them on a new machine — write your commit message to whatever temp location your shell handles, or use a here-doc. |
| `docs/blog/_research/`, `docs/reference/`, `scripts/` | ❌ Untracked | Exist on disk but are not in git. See §10 below. |

### Model-agnostic principles (the rules of the road)

These are non-negotiable. If a request would violate them, push back before
acting.

- **Local-first.** Every model in the project runs on the customer's own
  hardware. No cloud API calls for sensitive data. No internet dependency for
  inference.
- **Small models.** Qwen 2.5 1.5B for classification and reasoning, Gemma 3 4B
  (E4B quantized) for security analysis and efficient inference. Reasoning
  quality comes from prompt design and RAG, not from a 70B model.
- **Privacy by architecture, not by policy.** Customer data never crosses the
  network boundary. This is enforced by deployment topology, not by a terms-of-
  service clause.
- **Explainability is a feature.** Every answer shows its work (chain-of-
  thought, retrieved citations, confidence). Blind "yes/no" outputs are
  considered broken.
- **Bengali is mirror, not primary.** English is the source of truth; Bengali
  mirrors follow once the English page stabilizes. Voice: conversational `তুমি`
  in Bengali mirrors, conversational `you` in English. JSON, code, identifiers,
  and proper nouns stay in English inside Bengali prose.
- **Bilingual nav must stay coherent.** When a Bengali mirror exists, the
  Bengali nav links to it. When it does not, the link is stripped, not stubbed
  with a placeholder.
- **One source of truth for the plan.** `docs/ROADMAP.md` is canonical. If
  something is decided, it goes in §8 with a date. Never edit history; append.
- **No silent corruption.** If a file looks like rendered HTML pasted as
  Markdown (starts with `Length: <integer>\r\n<article class="md-content__inner
  md-typeset">`), it is corrupt — re-author it from the rendered HTML, do not
  try to "fix" the syntax.

---

## 1. Project identity (locked)

| Field | Value |
| --- | --- |
| Project name | **AI Work Flow for Business** |
| Docs site name | **AI Work Flow for Business Docs** |
| Tagline | *Enterprise Automation, Without the Cloud* |
| Docs repo | `aiwithr/ai_llm` (this repository) |
| Code repo (canonical) | `raqueeb/ai_work_flow` |
| Live site | `https://aiwithr.github.io/ai_llm/` |
| Author | রকিবুল হাসান (Rakibul Hassan) |
| License | MIT |
| Primary stack | Python · FastAPI · ChromaDB · LM Studio · Qwen 2.5 1.5B / Gemma 3 4B (E4B) |
| Site generator | MkDocs Material, `language: bn`, SiyamRupali font, GitHub Pages on `master` |

---

## 2. Audience (locked)

**Primary:** ISP / telco operations teams (NOC, field ops, customer support) —
Bangladesh market, English-medium technical staff.

**Secondary:** Enterprise IT teams in **banks**, **factories**, and
**universities** — internal helpdesk, network ops, IT support.

**Not for:** End consumers, marketing-only readers, executives looking for
slideware.

---

## 3. Priority verticals (locked)

1. **Bank** — internal IT helpdesk, fraud triage, network ops.
2. **Factory** — production line anomaly detection, shift handovers,
   maintenance tickets.
3. **University** — *deferred to a later phase* (lab ops, IT helpdesk,
   admissions support). University adds marginal signal in Phase A.

---

## 4. Adoption journey (locked)

Every page and every case study maps back to one of four phases:

| Phase | Reader question | Docs page |
| --- | --- | --- |
| **Discover** | "What can this do for my team?" | `docs/adoption/discover.md` |
| **Pilot** | "Can we try it on one workflow in 2 weeks?" | `docs/adoption/pilot.md` |
| **Build** | "How do we productionize it?" | `docs/adoption/build.md` |
| **Scale** | "How do we roll it out to 5+ teams?" | `docs/adoption/scale.md` |

---

## 5. Language order (locked)

1. **English first** — every new page is written in English.
2. **Bengali mirror** — translated after each English page stabilizes.
3. No other languages this phase.

Voice rules:

- English: conversational **you**.
- Bengali: conversational **তুমি** (not formal আপনি — reserved for legal/HR
  content).
- Inside Bengali prose, keep in English: JSON, code, identifiers, file paths,
  product names, model names (Qwen, Gemma), protocol names (RAG, MLOps, SDLC),
  currency (BDT), and proper nouns.

---

## 6. Information architecture (locked, Phase A target)

```
docs/
├── index.md                        (A2 — English home, stable)
├── why-ai-work-flow.md             (A2 — English, stable)
├── demo.md                         (A2 — English, stable)
├── adoption/
│   ├── index.md                    (A3)
│   ├── discover.md                 (A3)
│   ├── pilot.md                    (A3)
│   ├── build.md                    (A3)
│   └── scale.md                    (A3)
├── architecture/
│   ├── index.md                    (A4)
│   ├── layers.md                   (A4)
│   ├── data-flow.md                (A4)
│   └── security.md                 (A4)
├── ai-development/
│   ├── index.md                    (A2 cleanup — English, clean as of 2026-06-10)
│   ├── citizen-developers.md       (A2 cleanup)
│   ├── reasoning.md                (A2 cleanup)
│   └── sdlc.md                     (A2 cleanup)
├── case-studies/                   (A6 — placeholders only; not yet built)
│   ├── isp-support.md
│   ├── bank-it.md
│   └── factory-it.md
├── reference/                      (A7 — placeholders only; not yet built)
│   ├── cli.md
│   ├── python-api.md               ← this is the 1 known build warning
│   ├── prompts.md
│   ├── benchmarks.md
│   ├── glossary.md
│   └── conventions.md
├── getting-started/                (A1)
├── qwen-rag/                       (A1)
├── isp-classifier/                 (A1)
├── sla-system/                     (A1)
├── hr-assistant/                   (A1)
├── llm-demos/                      (A1)
├── mlops/                          (A1)
├── enterprise-apps/                (A1)
├── gemma-e4b/                      (A1)
├── smart-gift/                     (A1)
├── overview/                       (A2 — Bangla version of docs/index.md)
├── search/                         (search plugin assets)
├── blog/                           (mkdocs-material blog plugin, mostly empty)
├── stylesheets/                    (extra.css)
├── assets/                         (images, javascripts)
├── archive/                        (excluded from build — see §11)
├── bangla/                         (Bengali mirrors; see §7)
├── AUDIT.md                        (page-by-page status; canonical audit log)
├── PROJECT_SUMMARY.md              (8-module tour)
└── ROADMAP.md                      (phased plan + decision log)
```

---

## 7. The 8 modules that ship in Phase A

Each module lives in its own folder under `docs/`. Each is self-contained with
its own landing page (`index.md`) and child pages.

1. **ISP Classifier** (`docs/isp-classifier/`) — classifies customer complaints
   (NOC, billing, field ops, technical) using Qwen 2.5 1.5B. Demonstrates
   structured output, few-shot prompting, and the typed-function contract.
2. **ISP Classifier (Reasoning)** (`docs/isp-classifier-reasoning/`) — same
   classifier with chain-of-thought reasoning, showing how confidence and
   explainability change the user experience.
3. **Qwen + RAG** (`docs/qwen-rag/`) — knowledge-augmented responses over a
   local ChromaDB vector store. Demonstrates retrieval, citation, and refusal
   when retrieval confidence is low.
4. **Gemma E4B** (`docs/gemma-e4b/`) — efficient 4-bit inference for security
   analysis and longer-context reasoning. Demonstrates model selection: when
   to use Gemma instead of Qwen.
5. **HR Assistant** (`docs/hr-assistant/`) — local HR policy Q&A with RAG.
   Demonstrates privacy-by-architecture for sensitive employee data.
6. **SLA System** (`docs/sla-system/`) — SLA breach risk prediction over
   support tickets. Demonstrates probabilistic output and confidence
   thresholds.
7. **Enterprise Apps** (`docs/enterprise-apps/`) — production deployment
   patterns: Streamlit UIs, FastAPI services, LM Studio client wrapper with
   retries and health checks.
8. **MLOps / Churn Prediction** (`docs/mlops/`) — model training, evaluation,
   drift monitoring, retraining triggers. Demonstrates the MLOps half of
   AI-SDLC (see §8).

---

## 8. AI-Driven Development section (the philosophy)

Lives at `docs/ai-development/`. Four pages, all clean as of 2026-06-10
(rebuilt from rendered HTML after a corruption sweep — see §9 decision log).

### `ai-development/index.md` — the landing page

Core message: **"the data is the algorithm"**. Traditional software is
deterministic — same input, same output, always. AI-driven software is
probabilistic — same input, best prediction, with a confidence score. The
paradigm-shift table:

| Traditional Development | AI-Driven Development |
| --- | --- |
| **Deterministic**: Same input → Same output | **Probabilistic**: Same input → Best prediction |
| **Rule-based logic** | **Pattern learning from data** |
| **Hard-coded decisions** | **Learned from examples** |
| **Explicit if/else conditions** | **Statistical inference** |
| **100% predictable** | **Confidence-based responses** |

A mermaid flowchart contrasts the two SDLCS:
- Traditional: Write Code → Define Rules → Execute → Predictable Output.
- AI-Driven: Collect Data → Train Model → Learn Patterns → Probabilistic Output.

### `ai-development/sdlc.md` — the 8-phase AI-SDLC

1. **Problem Definition** — what decision are we automating, and what is
   "good enough"?
2. **Data Collection** — gather representative examples, including edge cases.
3. **Data Preparation** — clean, label, deduplicate, split.
4. **Feature Engineering** — for LLMs, this is prompt design + RAG context.
5. **Model Training** — for our use cases, this is **fine-tuning or
   few-shotting** an existing local model, not training from scratch.
6. **Evaluation** — not just accuracy; includes confidence calibration,
   refusal quality, latency, and cost.
7. **Deployment** — local container, FastAPI service, Streamlit UI, or
   batch job. Model pinned by SHA-256.
8. **Monitoring** — drift detection, usage logging, feedback loop. Drift
   triggers a return to Phase 1.

### `ai-development/reasoning.md` — why reasoning matters

A bad AI says **"Yes"**. A good AI says **"Yes, because the leave balance is 5
days, the project is not in a critical phase, and attendance is 95%. I
recommend APPROVAL with standard conditions."**

Three techniques we use:

- **Chain-of-Thought (CoT)** — the model thinks step by step before answering.
  Best for: moderate complexity, single-domain questions.
- **ReAct** — Reasoning + Acting. The model thinks, then calls a tool (RAG
  retriever, calculator, API), then thinks again. Best for: questions that
  require external knowledge.
- **Tree-of-Thought (ToT)** — the model explores multiple reasoning paths
  in parallel and picks the best. Best for: complex multi-step planning.

Routing rule: simple → direct answer; moderate → CoT; complex → CoT + tools.

### `ai-development/citizen-developers.md` — for non-programmers

How someone without a CS degree can use these tools safely. Covers prompt
hygiene, when to trust vs. verify, the typed-function contract as a safety
rail, and the "show your work" expectation.

---

## 9. Full decision / commit log (chronological)

This is the full history of decisions made on this project, in order. New
sessions should append to the bottom; never edit history.

| Date | Decision |
| --- | --- |
| 2026-06-06 | English first, Bengali mirror. Audience is technical English-medium; Bengali is reach, not primary. |
| 2026-06-06 | Bank / Factory / University priority verticals. Mix of regulated, industrial, and education — proves versatility. |
| 2026-06-06 | University case study deferred. Bank + Factory cover regulated + industrial; university adds marginal signal in Phase A. |
| 2026-06-06 | ISP, Bank, Factory case studies in A6. One per primary audience segment. |
| 2026-06-06 | MkDocs Material, no Docusaurus. Already deployed; migration cost > benefit. |
| 2026-06-06 | Rebrand project name: **AI Work Flow** → **AI Work Flow for Business**. User-requested rename; applied to `site_name`, ROADMAP brand table, page H1s, and all body references; filename `why-ai-work-flow.md` kept (URL-stable). |
| 2026-06-06 | A2 commit `4e0be5c` — new IA landed. Get Started / Adoption / Architecture / Case Studies / Project Docs / Engineering Practices sections at top of nav; `site_url` set to the live site, `repo_url` / `repo_name` set to the canonical project repo; spec2code reorganized into bilingual Engineering Practices section. |
| 2026-06-06 | A2 placeholders link forward to A3/A4/A6. Adoption/Architecture/Case Studies index pages link to child pages that don't exist yet; build emits forward-looking warnings (all expected, all in scope for A3/A4/A6). |
| 2026-06-06 | A3 commit `7c8f372` — adoption journey landed. Four phase pages plus updated `adoption/index.md` with a "next step" callout pointing to the case studies. |
| 2026-06-06 | A4 commit `00d1240` — architecture pages landed. Three new pages under `docs/architecture/`: `layers.md` (5-layer contract, 8-row "typical changes" table); `data-flow.md` (end-to-end mermaid sequenceDiagram, boundary-crossings table, "what NEVER leaves the network" list, typed-function contract with Python snippets, 2 worked examples); `security.md` (3-attacker threat model, ASCII network-placement diagram, 14-field audit log table, prompt-injection mitigations with typed output schema as primary defence, model provenance + SHA-256 pinning). |
| 2026-06-07 | A5 — documentation completeness pass. `085f9fb` Bangla `PROJECT_SUMMARY_bangla.md` redrew 5 ASCII blocks as Mermaid and switched to formal `আপনি` voice (later revised to `তুমি` in A2 mirror work). `356be4b` deleted orphan `bangla/getting-started/index.md` (not in nav). `5183a97` English `PROJECT_SUMMARY.md` mirror. `b2aeb66` Bangla `from-rules-to-ai.md` closed 3 of 4 remaining orphan links. |
| 2026-06-10 | **Commit 1 — `chore(docs): rebuild ai-development/ section from rendered HTML (fix corruption)` (`e11cf03`).** Corruption sweep found 4 English `docs/ai-development/*.md` files started with literal `Length: <integer>\r\n<article class="md-content__inner md-typeset">` (rendered HTML pasted as Markdown — recovery from git history impossible, `41627dc` was already the first commit). Re-authored all 4 from the rendered HTML; mojibake `â†'` → `→`; stray `åœºæ™¯` Chinese replaced with "production traffic". Also deleted the corrupt `docs/bangla/ai-development/index.md` (mojibake), removed its entry from `mkdocs.yml` (line 180), and updated `docs/AUDIT.md` rows in §2 and §6 to `⏸ Deferred (2026-06-10)`. |
| 2026-06-10 | **Commit 2 — `docs(bangla): ship A2 mirrors (index, why-ai-work-flow, demo)` (`1f492fc`).** Conversational `তুমি` voice; JSON/code kept in English; relative links to siblings. Also stripped the cross-language link from `docs/bangla/from-rules-to-ai.md` line 303 (the English target exists but would jump Bengali readers into English UX; will be re-added when the Bengali `ai-development/` mirror lands) and added the 2026-06-10 row to `docs/ROADMAP.md` §8. Build remains at 4 forward-looking warnings (1 A4 + 3 A6). |
| 2026-06-10 | **`docs: add portable project.md handoff doc` (this commit).** Single self-contained file at repo root covering project identity, audience, IA, modules, philosophy, full decision log, prompting history (see §10), and import recipe. Designed to be importable into a new model, harness, or machine without context loss. |

---

## 10. Prompting history (the conversation arc)

This section captures the actual prompts and decisions of the human-AI
collaboration that produced this project, in order. New sessions can read this
to understand the *style* of the collaboration, not just the *output*.

### Working style

- **User drives the agenda, agent drives the execution.** The user gives
  high-level goals ("do bucket 1 and 2", "pick option B for cleanup"); the
  agent decides the file-level sequence, runs the commands, and reports
  results.
- **Confirm before destructive action.** The agent never deletes files, force-
  pushes, or rewrites large sections without explicit user sign-off. Typical
  confirmation pattern: agent proposes a 2–4 option menu, user replies with
  the option number ("1,2" or "b").
- **Status updates at natural breakpoints.** The agent reports: what was done,
  what was decided, what is next, and what the user needs to decide. End-of-
  turn summaries are concise, in plain prose, no bullet-point bloat.
- **Code lives in files, not in chat.** The agent never pastes file content
  into the chat when it can be written to a file. The user reads the diff in
  the file, not the chat.
- **One logical change per commit.** Multi-page refactors are split into
  logical chunks. Commit messages are written to a temp file on Windows
  (PowerShell parser mangles multi-line `-m "..."` strings when the message
  contains apostrophes — use `git commit -F <path>`).
- **Validation before commit.** `python -m mkdocs build --strict` is the
  gate. If the strict build adds new warnings, the change is not committed
  until they are fixed or documented. The "stash test" pattern is used to
  distinguish *new* warnings from *pre-existing baseline* warnings: `git
  stash; mkdocs build --strict; git stash pop`.

### Recurring decision patterns

- **When to rewrite vs. when to strip.** If a file is fully corrupt (rendered
  HTML pasted as Markdown), rewrite from the rendered HTML. If a file has
  one or two broken links, strip the links. If a file is 90% good with a
  corrupt title or footer, fix in place. The decision is always: *can the
  reader still navigate from this file?* If yes, minimum surgery. If no,
  rewrite.
- **Bengali vs. English link policy.** Cross-language links (Bengali page
  linking to an English-only file) are stripped, not stubbed. They are
  re-added when the Bengali mirror lands. Rationale: a Bengali reader who
  clicks and lands in English mid-flow has a worse experience than a
  Bengali reader who sees no link.
- **Where the canonical project state lives.** `docs/ROADMAP.md` §8 (decision
  log) is the only place where history is recorded. `docs/AUDIT.md` is the
  per-page status snapshot. `project.md` (this file) is the portable
  handoff. They do not duplicate each other; they serve different
  audiences.

### How to prompt this project's style

When asking the agent to continue work on this project, the most effective
prompt shapes are:

1. **Bucket list** — "Do buckets 1, 2, and 3 from the priority list." The
   agent reads `ROADMAP.md` §7 for the bucket definitions and §8 for the
   most recent state.
2. **Option menu** — "Here are 3 ways to fix this. Which one?" The agent
   drafts the options with trade-offs and waits for the user to pick.
3. **Constraint-first** — "Keep the build at 1 warning, English first,
   Bengali mirror follows, single commit per logical change." The agent
   internalizes the constraints and runs.
4. **State-check** — "What's the state of the repo right now?" The agent
   runs `git log --oneline -10`, `git status -s`, and
   `python -m mkdocs build --strict`, then summarizes.

What does **not** work well:

- Open-ended "improve the docs" — too vague, agent will guess wrong.
- Asking for code without specifying which module — the project has 8
  modules and the agent will pick one at random.
- Asking the agent to "make it bilingual" without specifying which page —
  the language order rule is *English first, Bengali mirror follows*, not
  the other way around.

---

## 11. What's untracked / deferred (do not be alarmed)

Three directories exist on disk but are **not** in git and are **not** in
the build:

| Path | Why untracked | Plan |
| --- | --- | --- |
| `docs/blog/_research/` | Draft blog posts, not yet ready. | Will be added when a post is ready to publish. |
| `docs/reference/` | A7 reference material (CLI, Python API, prompts, benchmarks, glossary, conventions). `python-api.md` is the source of the 1 known build warning. | Will be added with `mkdocs.yml` nav entries when A7 lands. |
| `scripts/` | Local build / lint / data-prep scripts. Machine-specific. | Will be reorganized into the code repo (`raqueeb/ai_work_flow`) in Phase B. |

A fourth directory, `docs/archive/`, **is** in git and contains historical
documents that are excluded from the build via `mkdocs.yml` →
`exclude_docs: archive/`. As of 2026-06-10 it contains
`archive/AUDIT-2026-06-06.md`. The active audit lives at `docs/AUDIT.md`.

---

## 12. Open questions (none active)

> _None at this time. Add new ones here as they come up._

If a new question arises during a future session, append it to
`docs/ROADMAP.md` §9 (not here — this file is for the handoff reader, the
ROADMAP is for the day-to-day working agent).

---

## 13. How to use this file

1. **Start of every session:** read this file top to bottom.
2. **Before writing code or pages:** check the relevant phase is unlocked and
   gates are passed (`ROADMAP.md` §7).
3. **After completing work:** update `ROADMAP.md` §8 with anything new that
   was decided. Append a row to this file's §9 if the decision changes the
   project at the meta level (rebranding, stack change, audience change,
   etc.).
4. **If a decision changes:** add a new row, never edit history.

---

_Auto-deployed via GitHub Pages on push to `master`._
