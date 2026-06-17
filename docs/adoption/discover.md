# 1. Discover — is local LLM worth considering for my team?

> **Time to complete:** 1 day, by one engineer. No code in production yet.
> **Exit criterion:** a written answer to "Yes, for workflow X, on hardware Y, with risk Z" — or a written "No, and here's why".
> **Deliverable:** a one-page memo signed by the sponsor, with a Yes / No / Yes-but verdict and a single next step.

Most failed local-LLM projects fail before any code is written. The team picked the wrong workflow, the wrong hardware target, or the wrong model size. By the time the pilot is six weeks in, the team has spent a quarter's worth of an engineer's time and the failure is visible only after enough has been built to make changing course feel like a defeat. Discover is a one-day pre-mortem to kill the bad ideas cheaply, while changing course is still cheap.

The reason Discover exists is not that the work is hard. The reason is that the wrong workflow looks like the right workflow until you have spent enough time on it to notice. A 1.5B model that triages ISP tickets well looks like a 1.5B model that should triage HR requests too. It should not. A workflow where the human baseline is 70% looks the same as one where the human baseline is 95% — until you measure, and discover that the model is fighting humans who were already bad at the task. Discover is the day you measure first, build second.

If you already have a working local-LLM prototype, skip this page and go to [Build](build.md). If you have one team in production and want to expand, jump to [Scale](scale.md). If you have no team and no workflow, you are in the right place.

---

## What Discover is not

- It is not a research project. You are not training a model.
- It is not a benchmark. You are not running LM Arena or a leaderboard.
- It is not a procurement exercise. You are not buying GPUs, you are not signing MSAs, you are not asking finance for a capex line.
- It is not a proof of concept. There is no demo at the end. There is a memo.
- It is not a team exercise. One engineer, one day, one decision.

It is one engineer, one day, one workflow, one laptop, one clear answer. The whole point of Discover is that the cost of saying "no" stays low. If the answer is "no, this workflow is the wrong workflow", the cost is a day. If the answer is "no, this workflow was the wrong workflow" six weeks into a pilot, the cost is two months of an engineer's time and a demotivated team.

> **FDE lens:** Discover is the FDE's first step — **Audit**. The 1-day pre-mortem is the FDE playbook accelerated by an order of magnitude. The FDE adds two things on top of the memo: a sponsor's signature from the *customer's* side, and the name of the customer's engineer who will receive the handoff. See [FDE chapter](fde.md) for the full FDE methodology (Audit → Evals → Deployment) and why local-LLM enterprises need the FDE role to be filled.

---

## Step 1 — pick one real workflow (30 min)

Do not pick a generic task ("summarize documents"). Pick a workflow that already exists, has a human in the loop, and is causing measurable pain. "Measurable pain" matters more than "interesting AI problem" — the people who will sponsor the work are the people who feel the pain, and the bar you set in Step 4 is going to be compared against today's pain, not against an ideal.

A workflow is a good candidate if it satisfies three tests at once. First, the inputs are bounded: a ticket, a config file, a shift log, a paragraph of an internal document — not "the entire customer database". Second, the output is a decision, not a generation: a category, a priority, a risk flag, a three-bullet summary — not "an email to the customer". Third, a human is already doing the work and the work has measurable cost: time per case, error rate, throughput, queue depth. If any of these three is missing, you are in research territory, and research is not what Discover is for.

Good candidates:

| Workflow | Pain signal | Why it fits local LLM |
| --- | --- | --- |
| ISP tier-1 ticket triage | 2 minutes average handle time, 40% misrouted | Strict template, low creativity |
| Bank IT password-reset triage | 30% of tickets are duplicates | Strict template, high volume |
| Factory shift handover | Handwritten notes, lost context | Free-form summary, no PII |
| Network device config review | Engineer reviews 50 configs/day | Bounded input, deterministic output |
| HR policy Q&A | 80% of tickets repeat the same 12 questions | Bounded domain, retrieval-friendly |

Bad candidates: open-ended Q&A, creative writing, anything where the model is the product (not a helper), and anything where the answer is itself the artifact the customer pays for. If the model is the product, you are building a SaaS company, not a local-LLM adoption story.

**Write the answer in one sentence:** _"I am testing whether a local LLM can do **[workflow]** at **[quality bar]** without sending data to the cloud."_ The sentence is the project. If you cannot write the sentence, you have not picked a workflow yet.

---

## Step 2 — sanity-check the data residency story (15 min)

If your data residency concern is real, the answer is almost always "yes, local LLM is worth considering". If it is theatre, the answer is almost always "use a hosted API and ship faster". The fastest way to know which one you have is to ask the legal/security team three questions, in writing — because written answers are evidence, and the memo you write in Step 6 will need to cite them.

The three questions, in order:

1. **What classes of data may not leave our network?** (customer PII, network logs, internal docs, source code, financial data, healthcare records...)
2. **What classes may go to a third-party API under a DPA?** (often: anonymized, de-identified, or public — but the legal team has the actual list)
3. **What is the cost of a breach, in money and reputation?** (this is the number that tells you whether local LLM is structurally cheaper than a hybrid gateway)

If (1) covers your workflow and (3) is non-trivial, local LLM is structurally cheaper than building a hybrid gateway. A hybrid gateway still ships data to a hosted model — just with extra hops. If the data may not leave the network, the answer is local, period. If (2) covers your workflow comfortably and (1) does not, a hosted API is probably faster and good enough — and you should re-read [the hybrid-gateway note](../index.md#the-decision-local-or-cloud) on the home page before concluding that local LLM is even the right frame.

The reason the third question matters is that it makes the cost of "wrong choice" concrete. If a breach costs $50k in regulatory fines, then a $20k pilot that prevents a likely breach pays for itself in 6 months. If a breach costs $50M in customer churn, then the same $20k pilot is rounding error. Most data-residency concerns are somewhere in the middle, and that is exactly the band where Discover is the right move.

---

## Step 3 — sanity-check the hardware (15 min)

The cheapest local-LLM mistake is buying a model that does not fit on the hardware you have. The second cheapest is buying hardware for a model you do not need. The third cheapest is the 90-day cycle of "we have a GPU, therefore we should use a 13B model" — which adds three figures to the electricity bill and gains nothing over a 4B model that meets the bar.

A practical model-size table for a Q4-quantized model:

| Model size (Q4 quant) | RAM needed (approx) | Fits on |
| --- | --- | --- |
| 1.5B params (Qwen 2.5) | ~2 GB | Any developer laptop |
| 4B params (Gemma 3) | ~5 GB | Most office laptops |
| 7B params | ~9 GB | Modern workstation |
| 13B+ params | 16+ GB | Dedicated GPU box |

The ISP-classifier and SLA-assistant reference modules ship with **Qwen 2.5 1.5B** by default precisely because it fits on the laptops a NOC engineer already has. If your workflow demands 13B and you do not have a GPU box, you have discovered a blocker in 15 minutes instead of 6 weeks — which is the entire point of the hardware check. If your workflow is fine with 1.5B and you are about to spec a GPU workstation, you have discovered a different blocker: the cost is unjustified.

A useful rule: pick the smallest model that plausibly meets the bar in Step 4, then measure. If the bar is reachable, the smallest model is your Build-phase default. If the bar is not reachable with the smallest model, the next step is "bigger model on the same hardware" or "bigger hardware with the same model" — but not both at once, and not before Step 5 has produced evidence.

---

## Step 4 — pick the success bar in advance (15 min)

Write the bar on paper before you run a single prompt. The bar must be three things:

- **Measurable.** "95% of tickets get the right label" not "looks good". "≤ 8 second p95 latency" not "fast enough". "0% hallucinated IP addresses" not "we will see".
- **Compared to today.** "Same accuracy as the human baseline of 88% on this week's tickets" not "perfect". The model does not need to be better than humans; it needs to be good enough to be a useful draft, an early signal, or a triage filter.
- **Bounded.** Two weeks, one workflow, one dataset. Not "we'll see". Not "by quarter end". Not "in production". A pilot that has no end is a pilot that has not been decided.

If the bar is not measurable, the pilot will never end — because every failure is explainable as "we just need a better prompt". If the bar is not compared to today, you will never know if you passed — because "perfect" is unreachable, and "very good" is unfalsifiable. If the bar is not bounded in time, the pilot will become a programme, and a programme without a sponsor is a hobby.

The bar is the single most important artifact of Discover. Write it on paper, share it with the sponsor, get a verbal or written acknowledgement that "if we hit the bar, we go to Pilot", and keep that artefact. The first time the bar becomes negotiable, the project becomes a pilot in name only.

---

## Step 5 — run the one-day evaluation (4 hours)

Install [LM Studio](https://lmstudio.ai/), download Qwen 2.5 1.5B (or the smallest model that meets your bar), and run the workflow on 20–50 real examples from last week. The examples must be real, not synthesised, and they must be from before today — because today's examples may already be biased by whoever worked on them.

The evaluation is not a benchmark. It is a stress test: are there failure modes that obviously disqualify the workflow, and are there surprising successes that suggest the bar is reachable. Document three things, no more, no fewer:

- **Top 3 failure modes.** "Hallucinates IP addresses", "Mis-routes 10% of cases", "Too slow at 12 s/response". Concrete, count-able, would-block-the-pilot.
- **Top 1 surprising success.** "It actually got the SLA priority right without being told". A success you did not design for, that changes the project's value proposition.
- **One sentence on whether the bar is reachable.** "Reachable" or "Not reachable" or "Reachable with a bigger model on a GPU box". The sentence is what you will quote in the memo.

You are not making a buy decision in step 5. You are not making a build decision. You are looking for a single sentence to write in step 6. The four hours is enough to find that sentence; it is not enough to find anything else. If you find yourself reaching for "let me try a different prompt", you have already left Discover and started the pilot. Stop.

---

## Step 6 — write the answer (30 min)

End the day with a one-page memo. Three sections only:

1. **Workflow** (one sentence from step 1)
2. **Yes / No / Yes-but** (the one-sentence verdict, with the evidence from steps 2–5 attached as a footnote)
3. **Next step** (one of: "go to [Pilot](pilot.md)", "kill it", "try a different workflow", "get a bigger model")

The memo is the deliverable. If the team lead or sponsor does not sign off on the memo, the project does not move to Pilot. This is the entire point of Discover. The memo is also the artifact that lives after the day ends — six months later, when someone asks "why did we choose this workflow and not that one", the memo is the answer.

A useful test for the memo: a new engineer, joining the team a year from now, should be able to read the memo and understand what was decided, why, and what the next step was. If the memo cannot survive that test, the memo is not finished. Rewrite it until it can.

---

## What you should NOT do in Discover

- **Do not set up a CI/CD pipeline.** You are not in Build yet. CI in Discover is theatre, and theatre is what makes Build slow.
- **Do not benchmark 6 models.** Pick the smallest plausible one and measure. If the smallest meets the bar, the bigger ones are not in scope. If the smallest does not meet the bar, you need a different workflow, not a different model.
- **Do not invite the whole team.** One engineer, one day. More engineers = more opinions = no memo. More stakeholders = more sign-offs = no day.
- **Do not skip writing the memo.** "It went OK" is not a memo. "It went OK" is a project that never gets revisited, until someone asks why the pilot is six months late and there is no written record of the decision.
- **Do not start writing the prompt.** The prompt belongs to the pilot. Discover produces a memo, not a prototype.

---

## Deliverable checklist

- [ ] One workflow picked, in writing
- [ ] Data residency question answered by legal/security (in writing, with the three answers attached)
- [ ] Hardware target confirmed (or upgraded) and the smallest fitting model identified
- [ ] Success bar written down, measurable, comparable, bounded
- [ ] 20–50 example evaluation run, top 3 failure modes documented
- [ ] One-page memo with Yes / No / Yes-but
- [ ] Sponsor sign-off (verbal or written)
- [ ] The memo is filed somewhere a future engineer can find it

When the memo is signed, you have answered the question Discover is supposed to answer. Go to [Pilot](pilot.md).

---

For further reading: the [home page](../index.md) has the "local or cloud" decision tree that this page is a specialisation of. The [roadmap](../ROADMAP.md) places Discover at the start of Phase A — adoption. If Discover says "no", you are not behind; you are ahead of the team that found out in week 6.
