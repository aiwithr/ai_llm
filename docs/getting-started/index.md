# Getting Started

This guide helps you set up LM Studio and run your first local LLM script. Perfect for beginners exploring enterprise automation.

## Setup Flow

```mermaid
flowchart TD
    A[Download LM Studio] --> B[Install LM Studio]
    B --> C[Download Qwen 2.5 Model]
    C --> D[Start Local Server]
    D --> E[Configure Port 1234]
    E --> F[Run First Script]
    
    style A fill:#e3f2fd
    style D fill:#fff3e0
    style F fill:#c8e6c9
```

## Model Download Process

```mermaid
flowchart LR
    A[LM Studio] --> B[Search Models]
    B --> C[Download Qwen 2.5 1.5B]
    C --> D[Load Model]
    D --> E[Start Server]
    
    style C fill:#fff3e0
    style E fill:#c8e6c9
```

## Script Execution Sequence

```mermaid
sequenceDiagram
    participant S as Script
    participant L as LM Studio
    participant M as Model
    
    S->>L: POST /v1/chat/completions
    L->>M: Load Model
    M-->>L: Model Ready
    L-->>S: JSON Response
    S->>S: Parse & Display
```

## Prerequisites

- Windows 10/11 or macOS
- 8GB+ RAM recommended
- 4GB+ VRAM for 4-bit models

## Quick Start Commands

```bash
# 1. Download LM Studio from lmstudio.ai
# 2. Search and download "Qwen 2.5 1.5B"
# 3. Start server (click "Start Server" button)
# 4. Run your first script

python llm_quick_demo_base.py
```

## First Script Structure

```mermaid
graph TD
    A[Import requests] --> B[Define API URL]
    B --> C[Create Payload]
    C --> D[Send POST Request]
    D --> E[Parse Response]
    E --> F[Display Output]
    
    style A fill:#e8eaf6
    style F fill:#c8e6c9
```

## Next Steps

- Try [ISP Classifier](../isp-classifier/index.md) - Classify customer complaints
- Explore [Qwen + RAG](../qwen-rag/index.md) - Knowledge-augmented responses
- Check [Gemma E4B](../gemma-e4b/index.md) - Advanced reasoning
