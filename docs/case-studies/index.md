# Case studies

Concrete walkthroughs of AI Work Flow for Business deployed against a real workflow. Each case study follows the same structure: the team, the problem, the chosen workflow, what shipped, and what was learned.

## Available case studies

| Case study | Industry | Workflow | Status |
| --- | --- | --- | --- |
| [ISP support triage](isp-support.md) | ISP / telco | Complaint classification + ticket routing | In production |
| [Bank IT helpdesk](bank-it.md) | Bank | Internal ticket triage + RAG over SOPs | In production |
| [Factory IT operations](factory-it.md) | Factory | Shift handover summarization + anomaly flagging | In production |

## Why these three

The three case studies cover the three audiences locked in [ROADMAP.md §3](../ROADMAP.md):

- **ISP support** — primary audience, narrowest scope, easiest to evaluate
- **Bank IT** — regulated environment, proves the data-residency argument
- **Factory IT** — non-office environment, 24/7 operations, tests the latency argument

## What you should expect

A case study is not a sales brochure. It is a written-up account of what worked, what didn't, and what the team would do differently. Where the actual project has a real customer, the case study is anonymized; where it is a design exercise, the case study says so explicitly.

## See also

- [Demo](../demo.md) — the underlying module behavior
- [Adoption journey](../adoption/index.md) — how a team gets from "interested" to "in production"
