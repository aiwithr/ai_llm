# AI Work Flow

> **Enterprise automation, without the cloud.**
> Local LLMs, real workflows, no data leaving your network.

AI Work Flow is a working library of patterns and reference implementations for using **local language models** to automate real enterprise operations — ISP support, bank IT, factory floor handovers, and more.

It is built for teams that need AI assistance but cannot send customer data, network logs, or internal documents to a public API.

---

## Start here

<div class="grid cards" markdown>

-   :material-rocket-launch:{ .lg .middle } **[Why AI Work Flow?](why-ai-work-flow.md)**

    ---

    What this project is, who it is for, and why a local-first design matters.

-   :material-play-circle:{ .lg .middle } **[See it run](demo.md)**

    ---

    Concrete examples of what you can automate today with a 1.5B-parameter local model.

-   :material-map:{ .lg .middle } **[Adoption journey](adoption/index.md)**

    ---

    A four-phase path from "what is this" to running in production across 5+ teams.

-   :material-sitemap:{ .lg .middle } **[Architecture](architecture/index.md)**

    ---

    How the layers fit together: LM Studio, FastAPI, ChromaDB, the modules on top.

</div>

## Who this is for

| Audience | What you get |
| --- | --- |
| **ISP / telco operations** (NOC, field ops, support) | Complaint classification, ticket routing, runbook Q&A |
| **Bank IT teams** | Internal helpdesk triage, network ops log analysis, SOP lookup |
| **Factory operations** | Shift handover summarization, anomaly flagging, maintenance ticket drafts |
| **University IT** *(later phase)* | Lab scheduling helpdesk, admissions Q&A |

If you handle sensitive operational data, this site is for you.

## How it works

```mermaid
flowchart LR
    A[Your data] --> B[Local LLM<br/>Qwen 2.5 1.5B<br/>or Gemma 3 4B]
    B --> C[Structured output]
    C --> D[Your existing<br/>tools and workflows]

    style A fill:#e3f2fd
    style B fill:#fff3e0
    style D fill:#c8e6c9
```

No data leaves your network. No API keys. No vendor lock-in. The same Python code that runs on your laptop runs on your server.

## What's in the box

| Module | What it does | Doc |
| --- | --- | --- |
| ISP Classifier | Routes customer complaints by topic and priority | [docs](isp-classifier/index.md) |
| SLA System | Evaluates SLA breaches and ERP approvals | [docs](sla-system/index.md) |
| Qwen + RAG | Retrieval-augmented answers over your runbooks | [docs](qwen-rag/index.md) |
| HR Assistant | Leave, attendance, and HR FAQ automation | [docs](hr-assistant/index.md) |
| Smart Gift AI | Recommendation engine on top of a local LLM | [docs](smart-gift/index.md) |
| MLOps | Model registry, monitoring, A/B testing, retraining | [docs](mlops/index.md) |
| LLM Demos | Working examples of patterns (hierarchy, mini-quick, stress test) | [docs](llm-demos/index.md) |

## Project plan

This is an active project. See [ROADMAP.md](ROADMAP.md) for the locked decisions, audience, and the eight-session docs plan currently in progress.

Current status: **A2** (new information architecture + Why + Demo pages). See [AUDIT.md](AUDIT.md) for the current site audit.

## Quick start

1. Install [LM Studio](https://lmstudio.ai/) and load **Qwen 2.5 1.5B Instruct** (or **Gemma 3 4B** for harder reasoning).
2. Start the local server on `http://localhost:1234/v1`.
3. Open the [Getting Started](getting-started/index.md) guide and run your first script.

That's it. No cloud account, no API key, no telemetry.
