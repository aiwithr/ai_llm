# Talk to LM Studio

Learn how to connect your scripts to LM Studio's local LLM server.

## Connection Architecture

```mermaid
flowchart TD
    A[Python Script] -->|POST /v1/chat/completions| B[LM Studio API]
    B --> C{Qwen Model<br/>Loaded?}
    C -->|Yes| D[Process Request]
    C -->|No| E[Load Model]
    E --> D
    D --> F[Return JSON]
    
    style A fill:#e3f2fd
    style F fill:#c8e6c9
```

## API Request Structure

```mermaid
sequenceDiagram
    participant S as Script
    participant A as API
    
    S->>A: POST /v1/chat/completions
    Note over S: {<br/>"model": "qwen",<br/>"messages": [<br/>{"role": "user",<br/>"content": "..."}<br/>]<br/>}
    A-->>S: {<br/>"choices": [<br/>{"message": {...}}<br/>]<br/>}
```

## Setup Checklist

| Step | Task | Status |
|------|------|--------|
| 1 | Download LM Studio | ⬜ |
| 2 | Download Qwen 2.5 1.5B | ⬜ |
| 3 | Load model in UI | ⬜ |
| 4 | Click "Start Server" | ⬜ |
| 5 | Note port (default 1234) | ⬜ |
| 6 | Run script | ⬜ |

## Connection Code

```python
import requests

url = "http://localhost:1234/v1/chat/completions"
headers = {"Content-Type": "application/json"}
payload = {
    "model": "qwen2.5-1.5b",
    "messages": [
        {"role": "user", "content": "Hello!"}
    ]
}

response = requests.post(url, json=payload, headers=headers)
print(response.json()["choices"][0]["message"]["content"])
```

## Common Issues

```mermaid
flowchart TD
    A[Connection Error] --> B{Server Running?}
    B -->|No| C[Start LM Studio server]
    B -->|Yes| D{Correct Port?}
    D -->|No| E[Check port in script]
    D -->|Yes| F{Cors enabled?}
    F -->|No| G[Enable CORS in settings]
    F -->|Yes| H[Firewall issue]
    
    style C fill:#c8e6c9
    style E fill:#c8e6c9
    style G fill:#c8e6c9
```

## Configuration Options

| Setting | Default | Description |
|---------|---------|-------------|
| Port | 1234 | Server port |
| Model Name | varies | Model identifier |
| Max Tokens | 512 | Response length |
| Temperature | 0.7 | Randomness |

## Next Steps

- [ISP Classifier](../isp-classifier/index.md) - Classify customer issues
- [Qwen + RAG](../qwen-rag/index.md) - Add knowledge base