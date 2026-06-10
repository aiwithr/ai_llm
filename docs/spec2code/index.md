# Specifications to Code - Class Demo in Plain Language

A lot of people think building software means sitting down and writing code. In practice, that is not how it works. Good software starts with a good shared understanding. What does the user want? What will the system do? What should it show in each situation? If those questions are not clear first, no amount of code helps. The code becomes a stack of lines, not a working product.

A specification is the system's job written in plain language. A person can read it and understand it; a developer can read it and build the code. Imagine you tell someone, "build me a grading system." That is far too vague. But if you say, "take a student's name and a mark. If the mark is 40 or above, show Pass. Below 40, show Fail. Outside 0 to 100, show Error." Now the conversation is clear, and writing the code is much easier.

This is where "Specifications to Code" shines. We are not writing code first; we are writing the behaviour first. The system behaviour, in plain words. A customer walking into a shop says, "do this job for me, like this." That is essentially what a spec is. The only difference is that the words are organised: inputs, rules, outputs, and what happens when something goes wrong.

Corporate offices run many small processes every day. They look small, but they save a lot of time. Examples: leave approval, expense claims, IT helpdesk tickets, lead assignment, inventory alerts, invoice approval, meeting room booking, new employee onboarding. None of these are big software. But each has rules, inputs, decisions, and outputs. So they are perfect teaching examples.

In a corporate environment this skill is highly valued. Most problems do not start with code; they start with an unclear process. Who approves? When? Which data? Who is notified when something fails? If those are not clear, even built software stays messy. Good specifications are not just a developer concern. Business, operations, HR, finance, sales - all of them benefit.

A simple recipe works in class. First, name the system. Second, explain why the system is needed. Third, list the inputs. Fourth, write the rules. Fifth, describe the outputs. Sixth, list the possible errors or unexpected cases. Once those six things are written, a good specification stands on its own.

The template in English might look like this. Writing it on the board lets students build their own examples very easily.

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

Now the easiest and most powerful demo is the "Office Leave Approval System". Students understand it, because everyone has taken leave. An employee submits a leave request. The system checks whether they have balance left. If yes, the request goes to the manager. If not, the system shows the reason. Here you understand the story before any code. Once the story is clear, the specification stands on its own.

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

From this specification we can write pseudo-code. It looks like code, but it is still close to human language.

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

The second corporate example is the "Expense Claim Approval System." When someone visits a client, they may spend on travel, food, or other items. Later they want to be reimbursed. Handled manually, receipts get lost, the wrong approver is picked, or the finance team cannot tell which claim to look at first. So a small system can be built.

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

From this specification, the pseudo-code is straightforward.

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

The third example is the "IT Helpdesk Ticket Routing System." This is very useful in a corporate office. Someone's internet stops working, someone's laptop is slow, someone's email will not open. If everyone calls separately, work gets lost. A ticket system collects the issue, picks the right team, and sets the priority.

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

From this specification the pseudo-code is just as direct.

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

Writing code should not feel scary now. We have thought the problem through before any code. Code is just translating that thinking into a machine language. It is a lot like a cooking recipe. If the recipe is clear, the cooking is easy. If the recipe says "make something nice", there is trouble. If the recipe says "two cups of rice, one cup of lentils, salt, water, 20 minutes" - both a person and a machine can do it.

The biggest lesson for students is: a specification is not a hard English document. It is clear thinking, written down. To write a good specification, ask the questions first. Who is the user? What will they give? What will the system do? Under which rules? What does it say when something fails? What does it show when the work is done? The answers to those questions later become code.

In class you can give a short exercise. Tell the students, "write the specification for an office canteen ordering system." They will write: the user picks a food, gives a quantity, pays, and the order is confirmed. Then they add rules. If a food item is out of stock, the order cannot be placed. If payment fails, the order is not confirmed. If the order is before 10 a.m., delivery happens at lunch. You will see they have started designing software without writing a single line of code.

There are also other small corporate systems students can practise with. Sales teams can use a lead assignment system: when someone fills the website form, the lead goes to the Dhaka or Chittagong sales team based on area. If the area is empty, the system marks it for manual review. Here students see that a system does not just store data, it also makes decisions.

An inventory alert system is also good practice. The office keeps routers, cables, laptop chargers, and stationery. If any item's count drops below 10, the system alerts the purchase team. If the count is 0, it shows "Out of Stock". If the count is 10 or above, it shows "Available". Small rules, but if you forget them, office work stalls.

A meeting room booking system is even simpler. The user gives a room, a date, a start time, and an end time. If the room is free at that time, the booking is confirmed. If something is already booked, the system says "Room Not Available". If the end time is before the start time, the system says "Invalid Time". In this example students see that software really does reduce everyday friction.

A new employee onboarding system is a slightly bigger example, but easy to follow. When someone new joins the office, they need an email account, an ID card, a laptop, and to be added to a team. Earlier this happened across separate messages. People forgot. People were late. Once specified, you can say, "when the new employee's data is submitted, separate tasks are created for the HR team, the IT team, and the admin team." That is automation.

The final word is simple. Before building software, understand the human job. Then write the rules of that job. Then break those rules into small steps. Then the code comes. Code is no longer magic. Code is translation. From human language to machine language.

A student who learns to write a good specification today can become a better developer, a better product manager, a better business analyst, even a better team lead tomorrow. They will not just see code. They will see the problem. And the person who can see the problem clearly will find the solution first.

## Small Corporate System Ideas for Class Use

Leave Approval System - an employee submits a leave request, the system checks the balance, then routes it to the manager.

Expense Claim System - an employee submits an expense, the system checks whether a receipt is attached, and the approver is picked based on the amount.

IT Helpdesk Ticket - the user reports an issue, it goes to the right team by category, and urgent issues get High priority.

Lead Assignment System - a new customer lead goes to a sales team by area or by product type.

Inventory Alert System - when an item's stock falls, the purchase team gets a notification.

Invoice Approval System - when an invoice is submitted, it goes to the team lead, manager, or finance head based on the amount.

Meeting Room Booking System - if a room is free, the booking is confirmed; if not, the system suggests another time.

New Employee Onboarding System - when a new employee joins, tasks are created for HR, IT, and admin teams.

Customer Complaint Tracking - when a customer submits a complaint, the system gives a ticket number, shows status, and escalates overdue cases.

Office Canteen Order System - an employee orders food, the order is confirmed if the item is in stock, otherwise the system shows "Not Available".

## Reference Ideas

The corporate examples in this piece draw on real office automation and workflow patterns such as lead routing, invoice notifications, purchase order approval, employee onboarding, contract alerts, helpdesk ticketing, inventory re-ordering, and CRM updates.

- [Workflow Automation Examples - Automation Showroom](https://www.automationshowroom.com/en/blog/workflow-automation-examples)
- [Enterprise Workflow Examples - Kissflow](https://kissflow.com/workflow/workflow-examples/)
- [Power Automate Flow Examples - DigitizeFlow](https://www.digitizeflow.com/technologies/power-automate)
- [Automation Blueprint Examples - ABM Lib](https://abmlib.dev/docs/examples)
- [Specification by Example - Wikipedia](https://en.wikipedia.org/wiki/Specification_by_example)
