---
layout: post
title: This is my markdown
subtitle: Ya, it took 3 seconds.
description: Creating my first markdown page.
bannercolor: grey
previousurl: /posts/cucumber/index.html
previoustitle: Cucumber
nexturl: /index.html
nexttitle: Home
image:
---


# This is it
[Markdown Example](http://www.unexpected-vortices.com/sw/rippledoc/quick-markdown-example.html)

***


## Poetry

> I whispered, "I am too young", and then,  
> "I am old enough."  
> wherefore, I threw a penny that I might know  
> if I might love  
> 
> "Go and love,  
> go and love, young man."


## Here is some code: 

<pre style="padding:0"><code class="julia">
include("aibp.jl") 

b = inv(X'X)*(X'y)
for i in 1:10
  print("Some julia stuff")
end
</code></pre>


<pre style="padding:0"><code>
library(someRandomLibrary)

x <- 1:100
y <- NULL

for (i in 1:100) {
  y[i] <- 5 + x*2 + rnorm(1)
}
</code></pre>


## Other Stuff:

  - latex syntax conversion
      1. Greek letter: \\( \alpha \\)
      2. Inline math: \\(X'X^{-1}X'y\\)
      3. Display math: \\[X'X^{-1}X'y\\]
      4. regular letters in math mode: \\((x-a)(x-b)... (x-z) = ?\\)
  - Styles:
    - *Italics* **bold**  `monospace` 


![example image](/img/briar.jpg)
