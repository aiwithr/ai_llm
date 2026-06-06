# Gemma E4B Demos

Google's Gemma 4-bit quantized model offers higher quality for complex reasoning tasks.

## Model Comparison

```mermaid
flowchart TD
    A[Task Input] --> B{Complexity?}
    B -->|Simple| C[Qwen 2.5 1.5B]
    B -->|Complex| D[Gemma 4 E4B]
    
    C --> E[Fast Response]
    D --> F[Accurate Analysis]
    
    style C fill:#e3f2fd
    style D fill:#fff3e0
    style E fill:#c8e6c9
    style F fill:#c8e6c9
```

## Gemma Capabilities

```mermaid
graph TD
    A[Gemma 4 E4B] --> B[Classification]
    A --> C[Reasoning]
    A --> D[Analysis]
    A --> E[Code Generation]
    A --> F[Security Analysis]
    
    B --> B1[High Accuracy]
    C --> C1[Chain-of-Thought]
    D --> D1[Deep Analysis]
    
    style A fill:#f3e5f5
```

## When to Use Gemma

| Task Type | Qwen | Gemma |
|-----------|------|-------|
| Fast classification | Yes | Yes |
| Multi-step reasoning | No | Yes |
| Security analysis | No | Yes |
| Complex patterns | No | Yes |

## Performance Trade-offs

```mermaid
graph LR
    A[Qwen 2.5] --> B[Speed]
    A --> C[Quality]
    D[Gemma 4] --> B
    D --> C
    
    B --> E[Fastest]
    C --> F[Highest]
    
    style A fill:#e3f2fd
    style D fill:#fff3e0
```

## Demo Scripts

```bash
# Quick classification demo
python gemma-4-e4b-llm_mini_demo_5cases.py

# Full stress test
python gemma-4-e4b-llm_stress_test_class.py

# Security analysis
python gemma-4-e4b-cybersec_analysis.py

# Network monitoring
python gemma-4-e4b-network_monitor.py
```

## Setup

```bash
# 1. Download Gemma 4 E4B from LM Studio
# 2. Load model in LM Studio
# 3. Start server on port 1234
# 4. Run demos
```

## Results Comparison

```
Task: Classify 55 ISP complaints

Qwen 2.5 1.5B:
- Accuracy: 85%
- Avg Time: 0.6s
- Total: 33s

Gemma 4 E4B:
- Accuracy: 92%
- Avg Time: 1.2s
- Total: 66s
```
