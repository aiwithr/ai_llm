# SLM Apps

Small Language Models (SLMs) optimized for speed and resource efficiency.

## SLM Philosophy

```mermaid
flowchart LR
    A[Large Model] --> B[High Quality]
    A --> C[Slow Response]
    A --> D[High Resource]
    
    E[Small Model] --> F[Good Quality]
    E --> G[Fast Response]
    E --> G2[Low Resource]
    
    style A fill:#fff3e0
    style E fill:#c8e6c9
```

## Resource Comparison

| Model | Size | RAM | VRAM | Speed |
|-------|------|-----|------|-------|
| Qwen 7B | 7GB | 8GB | 6GB | Medium |
| Qwen 1.5B | 1.5GB | 4GB | 2GB | Fast |
| Gemma 4B | 2.5GB | 6GB | 4GB | Medium |
| Phi-3 Mini | 2GB | 4GB | 2GB | Very Fast |

## Use Case Matrix

```mermaid
graph TD
    subgraph Speed Priority
        A[Real-time chat] --> E[Phi-3/Qwen 1.5B]
        B[High volume] --> E
    end
    
    subgraph Quality Priority
        C[Complex analysis] --> F[Gemma 4B]
        D[Security tasks] --> F
    end
    
    subgraph Balance
        G[General classification] --> H[Qwen 1.5B + Rules]
    end
    
    style E fill:#c8e6c9
    style F fill:#fff3e0
    style H fill:#e8eaf6
```

## SLM Optimization

```mermaid
flowchart TD
    A[Full Model] --> B[Quantization]
    B --> C[4-bit Quantized]
    C --> D[Pruning]
    D --> E[Distilled]
    
    E --> F[~70% size reduction]
    F --> G[~80% speed improvement]
    
    style F fill:#c8e6c9
    style G fill:#c8e6c9
```

## When to Use SLM

| Scenario | Recommendation |
|----------|----------------|
| <100ms latency needed | ✅ SLM |
| Resource constrained | ✅ SLM |
| Simple tasks | ✅ SLM |
| Complex reasoning | ❌ Use Gemma |
| Security analysis | ❌ Use Gemma |

## Speed vs Quality Tradeoff

```mermaid
graph LR
    A[Speed] --> B[SLM: <500ms]
    A --> C[Standard: 1-3s]
    A --> D[Large: 3-10s]
    
    E[Quality] --> F[SLM: 75-85%]
    E --> G[Standard: 85-92%]
    E --> H[Large: 92-97%]
```

## Demo Scripts

```bash
# Run SLM demo
python apps-slm.py

# Compare with standard
python apps-standard.py
```

## Best SLM Candidates

| Model | Context | Strength |
|-------|---------|----------|
| Phi-3 Mini | 4K | Code, fast tasks |
| Qwen 1.5B | 8K | General, fast |
| Gemma 2B | 8K | Balanced |
| TinyLlama | 2K | Prototyping |

## Next Steps

- [Standard Apps](./standard-apps.md) - Full Gemma demos
- [Enterprise Apps](../enterprise-apps/index.md) - Production setup