---
title: "Building a better LLM augmented Search Engine"
date: "2025-09-17"
---

For the past month, I've been obsessed with a simple but dangerous problem: modern LLM-augmented search systems trade quality for latency.

Tools like Perplexity are fast, but that speed often comes at the cost of accuracy, trustworthiness, and depth. That's risky. If a system picks the wrong source or collapses nuance into a shallow answer, users can get misinformed quickly and confidently.

I wanted to build something different: a system where **accuracy and trustworthiness are first-class goals**, even if that means a little slower.

## The Early Missteps: RL Finetuning Adventures

Like many, my first instinct was to throw reinforcement learning at the problem.

I started experimenting with Qwen3, thinking its "thinking" in the chat template would make multi-turn RL fine-tuning hell. Models like Qwen3-4B-Instruct-2507 struggled with basic instruction following, they wouldn't diversify queries, and they ignored answer templates entirely.

Switching to the Qwen3.5 series didn't help much. Even larger models like Qwen-2.5-32B produced basic tool-calling errors. Training showed brief hope (reward climbing), but then collapsed and plateuaed. It became clear: **RL alone wasn't going to cut it without strong SFT foundations**.

That realization led to another roadblock: I needed thousands of high-quality supervised traces. But generating them was financially out of reach, especially since I'd need both SFT and RL runs, plus evals later. After some sunk GPU costs (and a few movies to clear my head), I stepped back.

## The Reset: Orchestration Over Training
The question I had to ask myself was: **why was I ashamed of just orchestrating GPT calls?**

Training your own model sounds glamorous, but orchestration is often the more pragmatic path. So I pivoted: instead of RL finetuning, I built a plain GPT-5 agent hooked up to web search via Exa AI.

At first, the outcome was disappointing. Exa's neural embedding retrieval often surfaced irrelevant or outdated pages, while their Gemini Flash summaries frequently mis-parsed key details. On top of that, GPT-5 would lazily call one or two searches, skim results, and declare itself done.

That failure was instructive: the problem wasn't them LLM per se, but the research process itself.

## Thinking Like a Human Researcher
When we research online, we don't stop at one search. We try multiple phrasings, open several tabs in parallel, read through entire articles, cross-check across sources, and then synthesize.

So why not replicate that exact workflow using an LLM and Python? A state machine.

### The State Machine
- Generate Queries Node:
  - Given the user query, reason about intent, fill gaps, and generate several diverse search queries.
  - Too many queries (5-6+) leads to superficial diversification. Too few (1-2) just restate the question.
  - The sweet spot: **3-4 well-reasoned queries**.
- Retrieve & Summarize Node:
  - Run all queries in parallel through Exa AI.
  - Rerank results with simple heuristics (sometimes even without LLM intervention).
  - Instead of relying on Exa's summaries, use **GPT-5-Nano to summarize full pages** relative to original query.
  - Each summary explicitly mentions the details it found relevant or not.
- Final Answer Node:
  - Take the user query + all snippets/summaries.
  - Reason over them to construct a grounded answer.
  - Depending on preference, highlight multiple corroborating sources or elevate one authoritative, recent source.
  - Always expose reasoning traces for transparency.
  - If information is insufficient, say “I don’t know”.

This pipeline mirrors how humans actually search: broad exploration, careful reading, then reasoned synthesis.

## The Role of Reasoning: Concise > Exhaustive
One surprising lesson was about reasoning depth.

- High reasoning effort: the model overthinks, tries to solve the whole problem in the `generate_queries` step, and skips the pipeline.
- Minimal reasoning: outputs shallow restatements, with no real expansion.
- Concise reasoning (“low” effort): the sweet spot. Enough reasoning to generate useful queries, but not so much that the system derails.

More test-time compute didn’t mean better results. Concise reasoning actually increased accuracy.

## Benchmarking Against SOTA
It's easy to claim you've built something better - but proof requires evals.

I choose the `vtllms/sealqa` benchmark, `seal-0` subset. It's 111 queries spanning diverse backgrounds. Before running experiments, I went through the queries myself just to get a sense of their difficulty.

What I found was shocking: SOTA agentic search systems perform abysmally here.

- OpenAI o3 and Gemini 2.5 Pro struggled, both under 20% accuracy.
- xAI Grok-4 topped out at just 20.7%.

My approach using GPT-5-mini as a strict judge, hit 38/111 = ~34% accuracy. That's a huge relative gain. Even if a few ground truths in the benchmark are debatable, the result is clear: **structured orchestration beats brute-force agentic search**.

![Benchmark Results](https://github.com/user-attachments/assets/2b53dad3-d26d-4729-93e2-0bce39f9a2c1)

## knobs, Controls, and Next Steps
One of the strengths of this system is how tunable it is:
- Adjust reasoning effort.
- Control number of search queries generated.
- Vary the number of pages retrieved per query.

There’s also a clear path to more accuracy:
- Add confidence estimation when constructing the final answer.
- If confidence is low, automatically trigger retries with fresh queries focused on knowledge gaps.
- This loop should push accuracy significantly higher across the benchmark.

## Closing Thoughts
In just 2-3 days of sys eng mode thought, no fine-tuning, no massive datasets, no expensive RL runs, we outperformed SOTA LLM search agents on a good benchmark.

The takeaway? Sometimes the best way forward isn't more training, but better orchestration. Mimicking how humans actually research: casting a wide net, reading carefully, and reasoning concisely. This goes a long way.

Transparency matters. Trustworthiness matters. And if that means a little more latency, that’s a tradeoff worth making.

For some transparency on my side, you can see the eval sheet here: [Think-a-Tron/atreya](https://github.com/Think-a-Tron/atreya)
