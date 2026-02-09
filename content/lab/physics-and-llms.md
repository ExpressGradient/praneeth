---
title: "Physics and LLMs Can Be Friends?"
date: "2025-05-05"
---

A few weeks ago, if you'd asked me what "advantage" means in reinforcement learning, I'd probably have just shrugged. Today, I'm casually dropping terms like Group Relative Policy Optimization (GRPO) as if I've known them forever—and somehow built a decent physics solver using Large Language Models (LLMs) along the way. All this happened over a couple of weekends and cost me less than what you'd spend on a pizza night.

### Step 1: Getting Friendly with RL

It all started with DeepSeek’s paper on **GRPO**, a clever trick that optimizes policy without a separate value network—basically, just pick the best from a bunch of actions and reinforce that. But first, I had to figure out what the heck "advantage" actually meant.

Enter Hado van Hasselt’s DeepMind RL lectures. Seriously, this guy's explanations are the gold standard—clear, practical, and somehow entertaining enough to keep my attention through math.

### Step 2: HuggingFace's TRL to the Rescue

Then came HuggingFace’s **TRL library**, packed with user-friendly trainers and some fancy plugins like vLLM for faster inference, plus Liger-kernels and Flash Attention for extra speed. Suddenly, everything felt doable—and fast.

### Step 3: The Initial Struggle Was Real

My first idea was to keep it simple, inspired by DeepSeek’s R1-Zero—solve a physics problem, get it right, earn a +1 reward. Sounds easy, right? Nope. Turns out my base model (Qwen3-1.7B) couldn't handle even the basics reliably, so it was back to the drawing board.

### Step 4: Fine-Tuning (and Some Hope)

To beef things up, I curated about 1,500 physics problems across multiple domains like electromagnetism, acoustics, and kinematics—you know, the usual physics suspects.

Next, I gave my struggling Qwen model a crash course in physics via supervised fine-tuning (SFT). In just about 20 minutes on a single H-100 GPU, the model’s performance drastically improved—like cramming before an exam and actually remembering stuff. Loss dropped impressively from 0.7 down to around 0.2-0.3.

### Step 5: One-Shot RL with GRPO (Magic Happens!)

With a slightly smarter model in hand, I moved onto RL—this time with the cool-sounding GRPO technique. Inspired by the idea of "one-shot RLVR" (sounds fancy, right?), I chose a medium-difficulty problem—not too tough, but enough to challenge the model.

Reward scores shot up dramatically, from a measly 0.05 to 0.8 within just 70 iterations. And just like that, over a weekend and about \$10 later (half on dataset prep, half on GPUs), my LLM physics solver was up and running.

### Check it Out

You can actually play with this physics solver now—it's on HuggingFace: [think-a-tron/raman-01-1.7B](https://huggingface.co/think-a-tron/raman-01-1.7B).
