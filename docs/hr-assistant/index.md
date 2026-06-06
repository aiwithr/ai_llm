# HR Assistant

AI-powered HR automation for leave management and employee queries.

## HR Workflow

```mermaid
flowchart TD
    A[Employee Request] --> B[AI Review]
    B --> C{Balance OK?}
    C -->|Yes| D[Auto-Approve]
    C -->|No| E[Manager Review]
    D --> F[Notify Employee]
    E --> F
    
    style A fill:#e3f2fd
    style D fill:#c8e6c9
```

## Leave Approval Flow

```mermaid
flowchart LR
    A[Leave Request] --> B[Check Balance]
    B --> C{Sufficient?}
    C -->|Yes| D[Check Policy]
    C -->|No| E[Reject]
    D --> F{Policy OK?}
    F -->|Yes| G[Approve]
    F -->|No| H[Manager Escalation]
    G --> I[Notify]
    H --> I
    E --> I
    
    style G fill:#c8e6c9
    style E fill:#ffcdd2
```

## Employee Query Processing

```mermaid
sequenceDiagram
    participant E as Employee
    participant A as HR Bot
    participant K as Knowledge Base
    participant M as Manager
    
    E->>A: "How many leave days do I have?"
    A->>K: Check records
    K-->>A: Balance info
    A-->>E: "You have 12 days remaining"
    
    E->>A: "I want to apply for leave"
    A->>A: Validate request
    A-->>M: Forward for approval
    M-->>A: Approved
    A-->>E: "Leave approved!"
```

## Features

| Feature | Description |
|---------|-------------|
| Leave Balance | Check remaining days |
| Auto-Approval | Approve valid requests |
| Policy Check | Validate against rules |
| Notifications | Email/SMS alerts |
| Reporting | Leave analytics |

## Demo Scripts

```bash
# HR Assistant (queries)
python HR_Assistant.py

# Leave Manager (approvals)
python HR_manager_Approve_leave.py
```

## System Components

```mermaid
graph TD
    A[HR Assistant] --> B[Leave Tracker]
    A --> C[Policy Engine]
    A --> D[Notification Service]
    A --> E[Reporting]
    
    B --> F[Employee DB]
    C --> F
    D --> G[Email/SMS]
    E --> H[Analytics Dashboard]
    
    style A fill:#e8eaf6
    style G fill:#c8e6c9
```

## Benefits

- **24/7 Availability**: Instant responses
- **Consistency**: Applies rules uniformly
- **Efficiency**: Reduces manager workload
- **Transparency**: Clear audit trail
