---
title: 'Understanding Regularization: Why Ridge and the Lasso'
pubDate: 2026-06-23
description: 'When is too much data in machine learning a bad thing? Turns out, quite a lot. We dive into one of the many tools in a modeler''s belt to stop too much data from creating overly optimistic models through overfitting.'
author: 'Justin Groves'
image:
    url: 'understanding-regularization-why-ridge-and-the-lasso/wonder-woman-lasso.jpg'
    alt: 'Blue rope lasso hanging on a hook on a barn wall.'
tags: ["machine learning", "ai", "linear regression", "data science"]
---

Recently I've been reading up on regularization techniques.

When I was being taught linear and logistic regression in grad school, regularization was sort of thrown in there with an attitude of "you should always do this" without really explaining the full purpose and intuition.

So I took some time to figure it out. Honestly, it makes a lot of sense now. But connecting all the pieces was a non-trivial exercise. To make full sense of it you have to look at the full picture: what is linear regression, how do we actually create our models, and how do we make sure that our models aren't _too_ good.

## Linear Regression

First I had to revisit what linear regression is really doing.

I think best in terms of examples, and I like to take the example of creating a house price prediction model (my wife and I bought our first house a couple years back, so its a bit fresh on my mind). In this model, I'm trying to predict the price that a house sells at given some features (or _predictors_) about the house.

Let's use some notation to give the example some bones.

### The Fundamental Model

I'll let $Y$ be the variable I'm trying to predict; in this case house prices. I'll let $X_1, X_2, \dots, X_p$ be the features I'm trying to use to predict $Y$ (like square footage, number of bedrooms, or the presence of a movie theater basement). That gives me the following formula:

<div id="lin-reg-model">

$$
\begin{align}
    \begin{split}
    Y   &= \beta_0 + \beta_1 X_1 + \beta_2 X_2 + \dots + \beta_p X_p + \varepsilon \\
        &= \beta_0 + \sum_{i=1}^p \beta_i X_i + \varepsilon.
    \end{split}
\end{align}
$$

</div>

Here $\varepsilon$ represents the _irreducible error_ in the system. In other words, since my model isn't a perfect match for what really impacts my prediction variable $Y$, I capture that error using $\varepsilon$. I won't worry about it too much in this blog, but that's what it does.

The goal with linear regression is to estimate the values of the coefficients $\beta_i$. Since I can't ever know the true value of $\beta_i$, I use the notation $\hat{\beta}_i$ to indicate that this is an __estimated__ parameter. Then given an observation $(x_1, x_2, \dots, x_p)$ I can use my function to make a prediction $\hat{y}$. Plugging that into <a href="#lin-reg-model">$(1)$</a> represents the model that has the estimated values for $\beta_i$ like so:

<div id="est-lin-reg-model">

$$
\begin{align}
    \begin{split}
    \hat{y} &= \hat{\beta}_0 + \hat{\beta}_1 x_1 + \hat{\beta}_2 x_2 + \dots + \hat{\beta}_p x_p, \\
            &= \hat{\beta}_0 + \sum_{i=1}^p \hat{\beta}_i x_i.
    \end{split}
\end{align}
$$

</div>

The carrot-hat notation signifies that this is an _estimated_ quantity. In real-world systems I don't know the true value for $\beta_i$, so I estimate them. Similarly, $\hat{y}$ indicates that this is the _estimated_ or _predicted_ value of my variable $y$ for a given observation.

<p class="tag-line">The RSS captures the difference between the true value I want to know, and my best guess.</p>

While there are different methods for estimating my $\beta_i$, the most common is OLS, or Ordinary Least Squares. Given a dataset of observations I know about (i.e., I know the values of $X_i$ _and_ $Y$), I minimize a value called the RSS, or **Residual Sum of Squares**. The formula looks something like this:

<div id="rss-yhat"></div>

$$
\begin{align}
    \text{RSS} = \sum_{i=1}^n (y_i - \hat{y}_i)^2,
\end{align}
$$

where the subscript $i$ indicates I am summing over all known observations ($n$ of them). This means I know the value of all $X_i$ **and** $Y$ for these observations. Intuitively, I'm capturing the difference between the true value of $y$ and the predicted value $\hat{y}$. I can even plug formula <a href="#est-lin-reg-model">$(2)$</a> into formula <a href="#rss-yhat">$(3)$</a> to see the relationship between the RSS and the $\hat{\beta}_i$.

<div id="rss-beta">

$$
\begin{align}
    \begin{split}
        \text{RSS}
            &= \sum_{i=1}^n \left(y_i - \left(\hat{\beta}_0 + \hat{\beta}_1 x_1 + \hat{\beta}_2 x_2 + \dots + \hat{\beta}_p x_p\right)\right)^2, \\
            &= \sum_{i=1}^n \left(y_i - \hat{\beta}_0 - \sum_{j=1}^p \hat{\beta}_i x_i \right)^2
    \end{split}
\end{align}
$$

</div>

By minimizing equation <a href="#rss-beta">$(4)$</a> using some fancy calculus, I get estimated values for each of the $\beta_i$.

## The Curse of More Features

Now how many features is enough?

In the "more data is better" approach, I might try to find as many variables as I can to try and predict $Y$. In my house example, maybe I expand to include variables such as acreage, local crime statistics, travel time to the nearest yogurt shop, the list goes on! I might find that the more features I include the better I'll be able to predict the "true" value a house should sell for.

The problem with this approach is the way that RSS works. Because of my formulas, adding new predictors adds new factors of $\beta_i X_i$ to <a href="#lin-reg-model">$(1)$</a> and new factors of $\hat{\beta_i}x_i$ to <a href="#rss-beta">$(4)$</a>. That will always end up shrinking the RSS, resulting in what appears to be a "better" model.

<p class="tag-line">Adding new predictors will always end up "improving" the RSS</p>

What's the hurt though? Isn't the goal to minimize the RSS, reduce the difference between the true value of $y$ and the predicted value, $\hat{y}$?

Well yes, but no.

### Prediction vs. Inference

One important question I need to ask myself is what is the point of my model? Is it predictability, or inference?

If the goal of a model is __predictability__, then I don't care too much about what features my model has. I just care that it's able to perform well on unseen data, when making new predictions. In that way, adding more features can be a good thing as it can result in better overall predictions. If a feature does indeed impact the $Y$ variable I'm trying to predict, then it should be in the model. But adding in too many features not related to $Y$ introduces a lot of un-helpful noise when making a prediction. My kid's favorite stuffed toy of the week has nothing to do with houses selling and shouldn't be in my model.

On the other hand, if the goal is inference (or interpretability), then adding too many features can muddle the waters and make it hard to really understand what is going on. My estimated coefficients $\hat{\beta_i}$ give information about changes in the data, and this is really important, **relative to the other data in the model**. Too many variables will impact my ability to interpret the values for the $\hat{\beta_i}$ and understand the importance of a feature.

### Overfitting

If we add too many predictors, I'll end up **overfitting** my model. That would mean my model is overly tuned to the data that it was trained on, and will not perform well when trying to make predictions on data that it hasn't seen yet.

The real power of machine learning is to make predictions on data that it hasn't seen before. In my housing example, a good model predicting house prices could be used by real estate agents to predict what price point that they should list a new house for sale at. The important thing to note is that the house _hasn't sold yet_. In other words, I don't know the true value of $Y$! I won't know that until after the house sells. If I use too many features and overfit the model, then it will do really poorly at predicting the unknown value of $Y$. That could result in a real estate agent overpricing a house causing it to never sell, or under selling a home and causing their client to miss out on a lot of potential revenue.

So how do I avoid overfitting when we want to add all those additional features into my model? How do I identify features that end up hurting our model more than helping it? And how can I get rid of them automatically?

## Regularization

These questions get at the heart and purpose of regularization. Regularization exists to solve the problem of identifying and reducing the impact of features that don't belong in the model. In that way, regularization corrects overfitting.

The two most common forms of regularization are Ridge Regression and the Lasso.

### Ridge Regression

The idea behind Ridge regression is quite simple: penalize the model for making $\hat{\beta}_i$ too big. In other words, penalize any model that lets any given feature $X_i$ have too big of an impact on the value of our predicted variable $Y$.

To do this, I attach a <span class="text-blue-600">_penalty term_</span> to the RSS defined in formula <a href="#rss-yhat">$(3)$</a>:

<div id="rss-ridge"></div>

$$
\begin{align}
    \sum_{i=1}^n (y_i - \hat{y}_i)^2 + {\color{blue}\lambda \sum_{j=1}^p \hat{\beta}_j^2}.
\end{align}
$$

This penalty term includes two things:

- $\lambda$ - a tuning parameter ($ \geq 0$) that determines the impact of the penalty

- $\sum_{j=1}^p \hat{\beta}_j^2$ - a sum of the squared estimated values of the coefficients

Since my goal is to minimize <a href="#rss-ridge">$(5)$</a>, then larger values of $\hat{\beta}_j$ will perform **worse**. This allows me to _shrink_ the values of $\hat{\beta}_j$ towards 0. How much shrinkage can be controlled by $\lambda$. For values of $0 \leq \lambda < 1$ there will be less shrinkage because the impact of the penalty term will be less. But for $\lambda \geq 1$, there will be more shrinkage because the impact of the penalty term will be enhanced, especially as $\lambda \rightarrow \infty$.

### The Lasso

What about the Lasso? My goal is still the same: penalize the model for making $\hat{\beta}_i$ too big. But I'll use a different <span class="text-orange-400">penalty term</span> this time.

<div id="rss-ridge"></div>

$$
\begin{align}
    \sum_{i=1}^n (y_i - \hat{y}_i)^2 + {\color{orange}\lambda \sum_{j=1}^p \left|\hat{\beta}_j\right|}.
\end{align}
$$

Similar to before, the penalty term includes two things:

- $\lambda$ - a tuning parameter ($ \geq 0$) that determines the impact of the penalty

- $\sum_{j=1}^p \left|\hat{\beta}_j\right|$ - a sum of the absolute value of the estimated values of the coefficients

Just like with Ridge Regression, larger values of $\hat{\beta}_j$ will perform worse. The difference, though, is the use of the absolute value in the computation. While Ridge Regression will push the coefficients towards 0, the Lasso can actually force coefficients _to_ 0, resulting in removing some features from the model altogether!

### When to Use Ridge Regression or the Lasso?

While there might be two common approaches to regularization, the reality is that I can't use both on the same model. But knowing which one to use is fairly straightforward:

<ul>
    <li>Use Ridge Regression when <em>all</em> features should be present in the model.</li>
    <li>Use the Lasso when also wanting to perform <em>feature selection</em> and remove some features from the model.</li>
</ul>

<p class="tag-line">Regularization solves the problem of overfitting</p>

This point will often come down to domain experience. Do all the features I have in my model belong there? Or do I have some features that can be removed from the system? Answering that question will let me know which one to pick.

## Regularization: Another Tool in a Massive Belt

When I was first taught regularization, I thought it always needed to be applied. There wasn't much context or intuition given behind the approach, and that left significant gaps in my understanding and depth of knowledge.

But regularization solves a very specific problem: it helps avoid overfitting. If I'm working with a model that might have too many features, or even if all the features should stay but I need to calm down the impact of some features, then I need to give regularization a try.

Regularization is just another tool in the machine learning toolbelt. It's no magic bullet, and it won't replace solid domain understanding of the problem. But it, paired with other fundamental techniques like cross-validation, splitting into training/test data, and feature selection can help turn a good model into a great one.
