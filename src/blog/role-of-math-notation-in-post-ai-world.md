---
title: 'The Role of Mathematical Notation in a Post-AI World'
pubDate: 2026-08-18
description: 'Math notation mistakes are one of the most common ways that college students lose points, and a constant bane to any math instructor. What does the future hold for these simple repeated mistakes in an AI-dominated world?'
author: 'Justin Groves'
image:
    url: 'role-of-math-notation-in-post-ai-world/math-notation.jpg'
    alt: 'A magnifying glass focusing on mathematical equations in a textbook, symbolizing detailed study..'
tags: ["ai", "math education"]
---

When I was working on my doctorate at The University of Tennessee, I taught a wide variety of math courses ranging from first semester freshmen up to early sophmores. And during that time, one of the most frequent items I would see students lose marks for is bad math notation.

Take for example L'Hopital's rule. It's a staple of any Calculus II curriculum. It combines the notion of fractions, limits, derivatives, and the ever-confusing indeterminate form. But when writing a limit and using L'Hopital's rule, there are some strict requirements to be *mathematically* correct. For example, take the expression

<div id="lhopital-example">

$$
\begin{align*}
    \begin{split}
        \lim_{x \rightarrow 0} \frac{\sin{(x)}}{x}.
    \end{split}
\end{align*}
$$

</div>

This is a classic exercise that benefits of L'Hopital's rule, with $\sin{(0)} = 0$ so the expression evaluations to $0/0$ at $x = 0$, an indeterminate form. After establising that, a formal writeup might look like the following:

<div id="lhopital-example-solved">

$$
\begin{align*}
    \begin{split}
        \lim_{x \rightarrow 0} \frac{\sin{(x)}}{x} &= \lim_{x \rightarrow 0} \frac{\cos{(x)}}{1} = \cos{(0)} = 1.
    \end{split}
\end{align*}
$$

</div>

Often though, I would see notation like this:

<div id="lhopital-example-bad-notation">

$$
\begin{align*}
    \begin{split}
        \lim_{x} \frac{\sin{(x)}}{x} &= \frac{\cos{(x)}}{1} = \cos{(0)} = 1.
    \end{split}
\end{align*}
$$

or worse,

$$
\begin{align*}
    \begin{split}
        \frac{\sin{(x)}}{x} &= \frac{\cos{(0)}}{1} = 1.
    \end{split}
\end{align*}
$$

</div>

In the first example, the limit notation $\lim_{x \rightarrow 0}$ is abused, with the first expression dropping the value that the limit is approaching, and then the limit notation is completely dropped after applying L'Hopital's Rule. In the second example, the limit notation is nowhere to be found, so claiming that each subsequent expression is "equal" is completely false!

Unfortunately, these issues are not apparent to young math professionals, and without proper explaination as to *why* the notation is wrong, can result in them feeling more frustrated for getting the **right** answer but still losing points. And in a post-AI world, I worry that this confusion is only growing.

Take, for example, this output from Copilot, Microsoft's flagship AI-product powered by large language models (LLMs). When asking it for assistance to explain L'Hopital's Rule with correct formatting, it gave me the following example:

<div id="lhopital-example-copilot">

$$
\begin{align*}
    \begin{split}
        \lim_{x \rightarrow \infty} \frac{e^x}{x^3}.
    \end{split}
\end{align*}
$$

</div>

This is again, a classic L'Hopital example as $\lim_{x \rightarrow \infty} e^x = \infty$ and $\lim_{x\rightarrow \infty} x^3 = \infty$, giving us the $\infty/ \infty$ indeterminate form. But as a solution, Copilot says you can do the following:

"Apply L'Hopital's rule three times:

<div id="lhopital-example-copilot-solution">

$$
\begin{align}
    \begin{split}
        \frac{e^x}{x^3} \rightarrow \frac{e^x}{3x^2} \rightarrow \frac{e^x}{6x} \rightarrow \frac{e^x}{6}.
    \end{split}
\end{align}
$$

</div>

Final limit: $\infty$."

The problem is that while the approach is correct, the writeup is wrong. Any student after taking their first proofs course knows that the right arrow is reserved for *implies* statements, as in $A \rightarrow B$ means that $A$ implies $B$. While reading, you could literally replace the arrow with the phrase "implies that". But in <a href="#lhopital-example-copilot-solution">$(1)$</a>, our "statements" are just fractions. We're not making a statement about the limit as $x$ approaches $\infty$, we're just saying one fraction implies the other. That is not rigourous enough for a college mathematics classroom.

When pressed on this, Copilot did admit that the formatting it provided me was not rigorous notation, and that if had taken points off, it would have been justified. Of course, if I was a student asking for help on homework or further understanding a concept, I wouldn't have known that the notation wasn't rigorous.

## So What?

Granted, as an isolated case, this may not seem like so big of a deal. Some math instructors may choose to accept Copilot's output with full marks (whether they should is a separate debate, but practically speaking, some will). But this example can serve as a canary in a coal mine.

Despite claims warning about excessive use of AI tools, young professionals are being given two very different realities. On the one hand, they are warned of the adverse effects of using AI to do their work or learning as it might <a href="hechingerreport.org/proof-points-ai-eroding-math-skills/">offload cognitive work</a>. But at the same time, more companies are looking for AI skills in their employees. Job postings containing AI terms <a href="https://data.indeed.com/#/ai">have grown over 300% in the last 5 years </a>. The lesson that the market is teaching young professionals is that AI skills are not optional.

How does this relate to math notation, however? Well, as more people make use of AI support tools, they are more likely to adopt the notation provided to them. <a href="https://www.ciodive.com/news/daily-ai-users-job-security/828198/">Over 30% of workers use AI daily</a>; that is a non-trivial group susceptible to its loose and unregulated standards.
