# Customer Churn Prediction

ML pipeline for predicting and preventing customer churn.

## Churn Prediction Flow

```mermaid
flowchart TD
    A[Customer Data] --> B[Feature Engineering]
    B --> C[Model Training]
    C --> D[Prediction]
    D --> E{Churn Risk?}
    E -->|High| F[Alert]
    E -->|Low| G[Monitor]
    F --> H[Retention Action]
    
    style F fill:#fff3e0
    style H fill:#c8e6c9
```

## Feature Engineering

```mermaid
graph TD
    A[Raw Data] --> B[Usage Features]
    A --> C[Payment Features]
    A --> D[Support Features]
    
    B --> B1[Login frequency]
    B --> B2[Feature adoption]
    B --> B3[Session duration]
    
    C --> C1[Payment delays]
    C --> C2[Plan changes]
    C --> C3[Discount usage]
    
    D --> D1[Ticket count]
    D --> D2[Complaint rate]
    D --> D3[Resolution time]
```

## Model Architecture

```mermaid
flowchart LR
    A[Input Features] --> B[Preprocessing]
    B --> C[Gradient Boosting]
    C --> D[Churn Probability]
    
    subgraph Training
        C --> E[Cross-validation]
        E --> F[Hyperparameter Tuning]
    end
    
    style D fill:#c8e6c9
```

## Key Features

| Feature | Importance | Description |
|---------|------------|-------------|
| Days since last login | High | Engagement indicator |
| Support tickets (30d) | High | Dissatisfaction signal |
| Payment delay count | High | Financial stress |
| Feature usage % | Medium | Product adoption |
| Plan downgrade | Medium | Cost sensitivity |
| Age of account | Low | Loyalty indicator |

## Prediction Output

```json
{
  "customer_id": "CUST-12345",
  "churn_probability": 0.78,
  "risk_level": "HIGH",
  "top_factors": [
    "No login in 14 days",
    "3 support tickets this month",
    "Payment delayed twice"
  ],
  "recommended_action": "Proactive outreach"
}
```

## Training Pipeline

```mermaid
flowchart TD
    A[Data] --> B[Split 80/20]
    B --> C[Train on 80%]
    C --> D[Validate on 20%]
    D --> E{Metrics OK?}
    E -->|Yes| F[Save Model]
    E -->|No| G[Tune Hyperparameters]
    G --> C
    
    style F fill:#c8e6c9
```

## Evaluation Metrics

| Metric | Target | Critical |
|--------|--------|----------|
| AUC-ROC | >0.85 | <0.75 |
| Precision | >0.70 | <0.50 |
| Recall | >0.75 | <0.60 |
| F1 Score | >0.72 | <0.55 |

## Business Impact

| Action | Cost | Effectiveness |
|--------|------|----------------|
| Discount offer | $50 | 40% retention |
| Personal call | $25 | 60% retention |
| Service upgrade | $100 | 75% retention |

## Next Steps

- [Model Registry](./model-registry.md) - Store trained models
- [Monitoring](./monitoring.md) - Track performance