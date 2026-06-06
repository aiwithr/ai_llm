# SLA Classifier

Automated classification of tickets based on Service Level Agreement tiers.

## Classification Flow

```mermaid
flowchart TD
    A[Incoming Ticket] --> B[Extract Keywords]
    B --> C{Tier Detection}
    
    C -->|Critical| D[Priority 1]
    C -->|Urgent| E[Priority 2]
    C -->|Normal| F[Priority 3]
    
    D --> G[SLA: 1 Hour]
    E --> H[SLA: 4 Hours]
    F --> I[SLA: 24 Hours]
    
    G --> J[Escalation Path A]
    H --> K[Escalation Path B]
    I --> L[Escalation Path C]
    
    style G fill:#ffcdd2
    style H fill:#fff3e0
    style I fill:#c8e6c9
```

## Classification Criteria

### Priority 1 - Critical (1 Hour SLA)
- Complete service outage
- Security breach
- Multiple affected customers

### Priority 2 - Urgent (4 Hour SLA)
- Partial service degradation
- Single customer critical issue
- Performance degradation

### Priority 3 - Normal (24 Hour SLA)
- General inquiries
- Feature requests
- Minor issues

## Implementation

```python
def classify_sla_tier(ticket_text):
    # Critical keywords
    if any(kw in ticket_text.lower() for kw in ['outage', 'down', 'breach']):
        return "P1", "1h"
    
    # Urgent keywords
    if any(kw in ticket_text.lower() for kw in ['slow', 'degraded', 'intermittent']):
        return "P2", "4h"
    
    # Default to normal
    return "P3", "24h"
```