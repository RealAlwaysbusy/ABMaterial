(function() {
    var a, b = [].indexOf || function(a) {
            for (var b = 0, c = this.length; b < c; b++)
                if (b in this && this[b] === a) return b;
            return -1
        },
        c = [].slice,
        d = function(a, b) {
            return function() {
                return a.apply(b, arguments)
            }
        },
        e = {}.hasOwnProperty;
    (a = function(a) {
        return "object" == typeof exports && "object" == typeof module ? a(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
    })(function(a) {
        function f(a) {
            var b = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
            return b ? {
                r: parseInt(b[1], 16),
                g: parseInt(b[2], 16),
                b: parseInt(b[3], 16)
            } : null
        }
        var g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B;
        return h = function(a, b, c) {
            var d, e, f, g;
            for (a += "", e = a.split("."), f = e[0], g = e.length > 1 ? c + e[1] : "", d = /(\d+)(\d{3})/; d.test(f);) f = f.replace(d, "$1" + b + "$2");
            return f + g
        }, q = function(b) {
            var c;
            return c = {
                    digitsAfterDecimal: 2,
                    scaler: 1,
                    thousandsSep: ",",
                    decimalSep: ".",
                    prefix: "",
                    suffix: "",
                    showZero: !1
                }, b = a.extend({}, c, b),
                function(a) {
                    var c;
                    return isNaN(a) || !isFinite(a) ? "" : 0 !== a || b.showZero ? (c = h((b.scaler * a).toFixed(b.digitsAfterDecimal), b.thousandsSep, b.decimalSep), "" + b.prefix + c + b.suffix) : ""
                }
        }, u = q(), v = q({
            digitsAfterDecimal: 0
        }), w = q({
            digitsAfterDecimal: 1,
            scaler: 100,
            suffix: "%"
        }), i = {
            count: function(a) {
                return null == a && (a = v),
                    function() {
                        return function(b, c, d) {
                            return {
                                count: 0,
                                push: function() {
                                    return this.count++
                                },
                                value: function() {
                                    return this.count
                                },
                                format: a
                            }
                        }
                    }
            },
            countUnique: function(a) {
                return null == a && (a = v),
                    function(c) {
                        var d;
                        return d = c[0],
                            function(c, e, f) {
                                return {
                                    uniq: [],
                                    push: function(a) {
                                        var c;
                                        if (c = a[d], b.call(this.uniq, c) < 0) return this.uniq.push(a[d])
                                    },
                                    value: function() {
                                        return this.uniq.length
                                    },
                                    format: a,
                                    numInputs: null != d ? 0 : 1
                                }
                            }
                    }
            },
            listUnique: function(a) {
                return function(c) {
                    var d;
                    return d = c[0],
                        function(c, e, f) {
                            return {
                                uniq: [],
                                push: function(a) {
                                    var c;
                                    if (c = a[d], b.call(this.uniq, c) < 0) return this.uniq.push(a[d])
                                },
                                value: function() {
                                    return this.uniq.join(a)
                                },
                                format: function(a) {
                                    return a
                                },
                                numInputs: null != d ? 0 : 1
                            }
                        }
                }
            },
            sum: function(a) {
                return null == a && (a = u),
                    function(b) {
                        var c;
                        return c = b[0],
                            function(b, d, e) {
                                return {
                                    sum: 0,
                                    push: function(a) {
                                        if (!isNaN(parseFloat(a[c]))) return this.sum += parseFloat(a[c])
                                    },
                                    value: function() {
                                        return this.sum
                                    },
                                    format: a,
                                    numInputs: null != c ? 0 : 1
                                }
                            }
                    }
            },
            min: function(a) {
                return null == a && (a = u),
                    function(b) {
                        var c;
                        return c = b[0],
                            function(b, d, e) {
                                return {
                                    val: null,
                                    push: function(a) {
                                        var b, d;
                                        if (d = parseFloat(a[c]), !isNaN(d)) return this.val = Math.min(d, null != (b = this.val) ? b : d)
                                    },
                                    value: function() {
                                        return this.val
                                    },
                                    format: a,
                                    numInputs: null != c ? 0 : 1
                                }
                            }
                    }
            },
            max: function(a) {
                return null == a && (a = u),
                    function(b) {
                        var c;
                        return c = b[0],
                            function(b, d, e) {
                                return {
                                    val: null,
                                    push: function(a) {
                                        var b, d;
                                        if (d = parseFloat(a[c]), !isNaN(d)) return this.val = Math.max(d, null != (b = this.val) ? b : d)
                                    },
                                    value: function() {
                                        return this.val
                                    },
                                    format: a,
                                    numInputs: null != c ? 0 : 1
                                }
                            }
                    }
            },
            first: function(a) {
                return null == a && (a = u),
                    function(b) {
                        var c;
                        return c = b[0],
                            function(b, d, e) {
                                return {
                                    val: null,
                                    sorter: m(null != b ? b.sorters : void 0, c),
                                    push: function(a) {
                                        var b, d;
                                        if (d = a[c], this.sorter(d, null != (b = this.val) ? b : d) <= 0) return this.val = d
                                    },
                                    value: function() {
                                        return this.val
                                    },
                                    format: function(b) {
                                        return isNaN(b) ? b : a(b)
                                    },
                                    numInputs: null != c ? 0 : 1
                                }
                            }
                    }
            },
            last: function(a) {
                return null == a && (a = u),
                    function(b) {
                        var c;
                        return c = b[0],
                            function(b, d, e) {
                                return {
                                    val: null,
                                    sorter: m(null != b ? b.sorters : void 0, c),
                                    push: function(a) {
                                        var b, d;
                                        if (d = a[c], this.sorter(d, null != (b = this.val) ? b : d) >= 0) return this.val = d
                                    },
                                    value: function() {
                                        return this.val
                                    },
                                    format: function(b) {
                                        return isNaN(b) ? b : a(b)
                                    },
                                    numInputs: null != c ? 0 : 1
                                }
                            }
                    }
            },
            average: function(a) {
                return null == a && (a = u),
                    function(b) {
                        var c;
                        return c = b[0],
                            function(b, d, e) {
                                return {
                                    sum: 0,
                                    len: 0,
                                    push: function(a) {
                                        if (!isNaN(parseFloat(a[c]))) return this.sum += parseFloat(a[c]), this.len++
                                    },
                                    value: function() {
                                        return this.sum / this.len
                                    },
                                    format: a,
                                    numInputs: null != c ? 0 : 1
                                }
                            }
                    }
            },
            sumOverSum: function(a) {
                return null == a && (a = u),
                    function(b) {
                        var c, d;
                        return d = b[0], c = b[1],
                            function(b, e, f) {
                                return {
                                    sumNum: 0,
                                    sumDenom: 0,
                                    push: function(a) {
                                        if (isNaN(parseFloat(a[d])) || (this.sumNum += parseFloat(a[d])), !isNaN(parseFloat(a[c]))) return this.sumDenom += parseFloat(a[c])
                                    },
                                    value: function() {
                                        return this.sumNum / this.sumDenom
                                    },
                                    format: a,
                                    numInputs: null != d && null != c ? 0 : 2
                                }
                            }
                    }
            },
            sumOverSumBound80: function(a, b) {
                return null == a && (a = !0), null == b && (b = u),
                    function(c) {
                        var d, e;
                        return e = c[0], d = c[1],
                            function(c, f, g) {
                                return {
                                    sumNum: 0,
                                    sumDenom: 0,
                                    push: function(a) {
                                        if (isNaN(parseFloat(a[e])) || (this.sumNum += parseFloat(a[e])), !isNaN(parseFloat(a[d]))) return this.sumDenom += parseFloat(a[d])
                                    },
                                    value: function() {
                                        var b;
                                        return b = a ? 1 : -1, (.821187207574908 / this.sumDenom + this.sumNum / this.sumDenom + 1.2815515655446004 * b * Math.sqrt(.410593603787454 / (this.sumDenom * this.sumDenom) + this.sumNum * (1 - this.sumNum / this.sumDenom) / (this.sumDenom * this.sumDenom))) / (1 + 1.642374415149816 / this.sumDenom)
                                    },
                                    format: b,
                                    numInputs: null != e && null != d ? 0 : 2
                                }
                            }
                    }
            },
            fractionOf: function(a, b, d) {
                return null == b && (b = "total"), null == d && (d = w),
                    function() {
                        var e;
                        return e = 1 <= arguments.length ? c.call(arguments, 0) : [],
                            function(c, f, g) {
                                return {
                                    selector: {
                                        total: [
                                            [],
                                            []
                                        ],
                                        row: [f, []],
                                        col: [
                                            [], g
                                        ]
                                    } [b],
                                    inner: a.apply(null, e)(c, f, g),
                                    push: function(a) {
                                        return this.inner.push(a)
                                    },
                                    format: d,
                                    value: function() {
                                        return this.inner.value() / c.getAggregator.apply(c, this.selector).inner.value()
                                    },
                                    numInputs: a.apply(null, e)().numInputs
                                }
                            }
                    }
            }
        }, j = function(a) {
            return {
                Count: a.count(v),
                "Count Unique Values": a.countUnique(v),
                "List Unique Values": a.listUnique(", "),
                Sum: a.sum(u),
                "Integer Sum": a.sum(v),
                Average: a.average(u),
                Minimum: a.min(u),
                Maximum: a.max(u),
                First: a.first(u),
                Last: a.last(u),
                "Sum over Sum": a.sumOverSum(u),
                "80% Upper Bound": a.sumOverSumBound80(!0, u),
                "80% Lower Bound": a.sumOverSumBound80(!1, u),
                "Sum as Fraction of Total": a.fractionOf(a.sum(), "total", w),
                "Sum as Fraction of Rows": a.fractionOf(a.sum(), "row", w),
                "Sum as Fraction of Columns": a.fractionOf(a.sum(), "col", w),
                "Count as Fraction of Total": a.fractionOf(a.count(), "total", w),
                "Count as Fraction of Rows": a.fractionOf(a.count(), "row", w),
                "Count as Fraction of Columns": a.fractionOf(a.count(), "col", w)
            }
        }(i), s = {
            Table: function(a, b) {
                return r(a, b)
            },
            "Table Barchart": function(b, c) {
                return a(r(b, c)).barchart()
            },
            Heatmap: function(b, c) {
                return a(r(b, c)).heatmap("heatmap", c)
            },
            "Row Heatmap": function(b, c) {
                return a(r(b, c)).heatmap("rowheatmap", c)
            },
            "Col Heatmap": function(b, c) {
                return a(r(b, c)).heatmap("colheatmap", c)
            }
        }, n = {
            en: {
                aggregators: j,
                renderers: s,
                localeStrings: {
                    renderError: "An error occurred rendering the PivotTable results.",
                    computeError: "An error occurred computing the PivotTable results.",
                    uiRenderError: "An error occurred rendering the PivotTable UI.",
                    selectAll: "Select All",
                    selectNone: "Select None",
                    tooMany: "(too many to list)",
                    filterResults: "Filter values",
                    apply: "Apply",
                    cancel: "Cancel",
                    totals: "Totals",
                    vs: "vs",
                    by: "by"
                }
            }
        }, o = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], k = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], x = function(a) {
            return ("0" + a).substr(-2, 2)
        }, l = {
            bin: function(a, b) {
                return function(c) {
                    return c[a] - c[a] % b
                }
            },
            dateFormat: function(a, b, c, d, e) {
                var f;
                return null == c && (c = !1), null == d && (d = o), null == e && (e = k), f = c ? "UTC" : "",
                    function(c) {
                        var g;
                        return g = new Date(Date.parse(c[a])), isNaN(g) ? "" : b.replace(/%(.)/g, function(a, b) {
                            switch (b) {
                                case "y":
                                    return g["get" + f + "FullYear"]();
                                case "m":
                                    return x(g["get" + f + "Month"]() + 1);
                                case "n":
                                    return d[g["get" + f + "Month"]()];
                                case "d":
                                    return x(g["get" + f + "Date"]());
                                case "w":
                                    return e[g["get" + f + "Day"]()];
                                case "x":
                                    return g["get" + f + "Day"]();
                                case "H":
                                    return x(g["get" + f + "Hours"]());
                                case "M":
                                    return x(g["get" + f + "Minutes"]());
                                case "S":
                                    return x(g["get" + f + "Seconds"]());
                                default:
                                    return "%" + b
                            }
                        })
                    }
            }
        }, p = function(a) {
            return function(a, b) {
                var c, d, e, f, g, h, i;
                if (h = /(\d+)|(\D+)/g, g = /\d/, i = /^0/, "number" == typeof a || "number" == typeof b) return isNaN(a) ? 1 : isNaN(b) ? -1 : a - b;
                if (c = String(a), e = String(b), c === e) return 0;
                if (!g.test(c) || !g.test(e)) return c > e ? 1 : -1;
                for (c = c.match(h), e = e.match(h); c.length && e.length;)
                    if (d = c.shift(), f = e.shift(), d !== f) return g.test(d) && g.test(f) ? d.replace(i, ".0") - f.replace(i, ".0") : d > f ? 1 : -1;
                return c.length - e.length
            }
        }(this), t = function(a) {
            var b, c, d, e;
            d = {}, c = {};
            for (b in a) e = a[b], d[e] = b, "string" == typeof e && (c[e.toLowerCase()] = b);
            return function(a, b) {
                return null != d[a] && null != d[b] ? d[a] - d[b] : null != d[a] ? -1 : null != d[b] ? 1 : null != c[a] && null != c[b] ? c[a] - c[b] : null != c[a] ? -1 : null != c[b] ? 1 : p(a, b)
            }
        }, m = function(b, c) {
            var d;
            if (null != b)
                if (a.isFunction(b)) {
                    if (d = b(c), a.isFunction(d)) return d
                } else if (null != b[c]) return b[c];
            return p
        }, g = function() {
            function b(a, c) {
                var e, f, g, h, j, k, l, m;
                null == c && (c = {}), this.getAggregator = d(this.getAggregator, this), this.getRowKeys = d(this.getRowKeys, this), this.getColKeys = d(this.getColKeys, this), this.sortKeys = d(this.sortKeys, this), this.arrSort = d(this.arrSort, this), this.input = a, this.aggregator = null != (e = c.aggregator) ? e : i.count()(), this.aggregatorName = null != (f = c.aggregatorName) ? f : "Count", this.colAttrs = null != (g = c.cols) ? g : [], this.rowAttrs = null != (h = c.rows) ? h : [], this.valAttrs = null != (j = c.vals) ? j : [], this.sorters = null != (k = c.sorters) ? k : {}, this.derivedAttributes = null != (l = c.derivedAttributes) ? l : {}, this.filter = null != (m = c.filter) ? m : function() {
                    return !0
                }, this.tree = {}, this.rowKeys = [], this.colKeys = [], this.rowTotals = {}, this.colTotals = {}, this.allTotal = this.aggregator(this, [], []), this.sorted = !1, b.forEachRecord(this.input, this.derivedAttributes, function(a) {
                    return function(b) {
                        if (a.filter(b)) return a.processRecord(b)
                    }
                }(this))
            }
            return b.forEachRecord = function(b, c, d) {
                var f, g, h, i, j, k, l, m, n, o, p, q;
                if (f = a.isEmptyObject(c) ? d : function(a) {
                        var b, e, f;
                        for (b in c) f = c[b], a[b] = null != (e = f(a)) ? e : a[b];
                        return d(a)
                    }, a.isFunction(b)) return b(f);
                if (a.isArray(b)) {
                    if (a.isArray(b[0])) {
                        o = [];
                        for (h in b)
                            if (e.call(b, h) && (g = b[h], h > 0)) {
                                m = {}, n = b[0];
                                for (i in n) e.call(n, i) && (j = n[i], m[j] = g[i]);
                                o.push(f(m))
                            } return o
                    }
                    for (p = [], k = 0, l = b.length; k < l; k++) m = b[k], p.push(f(m));
                    return p
                }
                if (b instanceof jQuery) return q = [], a("thead > tr > th", b).each(function(b) {
                    return q.push(a(this).text())
                }), a("tbody > tr", b).each(function(b) {
                    return m = {}, a("td", this).each(function(b) {
                        return m[q[b]] = a(this).text()
                    }), f(m)
                });
                throw new Error("unknown input format")
            }, b.prototype.forEachMatchingRecord = function(a, c) {
                return b.forEachRecord(this.input, this.derivedAttributes, function(b) {
                    return function(d) {
                        var e, f, g;
                        if (b.filter(d)) {
                            for (e in a)
                                if (g = a[e], g !== (null != (f = d[e]) ? f : "null")) return;
                            return c(d)
                        }
                    }
                }(this))
            }, b.prototype.arrSort = function(a) {
                var b, c;
                return c = function() {
                        var c, d, e;
                        for (e = [], c = 0, d = a.length; c < d; c++) b = a[c], e.push(m(this.sorters, b));
                        return e
                    }.call(this),
                    function(a, b) {
                        var d, f, g;
                        for (f in c)
                            if (e.call(c, f) && (g = c[f], d = g(a[f], b[f]), 0 !== d)) return d;
                        return 0
                    }
            }, b.prototype.sortKeys = function() {
                if (!this.sorted) return this.sorted = !0, this.rowKeys.sort(this.arrSort(this.rowAttrs)), this.colKeys.sort(this.arrSort(this.colAttrs))
            }, b.prototype.getColKeys = function() {
                return this.sortKeys(), this.colKeys
            }, b.prototype.getRowKeys = function() {
                return this.sortKeys(), this.rowKeys
            }, b.prototype.processRecord = function(a) {
                var b, c, d, e, f, g, h, i, j, k, l, m, n;
                for (b = [], m = [], i = this.colAttrs, e = 0, f = i.length; e < f; e++) n = i[e], b.push(null != (j = a[n]) ? j : "null");
                for (k = this.rowAttrs, h = 0, g = k.length; h < g; h++) n = k[h], m.push(null != (l = a[n]) ? l : "null");
                if (d = m.join(String.fromCharCode(0)), c = b.join(String.fromCharCode(0)), this.allTotal.push(a), 0 !== m.length && (this.rowTotals[d] || (this.rowKeys.push(m), this.rowTotals[d] = this.aggregator(this, m, [])), this.rowTotals[d].push(a)), 0 !== b.length && (this.colTotals[c] || (this.colKeys.push(b), this.colTotals[c] = this.aggregator(this, [], b)), this.colTotals[c].push(a)), 0 !== b.length && 0 !== m.length) return this.tree[d] || (this.tree[d] = {}), this.tree[d][c] || (this.tree[d][c] = this.aggregator(this, m, b)), this.tree[d][c].push(a)
            }, b.prototype.getAggregator = function(a, b) {
                var c, d, e;
                return e = a.join(String.fromCharCode(0)), d = b.join(String.fromCharCode(0)), c = 0 === a.length && 0 === b.length ? this.allTotal : 0 === a.length ? this.colTotals[d] : 0 === b.length ? this.rowTotals[e] : this.tree[e][d], null != c ? c : {
                    value: function() {
                        return null
                    },
                    format: function() {
                        return ""
                    }
                }
            }, b
        }(), a.pivotUtilities = {
            aggregatorTemplates: i,
            aggregators: j,
            renderers: s,
            derivers: l,
            locales: n,
            naturalSort: p,
            numberFormat: q,
            sortAs: t,
            PivotData: g
        }, r = function(b, c) {
            var d, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B;
            j = {
                table: {
                    clickCallback: null
                },
                localeStrings: {
                    totals: "Totals"
                }
            }, c = a.extend(!0, {}, j, c), g = b.colAttrs, p = b.rowAttrs, r = b.getRowKeys(), i = b.getColKeys(), o = document.createElement("table"), o.className = "pvtTable", s = function(a, b, c) {
                var d, e, f, g, h, i, j, k;
                if (0 !== b) {
                    for (g = !0, k = d = 0, h = c; 0 <= h ? d <= h : d >= h; k = 0 <= h ? ++d : --d) a[b - 1][k] !== a[b][k] && (g = !1);
                    if (g) return -1
                }
                for (e = 0; b + e < a.length;) {
                    for (j = !1, k = f = 0, i = c; 0 <= i ? f <= i : f >= i; k = 0 <= i ? ++f : --f) a[b][k] !== a[b + e][k] && (j = !0);
                    if (j) break;
                    e++
                }
                return e
            }, w = document.createElement("thead");
            for (m in g)
                if (e.call(g, m)) {
                    f = g[m], y = document.createElement("tr"), 0 === parseInt(m) && 0 !== p.length && (v = document.createElement("th"), v.setAttribute("colspan", p.length), v.setAttribute("rowspan", g.length), y.appendChild(v)), v = document.createElement("th"), v.className = "pvtAxisLabel", v.textContent = f, y.appendChild(v);
                    for (l in i) e.call(i, l) && (h = i[l], B = s(i, parseInt(l), parseInt(m)), B !== -1 && (v = document.createElement("th"), v.className = "pvtColLabel", v.textContent = h[m], v.setAttribute("colspan", B), parseInt(m) === g.length - 1 && 0 !== p.length && v.setAttribute("rowspan", 2), y.appendChild(v)));
                    0 === parseInt(m) && (v = document.createElement("th"), v.className = "pvtTotalLabel", v.innerHTML = c.localeStrings.totals, v.setAttribute("rowspan", g.length + (0 === p.length ? 0 : 1)), y.appendChild(v)), w.appendChild(y)
                } if (0 !== p.length) {
                y = document.createElement("tr");
                for (l in p) e.call(p, l) && (n = p[l], v = document.createElement("th"), v.className = "pvtAxisLabel", v.textContent = n, y.appendChild(v));
                v = document.createElement("th"), 0 === g.length && (v.className = "pvtTotalLabel", v.innerHTML = c.localeStrings.totals), y.appendChild(v), o.appendChild(y)
            }
            o.appendChild(w), t = document.createElement("tbody");
            for (l in r)
                if (e.call(r, l)) {
                    q = r[l], y = document.createElement("tr");
                    for (m in q) e.call(q, m) && (z = q[m], B = s(r, parseInt(l), parseInt(m)), B !== -1 && (v = document.createElement("th"), v.className = "pvtRowLabel", v.textContent = z, v.setAttribute("rowspan", B), parseInt(m) === p.length - 1 && 0 !== g.length && v.setAttribute("colspan", 2), y.appendChild(v)));
                    for (m in i) e.call(i, m) && (h = i[m], d = b.getAggregator(q, h), A = d.value(), u = document.createElement("td"), u.className = "pvtVal row" + l + " col" + m, u.textContent = d.format(A), u.setAttribute("data-value", A), null != k && (u.onclick = k(A, q, h)), y.appendChild(u));
                    x = b.getAggregator(q, []), A = x.value(), u = document.createElement("td"), u.className = "pvtTotal rowTotal", u.textContent = x.format(A), u.setAttribute("data-value", A), null != k && (u.onclick = k(A, q, [])), u.setAttribute("data-for", "row" + l), y.appendChild(u), t.appendChild(y)
                } y = document.createElement("tr"), v = document.createElement("th"), v.className = "pvtTotalLabel", v.innerHTML = c.localeStrings.totals, v.setAttribute("colspan", p.length + (0 === g.length ? 0 : 1)), y.appendChild(v);
            for (m in i) e.call(i, m) && (h = i[m], x = b.getAggregator([], h), A = x.value(), u = document.createElement("td"), u.className = "pvtTotal colTotal", u.textContent = x.format(A), u.setAttribute("data-value", A), null != k && (u.onclick = k(A, [], h)), u.setAttribute("data-for", "col" + m), y.appendChild(u));
            return x = b.getAggregator([], []), A = x.value(), u = document.createElement("td"), u.className = "pvtGrandTotal", u.textContent = x.format(A), u.setAttribute("data-value", A), null != k && (u.onclick = k(A, [], [])), y.appendChild(u), t.appendChild(y), o.appendChild(t), o.setAttribute("data-numrows", r.length), o.setAttribute("data-numcols", i.length), o
        }, a.fn.pivot = function(b, c, d) {
            var e, f, h, j, k, l, m, o;
            null == d && (d = "en"), null == n[d] && (d = "en"), e = {
                cols: [],
                rows: [],
                hides: [],
                vals: [],
                dataClass: g,
                heatcol: "#FF0000",
                barchartcol: "#FF0000",
                filter: function() {
                    return !0
                },
                aggregator: i.count()(),
                aggregatorName: "Count",
                sorters: {},
                derivedAttributes: {},
                renderer: r
            }, j = a.extend(!0, {}, n.en.localeStrings, n[d].localeStrings), h = {
                rendererOptions: {
                    localeStrings: j
                },
                localeStrings: j
            }, k = a.extend(!0, {}, h, a.extend({}, e, c)), m = null;
            try {
                l = new k.dataClass(b, k);
                try {
                    m = k.renderer(l, k.rendererOptions)
                } catch (b) {
                    f = b, "undefined" != typeof console && null !== console && console.error(f.stack), m = a("<span>").html(k.localeStrings.renderError)
                }
            } catch (b) {
                f = b, "undefined" != typeof console && null !== console && console.error(f.stack), m = a("<span>").html(k.localeStrings.computeError)
            }
            for (o = this[0]; o.hasChildNodes();) o.removeChild(o.lastChild);
            return this.append(m)
        }, a.fn.pivotUI = function(c, d, h, i) {
            var j, k, l, m, o, q, r, s, t, u, v, w, x, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, $, _;
            null == h && (h = !1), null == i && (i = "en"), null == n[i] && (i = "en"), q = {
                derivedAttributes: {},
                aggregators: n[i].aggregators,
                renderers: n[i].renderers,
                hiddenAttributes: [],
                menuLimit: 500,
                cols: [],
                rows: [],
                hides: [],
                vals: [],
                rendererChanged: null,
                dataClass: g,
                exclusions: {},
                inclusions: {},
                heatcol: "#FF0000",
                barchartcol: "#FF0000",
                unusedAttrsVertical: 85,
                autoSortUnusedAttrs: !1,
                rendererOptions: {
                    localeStrings: n[i].localeStrings
                },
                onRefresh: null,
                filter: function() {
                    return !0
                },
                sorters: {}
            }, F = a.extend(!0, {}, n.en.localeStrings, n[i].localeStrings), E = {
                rendererOptions: {
                    localeStrings: F
                },
                localeStrings: F
            };
            var aa = {
                    Table: "Table",
                    "Table Barchart": "Table Barchart",
                    Heatmap: "Heatmap",
                    "Row Heatmap": "Row Heatmap",
                    "Col Heatmap": "Col Heatmap",
                    "Table With Subtotal": "Table",
                    "Table With Subtotal Bar Chart": "Table Barchart",
                    "Table With Subtotal Heatmap": "Heatmap",
                    "Table With Subtotal Row Heatmap": "Row Heatmap",
                    "Table With Subtotal Col Heatmap": "Col Heatmap",
                    "TSV Export": "TSV Export",
                    "Line Chart": "Line Chart",
                    "Bar Chart": "Bar Chart",
                    "Stacked Bar Chart": "Stacked Bar Chart",
                    "Area Chart": "Area Chart",
                    "Scatter Chart": "Scatter Chart"
                },
                ba = {
                    Count: "Count",
                    "Count Unique Values": "Count Unique Values",
                    "List Unique Values": "List Unique Values",
                    Sum: "Sum",
                    "Integer Sum": "Integer Sum",
                    Average: "Average",
                    Minimum: "Minimum",
                    Maximum: "Maximum",
                    First: "First",
                    Last: "Last",
                    "Sum over Sum": "Sum over Sum",
                    "80% Upper Bound": "80% Upper Bound",
                    "80% Lower Bound": "80% Lower Bound",
                    "Sum as Fraction of Total": "Sum as Fraction of Total",
                    "Sum as Fraction of Rows": "Sum as Fraction of Rows",
                    "Sum as Fraction of Columns": "Sum as Fraction of Columns",
                    "Count as Fraction of Total": "Count as Fraction of Total",
                    "Count as Fraction of Rows": "Count as Fraction of Rows",
                    "Count as Fraction of Columns": "Count as Fraction of Columns"
                };
            n[i] && (n[i].renderersMap && (aa = n[i].renderersMap), n[i].aggregatorsMap && (ba = n[i].aggregatorsMap)), s = this.data("pivotUIOptions"), J = null == s || h ? a.extend(!0, {}, E, a.extend({}, q, d)) : s;
            var ca = f(J.heatcol);
            y = ca.r, z = ca.g, A = ca.b, B = J.barchartcol;
            try {
                o = {}, G = [], L = 0, g.forEachRecord(c, J.derivedAttributes, function(a) {
                    var b, c, d, f;
                    if (J.filter(a)) {
                        G.push(a);
                        for (b in a) e.call(a, b) && null == o[b] && (o[b] = {}, L > 0 && (o[b].null = L));
                        for (b in o) f = null != (d = a[b]) ? d : "null", null == (c = o[b])[f] && (c[f] = 0), o[b][f]++;
                        return L++
                    }
                }), X = a("<table>", {
                    class: "pvtUi"
                }).attr("cellpadding", 5), T = a("<td>"), S = a("<select>").addClass("pvtRenderer").appendTo(T).bind("change", function() {
                    if ("function" == typeof J.rendererChanged) {
                        var a = S.val();
                        aa && a in aa && (a = aa[a]), J.rendererChanged(a)
                    }
                    return Q()
                }), M = J.renderers;
                for (_ in M)
                    if (e.call(M, _)) {
                        var da = _;
                        aa && da in aa && (da = aa[da]), a("<option>").val(_).html(da).appendTo(S)
                    } if (Y = a("<td>").addClass("pvtAxisContainer pvtUnused"), U = function() {
                        var a;
                        a = [];
                        for (j in o) b.call(J.hiddenAttributes, j) < 0 && a.push(j);
                        return a
                    }(), $ = !1, Z = "auto" === J.unusedAttrsVertical ? 120 : parseInt(J.unusedAttrsVertical), !isNaN(Z)) {
                    for (m = 0, w = 0, x = U.length; w < x; w++) j = U[w], m += j.length;
                    $ = m > Z
                }
                J.unusedAttrsVertical === !0 || $ ? Y.addClass("pvtVertList") : Y.addClass("pvtHorizList"), t = function(b) {
                    var c, j, t, v;
                    v = function() {
                        var a;
                        return a = []
                    }(), j = !1;
                    var w = a.inArray(b, J.hides) > -1;
					var axy = a("<li>");
                    c = w === !1 ? axy.addClass("axis_" + u).append(a("<span>").addClass("pvtAttr").text(b).data("attrName", b)) : a("<li>").addClass("hidden axis_" + u).append(a("<span>").addClass("pvtAttr").text(b).data("attrName", b)), j && c.addClass("pvtFilteredAttribute");
					var wx = a.inArray(b, J.nodropX) > -1;
					var wy = a.inArray(b, J.nodropY) > -1;
					if (wx) {axy.addClass("nodropX");}
					if (wy) {axy.addClass("nodropY");}
					return Y.append(c).append(t)
                };
                for (u in U) e.call(U, u) && (l = U[u], t(l));
                V = a("<tr>").appendTo(X), k = a("<select>").addClass("pvtAggregator").bind("change", function() {
                    return Q()
                }), N = J.aggregators;
                for (_ in N) e.call(N, _) && k.append(a("<option>").val(_).html(_));
                for (a("<td>").addClass("pvtVals").appendTo(V).append(k).append(a("<br>")), a("<td>").addClass("pvtAxisContainer pvtHorizList pvtCols").appendTo(V), W = a("<tr>").appendTo(X), W.append(a("<td>").addClass("pvtAxisContainer pvtRows").attr("valign", "top")), K = a("<td>").attr("valign", "top").addClass("pvtRendererArea").appendTo(W), J.unusedAttrsVertical === !0 || $ ? (X.find("tr:nth-child(1)").prepend(T), X.find("tr:nth-child(2)").prepend(Y)) : X.prepend(a("<tr>").append(T).append(Y)), this.html(X), O = J.cols, H = 0, C = O.length; H < C; H++) _ = O[H], this.find(".pvtCols").append(this.find(".axis_" + a.inArray(_, U)));
                for (P = J.rows, I = 0, D = P.length; I < D; I++) _ = P[I], this.find(".pvtRows").append(this.find(".axis_" + a.inArray(_, U)));
                if (null != J.aggregatorName) {
                    var ea = J.aggregatorName;
                    ba && ea in ba && (ea = ba[ea]), this.find(".pvtAggregator").val(ea)
                }
                null != J.rendererName && this.find(".pvtRenderer").val(J.rendererName), v = !0, R = function(c) {
                    return function() {
                        var d, e, f, g, h, i, j, m, n, o, q, r, s, t;
                        if (r = {
                                derivedAttributes: J.derivedAttributes,
                                localeStrings: J.localeStrings,
                                rendererOptions: J.rendererOptions,
                                sorters: J.sorters,
                                cols: [],
                                rows: [],
                                dataClass: J.dataClass
                            }, h = null != (n = J.aggregators[k.val()]([])().numInputs) ? n : 0, t = [], c.find(".pvtRows li span.pvtAttr").each(function() {
                                return r.rows.push(a(this).data("attrName"))
                            }), c.find(".pvtCols li span.pvtAttr").each(function() {								
                                return r.cols.push(a(this).data("attrName"))
                            }), c.find(".pvtVals select.pvtAttrDropdown").each(function() {								
                                return 0 === h ? a(this).remove() : (h--, "" !== a(this).val() ? t.push(a(this).val()) : void 0)
                            }), 0 !== h)
                            for (j = c.find(".pvtVals"), _ = m = 0, o = h; 0 <= o ? m < o : m > o; _ = 0 <= o ? ++m : --m) {
                                for (g = a("<select>").addClass("pvtAttrDropdown").append(a("<option>")).bind("change", function() {										
                                        return Q()
                                    }), q = 0, f = U.length; q < f; q++) l = U[q], g.append(a("<option>").val(l).text(l));
                                j.append(g)
                            }
                        if (v && (t = J.vals, u = 0, c.find(".pvtVals select.pvtAttrDropdown").each(function() {
								return a(this).val(t[u]), u++
                            }), v = !1), r.aggregatorName = k.val(), r.vals = t, r.aggregator = J.aggregators[k.val()](t), r.renderer = J.renderers[S.val()], d = {}, c.find("input.pvtFilter").not(":checked").each(function() {
                                var b;
                                return b = a(this).data("filter"), null != d[b[0]] ? d[b[0]].push(b[1]) : d[b[0]] = [b[1]]
                            }), e = {}, c.find("input.pvtFilter:checked").each(function() {
                                var b;
                                if (b = a(this).data("filter"), null != d[b[0]]) return null != e[b[0]] ? e[b[0]].push(b[1]) : e[b[0]] = [b[1]]
                            }), r.filter = function(a) {
                                var c, e, f, g;
                                if (!J.filter(a)) return !1;
                                for (e in d)
                                    if (c = d[e], f = "" + (null != (g = a[e]) ? g : "null"), b.call(c, f) >= 0) return !1;
                                return !0
                            }, K.pivot(G, r), i = a.extend({}, J, {
                                cols: r.cols,
                                rows: r.rows,
                                vals: t,
                                exclusions: d,
                                inclusions: e,
                                inclusionsInfo: e,
                                aggregatorName: k.val(),
                                rendererName: S.val()
                            }), c.data("pivotUIOptions", i), J.autoSortUnusedAttrs && (s = c.find("td.pvtUnused.pvtAxisContainer"), a(s).children("li").sort(function(b, c) {
                                return p(a(b).text(), a(c).text())
                            }).appendTo(s)), K.css("opacity", 1), null != J.onRefresh) return J.onRefresh(i)
                    }
                }(this), Q = function(a) {
                    return function() {
                        return K.css("opacity", .5), setTimeout(R, 10)
                    }
                }(this), Q();
				this.find(".pvtAxisContainer.pvtUnused").sortable({
                    update: function(a, b) {
                        if (null == b.sender) return Q()
                    },
					connectWith: this.find(".pvtAxisContainer"),
                    items: "li",					
                    placeholder: "pvtPlaceholder"
                });
				this.find(".pvtAxisContainer.pvtCols").sortable({
                    update: function(a, b) {
                        if (null == b.sender) return Q()
                    },
					receive: function(e, ui) {
						if (ui.item.hasClass("nodropX")) {
							ui.sender.sortable("cancel");
						}
					},
                    connectWith: this.find(".pvtAxisContainer"),
                    items: "li",					
                    placeholder: "pvtPlaceholder"
                });
				this.find(".pvtAxisContainer.pvtRows").sortable({
                    update: function(a, b) {
                        if (null == b.sender) return Q()
                    },
					receive: function(e, ui) {
						if (ui.item.hasClass("nodropY")) {
							ui.sender.sortable("cancel");
						}
					},
                    connectWith: this.find(".pvtAxisContainer"),
                    items: "li",					
                    placeholder: "pvtPlaceholder"
                });
            } catch (a) {
                r = a, "undefined" != typeof console && null !== console && console.error(r.stack), this.html(J.localeStrings.uiRenderError)
            }
            return this
        }, a.fn.heatmap = function(b, c) {
            var d, e, f, g, h, i, j, k, m, n;
            null == b && (b = "heatmap"), k = this.data("numrows"), j = this.data("numcols"), d = function(a, b, c) {
                var d;
                return d = function() {
                        switch (a) {
                            case "red":
                                return function(a) {
                                    return "ff" + a + a
                                };
                            case "green":
                                return function(a) {
                                    return a + "ff" + a
                                };
                            case "blue":
                                return function(a) {
                                    return "" + a + a + "ff"
                                }
                        }
                    }(),
                    function(a, d, e, f) {
                        intensity = (100 - Math.round(100 * (f - b) / (c - b))) / 100;
                        var g = 1 - intensity,
                            h = Math.round(255 * (g * (a / 255) + 1 * intensity)),
                            i = Math.round(255 * (g * (d / 255) + 1 * intensity)),
                            j = Math.round(255 * (g * (e / 255) + 1 * intensity));
                        return "rgb(" + h + "," + i + "," + j + ")"
                    }
            }, e = function(b) {
                return function(c, e) {
                    var f, g, h;
                    return g = function(d) {
                        return b.find(c).each(function() {
                            var b;
                            if (b = a(this).data("value"), null != b && isFinite(b)) return d(b, a(this))
                        })
                    }, h = [], g(function(a) {
                        return h.push(a)
                    }), f = d(e, Math.min.apply(Math, h), Math.max.apply(Math, h)), g(function(a, b) {
                        return b.css("background-color", f(y, z, A, a))
                    })
                }
            }(this);
            var o = "red";
            switch (255 == z && (o = "green"), 255 == A && (o = "green"), b) {
                case "heatmap":
                    e(".pvtVal", o);
                    break;
                case "rowheatmap":
                    for (f = h = 0, m = k; 0 <= m ? h < m : h > m; f = 0 <= m ? ++h : --h) e(".pvtVal.row" + f, o);
                    break;
                case "colheatmap":
                    for (g = i = 0, n = j; 0 <= n ? i < n : i > n; g = 0 <= n ? ++i : --i) e(".pvtVal.col" + g, o)
            }
            return e(".pvtTotal.rowTotal", o), e(".pvtTotal.colTotal", o), this
        }, a.fn.barchart = function() {
            var b, c, d, e, f, g;
            for (f = this.data("numrows"), e = this.data("numcols"), b = function(b) {
                    return function(c) {
                        var d, e, f, g;
                        return d = function(d) {
                            return b.find(c).each(function() {
                                var b;
                                if (b = a(this).data("value"), null != b && isFinite(b)) return d(b, a(this))
                            })
                        }, g = [], d(function(a) {
                            return g.push(a)
                        }), e = Math.max.apply(Math, g), f = function(a) {
                            return 100 * a / (1.4 * e)
                        }, d(function(b, c) {
                            var d, e;
                            return d = c.text(), e = a("<div>").css({
                                position: "relative",
                                height: "55px"
                            }), e.append(a("<div>").css({
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: f(b) + "%",
                                "background-color": B
                            })), e.append(a("<div>").text(d).css({
                                position: "relative",
                                "padding-left": "5px",
                                "padding-right": "5px"
                            })), c.css({
                                padding: 0,
                                "padding-top": "5px",
                                "text-align": "center"
                            }).html(e)
                        })
                    }
                }(this), c = d = 0, g = f; 0 <= g ? d < g : d > g; c = 0 <= g ? ++d : --d) b(".pvtVal.row" + c);
            return b(".pvtTotal.colTotal"), this
        }
    })
}).call(this);