# স্পেসিফিকেশন থেকে কোড - সহজ ভাষায় ক্লাস ডেমো

আমরা অনেক সময় ভাবি, সফটওয়্যার বানানো মানেই আগে কোড লিখতে বসা। আসলে ব্যাপারটা সবসময় এমন না। ভালো সফটওয়্যার শুরু হয় ভালো বোঝাপড়া থেকে। মানুষ কী চায়, সিস্টেম কী করবে, কোন অবস্থায় কী রেজাল্ট দেখাবে - এগুলো আগে পরিষ্কার না হলে কোড লিখে লাভ নেই। কোড তখন শুধু কিছু লাইন হয়। কাজের জিনিস হয় না।

স্পেসিফিকেশন মানে হলো সিস্টেমের কাজটা সহজ ভাষায় লিখে ফেলা। যেন একজন মানুষ পড়ে বুঝতে পারে, আর একজন ডেভেলপার সেটা দেখে কোড বানাতে পারে। ধরুন, আপনি কাউকে বললেন, "একটা গ্রেড সিস্টেম বানাও।" এটা খুব অস্পষ্ট কথা। কিন্তু যদি বলেন, "স্টুডেন্টের নাম আর মার্ক ইনপুট নেবে। মার্ক ৪০ বা তার বেশি হলে পাস দেখাবে। ৪০ এর কম হলে ফেল দেখাবে। মার্ক ০ থেকে ১০০ এর বাইরে হলে এরর দেখাবে।" এবার কথাটা পরিষ্কার হলো। এখন কোড লেখা অনেক সহজ।

এই জায়গাতেই "Specifications to Code" এর সৌন্দর্য। আমরা কোড লিখছি না, আগে আমরা আচরণ লিখছি। সিস্টেমের বিহেভিয়ার লিখছি। একটা মানুষ যেমন দোকানে গিয়ে বলে, "ভাই, এই কাজটা এমনভাবে করে দিন", ঠিক তেমন। শুধু পার্থক্য হলো, এখানে কথাগুলো একটু সাজানো থাকে। ইনপুট কী, রুল কী, আউটপুট কী, আর ভুল হলে কী হবে - এগুলো পরিষ্কার থাকে।

কর্পোরেট অফিসে প্রতিদিন অনেক ছোট ছোট প্রসেস চলে। এগুলো দেখতে ছোট, কিন্তু কোম্পানির সময় বাঁচাতে পারে অনেক। যেমন লিভ অ্যাপ্রুভাল সিস্টেম, এক্সপেন্স ক্লেইম সিস্টেম, আইটি হেল্পডেস্ক টিকেট, লিড অ্যাসাইনমেন্ট, ইনভেন্টরি অ্যালার্ট, ইনভয়েস অ্যাপ্রুভাল, মিটিং রুম বুকিং, নতুন এমপ্লয়ি অনবোর্ডিং। এগুলো বড় সফটওয়্যার না। কিন্তু এগুলোর ভেতরে আছে নিয়ম, ইনপুট, ডিসিশন আর আউটপুট। তাই এগুলো ক্লাসে শেখানোর জন্য খুব ভালো উদাহরণ।

কর্পোরেট এনভায়রনমেন্টে এই স্কিলের দাম অনেক। কারণ অফিসে সব সমস্যা কোড দিয়ে শুরু হয় না। বেশিরভাগ সমস্যা শুরু হয় অস্পষ্ট প্রসেস দিয়ে। কে অ্যাপ্রুভ করবে, কখন করবে, কোন ডাটা লাগবে, ভুল হলে কে জানবে - এগুলো পরিষ্কার না থাকলে সফটওয়্যার বানিয়েও ঝামেলা থাকে। তাই ভালো স্পেসিফিকেশন শুধু ডেভেলপারের কাজ না। বিজনেস টিম, অপারেশনস টিম, এইচআর, ফাইন্যান্স, সেলস - সবার জন্য দরকার।

এখন ক্লাসে শেখানোর জন্য একটা সহজ ফর্মুলা ব্যবহার করা যায়। প্রথমে লিখুন, সিস্টেমের নাম কী। তারপর লিখুন, এই সিস্টেম কেন দরকার। এরপর লিখুন, সিস্টেম কী কী ইনপুট নেবে। তারপর লিখুন, সিস্টেমের রুলগুলো কী। এরপর লিখুন, সিস্টেম কী আউটপুট দেবে। শেষে লিখুন, কোন কোন ভুল বা আনএক্সপেক্টেড ঘটনা ঘটতে পারে। এই ছয়টা জিনিস লিখতে পারলে একটা ভালো স্পেসিফিকেশন দাঁড়িয়ে যায়।

টেমপ্লেটটা ইংরেজিতে এমন হতে পারে। ক্লাসে এটা বোর্ডে লিখে দিলেই ছাত্ররা খুব সহজে নিজেদের উদাহরণ সাজাতে পারবে।

```text
System Name:

Purpose:
This system helps users to...

Inputs:
-

Rules:
-

Outputs:
-

Errors or special cases:
-
```

এখন সবচেয়ে সহজ এবং শক্তিশালী ডেমো হিসেবে "Office Leave Approval System" দেখা যাক। এটা ছাত্রদের জন্য ভালো, কারণ ছুটি নেওয়ার ব্যাপারটা সবাই বোঝে। অফিসে একজন এমপ্লয়ি ছুটির জন্য রিকোয়েস্ট দেবে। সিস্টেম দেখবে তার হাতে লিভ ব্যালেন্স আছে কি না। ব্যালেন্স থাকলে রিকোয়েস্ট ম্যানেজারের কাছে যাবে। ব্যালেন্স না থাকলে সিস্টেম কারণ দেখাবে। এখানে কোডের আগে গল্পটা বুঝতে হবে। গল্পটা পরিষ্কার হলেই স্পেসিফিকেশন দাঁড়াবে।

```text
System Name:
Office Leave Approval System

Purpose:
This system helps employees submit leave requests and shows the correct approval status.

Inputs:
- Employee name
- Leave balance
- Requested leave days
- Start date
- End date

Rules:
- If start date is after end date, show an error.
- If requested leave days are greater than leave balance, reject the request.
- If requested leave days are within leave balance, send the request for manager approval.

Outputs:
- Employee name
- Leave request status
- Rejection reason if rejected

Errors or special cases:
- Invalid date
- Not enough leave balance
```

এই স্পেসিফিকেশন থেকে আমরা স্যুডো কোড লিখতে পারি। দেখুন, কোডের মতো লাগছে, কিন্তু এখনো এটা মানুষের ভাষার কাছাকাছি।

```text
Take employee name
Take leave balance
Take requested leave days
Take start date
Take end date

If start date is after end date:
    Show "Invalid Date"
Else if requested leave days are greater than leave balance:
    Show "Rejected: Not enough leave balance"
Else:
    Show "Pending Manager Approval"
```

এবার দ্বিতীয় কর্পোরেট উদাহরণ হলো "Expense Claim Approval System।" অফিসে কেউ ক্লায়েন্ট মিটিংয়ে গেলে যাতায়াত, খাবার বা অন্য খরচ হতে পারে। পরে সে টাকা ফেরত চায়। এই প্রসেসটা হাতে করলে অনেক সময় রিসিপ্ট মিস হয়, অ্যাপ্রুভার ভুল হয়, বা ফাইন্যান্স টিম বুঝতে পারে না কোন ক্লেইম আগে দেখবে। তাই ছোট একটা সিস্টেম বানানো যায়।

```text
System Name:
Expense Claim Approval System

Purpose:
This system helps employees submit office expense claims and sends them to the right approver.

Inputs:
- Employee name
- Department
- Expense type
- Claim amount
- Expense date
- Receipt attached or not

Rules:
- If receipt is not attached, the claim should be rejected.
- If claim amount is less than or equal to 5000, send it to the Team Lead.
- If claim amount is greater than 5000, send it to the Finance Manager.
- If claim amount is less than or equal to 0, show an error.

Outputs:
- Claim status
- Approver name or role
- Rejection reason if rejected

Errors or special cases:
- Missing receipt
- Invalid claim amount
```

এই স্পেসিফিকেশন থেকে স্যুডো কোড খুব সহজে দাঁড়ায়।

```text
Take employee name
Take department
Take expense type
Take claim amount
Take expense date
Check if receipt is attached

If claim amount is less than or equal to 0:
    Show "Invalid claim amount"
Else if receipt is not attached:
    Show "Rejected: Receipt required"
Else if claim amount is less than or equal to 5000:
    Show "Pending Team Lead Approval"
Else:
    Show "Pending Finance Manager Approval"
```

তৃতীয় উদাহরণ হলো "IT Helpdesk Ticket Routing System।" কর্পোরেট অফিসে এই সিস্টেম খুব দরকারি। কারো ইন্টারনেট কাজ করছে না, কারো ল্যাপটপ স্লো, কারো ইমেইল ওপেন হচ্ছে না। সবাই যদি আলাদা আলাদা ফোন করে, কাজ হারিয়ে যায়। কিন্তু টিকেট সিস্টেম থাকলে সমস্যা জমা হয়, টিম ঠিক হয়, প্রায়োরিটি সেট হয়।

```text
System Name:
IT Helpdesk Ticket Routing System

Purpose:
This system helps employees report IT problems and routes each ticket to the correct support team.

Inputs:
- Employee name
- Department
- Problem category
- Problem description
- Urgency level

Rules:
- If problem category is "Network", assign the ticket to the Network Team.
- If problem category is "Laptop", assign the ticket to the IT Support Team.
- If problem category is "Email", assign the ticket to the Messaging Team.
- If urgency level is "Urgent", set priority to High.
- If problem description is empty, show an error.

Outputs:
- Ticket number
- Assigned team
- Priority
- Ticket status

Errors or special cases:
- Missing problem description
- Unknown problem category
```

এই স্পেসিফিকেশন থেকেও স্যুডো কোড বানানো যায় একদম সরাসরি।

```text
Take employee name
Take department
Take problem category
Take problem description
Take urgency level

If problem description is empty:
    Show "Error: Problem description required"
Else:
    Create ticket number

    If problem category is "Network":
        Assign ticket to "Network Team"
    Else if problem category is "Laptop":
        Assign ticket to "IT Support Team"
    Else if problem category is "Email":
        Assign ticket to "Messaging Team"
    Else:
        Assign ticket to "Manual Review"

    If urgency level is "Urgent":
        Set priority to "High"
    Else:
        Set priority to "Normal"

    Show ticket number
    Show assigned team
    Show priority
    Show "Open"
```

এখন দেখুন, কোড লিখতে আর ভয় লাগার কথা না। কারণ আমরা কোডের আগে চিন্তাটা ঠিক করেছি। কোড শুধু সেই চিন্তাকে মেশিনের ভাষায় বলা। অনেকটা রান্নার রেসিপির মতো। রেসিপি পরিষ্কার হলে রান্না করা সহজ। রেসিপি যদি হয় "ভালো কিছু রান্না করো", তাহলে বিপদ। কিন্তু যদি লেখা থাকে, "দুই কাপ চাল, এক কাপ ডাল, লবণ, পানি, ২০ মিনিট রান্না" - তাহলে মানুষও পারে, মেশিনও পারে।

ছাত্রদের জন্য সবচেয়ে বড় লেসন হলো, স্পেসিফিকেশন মানে কঠিন ইংরেজি ডকুমেন্ট না। এটা পরিষ্কার চিন্তার লেখা। ভালো স্পেসিফিকেশন লিখতে হলে আগে নিজেকে প্রশ্ন করতে হয়। ইউজার কে? সে কী দেবে? সিস্টেম কী করবে? কোন নিয়মে করবে? ভুল হলে কী বলবে? কাজ শেষ হলে কী দেখাবে? এই প্রশ্নগুলোর উত্তরই পরে কোড হয়ে যায়।

ক্লাসে আপনি একটা ছোট এক্সারসাইজ দিতে পারেন। ছাত্রদের বলুন, "একটা অফিস ক্যান্টিন অর্ডার সিস্টেমের স্পেসিফিকেশন লিখো।" তারা লিখবে, ইউজার খাবার সিলেক্ট করবে, পরিমাণ দেবে, পেমেন্ট করবে, অর্ডার কনফার্ম হবে। তারপর রুল যোগ করবে। যদি খাবার শেষ হয়, অর্ডার নেওয়া যাবে না। যদি পেমেন্ট না হয়, কনফার্ম হবে না। যদি অর্ডার ১০টার আগে হয়, লাঞ্চ টাইমে ডেলিভারি হবে। দেখবেন, তারা কোড না লিখেও সফটওয়্যার ডিজাইন করতে শুরু করেছে।

আরও কিছু ছোট কর্পোরেট সিস্টেমের কথা বলা যায়, যেগুলো দিয়ে ছাত্ররা নিজেরা প্র্যাকটিস করতে পারে। সেলস টিমের জন্য লিড অ্যাসাইনমেন্ট সিস্টেম বানানো যায়। ওয়েবসাইটে কেউ ফর্ম পূরণ করলে তার এলাকা অনুযায়ী লিড ঢাকা বা চট্টগ্রাম সেলস টিমে যাবে। এলাকা খালি থাকলে সিস্টেম "Manual Review" করবে। এখানে ছাত্ররা বুঝবে, সিস্টেম শুধু ডাটা রাখে না। সিস্টেম সিদ্ধান্তও নেয়।

ইনভেন্টরি অ্যালার্ট সিস্টেমও ভালো প্র্যাকটিস। অফিসে রাউটার, কেবল, ল্যাপটপ চার্জার বা স্টেশনারি রাখা আছে। কোনো আইটেমের সংখ্যা ১০ এর নিচে নামলে সিস্টেম পারচেজ টিমকে অ্যালার্ট দেবে। সংখ্যা ০ হলে দেখাবে "Out of Stock।" সংখ্যা ১০ বা তার বেশি হলে দেখাবে "Available।" ছোট নিয়ম। কিন্তু এই ছোট নিয়ম ভুলে গেলে অফিসে কাজ আটকে যায়।

মিটিং রুম বুকিং সিস্টেম আরও সহজ। ইউজার রুম, তারিখ, শুরু সময় আর শেষ সময় দেবে। যদি ওই সময়ে রুম খালি থাকে, বুকিং কনফার্ম হবে। যদি আগে থেকেই বুক করা থাকে, সিস্টেম বলবে "Room Not Available।" যদি শেষ সময় শুরু সময়ের আগে হয়, সিস্টেম বলবে "Invalid Time।" এই উদাহরণে ছাত্ররা সহজে বুঝবে, সফটওয়্যার আসলে মানুষের দৈনন্দিন ঝামেলা কমায়।

নতুন এমপ্লয়ি অনবোর্ডিং সিস্টেম একটু বড় উদাহরণ, কিন্তু বোঝা সহজ। নতুন কেউ অফিসে জয়েন করলে তার ইমেইল অ্যাকাউন্ট লাগবে, আইডি কার্ড লাগবে, ল্যাপটপ লাগবে, টিমে অ্যাড করতে হবে। আগে এগুলো আলাদা আলাদা মেসেজে হয়। কেউ ভুলে যায়। কেউ দেরি করে। স্পেসিফিকেশন করলে বলা যায়, "নতুন এমপ্লয়ির তথ্য সাবমিট হলে এইচআর টিম, আইটি টিম আর অ্যাডমিন টিমের জন্য আলাদা টাস্ক তৈরি হবে।" এটাই অটোমেশন।

শেষ কথা খুব সহজ। সফটওয়্যার বানানোর আগে মানুষের কাজটা বুঝতে হবে। তারপর সেই কাজের নিয়ম লিখতে হবে। তারপর সেই নিয়মকে ছোট ছোট ধাপে ভাঙতে হবে। তারপর কোড আসবে। কোড তখন আর জাদু না। কোড তখন অনুবাদ। মানুষের ভাষা থেকে মেশিনের ভাষায় অনুবাদ।

যে ছাত্র আজ ভালো স্পেসিফিকেশন লিখতে শিখবে, সে কাল ভালো ডেভেলপার, ভালো প্রোডাক্ট ম্যানেজার, ভালো বিজনেস অ্যানালিস্ট, এমনকি ভালো টিম লিডও হতে পারবে। কারণ সে শুধু কোড দেখবে না। সে সমস্যাটা দেখবে। আর যে মানুষ সমস্যাটা পরিষ্কার দেখতে পারে, সমাধান তার কাছেই আগে আসে।

## ক্লাসে ব্যবহার করার মতো ছোট কর্পোরেট সিস্টেম আইডিয়া

লিভ অ্যাপ্রুভাল সিস্টেম - এমপ্লয়ি লিভ রিকোয়েস্ট দেবে, সিস্টেম ব্যালেন্স চেক করবে, তারপর ম্যানেজারের কাছে পাঠাবে।

এক্সপেন্স ক্লেইম সিস্টেম - এমপ্লয়ি খরচ সাবমিট করবে, রিসিপ্ট আছে কি না দেখা হবে, টাকার পরিমাণ অনুযায়ী অ্যাপ্রুভার ঠিক হবে।

আইটি হেল্পডেস্ক টিকেট - ইউজার সমস্যা জানাবে, ক্যাটাগরি অনুযায়ী টিমে যাবে, জরুরি হলে প্রায়োরিটি High হবে।

লিড অ্যাসাইনমেন্ট সিস্টেম - নতুন কাস্টমার লিড এলাকা বা পণ্যের ধরন অনুযায়ী সেলস টিমে যাবে।

ইনভেন্টরি অ্যালার্ট সিস্টেম - কোনো আইটেমের স্টক কমে গেলে পারচেজ টিমকে নোটিফিকেশন যাবে।

ইনভয়েস অ্যাপ্রুভাল সিস্টেম - ইনভয়েস সাবমিট হলে টাকার পরিমাণ অনুযায়ী টিম লিড, ম্যানেজার বা ফাইন্যান্স হেডের কাছে যাবে।

মিটিং রুম বুকিং সিস্টেম - রুম খালি থাকলে বুকিং কনফার্ম হবে, না থাকলে অন্য সময় সাজেস্ট করবে।

নতুন এমপ্লয়ি অনবোর্ডিং সিস্টেম - নতুন এমপ্লয়ি জয়েন করলে এইচআর, আইটি আর অ্যাডমিন টিমের জন্য টাস্ক তৈরি হবে।

কাস্টমার কমপ্লেইন ট্র্যাকিং - কাস্টমার অভিযোগ জমা দিলে সিস্টেম টিকেট নম্বর দেবে, স্ট্যাটাস দেখাবে, সময় পার হলে এসকেলেশন করবে।

অফিস ক্যান্টিন অর্ডার সিস্টেম - এমপ্লয়ি খাবার অর্ডার করবে, স্টক থাকলে অর্ডার কনফার্ম হবে, না থাকলে "Not Available" দেখাবে।

## রেফারেন্স আইডিয়া

এই লেখার কর্পোরেট উদাহরণগুলো বাস্তব অফিস অটোমেশন ও ওয়ার্কফ্লো ধারণা থেকে সাজানো হয়েছে। যেমন লিড রাউটিং, ইনভয়েস নোটিফিকেশন, পারচেজ অর্ডার অ্যাপ্রুভাল, এমপ্লয়ি অনবোর্ডিং, কন্ট্রাক্ট অ্যালার্ট, হেল্পডেস্ক টিকেটিং, ইনভেন্টরি রি-অর্ডারিং এবং সিআরএম আপডেটের মতো কাজ বিভিন্ন অটোমেশন গাইডে দেখা যায়।

- [Workflow Automation Examples - Automation Showroom](https://www.automationshowroom.com/en/blog/workflow-automation-examples)
- [Enterprise Workflow Examples - Kissflow](https://kissflow.com/workflow/workflow-examples/)
- [Power Automate Flow Examples - DigitizeFlow](https://www.digitizeflow.com/technologies/power-automate)
- [Automation Blueprint Examples - ABM Lib](https://abmlib.dev/docs/examples)
- [Specification by Example - Wikipedia](https://en.wikipedia.org/wiki/Specification_by_example)
