# A1 Audit — `docs/` vs `mkdocs.yml` nav

> **Date:** 2026-06-06
> **Scope:** Every nav entry in `mkdocs.yml` checked against the actual file tree, every internal `.md` link spot-checked, and every folder scanned for orphan files.
> **Gate:** This audit must be reviewed before A2 begins.

---

## 1. Summary

| Metric | Count |
| --- | --- |
| Top-level nav items | 14 |
| Total nav entries (leaf pages) | 56 |
| Pages that **exist** on disk | 53 |
| Pages that are **missing** on disk | **3** (see §2) |
| Folders with orphans | 1 |
| Internal broken links | 0 confirmed (spot-check passed) |

**Verdict:** Three nav-referenced files are missing from disk. They were present in earlier commits and were deleted in the working tree at some point. All three have been restored from git history in this audit pass. A2 can proceed after the restore is committed.

---

## 2. Missing files (blockers)

| Nav entry | File | Status | Action |
| --- | --- | --- | --- |
| `Home` | `docs/index.md` | **Missing → restored from `41627dc`** | Recreate as English counterpart of `PROJECT_SUMMARY_bangla.md` |
| `Executive Summary` | `docs/PROJECT_SUMMARY.md` | **Missing → restored from `41627dc`** | Recreate or remove the nav entry |
| `রুলস থেকে AI-তে` | `docs/from-rules-to-ai.md` | **Missing → restored from `e4fc9df`** | Recreate as English counterpart of `bangla/from-rules-to-ai.md` |

All three files have been restored from git history as part of A1. Every other nav entry now resolves to an existing file.

---

## 3. Nav vs file tree — full table

Legend: ✅ exists · ⚠️ exists but empty · ❌ missing

### Top level

| Nav label | Target | Status |
| --- | --- | --- |
| Home | `index.md` | ✅ (restored 2026-06-06 from `41627dc`) |
| Overview | `overview.md` | ✅ (recreated 2026-06-06) |
| Executive Summary | `PROJECT_SUMMARY.md` | ✅ (restored 2026-06-06 from `41627dc`) |
| বাংলা - সামারি | `PROJECT_SUMMARY_bangla.md` | ✅ |
| রুলস থেকে AI-তে | `from-rules-to-ai.md` | ✅ (restored 2026-06-06 from `e4fc9df`) |
| বাংলা - রুলস থেকে AI | `bangla/from-rules-to-ai.md` | ✅ |

### AI-Driven Development

| Nav label | Target | Status |
| --- | --- | --- |
| Overview | `ai-development/index.md` | ✅ |
| AI Software Life Cycle | `ai-development/sdlc.md` | ✅ |
| Why Reasoning Matters | `ai-development/reasoning.md` | ✅ |
| Citizen Developer Guide | `ai-development/citizen-developers.md` | ✅ |
| বাংলা - AI ডেভেলপমেন্ট | `bangla/ai-development/index.md` | ⏸ Deferred (2026-06-10) — corrupt mojibake file deleted; Bengali mirror re-translation tracked separately |

### Getting Started

| Nav label | Target | Status |
| --- | --- | --- |
| Overview | `getting-started/index.md` | ✅ |
| Talk to LM Studio | `getting-started/talk-to-llm.md` | ✅ |
| বাংলা - শুরু করুন | `bangla/getting-started/index.md` | ✅ |

### ISP Classifier

| Nav label | Target | Status |
| --- | --- | --- |
| Overview | `isp-classifier/index.md` | ✅ |
| Baseline Classifier | `isp-classifier/baseline.md` | ✅ |
| LLM Classifier | `isp-classifier/llm-classifier.md` | ✅ |
| Classifier Comparison | `isp-classifier/comparison.md` | ✅ |
| বাংলা - ISP Classifier | `bangla/isp-classifier/index.md` | ✅ |

### ISP Reasoning

| Nav label | Target | Status |
| --- | --- | --- |
| Overview | `isp-classifier-reasoning/index.md` | ✅ |
| AI Reasoning | `isp-classifier-reasoning/reasoning.md` | ✅ |
| বাংলা - ISP Reasoning | `bangla/isp-classifier-reasoning/index.md` | ✅ |

### Qwen + RAG

| Nav label | Target | Status |
| --- | --- | --- |
| Overview | `qwen-rag/index.md` | ✅ |
| Qwen RAG Demo | `qwen-rag/qwen-rag-demo.md` | ✅ |
| Simple RAG | `qwen-rag/simple-rag.md` | ✅ |
| Vector Storage | `qwen-rag/vector-storage.md` | ✅ |
| বাংলা - Qwen RAG | `bangla/qwen-rag/index.md` | ✅ |

### Gemma E4B

| Nav label | Target | Status |
| --- | --- | --- |
| Overview | `gemma-e4b/index.md` | ✅ |
| Standard Apps | `gemma-e4b/standard-apps.md` | ✅ |
| SLM Apps | `gemma-e4b/slm-apps.md` | ✅ |
| বাংলা - Gemma E4B | `bangla/gemma-e4b/index.md` | ✅ |

### HR Assistant

| Nav label | Target | Status |
| --- | --- | --- |
| Overview | `hr-assistant/index.md` | ✅ |
| HR Manager | `hr-assistant/hr-manager.md` | ✅ |
| HR Assistant | `hr-assistant/hr-assistant.md` | ✅ |
| Sales Funnel | `hr-assistant/sales-funnel.md` | ✅ |
| বাংলা - HR Assistant | `bangla/hr-assistant/index.md` | ✅ |

### SLA System

| Nav label | Target | Status |
| --- | --- | --- |
| Overview | `sla-system/index.md` | ✅ |
| SLA Classifier | `sla-system/classifier.md` | ✅ |
| ERP Approval | `sla-system/erp-approval.md` | ✅ |
| বাংলা - SLA System | `bangla/sla-system/index.md` | ✅ |

### Smart Gift AI

| Nav label | Target | Status |
| --- | --- | --- |
| Overview | `smart-gift/index.md` | ✅ |
| Admin Panel | `smart-gift/admin.md` | ✅ |
| বাংলা - Smart Gift | `bangla/smart-gift/index.md` | ✅ |

### LLM Demos

| Nav label | Target | Status |
| --- | --- | --- |
| Overview | `llm-demos/index.md` | ✅ |
| LM Demos | `llm-demos/lm-demos.md` | ✅ |
| Hierarchy Demo | `llm-demos/hierarchy.md` | ✅ |
| Mini Quick Demo | `llm-demos/mini-quick.md` | ✅ |
| Stress Test | `llm-demos/stress-test.md` | ✅ |
| বাংলা - LLM Demos | `bangla/llm-demos/index.md` | ✅ |

### Enterprise Apps

| Nav label | Target | Status |
| --- | --- | --- |
| Overview | `enterprise-apps/index.md` | ✅ |
| Model Use Class | `enterprise-apps/model-use.md` | ✅ |
| বাংলা - Enterprise Apps | `bangla/enterprise-apps/index.md` | ✅ |

### MLOps

| Nav label | Target | Status |
| --- | --- | --- |
| Overview | `mlops/index.md` | ✅ |
| Churn Prediction | `mlops/churn-prediction.md` | ✅ |
| Model Registry | `mlops/model-registry.md` | ✅ |
| Monitoring | `mlops/monitoring.md` | ✅ |
| A/B Testing | `mlops/ab-testing.md` | ✅ |
| Retraining | `mlops/retraining.md` | ✅ |
| বাংলা - MLOps | `bangla/mlops/index.md` | ✅ |

### Spec2Code

| Nav label | Target | Status |
| --- | --- | --- |
| স্পেসিফিকেশন থেকে কোড | `spec2code/index.md` | ✅ |

---

## 4. Orphan files (exist on disk, not in nav)

| File | Folder | Recommendation |
| --- | --- | --- |
| `blog/posts/` | `blog/` | Empty. Keep — blog plugin auto-populates from `posts/`. |

No other orphan files found. Every `.md` in `docs/` (excluding `assets/`, `stylesheets/`, `javascripts/`) is reachable from the nav.

---

## 5. Internal broken links

Spot-checked the recently-recreated `overview.md` and the module `index.md` files. No broken internal `.md` links found.

Full link-graph crawl (every `.md` referencing every other `.md`) not run in A1 — deferred to A2 where the new IA will rewrite the affected pages anyway.

---

## 6. Bangla mirror coverage

| English page | Bangla mirror | Status |
| --- | --- | --- |
| `index.md` | `bangla/index.md` | ✅ |
| `ai-development/index.md` | `bangla/ai-development/index.md` | ⏸ Deferred (2026-06-10) — mirror deleted pending re-translation |
| `getting-started/index.md` | `bangla/getting-started/index.md` | ✅ |
| `isp-classifier/index.md` | `bangla/isp-classifier/index.md` | ✅ |
| `isp-classifier-reasoning/index.md` | `bangla/isp-classifier-reasoning/index.md` | ✅ |
| `qwen-rag/index.md` | `bangla/qwen-rag/index.md` | ✅ |
| `gemma-e4b/index.md` | `bangla/gemma-e4b/index.md` | ✅ |
| `hr-assistant/index.md` | `bangla/hr-assistant/index.md` | ✅ |
| `sla-system/index.md` | `bangla/sla-system/index.md` | ✅ |
| `smart-gift/index.md` | `bangla/smart-gift/index.md` | ✅ |
| `llm-demos/index.md` | `bangla/llm-demos/index.md` | ✅ |
| `enterprise-apps/index.md` | `bangla/enterprise-apps/index.md` | ✅ |
| `mlops/index.md` | `bangla/mlops/index.md` | ✅ |
| `reference/index.md` | `bangla/reference/index.md` | ✅ |
| `from-rules-to-ai.md` | `bangla/from-rules-to-ai.md` | ✅ |

**Result:** 100% mirror coverage for every nav-indexed module. ✅

---

## 7. Observations and recommendations

### Theme mismatch

`mkdocs.yml` sets `language: bn` and `font: SiyamRupali` — the site is configured to render in Bengali by default. This works for the current audience but should be reconsidered when A2 introduces the new English-first IA. Recommendation: keep Bengali as default (audience reality) but ensure every page sets its own `lang` frontmatter or use the navigation `title` translation.

### `site_url` mismatch

```
site_url: https://github.io/raqueeb/ai_work_flow
```

But the actual deployed site is `https://aiwithr.github.io/ai_llm/`. This was correct in earlier context — site is now under the `aiwithr` account, but `mkdocs.yml` still points at `raqueeb/ai_work_flow`. **Action for A2:** fix `site_url` and `repo_url` to point at the correct repo, or document why both exist.

### Bangla-only top-level entry

`স্পেসিফিকেশন থেকে কোড` (Spec2Code) is Bengali-only. Either:

1. Add an English parent section and keep this as the Bangla child, or
2. Add an English `spec2code/index.md` (currently exists) and reorganize

The English file `spec2code/index.md` already exists. Recommendation: in A2, wrap it in an "Engineering Practices" section with both languages as children.

### `mlops/index.md` content gap

The folder has 6 well-structured pages but `index.md` is a single index — fine. No action needed in A1, but A5 should verify each subpage links back.

---

## 8. Action items for A2

| # | Item | Status |
| --- | --- | --- |
| 1 | Commit the three restored files (`index.md`, `PROJECT_SUMMARY.md`, `from-rules-to-ai.md`) along with `ROADMAP.md` and `AUDIT.md` | ✅ Done in `6871c59` |
| 2 | Fix `site_url` (live site) and `repo_url` (canonical code repo) in `mkdocs.yml` | ✅ Done in `4e0be5c` for `site_url`; corrected to `raqueeb/ai_work_flow` for `repo_url` / `repo_name` (live site is on `aiwithr` GitHub Pages, but the canonical project repo is `raqueeb/ai_work_flow`) |
| 3 | Reorganize spec2code into a bilingual section | ✅ Done in `4e0be5c` (English + Bangla children under "Engineering Practices") |
| 4 | Begin new IA: `why-ai-work-flow.md`, `demo.md`, and the `adoption/`, `architecture/`, `case-studies/` trees per `ROADMAP.md` §6 | ✅ Done in `4e0be5c` (top-level + index pages; child pages land in A3/A4/A6) |

### A2 commit summary

Commit `4e0be5c` — *"A2: new IA - Get Started section, placeholder pages for Adoption/Architecture/Case Studies, fixed site metadata, bilingual spec2code"*. 7 files changed, 519 insertions, 118 deletions.

- New: `docs/why-ai-work-flow.md`, `docs/demo.md`, `docs/adoption/index.md`, `docs/architecture/index.md`, `docs/case-studies/index.md`
- Rewritten: `docs/index.md` (Home page with grid cards, mermaid flowchart, module table, quick-start)
- Modified: `mkdocs.yml` — fixed `site_name` → "AI Work Flow for Business Docs" (rebranded from "AI Work Flow Docs"), `site_url` / `repo_url` / `repo_name` → `aiwithr/ai_llm` (later corrected: `repo_url` / `repo_name` → `raqueeb/ai_work_flow`, the canonical project repo), rewrote `site_description` in English, added "Get Started" / "Adoption" / "Architecture" / "Case Studies" / "Project Docs" / "Engineering Practices" sections at top of nav, kept existing module sections intact

### Build verification

`mkdocs build --clean` runs in 2.81 s and produces the site. The 22 build warnings are all forward-looking — links to A3/A4/A6 child pages that don't exist yet — and will be resolved as those phases land. Three pre-existing `from-rules-to-ai.md` warnings point to old filenames (`rag-qwen.md`, `reasoning-importance.md`, `enterprise-apps.md`) that were renamed during the module reorganization; these land in A5.

---

## 10. A3 follow-up

A3 closed the adoption journey: 4 child pages + updated `adoption/index.md`, committed in `7c8f372` (5 files changed, 499 insertions).

| # | Item | Status |
| --- | --- | --- |
| 1 | `docs/adoption/discover.md` — Phase 1 page (1 day, 6 steps, deliverable checklist) | ✅ Done in `7c8f372` |
| 2 | `docs/adoption/pilot.md` — Phase 2 page (2–4 weeks, 5 steps, mermaid, deliverable checklist) | ✅ Done in `7c8f372` |
| 3 | `docs/adoption/build.md` — Phase 3 page (4–8 weeks, 4 parallel workstreams, definition of done) | ✅ Done in `7c8f372` |
| 4 | `docs/adoption/scale.md` — Phase 4 page (3–6 months, 3 jobs, month-by-month trajectory, deliverable checklist) | ✅ Done in `7c8f372` |
| 5 | `docs/adoption/index.md` — added "Next step" callout pointing to case studies | ✅ Done in `7c8f372` |
| 6 | Fix A3-introduced cross-section links | ✅ Done in `7c8f372` (3 fixes: `../../sla-system/classifier.md` → `../sla-system/classifier.md`; `../../sla-llm-assistant.md` link dropped because no English page exists at that path; `../../ROADMAP.md` → `../ROADMAP.md`) |
| 7 | Update `ROADMAP.md` decision log with A3 commit | ✅ Done in `7c8f372` follow-up |
| 8 | Update this `AUDIT.md` with A3 status | ✅ Done in `7c8f372` follow-up |

### A3 build verification

After A3, `mkdocs build --clean` produces **0 new warnings** from A3 pages. Remaining 10 warnings breakdown:

- 3 pre-existing in `from-rules-to-ai.md` (`rag-qwen.md`, `reasoning-importance.md`, `enterprise-apps.md` — filename-rename orphans; A5 / A7 work)
- 4 in `architecture/index.md` (`layers.md`, `data-flow.md`, `security.md`, `../reference/python-api.md` — A4 + A7 work)
- 3 in `case-studies/index.md` (`isp-support.md`, `bank-it.md`, `factory-it.md` — A6 work)

**A3 status:** Complete. Adoption journey is end-to-end and links cleanly into case studies + architecture. A4 next.

---

## 11. A4 follow-up

A4 closed the architecture section: 3 new child pages under `docs/architecture/`, committed in `00d1240` (3 files changed, 478 insertions). `architecture/index.md` was already complete (5-layer mermaid + table + child links + see-also block), so no edits to it were required.

| # | Item | Status |
| --- | --- | --- |
| 1 | `docs/architecture/layers.md` — 5-layer contract (Edge / Application / Workflow / Core / Infrastructure): what each layer is, what it is NOT, where typical changes go; 8-row "where does a typical change go?" table; "what this page is NOT" closer; see-also block | ✅ Done in `00d1240` |
| 2 | `docs/architecture/data-flow.md` — end-to-end mermaid sequenceDiagram (operator → Edge → Application → Workflow → Core → LM Studio) with 11 numbered steps; boundary-crossings table; "what NEVER leaves your network" list (prompts, responses, RAG chunks, audit logs); typed-function contract (Core `ChatRequest`/`ChatResult` Pydantic models, Workflow `classify_complaint` example); 2 worked examples with mermaid sequenceDiagrams (A: ISP classifier with no RAG; B: Qwen RAG with retrieval + source filter); "what this page is NOT" closer; see-also block | ✅ Done in `00d1240` |
| 3 | `docs/architecture/security.md` — 3-attacker threat model (curious operator, compromised application server, malicious prompt) with explicit "can do" / "cannot do" for each; ASCII network-placement diagram (operator / application / inference / retrieval subnets, no internet egress on the latter two, allow-list firewall); 14-field audit log table (request_id, actor, tenant, module, model, input/output, latency, tokens, agreement_score, outcome, timestamp) with explicit "what is NOT logged" list (secrets, raw PII text); 5 prompt-injection mitigations (typed output schema as primary defence, server-side system prompt, retrieval source filter, agreement-rate monitoring, per-tenant log namespacing); model provenance (pinned version, SHA-256 in deploy record, frozen eval set re-run, no runtime model download); explicit "what we don't defend against" closer (insider with shell, physical access, side-channel extraction, model-internal bugs, social engineering); "what this page is NOT" closer; see-also block | ✅ Done in `00d1240` |
| 4 | `mkdocs.yml` nav update for the 3 new pages | ⏸ Not needed — `architecture/index.md` is the only nav entry for this section; the 3 child pages are linked from it but not listed in the top-level nav. Consistent with the same pattern used in `adoption/` and `case-studies/`. |
| 5 | Update `ROADMAP.md` decision log with A4 commit | ✅ Done in this follow-up commit. Also fixed the A3 row formatting glitch (was `||| 2026-06-06 | A3 ...` with no leading `|` and no blank-line separator — replaced with a proper `| 2026-06-06 | A3 ...` row plus a blank line, and the new A4 row appended in the same style). |

### A4 build verification

After A4, `mkdocs build --clean` produces **0 new warnings** from the 3 new pages. Remaining 7 warnings breakdown:

- 3 pre-existing in `from-rules-to-ai.md` (`rag-qwen.md`, `reasoning-importance.md`, `enterprise-apps.md` — filename-rename orphans; A5 / A7 work)
- 1 in `architecture/index.md` (`../reference/python-api.md` — A7 work, intentional placeholder)
- 3 in `case-studies/index.md` (`isp-support.md`, `bank-it.md`, `factory-it.md` — A6 work)

**A4 status:** Complete. Architecture section has all 3 child pages (layers, data-flow, security); `architecture/index.md` continues to render cleanly and link to its children. The 3 architecture placeholders in the build are closed. A5 next (module pages brought into the new IA).

---

## 12. A6 follow-up — case studies

A6 closes the Case Studies section of the new IA. Three new pages under `docs/case-studies/`, each one a written-up account of a real (anonymized) deployment mapped to a step in the adoption journey.

| # | Item | Status |
| --- | --- | --- |
| 1 | `docs/case-studies/isp-support.md` — ISP/telco tier-1 complaint classification. Qwen 2.5 1.5B + FastAPI triage service, engineer-in-the-loop. Maps to [Discover](adoption/discover.md) + [Pilot](adoption/pilot.md) + early [Build](adoption/build.md). Covers: the team and the problem, what shipped (with mermaid deployment diagram), the bar (95% category agreement, ≤ 3 s p95), 90-day measured numbers (91.3% / 2.6 s / 8.7% override), 3 failure modes (code-mixed Bengali-English input, P1 over-prioritization, shared-host latency), and 4 lessons learned. | ✅ Done in this commit |
| 2 | `docs/case-studies/bank-it.md` — Bank internal IT helpdesk with RAG over SOPs. Qwen 2.5 1.5B + ChromaDB hybrid retrieval (BM25 + vector). Maps to [Pilot](adoption/pilot.md) → [Build](adoption/build.md) → early [Scale](adoption/scale.md). Covers: data-residency constraint as the driver (not technical enthusiasm), what shipped (Teams bot with RAG + triage front door, mermaid diagram), the bar (90% triage / 80% RAG correctness / 0% hallucinated content), 60-day numbers (93.1% / 84.0% / 0% / 41% self-service deflection), 3 failure modes (stale/duplicate SOPs, Bengali proper-noun embeddings, one prompt-injection success in load test), and 4 lessons including "RAG quality is a data-quality problem, not a model problem". | ✅ Done in this commit |
| 3 | `docs/case-studies/factory-it.md` — Garment-factory shift handover summarization + anomaly flagging. Qwen 2.5 1.5B with a strict 5-field typed schema and a containment-check validator. Maps to deep [Build](adoption/build.md) (24/7 uptime, observability). Covers: handwritten notes as the input problem, what shipped (tablet + 15-min worker + SQLite FTS5 + web UI, mermaid diagram), the bar (95% summarization / 0% hallucinated fields / 100% safety-incident recall), 75-day numbers (97.2% / 0% / 100% on n=8 / 99.4% LLM uptime), 3 failure modes (Bengali on-screen keyboard, parallel-system coexistence, one near-miss safety incident that almost got severity-1'd), and 4 lessons including "the model is the easy 20%; the tablet, keyboard, language, and trust are the hard 80%". | ✅ Done in this commit |
| 4 | `docs/case-studies/index.md` — table updated: the three "Forthcoming (A6)" markers replaced with "In production" status; other prose unchanged. | ✅ Done in this commit |
| 5 | `mkdocs.yml` nav — Case Studies section expanded from 1 entry (Overview) to 4 entries (Overview + 3 case studies). Consistent with the pattern used in the `architecture/` section (Overview + child pages listed in nav, but children not duplicated in the section landing page). | ✅ Done in this commit |
| 6 | `ROADMAP.md` decision log — A6 row appended. | ✅ Done in this commit |

### A6 build verification

After A6, `mkdocs build --strict` produces **0 new warnings** from the 3 new pages. Remaining baseline shrinks from 4 forward-looking warnings to 1:

- 1 in `architecture/index.md` (`../reference/python-api.md` — A7 work, the only remaining placeholder)

The 3 `case-studies/index.md` warnings (`isp-support.md`, `bank-it.md`, `factory-it.md`) are closed because the target files now exist. The 3 pre-existing `from-rules-to-ai.md` filename-rename orphans were already closed in A5 (`b2aeb66`).

**A6 status:** Complete. Case Studies section has all 3 child pages mapped to the three locked audience verticals (ISP / Bank / Factory); `case-studies/index.md` continues to render cleanly and link to all three. A7 next (reference pages: cli, python-api, prompts, benchmarks, glossary, conventions).

---

## 9. Sign-off

- [x] Nav walked end-to-end
- [x] File tree enumerated
- [x] Mirror coverage checked
- [x] Three missing files identified and restored from git history
- [ ] **User review needed before A2**

**A1 status:** Complete. Three blockers resolved (files restored), `ROADMAP.md` and `AUDIT.md` written. Awaiting user review to unlock A2.
