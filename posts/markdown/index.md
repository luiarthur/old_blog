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


# Test it
[Markdown Example](http://www.unexpected-vortices.com/sw/rippledoc/quick-markdown-example.html)

***


## Brown Penny

> I WHISPERED, 'I am too young,'  
> And then, 'I am old enough';  
> Wherefore I threw a penny  
> To find out if I might love.  
> 'Go and love, go and love, young man,  
> If the lady be young and fair.'  
> Ah, penny, brown penny, brown penny,  
> I am looped in the loops of her hair.  
> O love is the crooked thing,  
> There is nobody wise enough  
> To find out all that is in it,  
> For he would be thinking of love  
> Till the stars had run away  
> And the shadows eaten the moon.  
> Ah, penny, brown penny, brown penny,  
> One cannot begin it too soon.   
>
> *William Butler Yeats*

## R code: 

{% highlight R linenos %}
library(someRandomLibrary)

x <- 1:100
y <- NULL

for (i in 1:100) {
  y[i] <- 5 + x*2 + rnorm(1)
}
{% endhighlight %}


## Other Stuff:

  - latex syntax conversion
      1. Greek letter: \\( \alpha \\)
      2. Inline math: \\(X'X^{-1}X'y\\)
      3. Display math: \\[X'X^{-1}X'y\\]
      4. regular letters in math mode: \\((x-a)(x-b)... (x-z) = ?\\)
  - Styles:
    - *Italics* **bold** `monospace` 

## Latex matrix
\\[\left(
  \begin{array}{rrrr}
    1 & 2 & 3 & 4 \\\\
    5 & 6 & 7 & 8 \\\\
  \end{array}
\right)\\]

## Here is an image
![example image](/img/briar.jpg)

## [You can view the markdown file here](https://github.com/luiarthur/luiarthur.github.io/blob/master/posts/markdown/index.md)
