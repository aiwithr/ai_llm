# Model Retraining

Automated pipeline for keeping models current with new data.

## Retraining Trigger

```mermaid
flowchart TD
    A[Monitor Detection] --> B{Retrain Needed?}
    B -->|Drift| C[Scheduled Retrain]
    B -->|Scheduled| C
    B -->|Manual| C
    
    C --> D[Data Collection]
    D --> E[Training]
    E --> F{Validation Pass?}
    F -->|Yes| G[Deploy]
    F -->|No| H[Debug]
    
    style G fill:#c8e6c9
    style H fill:#ffcdd2
```

## Trigger Conditions

| Trigger | Threshold | Action |
|---------|-----------|--------|
| Data Drift | PSI > 0.2 | Retrain |
| Performance | Accuracy < 85% | Retrain |
| Schedule | Every 30 days | Retrain |
| Manual | User request | Retrain |

## Data Pipeline

```mermaid
flowchart LR
    A[New Data] --> B[Validation]
    B --> C[Cleaning]
    C --> D[Feature Engineering]
    D --> E[Train/Test Split]
    E --> F[Ready for Training]
```

## Training Workflow

```mermaid
sequenceDiagram
    participant D as Data
    participant P as Pipeline
    participant T as Training
    participant R as Registry
    
    D->>P: New batch
    P->>P: Process
    P->>T: Training data ready
    T->>T: Train model
    T->>R: Register new version
    
    Note over T: Includes all previous data
```

## Validation Checks

```mermaid
flowchart TD
    A[New Model] --> B[Data Validation]
    A --> C[Schema Check]
    A --> D[Performance Check]
    
    B --> E{Pass?}
    C --> E
    D --> E
    
    E -->|Yes| F[Deploy]
    E -->|No| G[Rollback]
    
    style F fill:#c8e6c9
    style G fill:#ffcdd2
```

## Checkpoint Strategy

```python
class RetrainPipeline:
    def run(self):
        # 1. Load accumulated data
        data = self.collect_new_data()
        
        # 2. Combine with historical
        combined = self.combine_with_history(data)
        
        # 3. Train with earlier data for validation
        model = self.train(combined)
        
        # 4. Validate against holdout
        if not self.validate(model):
            self.alert_team("Validation failed")
            return
        
        # 5. Register and deploy
        self.register_model(model)
        self.deploy()
```

## Incremental Learning

```mermaid
flowchart LR
    A[Base Model] --> B[New Batch]
    B --> C[Update Weights]
    C --> D[Fine-tune]
    D --> E[Updated Model]
    
    style A fill:#e3f2fd
    style E fill:#c8e6c9
```

## Fallback Strategy

| Failure Type | Action |
|--------------|--------|
| Training crashes | Keep previous model |
| Validation fails | Alert + manual review |
| Deployment fails | Rollback to last good |
| Performance worse | Revert immediately |

## Metrics Comparison

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Accuracy | 85% | 88% | +3% |
| AUC-ROC | 0.87 | 0.90 | +0.03 |
| Precision | 78% | 82% | +4% |
| Recall | 81% | 84% | +3% |

## Timeline

```
Day 0: Trigger detected
Day 1: Data collection complete
Day 2: Training begins
Day 3: Validation complete
Day 4: Deploy to production
Day 5: Monitor for issues
```

## Next Steps

- [Monitoring](./monitoring.md) - Track new model
- [Model Registry](./model-registry.md) - Store retrained versions