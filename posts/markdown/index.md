---
title: Testing Markdown
---
    <!-- Bootstrap Core CSS -->
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="/css/clean-blog.min.css" rel="stylesheet">
    <!-- Custom Fonts -->
    <link href="css/font-awesome.min.css" rel="stylesheet">
    <link href='http://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>
    <!-- My CSS-->
    <link rel="stylesheet" type="text/css" href="/css/mystyle.css" />

    <!--MathJax-->
    <!--script type="text/javascript" src="http://latex.codecogs.com/latexit.js"></script-->
    <!--d3. Not necessary. Just for exploration.-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>
    <!-- jQuery -->
    <script src="/js/jquery.js"></script>
    <!-- Bootstrap Core JavaScript -->
    <script src="/js/bootstrap.min.js"></script>
    <!-- Custom Theme JavaScript -->
    <script src="/js/clean-blog.min.js"></script>
    <!-- HTML File Inclusions-->
    <!-- Cucumber. Needs jQuery. -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-timeago/1.4.1/jquery.timeago.js"></script>
    <script type="text/javascript" src="https://cdn.firebase.com/js/client/2.2.5/firebase.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/0.7.0/mustache.min.js"></script>
    <script type="text/javascript" src="/js/jquery.elastic.source.js"></script>
    <link rel="stylesheet" type="text/css" href="/css/cucumber.css">
    <script> $(function(){$("#cucumber").load("/chunks/cucumber.html");}); </script> 

    <!--other chunk inclusions-->
    <script> 
     $(function(){
       $("#includeFooter").load("/chunks/myFooter.html"); 
       $("#includeNav").load("/chunks/myNav.html"); 
     });
    </script> 
# H1 Header

|First Name|Middle Name| Last Name |
|:---------|:---------:|----------:|
|Arthur    |None| Lui       |
|Jacky     |None| Chan      |

Inline: $X'X^{-1}$

Display:
$$X'X^{-1}$$

Here is a List:

  * Styling: *Italic*, **bold**, `monospace`
  * One Bullet
  * Another bullet
    * a sub bullet
    * another sub bullet
  * Regular bullet
  * Another one
    1. Yet another sub
    2. Yet another sub

[Markdown Example](http://www.unexpected-vortices.com/sw/rippledoc/quick-markdown-example.html)

***

> Block quotes are
> written like so.
>
> They can span multiple paragraphs,
> if you like.

Use 3 dashes for an em-dash. Use 2 dashes for ranges (ex., "it's all
in chapters 12--14"). Three dots ... will be converted to an ellipsis.
Unicode is supported. ☺

~~~R
  x <- 1:5
  for (y in x) y[x] <- x + 1
  fun <- function(x) {
    #do stuff in here
  }
~~~

![example image](/img/briar.jpg "An exemplary image")

Inline math equations go in like so: $\omega = d\phi / dt$. Display
math should get its own line and be put in in double-dollarsigns:

$$I = \int \rho R^{2} dV$$

And note that you can backslash-escape any punctuation characters
which you wish to be displayed literally, ex.: \`foo\`, \*bar\*, etc.
