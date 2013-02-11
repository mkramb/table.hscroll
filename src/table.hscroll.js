/*
 * table.hscroll
 * https://github.com/mitja/table.hscroll
 *
 * Copyright (c) 2013 Mitja Kramberger
 * Licensed under the MIT license.
 */

(function($) {
  var rows = [];
  var stack = [];

  var settings = {
    'ignore' : '.ignore',
    'max' : 4
  };

  var methods = {
    initialize: function(options) {
      settings = $.extend(settings, options);

      $('tr', $(this)).each(function() {
        rows.push($([
          'td:not(', settings.ignore, '),',
          'th:not(', settings.ignore, ')'
        ].join(''), $(this)));
      });

      if (!rows.length) {
        stack = null;
        return;
      }
      else if (rows[0].length <= settings.max) {
        stack = null;
        return;
      }

      for (var i=0; i<rows.length; i++) {
        stack.push(rows[i].splice(settings.max, rows[i].length));
        rows[i] = rows[i].splice(0, settings.max);

        for (var j = 0; j < stack[i].length; j++) {
          $(stack[i][j]).remove();
        }
      }
    },
    moveLeft: function() {
      $('tr', $(this)).each(function(i) {
        var element = stack[i].shift(),
          first = $([
            'td:not(', settings.ignore, '):first,',
            'th:not(', settings.ignore, '):first'
          ].join(''), $(this));

        stack[i].push(first);

        $([
          'td:not(', settings.ignore, '):last,',
          'th:not(', settings.ignore, '):last'
        ].join(''), $(this)).after(element);
        
        first.remove();
      });
    },
    moveRight: function() {
      $('tr', $(this)).each(function(i) {
        var element = stack[i].shift(),
          last = $([
			'td:not(', settings.ignore, '):last,',
            'th:not(', settings.ignore, '):last'
          ].join(''), $(this));

        stack[i].unshift(last);

        $([
          'td:not(', settings.ignore, '):first,',
          'th:not(', settings.ignore, '):first'
        ].join(''), $(this)).before(element);
        
        last.remove();
      });
    },
    canMove: function() {
      if (stack && stack.length && stack[0].length) {
        return true;
      }

      return false;
    }
  };
  
  $.fn.hscroll = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    }
    else if (typeof method === 'object' || !method) {
      return methods.initialize.apply(this, arguments);
    }
    else {
      $.error([
        'Method ', method,
		' does not exist on jQuery prototype'
      ].join(''));
    }
  };

}(jQuery));
