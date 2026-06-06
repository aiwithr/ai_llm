# Model Monitoring

Real-time tracking of model performance and health.

## Monitoring Dashboard

```mermaid
flowchart TD
    A[Model API] --> B[Metrics Collector]
    B --> C[Real-time Dashboard]
    B --> D[Alert System]
    
    C --> E[Performance View]
    C --> F[Drift Detection]
    C --> G[Usage Stats]
    
    style C fill:#e8eaf6
```

## Key Metrics

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| Accuracy | 87% | >85% | ✅ |
| Latency P99 | 150ms | <200ms | ✅ |
| Error Rate | 0.5% | <1% | ✅ |
| Drift Score | 0.02 | <0.05 | ✅ |

## Data Flow

```mermaid
sequenceDiagram
    participant R as Request
    participant M as Model
    participant C as Collector
    participant D as Dashboard
    
    R->>M: Prediction request
    M->>M: Generate prediction
    M-->>R: Response + metrics
    M->>C: Log metrics
    C->>D: Update dashboard
```

## Drift Detection

```mermaid
flowchart TD
    A[Production Data] --> B[Compare Distribution]
    B --> C{Drift Detected?}
    C -->|No| D[Continue Monitoring]
    C -->|Yes| E[Alert]
    E --> F{Threshold Exceeded?}
    F -->|Yes| G[Auto-Retrain]
    F -->|No| H[Human Review]
    
    style G fill:#c8e6c9
    style H fill:#fff3e0
```

## Types of Drift

| Type | Description | Detection |
|------|-------------|-----------|
| Data Drift | Input distribution changes | PSI, KL divergence |
| Concept Drift | Target relationship changes | Performance drop |
| Model Drift | Model quality degrades | Accuracy decline |

## Alert Configuration

```yaml
alerts:
  data_drift:
    metric: psi_score
    threshold: 0.1
    action: notify
  
  performance_drop:
    metric: accuracy
    threshold: 0.05
    action: page_team
  
  latency_spike:
    metric: p99_latency
    threshold: 500ms
    action: page_team
```

## Monitoring Code

```python
import prometheus_client

accuracy = prometheus_client.Gauge('model_accuracy')
latency = prometheus_client.Histogram('model_latency')

def predict(input_data):
    start = time.time()
    result = model.predict(input_data)
    latency.observe(time.time() - start)
    accuracy.set(calculate_accuracy(result))
    return result
```

## Dashboard Components

```mermaid
graph TD
    A[Monitoring Dashboard] --> B[Real-time]
    A --> C[Historical]
    A --> D[Alerts]
    
    B --> B1[Live predictions]
    B --> B2[Current metrics]
    
    C --> C1[7-day trend]
    C --> C2[Weekly comparison]
    
    D --> D1[Active alerts]
    D --> D2[Alert history]
```

## Next Steps

- [A/B Testing](./ab-testing.md) - Test model changes
- [Retraining](./retraining.md) - Update models