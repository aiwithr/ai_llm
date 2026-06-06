# Hierarchical Classification

Multi-level ticket classification using hierarchical routing.

## Hierarchical Flow

```mermaid
flowchart TD
    A[Ticket Input] --> B[Level 1: Category]
    B --> C{Network Issue?}
    B --> D{Billing Issue?}
    B --> E{Technical Issue?}
    
    C -->|Yes| F[Level 2: Sub-category]
    F --> G[ISP Code Assignment]
    
    D --> H[Route to Billing Dept]
    E --> I[Route to Tech Support]
    
    style F fill:#e1f5fe
    style G fill:#c8e6c9
```

## Classification Levels

### Level 1 - Category Detection
- Network issues
- Billing concerns
- Technical support
- General inquiries

### Level 2 - Sub-category
- Connection problems
- Speed issues
- Equipment failure
- Payment processing

### Level 3 - Specific Code
- ISP-001: ONT issue
- ISP-002: Router problem
- ISP-003: Cable damage

## Implementation

```python
def hierarchical_classify(ticket):
    # Level 1
    category = detect_category(ticket)
    
    # Level 2
    subcategory = detect_subcategory(ticket, category)
    
    # Level 3
    code = assign_isp_code(ticket, category, subcategory)
    
    return {"category": category, "subcategory": subcategory, "code": code}
```