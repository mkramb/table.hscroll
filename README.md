# Table Hscroll

Scroll table horizontally.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/mkramb/table.hscroll/master/dist/table.hscroll.min.js
[max]: https://raw.github.com/mkramb/table.hscroll/master/dist/table.hscroll.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/table.hscroll.min.js"></script>
<script>
jQuery(function($) {
  var table = $('table:first');
  table.hscroll();

  if (table.hscroll('canMove')) {
    table.hscroll('moveLeft');
    table.hscroll('moveRight');
  }
});
</script>
```
