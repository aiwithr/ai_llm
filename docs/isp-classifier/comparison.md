# Classifier Comparison

Side-by-side comparison of all classification approaches.

## Performance Matrix

```mermaid
graph TD
    A[Metric] --> B[Baseline]
    A --> C[LLM]
    A --> D[Hybrid]
    
    B1[Speed] --> B2[10ms]
    C1[Speed] --> C2[1000ms]
    D1[Speed] --> D2[50ms]
    
    B1a[Accuracy] --> B2a[72%]
    C1a[Accuracy] --> C2a[91%]
    D1a[Accuracy] --> D2a[88%]
    
    B1b[Cost] --> B2b[Free]
    C1b[Cost] --> C2b[High]
    D1b[Cost] --> D2b[Low]
    
    style B2 fill:#e3f2fd
    style C2 fill:#fff3e0
    style D2 fill:#c8e6c9
```

## Decision Flow

```mermaid
flowchart TD
    A[Input] --> B[Try Baseline]
    B --> C{Match?}
    C -->|Yes| D[Use Baseline]
    C -->|No| E[Try LLM]
    E --> F{Confidence > 70%?}
    F -->|Yes| G[Use LLM]
    F -->|No| H[Flag Review]
    
    style D fill:#c8e6c9
    style G fill:#c8e6c9
    style H fill:#ffccbc
```

## Use Case Recommendation

| Scenario | Recommendation | Reason |
|----------|----------------|--------|
| Simple keywords | Baseline | Fast & free |
| Ambiguous text | LLM | Better context |
| High volume | Hybrid | Balanced |
| Real-time needed | Hybrid | Speed + accuracy |
| Complex issues | LLM | Reasoning |
| Audit required | LLM | Full trace |

## Test Results (55 Cases)

```mermaid
graph LR
    A[Baseline] --> B[72% accuracy]
    C[LLM] --> D[91% accuracy]
    E[Hybrid] --> F[88% accuracy]
    
    style B fill:#ffcdd2
    style D fill:#c8e6c9
    style F fill:#e8eaf6
```

## Cost Analysis

| Approach | Per Call | Per Day (1000) | Monthly |
|----------|----------|----------------|---------|
| Baseline | $0.00 | $0.00 | $0.00 |
| LLM | $0.002 | $2.00 | $60.00 |
| Hybrid | $0.0002 | $0.20 | $6.00 |

## Accuracy by Category

```mermaid
graph TD
    subgraph Accuracy
        A[ISP-001] -->|Baseline| A1[85%]
        A -->|LLM| A2[96%]
        B[ISP-002] -->|Baseline| B1[65%]
        B -->|LLM| B2[88%]
        C[ISP-003] -->|Baseline| C1[78%]
        C -->|LLM| C2[92%]
    end
    
    style A2 fill:#c8e6c9
    style B2 fill:#c8e6c9
    style C2 fill:#c8e6c9
```

## Recommendation Summary

```mermaid
flowchart TD
    A[What's priority?] --> B{Cost or Quality?}
    B -->|Cost| C[Baseline]
    B -->|Quality| D{Simple or Complex?}
    D -->|Simple| E[Baseline]
    D -->|Complex| F[LLM]
    
    C --> G[Add LLM fallback for edge cases]
    F --> H[Consider Hybrid for scale]
    
    style C fill:#e3f2fd
    style F fill:#fff3e0
    style G fill:#c8e6c9
    style H fill:#c8e6c9
```

## Next Steps

- [ISP Reasoning](../isp-classifier-reasoning/index.md) - Add explanations
- [MLOps](../mlops/index.md) - Monitor & improve