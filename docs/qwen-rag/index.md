# Qwen + RAG

RAG (Retrieval-Augmented Generation) combines your documents with the LLM to provide accurate, grounded responses.

## RAG Architecture

```mermaid
flowchart TD
    A[User Query] --> B[Query Embedding]
    B --> C[Vector Search]
    C --> D[Knowledge Base]
    D --> E[Relevant Documents]
    E --> F[Context Assembly]
    F --> G[LLM Generation]
    G --> H[Response + Citations]
    
    style A fill:#e3f2fd
    style D fill:#fff3e0
    style H fill:#c8e6c9
```

## Document Processing Flow

```mermaid
flowchart LR
    A[Documents] --> B[Chunking]
    B --> C[Embedding]
    C --> D[Vector Store]
    D --> E[Ready for Query]
    
    style D fill:#c8e6c9
```

## Query Processing Pipeline

```mermaid
sequenceDiagram
    participant U as User
    participant Q as Query Engine
    participant V as Vector DB
    participant L as LLM
    
    U->>Q: "What is the SLA for P1?"
    Q->>V: Embed query
    V-->>Q: Top-K similar chunks
    Q->>Q: Assemble context
    Q->>L: Prompt + Context
    L-->>Q: Grounded response
    Q-->>U: "P1 SLA is 4 hours..."
```

## RAG vs Direct LLM

| Aspect | Direct LLM | RAG |
|--------|-----------|-----|
| Knowledge | Training data only | Your documents |
| Accuracy | May hallucinate | Grounded in facts |
| Updates | Retrain needed | Update knowledge base |
| Citations | Not available | Source citations |

## Key Components

```mermaid
graph TD
    A[RAG System] --> B[Document Loader]
    A --> C[Text Splitter]
    A --> D[Embeddings]
    A --> E[Vector Store]
    A --> F[Retriever]
    A --> G[Generator LLM]
    
    B --> C
    C --> D
    D --> E
    E --> F
    F --> G
    
    style A fill:#e8eaf6
    style G fill:#c8e6c9
```

## Use Cases

- **Policy Compliance**: Answer questions from company policies
- **Technical Support**: Grounded in troubleshooting guides
- **HR Queries**: Based on employee handbook
- **Training**: Onboarding documentation

## Quick Start

```bash
# 1. Prepare your documents
# 2. Index them into vector store
python qwen-rag/index_documents.py

# 3. Query the knowledge base
python qwen-rag/query_knowledge.py
```

## Performance Tips

| Factor | Recommendation |
|--------|----------------|
| Chunk size | 500-1000 tokens |
| Top-K results | 3-5 documents |
| Embedding model | Use same for index/query |

## ISP Sales Bot (isp_sales.py)

This is an intelligent sales assistant that generates personalized Bangla/English sales pitches for ISP customers. It uses keyword matching and LLM generation.

### Features

- **Customer Profiles**: Track customer's current plan and requirements
- **Product Catalog**: Multiple ISP packages with keywords
- **Smart Matching**: Keyword-based package recommendation
- **Bilingual Output**: Bangla + English sales pitches

### Architecture

```mermaid
graph TB
    subgraph "Customer Layer"
        A[Customer Select] --> B[Get Profile]
    end
    
    subgraph "Matching Layer"
        B --> C[Extract Needs]
        C --> D[Keyword Matching]
        D --> E[Best Package]
    end
    
    subgraph "Generation Layer"
        E --> F[Build Prompt]
        F --> G[LLM - Qwen 2.5]
        G --> H[Sales Pitch]
    end
    
    subgraph "UI Layer"
        H --> I[Display Result]
        I --> J[Show Logic]
    end
```

### Workflow

```mermaid
sequenceDiagram
    participant User as User
    participant App as Streamlit App
    participant LLM as Qwen 2.5 (LM Studio)
    
    User->>App: Select Customer
    User->>App: Click "Generate Sales Pitch"
    App->>App: Find Best Package (Keyword Matching)
    App->>LLM: Send Prompt with Context
    LLM-->>App: Receive Sales Pitch Response
    App->>User: Show Proposal
```

### Sample Customer Profiles

| Customer | Current Plan | Needs | Best Match |
|----------|--------------|-------|------------|
| Arif Ahmed | 5 Mbps | YouTube, browsing | Standard Plan (P1) |
| Sultana Razia | 10 Mbps | Netflix, 4K movies | Entertainment Pro (P2) |
| Tanvir Hasan | 20 Mbps | Work from home, VPN | Business Executive (P3) |
| Farhana Islam | None (New) | Social media, research | Student Starter (P4) |

### Product Catalog

| Package | Speed | Keywords |
|---------|-------|----------|
| P1: Standard | 10 Mbps | YouTube, browsing |
| P2: Entertainment Pro | 20 Mbps | Netflix, 4K, streaming |
| P3: Business Executive | 100 Mbps | VPN, business, Zoom |
| P4: Student Starter | 5 Mbps | student, affordable |

### Running the App

```bash
cd c:\Downloads\classifier-app\qwen-rag
streamlit run isp_sales.py
```

Access at: http://localhost:8501

### Requirements

- LM Studio running at `http://localhost:1234`
- Qwen 2.5 1.5B model loaded
- Streamlit installed

### Benefits

| Benefit | Description |
|---------|-------------|
| Personalization | Tailored pitches based on customer needs |
| Bilingual | Bangla builds trust, English explains details |
| Speed | Real-time generation with local LLM |
| Privacy | All processing happens locally |

---

## Related Documentation

- [Getting Started](../getting-started/index.md)
- [ISP Classifier](../isp-classifier/index.md)
- [Enterprise Apps](../enterprise-apps/index.md)
