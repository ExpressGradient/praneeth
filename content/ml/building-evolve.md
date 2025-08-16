---
title: "Replicating AlphaEvolve"
date: "2025-05-19"
---

So Deepmind dropped AlphaEvolve - a Gemini powered agent that uses LLMs to evolve better algorithms. Think matrix multiplication, fast attention... basically, a nerd paradise.

I was awestruck. Sat frozen for an hour. Then I did what any sane person would do.

Opened ChatGPT and asked, "how was it built?"

Crickets.

Turned out Deepmind didn't release any details. No code. No paper. Just buzzwords like "evolutionary search."

Fine. I'll do it myself. (Thanos aaaaaahhhhh)

## Descent into Genetic Programming

Found the Field Guide to Genetic Programming. Breezed through the essentials:
- Population of programs
- Fitness functions
- Tournament selection
- Crossover (ignored, obviously)
- Mutation (my true love, and also what AlphaEvolve used)

Also went down a rabbit hole on Pareto fronts and NSGA-II. Multi objective optimization sounded cool and made me feel like I was doing science.

## First Attempt: Fast Fourier Foolery
Whipped up a script to evolve Fast Fourier Transform implementations.
- Objective? Speed
- LLM? GPT-4.1
- Result? It got faster

...but only because it returned the input. No FFT. Just `return a`.

I stared blankly. Then punched myself in the face. Deserved.

## Second Attempt: Accuracy enters the chat
Added accuracy as a second objective. Now we're doing real evolution right?

Wrong.

Ran 50, 100, 200 generations. Nothing improved. The LLM was spitting garbage, sometimes not even valid python. Despite giving it function signatures and warm hugs.

Then I found the `prediction` parameter in the OpenAI's API. You can nudge the LLM to follow a previous example. So I fed it that last mutation. It helped. A bit.

But now it was mostly just rediscovering slightly better existing solutions. Maybe deepmind ran theirs for days. I ran mine for a few minutes and went to bed defeated.

## Can you see the Matrix?
New day, new dumb idea. Let's evolve matrix multiplication instead.

Started with GPT-4.1 making freeform mutations.

Results? Errors. Broken logic. Code that didn't even run. Great job, me.

So I enforced mutation strategies. Real ones:
- Reorder loops
- Apply loop tiling
- Add blocking
- Vectorize inner loop

Finally got some good mutations.

But guess what? Every candidate just used `np.dot` or `a@b`.

I had been reward-hacked hard.

Every single one of them discovered that if you just delegate to numpy, you win the benchmark. Technically correct. Ethically illegal.

So I banned the cheats. No `np.dot`, `a@b` and `np.einsum`. Just you, me, and raw loops.

And then it worked. Slowly, painfully, but it evolved a matrix multiplication routine faster than the seeds and didn't cheat.

I almost cried.

## Cursed Implementation Details
Here's what this Frankenstein system actually does:
- Maintains a population of matrix multiplication implementations
- Mutates them via GPT-4.1 using one of many predefined strategies
- Uses a multi-objective fitness function
  - Speed
  - Accuracy
- Runs NSGA style pareto selection with crowding distance to keep diversity
- Ages individuals and replaces them with mutated offspring + random immigrants
- Evaluates each candidate via importlib, runs it on benchmark sizes 128x128 and 256x256, and filters garbage.

Here's the code if you want to read it, clone it, run it, or regret your life choices: [GitHub](https://github.com/think-a-tron/evolve)

If you see me doing crossover next week or trying to evolve merge sort, please stop me. This rabbit hole has no end.

Kthnxbye.
