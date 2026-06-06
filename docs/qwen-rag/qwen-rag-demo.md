# Qwen RAG Demo

End-to-end demonstration of Retrieval-Augmented Generation with Qwen.

## Demo Architecture

```mermaid
flowchart TD
    A[User Query] --> B[Embedding]
    B --> C[Vector Search]
    C --> D[Knowledge Base]
    D --> E[Context Retrieved]
    E --> F[Prompt + Context]
    F --> G[Qwen Model]
    G --> H[Grounded Response]
    
    style A fill:#e3f2fd
    style H fill:#c8e6c9
```

## Demo Flow

```mermaid
sequenceDiagram
    participant U as User
    participant Q as Query
    participant V as Vector DB
    participant L as LLM
    
    U->>Q: "What is P1 SLA?"
    Q->>V: Embed query
    V-->>Q: [Doc 42, Doc 87]
    Q->>L: Format prompt
    L-->>Q: "P1 SLA is 4 hours..."
    Q-->>U: Response with citation
    
    Note over Q: "Based on Policy Doc v3.2"
```

## Setup Steps

| Step | Task | Command |
|------|------|---------|
| 1 | Start LM Studio with Qwen | UI |
| 2 | Install dependencies | `pip install faiss-cpu sentence-transformers` |
| 3 | Prepare documents | Place in `data/` folder |
| 4 | Index documents | `python index_docs.py` |
| 5 | Run demo | `python demo.py` |

## Document Processing

```mermaid
flowchart LR
    A[PDF/TXT/MD] --> B[Load]
    B --> C[Split Chunks]
    C --> D[Generate Embeddings]
    D --> E[Store in FAISS]
    E --> F[Index Ready]
    
    style F fill:#c8e6c9
```

## Query Processing

```python
def query_rag(user_query, vector_store, llm):
    # 1. Embed query
    query_embedding = embed_model.encode(user_query)
    
    # 2. Search vector store
    results = vector_store.similarity_search(query_embedding, k=3)
    
    # 3. Build context
    context = "\n\n".join([r.content for r in results])
    
    # 4. Generate response
    prompt = f"Context: {context}\n\nQuestion: {user_query}"
    response = llm.generate(prompt)
    
    return response, results
```

## Sample Output

```
User: "What are the steps for customer escalation?"

Response: "To escalate a customer issue:
1. Log the complaint with ticket ID
2. Attempt first-level resolution
3. If unresolved after 2 hours, escalate to Tier 2
4. Document all attempts in the system

[Source: SOP-Docs/page-42, SOP-Docs/page-87]
```

## Evaluation Metrics

| Metric | Description | Target |
|--------|-------------|--------|
| Retrieval Precision | Relevant docs retrieved | >85% |
| Response Accuracy | Factual correctness | >90% |
| Citation Accuracy | Sources correctly cited | >95% |
| Latency | Response time | <3s |

## Next Steps

- [Simple RAG](./simple-rag.md) - Basic implementation
- [Vector Storage](./vector-storage.md) - Deep dive