---
layout: post
bannercolor: "#2D782D"
descriptions: "Cucumber, a simple minimalist commenting system, open source, and still in development..."
title: Cucumber
subtitle: A Minimalist Commenting System
---

Cucumber is a minimalist commenting system. It is still in the works...  As of
today (27 May, 2015), users can login via Facebook, Google, or Github, and
leave, edit and remove comments. It's open source so you can modify features as
needed. Cucumber uses Firebase to store data. For users who have not used
Firebase before, I have posted a tutorial to teach you how to set up your own
cucumber-firebase commenting system. Eventually, I would love to add inline
commenting, like, flag, reply, notification, as well as image / video posting
capabilities.

While there are other (more developed) commenting systems like Disqus, I wanted
something more minimalist and malleable. I also feel that users should be able
to comment using the common social media apps already existing.

Feel free to leave me a comment...

***

# Tutorial
To use cucumber, you will first need (1) a Firebase account, and (2) Facebook /
Google / Github apps. Then, all you need to do is reference the relevant
javascript and css files. I will walk you through the set-up of the firebase
account and google app, and direct you to a github repository for a simple
demo.

## Firebase Account
If you don't already have one, you should first set up a [firebase
account](https://www.firebase.com/login/). Firebase is a realtime database that
allows users to easily authenticate through Facebook, Google, Github, Twitter,
or email and password.
<div><img class='eg'src='img/firelogin.png'></div>

## Firebase App
Next, you should create a firebase app. It is as simple as setting up an email
account. Just go to your firebase account and look for this page:
<div><img class='eg'src='img/fireapp.png'></div>

Then in the "CREATE NEW APP" box, and under App Names, type a name for your app (e.g. 'mycucumberapp'). The App URL will be automatically filled in for you.

## Firebase Rules
Firebase rules protect users data from other users. For example, by specifying a
set of rules, you can allow authenticated users to write comments, and edit
their own comments, and prevent users from editing other users' comments. The
set of rules I used are:

<div id="cucumberRules"></div>

To add rules, just navigate to "Security and Rules" tab, on your app, and paste
the rules. My rules allow the world to view comments, but only authenticated
users can write comments. Furthermore, you can only edit and remove your own
comments.
<div><img class="eg" src="img/rules.png"></div>

<script>$(document).ready(function(){$("#cucumberRules").load("cucumberRules.html");});</script>

