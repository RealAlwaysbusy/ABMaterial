function dean_addEvent(t,e,r){if(t.addEventListener)t.addEventListener(e,r,!1);else{r.$$guid||(r.$$guid=dean_addEvent.guid++),t.events||(t.events={});var o=t.events[e];o||(o=t.events[e]={},t["on"+e]&&(o[0]=t["on"+e])),o[r.$$guid]=r,t["on"+e]=handleEvent}}function removeEvent(t,e,r){t.removeEventListener?t.removeEventListener(e,r,!1):t.events&&t.events[e]&&delete t.events[e][r.$$guid]}function handleEvent(t){var e=!0;t=t||fixEvent(((this.ownerDocument||this.document||this).parentWindow||window).event);var r=this.events[t.type];for(var o in r)this.$$handleEvent=r[o],!1===this.$$handleEvent(t)&&(e=!1);return e}function fixEvent(t){return t.preventDefault=fixEvent.preventDefault,t.stopPropagation=fixEvent.stopPropagation,t}var stIsIE=!1,isscr=!1;if(sorttable={init:function(){arguments.callee.done||(arguments.callee.done=!0,_timer&&clearInterval(_timer),document.createElement&&document.getElementsByTagName&&(sorttable.DATE_RE=/^(\d\d?)[\/\.-](\d\d?)[\/\.-]((\d\d)?\d\d)/,forEach(document.getElementsByTagName("table"),function(t){-1!=t.className.search(/\bsortable\b/)&&sorttable.makeSortable(t)})))},makeSortable:function(t,r){if(isscr=null!=r,0==t.getElementsByTagName("thead").length&&(the=document.createElement("thead"),the.appendChild(t.rows[0]),t.insertBefore(the,t.firstChild)),null==t.tHead&&(t.tHead=t.getElementsByTagName("thead")[0]),1==t.tHead.rows.length){sortbottomrows=[];for(var e=0;e<t.rows.length;e++)-1!=t.rows[e].className.search(/\bsortbottom\b/)&&(sortbottomrows[sortbottomrows.length]=t.rows[e]);if(sortbottomrows){null==t.tFoot&&(tfo=document.createElement("tfoot"),t.appendChild(tfo));for(e=0;e<sortbottomrows.length;e++)tfo.appendChild(sortbottomrows[e]);delete sortbottomrows}headrow=t.tHead.rows[0].cells;for(e=0;e<headrow.length;e++)headrow[e].className.match(/\bsorttable_nosort\b/)||(mtch=headrow[e].className.match(/\bsorttable_([a-z0-9]+)\b/),mtch&&(override=mtch[1]),mtch&&"function"==typeof sorttable["sort_"+override]?headrow[e].sorttable_sortfunction=sorttable["sort_"+override]:headrow[e].sorttable_sortfunction=sorttable.guessType(t,e,r),headrow[e].sorttable_columnindex=e,headrow[e].sorttable_tbody=null!=r?r.tBodies[0]:t.tBodies[0],dean_addEvent(headrow[e],"click",sorttable.innerSortFunction=function(t){if(-1!=this.className.search(/\bsorttable_sorted\b/))return null!=r&&sorttable.reverse(this.sorttable_tbody),this.className=this.className.replace("sorttable_sorted","sorttable_sorted_reverse"),this.removeChild(document.getElementById("sorttable_sortfwdind")),sortrevind=document.createElement("span"),sortrevind.id="sorttable_sortrevind",sortrevind.innerHTML=stIsIE?'&nbsp<font face="webdings">5</font>':"&nbsp;&#x25B4;",void this.appendChild(sortrevind);if(-1!=this.className.search(/\bsorttable_sorted_reverse\b/))return null!=r&&sorttable.reverse(this.sorttable_tbody),this.className=this.className.replace("sorttable_sorted_reverse","sorttable_sorted"),this.removeChild(document.getElementById("sorttable_sortrevind")),sortfwdind=document.createElement("span"),sortfwdind.id="sorttable_sortfwdind",sortfwdind.innerHTML=stIsIE?'&nbsp<font face="webdings">6</font>':"&nbsp;&#x25BE;",void this.appendChild(sortfwdind);if(theadrow=this.parentNode,forEach(theadrow.childNodes,function(t){1==t.nodeType&&(t.className=t.className.replace("sorttable_sorted_reverse",""),t.className=t.className.replace("sorttable_sorted",""))}),sortfwdind=document.getElementById("sorttable_sortfwdind"),sortfwdind&&sortfwdind.parentNode.removeChild(sortfwdind),sortrevind=document.getElementById("sorttable_sortrevind"),sortrevind&&sortrevind.parentNode.removeChild(sortrevind),this.className+=" sorttable_sorted",sortfwdind=document.createElement("span"),sortfwdind.id="sorttable_sortfwdind",sortfwdind.innerHTML=stIsIE?'&nbsp<font face="webdings">6</font>':"&nbsp;&#x25BE;",this.appendChild(sortfwdind),0==isscr){row_array=[],col=this.sorttable_columnindex,rows=this.sorttable_tbody.rows;for(var e=0;e<rows.length;e++)row_array[row_array.length]=[sorttable.getInnerText(rows[e].cells[col]),rows[e]];row_array.sort(this.sorttable_sortfunction),tb=this.sorttable_tbody;for(e=0;e<row_array.length;e++)tb.appendChild(row_array[e][1]);delete row_array}}))}},guessType:function(t,e,r){var o=t.tBodies[0];if(r&&(o=r.tBodies[0]),null!=o&&0==o.rows.length)return sorttable.sort_alpha;if(sortfn=sorttable.sort_alpha,null!=o){if(text=sorttable.getInnerText(o.rows[0].cells[e]),""!=text){if(text.match(/^-?[£$¤]?[\d,.]+%?$/))return sorttable.sort_numeric;if(possdate=text.match(sorttable.DATE_RE),possdate){if(first=parseInt(possdate[1]),second=parseInt(possdate[2]),12<first)return sorttable.sort_ddmm;if(12<second)return sorttable.sort_mmdd;sortfn=sorttable.sort_ddmm}}return sortfn}return sorttable.sort_alpha},getInnerText:function(t){if(!t)return"";if(hasInputs="function"==typeof t.getElementsByTagName&&t.getElementsByTagName("input").length,void 0===t.getAttribute||"function"!=typeof t.getAttribute)return"";if("input"==t.nodeName.toLowerCase()&&"checkbox"==$("#"+t.id).attr("type"))return 1==$("#"+t.id).is(":checked")?"false":"true";if(null!=t.getAttribute("sorttable_customkey"))return t.getAttribute("sorttable_customkey");if(void 0!==t.textContent&&!hasInputs)return t.textContent.replace(/^\s+|\s+$/g,"");if(void 0!==t.innerText&&!hasInputs)return t.innerText.replace(/^\s+|\s+$/g,"");if(void 0!==t.text&&!hasInputs)return t.text.replace(/^\s+|\s+$/g,"");switch(t.nodeType){case 3:if("input"==t.nodeName.toLowerCase())return t.value.replace(/^\s+|\s+$/g,"");case 4:return t.nodeValue.replace(/^\s+|\s+$/g,"");case 1:case 11:for(var e="",r=0;r<t.childNodes.length;r++)e+=sorttable.getInnerText(t.childNodes[r]);return e.replace(/^\s+|\s+$/g,"");default:return""}},reverse:function(t){if(t){newrows=[];for(var e=0;e<t.rows.length;e++)newrows[newrows.length]=t.rows[e];for(e=newrows.length-1;0<=e;e--)t.appendChild(newrows[e]);delete newrows}},sort_numeric:function(t,e){return aa=parseFloat(t[0].replace(/[^0-9.-]/g,"")),isNaN(aa)&&(aa=0),bb=parseFloat(e[0].replace(/[^0-9.-]/g,"")),isNaN(bb)&&(bb=0),aa-bb},sort_alpha:function(t,e){return t[0]==e[0]?0:t[0]<e[0]?-1:1},sort_ddmm:function(t,e){return mtch=t[0].match(sorttable.DATE_RE),y=mtch[3],m=mtch[2],d=mtch[1],1==m.length&&(m="0"+m),1==d.length&&(d="0"+d),dt1=y+m+d,mtch=e[0].match(sorttable.DATE_RE),y=mtch[3],m=mtch[2],d=mtch[1],1==m.length&&(m="0"+m),1==d.length&&(d="0"+d),dt2=y+m+d,dt1==dt2?0:dt1<dt2?-1:1},sort_mmdd:function(t,e){return mtch=t[0].match(sorttable.DATE_RE),y=mtch[3],d=mtch[2],m=mtch[1],1==m.length&&(m="0"+m),1==d.length&&(d="0"+d),dt1=y+m+d,mtch=e[0].match(sorttable.DATE_RE),y=mtch[3],d=mtch[2],m=mtch[1],1==m.length&&(m="0"+m),1==d.length&&(d="0"+d),dt2=y+m+d,dt1==dt2?0:dt1<dt2?-1:1},shaker_sort:function(t,e){for(var r=0,o=t.length-1,n=!0;n;){n=!1;for(var s=r;s<o;++s)if(0<e(t[s],t[s+1])){var a=t[s];t[s]=t[s+1],t[s+1]=a,n=!0}if(o--,!n)break;for(s=o;r<s;--s)if(e(t[s],t[s-1])<0){a=t[s];t[s]=t[s-1],t[s-1]=a,n=!0}r++}}},document.addEventListener&&document.addEventListener("DOMContentLoaded",sorttable.init,!1),/WebKit/i.test(navigator.userAgent))var _timer=setInterval(function(){/loaded|complete/.test(document.readyState)&&sorttable.init()},10);window.onload=sorttable.init,dean_addEvent.guid=1,fixEvent.preventDefault=function(){this.returnValue=!1},fixEvent.stopPropagation=function(){this.cancelBubble=!0},Array.forEach||(Array.forEach=function(t,e,r){for(var o=0;o<t.length;o++)e.call(r,t[o],o,t)}),Function.prototype.forEach=function(t,e,r){for(var o in t)void 0===this.prototype[o]&&e.call(r,t[o],o,t)},String.forEach=function(r,o,n){Array.forEach(r.split(""),function(t,e){o.call(n,t,e,r)})};var forEach=function(t,e,r){if(t){var o=Object;if(t instanceof Function)o=Function;else{if(t.forEach instanceof Function)return void t.forEach(e,r);"string"==typeof t?o=String:"number"==typeof t.length&&(o=Array)}o.forEach(t,e,r)}};

/*!
 * dragtable
 *
 * @Version 2.0.15
 *
 * Copyright (c) 2010-2013, Andres akottr@gmail.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Inspired by the the dragtable from Dan Vanderkam (danvk.org/dragtable/)
 * Thanks to the jquery and jqueryui comitters
 *
 * Any comment, bug report, feature-request is welcome
 * Feel free to contact me.
 */

/* TOKNOW:
 * For IE7 you need this css rule:
 * table {
 *   border-collapse: collapse;
 * }
 * Or take a clean reset.css (see http://meyerweb.com/eric/tools/css/reset/)
 */

/* TODO: investigate
 * Does not work properly with css rule:
 * html {
 *      overflow: -moz-scrollbars-vertical;
 *  }
 * Workaround:
 * Fixing Firefox issues by scrolling down the page
 * http://stackoverflow.com/questions/2451528/jquery-ui-sortable-scroll-helper-element-offset-firefox-issue
 *
 * var start = $.noop;
 * var beforeStop = $.noop;
 * if($.browser.mozilla) {
 * var start = function (event, ui) {
 *               if( ui.helper !== undefined )
 *                 ui.helper.css('position','absolute').css('margin-top', $(window).scrollTop() );
 *               }
 * var beforeStop = function (event, ui) {
 *              if( ui.offset !== undefined )
 *                ui.helper.css('margin-top', 0);
 *              }
 * }
 *
 * and pass this as start and stop function to the sortable initialisation
 * start: start,
 * beforeStop: beforeStop
 */
/*
 * Special thx to all pull requests comitters
 */

(function($) {
  if (typeof $.ui === "undefined") {
	  return;
  }	
  $.widget("akottr.dragtable", $.ui.mouse, {
    options: {
      revert: false,               // smooth revert
      dragHandle: '.table-handle', // handle for moving cols, if not exists the whole 'th' is the handle
      maxMovingRows: 40,           // 1 -> only header. 40 row should be enough, the rest is usually not in the viewport
      excludeFooter: false,        // excludes the footer row(s) while moving other columns. Make sense if there is a footer with a colspan. */
      onlyHeaderThreshold: 100,    // TODO:  not implemented yet, switch automatically between entire col moving / only header moving
      dragaccept: null,            // draggable cols -> default all
      persistState: null,          // url or function -> plug in your custom persistState function right here. function call is persistState(originalTable)
      restoreState: null,          // JSON-Object or function:  some kind of experimental aka Quick-Hack TODO: do it better
      exact: true,                 // removes pixels, so that the overlay table width fits exactly the original table width
      clickDelay: 10,              // ms to wait before rendering sortable list and delegating click event
      containment: null,           // @see http://api.jqueryui.com/sortable/#option-containment, use it if you want to move in 2 dimesnions (together with axis: null)
      cursor: 'move',              // @see http://api.jqueryui.com/sortable/#option-cursor
      cursorAt: false,             // @see http://api.jqueryui.com/sortable/#option-cursorAt
      distance: 50,                 // @see http://api.jqueryui.com/sortable/#option-distance, for immediate feedback use "0"
      tolerance: 'pointer',        // @see http://api.jqueryui.com/sortable/#option-tolerance
      axis: 'x',                   // @see http://api.jqueryui.com/sortable/#option-axis, Only vertical moving is allowed. Use 'x' or null. Use this in conjunction with the 'containment' setting
      beforeStart: $.noop,         // returning FALSE will stop the execution chain.
      beforeMoving: $.noop,
      beforeReorganize: $.noop,
      beforeStop: $.noop,
	  id: ''
    },
    originalTable: {
      el: null,
      selectedHandle: null,
      sortOrder: null,
      startIndex: 0,
      endIndex: 0
    },
    sortableTable: {
      el: $(),
      selectedHandle: $(),
      movingRow: $()
    },
    persistState: function() {
      var _this = this;
      this.originalTable.el.find('th').each(function(i) {
        if (this.id !== '') {
          _this.originalTable.sortOrder[this.id] = i;
        }
      });
      $.ajax({
        url: this.options.persistState,
        data: this.originalTable.sortOrder
      });
    },
    /*
     * persistObj looks like
     * {'id1':'2','id3':'3','id2':'1'}
     * table looks like
     * |   id2  |   id1   |   id3   |
     */
    _restoreState: function(persistObj) {
      for (var n in persistObj) {
        this.originalTable.startIndex = $('#' + n).closest('th').prevAll().length + 1;
        this.originalTable.endIndex = parseInt(persistObj[n], 10) + 1;
        this._bubbleCols();
      }
    },
    // bubble the moved col left or right
    _bubbleCols: function() {
      var i, j, col1, col2;
      var from = this.originalTable.startIndex;
      var to = this.originalTable.endIndex;
      /* Find children thead and tbody.
       * Only to process the immediate tr-children. Bugfix for inner tables
       */
      var thtb = this.originalTable.el.children();
      if (this.options.excludeFooter) {
        thtb = thtb.not('tfoot');
      }
      if (from < to) {
        for (i = from; i < to; i++) {
          col1 = thtb.find('> tr > td:nth-child(' + i + ')')
            .add(thtb.find('> tr > th:nth-child(' + i + ')'));
          col2 = thtb.find('> tr > td:nth-child(' + (i + 1) + ')')
            .add(thtb.find('> tr > th:nth-child(' + (i + 1) + ')'));
          for (j = 0; j < col1.length; j++) {
            swapNodes(col1[j], col2[j]);
          }
        }
      } else {
        for (i = from; i > to; i--) {
          col1 = thtb.find('> tr > td:nth-child(' + i + ')')
            .add(thtb.find('> tr > th:nth-child(' + i + ')'));
          col2 = thtb.find('> tr > td:nth-child(' + (i - 1) + ')')
            .add(thtb.find('> tr > th:nth-child(' + (i - 1) + ')'));
          for (j = 0; j < col1.length; j++) {
            swapNodes(col1[j], col2[j]);
          }
        }
      }
    },
    _rearrangeTableBackroundProcessing: function() {
	  var _this = this;
      return function() {
        _this._bubbleCols();
        _this.options.beforeStop(_this.originalTable);
        _this.sortableTable.el.remove();
        restoreTextSelection();
        // persist state if necessary
        if (_this.options.persistState !== null) {
          $.isFunction(_this.options.persistState) ? _this.options.persistState(_this.originalTable) : _this.persistState();
        }
      };
    },
    _rearrangeTable: function() {
	  var _this = this;
      return function() {
        // remove handler-class -> handler is now finished
        _this.originalTable.selectedHandle.removeClass('dragtable-handle-selected');
        // add disabled class -> reorgorganisation starts soon
        _this.sortableTable.el.sortable("disable");
        _this.sortableTable.el.addClass('dragtable-disabled');
        _this.options.beforeReorganize(_this.originalTable, _this.sortableTable);
        // do reorganisation asynchronous
        // for chrome a little bit more than 1 ms because we want to force a rerender
        _this.originalTable.endIndex = _this.sortableTable.movingRow.prevAll().length + 1;
        setTimeout(_this._rearrangeTableBackroundProcessing(), 50);
      };	  
    },
    /*
     * Disrupts the table. The original table stays the same.
     * But on a layer above the original table we are constructing a list (ul > li)
     * each li with a separate table representig a single col of the original table.
     */
    _generateSortable: function(e) {	  
      !e.cancelBubble && (e.cancelBubble = true);
      var _this = this;
      // table attributes
      var attrs = this.originalTable.el[0].attributes;
      var attrsString = '';
      for (var i = 0; i < attrs.length; i++) {
        if (attrs[i].nodeValue && attrs[i].nodeName != 'id' && attrs[i].nodeName != 'width') {
          attrsString += attrs[i].nodeName + '="' + attrs[i].nodeValue + '" ';
        }
      }

      // row attributes
      var rowAttrsArr = [];
      //compute height, special handling for ie needed :-(
      var heightArr = [];
      this.originalTable.el.find('tr').slice(0, this.options.maxMovingRows).each(function(i, v) {
        // row attributes
        var attrs = this.attributes;
        var attrsString = "";
        for (var j = 0; j < attrs.length; j++) {
          if (attrs[j].nodeValue && attrs[j].nodeName != 'id') {
            attrsString += " " + attrs[j].nodeName + '="' + attrs[j].nodeValue + '"';
          }
        }
        rowAttrsArr.push(attrsString);
        heightArr.push($(this).height());
      });

      // compute width, no special handling for ie needed :-)
      var widthArr = [];
      // compute total width, needed for not wrapping around after the screen ends (floating)
      var totalWidth = 0;
      /* Find children thead and tbody.
       * Only to process the immediate tr-children. Bugfix for inner tables
       */
      var thtb = _this.originalTable.el.children();
      if (this.options.excludeFooter) {
        thtb = thtb.not('tfoot');
      }
      thtb.find('> tr > th').each(function(i, v) {
        var w = $(this).is(':visible') ? $(this).outerWidth() : 0;
        widthArr.push(w);
        totalWidth += w;
      });
      if(_this.options.exact) {
          var difference = totalWidth - _this.originalTable.el.outerWidth();
          widthArr[0] -= difference;
      }
      // one extra px on right and left side
      totalWidth += 2

      var sortableHtml = '<ul class="dragtable-sortable" style="position:absolute; width:' + totalWidth + 'px;">';
      // assemble the needed html
      thtb.find('> tr > th').each(function(i, v) {
        var width_li = $(this).is(':visible') ? $(this).outerWidth() : 0;
        sortableHtml += '<li style="width:' + width_li + 'px;">';
        sortableHtml += '<table ' + attrsString + '>';
        var row = thtb.find('> tr > th:nth-child(' + (i + 1) + ')');
        if (_this.options.maxMovingRows > 1) {
          row = row.add(thtb.find('> tr > td:nth-child(' + (i + 1) + ')').slice(0, _this.options.maxMovingRows - 1));
        }
        row.each(function(j) {
          // TODO: May cause duplicate style-Attribute
          var row_content = $(this).clone().wrap('<div></div>').parent().html();
          if (row_content.toLowerCase().indexOf('<th') === 0) sortableHtml += "<thead>";
          sortableHtml += '<tr ' + rowAttrsArr[j] + '" style="height:' + heightArr[j] + 'px;">';
          sortableHtml += row_content;
          if (row_content.toLowerCase().indexOf('<th') === 0) sortableHtml += "</thead>";
          sortableHtml += '</tr>';
        });
        sortableHtml += '</table>';
        sortableHtml += '</li>';
      });
      sortableHtml += '</ul>';
      this.sortableTable.el = this.originalTable.el.before(sortableHtml).prev();
	  // set width if necessary
	  var _this = this;
      this.sortableTable.el.find('> li > table').each(function(i, v) {
        $(this).css('width', widthArr[i] + 'px');
		$(this).find('.abminfclick').off('mousedown').on('mousedown', function(e) {
			if (e.stopPropagation) {
				e.stopPropagation();
			} else if (window.event) {
				window.event.cancelBubble = true;
			}
			var tablename = $('#' + _this.options.id + '-header').attr('name');
			var evname = $('#' + _this.options.id + '-header').attr('evname');
			var currthis = $(this).parent();
			var order = 'ASC';
			if (currthis.hasClass('abminfdesc')) {
				order = 'DESC';
			}
			b4j_raiseEvent('page_parseevent', {
				'eventname': evname + '_sortchanged',
				'eventparams': 'datafield,order',
				'datafield': currthis.attr('fieldname'),
				'order': order
			});
		});
		$(this).find('.abminfclickable').off('mousedown').on('mousedown', function(e) {
			if (e.stopPropagation) {
				e.stopPropagation();
			} else if (window.event) {
				window.event.cancelBubble = true;
			}
			var tablename = $('#' + _this.options.id + '-header').attr('name');
			var evname = $('#' + _this.options.id + '-header').attr('evname');
			var currthis = $(this);
			b4j_raiseEvent('page_parseevent', {
				'eventname': evname + '_headerclicked',
				'eventparams': 'datafield',
				'datafield': currthis.attr('fieldname')				
			});
		});
      });

      // assign this.sortableTable.selectedHandle
      this.sortableTable.selectedHandle = this.sortableTable.el.find('th .dragtable-handle-selected');

      var items = !this.options.dragaccept ? 'li' : 'li:has(' + this.options.dragaccept + ')';
      this.sortableTable.el.sortable({
        items: items,
        stop: this._rearrangeTable(),
        // pass thru options for sortable widget
        revert: this.options.revert,
        tolerance: this.options.tolerance,
        containment: this.options.containment,
        cursor: this.options.cursor,
        cursorAt: this.options.cursorAt,
        distance: this.options.distance,
        axis: this.options.axis
      });

      // assign start index
      this.originalTable.startIndex = $(e.target).closest('th').prevAll().length + 1;

      this.options.beforeMoving(this.originalTable, this.sortableTable);
      // Start moving by delegating the original event to the new sortable table
      this.sortableTable.movingRow = this.sortableTable.el.find('> li:nth-child(' + this.originalTable.startIndex + ')');

      // prevent the user from drag selecting "highlighting" surrounding page elements
      disableTextSelection();
      // clone the initial event and trigger the sort with it
      this.sortableTable.movingRow.trigger($.extend($.Event(e.type), {
        which: 1,
        clientX: e.clientX,
        clientY: e.clientY,
        pageX: e.pageX,
        pageY: e.pageY,
        screenX: e.screenX,
        screenY: e.screenY
      }));

      // Some inner divs to deliver the posibillity to style the placeholder more sophisticated
      var placeholder = this.sortableTable.el.find('.ui-sortable-placeholder');
      if(!placeholder.height()  <= 0) {
        placeholder.css('height', this.sortableTable.el.find('.ui-sortable-helper').height());
      }

      placeholder.html('<div class="outer" style="height:100%;"><div class="inner" style="height:100%;"></div></div>');
    },
    bindTo: {},
    _create: function() {
      this.originalTable = {
        el: this.element,
        selectedHandle: $(),
        sortOrder: {},
        startIndex: 0,
        endIndex: 0
      };
	  // bind draggable to 'th' by default
      this.bindTo = this.originalTable.el.find('th');
      // filter only the cols that are accepted
      if (this.options.dragaccept) {
        this.bindTo = this.bindTo.filter(this.options.dragaccept);
      }
      // bind draggable to handle if exists
      if (this.bindTo.find(this.options.dragHandle).length > 0) {
        this.bindTo = this.bindTo.find(this.options.dragHandle);
      }
      // restore state if necessary
      if (this.options.restoreState !== null) {
        $.isFunction(this.options.restoreState) ? this.options.restoreState(this.originalTable) : this._restoreState(this.options.restoreState);
      }
      this._mouseInit();
    },
    _mouseDown: function (evt) {
		/*
        if (!(this.bindTo.is(evt.originalEvent.srcElement) || this.bindTo.find(evt.originalEvent.srcElement).length > 0)) {
            return;
        }
		*/
		if (this.options.beforeStart(this.originalTable) === false) {
            return;
        }
		clearTimeout(this.downTimer);
		var _this = this;
        this.downTimer = setTimeout(function() {
          _this.originalTable.selectedHandle = $(this);
          _this.originalTable.selectedHandle.addClass('dragtable-handle-selected');
		  _this._generateSortable(evt);
        }, _this.options.clickDelay);		
    },
    _mouseStop: function () {
        clearTimeout(this.downTimer);   		
			
    },
	redraw: function(){
      this.destroy();
      this._create();
    },
    destroy: function() {
      this._mouseDestroy();
      $.Widget.prototype.destroy.apply(this, arguments); // default destroy
      // now do other stuff particular to this widget
    }
  });

  /** closure-scoped "private" functions **/

  var body_onselectstart_save = $(document.body).attr('onselectstart'),
    body_unselectable_save = $(document.body).attr('unselectable');

  // css properties to disable user-select on the body tag by appending a <style> tag to the <head>
  // remove any current document selections

  function disableTextSelection() {
    // jQuery doesn't support the element.text attribute in MSIE 8
    // http://stackoverflow.com/questions/2692770/style-style-textcss-appendtohead-does-not-work-in-ie
    var $style = $('<style id="__dragtable_disable_text_selection__" type="text/css">body { -ms-user-select:none;-moz-user-select:-moz-none;-khtml-user-select:none;-webkit-user-select:none;user-select:none; }</style>');
    $(document.head).append($style);
    $(document.body).attr('onselectstart', 'return false;').attr('unselectable', 'on');
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else {
      document.selection.empty(); // MSIE http://msdn.microsoft.com/en-us/library/ms535869%28v=VS.85%29.aspx
    }
  }

  // remove the <style> tag, and restore the original <body> onselectstart attribute

  function restoreTextSelection() {
    $('#__dragtable_disable_text_selection__').remove();
    if (body_onselectstart_save) {
      $(document.body).attr('onselectstart', body_onselectstart_save);
    } else {
      $(document.body).removeAttr('onselectstart');
    }
    if (body_unselectable_save) {
      $(document.body).attr('unselectable', body_unselectable_save);
    } else {
      $(document.body).removeAttr('unselectable');
    }
  }

  function swapNodes(a, b) {
    var aparent = a.parentNode;
    var asibling = a.nextSibling === b ? a : a.nextSibling;
    b.parentNode.insertBefore(a, b);
    aparent.insertBefore(b, asibling);
  }
})(jQuery);