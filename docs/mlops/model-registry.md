# Model Registry

Centralized storage and versioning for ML models.

## Registry Architecture

```mermaid
flowchart TD
    A[Training Job] --> B[Register Model]
    B --> C[Version Control]
    C --> D[Metadata Store]
    D --> E[Model Storage]
    
    E --> F[Staging]
    E --> G[Production]
    
    style D fill:#e3f2fd
    style F fill:#fff3e0
    style G fill:#c8e6c9
```

## Version Lifecycle

```mermaid
flowchart LR
    A[Train] --> B[Register]
    B --> C[Stage]
    C --> D[Validate]
    D -->|Pass| E[Production]
    D -->|Fail| F[Rollback]
    
    E --> G[Monitor]
    G --> H{Drift?}
    H -->|Yes| F
    H -->|No| G
```

## Model Card

```yaml
model:
  name: churn-predictor-v3
  version: 3.2.1
  created: 2026-05-07
  framework: sklearn 1.3
  
performance:
  auc_roc: 0.89
  precision: 0.78
  recall: 0.82
  
metadata:
  train_samples: 50000
  features: 24
  runtime: 45ms
  
artifacts:
  model_file: churn_v3.pkl
  config: config_v3.json
```

## Registry Operations

```mermaid
graph TD
    A[Registry API] --> B[List Models]
    A --> C[Get Latest]
    A --> D[Download]
    A --> E[Compare]
    
    style A fill:#e8eaf6
```

## Code Example

```python
import mlflow

# Register model
mlflow.sklearn.log_model(
    model, 
    "churn-predictor",
    registered_model_name="production-churn"
)

# Get latest version
model = mlflow.sklearn.load_model(
    "models:/production-churn/latest"
)

# Compare versions
compare = mlflow.registered_model.get_model_version_benchmark(
    "production-churn"
)
```

## Version Comparison

| Version | AUC-ROC | Latency | Status |
|---------|---------|---------|--------|
| 3.0 | 0.85 | 45ms | Retired |
| 3.1 | 0.87 | 48ms | Staging |
| 3.2 | 0.89 | 42ms | Production |

## Promotion Workflow

```mermaid
sequenceDiagram
    participant T as Training
    participant R as Registry
    participant S as Staging
    participant P as Production
    
    T->>R: Register v3.2
    R->>S: Deploy to staging
    S->>S: Validate
    S->>R: Approve
    R->>P: Promote to production
    R->>T: Notify success
```

## Best Practices

| Practice | Benefit |
|-----------|---------|
| Semantic versioning | Clear updates |
| Model cards | Full documentation |
| A/B validation | Safe deployment |
| Rollback plan | Risk mitigation |

## Next Steps

- [Monitoring](./monitoring.md) - Track deployed models
- [A/B Testing](./ab-testing.md) - Compare versions