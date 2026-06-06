# Demo — what you can build today

This page shows **concrete, runnable examples** of AI Work Flow modules. Every example uses **Qwen 2.5 1.5B** running locally on LM Studio, returning structured output, and being integrated with an existing system.

> All examples are illustrative. The real implementations live in their respective module pages.

---

## 1. ISP complaint classification

**Input** — a raw customer complaint from a support inbox:

```
Subject: Internet slow since this morning
Body: I have been a customer for 3 years. From 8am today
my download is unusable. I restarted the router twice. I
have an important video call at 3pm. Please help.
```

**Output** — structured JSON the helpdesk system can act on:

```json
{
  "category": "connectivity",
  "subcategory": "speed_degradation",
  "priority": "high",
  "suggested_owner": "noc_l2",
  "suggested_action": "check_olt_port",
  "sentiment": "frustrated",
  "confidence": 0.87
}
```

The helpdesk system takes this JSON, creates a ticket owned by NOC L2, and adds a flag to check the OLT port serving that customer. The model did not "decide" anything — it classified.

**Underlying module:** [ISP Classifier → LLM Classifier](isp-classifier/llm-classifier.md)

## 2. SLA breach risk on a ticket

**Input** — a ticket that has been open for 4 hours, priority P2, customer is a key account:

```json
{
  "ticket_id": "INC-4821",
  "priority": "P2",
  "elapsed_hours": 4,
  "sla_target_hours": 6,
  "customer_tier": "key_account",
  "previous_breaches": 2
}
```

**Output** — risk assessment and recommended ERP action:

```json
{
  "breach_risk": "high",
  "estimated_resolution_hours": 3.5,
  "recommended_action": "escalate_to_tier3",
  "approval_required": "manager",
  "reasoning": "P2 with 2h buffer, key account with 2 prior breaches in 90d. Pattern matches 4 of 5 historical breaches."
}
```

The model reads the structured input and produces a structured recommendation. A human approves; the ERP system then routes accordingly.

**Underlying module:** [SLA System → SLA Classifier](sla-system/classifier.md)

## 3. Runbook Q&A with citations

**Input** — an operator question during an incident:

```
The BGP session to AS-64512 is flapping. What's our
standard mitigation procedure?
```

**Output** — answer grounded in the team's actual runbook, with a citation:

```json
{
  "answer": "Apply the BGP dampening policy 'flap-dampen-50' to the neighbor statement, then raise a P3 incident for tier-2 review within 30 minutes if the flap continues.",
  "source_document": "runbooks/bgp-stability.md",
  "source_section": "§4.2 Flap mitigation",
  "confidence": 0.92
}
```

The model is not "knowing" anything — it is retrieving the relevant runbook section and reformulating the answer. The citation is what makes this useful in a regulated context.

**Underlying module:** [Qwen + RAG → Qwen RAG Demo](qwen-rag/qwen-rag-demo.md)

## 4. Shift handover summary

**Input** — a 3-hour log of events from the previous shift:

```
02:14 — OLT-3 port 7 CRC errors elevated, replaced SFP
02:31 — Customer INC-4702 escalated to L3
03:05 — BGP dampening applied to AS-64512
03:42 — Planned maintenance window started for ring-2
04:00 — Ring-2 maintenance completed without incident
04:15 — Customer called re: INC-4810, scheduled for 09:00
...
```

**Output** — a one-paragraph handover for the oncoming shift:

```json
{
  "summary": "Quiet night. One OLT-3 SFP replacement at 02:14 with no further errors. BGP flap on AS-64512 mitigated at 03:05. One planned maintenance window (ring-2) completed cleanly. One customer escalation (INC-4810) carried over to morning shift with a 09:00 commitment.",
  "open_items": ["INC-4702 (L3)", "INC-4810 (09:00 callback)"],
  "watch_items": ["OLT-3 port 7 — monitor for CRC errors"],
  "shift_risk": "low"
}
```

This replaces a 20-minute verbal handover with a 30-second read.

**Underlying module:** *Coming — see [case studies](case-studies/index.md) when published.*

## 5. Employee policy question

**Input** — an HR question from a team chat:

```
I need to take 3 days off next week for my brother's
wedding. How much advance notice do I need to give?
```

**Output** — answer from the actual employee handbook:

```json
{
  "answer": "For 3 consecutive days off, the handbook requires 5 working days of advance notice and your reporting manager's approval. Submit the leave request in the HR system, then message your manager for approval.",
  "source_document": "handbook/leave-policy.md",
  "source_section": "§3.2 Annual Leave",
  "action_required": "submit_leave_request",
  "confidence": 0.95
}
```

Same pattern as the runbook Q&A — retrieval-augmented answer, cited.

**Underlying module:** [HR Assistant](hr-assistant/index.md)

---

## What all of these have in common

1. **Structured output.** Every example returns JSON. The downstream system is a normal program, not a chat UI.
2. **Narrow scope.** Each model has one job. Classification, routing, retrieval, summarization.
3. **Local inference.** 1.5B parameters. Runs on a laptop. No data leaves the network.
4. **Measurable.** Each module has a success metric you can compute on real data.

If your workflow fits the pattern — narrow, structured, measurable — the next step is the [Pilot playbook](adoption/pilot.md).
