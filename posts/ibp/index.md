---
layout: temperature
---

###aIBP Draws (NEW15):
Some text 1 2 3 4 5

* \\(\small
      D = 
      \left(
        \begin{array}{rrrr}
          0.0 & 1.1 & 1.2 & 1.3 \\\\
          1.1 & 0.0 & 1.4 & 1.5 \\\\
          1.2 & 1.4 & 0.0 & 1.6 \\\\
          1.3 & 1.5 & 1.6 & 0.0
        \end{array}
      \right)
      \\)
* \\(\alpha= \small 1\\)
* \\(\sigma= \small (1,2,3,4)\\)

***

<script src="http://d3js.org/d3.v3.js" ></script>
<script src="/js/multilineplot.js"></script>
<link rel="stylesheet" type="text/css" href="/css/multilineplot.css" />
<script type="text/javascript">
  draw("demoDat.tsv","tau",0,10,0,.4);
</script>

###Some other comments
