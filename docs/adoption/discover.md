# 1. Discover — is local LLM worth considering for my team?

> **Time to complete:** 1 day, by one engineer. No code in production yet.
> **Exit criterion:** a written answer to "Yes, for workflow X, on hardware Y, with risk Z" — or a written "No, and here's why".

Most failed local-LLM projects fail before any code is written. The team picked the wrong workflow, the wrong hardware target, or the wrong model size. Discover is a one-day pre-mortem to kill the bad ideas cheaply, before they eat 6 weeks of pilot time.

If you already have a working local-LLM prototype, skip this page and go to [Build](build.md). If you have one team in production and want to expand, jump to [Scale](scale.md).

---

## What Discover is not

- It is not a research project. You are not training a model.
- It is not a benchmark. You are not running LM Arena.
- It is not a procurement exercise. You are not buying GPUs.

It is one engineer, one day, one workflow, one laptop, one clear answer.

---

## Step 1 — pick one real workflow (30 min)

Do not pick a generic task ("summarize documents"). Pick a workflow that already exists, has a human in the loop, and is causing measurable pain.

Good candidates:

| Workflow | Pain signal | Why it fits local LLM |
| --- | --- | --- |
| ISP tier-1 ticket triage | 2 minutes average handle time, 40% misrouted | Strict template, low creativity |
| Bank IT password-reset triage | 30% of tickets are duplicates | Strict template, high volume |
| Factory shift handover | Handwritten notes, lost context | Free-form summary, no PII |
| Network device config review | Engineer reviews 50 configs/day | Bounded input, deterministic output |

Bad candidates: open-ended Q&A, creative writing, anything where the model is the product (not a helper).

**Write the answer in one sentence:** _"I am testing whether a local LLM can do **[workflow]** at **[quality bar]** without sending data to the cloud."_

---

## Step 2 — sanity-check the data residency story (15 min)

If your data residency concern is real, the answer is almost always "yes, local LLM is worth considering". If it is theatre, the answer is almost always "use a hosted API and ship faster".

Ask the legal/security team three questions, in writing:

1. **What classes of data may not leave our network?** (customer PII, network logs, internal docs, source code, financial data...)
2. **What classes may go to a third-party API under a DPA?** (often: anonymized, de-identified, or public)
3. **What is the cost of a breach, in money and reputation?**

If (1) covers your workflow and (3) is non-trivial, local LLM is structurally cheaper than building a hybrid gateway. If (2) covers your workflow comfortably, a hosted API is probably faster and good enough — and you should re-read [the hybrid-gateway note](../index.md#can-we-avoid-cloud-llms) on the home page.

---

## Step 3 — sanity-check the hardware (15 min)

The cheapest local-LLM mistake is buying a model that does not fit on the hardware you have.

| Model size (Q4 quant) | RAM needed (approx) | Fits on |
| --- | --- | --- |
| 1.5B params (Qwen 2.5) | ~2 GB | Any developer laptop |
| 4B params (Gemma 3) | ~5 GB | Most office laptops |
| 7B params | ~9 GB | Modern workstation |
| 13B+ params | 16+ GB | Dedicated GPU box |

The ISP-classifier and SLA-assistant reference modules ship with **Qwen 2.5 1.5B** by default precisely because it fits on the laptops a NOC engineer already has. If your workflow demands 13B and you do not have a GPU box, you have discovered a blocker in 15 minutes instead of 6 weeks.

---

## Step 4 — pick the success bar in advance (15 min)

Write the bar on paper before you run a single prompt. The bar must be three things:

- **Measurable.** "95% of tickets get the right label" not "looks good".
- **Compared to today.** "Same accuracy as the human baseline of 88% on this week's tickets" not "perfect".
- **Bounded.** Two weeks, one workflow, one dataset. Not "we'll see".

If the bar is not measurable, the pilot will never end. If the bar is not compared to today, you will never know if you passed.

---

## Step 5 — run the one-day evaluation (4 hours)

Install [LM Studio](https://lmstudio.ai/), download Qwen 2.5 1.5B (or the smallest model that meets your bar), and run the workflow on 20–50 real examples from last week.

Document:

- **Top 3 failure modes.** "Hallucinates IP addresses", "Mis-routes 10% of cases", "Too slow at 12 s/response".
- **Top 1 surprising success.** "It actually got the SLA priority right without being told".
- **One sentence on whether the bar is reachable.** "Reachable" or "Not reachable" or "Reachable with a bigger model on a GPU box".

You are not making a buy decision in step 5. You are looking for a single sentence to write in step 6.

---

## Step 6 — write the answer (30 min)

End the day with a one-page memo. Three sections only:

1. **Workflow** (one sentence from step 1)
2. **Yes / No / Yes-but** (the one-sentence verdict)
3. **Next step** (one of: "go to [Pilot](pilot.md)", "kill it", "try a different workflow", "get a bigger model")

The memo is the deliverable. If the team lead or sponsor does not sign off on the memo, the project does not move to Pilot. This is the entire point of Discover.

---

## What you should NOT do in Discover

- Do not set up a CI/CD pipeline. You are not in Build yet.
- Do not benchmark 6 models. Pick the smallest plausible one and measure.
- Do not invite the whole team. One engineer, one day.
- Do not skip writing the memo. "It went OK" is not a memo.

---

## Deliverable checklist

- [ ] One workflow picked, in writing
- [ ] Data residency question answered by legal/security
- [ ] Hardware target confirmed (or upgraded)
- [ ] Success bar written down, measurable
- [ ] 20–50 example evaluation run, top 3 failure modes documented
- [ ] One-page memo with Yes / No / Yes-but
- [ ] Sponsor sign-off (verbal or written)

When the memo is signed, you have answered the question Discover is supposed to answer. Go to [Pilot](pilot.md).
