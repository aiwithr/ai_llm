Length: 74908
<article class="md-content__inner md-typeset">
# AI Software Development Life Cycle (AI-SDLC)
*A systematic approach to building intelligent systems*
---
## The AI-SDLC Framework
Unlike traditional software development, AI projects have unique challenges:
- **Data dependency**: Quality outputs depend on quality inputs
- **Probabilistic outputs**: Results vary based on model confidence
- **Continuous learning**: Models need to adapt and retrain
- **Evaluation complexity**: "Correct" is subjective in ML
<pre class="mermaid"><code>flowchart TD
    A[1. Problem Definition] --> B[2. Data Collection]
    B --> C[3. Data Preparation]
    C --> D[4. Feature Engineering]
    D --> E[5. Model Training]
    E --> F[6. Evaluation]
    F -->|Not Satisfied| G[Iterate]
    G --> D
    F -->|Satisfied| H[7. Deployment]
    H --> I[8. Monitoring]
    I -->|Drift Detected| A
    style A fill:#e3f2fd
    style H fill:#c8e6c9
    style I fill:#fff3e0</code></pre>
## Phase-by-Phase Breakdown
### Phase 1: Problem Definition
<p>**Traditional**: Write requirements document
**AI-Driven**: Define the ML problem type</p>
<table>
<thead>
<tr>
<th>Problem Type</th>
<th>Example</th>
<th>Output</th>
</tr>
</thead>
<tbody>
<tr>
<td>**Classification**</td>
<td>Spam detection</td>
<td>Category label</td>
</tr>
<tr>
<td>**Regression**</td>
<td>Price prediction</td>
<td>Continuous value</td>
</tr>
<tr>
<td>**Clustering**</td>
<td>Customer segmentation</td>
<td>Group assignment</td>
</tr>
<tr>
<td>**Generation**</td>
<td>Chatbot responses</td>
<td>Text content</td>
</tr>
</tbody>
</table>
<p>**Key Questions:**
- What decision will the AI assist with?
- What data is available?
- What does "correct" look like?
- How will errors be handled?</p>
### Phase 2: Data Collection
**The most critical phase** - Garbage in, garbage out.
<pre class="mermaid"><code>flowchart LR
    A[Raw Data Sources] --> B[Internal DBs]
    A --> C[APIs]
    A --> D[User Feedback]
    A --> E[Public Datasets]
    A --> F[Web Scraping]
    B --> G[Data Lake]
    C --> G
    D --> G
    E --> G
    F --> G
    style G fill:#fff3e0</code></pre>
<p>**Data Quality Checklist:**
- [ ] Sufficient volume (thousands of examples minimum)
- [ ] Labeled data for supervised learning
- [ ] No systematic biases
- [ ] Representative of productionåœºæ™¯
- [ ] Privacy-compliant</p>
### Phase 3: Data Preparation
Cleaning and transforming data for ML.
``
<span id="__span-0-1"><a id="__codelineno-0-1" name="__codelineno-0-1" href="#__codelineno-0-1"></a><span class="c1"># Example: Data preparation pipeline</span>
</span><span id="__span-0-2"><a id="__codelineno-0-2" name="__codelineno-0-2" href="#__codelineno-0-2"></a><span class="k">def</span><span class="w"> </span><span class="nf">prepare_data</span><span class="p">(</span><span class="n">raw_data</span><span class="p">):</span>
</span><span id="__span-0-3"><a id="__codelineno-0-3" name="__codelineno-0-3" href="#__codelineno-0-3"></a>    <span class="c1"># Remove duplicates</span>
</span><span id="__span-0-4"><a id="__codelineno-0-4" name="__codelineno-0-4" href="#__codelineno-0-4"></a>    <span class="n">data</span> <span class="o">=</span> <span class="n">remove_duplicates</span><span class="p">(</span><span class="n">raw_data</span><span class="p">)</span>
</span><span id="__span-0-5"><a id="__codelineno-0-5" name="__codelineno-0-5" href="#__codelineno-0-5"></a>
</span><span id="__span-0-6"><a id="__codelineno-0-6" name="__codelineno-0-6" href="#__codelineno-0-6"></a>    <span class="c1"># Handle missing values</span>
</span><span id="__span-0-7"><a id="__codelineno-0-7" name="__codelineno-0-7" href="#__codelineno-0-7"></a>    <span class="n">data</span> <span class="o">=</span> <span class="n">fill_missing</span><span class="p">(</span><span class="n">data</span><span class="p">,</span> <span class="n">strategy</span><span class="o">=</span><span class="s1">'mean'</span><span class="p">)</span>
</span><span id="__span-0-8"><a id="__codelineno-0-8" name="__codelineno-0-8" href="#__codelineno-0-8"></a>
</span><span id="__span-0-9"><a id="__codelineno-0-9" name="__codelineno-0-9" href="#__codelineno-0-9"></a>    <span class="c1"># Normalize features</span>
</span><span id="__span-0-10"><a id="__codelineno-0-10" name="__codelineno-0-10" href="#__codelineno-0-10"></a>    <span class="n">data</span> <span class="o">=</span> <span class="n">normalize</span><span class="p">(</span><span class="n">data</span><span class="p">,</span> <span class="n">columns</span><span class="o">=</span><span class="p">[</span><span class="s1">'price'</span><span class="p">,</span> <span class="s1">'quantity'</span><span class="p">])</span>
</span><span id="__span-0-11"><a id="__codelineno-0-11" name="__codelineno-0-11" href="#__codelineno-0-11"></a>
</span><span id="__span-0-12"><a id="__codelineno-0-12" name="__codelineno-0-12" href="#__codelineno-0-12"></a>    <span class="c1"># Split for evaluation</span>
</span><span id="__span-0-13"><a id="__codelineno-0-13" name="__codelineno-0-13" href="#__codelineno-0-13"></a>    <span class="n">train</span><span class="p">,</span> <span class="n">test</span> <span class="o">=</span> <span class="n">split_data</span><span class="p">(</span><span class="n">data</span><span class="p">,</span> <span class="n">test_size</span><span class="o">=</span><span class="mf">0.2</span><span class="p">)</span>
</span><span id="__span-0-14"><a id="__codelineno-0-14" name="__codelineno-0-14" href="#__codelineno-0-14"></a>
</span><span id="__span-0-15"><a id="__codelineno-0-15" name="__codelineno-0-15" href="#__codelineno-0-15"></a>    <span class="k">return</span> <span class="n">train</span><span class="p">,</span> <span class="n">test</span>
</span>
``n
### Phase 4: Feature Engineering
Transform raw data into model-friendly format.
<table>
<thead>
<tr>
<th>Raw Data</th>
<th>Feature</th>
<th>Why?</th>
</tr>
</thead>
<tbody>
<tr>
<td>"2024-01-15"</td>
<td>day_of_week=2</td>
<td>Patterns vary by day</td>
</tr>
<tr>
<td>"[user@example.com](mailto:user@example.com)"</td>
<td>is_corporate=True</td>
<td>Business vs personal</td>
</tr>
<tr>
<td>1234.56</td>
<td>log(price)=7.12</td>
<td>Normalize distribution</td>
</tr>
</tbody>
</table>
### Phase 5: Model Training
<pre class="mermaid"><code>flowchart TD
    A[Training Data] --> B[Choose Algorithm]
    B --> C{Task Type?}
    C -->|Classification| D[Random Forest, XGBoost, Neural Net]
    C -->|Regression| E[Linear, Gradient Boosting]
    C -->|Text| F[LLM, Transformer]
    D --> G[Train Model]
    E --> G
    F --> G
    G --> H[Hyperparameter Tuning]
    H --> I[Trained Model]
    style G fill:#c8e6c9</code></pre>
<p>**Algorithms for Citizen Developers:**
- **scikit-learn**: Beginner-friendly ML library
- **LangChain**: LLM integration for text tasks
- **LM Studio**: Local inference for privacy</p>
### Phase 6: Evaluation
**Critical difference from traditional testing:**
<pre class="mermaid"><code>flowchart LR
    A[Test Set Predictions] --> B{Compare to Ground Truth}
    B --> C[Metrics]
    C --> D[Accuracy] & E[Precision] & F[Recall]
    D --> G{Satisfactory?}
    E --> G
    F --> G
    G -->|No| H[Analyze Errors]
    H --> I[Feature Engineering / Retrain]
    G -->|Yes| J[Approve Model]
    style J fill:#c8e6c9</code></pre>
**Evaluation Metrics:**
<table>
<thead>
<tr>
<th>Metric</th>
<th>Use Case</th>
<th>Good Value</th>
</tr>
</thead>
<tbody>
<tr>
<td>**Accuracy**</td>
<td>Balanced classes</td>
<td>>90%</td>
</tr>
<tr>
<td>**Precision**</td>
<td>Minimize false positives</td>
<td>>85%</td>
</tr>
<tr>
<td>**Recall**</td>
<td>Don't miss true cases</td>
<td>>85%</td>
</tr>
<tr>
<td>**F1 Score**</td>
<td>Balance precision/recall</td>
<td>>80%</td>
</tr>
</tbody>
</table>
### Phase 7: Deployment
<pre class="mermaid"><code>flowchart TD
    A[Trained Model] --> B[Export Model]
    B --> C[API / Service]
    C --> D[Streamlit UI]
    D --> E[Production Users]
    style D fill:#c8e6c9</code></pre>
<p>**For this project:**
``
<span id="__span-1-1"><a id="__codelineno-1-1" name="__codelineno-1-1" href="#__codelineno-1-1"></a><span class="c1"># Using LangChain with local LLM</span>
</span><span id="__span-1-2"><a id="__codelineno-1-2" name="__codelineno-1-2" href="#__codelineno-1-2"></a><span class="kn">from</span><span class="w"> </span><span class="nn">langchain_openai</span><span class="w"> </span><span class="kn">import</span> <span class="n">ChatOpenAI</span>
</span><span id="__span-1-3"><a id="__codelineno-1-3" name="__codelineno-1-3" href="#__codelineno-1-3"></a>
</span><span id="__span-1-4"><a id="__codelineno-1-4" name="__codelineno-1-4" href="#__codelineno-1-4"></a><span class="n">llm</span> <span class="o">=</span> <span class="n">ChatOpenAI</span><span class="p">(</span>
</span><span id="__span-1-5"><a id="__codelineno-1-5" name="__codelineno-1-5" href="#__codelineno-1-5"></a>    <span class="n">base_url</span><span class="o">=</span><span class="s2">"http://localhost:1234/v1"</span><span class="p">,</span>
</span><span id="__span-1-6"><a id="__codelineno-1-6" name="__codelineno-1-6" href="#__codelineno-1-6"></a>    <span class="n">model</span><span class="o">=</span><span class="s2">"qwen2.5:1.5b"</span>
</span><span id="__span-1-7"><a id="__codelineno-1-7" name="__codelineno-1-7" href="#__codelineno-1-7"></a><span class="p">)</span>
</span>
``n</p>
### Phase 8: Monitoring
**AI systems require ongoing attention:**
<pre class="mermaid"><code>flowchart LR
    A[Production] --> B[Monitor Predictions]
    B --> C{Quality OK?}
    C -->|Yes| D[Continue]
    C -->|Drift| E[Retrain Model]
    C -->|Drift| F[Re-label Data]
    E --> G[New Model Version]
    F --> G
    G --> A
    style E fill:#ffcccc
    style F fill:#ffcccc</code></pre>
<p>**Monitoring Metrics:**
- Prediction distribution
- User satisfaction ratings
- Error rate trends
- Data drift detection</p>
## MLOps: The AI Equivalent of DevOps
<pre class="mermaid"><code>flowchart TD
    subgraph Development
        A[Data] --> B[Train]
        B --> C[Test]
        C --> D[Register]
    end
    subgraph Deployment
        D --> E[Stage]
        E --> F[Production]
    end
    subgraph Monitoring
        F --> G[Monitor]
        G --> H[Compare]
        H -->|Below threshold| I[Retrain]
        I --> A
    end
    style G fill:#fff3e0
    style H fill:#fff3e0</code></pre>
<p>**Key MLOps Practices:**
1. **Version control** - Models, data, code
2. **Automated pipelines** - Train â†’ Test â†’ Deploy
3. **A/B testing** - Compare model versions
4. **Rollback capability** - Revert to previous model</p>
---
## Practical Application in This Project
The modules in this documentation follow AI-SDLC:
<table>
<thead>
<tr>
<th>Module</th>
<th>AI-SDLC Phase</th>
</tr>
</thead>
<tbody>
<tr>
<td>**ISP Classifier**</td>
<td>Data â†’ Train â†’ Evaluate</td>
</tr>
<tr>
<td>**Qwen + RAG**</td>
<td>Knowledge â†’ Embed â†’ Retrieve</td>
</tr>
<tr>
<td>**MLOps Pipeline**</td>
<td>Monitor â†’ Trigger â†’ Retrain</td>
</tr>
</tbody>
</table>
---
## Next Steps
- [Citizen Developer Guide](../citizen-developers/) - How to apply AI-SDLC without deep ML expertise
- [ISP Classifier](../../isp-classifier/) - See AI-SDLC in action
              </article>
