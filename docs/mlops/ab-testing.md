# A/B Testing

Systematic comparison of model versions in production.

## A/B Test Flow

```mermaid
flowchart TD
    A[Incoming Traffic] --> B{Split 50/50}
    B -->|50%| C[Model A]
    B -->|50%| D[Model B]
    C --> E[Collect Metrics]
    D --> E
    E --> F[Compare Performance]
    F --> G{Better?}
    G -->|Yes| H[Rollout Winner]
    G -->|No| I[Investigate]
    
    style H fill:#c8e6c9
```

## Traffic Splitting

```mermaid
graph LR
    A[All Users] --> B[Random Split]
    B --> C[Control: 50%]
    B --> D[Treatment: 50%]
    
    C --> E[Model A]
    D --> F[Model B]
    
    style C fill:#e3f2fd
    style D fill:#fff3e0
```

## Test Configuration

```yaml
ab_test:
  name: churn-v3-vs-v4
  start_date: 2026-05-01
  duration: 14 days
  
traffic:
  control: 0.5
  treatment: 0.5
  
metrics:
  primary: conversion_rate
  secondary:
    - latency
    - error_rate
    - user_satisfaction
```

## Decision Framework

```mermaid
flowchart TD
    A[Test Complete] --> B{Significant Result?}
    B -->|No| C[Extend Test]
    B -->|Yes| D{Effect Size OK?}
    D -->|No| C
    D -->|Yes| E{No Negative?}
    E -->|No| C
    E -->|Yes| F[Deploy Winner]
    
    style F fill:#c8e6c9
    style C fill:#fff3e0
```

## Statistical Analysis

| Metric | Model A | Model B | Winner |
|--------|---------|---------|--------|
| Accuracy | 87% | 89% | B (+2%) |
| Latency | 45ms | 52ms | A (faster) |
| Conversion | 23% | 28% | B (+5%) |

## Minimum Sample Size

```mermaid
graph TD
    A[Calculate] --> B[Baseline Rate]
    A --> C[Min Detectable Effect]
    A --> D[Confidence Level]
    
    B --> E[Sample Size]
    C --> E
    D --> E
    
    style E fill:#e8eaf6
```

## Implementation

```python
import random

def predict_with_ab_test(input_data, model_a, model_b, test_group):
    if test_group == "control":
        return model_a.predict(input_data)
    else:
        return model_b.predict(input_data)

def assign_group(user_id):
    # Consistent assignment
    return "control" if user_id % 2 == 0 else "treatment"
```

## Monitoring During Test

| Day | Control | Treatment | Delta |
|-----|---------|-----------|-------|
| 1-3 | 23.1% | 23.8% | +0.7% |
| 4-7 | 22.9% | 25.1% | +2.2% |
| 8-10 | 23.4% | 27.3% | +3.9% |
| 11-14 | 23.2% | 28.1% | +4.9% |

## Next Steps

- [Retraining](./retraining.md) - Update underperforming models
- [Model Registry](./model-registry.md) - Store test results