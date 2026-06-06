# LM Studio Demos

Basic demonstrations using LM Studio for local LLM inference.

## Setup Flow

```mermaid
flowchart TD
    A[Install LM Studio] --> B[Download Model]
    B --> C[Load Model]
    C --> D[Start Server]
    D --> E[Run Demo]
    
    style E fill:#c8e6c9
```

## Demo Scripts

### Basic Classification
```python
# lm_demo_small_10case.py
import requests

response = requests.post(
    "http://localhost:1234/v1/chat/completions",
    json={"messages": [{"role": "user", "content": "..."}]}
)
```

## Architecture

```mermaid
flowchart LR
    subgraph Client
        A[Python Script]
    end
    
    subgraph Server
        B[LM Studio]
        C[Local LLM]
    end
    
    A -->|HTTP| B
    B --> C
    C -->|Response| B
    B -->|JSON| A
```

## Features

- Simple API calls
- JSON response parsing
- Error handling
- Batch processing support