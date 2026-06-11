# If AI is so great, why isn't it working?

Source: https://www.varickagents.com/blog/if-ai-is-so-great-why-isn-t-it-working

---

If AI is so great, why isn't it working?

Companies are spending millions on AI, but nothing’s really changed. At Varick Agents, we’ve seen why most efforts fail, and what actually works.

by

Vas Moza

18 min read

In the last 12 months, I've had the opportunity to chat with over 100 C-Suite executives at the largest companies across America. The conversation usually goes as follows: they spent a millions trying to bring AI into their business, whether in the form of new software licenses that promise to take work off their plate, or straight to the model providers in token spend.

Leadership buzzes non-stop about "going AI-first", yet when asked point-blank what has changed in the day-to-day, the answer is some version of nothing. The AP team is still doing AP the same way, month end close is still 22 days, reps are still hitting quota at 24%, and the CRM still has the same 30% data decay that it had in 2022.

I want to talk about why that is, why the models are not the problem, and what I've seen that makes AI actually work. For context I run Varick Agents, we specialize in bringing AI to enterprise to do real work without forcing massive migrations off systems of record.

The models are good enough. Stop blaming the models.

First and foremost: the models are good enough. Stop blaming the models.

It's been a year and a half since GPT-o3, the first model where I could hand off a real task and not babysit the output too much. Then came Opus 4, GPT-5, and Gemini 3. Now we have Opus 4.7 and GPT 5.5. Pricing fell off a cliff, context windows expanded massively, and tool calling became much more accurate.

In the same window, harnesses became very robust and more scientific. Two years ago "harnesses" meant copy-pasting prompts off Twitter. Today it's recursive context engineering, eval pipelines, and tool stacks that genuinely stick. Anthropic wrote a canonical text on it (Building Effective Agents), and the punchline of that paper is "find the simplest solution possible, only increase complexity when needed." Most production agents are mostly code with one or two model calls in specific places. Boring but this is good, it works.

So why isn't it working inside enterprise?

MIT NANDA's GenAI Divide report, August 2025: 5% of integrated AI pilots are pulling millions in value. The other 95% have nothing to show for it. BCG, Deloitte, RAND, IBM, Gartner, McKinsey all ran their own studies with their own methodologies and they all converge on the same number. BCG: 4% have hit AI value at scale. Deloitte: 6% achieve AI ROI within a year. RAND: 80%+ of AI projects fail, twice the rate of normal IT projects. IBM: 75% of AI initiatives haven't delivered expected ROI. McKinsey: 78% of orgs report regular AI use, 80%+ report zero EBIT impact.

That number has been flat through GPT-3, GPT-4, GPT-5, Claude 2 through 4.7, Gemini 1 through 3. Every model generation, the enterprise failure rate is identical. Despite models improving, failure rates have not come down. It turns out the model is not the bottle-neck.

AI is working for one group: software engineers

AI is working for one group of people right now, at scale, because it's the group of people that rely the least on business logic. It's software engineers. The biggest winner from 18 months of AI improvement, by miles, has been engineers writing code in Cursor, Claude Code, Codex, etc. Some stats for you if for some reason you still don't believe in agentic engineering:

GitHub's 2024 study clocked Copilot users at 55% faster on real tasks. 1 hour 11 minutes vs 2 hours 41 minutes on the same work.

Anthropic ran an internal study in August 2025 across 132 engineers and 100,000 real Claude conversations. AI cuts developer task completion time by roughly 80%.

Sundar Pichai said at the start of 2026 that 75% of new code at Google is AI-generated and engineer-approved. That number was 30% in April 2025.

Yes, the tools still overpromise on the hard stuff: security review, complex distributed systems, novel debugging. Caveat very real and noted. But the bread-and-butter productivity gain on shipping code is the biggest jump engineering has had since the IDE.

Every other category vendors promised: flat metrics

Now look at every other category vendors have promised the same transformation.

Sales ops. Salesforce shipped Agentforce. Hubspot shipped Breeze. There are now ~100 "AI-native CRMs" in market all pitching some version of "the death of Salesforce." Has any of this moved actual sales numbers? Salesforce's own State of Sales report says reps spend 28% of their time selling. Pavilion 2024 says 24% of reps hit quota. Gartner says forecast accuracy is averaging 28%. Unchanged from 2022. The vendors have collectively raised billions for this and the metrics are flat.

Finance. Every accounting platform shipped some version of "AI for AP/AR/variance." Every "AI-native ERP" pitches close-cycle compression. The average finance team's close cycle has barely moved.

Marketing. Dozens of AI content tools. Marketers will tell you they save an hour a week. The marketing org's contribution to pipeline has not changed. If you made the unfortunate error of using AI-generated image/video for your marketing, you very likely got obliterated on social media.

Operations. Every workflow tool wrapped an LLM around its existing product. The ops team is doing the same job it was doing in 2023, and is arguably more bogged down than ever trying to wrangle AI products to fit their very unique business cases at the company.

Why AI works for engineers and not anyone else

So why does AI work for engineers and not for any of these? What's different about engineers? As a former software engineer, engineering work has four properties that basically no other enterprise function has. Yes there are nuances but these are directionally correct, please relax in the comments.

It's bounded. A function takes inputs and returns outputs. The scope of "fix this bug" lives inside a file or a module. The dependencies are explicit and importable.

It's checkable. Compilers tell you in milliseconds whether the code parses. Tests tell you whether it works. Type systems catch entire classes of error before runtime. Feedback loop: seconds.

The substrate is structured. Code lives in files, in version control, with a deterministic build pipeline underneath. Same input, same output. You can replay any state.

The output is verifiable. A pull request is a discrete artifact. A reviewer can look at the diff in 10 minutes and say yes or no.




When you point a capable AI at work that's bounded, checkable, structured, and verifiable, the leverage is enormous. Cursor and Claude Code are the proof. And if we're being honest, the biggest reason is that the AI labs (OpenAI, Anthropic, Cursor) poured every single ounce of resources they had into figuring out software engineering. If they can make their own engineers better, they can make the models better, faster, and achieve the ever-elusive "AGI", which will then make every other task on the planet (Finance, Sales, Operations, Marketing, etc) much easier downstream.

But contrast software engineering with a finance close.

Finance involves AP, AR, intercompany reconciliations, FX, accruals, journal entries, and exception handling that spans NetSuite, Concur, three banks, two ERPs from acquisitions, a custom intake form, and a Slack channel where the controller flags "weird stuff she sees." The "process" is documented in an SOP that doesn't match what actually happens. The output is "the close was clean," which takes two senior accountants two days to verify.

Sales ops involves a CRM, an outbound tool, a calendar, a notes platform, an enrichment vendor, an attribution tool, and a Slack channel where the AE is asking the CRO whether to discount this deal. None of those systems share state cleanly. The process for qualifying a lead is different across reps, even on the same team.

This is what every ops function looks like in every company Varick has ever audited. None of it is bounded, checkable, structured, or verifiable the way code is. And trying to wrangle generic AI to these functions that are incredibly specific to your company and its processes is a fools errand.

Pointing an LLM at this work gives you negative ROI. The operator was doing the work in 30 minutes. Now they're doing the work in 30 minutes plus another 30 minutes correcting the AI's mistakes. Most if not every vendors' "AI for [department]" has the same arc. A nice flashy demo showing how great it works for startups, then a big series A, then quietly killed after it fails to work for enterprise.

The four failure modes I see every time

I've spent the last 18 months deploying AI agents inside enterprise teams across finance, sales, ops, engineering, and marketing, at companies doing $500M to $5B+

 in revenue. Every failure I've seen, including the ones we caught early, traces back to the same four things.

1. They skip the audit

The single biggest predictor that an AI pilot is going to fail: the team starts building before they understand the workflow they're supposedly automating. Every company is so unique that simply duplicating and agent that worked for one company onto another is not going to work.

Most commonly, companies look at the most obvious workflow, scope it from the SOP, build for that, ship it, demo it to the CFO, deploy. And then it collides with the actual workflow, which is different from the documented one in 50 places.

The actual workflow always includes things the SOP doesn't mention. The "I always check this spreadsheet first" step. The "I email Sarah directly because the system notification doesn't work" step. The 17 exception types the team handles every month. The unwritten rule that anything over $5M loops in the controller, even though the threshold says .

When you build for the documented process, you automate 70% of the volume and break on 30%. The 30% that breaks creates more work for the team than they had before, because now they have to fix the AI's mistakes on top of doing the work.

The audit is the part where you sit with the people doing the work, watch them do it, and map what actually happens. We do this for at least four weeks if not longer before touching a model. It's the medicine that no one wants to take but you have to to prep for surgery, which is what AI implementations are.

We call the gap between SOP and actual workflow the conformance gap. In typical engagements we see 30%+. In heavy exception-driven workflows like AP exception handling or supply chain disruption response, we routinely see over 70%.

The reason most AI pilots skip the audit is that it doesn't feel like AI, it instead feels like operational consulting. Most AI vendors won't do it because it's not their core skill. Most internal teams don't do it because they "already know the workflow." They don't. Every time a client has come to us saying "we know the problem and we want you to build X", we end up performing an audit anyways and by the end of it they've been convinced otherwise.

2. They throw everything at the LLMs and expect it to work

The second biggest predictor: using the LLM for parts of the workflow that don't need an LLM.

LLMs are seductive. Once you have one, every problem looks LLM-shaped. Need to extract a value from a document? Ask the model. Compare two values? Ask the model. Route a result based on a number? Ask the model. The team builds an architecture that's 90% LLM calls and 10% code. The system is slow and incredibly expensive, while simultaneously hallucinating 10% of the time, which is fine for a chat interface and unacceptable for AP automation. The CFO kills it.

Production systems that actually work look almost boring. They're 85% code and 15% LLM. The LLM goes where judgment lives: pulling structured data out of an unstructured invoice, classifying an exception into one of 31 known patterns, drafting an explanation for a human reviewer. The rest is database queries, comparisons, deterministic logic, branch routing.

This compounds with the audit problem. Teams that didn't audit don't know which parts of the work are pattern-matchable and which need real judgment. So they default to the LLM for everything and ship something that breaks.

3. Agent sprawl

Arguably the most silent but deadly problem in the AI implementation space: this one only shows up after month 6. By the time you notice, you've already spent the budget and the time.

Sprawl is a person-level problem before it's a department-level problem. Every individual employee with AI access turns into their own agent factory.

For example, Sarah in AP builds her own agent in Lovable to classify invoices. The controller spins up a separate one to reconcile intercompany transfers. The FP&A lead vibe-codes a workflow to pull variance reports. The CRO's chief of staff has a personal agent that summarizes Salesforce notes before every QBR. The marketing manager built a content agent. The recruiting coordinator built a candidate-screening agent. So on and so forth.

If you were to multiply that across a 200-person operations org you'd end up with 50 to 100+ separate AI workflows running across the business, each one built by a different person, each one with its own quirks, each one solving a similar 3 or 4 problems in 7 different ways.

Even in the best case scenario where every single one of these agents actually works, you end up with 100 disconnected systems, each with its own ingestion pipeline, its own approval logic, its own logging, its own model config, and its own prompts. There is no common agent spine, no shared memory, and no shared knowledge of how the company actually runs. Marketing's content agent has zero awareness that customer support is currently dealing with 50 tickets about the exact thing it's writing copy about. Finance's invoice agent has no idea that procurement just blacklisted that vendor last week.

Finally, the inevitable happens: a model gets deprecated, or an API endpoint changes, or an employee leaves, or a vendor pushes a breaking change. Now you have 50 of those 100 agents breaking in production, no one is on call for any of them (because building can be done by vibe-coders but fixing cannot), and the people who originally built them are either too busy or no longer at the company. The CTO's engineering team is suddenly spending half its time playing janitor for AI workflows nobody actually owns, and no one even knows what is worth fixing vs killing off.

The downstream cost is astronomical. Engineering maintainability is a literal nightmare, since every agent is its own bespoke project with its own bugs and its own deploy story. Security is even worse, with every personal agent carrying its own API keys, its own data access, and its own potential for data exfiltration. Compliance and audit logging are basically nonexistent across the fleet, and don't even ask about governance. A real example we've all heard of: the legal team finds out three months later that someone's personal marketing agent has been blasting customer data into a third-party LLM API that wasn't on the approved vendor list. The AI that was meant to bring you 'untold ROI' is now costing you 10s of millions.

The fix has to be architectural and it has to be planned out from day one. You need a single orchestration layer that sits on top of the existing software stack, with shared infrastructure for ingestion, approvals, audit logging, model routing, and knowledge. Every new use case from any person or any process lands as configuration on top of that single platform, and no more bespoke vibe-coded side projects that nobody else in the company even knows exist. Ask your engineers how important this is, if you dont' believe me.

Once you actually have the platform, the economics compound dramatically. The first agent on the platform takes 12 weeks but the next takes 9 and the third takes 4. Without the platform, every single agent costs roughly the same to build, and the integration debt eventually consumes the entire AI budget.

This is the part most CTOs underestimate, and it's also the part that most "AI vendors" can't help you with at all. They're selling you one SKU, and that SKU has zero awareness of the other 7 you're already running, let alone the 80 personal agents your team built on weekends.

4. They treat AI as a side-project instead of infrastructure

The fourth failure mode is the slowest, the hardest for boards to spot, and quietly the most expensive over time.

Most companies budget AI initiatives like any other software project: plan, build, ship, declare victory, move on. That logic works for traditional software because once you build it, it stays built. AI is the opposite. Every quarter, something underneath you shifts: for example, a new release is dramatically better at your specific workload, or worse, the model you depended on quietly gets distilled and degrades. Anthropic alone has retired roughly 9 models in 18 months, OpenAI has retired even more, pricing changes on a quarterly basis, and rate limits get tightened with no warning.

A real example: in April 2026 Anthropic publicly acknowledged that engineering errors had degraded Claude Code performance for over a month, and that paid Max subscribers ($200/month) were hitting their quota in 19 minutes instead of the advertised 5 hours. They apologized publicly, but the production workloads built on those guarantees had already broken in the meantime.

The AI world moves faster than you can ever keep up with, and has no respect for your beautiful 6-month project plan. The deployments that actually pay off treat AI as continuously evolving infrastructure with a dedicated team that owns ongoing optimization. They monitor quality, swap models when better ones ship, retire agents that have stopped earning their keep, and renegotiate with vendors when something breaks underneath them. Most importantly, they avoid vendor lock in as much as humanly possible. If your entire AI initiative relies on Anthropic, you're stuck no matter what models get degrated, quantized, price-hiked, rate limited, etc.

What the 5% that ships and stays in production does consistently

Ok so what does the 5% that ships and stays in production do consistently that makes them so good:

1. They audit before they build. Four weeks (often longer) of mapping the actual workflow before anyone touches a model. The audit produces a digital twin: a live map of how work moves through the org, where the conformance gaps are, what's pattern-matchable, and what genuinely needs human judgment. The document itself matters less than the alignment it forces between the AI team and the operators. Make sure everyone is aligned on what the bottle-necks are, what the optimal state should be, and what is going to be done to fix it.

2. They decompose the work until most of it is deterministic. LLM goes ONLY where judgment is absolutely required, while plain code goes everywhere else. Most production systems we ship at Varick end up as 5-10 deterministic steps with maybe one or two model calls in specific places. Boring in production is genuinely the goal, and is how we've seen the most success.

3. They build a single orchestration layer that sits on top of the existing software stack. At Varick, we call this the single pane of glass. Finance, sales, ops, and engineering agents all live on the same platform, share the same context, and can talk to each other when they need to. Every new use case lands as configuration on top of the platform. In turn, sprawl is dead on arrival.

4. They stay model-agnostic. Abstractions get built at the task level, not at the model level. Each step routes to the best-fit model at any given moment. When OpenAI deprecates a model or Anthropic ships something dramatically better, the routing layer absorbs the change and your workflow keeps running without anyone noticing.

5. They treat the deployment as continuously evolving infrastructure. There is a real team responsible for ongoing tuning, retiring agents that aren't earning their keep anymore, and shipping improvements every quarter. The deployments that pay off over five years are the ones that get tuned every quarter if not every month, not the ones declared "done" at go-live. You have to get over this fact if you want to succeed with AI.

The labs are quietly conceding the same point

The labs are quietly conceding the same point Every model lab has now figured out that selling the model alone isn't enough. Selling the workflow runtime alone isn't enough either. You need the model, plus the runtime, plus a team that goes and embeds inside the enterprise and figures out what to actually build for it.

In other words, the labs are quietly conceding the entire thesis of this article. Process is the bottleneck. It's been the bottleneck the whole time, and unless something dramatic changes, it's going to stay the bottleneck.

The interesting question is who actually delivers the process work. Big consulting firms have the relationships and the headcount but historically ship strategy decks far more often than production agents. The labs have the best models and the best marketing but they don't embed inside your operations. The thing that genuinely works is some hybrid: production-grade AI combined with serious operational fieldwork, where someone audits first, decomposes the work, builds, runs, and tunes.

What I'd do if I had to start from scratch

If a CEO walked into our office tomorrow with $1M and 6 months and said "deploy AI in our enterprise, please don't fail", here's the path I would run.

Month 1: audit. Embed with the operators in whatever function we're targeting and watch them actually do the work end-to-end. Map the conformance gap between the SOP and reality. Figure out which workflows are pattern-matching and which ones need real human judgment. Produce a digital twin we can build against in month 2.

Month 2: architect the highest-leverage workflow. Decide what's pattern vs judgment, what's deterministic vs probabilistic, and pick the right model for each step (mostly small fast cheap models, with a frontier model only on the steps that genuinely need it). Define the human-in-the-loop touchpoints and the audit logs.

Months 2.5-4: build. Soft launch in production where humans approve every action, watch the agent learn from corrections, track accuracy daily, and fix what breaks before going wider.

Month 4-6: go live. Cut over with humans still in the loop on the high-stakes decisions, and watch the metrics that actually matter (cycle time, error rate, throughput) for at least two weeks before anyone declares a win.

Month 6: stand up the continuous-tuning function. The model market will change next quarter. Your workflow will change next quarter. The optimization team is what keeps the agent useful through both.

By the end of those 6 months you have one workflow live in production with real ROI in the books, a platform that can absorb the next workflow in 8 weeks instead of 24, and a tuning team that keeps the whole thing alive going forward.

The "models got smart" chapter is over

The "models got smart" chapter is already over. We had a glorious run but enterprise should no longer be holding out for AGI. The time to take action is now. And the next decade belongs to the companies that build the operational layer underneath the models, as opposed to the ones who spend another five years pouring frontier AI onto a mess of systems and wondering why nothing has actually changed.

This is exactly what we do at Varick. Taking on new clients doing over $2B in revenue starting June 1, 2026. Check us out at varickagents.com. Even better - we're hiring. If you're talented, come meet the team.
