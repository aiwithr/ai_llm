# MLOps - Customer Churn Prediction

End-to-end MLOps pipeline for predicting and preventing customer churn.

## MLOps Pipeline Overview

```mermaid
flowchart TD
    A[Data Ingestion] --> B[Data Validation]
    B --> C[Feature Engineering]
    C --> D[Model Training]
    D --> E[Model Evaluation]
    E --> F{Performance OK?}
    F -->|Yes| G[Model Registry]
    F -->|No| D
    G --> H[Model Deployment]
    H --> I[Monitoring]
    I --> J[Drift Detection]
    J --> K{Drift Detected?}
    K -->|Yes| L[Auto-Retrain]
    K -->|No| I
    L --> D
    
    style A fill:#e3f2fd
    style G fill:#c8e6c9
    style L fill:#ffccbc
```

## Training Pipeline

```mermaid
flowchart LR
    subgraph Data
        A[Raw Data] --> B[Clean]
        B --> C[Transform]
    end
    
    subgraph Features
        C --> D[Feature Selection]
        D --> E[Scaling]
    end
    
    subgraph Model
        E --> F[Train]
        F --> G[Validate]
        G --> H[Save Model]
    end
    
    style H fill:#c8e6c9
```

## Monitoring Dashboard

```mermaid
sequenceDiagram
    participant M as Model
    participant D as Dashboard
    participant A as Alerts
    participant O as Ops
    
    loop Real-time
        M-->>D: Predictions + Metrics
        D->>D: Update Charts
        D->>A: Check Thresholds
        A->>O: Alert if Breach
    end
```

## Model Registry Flow

```mermaid
flowchart TD
    A[Training Complete] --> B{Meet Threshold?}
    B -->|Yes| C[Register Model]
    B -->|No| D[Log Failure]
    C --> E[Tag Version]
    E --> F[Add Metadata]
    F --> G[Stage for Deployment]
    
    style C fill:#c8e6c9
    style D fill:#ffcdd2
```

## A/B Testing Framework

```mermaid
flowchart TD
    A[Incoming Request] --> B{Split Traffic}
    B -->|50%| C[Model A]
    B -->|50%| D[Model B]
    C --> E[Collect Metrics]
    D --> E
    E --> F{Compare Performance}
    F --> G{Model B Better?}
    G -->|Yes| H[Deploy Model B]
    G -->|No| I[Keep Model A]
    
    style H fill:#c8e6c9
```

## Key Components

| Component | Purpose |
|-----------|---------|
| Model Registry | Store and version models |
| Monitoring | Track performance metrics |
| Drift Detection | Detect data/concept drift |
| Auto-Retrain | Trigger retraining when needed |

## Performance Baselines

| Metric | Target | Critical |
|--------|--------|----------|
| Accuracy | >85% | <80% |
| Precision | >80% | <75% |
| Recall | >82% | <78% |
| Latency | <500ms | >1000ms |

## Running the Pipeline

```bash
# Start monitoring
python mlops/monitoring_dashboard.py

# Run complete pipeline
python mlops/churn_pipeline.py

# Check model registry
python mlops/model_registry.py --list
```
