# LLM Demos

Collection of demonstrations for various local LLM configurations and use cases.

## Demo Overview

```mermaid
flowchart TD
    A[LLM Demos] --> B[Basic Demos]
    A --> C[Hierarchical]
    A --> D[Mini Quick]
    A --> E[Stress Test]
    
    B --> F[Simple classification]
    C --> G[Multi-level routing]
    D --> H[Fast responses]
    E --> I[Load testing]
    
    style A fill:#e1f5fe
```

## Demo Categories

| Demo | Use Case | Model |
|------|----------|-------|
| LM Demos | Basic text classification | Qwen 2.5 |
| Hierarchy | Multi-level routing | Qwen 2.5 |
| Mini Quick | Rapid prototyping | Qwen 2.5 |
| Stress Test | Load testing | Various |

## Quick Start

```mermaid
flowchart LR
    A[Select Demo] --> B[Run Script]
    B --> C[View Results]
    C --> D{Performance OK?}
    
    D -->|Yes| E[Deploy]
    D -->|No| F[Adjust Parameters]
    F --> B
```