# 5. Forward Deployed Engineering — the role your local-LLM programme actually needs

> **Time to read:** 30 minutes. No code.
> **Purpose:** give a name and a discipline to the work the four phases already describe, so a new engineer joining next quarter knows the role they are filling and the language the rest of the industry uses.
> **Prerequisite:** the [adoption overview](index.md). FDE is a lens on Discover / Pilot / Build / Scale, not a replacement for them.

The role of the **Forward Deployed Engineer (FDE)** has gone from a Palantir / OpenAI / Anthropic buzzword to a normal line item in the AI org chart. The name is the easy part; the discipline is what matters. FDEs do not build software the way a normal backend team does. They sit inside a customer's environment long enough to learn the workflow, ship something that works against the customer's real data on the customer's own hardware, and hand the running system over to the customer's own engineers before they leave. The handoff is the deliverable, not the code.

This book already describes that job. The four phases — [Discover](discover.md), [Pilot](pilot.md), [Build](build.md), [Scale](scale.md) — are the FDE playbook, written in operational language. This chapter is the *vocabulary*: the role, the methodology, the trade-offs, and the connection to the FDE hiring market that the rest of the AI industry is now running.

If you are an engineer reading this for the first time, the practical answer is: **your next two years look more like an FDE than like a backend engineer.** A platform team of three people will own a local-LLM programme that ships to ten business units. You will be one of those three. The work is FDE work, even if your job title still says "ML engineer" or "platform engineer".

If you are a manager, the practical answer is: **hire one FDE before you hire three ML engineers.** A strong FDE is the difference between a programme and a project. The FDE is the person who walks into the bank's IT helpdesk on day 1, sits with the helpdesk lead for two weeks, and leaves with a running classifier. The three ML engineers you might otherwise hire would have spent those two weeks arguing about model size.

---

## What an FDE is

The phrase "Forward Deployed Engineer" comes from Palantir in the late 2000s. The original deployment model was: send a small team of senior engineers into a customer's environment, give them a problem, and let them ship against the customer's data. The "forward" in "forward deployed" is the same "forward" as in "forward operating base" — the engineer is *in* the customer's territory, not watching it from headquarters.

The job, in one line: **an FDE is the engineer whose job is to ship the customer's first working system, not the engineer's fifth abstraction layer.**

The reason the role exists is that the gap between a vendor's demo and the customer's first production use is filled with work that no vendor's product team will ever do. The vendor ships a model. The customer has a workflow, a data-residency constraint, an existing ticketing system, an on-call rotation, a change-management board, and a CISO who needs to sign off. The vendor is not going to integrate with the ticketing system, the vendor is not going to make peace with the CISO, the vendor is not going to sit through the change-management board. Someone on the customer's side has to do all of that. That someone is the FDE.

Three traits define the role. The first is **proximity to the work**: the FDE is at the customer, not at the platform team, and the customer can tell. The second is **temporal urgency**: the FDE's deliverables are 2-week prototypes and 8-week pilots, not 6-month roadmaps. The third is **ownership of the handoff**: the FDE does not just ship the system, the FDE *leaves* the customer with the engineers who can run it. The handoff is the deliverable; the system is the proof.

A useful way to think about it: a backend engineer ships a service to internal users; an FDE ships a service to a customer (or to an internal team that is the customer). The rest of the role description follows from that one difference.

---

## The FDE methodology: Audit → Evals → Deployment

The FDE playbook has three steps, in order. They map almost 1:1 to the four phases in this book.

| FDE step | Book phase | What the FDE is doing | Time-box |
| --- | --- | --- | --- |
| **Audit** | [Discover](discover.md) | Sitting with the team, mapping the workflow, finding the bottleneck, writing the bar. | 1–2 weeks |
| **Evals** | [Pilot](pilot.md) | Building a small prototype, running it in shadow mode on real data, measuring against the bar. | 2–4 weeks |
| **Deployment** | [Build](build.md) + [Scale](scale.md) | Taking the prototype to production on the customer's hardware, handing it over to the customer's engineers. | 4–8 weeks |

The methodology is older than the local-LLM industry. It is the same shape Palantir used in the late 2000s, the same shape the early applied-AI consultancies used in the late 2010s, and the same shape any consultancy that ships against customer data uses. The local-LLM programme in this book is the same shape with the data-residency constraint added, and the data-residency constraint is what makes the FDE **mandatory** rather than optional.

### Step 1 — Audit (1–2 weeks)

The FDE spends the first week or two on the customer's site. Not in conference rooms — on the floor, with the engineers who actually do the work. The job is to map the workflow, find the bottleneck, and write the bar. The output is a one-page memo with a Yes / No / Yes-but verdict — exactly the [Discover](discover.md) deliverable, with two additions:

1. The memo is signed by the *customer's* sponsor, not the FDE's manager. The customer's signature is the proof that the work has a local owner.
2. The memo names the customer's engineer who will receive the handoff. Without a name, the handoff has no destination.

The audit is the most important step, because the audit is what kills the bad ideas cheaply. An FDE who skips the audit and starts building will spend 8 weeks building the wrong thing, and the customer will know it was the FDE's fault. An FDE who runs a 2-week audit and writes a No memo will be thanked, because the customer just saved 8 weeks.

### Step 2 — Evals (2–4 weeks)

The FDE ships a small prototype, runs it in shadow mode against the customer's real data, and measures the agreement rate. This is the [Pilot](pilot.md) phase with one addition: the eval set is the customer's eval set, not the vendor's. The vendor's eval set is for benchmarking models in the abstract. The customer's eval set is for asking "did this model just answer the same way the helpdesk lead would have answered?". The two are not the same.

The eval set is also the FDE's **most valuable artifact**. It is what survives the FDE's departure. The FDE leaves, and the customer keeps the eval set. Six months later, when the model needs to be upgraded, the eval set is what makes the upgrade decision reproducible. The eval set is the customer's *contract with the model* — the frozen reference that says "this is what good looks like".

The FDE's rule: **no prototype ships to production without an eval set**. A prototype without an eval set is a demo. A prototype with an eval set is a product.

### Step 3 — Deployment (4–8 weeks)

The FDE takes the prototype, packages it as a service, deploys it on the customer's hardware, and hands it over to the customer's engineers. The deployment is the [Build](build.md) phase with one addition: the FDE does not stay. The handoff is the deliverable. If the FDE's departure is the moment the system stops working, the deployment has failed.

The handoff has four parts:

1. A **runbook** tested cold by the customer's engineers, not the FDE.
2. A **rollback** fire-drill run by the customer's engineers, with the FDE watching, not the other way around.
3. An **on-call rotation** with the customer's names in it, not the FDE's.
4. A **written handoff memo** that says what works, what doesn't, and what the customer should watch for over the next 90 days.

If all four are true, the FDE can leave. If any of them is missing, the FDE's job is not done, even if the system is in production.

---

## Why local-LLM enterprises need an FDE (and cloud-model companies do not)

A cloud-model company can ship AI features to its customer without anyone ever visiting the customer's office. The model is in the vendor's data centre, the API is on the vendor's infrastructure, the customer's data is shipped to the vendor under a Data Processing Agreement, and the only person the customer talks to is a sales engineer. The sales engineer is not an FDE — they are not on the customer's site, they are not building against the customer's data, and they are not handing over a running system. They are selling.

A local-LLM enterprise cannot do this. Three constraints force the FDE on-site:

1. **The data cannot leave the network.** No DPA, no hosted API, no SaaS shortcut. The model has to run on the customer's hardware, against the customer's data, on the customer's network. Someone has to be on the customer's site to make that happen.
2. **The customer's hardware is the customer's hardware.** The FDE cannot install LM Studio on a generic VM. The FDE has to install LM Studio on the specific workstation the customer has, with the specific OS, the specific AV software, the specific firewall rules, and the specific change-management board approval. None of that is generic.
3. **The customer's workflow is the customer's workflow.** The helpdesk is not the vendor's helpdesk. The ticketing system is not the vendor's ticketing system. The shift handover is not the vendor's shift handover. The FDE has to learn the customer's workflow from the customer, not from a sales deck.

This is the reason the local-LLM programme in this book is, structurally, an FDE programme, even though we did not call it that until now. The on-prem constraint makes the FDE mandatory, not optional. A cloud-model company can hire a sales engineer and ship; a local-LLM company has to hire an FDE and *embed* them with the customer.

The corollary is that the FDE's market value is higher than the sales engineer's, because the FDE is harder to replace. A sales engineer who knows the product is a sales engineer; a sales engineer who has shipped a working system on the customer's hardware and handed it over to the customer's engineers is an FDE. The first can be replaced in a week; the second takes six months to grow.

---

## The "automate vs. don't automate" rule

The hardest part of an FDE's job is the "don't automate" half. The default assumption — that every workflow is a candidate for automation — is wrong, and an FDE who believes it will waste the customer's time. The rule is older than LLMs, and it is the rule that separates an FDE from a junior engineer with a prompt.

A workflow is a good candidate for local-LLM automation if and only if all three of these are true:

1. **The inputs are bounded.** A ticket, a config file, a paragraph of an internal document, a shift log. Not "the entire customer database", not "every document in the share drive". Bounded inputs mean the model's context window is not the bottleneck.
2. **The output is a decision, not a generation.** A category, a priority, a risk flag, a 3-bullet summary, an answer to a known question. Not an email to the customer, not a long-form report, not "a personalised response to each user's emotional state". Decisions are testable; generations are not.
3. **The work has measurable cost today.** The human is doing the work, the work takes time, the time costs money, the error rate is measurable. If the work is currently free, or the error rate is unknown, the work is not ready for automation — it is ready for *measurement*.

An FDE who runs these three questions against the customer's top 10 workflows will find that 6–7 are not candidates. The instinct to find an automation candidate in all 10 is the instinct to fail. The good news is the 3–4 that *are* candidates are usually high-value, and shipping on those 3–4 is what builds the programme.

This is the same logic that lives in [Discover — Step 1](discover.md#step-1--pick-one-real-workflow-30-min), and the reason it lives there is that the logic is the FDE's logic. The book and the role are the same thing.

---

## The "million-dollar hire" problem

The FDE market is tight. The best FDEs are the engineers who can sit in a customer's office, learn a workflow the customer does not consciously know how to describe, write a 200-line prototype, run a shadow-mode eval, package it as a service, deploy it on the customer's hardware, and hand it over — all in 12 weeks. That engineer is rare. The best of them are the people Applied-AI consultancies and the platform companies are trying to hire at $400k–$700k base. The worst of them are the people who can do 2 of the 6 steps.

A hiring manager who needs an FDE has three options, in order of cost:

1. **Hire a senior engineer with 5+ years of platform work and a customer-facing disposition.** Train them on the FDE playbook (this chapter is a 30-minute version of the playbook). The training cost is 6 months of shadowing an experienced FDE, and the failure rate is high — half the candidates will turn out to be senior engineers who cannot operate without a ticketing system behind them. The other half will be the people you wanted to hire.
2. **Hire an FDE from an applied-AI consultancy.** This is faster but more expensive; the going rate is $400k–$700k base plus equity. The advantage is they come with the playbook already loaded. The disadvantage is they have not done a *local-LLM* engagement, and the on-prem constraint is what makes the FDE mandatory in the first place. You will pay 3–6 months of their salary to learn the local-LLM-specific ops work.
3. **Hire a consultant FDE for one engagement.** The fastest path, the highest unit cost. Useful for the first engagement, useless for the second. The first engagement is when the FDE writes the playbook for the customer's environment; the second engagement is when the customer's own engineers run the playbook. If you are still buying FDE consultants by engagement 3, you are not building a programme.

The right answer for most local-LLM enterprises is option 1: hire the senior engineer, run them through this book, and accept the 50% failure rate. The 50% that succeed are the FDEs you wanted; the 50% that fail are still senior engineers, and you needed senior engineers anyway.

---

## The case studies as FDE engagements

The three case studies in this book — [ISP support](../case-studies/isp-support.md), [Bank IT](../case-studies/bank-it.md), [Factory IT](../case-studies/factory-it.md) — are worked FDE engagements. Reading them through the FDE lens is the fastest way to see what an FDE does in practice.

**ISP support triage** ([case study](../case-studies/isp-support.md)). A two-engineer FDE team sat with the NOC lead for a week, mapped the tier-1 ticket workflow, wrote a Yes verdict, shipped a Qwen 1.5B classifier on the NOC's existing workstations, ran 90 days of shadow mode against real tickets, and handed the system over to the NOC's own engineers. The 91.3% category agreement and 2.6 s p95 are the audit artifacts. The handoff memo and the eval set are the deliverables. The FDE is not on-site anymore; the NOC engineers own the system.

**Bank IT helpdesk** ([case study](../case-studies/bank-it.md)). A three-engineer FDE team (one platform, one data, one ops) sat with the bank's IT helpdesk lead for two weeks, audited the workflow, built a RAG system over the bank's own SOPs, deployed it as a Teams bot, ran 60 days of shadow mode, and handed it over. The 0% hallucinated content and 96.7% citation accuracy are the audit artifacts. The CISO's bar, signed in writing before the prototype, is the deliverable. The bank's helpdesk engineers own the system; the bank's security team owns the audit log; the bank's infrastructure team owns the LM Studio host.

**Factory IT operations** ([case study](../case-studies/factory-it.md)). A two-engineer FDE team spent 10 days on the factory floor, watched three shift handovers, mapped the free-form notes workflow, built a 5-field typed summarizer with a containment-check validator, deployed it on the factory's own server, ran 75 days of shadow mode, and handed it over. The 0% hallucinated fields and 100% safety-incident recall on n=8 are the audit artifacts. The containment-check validator is the deliverable — it is the test that makes the system survive an upgrade without producing new failure modes the original FDE team never saw.

In all three, the FDE's job is the same shape: audit the workflow, write the bar, ship a prototype, run shadow mode, hand over. The differences are local — the model size, the data, the hardware, the customer's compliance regime — and the FDE's playbook is what does not change.

---

## What an FDE does NOT do

A short list, because the FDE's boundaries are what makes the role valuable:

- **An FDE is not a sales engineer.** Sales engineers demo products. FDEs ship systems. A sales engineer's deliverable is a signed order; an FDE's deliverable is a running service in the customer's environment.
- **An FDE is not a platform engineer.** Platform engineers build the platform; FDEs use the platform to ship against the customer's data. The platform is the FDE's *raw material*, not the FDE's deliverable.
- **An FDE is not a research engineer.** FDEs do not train models, do not publish papers, do not run leaderboard benchmarks. FDEs use models that exist; the research is someone else's job.
- **An FDE is not a consultant.** Consultants give advice; FDEs ship systems. A consultant's deliverable is a slide deck; an FDE's deliverable is a running service the customer can use.
- **An FDE is not a permanent fixture.** The FDE's job ends when the customer's engineers own the system. An FDE who stays for two years is no longer an FDE — they are an operations engineer, and they need to be reclassified or replaced.

The role is defined by what the FDE does *not* do as much as by what the FDE does. A senior engineer who does all five of the things above is not an FDE; they are a generalist, and the FDE playbook is not the playbook for generalists.

---

## Connecting FDE to the rest of this book

The connection is direct, and it is what the FDE chapter is for.

| FDE step | Book chapter | Why the FDE reads it |
| --- | --- | --- |
| Audit | [Discover](discover.md) | The 1-day pre-mortem is the FDE's first-week deliverable, accelerated. |
| Evals | [Pilot](pilot.md) | The 2–4 week shadow mode is the FDE's eval phase. The eval set is the deliverable. |
| Deployment | [Build](build.md) | The 4–8 week productionisation is the FDE's hand-off phase. The runbook is the deliverable. |
| Programme | [Scale](scale.md) | The 3–6 month rollout is the FDE's next engagement, and the FDE's playbook is what makes the second engagement cheaper than the first. |
| Local-LLM constraint | [Why AI Work Flow?](../why-ai-work-flow.md) | The data-residency argument is what makes the FDE *mandatory* in local-LLM enterprises, not optional. |
| Deployment patterns | [Architecture: layers](../architecture/layers.md) | The 5-layer model is what the FDE integrates against. The FDE's job is to make the customer's workflow land in the right layer. |
| Operational contracts | [Reference: Python API](../reference/python-api.md) | The typed contracts are what the FDE hands over. `ChatRequest`, `ChatResult`, `ModuleMeta`, the audit log — the FDE's deliverables are the things in the Reference section. |

The FDE chapter is the chapter that ties the book to the rest of the AI industry. The four phases in the [adoption overview](index.md) are the FDE's playbook, the [reference section](../reference/index.md) is the FDE's toolbox, the [case studies](../case-studies/index.md) are the FDE's portfolio, and the [architecture pages](../architecture/index.md) are the FDE's mental model. The FDE chapter is what makes the book legible to the rest of the industry, because "FDE" is the word the rest of the industry uses.

---

## See also

- [Adoption: overview](index.md) — the four phases this chapter re-frames
- [Why AI Work Flow?](../why-ai-work-flow.md) — the data-residency argument that makes the FDE mandatory
- [Case studies: index](../case-studies/index.md) — the three worked FDE engagements
- [Reference: Python API](../reference/python-api.md) — the typed contracts the FDE hands over
- [Architecture: layers](../architecture/layers.md) — the 5-layer model the FDE integrates against
- [ROADMAP](../ROADMAP.md) — the FDE chapter is the A9 deliverable, per the 2026-06-17 decision-log row
