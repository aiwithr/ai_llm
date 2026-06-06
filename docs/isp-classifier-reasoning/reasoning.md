# AI Reasoning

Chain-of-thought reasoning for transparent, explainable classifications.

## Reasoning Pipeline

```mermaid
flowchart TD
    A[Complaint] --> B[Extract Symptoms]
    B --> C[Identify Causes]
    C --> D[Apply Rules]
    D --> E[LLM Validation]
    E --> F[Final Decision]
    
    style A fill:#e3f2fd
    style F fill:#fff3e0
```

## Step-by-Step Flow

```mermaid
sequenceDiagram
    participant C as Complaint
    participant A as Analyzer
    participant R as Rule Engine
    participant L as LLM
    participant O as Output
    
    C->>A: "WiFi drops, slow speed"
    A->>A: Extract: [WiFi, slow, drops]
    A->>R: Check rules
    R-->>A: Could be ISP-002 or ISP-004
    A->>L: Validate with context
    L-->>A: Router issue (87% confidence)
    A->>O: ISP-002 + explanation
    
    Note over O: Shows reasoning chain!
```

## Reasoning Depth Levels

| Level | Description | Use Case |
|-------|-------------|----------|
| Surface | Keyword match | Simple cases |
| Context | Consider surrounding | Moderate |
| Deep | Chain-of-thought | Complex |
| Meta | Self-reflection | Edge cases |

## Transparency Benefits

```mermaid
graph TD
    A[Explainable AI] --> B[Team Training]
    A --> C[Audit Trail]
    A --> D[Customer Trust]
    A --> E[Error Correction]
    A --> F[Compliance]
    
    style A fill:#e8eaf6
```

## Example Output

```
Complaint: "My internet was working fine yesterday, 
but this morning the WiFi icon shows connected but 
pages won't load. I tried restarting the router."

Reasoning Chain:
1. Symptoms: "connected but no pages", "tried restarting router"
2. Possible causes: DNS issue, router config, ISP outage
3. Key insight: "Restarted router but issue persists"
4. Rule match: Router restart suggests local issue
5. LLM validation: Confirms router/DNS problem

Result: ISP-003 (DNS Issue)
Confidence: 89%
Explanation: Connected but no browsing + router restart = likely DNS
```

## When Reasoning Matters

| Scenario | Basic | Reasoning |
|----------|-------|-----------|
| Keyword match | ✅ | ✅ |
| Multiple symptoms | ❌ | ✅ |
| Conflicting signals | ❌ | ✅ |
| Training new staff | ❌ | ✅ |
| Audit requirements | ❌ | ✅ |
| Customer disputes | ❌ | ✅ |

## Confidence Calibration

```mermaid
flowchart TD
    A[LLM Output] --> B{Confidence}
    B -->|< 60%| C[Flag for Human]
    B -->|60-85%| D[Proceed + Log]
    B -->|> 85%| E[Auto-approve]
    
    style C fill:#ffcdd2
    style D fill:#fff3e0
    style E fill:#c8e6c9
```

## Implementation

```python
def reasoning_classify(text):
    # Step 1: Extract symptoms
    symptoms = extract_symptoms(text)
    
    # Step 2: Generate possible causes
    causes = suggest_causes(symptoms)
    
    # Step 3: Apply rules
    rule_matches = apply_rules(causes)
    
    # Step 4: LLM validation
    validated = llm_validate(rule_matches, symptoms)
    
    # Step 5: Generate explanation
    explanation = generate_reasoning_chain(validated)
    
    return {
        "code": validated["code"],
        "confidence": validated["confidence"],
        "reasoning": explanation
    }
```

## Next Steps

- [MLOps Monitoring](../mlops/index.md) - Track reasoning quality
- [Enterprise Apps](../enterprise-apps/index.md) - Scale up