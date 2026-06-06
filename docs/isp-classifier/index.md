# ISP Classifier

The ISP Classifier automatically categorizes customer complaints into diagnostic codes for faster resolution.

## Classification Workflow

```mermaid
flowchart TD
    A[Customer Complaint] --> B[Extract Keywords]
    B --> C{Keyword Match?}
    C -->|Yes| D[Return ISP Code]
    C -->|No| E[LLM Fallback]
    E --> F[Generate Classification]
    F --> G[Return Code + Reason]
    D --> H[Log & Route]
    G --> H
    
    style A fill:#e3f2fd
    style D fill:#c8e6c9
    style G fill:#c8e6c9
```

## Multi-Stage Classification

```mermaid
flowchart LR
    A[Input Text] --> B[Preprocessing]
    B --> C{Exact Match?}
    C -->|Yes| D[ISP-XXX]
    C -->|No| E{Partial Match?}
    E -->|Yes| F[ISP-XXX]
    E -->|No| G[LLM Analysis]
    G --> H[ISP-XXX + Confidence]
```

## Architecture Diagram

```mermaid
graph TD
    A[Complaint] --> B[Rule Engine]
    A --> C[LLM Engine]
    B --> D{Confidence > 80%}
    C --> D
    D -->|Yes| E[Return Code]
    D -->|No| F[Fallback Logic]
    F --> E
    
    style B fill:#e8eaf6
    style C fill:#fff3e0
    style E fill:#c8e6c9
```

## ISP Codes Reference

| Code | Description | Example |
|------|-------------|---------|
| ISP-001 | ONT/Fiber Issue | Red light, no fiber |
| ISP-002 | Router Problem | WiFi not working |
| ISP-003 | DNS Issue | Can't resolve sites |
| ISP-004 | Speed Problem | Slow connection |
| ISP-005 | Billing Issue | Payment error |
| ISP-006 | Outage | Area-wide down |

## Demo Scripts

```bash
# Rule-based classifier
python app-baseline-class.py

# LLM-enhanced classifier
python app-classifier1.py
```

## How It Works

```mermaid
sequenceDiagram
    participant U as User
    participant A as App
    participant R as Rules
    participant L as LLM
    
    U->>A: "Red light on ONT"
    A->>R: Check keywords
    R-->>A: Match: ISP-001
    A-->>U: "ONT Issue Detected"
    
    Note over U,A: If rules fail, LLM is used
```
