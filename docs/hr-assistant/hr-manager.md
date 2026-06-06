# HR Manager

Leave approval automation with policy enforcement and escalation.

## Leave Approval Flow

```mermaid
flowchart TD
    A[Leave Request] --> B[Validate Dates]
    B --> C{Balance OK?}
    C -->|No| D[Reject + Reason]
    C -->|Yes| E[Check Policy]
    E --> F{Manager Needed?}
    F -->|Yes| G[Send to Manager]
    F -->|No| H[Auto-Approve]
    G --> I{Manager Approves?}
    I -->|Yes| H
    I -->|No| J[Escalate]
    
    style H fill:#c8e6c9
    style D fill:#ffcdd2
    style J fill:#fff3e0
```

## Policy Rules Engine

```mermaid
graph TD
    A[Leave Request] --> B[Rule 1: Balance]
    A --> C[Rule 2: Tenure]
    A --> D[Rule 3: Dates]
    A --> E[Rule 4: Type]
    
    B --> F{Pass?}
    C --> F
    D --> F
    E --> F
    
    F -->|All Pass| G[Approved]
    F -->|Any Fail| H[Rejected]
    
    style G fill:#c8e6c9
    style H fill:#ffcdd2
```

## Leave Types

| Type | Days/Year | Advance Notice |
|------|-----------|----------------|
| Annual | 18 | 7 days |
| Sick | 10 | Same day |
| Personal | 5 | 3 days |
| Emergency | 3 | None |
| Parental | 90 | 30 days |

## Code Structure

```python
class LeaveManager:
    def approve_leave(self, employee, leave_type, dates):
        # Check rules
        if not self.check_balance(employee, leave_type):
            return Rejection("Insufficient balance")
        
        if not self.check_notice_period(dates):
            return Rejection("Insufficient notice")
        
        if self.is_blackout_period(dates):
            return Escalation("Blackout period")
        
        return Approval()
```

## Dashboard View

```mermaid
graph TD
    A[HR Dashboard] --> B[Pending: 12]
    A --> C[Approved: 156]
    A --> C2[Rejected: 23]
    A --> D[This Month: 45]
    
    subgraph Pending Items
        B --> E[Wait 1-2 days]
        B --> F[Wait 3-5 days]
        B --> G[Overdue]
    end
    
    style B fill:#fff3e0
    style G fill:#ffcdd2
```

## Notifications

```mermaid
sequenceDiagram
    participant E as Employee
    participant S as System
    participant M as Manager
    
    E->>S: Submit leave request
    S->>S: Validate rules
    S->>M: Request approval
    M->>S: Approve
    S->>E: Notification: Approved
    S->>S: Update calendar
```

## Reporting

| Report | Purpose |
|--------|---------|
| Leave Balance | Current status |
| Utilization | Usage patterns |
| Peak Times | High demand periods |
| Cost Analysis | Leave expenses |

## Next Steps

- [HR Assistant](./hr-assistant.md) - Employee queries
- [Sales Funnel](./sales-funnel.md) - Sales automation