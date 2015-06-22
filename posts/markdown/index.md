---
title: Testing Markdown
---
>-H1 Header-<

    a block of stuff?
    a block of stuff?
    a block of stuff?

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

