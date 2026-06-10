# Citizen Developer Guide
*Building AI solutions without deep technical expertise*
---

## Who is a Citizen Developer?

A **citizen developer** is a business professional who creates applications without formal programming training. With AI tools, you can now build intelligent solutions by:

- **Configuring** existing AI services
- **Connecting** data sources with AI models
- **Customizing** behavior through natural language
- **Chaining** AI capabilities for complex workflows

## Why This Matters Now

For most of the software era, building an application meant writing code. That excluded everyone except trained engineers. AI tools - LLMs, low-code platforms, and pre-trained models - have changed the economics: a domain expert with a clear problem can now assemble a working solution in days, not months.

This does not replace engineers. It changes what engineers do. Engineers become the people who build the platforms, guardrails, and shared components that citizen developers compose. Citizen developers become the people closest to the problem, turning their domain knowledge into working tools.

## The Four Habits of an Effective Citizen Developer

1. **Start with the decision, not the data.** Name the decision you want help with ("should this support ticket be escalated?"). If you cannot name the decision, you do not have a problem yet.
2. **Write examples before code.** Ten real examples of the decision - with the right answer - is enough to start tuning any modern LLM. Code comes after you have examples.
3. **Trust, but verify.** Treat the AI's first answer as a draft. Build a small check (a second prompt, a rules engine, a human review) before you ship.
4. **Document the failure modes.** Write down the cases where the AI was wrong, and what to do then. This is your safety net, and it becomes training data for the next iteration.

## A Day in the Life

A typical citizen developer workflow looks like this:

1. **Find a problem.** A team spends 30 minutes a day triaging the same type of customer email. That is the problem.
2. **Gather ten examples.** Pull last week's emails and the answers. If you do not have ten, you do not have enough to validate anything.
3. **Build a prompt.** A few paragraphs of instructions, plus the ten examples, sent to an LLM. Test it on three more you held out.
4. **Wire it in.** Hook the prompt to your email inbox or a shared inbox dashboard. No server, no deploy - just a workflow step.
5. **Measure.** Track how often the LLM's draft is accepted unchanged. Below 70%, the prompt needs work. Above 90%, you have a tool.

## When to Call a Developer

Citizen developer tools hit a wall when:

- The data lives in a system with no API or no clean export.
- The answer must be deterministic and audited (financial reporting, medical decisions, regulatory submissions).
- The model needs to be trained on your own data, not just prompted.
- The cost per call is large enough to need a proper budget owner.

In any of these cases, hand off to a developer - but bring your ten examples, your definition of "correct", and the failure-mode notes. That is the input the engineer needs to build something that works.

## What You Can Realistically Build

| You can build this alone | Bring a developer for this |
| --- | --- |
| Email triage and routing | Custom integrations to legacy systems |
| Internal Q&A chatbots from your docs | Production-grade model fine-tuning |
| Meeting summarisation | Real-time decision systems |
| Form-to-database workflows | Anything that touches money in motion |
| First-draft report generation | Anything with regulatory exposure |

## Related Documentation

- [AI Software Development Life Cycle](sdlc.md) - The framework you are operating inside
- [Why Reasoning Matters](reasoning.md) - How to get explanations, not just answers
- [Getting Started](../getting-started/index.md) - The minimal setup to start experimenting
