# ডেমো — আজকেই যা বানাতে পারো

এই পেজে AI Work Flow for Business মডিউলের **কংক্রিট, চালানোযোগ্য উদাহরণ** দেখাচ্ছি। প্রতিটা উদাহরণ **LM Studio-তে লোকালি চলা Qwen 2.5 1.5B** ব্যবহার করে, স্ট্রাকচার্ড আউটপুট দেয়, আর তোমার আগে থেকে থাকা সিস্টেমের সাথে ইন্টিগ্রেট হয়।

> সব উদাহরণ ইলাস্ট্রেটিভ। আসল ইমপ্লিমেন্টেশন আছে সংশ্লিষ্ট মডিউল পেজে।

---

## ১. ISP কমপ্লেইন ক্লাসিফিকেশন

**ইনপুট** — সাপোর্ট ইনবক্স থেকে আসা একটা র কমপ্লেইন:

```
Subject: Internet slow since this morning
Body: I have been a customer for 3 years. From 8am today
my download is unusable. I restarted the router twice. I
have an important video call at 3pm. Please help.
```

**আউটপুট** — হেল্পডেস্ক সিস্টেম অ্যাক্ট করতে পারে এমন স্ট্রাকচার্ড JSON:

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

হেল্পডেস্ক সিস্টেম এই JSON নিয়ে NOC L2-এর অধীনে একটা টিকিট খোলে, আর ঐ কাস্টমারের OLT পোর্ট চেক করার ফ্ল্যাগ যোগ করে। মডেল কিছু "সিদ্ধান্ত" নেয়নি — এটা ক্লাসিফাই করেছে।

**আন্ডারলাইং মডিউল:** [ISP Classifier → LLM Classifier](../isp-classifier/llm-classifier.md)

## ২. টিকিটে SLA ব্রিচ রিস্ক

**ইনপুট** — ৪ ঘণ্টা ধরে ওপেন থাকা P2 প্রায়োরিটির টিকিট, কাস্টমার কী অ্যাকাউন্ট:

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

**আউটপুট** — রিস্ক অ্যাসেসমেন্ট ও সুপারিশকৃত ERP অ্যাকশন:

```json
{
  "breach_risk": "high",
  "estimated_resolution_hours": 3.5,
  "recommended_action": "escalate_to_tier3",
  "approval_required": "manager",
  "reasoning": "P2 with 2h buffer, key account with 2 prior breaches in 90d. Pattern matches 4 of 5 historical breaches."
}
```

মডেল স্ট্রাকচার্ড ইনপুট পড়ে স্ট্রাকচার্ড সুপারিশ দেয়। একজন মানুষ অ্যাপ্রুভ করে; ERP সিস্টেম সেই অনুযায়ী রাউট করে।

**আন্ডারলাইং মডিউল:** [SLA System → SLA Classifier](../sla-system/classifier.md)

## ৩. সাইটেশনসহ রানবুক Q&A

**ইনপুট** — ইনসিডেন্টের সময় অপারেটরের প্রশ্ন:

```
The BGP session to AS-64512 is flapping. What's our
standard mitigation procedure?
```

**আউটপুট** — টিমের আসল রানবুক থেকে সাইটেশনসহ উত্তর:

```json
{
  "answer": "Apply the BGP dampening policy 'flap-dampen-50' to the neighbor statement, then raise a P3 incident for tier-2 review within 30 minutes if the flap continues.",
  "source_document": "runbooks/bgp-stability.md",
  "source_section": "§4.2 Flap mitigation",
  "confidence": 0.92
}
```

মডেল কিছু "জানে" না — এটা রিলেভেন্ট রানবুক সেকশন রিট্রিভ করে উত্তর রিফর্মুলেট করে। রেগুলেটেড কনটেক্সটে কাজে লাগে কারণ সাইটেশন আছে।

**আন্ডারলাইং মডিউল:** [Qwen + RAG → Qwen RAG Demo](../qwen-rag/qwen-rag-demo.md)

## ৪. শিফট হ্যান্ডওভার সামারি

**ইনপুট** — আগের শিফটের ৩ ঘণ্টার ইভেন্ট লগ:

```
02:14 — OLT-3 port 7 CRC errors elevated, replaced SFP
02:31 — Customer INC-4702 escalated to L3
03:05 — BGP dampening applied to AS-64512
03:42 — Planned maintenance window started for ring-2
04:00 — Ring-2 maintenance completed without incident
04:15 — Customer called re: INC-4810, scheduled for 09:00
...
```

**আউটপুট** — আসছে শিফটের জন্য এক-প্যারাগ্রাফ হ্যান্ডওভার:

```json
{
  "summary": "Quiet night. One OLT-3 SFP replacement at 02:14 with no further errors. BGP flap on AS-64512 mitigated at 03:05. One planned maintenance window (ring-2) completed cleanly. One customer escalation (INC-4810) carried over to morning shift with a 09:00 commitment.",
  "open_items": ["INC-4702 (L3)", "INC-4810 (09:00 callback)"],
  "watch_items": ["OLT-3 port 7 — monitor for CRC errors"],
  "shift_risk": "low"
}
```

এটা ২০ মিনিটের মৌখিক হ্যান্ডওভারকে ৩০ সেকেন্ডের পড়ায় বদলে দেয়।

**আন্ডারলাইং মডিউল:** *শীঘ্রই আসছে — [case studies](../case-studies/index.md) প্রকাশিত হলে দেখো।*

## ৫. এমপ্লয়ি পলিসি প্রশ্ন

**ইনপুট** — টিম চ্যাটে একটা HR প্রশ্ন:

```
I need to take 3 days off next week for my brother's
wedding. How much advance notice do I need to give?
```

**আউটপুট** — আসল এমপ্লয়ি হ্যান্ডবুক থেকে উত্তর:

```json
{
  "answer": "For 3 consecutive days off, the handbook requires 5 working days of advance notice and your reporting manager's approval. Submit the leave request in the HR system, then message your manager for approval.",
  "source_document": "handbook/leave-policy.md",
  "source_section": "§3.2 Annual Leave",
  "action_required": "submit_leave_request",
  "confidence": 0.95
}
```

রানবুক Q&A-র মতোই প্যাটার্ন — রিট্রিভাল-অগমেন্টেড উত্তর, সাইটেড।

**আন্ডারলাইং মডিউল:** [HR Assistant](../hr-assistant/index.md)

---

## এগুলোর সব কয়টাতে কী কমন

1. **স্ট্রাকচার্ড আউটপুট।** প্রতিটা উদাহরণ JSON দেয়। ডাউনস্ট্রিম সিস্টেম একটা সাধারণ প্রোগ্রাম, চ্যাট UI না।
2. **সংকীর্ণ স্কোপ।** প্রতিটা মডেলের একটাই কাজ। ক্লাসিফিকেশন, রাউটিং, রিট্রিভাল, সামারাইজেশন।
3. **লোকাল ইনফারেন্স।** ১.৫B প্যারামিটার। ল্যাপটপে চলে। কোনো ডেটা নেটওয়ার্কের বাইরে যায় না।
4. **পরিমাপযোগ্য।** প্রতিটা মডিউলে একটা সাকসেস মেট্রিক আছে যেটা আসল ডেটায় কম্পিউট করা যায়।

তোমার ওয়ার্কফ্লো যদি এই প্যাটার্নে ফিট করে — সংকীর্ণ, স্ট্রাকচার্ড, পরিমাপযোগ্য — তাহনে পরের পদক্ষেপ হলো [Pilot playbook](../adoption/pilot.md)।
