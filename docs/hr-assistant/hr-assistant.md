# HR Assistant

AI chatbot for employee queries with knowledge base integration.

## Assistant Architecture

```mermaid
flowchart TD
    A[Employee Query] --> B[Intent Detection]
    B --> C{Question Type?}
    C -->|Policy| D[Search Policy DB]
    C -->|Balance| E[Check HR System]
    C -->|Procedure| F[RAG Retrieval]
    C -->|Escalation| G[Open Ticket]
    
    D --> H[Format Response]
    E --> H
    F --> H
    G --> I[Notify Manager]
    
    style H fill:#c8e6c9
```

## Common Query Types

```mermaid
graph TD
    A[HR Queries] --> B[Leave]
    A --> C[Benefits]
    A --> D[Policies]
    A --> E[Payroll]
    
    B --> B1[Balance, Apply, Cancel]
    C --> C1[Health, Retirement]
    D --> D1[Sick, Work from home]
    E --> E1[Payslip, Deductions]
    
    style B fill:#e3f2fd
    style C fill:#e3f2fd
    style D fill:#e3f2fd
    style E fill:#e3f2fd
```

## Response Flow

```mermaid
sequenceDiagram
    participant E as Employee
    participant A as HR Bot
    participant K as Knowledge Base
    
    E->>A: "How many sick days left?"
    A->>A: Intent: leave_balance
    A->>K: Query employee record
    K-->>A: 6 days remaining
    A-->>E: "You have 6 sick days remaining (out of 10)"
    
    E->>A: "What's WFH policy?"
    A->>K: RAG search for WFH
    K-->>A: Policy doc sections
    A-->>E: "Employees can WFH up to 2 days/week..."
```

## Intent Classification

| Query Pattern | Intent | Response |
|---------------|--------|----------|
| "how many days" | balance | Show remaining |
| "can I take" | eligibility | Check rules |
| "what is" | policy | Retrieve doc |
| "who is" | contact | Find manager |
| "how to" | procedure | Step-by-step |

## Features

| Feature | Description |
|---------|-------------|
| 24/7 Availability | Instant responses |
| Consistent | Same answer every time |
| Escalation | Smart routing to humans |
| Learning | Improve from feedback |

## Code Pattern

```python
def hr_assistant(query, employee_id):
    intent = classify_intent(query)
    
    if intent == "balance":
        return get_leave_balance(employee_id)
    
    if intent == "policy":
        return search_policy(query)
    
    if intent == "escalation":
        return create_support_ticket(query, employee_id)
    
    return "I'm not sure, let me connect you with HR"
```

## Conversation Flow

```mermaid
flowchart TD
    A[Start] --> B[Employee asks]
    B --> C{Understand?}
    C -->|Yes| D[Answer]
    C -->|No| E[Ask clarifying]
    D --> F{Satisfied?}
    F -->|No| G[Escalate]
    F -->|Yes| H[Close]
    E --> B
    G --> I[Ticket Created]
    
    style D fill:#c8e6c9
    style I fill:#fff3e0
```

## Next Steps

- [HR Manager](./hr-manager.md) - Leave approval
- [Enterprise Apps](../enterprise-apps/index.md) - Scale up