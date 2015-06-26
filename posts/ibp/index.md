---
layout: temperature
title: aibp test
alpha: "\\( \\alpha=1 \\)"
sigma: "\\( \\sigma=(1,2,3,4)\\)"
D: "\\(\\small
      D = 
      \\left(
        \\begin{array}{rrrr}
          0.0 & 1.1 & 1.2 & 1.3 \\\\
          1.1 & 0.0 & 1.4 & 1.5 \\\\
          1.2 & 1.4 & 0.0 & 1.6 \\\\
          1.3 & 1.5 & 1.6 & 0.0
        \\end{array} \\right) \\)"
image:
---

***

<div id="mlPlot""></div>
<script type="text/javascript">
  draw("demoDat.tsv","tau","#mlPlot");
</script>
