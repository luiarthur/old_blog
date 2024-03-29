---
layout: post
title: Comparing Programming Languages for Statistics
titlesize: 2
subtitle: "Execution vs. Development Time"
description: "C / C++ / Go / Scala / Julia / R execution time vs. development time"
bannercolor: "rgb(136,48,48)"
nexttitle: Cucumber
nexturl: /posts/cucumber
previoustitle: First Blog
previousurl: /posts/startblog
---

Having used R for 3 years in college, I've gotten to know the limits and
conveniences of R. As a statistical package, with a large support community it
serves its purpose well. However, at times, especially when doing more
computation-heavy analysis, R slows down, and reaches memory limits. Hence,
I've been looking around for a language that is reasonalbly fast, and quick to
develop. Conciseness means less room for coding error (kind of) and usually
higher productivity. I checked out C, C++, Go, Scala, and Julia. And since my
computational work is usually Bayesian, I created my own criteria for judging
performance — a standard Bayesian multiple linear regression algorithm.

\\[\begin{array}{rcl}
   y|\beta & \sim & Normal(X\beta,\sigma^2I) \\\\
     \beta & \sim & Normal(0,100(X'X)^{-1}) \\\\
  \sigma^2 & \sim & Gamma(1,1) \\\\
\end{array}\\]

The simulated data used for this study can be found at my
[github](https://github.com/luiarthur/progSpeedCompare/blob/master/data/dat.txt).

So, I wasn't ever able to successfully implement this algorithm in C or Go. The
linear algebra libraries were just a pain to grind through... But I did code up
the algorithm in R, Julia, C++, and Scala. Ya, so I'm not a coding master. And
there are sites like [computer language benchmark
games](http://benchmarksgame.alioth.debian.org/u64q/compare.php?lang=scala&lang2=gpp)
that do a more thourough job. But, it's sometimes nice to try things yourself!

## Results
From the plots below, we can see that Julia seems to be fast and concise. So, I
guess I'll spend more time with Julia? Totally depends. I definitely found some
things that were non-intuitive. Loading libraries takes a while, but there are
work-arounds that I want to blog about when I get to it.

I've included the code at the bottom of this page so you can check out what I
coded.

![Speed Comparison](img/speed.svg)
<span class="caption text-muted">C++ wins in execution time.</span>
***

![Conciseness Comparison](img/lines.svg)
<span class="caption text-muted">R wins marginally in conciseness.</span>
***

![Overall Comparison](img/vs.svg)
<span class="caption text-muted">We want things to be in the bottom left quadrant &mdash;  Julia wins that one.</span>
***

## Sample Code
<div class="btn-group" role="group" aria-label="...">
  <button type="button" class="r btn btn-default">R</button>
  <button type="button" class="j btn btn-default">Julia</button>
  <button type="button" class="s btn btn-default">Scala</button>
  <button type="button" class="c btn btn-default">C++</button>
</div>

<div id="includeChosenCode"></div>

<script> 
$(document).ready(function(){
  $("button.r").click(function(){$("#includeChosenCode").load("Code/R.html");});
  $("button.j").click(function(){$("#includeChosenCode").load("Code/julia.html");});
  $("button.s").click(function(){$("#includeChosenCode").load("Code/scala.html");});
  $("button.c").click(function(){$("#includeChosenCode").load("Code/cpp.html");});
});
</script>
