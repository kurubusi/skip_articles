# kurubusi.skip_articles

## Overview
It skips.

## Installation

1. Reading file
```html
   <head>
      …
      <script type="text/javascript" src="kurubusi.skip_articles_pkg.js"></script>
      …
   </head>
```


2. Class is attached to the object used as a switch. 
```html
    <article>
    …
    <img src="button.png" class="k_sas_b" data-sas-group="group1" width="100" height="72" alt="skips" />
    …
</article>
```
* `class="k_sas_b"`        **indispensable**
* `data-sas-group="group1"`        **option**


3. class is attached to a target.
```html
   <span class="k_sas_w" data-sas-group="group1" data-sas-order="2">taeget</span>
```
* `class="k_sas_w"`        **indispensable**
* `data-sas-group="group1"`        **option**  
* `data-sas-order="2"`        **option**  

## Sample

[KURUBUSI.net](http://kurubusi.net/products/sample/kurubusi-skip_articles_sample-2/)
[KURUBUSI.net](http://kurubusi.net/products/sample/kurubusi-skip_articles_sample/)
