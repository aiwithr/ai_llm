# Enterprise AI Automations Documentation

Welcome to the Enterprise AI Automations documentation. This site is built for ISP/Service Company and enterprise teams who want to understand how local LLMs can replace rule-based systems and act as the "brain" behind everyday applications. But, we want to start with baby steps.

All guides here use **local LLM setups** via LM Studio, keeping your data private and your work to be delivered fast.

## System Overview

The following diagram shows how all components connect in the Enterprise AI system:

```mermaid
flowchart TD
    A[Customer / User] --> B[Frontend Application]
    B --> C[Python Scripts / API Layer]
    C --> D[LM Studio + Local LLM]
    D --> E[Structured Response]
    E --> F[Business Logic]
    F --> G[Output Action]
    
    style A fill:#e3f2fd
    style D fill:#fff3e0
    style G fill:#c8e6c9
```

## Documentation Architecture

```mermaid
flowchart LR
    A[Documentation] --> B[Getting Started]
    A --> C[ISP Classifier]
    A --> D[Qwen + RAG]
    A --> E[Gemma E4B]
    A --> F[HR Assistant]
    A --> G[MLOps]
    
    B --> H[Setup Guide]
    C --> I[Classification Workflows]
    D --> J[RAG Architecture]
    E --> K[Model Comparison]
    F --> L[Leave Management]
    G --> M[Churn Prediction]
    
    style A fill:#e8eaf6
    style H fill:#c8e6c9
    style I fill:#c8e6c9
    style J fill:#c8e6c9
    style K fill:#c8e6c9
    style L fill:#c8e6c9
    style M fill:#c8e6c9
```

## Data Flow Sequence

```mermaid
sequenceDiagram
    participant U as User
    participant A as Application
    participant L as LLM
    participant O as Output
    
    U->>A: Submit Request
    A->>L: API Call to LM Studio
    L-->>A: LLM Response
    A->>A: Process & Structure
    A-->>U: Formatted Output
```

## Project Structure

```mermaid
graph TD
    A[Enterprise AI Workflows] --> B[ISP Classifier]
    A --> C[Qwen + RAG]
    A --> D[Gemma E4B]
    A --> E[HR Assistant]
    A --> F[MLOps]
    
    B --> B1[Rule-based]
    B --> B2[LLM-enhanced]
    B --> B3[Reasoning]
    
    C --> C1[Knowledge Base]
    C --> C2[Vector Search]
    
    D --> D1[Classification]
    D --> D2[Analysis]
    
    style A fill:#f3e5f5
    style B1 fill:#c8e6c9
    style C1 fill:#c8e6c9
```

## Quick Navigation

| Section | Description | Model |
|---------|-------------|-------|
| [Getting Started](getting-started/index.md) | Setup LM Studio and first script | Qwen 2.5 |
| [ISP Classifier](isp-classifier/index.md) | Customer complaint classification | Qwen |
| [Qwen + RAG](qwen-rag/index.md) | Knowledge-augmented responses | Qwen 2.5 |
| [Gemma E4B](gemma-e4b/index.md) | Advanced classification | Gemma 4-bit |
| [HR Assistant](hr-assistant/index.md) | Leave and employee management | Qwen |
| [MLOps](mlops/index.md) | Churn prediction pipeline | Gemma |

## Key Technologies

- **LM Studio**: Local LLM runtime with API server
- **Qwen 2.5 1.5B**: Fast, efficient for most tasks
- **Gemma 4 E4B**: Higher quality for complex reasoning
- **ChromaDB**: Vector database for RAG
- **FastAPI/Flask**: API framework

## Getting Help

- Check the [Getting Started](getting-started/index.md) guide for setup instructions
- Review individual module documentation for specific use cases
- Refer to Python scripts in the repository for implementation details
