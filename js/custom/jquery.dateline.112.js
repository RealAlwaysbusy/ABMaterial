/*global Math, jQuery, window, console, _, requestAnimationFrame */
/*jslint nomen: true, unparam: true, white: true, plusplus: true, todo: true */
/**
 * MIT licence
 * Version 1.2.4
 * Sjaak Priester, Amsterdam 13-06-2014 ... 12-01-2019.
 *
 */

var Dateline = {
    MILLISECOND: 0,
    SECOND: 1,
    MINUTE: 2,
    HOUR: 3,
    DAY: 4,
    WEEK: 5,
    MONTH: 6,
    YEAR: 7,
    DECADE: 8,
    CENTURY: 9,
    MILLENNIUM: 10,

    NONE: 20,       // modes for rounding
    EDGE: 21,
    MIDDLE: 22
};

(function ($, undefined) {
    'use strict';
	
	var saf=false;
	var tou=false;
	
	function isSafari() {
		var ua = window.navigator.userAgent;
		var iOS = !!ua.match(/iP(ad|od|hone)/i);
		var hasSafariInUa = !!ua.match(/Safari/i);
		var noOtherBrowsersInUa = !ua.match(/Chrome|CriOS|OPiOS|mercury|FxiOS|Firefox/i)
		var result = false;
		if(iOS) { //detecting Safari in IOS mobile browsers
			var webkit = !!ua.match(/WebKit/i);
			result = webkit && hasSafariInUa && noOtherBrowsersInUa
		} else if(window.safari !== undefined){ //detecting Safari in Desktop Browsers
			result = true;
		} else { // detecting Safari in other platforms
			result = hasSafariInUa && noOtherBrowsersInUa
		}
		return result
	}
	
	function isIOS() {
		var ua = window.navigator.userAgent;
		var iOS = !!ua.match(/iP(ad|od|hone)/i);
		return iOS;
	}
	
	function is_touch_device() {
		var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
		var mq = function(query) {
			return window.matchMedia(query).matches;
		}

		if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
			return true;
		}

		// include the 'heartz' as a way to have a non matching MQ to help terminate the join
		// https://git.io/vznFH
		var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
		return mq(query);
}

    function createDate(date)   {
        //return _.isDate(date) ? date : new Date(date);		
		var ret;
		if (_.isDate(date)) {
			ret = date;
		} else {
			ret = new Date(date);
		}		
		if (saf) {
			ret.setMinutes(ret.getMinutes() + ret.getTimezoneOffset());
		}		
		return ret;
    }

    /**
     * Markers contains zero or (often) more Marker's
     * @param content
     * @constructor
     */
    function Markers(content)    {
        var MT = [
            function(date)  {       // MILLISECOND
                var v = date.getMilliseconds();
                return {
                    plus: !v,
                    text: v
                };
            },
            function(date)  {       // SECOND
                var v = date.getSeconds();
                return {
                    plus: !v,
                    text: v
                };
            },
            function(date)  {       // MINUTE
                var v = date.getMinutes();
                return {
                    plus: !v,
                    text: v || date.getHours()
                };
            },
            function(date)  {       // HOUR
                var v = date.getHours();
				if (v) {
					return {
						plus: !v,
						text: (v+'u')
					};
				} else {
					return {
						plus: !v,
						text: '<div class="d-mptit">' + date.toLocaleDateString(this.content.band.dateline.options.locale, {weekday: 'short'}) + ' ' + date.getDate() + ' ' + date.toLocaleDateString(this.content.band.dateline.options.locale, {month: 'short'}) + '</div>0u'
					};
				}                
            },
            function(date, ex)  {       // DAY
                var v = date.getDate();
				
				var day = date.getDay();
				var isWeekend = (day === 6) || (day === 0);
				if (isWeekend) {
					return {
						plus: false,
						isWeekend: true,
						text: '<div style="color: whitesmoke;background-color: #616161" ><b>' + date.toLocaleDateString(this.content.band.dateline.options.locale, {weekday: 'short'}) + ' ' + v + '<br>' + ex + '</b></div>'
					};
				} else {
					return {
						plus: false,
						isWeekend: false,
						text: '<div style="color: #616161;background-color: whitesmoke" >' + date.toLocaleDateString(this.content.band.dateline.options.locale, {weekday: 'short'}) + ' ' + v + '<br>' + ex + '</div>'
					};
				}
				
				/*
                return {
                    plus: v === 1,
                    text: v === 1 ? date.toLocaleDateString(this.content.band.dateline.options.locale, {
                        month: 'short'
                    }) : v
                };
				*/
            },
            function(date)  {       // WEEK
                return {
                    plus: false,
                    text: date.toLocaleDateString(this.content.band.dateline.options.locale, {
                        month: 'short',
                        day: 'numeric'
                    })
                };
            },
            function(date)  {       // MONTH
                var v = date.getMonth();
				if (v) {
					return {
						plus: false,
						text: date.toLocaleDateString(this.content.band.dateline.options.locale, {
							month: 'short'
						})
					}
				} else {
					return {
						plus: true,
						text: '<div class="d-mptit">' + (date.getYear()+1900) + "</div>" +  date.toLocaleDateString(this.content.band.dateline.options.locale, {
							month: 'short'
						})
					}
					
				}
				/*
                return v ? {
                    plus: false,
                    text: date.toLocaleDateString(this.content.band.dateline.options.locale, {
                        month: 'short'
                    })
                } : this.yearText(date, 1);
				*/
            },
            function(date)  {       // YEAR
                return this.yearText(date, 10);
            },
            function(date)  {       // DECADE
                return this.yearText(date, 100);
            },
            function(date)  {       // CENTURY
                return this.yearText(date, 1000);
            },
            function(date)  {       // MILLENNIUM
                return this.yearText(date, 10000);
            }
        ];
        this.content = content;
        this.element = $('<div>', { class: 'd-markers'}).appendTo(content.element);
        this.markerText = MT[content.band.scale];
    }

    Markers.prototype = {
        yearText: function(date, mod)   {
            var v = date.getFullYear(),
                p = ! (v % mod);
            return {
                plus: p,
                text: v
            };
        },

        render: function()  {
            var c = this.content,
                beginDate = c.range.begin,
                endDate = c.range.end,
                date = new Date(),
                nextDate = new Date(beginDate),
                mt;			

			var visBegin = new Date(c.band.visBegin);
			var visEnd = new Date(c.band.visEnd);
				
            this.element.empty();			
			
			c.band.ceilDate(nextDate);
			this.element.css('paddingLeft', c.band.calcPixels(nextDate - beginDate));
			
			c.band.incrDate(visEnd);
			
			var nextStillShow=true;
            while (nextDate < endDate)  {
			    date.setTime(nextDate);             // make date = nextDate
                c.band.incrDate(nextDate);
				
				var dd = '';
				if (c.band.scale == 4) {
					dd = c.band.totals[nextDate.toISOString().substring(0,10)];
					if (dd) {
						mt = this.markerText(date, dd);
					} else {
						mt = this.markerText(date, "00:00");
					}
					
				} else {
					mt = this.markerText(date);
				}
								
				var cls = "";
				if (nextDate<=visBegin) {
					cls = "d-noshow";
				} else {
					 if (nextDate>visEnd) {
						 if (nextStillShow) {
							nextStillShow=false;
						 } else {
							cls = "d-noshow";
						 }
					 }
				}
				
				if (nextStillShow) {
					if (c.band.scale == 4) {
						if (dd) {
							if (dd < "00:00") {
								cls = cls + " d-markc4 ";
							} else {
								cls = cls + " d-markc3 ";
							}
							
						} else {
							if (mt.isWeekend) {
								cls = cls + " d-markc2 ";
							} else {
								cls = cls + " d-markc1 ";
							}
						}
					}
					this.element.append($('<div>', {
						class: 'd-marker' + (mt.plus ? ' d-plus' : '') + ' ' + cls
					}).width(c.band.calcPixels(nextDate - date)).html(mt.text));
				} else {
					this.element.append($('<div>', {
						class: 'd-marker' + (mt.plus ? ' d-plus' : '') + ' ' + cls
					}).width(c.band.calcPixels(nextDate - date)));
				}
				
            }
			
        }
		
    };


    /**
     * Events contains zero or more Event's
     * @param content
     * @constructor
     */
    function Events(content)    {
        this.content = content;
        this.element = $('<div>', { class: 'd-events'}).appendTo(content.element);

        this.topMargin = 8;
		if (this.content.band.scale==4 && this.content.band.overlay!='overview') {
			this.lineHeight = 12;
		} else {
			this.lineHeight = 24;
		}
        this.renderEvent = content.band.layout === 'overview' ? this.renderOverviewEvent : this.renderNormalEvent;
	}

    Events.prototype = {
        renderNormalEvent: function(event)    {
            var band = this.content.band,
                index = band.index,
                range = this.content.range,
                pos = this.calcPos(event.start, event.sort),
                elmt, locale, ttl, ttlt, cls, strt, stp, tapeStyle;
			var ttlskin = 'dark';
				
            if (pos) {                          // skip if no position available
                if (event.elements[index])  {   // cached
                    elmt = event.elements[index];
                } else {
                    locale = band.dateline.options.locale;
					ttlt = '' + event.start.getHours();
					if (ttlt.length<2) {
						ttlt= "0" + ttlt;
					}
					ttl=ttlt+":";
					ttlt="" + event.start.getMinutes();
					if (ttlt.length<2) {
						ttlt="0" + ttlt;
					}
					ttl=ttl+ttlt;
					
					if (!event.group) {
						var opts = band.dateline.options;
						var onClick = 'onclick="buttonclickarray(event, \'\',\'' + opts.eventName + '\',\'' + opts.INPUT_EDIT_REG_T + '-' + opts.cursor.toISOString().substring(0,10) + this.content.element.closest('.d-dateline').attr('id') + "-" + event.id + '\')"';
						if (opts.INPUT_EDIT_REG_V) {
							if (event.info) {
								if (event.comm && event.comm!='') {
									ttl = "<b><span style='color:#ff8f00 !important'>" + event.info + "</span></b><br>" + event.comm + "<br><span class='fa fa-gavel' style='padding-right: 5px'></span><a href='#' " + onClick + ">" + ttl;
								} else {	
									ttl = "<b><span style='color:#ff8f00 !important'>" + event.info + "</span></b><br><span class='fa fa-gavel' style='padding-right: 5px'></span><a href='#' " + onClick + ">" + ttl;
								}
							} else {
								if (event.comm && event.comm!='') {
									ttl = "<b><span style='color:#ff8f00 !important'>" + event.text + "</span></b><br>" + event.comm + "<br><span class='fa fa-gavel' style='padding-right: 5px'></span><a href='#' " + onClick + ">" + ttl;
								} else {	
									ttl = "<b><span style='color:#ff8f00 !important'>" + event.text + "</span></b><br><span class='fa fa-gavel' style='padding-right: 5px'></span><a href='#' " + onClick + ">" + ttl;
								}
							}
						} else {
							if (event.info) {
								if (event.comm && event.comm!='') {
									ttl = "<b><span style='color:#ff8f00 !important'>" + event.info + "</span></b><br>" + event.comm + "<br>" + ttl;
								} else {	
									ttl = "<b><span style='color:#ff8f00 !important'>" + event.info + "</span></b><br>" + ttl;
								}
							} else {
								if (event.comm && event.comm!='') {
									ttl = "<b><span style='color:#ff8f00 !important'>" + event.text + "</span></b><br>" + event.comm + "<br>" + ttl;
								} else {	
									ttl = "<b><span style='color:#ff8f00 !important'>" + event.text + "</span></b><br>" + ttl;
								}
							}
						}
					} else {
						//ttlskin = 'gray';
						if (event.info) {
							if (event.comm && event.comm!='') {
								ttl = "<b>" + event.info + "</b><br>" + event.comm + "<br>" + ttl;
							} else {	
								ttl = "<b>" + event.info + "</b><br>" + ttl;
							}
						} else {
							if (event.comm && event.comm!='') {
								ttl = "<b>" + event.text + "</b><br>" + event.comm + "<br>" + ttl;
							} else {	
								ttl = "<b>" + event.text + "</b><br>" + ttl;
							}
						}
					}					
										
                    cls = event.class || '';
					var clsMini = cls.split(" ").filter(c => !c.startsWith('fa-')).join(' ');
					
					var evText = "";
					if (event.text) {
						evText = event.text;
					}
					if (this.content.band.scale==4 && this.content.band.overlay!='overview') {
						evText="";
					}
					
					if (event.group && !(event.stop && event.stop!='Invalid Date')) {
						event.stop = event.start;
					}

                    if (event.stop && event.stop!='Invalid Date')   {         // create new duration event
                        ttl = ttl + " - ";
						ttlt="" + event.stop.getHours();
						if (ttlt.length<2) {
							ttlt="0" + ttlt;
						}
						ttl = ttl + ttlt + ":";
						ttlt="" + event.stop.getMinutes();
						if (ttlt.length<2) {
							ttlt="0" + ttlt;
						}
						ttl=ttl+ttlt;
						ttl=ttl+" [" + event.dur + "]";
						
						if (event.group) {
							var clsGroup='d-tapegroup';
							var clsTapeEventNow = '';
							if (event.isNow) {
								clsGroup='d-tapegroupnow';
								clsTapeEventNow = ' d-tape-eventnow';
							}
							if (this.content.band.scale==4 && this.content.band.overlay!='overview') {
								elmt = $('<div>', {
									class: 'd-tape-event ' + cls + clsTapeEventNow,
									/* title: ttl */
								}).prepend($('<div>', {
									class: 'd-tape d-tapegroupmini'
								}).html("<div class='d-grouptext'>" + evText + "</div>"));							
							} else {
								elmt = $('<div>', {
								class: 'd-tape-event ' + cls + clsTapeEventNow,
								/* title: ttl */
							}).prepend($('<div>', {
								class: 'd-tape ' + clsGroup
							}).html("<div class='d-grouptext'>" + evText + "</div>"));							
							}	
						} else {
							if (opts.INPUT_EDIT_REG_V) {
								ttl = ttl + "</a>";
							}
							if (event.isNow) {
								elmt = $('<div>', {
									class: 'd-tape-event ' + cls + ' d-tape-eventnow',
									/* title: ttl */
								}).html(evText).prepend($('<div>', {
									class: 'd-tapenow'
								}));
							} else {
								elmt = $('<div>', {
									class: 'd-tape-event ' + cls,
									/* title: ttl */
								}).html(evText).prepend($('<div>', {
									class: 'd-tape'
								}));
							}
						}
                    } else {
						if (opts.INPUT_EDIT_REG_V) {
							ttl = ttl + '</a>';
						}
						// create new instant event
						if (this.content.band.scale==4 && this.content.band.overlay!='overview') {
							elmt = $('<div>', {
								class: 'd-tape-event ' + cls,
								/* title: ttl */
							//}).html(evText).prepend($('<div style="width: 4px;height: 4px" class="d-tape ' + cls + '">', {
							}).html(evText).prepend($('<div>', {	
								class: 'd-tape d-tapemini ' + clsMini
							}));
						} else {
							elmt = $('<div>', {
								class: 'd-event ' + cls,
								/* title: ttl */
							}).html(evText);
						}
                    }
					
					
					elmt.attr('id', event.id);
                    elmt.data('id', event.id);
                    if (band.dateline.options.url) {
                        elmt.on('mousedown touchstart', function(e) {
                            var t = $(e.currentTarget),
                                dl = band.dateline,
                                bubble = dl._bubble,
                                post = t.position(),
                                contentPos = t.parent().parent().position(),
                                bubblePos = {
                                    top: post.top + contentPos.top,
                                    left: post.left + contentPos.left
                                },
                                id = t.data('id'),
                                url = dl.options.url + id;
//                                url = dl.options.url + '?' + $.param({id: id});

                            e.preventDefault();
                            e.stopPropagation();
                            e.stopImmediatePropagation();
                            
                            dl._highlight(t);
                            if (dl.options.redirect)   {
                                window.location = url;
                            }
                            else    {
                                bubble.show(bubblePos).setInfo(dl.options.loading);
                                $.get(
                                    url,
                                    {},
                                    function (d) {
                                        bubble.setInfo(d);
                                    }
                                );
                            }

                            return false;
                        }.bind(this));
                    } else {
						/*
						if (this.content.band.scale!=4) {
							elmt.on('mousedown touchstart', function(e) {
								var t = $(e.currentTarget);
								e.preventDefault();
								e.stopPropagation();
								e.stopImmediatePropagation();								
							}.bind(this));						
						}
						*/
					}

                    event.elements[index] = elmt;   // cache
                }
                elmt.css(pos);


                //if (event.stop) {       // duration event
				if (event.stop && event.stop!='Invalid Date')   {         // create new duration event
                    strt = Math.max(event.start, range.begin);
                    stp = Math.min(event.stop, range.end);
					
                    tapeStyle = {
                        width: Math.max(band.calcPixels(stp - strt), 1)
                    };

                    if (event.post_start && event.post_start > strt)   {
                        tapeStyle['border-left-width'] = band.calcPixels(event.post_start - strt);
                    }
                    if (event.pre_stop && event.pre_stop < stp) {
                        tapeStyle['border-right-width'] = band.calcPixels(stp - event.pre_stop);
                    }
                    elmt.children().css(tapeStyle);
                }
                this.element.append(elmt);
				
				/*
				if (ttl) {
					tippy('#' + event.id, {
						content: ttl,
					})
				}
				*/
				if (ttl) {
					if (tou) {
						Tipped.create('#' + event.id, ttl, { position: 'topleft', maxWidth: 250, showOn: 'touchstart', hideOnClickOutside: true, skin: ttlskin, behavior: 'sticky' });
					} else {
						Tipped.create('#' + event.id, ttl, { position: 'topleft', maxWidth: 250, hideOnClickOutside: true, skin: ttlskin, behavior: 'sticky' });
					}
				}

                this.lines[(pos.top - this.topMargin) / this.lineHeight] = pos.left + elmt.outerWidth();    // update line
				this.lastSort[(pos.top - this.topMargin) / this.lineHeight] = event.sort;
            }
        },

        renderOverviewEvent: function(event)    {

            var index = this.content.band.index,
                elmt, strt, stp;

            if (event.elements[index])  {   // cached
                elmt = event.elements[index];
            }
            else    {
                elmt = $('<div>', {
                    class: event.stop ? 'd-tape-pin' : 'd-pin'
                });
                event.elements[index] = elmt;   // cache
            }
			
			if (event.stop && event.stop!='Invalid Date')   {         // create new duration event
                strt = Math.max(event.start, this.content.range.begin);
                stp = Math.min(event.stop, this.content.range.end);
				
                elmt.css({
                    left: this.content.calcLeft(strt),
                    width: Math.max(this.content.band.calcPixels(stp - strt), 1)
                });
            }
            else    {               // instant event
                elmt.css({
                    left: this.content.calcLeft(event.start)
                });
            }

            this.element.append(elmt);
        },
		
        calcPos: function(date, sort) {   // check for free line; if not available, return false
            var x = this.content.calcLeft(date), i;

            for (i = 0; i < this.nLines; i++)   {
                //if (x >= this.lines[i] && parseInt(sort)<=parseInt(this.lastSort[i])) {
				if (x >= this.lines[i]-5 && (this.lastSort[i]==0 || this.lastSort[i]>=sort)) {	
					break;
                }
            }
			if (i >= this.nLines) {
				return false;
			} else {
                return {
					left: x,
					top: this.topMargin + i * this.lineHeight
				};
            }
        },

        render: function()  {
            var i, ev, events = this.content.band.dateline.options.events,
                range = this.content.range,
				iBegin = _.sortedIndex(events, { sorter: "00_" + range.begin.getTime() }, function(v) {
                    return v.sorter;
                }),
                iEnd = _.sortedIndex(events, { sorter: "99_" + range.end.getTime() }, function(v) {
                    return v.sorter;
                });
				/*
                iBegin = _.sortedIndex(events, { start: range.begin }, function(v) {
                    return v.start;
                }),
                iEnd = _.sortedIndex(events, { start: range.end }, function(v) {
                    return v.start;
                });
				*/
			
            this.element.children().detach();
			
			
			if (this.content.band.didCheck) {
				
				
			} else {
				this.nLines = 100;
				this.lines = [];	
				this.lastSort = [];
				for (i = 0; i < this.nLines; i++)   { this.lines.push(0); this.lastSort.push(0) }

				for (i = 0; i < iBegin; i++)    {       // render Duration Events if they stop after range.begin
					ev = events[i];
					if (ev.stop && ev.stop > range.begin)   {
						this.renderEvent(ev);
					}
				}

				for (i = iBegin; i < iEnd; i++) {       // render all Events if start is within range
					this.renderEvent(events[i]);
				}
				
				this.element.children().detach();
				
				var k=-1;
				for (i = 0; i< 100;i++) {
					if (this.lines[i]==0) {
						k = i;
						break;
					}
				}			
				
				var Height = (k+1) * this.lineHeight + this.topMargin;
				this.element.parent().parent().height((Height+24) + 'px');
				
				var parEl = this.element.parent().parent().parent().parent();
				var totalHeight = 0;

				parEl.find(".d-band").each(function(){
					totalHeight = totalHeight + $(this).outerHeight(true);
				});
				this.element.parent().parent().parent().parent().height((totalHeight) + 'px');
				
				this.content.band.didCheck=true;
			}	
			
            this.nLines = Math.floor((this.element.height() - this.topMargin) / this.lineHeight);
            this.lines = [];	
			this.lastSort = [];
            for (i = 0; i < this.nLines; i++)   { this.lines.push(0); this.lastSort.push(0) }

            for (i = 0; i < iBegin; i++)    {       // render Duration Events if they stop after range.begin
                ev = events[i];
                if (ev.stop && ev.stop > range.begin)   {
                    this.renderEvent(ev);
                }
            }

            for (i = iBegin; i < iEnd; i++) {       // render all Events if start is within range
                this.renderEvent(events[i]);
            }
        }
    };


    /**
     * Content contains Markers and Events
     * @param band
     * @constructor
     */
    function Content(band) {
        var inertia = 500,     // if higher, kinetic effect is stronger
            slow = 0.1,         // if higher, higher velocity is needed for kinetic effect
            duration = 1500,    // duration of kinetic effect in ms
            animation = 0,
            touchId = null;

        this.band = band;
        this.element = $('<div>', {class: 'd-content'}).appendTo(band.element);
        this.center = new Date(band.dateline.options.cursor);

        this.range = {
            begin: new Date(),
            end: new Date()
        };
        this.safe = {
            begin: new Date(),
            end: new Date()
        };
        this.visible = {
            begin: new Date(),
            end: new Date()
        };

        this.markers = new Markers(this);
        this.events = new Events(this);

        this.startPos = 0;
        this.startMs = 0;
        this.prevPos = 0;
        this.prevTimeStamp = 0;
        this.velocity = 0;

        // touch
        this.element.on("touchstart", function(e) {
            e.preventDefault();
            e = e.originalEvent;

            if (touchId === null)   {   // skip if touch is ongoing (this must be a second or third finger)
                if (animation) {
                    animation.stop();
                    animation = 0;
                }

                touchId = e.changedTouches[0].identifier;
                this.initDrag(e, e.changedTouches[0]);
            }

        }.bind(this)).on("touchmove", function(e) {
            var i, t;

            e.preventDefault();
            e = e.originalEvent;

            for (i = 0; i < e.changedTouches.length; i++)   {
                t = e.changedTouches[i];
                if (t.identifier === touchId)   {
                    this.updateDrag(e, t);
                }
            }

        }.bind(this)).on("touchend", function(e) {
            var i, t, dl = band.dateline, animStart, target,
                stepFunc = function(x) { dl._place(x);},    // define functions outside loop to satisfy JsLint
                completeFunc = function() {
                    dl._triggerChange();
                    animation = 0;
                };

            e.preventDefault();
            e = e.originalEvent;

            for (i = 0; i < e.changedTouches.length; i++)   {
                t = e.changedTouches[i];
                if (t.identifier === touchId)   {
                    this.updateDrag(e, t);
                    touchId = null;

                    if (Math.abs(this.velocity) > slow)   {
                        animStart = dl._getCursorMs();          // inertia
                        target = new Date(animStart - band.calcMs(inertia * this.velocity));

                        band.roundDate(target);

                        animation = $({ x: animStart });
                        animation.animate({x: target.getTime() }, {
                            step: stepFunc,
                            duration: duration,
                            easing: 'easeOutExpo',
                            complete: completeFunc
                        });
                    }
                    else    {
                        if (Math.abs(this.prevPos - this.startPos) < 4) {   // we hardly moved, it's a tap, go to tap point
                            if (band.scale==3) {
								if (evt.pageY - band.element.offset().top < band.element.height() - 30) {
									return;
								}
							}	
							target = new Date(this.visible.begin.getTime() + band.calcMs(this.startPos - band.element.offset().left));
                            band.roundDate(target);
                            dl._animateTo(target.getTime());
							
                        }
                        else    {
                            dl._triggerChange();
                        }
                    }
                }
            }

            // mouse
        }.bind(this)).mousedown(function(evt)  {

            if (evt.which === 1)    {
                evt.preventDefault();

                if (animation) {
                    animation.stop();
                    animation = 0;
                }

                band.setFocus();

                this.initDrag(evt, evt);

                $(band.dateline.document).on('mousemove.dateline', function(evt)  {  // bind event to document, using namespace
                    evt.preventDefault();
                    this.updateDrag(evt, evt);

                }.bind(this)).on('mouseup.dateline', function(evt)  {
                    var dl = band.dateline, target;

                    evt.preventDefault();

                    $(dl.document).off('.dateline');    // unbind document events
                    this.updateDrag(evt, evt);

                    if (Math.abs(this.prevPos - this.startPos) < 4) {   // we hardly moved, it's a click, go to click point
						//console.log(band.scale);
						if (band.scale==3) {
							if (evt.pageY - band.element.offset().top < band.element.height() - 30) {
								return;
							}
						}	
						target = new Date(this.visible.begin.getTime() + band.calcMs(this.startPos - band.element.offset().left));
                        band.roundDate(target);
                        dl._animateTo(target.getTime());
						
                    }
                    else    {
                        dl._triggerChange();
                    }
                }.bind(this));
            }
        }.bind(this));
    }

    Content.prototype = {

        initDrag: function(e, t)    {
            this.prevPos = this.startPos = t.pageX;
            this.startMs = this.band.dateline._getCursorMs();
            this.prevTimeStamp = e.timeStamp;
            this.velocity = 0;
        },

        updateDrag: function(e, t)  {
            var nervous = 0.6, // if higher, dependence of final velocity is higher
                x = t.pageX;

            this.band.dateline._place(this.startMs + this.band.calcMs(this.startPos - x));

            this.velocity *= 1 - nervous;
            this.velocity += nervous * ((x - this.prevPos) / (e.timeStamp - this.prevTimeStamp));
            this.prevPos = x;
            this.prevTimeStamp = e.timeStamp;
        },

        xPos: function(e)   {
            return (e.targetTouches && e.targetTouches.length >= 1) ? e.targetTouches[0].clientX : e.clientX;
        },

        render: function()  {
            var opts = this.band.dateline.options,
                beginDate = this.range.begin,
                endDate = this.range.end;
			

            this.markers.render(this.band.totals);
            this.events.render();

            this.element.children('.d-limit').remove();
			
			/*
            if (opts.begin && opts.begin > beginDate && opts.begin < endDate) {
                this.element.append($('<div>', {
                    class: 'd-limit d-begin'
                }).css('right', this.calcRight(opts.begin)));
            }

            if (opts.end && opts.end > beginDate && opts.end < endDate) {
                this.element.append($('<div>', {
                    class: 'd-limit d-end'
                }).css('left', this.calcLeft(opts.end)));
            }
			*/
        },
        setWidth: function(w)    {
            this.width = w;
            this.calcRange();
            this.element.width(w);
            this.place();
            this.render();
        },

        calcLeft: function(date)    {
            return this.band.calcPixels(date - this.range.begin);
        },

        calcRight: function(date)    {
            return this.band.calcPixels(this.range.end - date);
        },

        calcRange: function()   {
            var c = this.center.getTime(),  // center date in millisecs
                tau = this.band.calcMs(this.width) / 2, // half range in pixels
                tauSafe = 2 * tau / 3;

            this.range.begin.setTime(c - tau);
            this.range.end.setTime(c + tau);
            this.safe.begin.setTime(c - tauSafe);
            this.safe.end.setTime(c + tauSafe);			
        },

        place: function()   {
            var cursor = this.band.dateline.options.cursor,
                ww = this.band.dateline._width,
                c, tau;
            if (cursor < this.safe.begin || cursor > this.safe.end) {
                this.center.setTime(cursor.getTime());
                this.calcRange();
                this.render();
            }
            this.element.css('left', this.band.calcPixels(this.center - cursor) - (this.width - ww) / 2);

            c = cursor.getTime();
            tau = this.band.calcMs(ww) / 2; // half range in msec
            this.visible.begin.setTime(c - tau);
            this.visible.end.setTime(c + tau);
        }
    };

    /**
     * Band contains Content
     * @param bandInfo
     * @constructor
     */
    function Band(bandInfo) {
        var MS = [
                1,                  // MILLISECOND
                1000,               // SECOND
                60000,              // MINUTE, 60 secs
                3600000,            // HOUR, 3600 secs
                86400000,           // DAY, 24 hours = 86,400 secs
                604800000,          // WEEK, 7 days = 604,800 secs
                2629743750,         // MONTH, 1/12 year = 2,629,743.75 secs
                31556925000,        // YEAR, 365.2421875 days = 31,556,925 secs
                315569250000,       // DECADE, 10 years
                3155692500000,      // CENTURY, 100 years
                31556925000000      // MILLENNIUM, 1000 years
            ],
            FLOOR = [
                function(date)  {   // MILLISECOND
                    var v = date.getMilliseconds();
                    date.setMilliseconds(v - v % this.multiple);
                },
                function(date)  {   // SECOND
                    var v = date.getSeconds();
                    date.setSeconds(v - v % this.multiple, 0);
                },
                function(date)  {   // MINUTE
                    var v = date.getMinutes();
                    date.setMiMinutes(v - v % this.multiple, 0, 0);
                },
                function(date)  {   // HOUR
                    var v = date.getHours();
                    date.setHours(v - v % this.multiple, 0, 0, 0);
                },
                function(date)  {   // DAY
                    var v = date.getTime() / this.ms;   // days since 01-01-1970
                    date.setTime((v - v % this.multiple) * this.ms);
                    date.setHours(0, 0, 0, 0);
                },
                function(date)  {   // WEEK
                    var v = date.getTime();
                    v -= 345600000;                 // 4 days; set to sunday (01-01-1970 is thursday
					//v -= 259200000;
                    v /= this.ms;                   // weeks since 01-01-1970
                    date.setTime((v - v % this.multiple) * this.ms);
                    date.setHours(0, 0, 0, 0);
                },
                function(date)  {   // MONTH
                    var v = date.getMonth();
                    date.setMonth(v - v % this.multiple, 1);
                    date.setHours(0, 0, 0, 0);
                },
                function(date)  {   // YEAR
                    var v = date.getFullYear();
                    date.setFullYear(v - v % this.multiple, 0, 1);
                    date.setHours(0, 0, 0, 0);
                },
                function(date)  {   // DECADE
                    var v = date.getFullYear();
                    date.setFullYear(v - v % (10 * this.multiple), 0, 1);
                    date.setHours(0, 0, 0, 0);
                },
                function(date)  {   // CENTURY
                    var v = date.getFullYear();
                    date.setFullYear(v - v % (100 * this.multiple), 0, 1);
                    date.setHours(0, 0, 0, 0);
                },
                function(date)  {   // MILLENNIUM
                    var v = date.getFullYear();
                    date.setFullYear(v - v % (1000 * this.multiple), 0, 1);
                    date.setHours(0, 0, 0, 0);
                }
            ],
            INCR = [
                function(date)  {   // MILLISECOND
                    date.setMilliseconds(date.getMilliseconds() + this.multiple);
                },
                function(date)  {   // SECOND
                    date.setSeconds(date.getSeconds() + this.multiple, 0);
                },
                function(date)  {   // MINUTE
                    date.setMinutes(date.getMinutes() + this.multiple, 0, 0);
                },
                function(date)  {   // HOUR
                    date.setHours(date.getHours() + this.multiple, 0, 0, 0);
                },
                function(date)  {   // DAY
                    date.setDate(date.getDate() + this.multiple);
                },
                function(date)  {   // WEEK
                    date.setDate(date.getDate() + 7 * this.multiple);
                },
                function(date)  {   // MONTH
                    date.setMonth(date.getMonth() + this.multiple, 1);
                },
                function(date)  {   // YEAR
                    date.setFullYear(date.getFullYear() + this.multiple, 0, 1);
                },
                function(date)  {   // DECADE
                    date.setFullYear(date.getFullYear() + 10 * this.multiple, 0, 1);
                },
                function(date)  {   // CENTURY
                    date.setFullYear(date.getFullYear() + 100 * this.multiple, 0, 1);
                },
                function(date)  {   // MILLENNIUM
                    date.setFullYear(date.getFullYear() + 1000 * this.multiple, 0, 1);
                }
            ],
            dl = bandInfo.dateline;

        $.extend(this, { multiple: 1 }, bandInfo);
        this.ms = MS[this.scale];
        this.floorDate = FLOOR[this.scale];
        this.incrDate = INCR[this.scale];

        this.before = $('<div>', { class: 'd-range d-before' });
        this.after = $('<div>', { class: 'd-range d-after' });
		
        this.leftIndicator = $('<div>', { class: 'd-indicator d-left' }).mousedown(function(e) {
            //this.stepLeft(e.shiftKey);
			this.stepRight(e.shiftKey);
            e.preventDefault();
        }.bind(this));
        this.rightIndicator = $('<div>', { class: 'd-indicator d-right' }).mousedown(function(e) {
            //this.stepRight(e.shiftKey);
			this.stepLeft(e.shiftKey);
            e.preventDefault();
        }.bind(this));

        this.element = $('<div>', {
            class: 'd-band d-band-' + this.index + ' d-scale-' + this.scale,
            tabindex: '0'
        }).append(
            this.keyInput,
            this.before,
            this.after
        );

        this.content = new Content(this);

        this.element.append(
            this.leftIndicator,
            this.rightIndicator
        ).focus(function(e) {
            this.dateline._focus = this.index;
            this.leftIndicator.show();
            this.rightIndicator.show();
        }.bind(this)).blur(function(e) {
            this.leftIndicator.hide();
            this.rightIndicator.hide();
        }.bind(this)).keydown(function(e) {
                var current = dl._getCursorMs(),
                    events, i, prev = true;

                if (prev)   {
                    switch (e.keyCode) {
                        case 9:     // tab
							/*
                            events = dl.options.events;
                            if (events.length)  {
                                if (e.shiftKey) {
                                    i = _.sortedIndex(events, { start: current - 1 }, function(v) {
                                        return v.start;
                                    });
                                    if (i > 0) {
                                        dl._animateTo(events[i - 1].start);
                                    }
                                }
                                else    {
                                    i = _.sortedIndex(events, { start: current + 1 }, function(v) {
                                        return v.start;
                                    });
                                    if (i < events.length) {
                                        dl._animateTo(events[i].start);
                                    }
                                }
                            }
							*/
                            break;
                        // Nothing wrong with this code, just seems a little bit too much.
/*
                        case 33: // page up
                            dl._animateTo(current + 10 * this.ms);
                            break;
                        case 34: // page down
                            dl._animateTo(current - 10 * this.ms);
                            break;
*/

                        case 35: // end
                            if (dl.options.end)   {
                                dl._animateTo(dl.options.end.getTime());
                            }
                            break;
                        case 36: // home
                            if (dl.options.begin)   {
                                dl._animateTo(dl.options.begin.getTime());
                            }
                            break;
                        case 37: // left arrow
                            this.stepLeft(e.shiftKey);
                            break;
                        case 38: // up arrow
                            dl._cycleFocus(-1);
                            break;
                        case 39: // right arrow
                            this.stepRight(e.shiftKey);
                            break;
                        case 40: // down arrow
                            dl._cycleFocus(1);
                            break;
                        default:
                            prev = false;
                            break;
                    }
                    if (prev)    {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
                return ! prev;

            }.bind(this));
    }

    Band.prototype = {

        place: function()   {
            this.content.place();
        },

        setWidth: function(w)   {
            this.content.setWidth(w);
        },

        setRange: function(range)   {
            var cursor = this.dateline.options.cursor;
            if (range)  {
                this.before.css('width', this.calcPixels(cursor - range.begin));
                this.after.css('width', this.calcPixels(range.end - cursor));
            }
            else    {
                this.before.css('width', '');
                this.after.css('width', '');
            }
        },

        setRangeFrom: function(band)    {
            this.setRange(band.content.visible);
        },

        calcPixels: function(millisecs) {
			var p = millisecs * this.interval / this.ms;
            // three decimals. @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
            return +(Math.round(p + "e+3")  + "e-3");			
        },

        calcMs: function(pixels)    {
            return pixels * this.ms / this.interval;
        },

        setFocus: function()   {
            this.element.focus();
        },

        stepLeft: function(big) {
            var dl = this.dateline;
            dl._animateTo(dl._getCursorMs() + (big ? 10 : 1) * this.ms, big ? 1200 : 150);
			//dl._animateTo(dl._getCursorMs() + (big ? 10 : 1) * this.ms, big ? 150 : 150);
        },

        stepRight: function(big) {
            var dl = this.dateline;
            dl._animateTo(dl._getCursorMs() - (big ? 10 : 1) * this.ms, big ? 1200 : 150);
			//dl._animateTo(dl._getCursorMs() - (big ? 10 : 1) * this.ms, big ? 150 : 150);
        },

        ceilDate: function(date)    {
            this.floorDate(date);
            this.incrDate(date);
        },

        roundDate: function(date)   {
            var grid = this.dateline.options.grid,
                floor, ceil, mid;

            if (grid !== Dateline.NONE) {   // no change if Dateline.NONE
                floor = new Date(date);
                this.floorDate(floor);
                ceil = new Date(floor);
                this.incrDate(ceil);
                mid = (ceil.getTime() + floor.getTime()) / 2;

                if (grid === Dateline.MIDDLE)   {
                    date.setTime(mid);
                }
                else    {       // Dateline.EDGE
                    if (date.getTime() > mid)   {
                        date.setTime(ceil);
                    }
                    else    {
                        date.setTime(floor);
                    }
                }
            }
        }
    };

    /**
     * Bubble
     * @param dateline
     * @constructor
     */
    function Bubble(dateline)   {
        this.dateline = dateline;
        this.info = $('<div>', {
            class: 'd-info'
        });
        this.element = $('<div>', {
            class: 'd-bubble'
        }).append($('<div>', {
            class: 'd-close'
        }).html('&times;').click(function(e) {
            this.hide();
        }.bind(this)), this.info);
    }

    Bubble.prototype = {
        show: function(pos)    {
            pos.left -= 20;
            pos.top += 20;
            this.element.show().css(pos);
            return this;
        },

        hide: function()    {
            this.element.hide();
            this.dateline._clearHighlight();
            return this;
        },

        setInfo: function(h)   {
            this.info.html(h);
            return this;
        }
    };
	
    $.widget("sjaakp.dateline", {

        options:    {
			id: '',
			info: '',
            size: '320px',
            bands: [],
            cursor: new Date(),
            begin: null,
            end: null,
            events: [],
			totals: {},
            redirect: false,
            url: false,
            grid: Dateline.MIDDLE,
            loading: '<i class="fa fa-refresh fa-spin fa-lg"></i>&nbsp;&hellip;'
        },

        _bands: [],
        _focus: 0,
        _scrollFactor: 5,
		_id: '',

        _create: function() {
            var self = this,
                opts = this.options;
			//saf = isSafari();
			saf = isIOS();
			saf = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 && navigator.userAgent && navigator.userAgent.indexOf('CriOS') == -1 && navigator.userAgent.indexOf('FxiOS') == -1;
			tou = is_touch_device();
			
            if (! this.element.attr('tabindex'))    {
                this.element.attr('tabindex', 0);
            }

            opts.cursor = createDate(opts.cursor);
            if (opts.begin) { opts.begin = createDate(opts.begin); }
            if (opts.end) { opts.end = createDate(opts.end); }
			opts.id = this.element.attr('id') + 'meta';
			this._id = opts.id;
			
			this._prepareEvents();
			
			//this._width = this.element.css('height', opts.size).addClass('d-dateline').width();
			if (opts.FILTER_DAY_EXEC_V) {
				this._width = this.element.addClass('d-dateline').width()-36;
			} else {
				this._width = this.element.addClass('d-dateline').width();
			}	

            this._bubble = new Bubble(this);

            this._inner = $('<div>', {
                class: 'd-inner'
            });
			
            this.element.append(this._inner, this._bubble.element);

            this._prepareBands(opts);
			
			if (opts.info) {
				var clickBtn = '';
				if (opts.FILTER_DAY_EXEC_V) {
					if (opts.FILTER_DAY_EXEC_E) {
						var onClick = 'onclick="buttonclickarray(event, \'\',\'' + opts.eventName + '\',\'' + opts.FILTER_DAY_EXEC_T + '-' + opts.cursor.toISOString().substring(0,10) + this.element.attr('id') + '\')"';
						clickBtn = "<div id='" + opts.id + "btn' " + onClick + " class='btn-floating btn-small fa fa-gavel' style='float: left;margin-top: 10px;background-color: #ff8f00!important;margin-left: 5px;margin-right: 5px;'></div>";
					} else {
						var onClick = '';
						clickBtn = "<div id='" + opts.id + "btn' " + onClick + " class='btn-floating btn-small disabled fa fa-gavel' style='float: left;margin-top: 10px;margin-left: 5px;margin-right: 5px;'></div>";
					}	
				}
				//var tmp = "<div style='float: left;margin-left: -7.7rem;width: 7.7rem;'><b>" + opts.info + "</b><div id='" + opts.id + "' style='margin-top: 10px;border-bottom: 4px solid #98d460;'>12:27</div></div>";
				var dd = this._bands[0].totals[opts.cursor.toISOString().substring(0,10)];
				if (dd) {
					if (dd < "00:00") {
						this.element.prepend("<div style='float: left;margin-left: -7.7rem;width: 7.7rem;font-size: 0.9rem;border-top: 1px dotted lightgray;margin-top: -1px'><b>" + opts.info + "</b><div id='" + opts.id + "' style='margin-top: 0px;border-bottom: 4px solid #ec7d75'>" + dd + "</div></div>" + clickBtn);
					} else {
						this.element.prepend("<div style='float: left;margin-left: -7.7rem;width: 7.7rem;font-size: 0.9rem;border-top: 1px dotted lightgray;margin-top: -1px'><b>" + opts.info + "</b><div id='" + opts.id + "' style='margin-top: 0px;border-bottom: 4px solid #98d460'>" + dd + "</div></div>" + clickBtn);
					}					
				} else {	
					this.element.prepend("<div style='float: left;margin-left: -7.7rem;width: 7.7rem;font-size: 0.9rem;border-top: 1px dotted lightgray;margin-top: -1px'><b>" + opts.info + "</b><div id='" + opts.id + "' style='margin-top: 0px'>00:00</div></div>" + clickBtn);
				}
			}

            this._setWidth();			
			
            this.window.resize(_.debounce(function() {
				//console.log(self.element.offset().left);
				var w = self.element.width();
				if (opts.clickBtn) {
					w = w -36;
				}
                if (self._width !== w)    {
					
                    self._width = w;
                    self._setWidth();
                }
            }, 500));
			
            this.element.focus(function(e)  {
                if (this._bands.length) {
                    this._bands[this._focus].setFocus();
                }
            }.bind(this));	
			
        },

        _setOption: function(key, value)    {
            if ([ 'cursor', 'begin', 'end'].indexOf(key) >= 0)  {
                value = createDate(value);
            }
            this._super(key, value);
            if (key === 'bands')   {
				this._prepareBands();
            }
            if (key === 'events')   {
                this._prepareEvents();
            }
            this._setWidth();       // render complete dateline
        },

        _setOptions: function(options)  {
            this._super(options);
        },

        _prepareBands: function(opts)   {
            var bands = this.options.bands;

            if (! bands.length)    {
                this._inner.html('&nbsp;No bands defined.');
            }
			
            this._bands = bands.map(function(v, i, a) {
                v.dateline = this;
                v.index = i;
				
                var r = new Band(v);
				r.visBegin = opts.begin;
				r.visEnd = opts.end;
				r.totals = opts.totals;
                this._inner.append(r.element);
                return r;
            }, this);
        },

        _prepareEvents: function()  {
            var events = this.options.events;

            events.forEach(function(v, i, a) {
                ['start', 'stop', 'post_start', 'pre_stop'].forEach(function(w, j, b) {
                    if (v[w])   {
                        v[w] = createDate(v[w]);

                    }
                });
				v.sorter = "" + v.sort;
				if (v.sorter.length<2) {
					v.sorter = "0" + v.sorter;
				}
				v.sorter = v.sorter + '_' + v.start.getTime();				
                v.elements = [];
            });
			
			events.sort(function(a, b) 	{
				return a.sorter>b.sorter ? 1 : -1;
				/*
				if (a.sort > b.sort) {
					return 1;
				} else {
					if (a.sort == b.sort) {
						return a.start.getTime() - b.start.getTime();
					} else {
						return -1;
					}
				}
				*/
				
				
            });			
        },

        _place: function(ms)  {
            this._bubble.hide();

            if (this.options.begin && ms < this.options.begin.getTime()) {
                ms = this.options.begin.getTime();
            }
            if (this.options.end && ms > this.options.end.getTime()) {
                ms = this.options.end.getTime();
            }
            this.options.cursor.setTime(ms);
            this._bands.forEach(function(v, i, a) {
                v.place();
            });
            this._sync();
        },

        _animateTo: function(ms, duration) {            
			//this._place(ms);
			//this._triggerChange();
			
			duration = duration || 800;
            $({ cursor: this._getCursorMs() }).animate( { cursor: ms }, {
                step: function(now, tween) {
                    this._place(now);
                }.bind(this),
                complete: function() {
                    this._triggerChange();
                }.bind(this),
                duration: duration
            });			
			
        },

        _getCursorMs: function()    {
            return this.options.cursor.getTime();
        },

        _setWidth: function()   {
			var w = this._width * this._scrollFactor;
            this._bands.forEach(function(v, i, a) {
				v.setWidth(w);
            });
            this._sync();			
        },

        _sync: function()   {
            var prev;
            this._bands.forEach(function(v, i, a) {
                if (prev) { v.setRangeFrom(prev); }
                prev = v;
            });
        },

        _cycleFocus: function(step)  {
            var mod = this._bands.length,
                i = this._focus;

            i+= mod + step;
            i%= mod;
            this._bands[i].setFocus();
        },

        _highlight: function(elmt) {
            this._clearHighlight();
            this._hl = elmt.addClass('d-highlight');
            this._intval = window.setInterval(function() {
                this._hl.toggleClass('d-highlight');
            }.bind(this), 500);
        },

        _clearHighlight: function()   {
            if (this._intval)   {
                window.clearInterval(this._intval);
                this._intval = null;
            }
            if (this._hl)   {
                this._hl.removeClass('d-highlight');
                this._hl = null;
            }
        },

        _triggerChange: function()  {
			//console.log(this.element);
			var cursor = new Date(this._getCursorMs());
			var clickBtn = '';
			if (this.options.FILTER_DAY_EXEC_V) {
				if (this.options.FILTER_DAY_EXEC_E) {
					var onClick = 'onclick="buttonclickarray(event, \'\',\'' + this.options.eventName + '\',\'' + this.options.FILTER_DAY_EXEC_T + '-' + cursor.toISOString().substring(0,10) + this._id.substring(0,this._id.length-4) + '\')"';
					clickBtn = "<div id='" + this._id + "btn' " + onClick + " class='btn-floating btn-small fa fa-gavel' style='float: left;margin-top: 10px;background-color: #ff8f00!important;margin-left: 5px;margin-right: 5px;'></div>";
					$('#' + this._id + 'btn').replaceWith(clickBtn);				
				} else {
					var onClick = '';
					clickBtn = "<div id='" + this._id + "btn' " + onClick + " class='btn-floating btn-small disabled fa fa-gavel' style='float: left;margin-top: 10px;margin-left: 5px;margin-right: 5px;'></div>";
					$('#' + this._id + 'btn').replaceWith(clickBtn);				
				}				
			}
			var dd = this._bands[0].totals[cursor.toISOString().substring(0,10)];
			if (dd) {
				if (dd < "00:00") {
					$('#' + this._id).css('border-bottom', '4px solid #ec7d75').text(dd);
				} else {
					$('#' + this._id).css('border-bottom', '4px solid #98d460').text(dd);
				}					
			} else {	
				$('#' + this._id).css('border-bottom', '4px solid transparent').text('00:00');
			}
            this._trigger('change', null, { cursor: new Date(this._getCursorMs()) } );
        },

        cursor: function(date) {
            if (date)   {
                //this._animateTo(createDate(date).getTime());
				this._place(date.getTime());
				this._triggerChange();
            }
            else    {
                return new Date(this._getCursorMs());
            }
        },

        find: function(id) {
            // use == in stead of === to find string key in case v.id is integer
            var found = _.find(this.options.events, function(v) { return v.id == id; });
            if (found)  {
                this._animateTo(found.start.getTime());
            }
        }
    });

} (jQuery));