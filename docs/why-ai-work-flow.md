# Why AI Work Flow?

There are many ways to add AI to enterprise operations. This page explains the specific problem **AI Work Flow** is designed to solve, and why a local-first design is the right answer for that problem.

---

## The problem

Most enterprise operations teams face the same set of challenges:

- **Support tickets pile up** with no clear topic, priority, or owner.
- **Runbooks and SOPs** live in PDFs and SharePoint sites that nobody searches.
- **Shift handovers** are tribal knowledge — when the senior engineer is on leave, the team is effectively blind.
- **Network logs and alerts** are too noisy for humans, too specialized for general-purpose chatbots.
- **Hiring and onboarding** take months because the institutional knowledge is in five people's heads.

The instinct in 2024–2026 has been to send all of this to ChatGPT or Claude. That instinct is wrong for most enterprises, for three reasons.

## Why cloud LLMs don't work here

### 1. Data residency

Customer complaint text, network logs, internal SOPs, and HR records are regulated. In Bangladesh (and most regulated markets), sending them to a public API is a compliance event, not a productivity win. The legal team will block it.

### 2. Cost at scale

A team of 50 support staff using a cloud LLM for ticket triage at ~$0.01 per ticket generates ~$10,000/month in API spend before any real value is captured. Local inference on a single GPU is a fixed cost.

### 3. Latency and reliability

Cloud APIs add 200–800ms round-trip latency and have outages. A local model on the same network as the operator responds in 30–100ms and is available whenever the building has power.

## What "local" actually means

"Local" in this project means:

- The model weights live on a machine you control.
- Inference happens on that machine (or on a server in the same data center).
- No request, response, or prompt is ever sent to a third-party API.
- The same Python code runs on a developer laptop for prototyping and on a server for production.

The catch: local models in 2026 are smaller (1B–4B parameters) than the best cloud models. They are not a general-purpose replacement for GPT-4. They are a **focused replacement for one workflow at a time**.

## What this project is

AI Work Flow is a set of **reference implementations** that show how to deploy local models against specific, well-defined enterprise workflows. Each module:

- Has a clear, narrow scope (one workflow, one output).
- Uses a small model (Qwen 2.5 1.5B by default).
- Returns structured output (JSON, a category, a routing decision).
- Has a measurable success metric.

The current modules are:

| Module | Workflow | Output |
| --- | --- | --- |
| [ISP Classifier](isp-classifier/index.md) | Customer complaint → category + priority | `{category, priority, owner}` |
| [SLA System](sla-system/index.md) | Ticket → SLA breach risk + ERP action | `{risk, action, approver}` |
| [Qwen + RAG](qwen-rag/index.md) | Operator question → answer from runbook | Cited paragraph |
| [HR Assistant](hr-assistant/index.md) | Employee question → policy-grounded answer | Cited paragraph |

## What this project is not

- **Not a chatbot.** The output is structured, not freeform conversation.
- **Not a foundation model.** We use Qwen and Gemma as-is, no fine-tuning in the current phase.
- **Not a cloud product.** There is no hosted version. You run it.
- **Not a research project.** Each module exists because a real team has the workflow.

## Who should use this

You should consider AI Work Flow if **all** of these are true:

- You handle regulated or sensitive operational data.
- You have a workflow that is well-defined enough that structured output makes sense.
- You have (or can get) a single GPU server for inference, or are willing to run on CPU for low-volume workflows.
- Your team is comfortable with Python and basic API work.

You should **not** use this if:

- You need a general-purpose conversational assistant. Use a hosted model.
- Your data is public or low-sensitivity. The local-first design is overhead for you.
- You are not willing to do the integration work. Local models need glue code; there is no off-the-shelf product here.

## How to start

The fastest way to evaluate whether this approach works for you:

1. Read the [adoption journey](adoption/index.md) — specifically the **Discover** and **Pilot** phases.
2. Pick one workflow that meets the criteria above.
3. Follow the [Pilot playbook](adoption/pilot.md) to ship a working prototype in 2 weeks.
4. Decide whether to scale or stop, based on the success metric you defined upfront.

The rest of this site supports that path. The [demo page](demo.md) shows concrete examples of what you can build.
