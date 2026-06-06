# Vector Storage

Deep dive into vector databases and storage strategies.

## Vector Store Options

```mermaid
graph TD
    A[Vector Stores] --> B[FAISS]
    A --> C[Chroma]
    A --> D[Pinecone]
    A --> E[Weaviate]
    
    style B fill:#e3f2fd
    style C fill:#e3f2fd
    style D fill:#fff3e0
    style E fill:#fff3e0
```

| Store | Type | Best For |
|-------|------|----------|
| FAISS | Local | Quick tests, small data |
| Chroma | Local | Prototyping |
| Pinecone | Cloud | Production scale |
| Weaviate | Hybrid | Flexible schemas |

## Indexing Flow

```mermaid
flowchart TD
    A[Documents] --> B[Chunking]
    B --> C[Cleaning]
    C --> D[Embedding]
    D --> E[Indexing]
    E --> F[Search Ready]
    
    style F fill:#c8e6c9
```

## FAISS Example

```python
import faiss
import numpy as np

# Create index
dimension = 384  # Embedding size
index = faiss.IndexFlatL2(dimension)

# Add vectors
embeddings = np.array(all_embeddings).astype('float32')
index.add(embeddings)

# Search
query_embedding = np.array([query_vec]).astype('float32')
distances, indices = index.search(query_embedding, k=5)
```

## Chroma Example

```python
import chromadb

client = chromadb.Client()
collection = client.create_collection("knowledge")

collection.add(
    ids=["1", "2", "3"],
    embeddings=embeddings,
    documents=["doc1 text", "doc2 text", "doc3 text"]
)

results = collection.query(
    query_embeddings=[query_vec],
    n_results=3
)
```

## Performance Comparison

| Metric | FAISS | Chroma | Pinecone |
|--------|-------|--------|----------|
| Speed | Fast | Medium | Fast |
| Scale | Millions | Thousands | Unlimited |
| Setup | Local | Local | Cloud |
| Cost | Free | Free | Paid |

## Chunking Strategies

```mermaid
flowchart LR
    A[Text] --> B[Fixed Size]
    A --> C[By Paragraph]
    A --> D[By Sentence]
    A --> E[Recursive]
    
    B --> F[Fast but rough]
    C --> G[Semantic]
    D --> H[Precise]
    E --> I[Balanced]
```

## Best Practices

| Tip | Reason |
|-----|--------|
| 500-1000 token chunks | Balance context & precision |
| 30-50 token overlap | Catch cross-chunk info |
| Clean before indexing | Better embeddings |
| Use same embedder | Consistent search |
| Filter by metadata | Precision boost |

## Scaling Strategy

```mermaid
flowchart TD
    A[< 10K docs] --> B[Local FAISS/Chroma]
    A --> C[Good for testing]
    
    D[10K - 1M docs] --> E[Optimized FAISS]
    D --> F[HNSW index]
    
    G[> 1M docs] --> H[Pinecone/Weaviate]
    G --> I[Cloud scale]
    
    style B fill:#c8e6c9
    style E fill:#c8e6c9
    style H fill:#fff3e0
```

## Next Steps

- [MLOps](../mlops/index.md) - Production pipelines
- [Enterprise Apps](../enterprise-apps/index.md) - Scale deployment