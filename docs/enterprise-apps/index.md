# Enterprise Apps Overview

Enterprise-level applications using local LLM for privacy-first operations.

## App Categories

```mermaid
flowchart TD
    A[Enterprise Apps] --> B[Classification]
    A --> C[Monitoring]
    A --> D[Security]
    A --> E[Automation]
    
    B --> F[Ticket Classification]
    C --> G[Network Health]
    D --> H[Threat Detection]
    E --> I[Process Automation]
    
    style A fill:#e1f5fe
    style I fill:#c8e6c9
```

## Common Features

- **Privacy-First**: All data processed locally
- **Real-time Processing**: Immediate response to requests
- **Scalable Architecture**: Handle increasing load
- **Integration Ready**: Connect with existing systems

## Application List

| App | Purpose | Model |
|-----|---------|-------|
| Model Use Class | Core classification | Qwen 2.5 |
| Network Monitor | System monitoring | Gemma 4 |
| Security Analyzer | Threat detection | Gemma 4 |
| Ticket Classifier | Support automation | Qwen 2.5 |