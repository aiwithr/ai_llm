# Enterprise AI Automations - Complete Project Summary

> Privacy-first AI agents for real-world ISP operations. No cloud. No data leaks. Pure local intelligence.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture Philosophy](#architecture-philosophy)
3. [System Architecture](#system-architecture)
4. [Project Modules](#project-modules)
   - [Getting Started](#1-getting-started)
   - [ISP Classifier](#2-isp-classifier)
   - [ISP Classifier Reasoning](#3-isp-classifier-reasoning)
   - [Qwen + RAG](#4-qwen-rag)
   - [Gemma E4B](#5-gemma-e4b)
   - [HR Assistant](#6-hr-assistant)
   - [SLA System](#7-sla-system)
   - [Enterprise Apps](#8-enterprise-apps)
   - [LLM Demos](#9-llm-demos)
   - [MLOps](#10-mlops)
   - [Smart Gift AI Admin](#11-smart-gift-ai-admin)
5. [Quick Start Guide](#quick-start-guide)
6. [Tech Stack](#tech-stack)

---

## Project Overview

This repository contains 11 project groups, each self-contained with its own documentation and examples. The project demonstrates how local LLMs (Large Language Models) can be used for enterprise automation without cloud dependency.

### Models Used

| Model | Parameters | Purpose |
|-------|-----------|---------|
| Qwen 2.5 | 1.5B | Main classification and reasoning |
| Gemma 4 | E4B (4-bit) | Efficient inference, security analysis |

---

## Architecture Philosophy

The project is built on six core principles:

**Privacy First** - All data stays on-premises. No cloud API calls for sensitive data. Complete data sovereignty ensures customer information never leaves your infrastructure.

**Locality Only** - Run entirely on your own hardware. No internet dependency. Systems work offline when needed.

**Speed Matters** - Small, efficient models (1.5B - 7B parameters) deliver fast inference times. Real-time responses for customer support.

**Modular Design** - Each project is self-contained and easy to extend. Standalone functionality means you can pick and choose what you need.

**Production Ready** - Built with MLOps pipelines, monitoring, and A/B testing capabilities from the start.

**Human Centric** - AI assists but humans decide. All decisions are explainable with complete audit trails.

---

## System Architecture

```
ΓöîΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÉ
Γöé                    Input Layer                       Γöé
Γö£ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöñ
Γöé  Email Tickets  Γöé  Chat Messages  Γöé  API Calls     Γöé
ΓööΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÿ
                          Γöé
                          Γû╝
ΓöîΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÉ
Γöé               Context & Retrieval Layer              Γöé
Γö£ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöñ
Γöé  Text Preprocessing  Γöé  Vector DB  Γöé  Knowledge    Γöé
ΓööΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÿ
                          Γöé
                          Γû╝
ΓöîΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÉ
Γöé                  AI Processing Layer                  Γöé
Γö£ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöñ
Γöé      LM Studio  Γöé  Local LLM  Γöé  Classification     Γöé
ΓööΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÿ
                          Γöé
                          Γû╝
ΓöîΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÉ
Γöé                Output & Review Layer                 Γöé
Γö£ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöñ
Γöé  Generated Response  Γöé  Human Review  Γöé  Customer   Γöé
ΓööΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÿ
```

---

## Project Modules

---

### 1. Getting Started

**Location:** `getting-started/`

**Purpose:** First steps with LM Studio and local LLM development.

**What You Need:**
- LM Studio installed and running
- Qwen 2.5 1.5B or Gemma 4 E4B model loaded
- Python 3.8+ installed

**Key Scripts:**

| Script | Description |
|--------|-------------|
| `talk_to_llm.py` | Basic LLM communication script |

**Quick Start:**
```python
import requests

response = requests.post(
    "http://localhost:1234/v1/chat/completions",
    json={
        "model": "qwen2.5-coder-1.5b-instruct",
        "messages": [{"role": "user", "content": "Hello"}]
    }
)
```

**Key Learnings:**
- How to communicate with LM Studio server
- Basic prompt-response patterns
- Temperature and token settings

---

### 2. ISP Classifier

**Location:** `isp-classifier/`

**Purpose:** Customer complaint classification system using local LLMs. Maps customer complaints to diagnostic codes for efficient troubleshooting.

**Author:** Rakibul Hassan, Link3 Technologies

**Classification Categories:**
- **Technical Issues**: Connection problems, speed issues, equipment failures
- **Billing**: Invoice disputes, payment processing, subscription changes
- **Service Outages**: Planned maintenance, unplanned downtime
- **Account Management**: Profile updates, password resets, cancellations

**Diagnostic Codes:**

| Code | Description |
|------|-------------|
| ISP-001 | ONT/Fiber issues |
| ISP-002 | WiFi/Router issues |
| ISP-006 | Weather-related outages |
| ISP-036 | Fiber cut/damage |
| ISP-047 | Signal level issues |

**Key Scripts:**

| Script | Description |
|--------|-------------|
| `app-baseline-class.py` | Baseline rule-based classifier |
| `app-optimized-classifiers.py` | Optimized classifier |
| `app-classifier1.py` to `app-classifier9.py` | Various classifier versions |
| `traditional_vs_ai_workflow.py` | Comparison script |

**Usage:**
```python
from isp_classifier import LLMClassifier

classifier = LLMClassifier()
complaint = "My ONT has a red light, internet is not working"
result = classifier.classify(complaint)
```

**Architecture:**
```
Customer Complaint
       Γöé
       Γû╝
ΓöîΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÉ
Γöé PreprocessingΓöé
ΓööΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÿ
       Γöé
       Γû╝
ΓöîΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÉ    ΓöîΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÉ
Γöé    Rules     Γöé or Γöé     LLM      Γöé
Γöé  (Baseline)  Γöé    Γöé  (Qwen/Gemma)Γöé
ΓööΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÿ    ΓööΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÿ
       Γöé                  Γöé
       ΓööΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓö¼ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÿ
                Γû╝
         Diagnostic Code
```

---

### 3. ISP Classifier Reasoning

**Location:** `isp-classifier-reasoning/`

**Purpose:** Adds explanation capabilities to classification. Not only classifies complaints but explains WHY it chose a particular diagnostic code.

**Why Reasoning Matters:**

| Without Reasoning | With Reasoning |
|-------------------|-----------------|
| "ISP-001" | "ISP-001 - ONT/fiber issue detected" |
| No explanation | "Red light pattern matches ONT failure" |
| Black box | Transparent decision-making |

**Key Scripts:**

| Script | Description |
|--------|-------------|
| `app-reasoning1.py` | Basic reasoning with Qwen |
| `app-reasoning2.py` | Enhanced reasoning with Gemma |

**Example Output:**
```
Complaint: "My ONT has a red light and internet stopped working"

{
  "code": "ISP-001",
  "reasoning": "The 'red light' on ONT is a classic indicator of 
               fiber disconnection or ONT hardware failure.",
  "confidence": 0.92,
  "evidence": ["red light", "ONT", "internet stopped"],
  "action": "Check fiber connection at ONT, reboot ONT"
}
```

**Benefits:**
1. **Transparency** - Know why a decision was made
2. **Trust** - Operators can verify classifications
3. **Debugging** - Easy to find classification errors
4. **Compliance** - Audit trail for regulatory requirements

---

### 4. Qwen + RAG

**Location:** `qwen-rag/`

**Purpose:** Combines Qwen 2.5 1.5B with Retrieval-Augmented Generation for enhanced knowledge-based responses.

**What is RAG?**
1. Retrieving relevant documents from a knowledge base
2. Augmenting the prompt with retrieved context
3. Generating responses with accurate, up-to-date information

**Architecture:**
```
User Query
     Γöé
     Γû╝
ΓöîΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÉ
Γöé  Retriever  Γöé ΓöÇΓöÇΓöÇΓöÇΓöÇΓû╢ Vector Database
ΓööΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÿ
     Γöé
     Γû╝
ΓöîΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÉ
Γöé   Augment   Γöé ΓöÇΓöÇΓöÇΓöÇΓöÇΓû╢ Add context to prompt
ΓööΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÿ
     Γöé
     Γû╝
ΓöîΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÉ
Γöé    LLM      Γöé ΓöÇΓöÇΓöÇΓöÇΓöÇΓû╢ Generate response
ΓööΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÿ
```

**Key Scripts:**

| Script | Description |
|--------|-------------|
| `qwen_rag_demo.py` | Full RAG implementation |
| `qwen_simple_rag.py` | Basic RAG example |
| `qwen_vector_storage.py` | Vector storage utilities |

**Benefits:**

| Benefit | Description |
|---------|-------------|
| Accuracy | Responses based on actual documents |
| Freshness | Knowledge base can be updated |
| Attribution | Sources can be cited |
| Hallucination | Reduced by grounding in documents |

**Use Cases:**
1. Technical Support - Pull relevant troubleshooting guides
2. Policy Q&A - Answer based on company documentation
3. Training - Provide context-aware learning materials

---

### 5. Gemma E4B

**Location:** `gemma-e4b/`

**Purpose:** Showcases Google's Gemma 4 E4B (4-bit quantized) model capabilities for complex reasoning and classification.

**Model Specifications:**

| Spec | Value |
|------|-------|
| Model | gemma-4-e4b |
| Quantization | 4-bit |
| Context | 8K tokens |
| Speed | Medium |
| Accuracy | High |

**Performance Comparison:**

| Metric | Qwen 1.5B | Gemma E4B |
|--------|-----------|-----------|
| Accuracy | 32.7% | 58.2% |
| Speed (ms) | 2973 | 4500 |
| Context | 4K | 8K |
| Reasoning | Basic | Advanced |

**Key Scripts:**

| Script | Description |
|--------|-------------|
| `gemma-4-e4b-app-optimized-classifiers.py` | Optimized classifier |
| `gemma-4-e4b-app-reasoning2.py` | Reasoning classifier |
| `gemma-4-e4b-cybersec_analysis.py` | Cybersecurity analysis |
| `gemma-4-e4b-network_monitor.py` | Network monitoring |
| `gemma-4-e4b-test_llm_ISP_ticket_classifier.py` | ISP ticket classifier |
| `apps-standard.py` | Standard LLM apps |
| `apps-slm.py` | SLM (Small Language Model) apps |

**Best Practices:**
1. Use for complex classification tasks
2. Enable reasoning for transparency
3. Batch process for efficiency
4. Monitor token usage

---

### 6. HR Assistant

**Location:** `hr-assistant/`

**Purpose:** AI-powered HR automation tools for leave management, employee queries, and sales funnel optimization.

**Components:**

#### HR Manager - Leave Approval
Automates leave request processing and approval workflow.

#### HR Assistant Chatbot
Handles employee queries about policies, benefits, and procedures.

#### Sales Funnel AI Closer
AI-powered sales automation for converting leads.

**Key Scripts:**

| Script | Description |
|--------|-------------|
| `HR_manager_Approve_leave.py` | Leave approval automation |
| `HR_Assistant.py` | Employee query chatbot |
| `Link3_Sales_Funnel_AI_Closer.py` | Sales funnel automation |

**Features:**

| Feature | Description |
|---------|-------------|
| Leave Processing | Auto-approve or flag for review |
| Policy Q&A | Instant answers to HR questions |
| Lead Scoring | Prioritize high-value leads |
| Response Generation | Personalized sales outreach |
| Sentiment Analysis | Detect employee concerns |

**Architecture:**
```
ΓöîΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÉ
Γöé                    HR Assistant                      Γöé
Γö£ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓö¼ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓö¼ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöñ
Γöé HR Manager  Γöé HR Chatbot  Γöé Sales Funnel AI Closer  Γöé
Γö£ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓö╝ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓö╝ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöñ
Γöé Leave API   Γöé Policy DB   Γöé CRM Integration         Γöé
Γöé Calendar    Γöé Benefits    Γöé Lead Database          Γöé
Γöé Team Mgmt   Γöé Procedures  Γöé Email/Telephony        Γöé
ΓööΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓö┤ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓö┤ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÿ
                    Γöé
                    Γû╝
              ΓöîΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÉ
              Γöé  LLM     Γöé
              ΓööΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÿ
```

---

### 7. SLA System

**Location:** `sla-system/`

**Purpose:** AI-powered approval and escalation management for customer tickets. Ensures SLA compliance through intelligent automation.

**Components:**

#### SLA LLM Assistant
Monitors and manages SLA requirements in real-time.

#### ERP AI Approval
Automated approval system integrated with ERP workflows.

**SLA Tiers:**

| Tier | Response Time | Resolution Time | Examples |
|------|---------------|-----------------|----------|
| Critical | 1 hour | 4 hours | Complete outage |
| High | 4 hours | 8 hours | Partial connectivity |
| Medium | 8 hours | 24 hours | Performance issues |
| Low | 24 hours | 72 hours | General inquiries |

**Features:**

| Feature | Description |
|---------|-------------|
| Real-time Monitoring | Track SLA status continuously |
| Auto Escalation | Automatic escalation when SLA at risk |
| Approval Workflow | Intelligent routing of approvals |
| Reporting | SLA compliance dashboards |
| Integration | Works with existing ticketing systems |

**Architecture:**
```
ΓöîΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÉ     ΓöîΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÉ     ΓöîΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÉ
Γöé   Tickets   ΓöéΓöÇΓöÇΓöÇΓöÇΓû╢Γöé  SLA Check  ΓöéΓöÇΓöÇΓöÇΓöÇΓû╢Γöé   Action    Γöé
ΓööΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÿ     ΓööΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÿ     ΓööΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÿ
                         Γöé                     Γöé
                         Γû╝                     Γû╝
                  ΓöîΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÉ       ΓöîΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÉ
                  Γöé  LLM        Γöé       Γöé  Escalation Γöé
                  Γöé  Assistant  Γöé       Γöé  Manager    Γöé
                  ΓööΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÿ       ΓööΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÿ
```

---

### 8. Enterprise Apps

**Location:** `enterprise-apps/`

**Purpose:** Production-ready applications for business operations, including model management, testing frameworks, and utility scripts.

**Key Scripts:**

| Script | Description |
|--------|-------------|
| `model_use_class.py` | Model usage and management |
| `test_classifier.py` | Classifier testing framework |
| `test_one.py` | Single case testing |
| `test_llm_ISP_ticket_classifier.py` | ISP ticket classifier tests |

**Features:**

| Feature | Description |
|---------|-------------|
| Multi-model Support | Switch between Qwen and Gemma |
| Usage Tracking | Monitor token consumption |
| Performance Metrics | Track accuracy and latency |
| Test Framework | Comprehensive testing suite |
| Reporting | Generate detailed reports |

**Model Manager Usage:**
```python
from model_use_class import ModelManager

manager = ModelManager()
manager.load_model("qwen2.5-coder-1.5b-instruct")
manager.use_model("gemma-4-e4b")
response = manager.generate("What is fiber optic troubleshooting?")
```

---

### 9. LLM Demos

**Location:** `llm-demos/`

**Purpose:** Collection of demonstration scripts showcasing different LLM capabilities and use cases.

**Demo Categories:**

#### 1. Basic Demos
Simple, foundational examples for beginners.

| Script | Description |
|--------|-------------|
| `llm_quick_demo_base.py` | Quick baseline demonstration |
| `llm_mini_demo_5cases.py` | 5-case mini demonstration |
| `llm_demo_small_10case.py` | 10-case small demonstration |

#### 2. Hierarchical Demos
Multi-level classification and decision-making examples.

| Script | Description |
|--------|-------------|
| `llm_hierarchical_demo.py` | Hierarchical classification |
| `llm_hierarchical_class.py` | Class-based hierarchy |

#### 3. Stress Testing
Performance and accuracy testing under load.

| Script | Description |
|--------|-------------|
| `llm_stress_test_class.py` | Stress testing framework |
| `llm_stress_test_report.json` | Test results |

**Performance Metrics:**

| Demo | Cases | Avg Accuracy | Avg Time |
|------|-------|--------------|----------|
| Mini (5) | 5 | 85% | 2.5s |
| Small (10) | 10 | 78% | 3.1s |
| Stress (55) | 55 | 58% | 4.5s |

---

### 10. MLOps

**Location:** `mlops/`

**Purpose:** Production-grade machine learning operations including model registry, monitoring, A/B testing, and automatic retraining.

**Components:**

#### 1. Model Registry
Centralized model versioning and management.

```python
from mlops.registry import ModelRegistry

registry = ModelRegistry("./models")
registry.register(
    model=classifier,
    version="1.2.0",
    metrics={"accuracy": 0.92, "latency": 4500}
)
```

#### 2. Monitoring
Real-time model performance tracking.

```python
from mlops.monitor import ModelMonitor

monitor = ModelMonitor()
monitor.log_prediction(
    model_id="gemma-4-e4b",
    input=complaint,
    output=code,
    latency=4500,
    confidence=0.92
)
```

#### 3. A/B Testing
Compare model performance in production.

```python
from mlops.ab_test import ABTester

tester = ABTester()
tester.create_experiment(
    name="qwen_vs_gemma",
    model_a="qwen2.5-coder-1.5b-instruct",
    model_b="gemma-4-e4b",
    traffic_split=0.5
)
```

#### 4. Automatic Retraining
Trigger retraining based on performance degradation.

**Features:**

| Feature | Description |
|---------|-------------|
| Version Control | Track all model iterations |
| Performance Tracking | Real-time accuracy monitoring |
| Traffic Splitting | A/B test without downtime |
| Auto-Retraining | Trigger training on degradation |
| Rollback | Revert to previous model version |

**Customer Churn Prediction Example:**
```python
from mlops.pipeline import ChurnPipeline

pipeline = ChurnPipeline()
pipeline.prepare_data("./data/customer_history.csv")
model = pipeline.train(features=["usage", "support_calls"], target="churned")
pipeline.register_model(model, version="1.0.0")
pipeline.deploy("production", version="1.0.0")
```

---

### 11. Smart Gift AI Admin

**Location:** `smart-gift/`

**Purpose:** AI-powered administration for the Smart Gift system, enabling intelligent gift matching, customer segmentation, and promotional automation.

**Features:**

| Feature | Description |
|---------|-------------|
| Gift Matching | AI-powered product recommendations |
| Customer Segmentation | Intelligent customer grouping |
| Promotional Automation | Automated campaign management |
| Analytics | Real-time performance tracking |

**Key Scripts:**

| Script | Description |
|--------|-------------|
| `SmartGift_AI_Admin.py` | Main admin interface |
| `slm_smartgift_admin.py` | SLM-based admin |

**Usage:**
```python
from smartgift_admin import SmartGiftAdmin

admin = SmartGiftAdmin()
segments = admin.segment_customers(data)
recommendations = admin.match_gifts(
    customer_profile=profile,
    occasion="birthday",
    budget=5000
)
```

---

## Quick Start Guide

1. **Install LM Studio** from https://lmstudio.ai
2. **Download a model** (Qwen 2.5 1.5B or Gemma 4 E4B)
3. **Start the local server** in LM Studio (localhost:1234)
4. **Run any script** from the project groups

### Basic Example

```bash
cd getting-started
python talk_to_llm.py
```

### ISP Classification Example

```bash
cd isp-classifier
python app-classifier1.py
```

---

## Tech Stack

```
Language:        Python 3.10+
LLM Runtime:     LM Studio
Vector DB:       ChromaDB
Embeddings:      sentence-transformers
Framework:       LangChain, LlamaIndex
API Server:      FastAPI, Flask
Database:        PostgreSQL, MongoDB
Monitoring:      Grafana, Prometheus
Deployment:      Docker, Kubernetes
```

---

## License

MIT License

---

**Repository:** https://github.com/raqueeb/ai_work_flow  
**Documentation:** https://aiwithr.github.io/ai_llm/
