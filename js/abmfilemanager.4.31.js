var ABMFileManager = function(e, t) {
    var i, s = this;
	var isrtl;
	
    function a() {
		console.log(s.isrtl);//
		s.isBig = !s.isBig, s.isBig ? $("#" + s.id + "-view-i")
            .html("view_list") : $("#" + s.id + "-view-i")
            .html("view_module"), y()
    }

    function n() {
        s.options.canUpload ? $("#" + s.id + "-background")
            .removeClass("hide") : $("#" + s.id + "-background")
            .hasClass("hide") || $("#" + s.id + "-background")
            .addClass("hide");
        var e = $("#" + s.id + "-buttons");
        e.html("");
        var t = "";
        s.options.canUpload ? $("#" + s.id + "-upload")
            .length ? $("#" + s.id + "-upload")
            .removeClass("hide") : (t = "", s.ttupload && (t = '<span class="abmfiletooltiptext abmfiletooltiptext' + s.theme + '">' + s.ttupload + "</span>"), e.append('<li id="' + s.id + '-upload" style="margin-left:15px;margin-right:10px;float:right;cursor: pointer" class="abmfiletooltip abmfiletooltip' + s.theme + '"><div><label style="cursor: pointer" for="' + s.id + '-input" class="material-icons white-text">cloud_upload</label>' + t + '<input id="' + s.id + '-input" type="file" class="hide"/></div></li>')) : $("#" + s.id + "-upload")
            .length && ($("#" + s.id + "-upload")
                .hasClass("hide") || $("#" + s.id + "-upload")
                .addClass("hide")), s.options.canDownload ? $("#" + s.id + "-download")
            .length ? $("#" + s.id + "-download")
            .removeClass("hide") : (t = "", s.ttdownload && (t = '<span class="abmfiletooltiptext abmfiletooltiptext' + s.theme + '">' + s.ttdownload + "</span>"), e.append('<li id="' + s.id + '-download" style="margin-left: 15px;float:right;cursor: pointer" class="abmfiletooltip abmfiletooltip' + s.theme + ' hide"><a><i class="material-icons white-text">file_download</i></a>' + t + "</li>")) : $("#" + s.id + "-download")
            .length && ($("#" + s.id + "-download")
                .hasClass("hide") || $("#" + s.id + "-download")
                .addClass("hide")), s.options.canDelete ? $("#" + s.id + "-delete")
            .length ? $("#" + s.id + "-delete")
            .removeClass("hide") : (t = "", s.ttdelete && (t = '<span class="abmfiletooltiptext abmfiletooltiptext' + s.theme + '">' + s.ttdelete + "</span>"), e.append('<li id="' + s.id + '-delete" style="margin-left: 15px;float:right;cursor: pointer" class="abmfiletooltip abmfiletooltip' + s.theme + ' hide"><a><i class="material-icons white-text">delete_forever</i></a>' + t + "</li>")) : $("#" + s.id + "-delete")
            .length && ($("#" + s.id + "-delete")
                .hasClass("hide") || $("#" + s.id + "-delete")
                .addClass("hide")), s.options.canCreate ? $("#" + s.id + "-create")
            .length ? $("#" + s.id + "-create")
            .removeClass("hide") : (t = "", s.ttcreate && (t = '<span class="abmfiletooltiptext abmfiletooltiptext' + s.theme + '">' + s.ttcreate + "</span>"), e.append('<li id="' + s.id + '-create" style="margin-left: 15px;float:right;cursor: pointer" class="abmfiletooltip abmfiletooltip' + s.theme + ' hide"><a><i class="material-icons white-text">folder_open</i></a>' + t + "</li>")) : $("#" + s.id + "-create")
            .length && ($("#" + s.id + "-create")
                .hasClass("hide") || $("#" + s.id + "-create")
                .addClass("hide")), s.options.canPaste ? $("#" + s.id + "-paste")
            .length ? $("#" + s.id + "-paste")
            .removeClass("hide") : (t = "", s.ttpaste && (t = '<span class="abmfiletooltiptext abmfiletooltiptext' + s.theme + '">' + s.ttpaste + "</span>"), e.append('<li id="' + s.id + '-paste" style="margin-left: 15px;float:right;cursor: pointer" class="abmfiletooltip abmfiletooltip' + s.theme + ' hide"><a><i class="material-icons white-text">content_paste</i></a>' + t + "</li>")) : $("#" + s.id + "-paste")
            .length && ($("#" + s.id + "-paste")
                .hasClass("hide") || $("#" + s.id + "-paste")
                .addClass("hide")), s.options.canCopy ? $("#" + s.id + "-copy")
            .length ? $("#" + s.id + "-copy")
            .removeClass("hide") : (t = "", s.ttcopy && (t = '<span class="abmfiletooltiptext abmfiletooltiptext' + s.theme + '">' + s.ttcopy + "</span>"), e.append('<li id="' + s.id + '-copy" style="margin-left: 15px;float:right;cursor: pointer" class="abmfiletooltip abmfiletooltip' + s.theme + ' hide"><a><i class="material-icons white-text">content_copy</i></a>' + t + "</li>")) : $("#" + s.id + "-copy")
            .length && ($("#" + s.id + "-copy")
                .hasClass("hide") || $("#" + s.id + "-copy")
                .addClass("hide")), s.options.canCut ? $("#" + s.id + "-cut")
            .length ? $("#" + s.id + "-cut")
            .removeClass("hide") : (t = "", s.ttcut && (t = '<span class="abmfiletooltiptext abmfiletooltiptext' + s.theme + '">' + s.ttcut + "</span>"), e.append('<li id="' + s.id + '-cut" style="margin-left: 15px;float:right;cursor: pointer" class="abmfiletooltip abmfiletooltip' + s.theme + ' hide"><a><i class="material-icons white-text">content_cut</i></a>' + t + "</li>")) : $("#" + s.id + "-cut")
            .length && ($("#" + s.id + "-cut")
                .hasClass("hide") || $("#" + s.id + "-cut")
                .addClass("hide")), s.options.canRename ? $("#" + s.id + "-rename")
            .length ? $("#" + s.id + "-rename")
            .removeClass("hide") : (t = "", s.ttrename && (t = '<span class="abmfiletooltiptext abmfiletooltiptext' + s.theme + '">' + s.ttrename + "</span>"), e.append('<li id="' + s.id + '-rename" style="margin-left: 15px;float:right;cursor: pointer" class="abmfiletooltip abmfiletooltip' + s.theme + ' hide"><a><i class="material-icons white-text">create</i></a>' + t + "</li>")) : $("#" + s.id + "-rename")
            .length && ($("#" + s.id + "-rename")
                .hasClass("hide") || $("#" + s.id + "-rename")
                .addClass("hide")),
            function() {
                s.options.canUpload;
                s.options.canDownload ? s.supportsTouch ? ($("#" + s.id)
                        .find("#" + s.id + "-download")[0].removeEventListener("touchend", l), $("#" + s.id)
                        .find("#" + s.id + "-download")[0].addEventListener("touchend", l, !1)) : ($("#" + s.id)
                        .find("#" + s.id + "-download")[0].removeEventListener("click", l), $("#" + s.id)
                        .find("#" + s.id + "-download")[0].addEventListener("click", l, !1)) : $("#" + s.id)
                    .find("#" + s.id + "-download")
                    .length && $("#" + s.id)
                    .find("#" + s.id + "-download")[0].removeEventListener("touchend", l);
                s.options.canDelete ? s.supportsTouch ? ($("#" + s.id)
                        .find("#" + s.id + "-delete")[0].removeEventListener("touchend", p), $("#" + s.id)
                        .find("#" + s.id + "-delete")[0].addEventListener("touchend", p, !1)) : ($("#" + s.id)
                        .find("#" + s.id + "-delete")[0].removeEventListener("click", p), $("#" + s.id)
                        .find("#" + s.id + "-delete")[0].addEventListener("click", p, !1)) : $("#" + s.id)
                    .find("#" + s.id + "-delete")
                    .length && $("#" + s.id)
                    .find("#" + s.id + "-delete")[0].removeEventListener("touchend", p);
                s.options.canCreate ? s.supportsTouch ? ($("#" + s.id)
                        .find("#" + s.id + "-create")[0].removeEventListener("touchend", h), $("#" + s.id)
                        .find("#" + s.id + "-create")[0].addEventListener("touchend", h, !1)) : ($("#" + s.id)
                        .find("#" + s.id + "-create")[0].removeEventListener("click", h), $("#" + s.id)
                        .find("#" + s.id + "-create")[0].addEventListener("click", h, !1)) : $("#" + s.id)
                    .find("#" + s.id + "-create")
                    .length && $("#" + s.id)
                    .find("#" + s.id + "-create")[0].removeEventListener("touchend", h);
                s.options.canPaste ? s.supportsTouch ? ($("#" + s.id)
                        .find("#" + s.id + "-paste")[0].removeEventListener("touchend", m), $("#" + s.id)
                        .find("#" + s.id + "-paste")[0].addEventListener("touchend", m, !1)) : ($("#" + s.id)
                        .find("#" + s.id + "-paste")[0].removeEventListener("click", m), $("#" + s.id)
                        .find("#" + s.id + "-paste")[0].addEventListener("click", m, !1)) : $("#" + s.id)
                    .find("#" + s.id + "-paste")
                    .length && $("#" + s.id)
                    .find("#" + s.id + "-paste")[0].removeEventListener("touchend", m);
                s.options.canCopy ? s.supportsTouch ? ($("#" + s.id)
                        .find("#" + s.id + "-copy")[0].removeEventListener("touchend", f), $("#" + s.id)
                        .find("#" + s.id + "-copy")[0].addEventListener("touchend", f, !1)) : ($("#" + s.id)
                        .find("#" + s.id + "-copy")[0].removeEventListener("click", f), $("#" + s.id)
                        .find("#" + s.id + "-copy")[0].addEventListener("click", f, !1)) : $("#" + s.id)
                    .find("#" + s.id + "-copy")
                    .length && $("#" + s.id)
                    .find("#" + s.id + "-copy")[0].removeEventListener("touchend", f);
                s.options.canCut ? s.supportsTouch ? ($("#" + s.id)
                        .find("#" + s.id + "-cut")[0].removeEventListener("touchend", d), $("#" + s.id)
                        .find("#" + s.id + "-cut")[0].addEventListener("touchend", d, !1)) : ($("#" + s.id)
                        .find("#" + s.id + "-cut")[0].removeEventListener("click", d), $("#" + s.id)
                        .find("#" + s.id + "-cut")[0].addEventListener("click", d, !1)) : $("#" + s.id)
                    .find("#" + s.id + "-cut")
                    .length && $("#" + s.id)
                    .find("#" + s.id + "-cut")[0].removeEventListener("touchend", d);
                s.options.canRename ? s.supportsTouch ? ($("#" + s.id)
                        .find("#" + s.id + "-rename")[0].removeEventListener("touchend", u), $("#" + s.id)
                        .find("#" + s.id + "-rename")[0].addEventListener("touchend", u, !1)) : ($("#" + s.id)
                        .find("#" + s.id + "-rename")[0].removeEventListener("click", u), $("#" + s.id)
                        .find("#" + s.id + "-rename")[0].addEventListener("click", u, !1)) : $("#" + s.id)
                    .find("#" + s.id + "-rename")
                    .length && $("#" + s.id)
                    .find("#" + s.id + "-rename")[0].removeEventListener("touchend", u);
                x()
            }()
    }

    function o() {
        s.isBig ? s.supportsTouch ? $("#" + s.id)
            .find(".abmfilebig:not(.abmtypefolder)")
            .each(function() {
                this.removeEventListener("touchend", v), this.addEventListener("touchend", v, !1)
            }) : $("#" + s.id)
            .find(".abmfilebig")
            .each(function() {
                this.removeEventListener("click", v), this.addEventListener("click", v, !1)
            }) : s.supportsTouch ? $("#" + s.id)
            .find(".abmfilelistitem:not(.abmtypefolder)")
            .each(function() {
                this.removeEventListener("touchend", v), this.addEventListener("touchend", v, !1)
            }) : $("#" + s.id)
            .find(".abmfilelistitem")
            .each(function() {
                this.removeEventListener("click", v), this.addEventListener("click", v, !1)
            })
    }

    function l(e) {
        var t = r();
        b4j_raiseEvent("page_parseevent", {
            eventname: s.id + "_requestfordownload",
            eventparams: "jsonlist",
            jsonlist: t
        })
    }

    function d(e) {
        s.selectedFiles = {}, s.CopyCutFolder = s.CurrentFolder, s.CopyOrCut = "cut";
        for (var t = 0; t < s.files.length; t++) {
            file = s.files[t];
            var i = $('[data-pos="' + t + '"]');
            file.isActive ? (file.isCut = !0, file.isCopy = !1, i.hasClass("copy") && i.removeClass("copy"), i.hasClass("move") || i.addClass("move"), s.selectedFiles["" + file.name] = g(file)) : (file.isCut = !1, file.isCopy = !1, i.removeClass("move"), i.removeClass("copy"))
        }
        x()
    }

    function r() {
        for (var e = {}, t = [], i = 0; i < s.files.length; i++) {
            var a = s.files[i];
            if (a.isActive) {
                var n = {};
                n.icon = a.icon, n.name = a.name, n.folder = a.folder, n.size = a.size, n.date = a.date, n.image = a.image, t.push(n)
            }
        }
        return e.files = t, JSON.stringify(e)
    }

    function c() {
        var e = {},
            t = [];
        for (var i in s.selectedFiles) {
            var a = s.selectedFiles[i],
                n = {};
            n.icon = a.icon, n.name = a.name, n.folder = a.folder, n.size = a.size, n.date = a.date, n.image = a.image, t.push(n)
        }
        return e.files = t, JSON.stringify(e)
    }

    function f(e) {
        s.selectedFiles = {}, s.CopyCutFolder = s.CurrentFolder, s.CopyOrCut = "copy";
        for (var t = 0; t < s.files.length; t++) {
            file = s.files[t];
            var i = $('[data-pos="' + t + '"]');
            file.isActive ? (file.isCut = !1, file.isCopy = !0, i.hasClass("move") && i.removeClass("move"), i.hasClass("copy") || i.addClass("copy"), s.selectedFiles["" + file.name] = g(file)) : (file.isCut = !1, file.isCopy = !1, i.removeClass("move"), i.removeClass("copy"))
        }
        x()
    }

    function m(e) {
        if ("cut" == s.CopyOrCut) {
            var t = c();
            b4j_raiseEvent("page_parseevent", {
                eventname: s.id + "_requestforcutpaste",
                eventparams: "fromfolder,jsonlist",
                fromfolder: s.CopyCutFolder,
                jsonlist: t
            })
        } else {
            t = c();
            b4j_raiseEvent("page_parseevent", {
                eventname: s.id + "_requestforcopypaste",
                eventparams: "fromfolder,jsonlist",
                fromfolder: s.CopyCutFolder,
                jsonlist: t
            })
        }
        x()
    }

    function p(e) {
        var t = r();
        b4j_raiseEvent("page_parseevent", {
            eventname: s.id + "_requestfordelete",
            eventparams: "jsonlist",
            jsonlist: t
        }), x()
    }

    function u(e) {
        for (var t, i = 0; i < s.files.length && !(t = s.files[i])
            .isActive; i++);
        b4j_raiseEvent("page_parseevent", {
            eventname: s.id + "_requestforrename",
            eventparams: "oldfilename",
            oldfilename: t.name
        })
    }

    function h(e) {
        b4j_raiseEvent("page_parseevent", {
            eventname: s.id + "_requestforcreatefolder",
            eventparams: ""
        })
    }

    function v(e) {
        if (!abmdragging) {
            $(this)
                .toggleClass("active");
            var t = $(this)
                .hasClass("active"),
                i = s.files[$(this)
                    .data("pos")];
            i.isActive = t, t ? s.selected++ : s.selected--, s.selectedFiles = {};
            for (var a = 0; a < s.files.length; a++) {
                (i = s.files[a])
                .isCut = !1, i.isCopy = !1;
                var n = $('[data-pos="' + a + '"]');
                n.removeClass("move"), n.removeClass("copy")
            }
            return $("#" + s.id + "-info")
                .html('<i class="fa fa-check-circle" style="position: relative;top: 2px;left: -5px;font-size: 24px;"></i><b>' + s.selected + "</b>"), x(), e.stopPropagation(), e.preventDefault ? e.preventDefault() : e.returnValue && (e.returnValue = !1), !1
        }
    }

    function g(e) {
        var t = {};
        return t.icon = e.icon, t.name = e.name, t.folder = e.folder, t.size = e.size, t.date = e.date, t.image = e.image, t
    }

    function b() {
        if (!$(this)
            .hasClass("active")) {
            var e = $(this)
                .attr("id")
                .substring(s.id.length + 1),
                t = s.folders[e];
            b4j_raiseEvent("page_parseevent", {
                eventname: s.id + "_folderchange",
                eventparams: "folder",
                folder: t.fullPath
            })
        }
    }

    function C() {
        var e = $(this)
            .attr("id")
            .substring(s.id.length + 2),
            t = s.crumbs[e];
        b4j_raiseEvent("page_parseevent", {
            eventname: s.id + "_folderchange",
            eventparams: "folder",
            folder: t.fullPath
        })
    }

    function y() {
        w();
        var e = $("#" + s.id)
            .find(".abmfilesall")
            .find(".col");
        if (s.FileCounter = 0, s.supportsTouch ? $("#" + s.id)
            .find(".abmtypefolder")
            .each(function() {
                $(this)
                    .off("touchstart")
            }) : $("#" + s.id)
            .find(".abmtypefolder")
            .each(function() {
                $(this)
                    .off("dblclick")
            }), s.isBig)
            for (var t = 0; t < s.files.length; t++) {
                var i = s.files[t];
                "" != s.Filter ? i.name.toLowerCase()
                    .indexOf(s.Filter) > -1 && s.AddAFile(e, i) : s.AddAFile(e, i)
            } else {
                $newDiv = '<div class="row abmfilelistheader abmfilelistheader' + s.theme + '"><div class="col s12 m9 l5 offset-s0 offset-m0 offset-l0"><a ><span>' + s.options.Name + '</span></a></div><div class="col s0 m3 l3 offset-s0 offset-m0 offset-l0 abmfileright abmfilelistitemsize"><a ><span>' + s.options.Size + '</span></a></div><div class="col s0 m0 l4 offset-s0 offset-m0 offset-l0 abmfilelistitemdate"><a ><span>' + s.options.Date + "</span></a></div></div>", e.append($newDiv);
                for (t = 0; t < s.files.length; t++) {
                    i = s.files[t];
                    "" != s.Filter ? i.name.toLowerCase()
                        .indexOf(s.Filter) > -1 && s.AddAFile(e, i) : s.AddAFile(e, i)
                }
            }
        o(), s.supportsTouch ? $("#" + s.id)
            .find(".abmtypefolder")
            .each(function() {
                $(this)
                    .on("touchstart", function(e) {
                        $(this)
                            .attr("id");
                        if (!s.tapedTwice) return s.tapedTwice = !0, setTimeout(function() {
                            s.tapedTwice = !1
                        }, 300), !1;
                        event.preventDefault();
                        var t = s.files[$(this)
                                .data("pos")],
                            i = "";
                        i = "" != s.CurrentFolder ? s.CurrentFolder + "/" + t.name : t.name, b4j_raiseEvent("page_parseevent", {
                            eventname: s.id + "_folderchange",
                            eventparams: "folder",
                            folder: i
                        })
                    })
            }) : $("#" + s.id)
            .find(".abmtypefolder")
            .each(function() {
                $(this)
                    .on("dblclick", function(e) {
                        e.preventDefault ? e.preventDefault() : e.returnValue && (e.returnValue = !1);
                        var t = s.files[$(this)
                                .data("pos")],
                            i = "";
                        i = "" != s.CurrentFolder ? s.CurrentFolder + "/" + t.name : t.name, b4j_raiseEvent("page_parseevent", {
                            eventname: s.id + "_folderchange",
                            eventparams: "folder",
                            folder: i
                        })
                    })
            })
    }

    function w() {
        s.isBig ? s.supportsTouch ? $("#" + s.id)
            .find(".abmfilebig")
            .each(function() {
                this.removeEventListener("touchend", v)
            }) : $("#" + s.id)
            .find(".abmfilebig")
            .each(function() {
                this.removeEventListener("click", v)
            }) : s.supportsTouch ? $("#" + s.id)
            .find(".abmfilelistitem")
            .each(function() {
                this.removeEventListener("touchend", v)
            }) : $("#" + s.id)
            .find(".abmfilelistitem")
            .each(function() {
                this.removeEventListener("click", v)
            }), $("#" + s.id)
            .find(".abmfilesall")
            .find(".col")
            .html("")
    }

    function x() {
        for (var e = 0, t = 0; t < s.files.length; t++) !0 === s.files[t].isActive && e++;
        s.options.canCreate && $("#" + s.id + "-create")
            .removeClass("hide"), e > 0 ? (s.options.canDownload && $("#" + s.id + "-download")
                .removeClass("hide"), s.options.canCut && $("#" + s.id + "-cut")
                .removeClass("hide"), s.options.canCopy && $("#" + s.id + "-copy")
                .removeClass("hide"), s.options.canPaste && (Object.keys(s.selectedFiles)
                    .length > 0 ? $("#" + s.id + "-paste")
                    .removeClass("hide") : $("#" + s.id + "-paste")
                    .hasClass("hide") || $("#" + s.id + "-paste")
                    .addClass("hide")), s.options.canDelete && $("#" + s.id + "-delete")
                .removeClass("hide"), s.options.canRename && (1 == e ? $("#" + s.id + "-rename")
                    .removeClass("hide") : $("#" + s.id + "-rename")
                    .hasClass("hide") || $("#" + s.id + "-rename")
                    .addClass("hide"))) : (s.options.canDownload && ($("#" + s.id + "-download")
                .hasClass("hide") || $("#" + s.id + "-download")
                .addClass("hide")), s.options.canCut && ($("#" + s.id + "-cut")
                .hasClass("hide") || $("#" + s.id + "-cut")
                .addClass("hide")), s.options.canCopy && ($("#" + s.id + "-copy")
                .hasClass("hide") || $("#" + s.id + "-copy")
                .addClass("hide")), s.options.canDelete && ($("#" + s.id + "-delete")
                .hasClass("hide") || $("#" + s.id + "-delete")
                .addClass("hide")), s.options.canRename && ($("#" + s.id + "-rename")
                .hasClass("hide") || $("#" + s.id + "-rename")
                .addClass("hide")), s.options.canPaste && (Object.keys(s.selectedFiles)
                .length > 0 ? $("#" + s.id + "-paste")
                .removeClass("hide") : $("#" + s.id + "-paste")
                .hasClass("hide") || $("#" + s.id + "-paste")
                .addClass("hide")))
    }
    s.id = e, s.isBig = t.isBig, s.isrtl = (t.rtl ? 'abmrtl': ''), s.files = {}, s.folders = {}, s.crumbs = {}, s.options = t, s.supportsTouch = !0, s.selectedFiles = {}, s.IsDragging = !1, s.FileCounter = 0, s.singleClickCalled = !1, s.CurrentFolder = "", s.Filter = "", s.counter = 0, s.CopyCutFolder = "", s.CopyOrCut = "", s.tapedTwice = !1, s.theme = t.theme, "desktop" == $("#devicetype")
        .html() && (s.supportsTouch = !1), s.selected = 0,
        function(e) {
            var t = "Drop zone";
            s.supportsTouch && (t = "");
            $("#" + s.id)
                .html("") && $("#" + s.id)
                .html('<div class="abmfileheader abmfileheader' + s.theme + '"><div class="row"><div class="col s4 m5 l6 offset-s0 offset-m0 offset-l0 transparent" style="height: 54px; padding-right:0px"><div class="abmfilebreadcrumbs"></div></div><div class="col s8 m7 l6 offset-s0 offset-m0 offset-l0 transparent" style="padding-left:0px; padding-right: 2px"><ul><li id="' + s.id + '-view" style="float:right;cursor: pointer;margin-right:10px" class=""><a><i id="' + s.id + '-view-i" class="material-icons white-text">view_module</i></a></li><li id="' + s.id + '-search" style="margin-left: 15px;float:right;cursor: pointer" class="' + s.isrtl + '"><div id="' + s.id + '-form" class="abmfilebuttons"><input id="' + s.id + '-filter" class="abmfileinput abmfileinput' + s.theme + '" type="search" placeholder="Search"></div></li></ul></div></div></div><div class="abmfilewrapper"><div class="row abmfileheight"><div class="col s0 m0 l4 offset-s0 offset-m0 offset-l0 abmfilesidebar abmfilesidebar' + s.theme + '"><div class="abmfoldersall"></div></div><div class="col s12 m12 l8 offset-s0 offset-m0 offset-l0 transparent abmfilesallwrapper"><div class="abmfilesall"><div id="' + s.id + '-background" class="abmfiledropzone abmfiledropzone' + s.theme + '" ><div class="valign-wrapper" style="height: 100%;"><p id="bg-text" style="width: 100%;" class="center-align">' + t + '</p></div></div><div class="col s12 m12 l12 offset-s0 offset-m0 offset-l0 abmfileoverflow"></div></div></div></div></div><div class="abmfilefooter abmfilefooter' + s.theme + '"><div class="row"><div class="col s2 m4 l4 offset-s0 offset-m0 offset-l0 transparent"  style="padding-right: 0px"><ul><li class="abmfileinfo abmfileinfo' + s.theme + '"><span id="' + s.id + '-info"><i class="fa fa-check-circle" style="position: relative;top: 2px;left: -5px;font-size: 24px"></i>0</span></li></ul></div><div class="col s10 m8 l8 offset-s0 offset-m0 offset-l0 transparent" style="padding-left: 0px; padding-right: 2px"><ul id="' + s.id + '-buttons"></ul></div></div></div>');
            $("#" + s.id + "-filter")
                .on("input", function(e) {
                    return s.Filter = "" + $("#" + s.id + "-filter")
                        .val()
                        .toLowerCase(), y(), !1
                }), n(), s.isBig ? $("#" + s.id + "-view-i")
                .html("view_list") : $("#" + s.id + "-view-i")
                .html("view_module");
            s.supportsTouch ? $("#" + s.id + "-view-i")[0].addEventListener("touchend", a, !1) : $("#" + s.id + "-view-i")[0].addEventListener("click", a, !1);
            o(), $("#" + s.id + "-background")
                .dmUploader({
                    maxFileSize: s.options.maxSize,
                    parent: s,
                    extFilter: s.options.Exts,
                    url: s.options.url
                }), $(document)
                .on("dragleave", function(e) {
                    window.clearTimeout(i), i = window.setTimeout(function() {
                        $("#" + s.id + "-background")
                            .css("z-index", 0)
                    }, 85)
                }), $(document)
                .on("dragover", function(e) {
                    var t = e.originalEvent.dataTransfer;
                    t.types && (t.types.indexOf ? -1 != t.types.indexOf("Files") : t.types.contains("Files")) && ($("#" + s.id + "-background")
                        .css("z-index", 1e4), window.clearTimeout(i))
                })
        }(), this.RefreshOptions = function(e) {
            e.theme != s.theme && ($("#" + s.id)
                .addClass("abmfilemanager" + e.theme)
                .removeClass("abmfilemanager" + s.theme), $("#" + s.id)
                .addClass("abmfileheader" + e.theme)
                .removeClass("abmfileheader" + s.theme), $("#" + s.id)
                .addClass("abmfilefooter" + e.theme)
                .removeClass("abmfilefooter" + s.theme), $("#" + s.id)
                .addClass("abmfilebreadcrumb" + e.theme)
                .removeClass("abmfilebreadcrumb" + s.theme), $("#" + s.id)
                .addClass("abmfilebreadcrumbsep" + e.theme)
                .removeClass("abmfilebreadcrumbsep" + s.theme), $("#" + s.id)
                .addClass("abmfilesidebar" + e.theme)
                .removeClass("abmfilesidebar" + s.theme), $("#" + s.id)
                .addClass("abmfilefolder" + e.theme)
                .removeClass("abmfilefolder" + s.theme), $("#" + s.id)
                .addClass("abmfilebig" + e.theme)
                .removeClass("abmfilebig" + s.theme), $("#" + s.id)
                .addClass("abmfileinput" + e.theme)
                .removeClass("abmfileinput" + s.theme), $("#" + s.id)
                .addClass("abmfilelistheader" + e.theme)
                .removeClass("abmfilelistheader" + s.theme), $("#" + s.id)
                .addClass("abmfilelistitem" + e.theme)
                .removeClass("abmfilelistitem" + s.theme), $("#" + s.id)
                .addClass("abmfilelistitem-file" + e.theme)
                .removeClass("abmfilelistitem-file" + s.theme), $("#" + s.id)
                .addClass("abmfileinfo" + e.theme)
                .removeClass("abmfileinfo" + s.theme), $("#" + s.id)
                .addClass("abmfiletooltip" + e.theme)
                .removeClass("abmfiletooltip" + s.theme), $("#" + s.id)
                .addClass("abmfiletooltiptext" + e.theme)
                .removeClass("abmfiletooltiptext" + s.theme), $("#" + s.id)
                .addClass("abmfiledropzone" + e.theme)
                .removeClass("abmfiledropzone" + s.theme)), s.theme = e.theme;
            var t = !1;
            s.options.isBig != e.isBig && (t = !0), s.options = e, n(), t && y()
        }, this.StartDownload = function(e, t, i) {
            var a, n, o, l;
            a = e, n = t, o = i, (l = new XMLHttpRequest)
                .open("GET", a, !0), l.responseType = "blob", l.onload = function(e) {
                    download(l.response, n, "application/zip")
                }, l.addEventListener("loadend", function(e) {
                    b4j_raiseEvent("page_parseevent", {
                        eventname: s.id + "_downloaded",
                        eventparams: "jobcode",
                        jobcode: o
                    })
                }), l.send()
        }, this.getSelected = function() {
            return r()
        }, this.loadFolder = function(e) {
            s.Filter = "", $("#" + s.id + "-filter")
                .val("");
            var t = $.parseJSON(e);
            s.files = t.files, s.folders = t.folders;
            var i = $("#" + s.id)
                .find(".abmfilebreadcrumbs");
            i.html(""), s.crumbs = t.crumbs, s.supportsTouch ? $("#" + s.id)
                .find(".abmfilebreadcrumb.last")
                .each(function() {
                    this.removeEventListener("touchend", C)
                }) : $("#" + s.id)
                .find(".abmfilebreadcrumb.last")
                .each(function() {
                    this.removeEventListener("click", C)
                });
            for (var a = 0, n = 0; n < s.crumbs.length; n++) s.crumbs[n].fullPath = "", n == s.crumbs.length - 1 ? (n > 0 && i.append('<div class="abmfilebreadcrumbsep abmfilebreadcrumbsep' + s.theme + ' last">&lt;</div>'), i.append('<a id="' + s.id + "_C" + n + '" class="abmfilebreadcrumb abmfilebreadcrumb' + s.theme + ' last">' + s.crumbs[n].name + "</a>"), a = n) : (i.append('<a id="' + s.id + "_C" + n + '" class="abmfilebreadcrumb abmfilebreadcrumb' + s.theme + '">' + s.crumbs[n].name + "</a>"), i.append('<div class="abmfilebreadcrumbsep abmfilebreadcrumbsep' + s.theme + '">&gt;</div>'));
            s.supportsTouch ? $("#" + s.id)
                .find(".abmfilebreadcrumb.last")
                .each(function() {
                    this.addEventListener("touchend", C, !1)
                }) : $("#" + s.id)
                .find(".abmfilebreadcrumb.last")
                .each(function() {
                    this.addEventListener("click", C, !1)
                }), s.supportsTouch ? $("#" + s.id)
                .find(".abmfilefolder")
                .each(function() {
                    this.removeEventListener("touchend", b)
                }) : $("#" + s.id)
                .find(".abmfilefolder")
                .each(function() {
                    this.removeEventListener("click", b)
                }), (i = $("#" + s.id)
                    .find(".abmfoldersall"))
                .html("");
            var o = [];
            for (n = 0; n < s.folders.length; n++) {
                var l = s.folders[n],
                    d = "folder",
                    r = "keyboard_arrow_right";
                l.isOpen = !1, "true" === l.open && (d = "folder_open", r = "keyboard_arrow_down", l.isOpen = !0);
                var c = "";
                for (l.isActive = !1, "true" === l.active && (l.isActive = !0, c = " active "); o.length - 1 >= l.level;) o.pop();
                o.push(l.name), l.fullPath = o.join("/")
                    .replace("//", "/"), l.fullPath = l.fullPath.substring(s.folders[0].name.length + 1), l.isActive && (s.CurrentFolder = l.fullPath);
                var f = '<div class="row"><div class="col s12 m12 l12 offset-s0 offset-m0 offset-l0"><div id="' + s.id + "_" + n + '" class="abmfilefolder abmfilefolder' + s.theme + c + " abmfolderlev" + l.level + '"><a><i class="material-icons">' + r + '</i></a><a ><i class="material-icons">' + d + "</i><span class='" + s.isrtl + "'>" + l.name + "</span></a></div></div></div>";
                i.append(f)
            }
            s.crumbs[a].fullPath = s.CurrentFolder.substring(0, s.CurrentFolder.length - s.crumbs[a].name.length - 1), s.supportsTouch ? $("#" + s.id)
                .find(".abmfilefolder")
                .each(function() {
                    this.addEventListener("touchend", b, !1)
                }) : $("#" + s.id)
                .find(".abmfilefolder")
                .each(function() {
                    this.addEventListener("click", b, !1)
                }), s.selected = 0, $("#" + s.id + "-info")
                .html('<i class="fa fa-check-circle" style="position: relative;top: 2px;left: -5px;font-size: 24px;"></i><b>' + s.selected + "</b>"), y(), x()
        }, this.AddAFile = function(e, t) {
            var i = "",
                a = "",
                n = "",
                o = "";
            if (s.isBig) {
                !0 === t.isActive && (a = " active "), !0 === t.isCopy && (n = " copy "), !0 === t.isCut && (o = " move ");
				var l = "",
                    d = " abmtypefolder ";
                if ("" == t.image) {
                    if ("" != t.icon) switch ("folder" != t.icon && (l = "padding-top: 12px", d = ""), t.icon.substring(0, 3)) {
                        case "mdi":
                            i = '<a data-pos="' + s.FileCounter + '" class="abmfilebig abmfilebig' + s.theme + a + n + o + d + '"><div class="abmfilethumbnailbig"><i class="' + t.icon + ' medium" style="position: relative;top: -14px;left: -14px;"></i></div><div style="' + l + '" class="abmfilebiglabel ' + s.isrtl + '">' + t.name + "</div></a>";
                            break;
                        case "fa ":
                        case "fa-":
                            i = '<a data-pos="' + s.FileCounter + '" class="abmfilebig abmfilebig' + s.theme + a + n + o + d + '"><div class="abmfilethumbnailbig"><i class="' + t.icon + ' medium" style="position: relative;top: -14px;left: -14px;"></i></div><div  style="' + l + '" class="abmfilebiglabel ' + s.isrtl + '">' + t.name + "</div></a>";
                            break;
                        case "abm":
                            console.log("abm icons are not supported!");
                            break;
                        default:
                            i = '<a data-pos="' + s.FileCounter + '" class="abmfilebig abmfilebig' + s.theme + a + n + o + d + '"><div class="abmfilethumbnailbig"><i class="material-icons medium" style="position: relative;top: -14px;left: -14px;">' + t.icon + '</i></div><div style="' + l + '"  class="abmfilebiglabel ' + s.isrtl + '">' + t.name + "</div></a>"
                    }
                } else i = '<a data-pos="' + s.FileCounter + '" class="abmfilebig abmfilebig' + s.theme + a + n + o + '"><div class="abmfilethumbnailbig"><img style="margin-top: -18px;margin-left: -18px" width=64 height=64 src="' + t.image + '"></img></div><div class="abmfilebiglabelimg ' + s.isrtl + '">' + t.name + "</div></a>";
                e.append(i)
            } else {
                !0 === t.isActive && (a = " active "), !0 === t.isCopy && (n = " copy "), !0 === t.isCut && (o = " move ");
                l = "", d = " abmtypefolder ";
				
					if ("" == t.image) {
						if ("" != t.icon) switch ("folder" != t.icon && (l = "top: 0px", d = ""), t.icon.substring(0, 3)) {
							case "mdi":
								i = '<div data-pos="' + s.FileCounter + '" class="row abmfilelistitem abmfilelistitem' + s.theme + a + n + o + d + '"><div class="col s12 m9 l5 offset-s0 offset-m0 offset-l0"><a class="abmfilelistitem-file abmfilelistitem-file' + s.theme + '"><i style="' + l + '" class="' + t.icon + '"></i><span>' + t.name + '</span></a></div><div class="col s0 m3 l3 offset-s0 offset-m0 offset-l0 abmfileright abmfilelistitemsize"><span>' + t.size + '</span></div><div class="col s0 m0 l4 offset-s0 offset-m0 offset-l0 abmfilelistitemdate"><span>' + t.date + "</span></div></div>";
								break;
							case "fa ":
							case "fa-":
								i = '<div data-pos="' + s.FileCounter + '" class="row abmfilelistitem abmfilelistitem' + s.theme + a + n + o + d + '"><div class="col s12 m9 l5 offset-s0 offset-m0 offset-l0"><a class="abmfilelistitem-file abmfilelistitem-file' + s.theme + '"><i style="' + l + '" class="' + t.icon + '"></i><span>' + t.name + '</span></a></div><div class="col s0 m3 l3 offset-s0 offset-m0 offset-l0 abmfileright abmfilelistitemsize"><span>' + t.size + '</span></div><div class="col s0 m0 l4 offset-s0 offset-m0 offset-l0 abmfilelistitemdate"><span>' + t.date + "</span></div></div>";
								break;
							case "abm":
								console.log("abm icons are not supported!");
								break;
							default:
								i = '<div data-pos="' + s.FileCounter + '" class="row abmfilelistitem abmfilelistitem' + s.theme + a + n + o + d + '"><div class="col s12 m9 l5 offset-s0 offset-m0 offset-l0"><a class="abmfilelistitem-file abmfilelistitem-file' + s.theme + '"><i style="' + l + '" class="material-icons">' + t.icon + "</i><span>" + t.name + '</span></a></div><div class="col s0 m3 l3 offset-s0 offset-m0 offset-l0 abmfileright abmfilelistitemsize"><span>' + t.size + '</span></div><div class="col s0 m0 l4 offset-s0 offset-m0 offset-l0 abmfilelistitemdate"><span>' + t.date + "</span></div></div>"
						}
					} else i = '<div data-pos="' + s.FileCounter + '" class="row abmfilelistitem abmfilelistitem' + s.theme + a + n + o + '"><div class="col s12 m9 l5 offset-s0 offset-m0 offset-l0"><a class="abmfilelistitem-file abmfilelistitem-file' + s.theme + '"><img style="margin-right: 10px;position: relative;top: 3px;" width=16 height=16 src="' + t.image + '"></img><span>' + t.name + '</span></a></div><div class="col s0 m3 l3 offset-s0 offset-m0 offset-l0 abmfileright abmfilelistitemsize"><span>' + t.size + '</span></div><div class="col s0 m0 l4 offset-s0 offset-m0 offset-l0 abmfilelistitemdate"><span>' + t.date + "</span></div></div>";
				
                e.append(i)
            }
            s.FileCounter++
        }, this.clearFolder = function() {
            w()
        }
};
! function(e, t) {
    "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : e.download = t()
}(this, function() {
    return function e(t, i, s) {
        var a, n, o = window,
            l = "application/octet-stream",
            d = s || l,
            r = t,
            c = !i && !s && r,
            f = document.createElement("a"),
            m = function(e) {
                return String(e)
            },
            p = o.Blob || o.MozBlob || o.WebKitBlob || m,
            u = i || "download";
        if (p = p.call ? p.bind(o) : Blob, "true" === String(this) && (d = (r = [r, d])[0], r = r[1]), c && c.length < 2048 && (u = c.split("/")
                .pop()
                .split("?")[0], f.href = c, -1 !== f.href.indexOf(c))) {
            var h = new XMLHttpRequest;
            return h.open("GET", c, !0), h.responseType = "blob", h.onload = function(t) {
                e(t.target.response, u, l)
            }, setTimeout(function() {
                h.send()
            }, 0), h
        }
        if (/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(r)) {
            if (!(r.length > 2096103.424 && p !== m)) return navigator.msSaveBlob ? navigator.msSaveBlob(C(r), u) : $(r);
            r = C(r), d = r.type || l
        } else if (/([\x80-\xff])/.test(r)) {
            for (var v = 0, g = new Uint8Array(r.length), b = g.length; v < b; ++v) g[v] = r.charCodeAt(v);
            r = new p([g], {
                type: d
            })
        }

        function C(e) {
            for (var t = e.split(/[:;,]/), i = t[1], s = ("base64" == t[2] ? atob : decodeURIComponent)(t.pop()), a = s.length, n = 0, o = new Uint8Array(a); n < a; ++n) o[n] = s.charCodeAt(n);
            return new p([o], {
                type: i
            })
        }

        function $(e, t) {
            if ("download" in f) return f.href = e, f.setAttribute("download", u), f.className = "download-js-link", f.innerHTML = "downloading...", f.style.display = "none", document.body.appendChild(f), setTimeout(function() {
                f.click(), document.body.removeChild(f), !0 === t && setTimeout(function() {
                    o.URL.revokeObjectURL(f.href)
                }, 250)
            }, 66), !0;
            if (/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) return /^data:/.test(e) && (e = "data:" + e.replace(/^data:([\w\/\-\+]+)/, l)), window.open(e) || confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.") && (location.href = e), !0;
            var i = document.createElement("iframe");
            document.body.appendChild(i), !t && /^data:/.test(e) && (e = "data:" + e.replace(/^data:([\w\/\-\+]+)/, l)), i.src = e, setTimeout(function() {
                document.body.removeChild(i)
            }, 333)
        }
        if (a = r instanceof p ? r : new p([r], {
                type: d
            }), navigator.msSaveBlob) return navigator.msSaveBlob(a, u);
        if (o.URL) $(o.URL.createObjectURL(a), !0);
        else {
            if ("string" == typeof a || a.constructor === m) try {
                    return $("data:" + d + ";base64," + o.btoa(a))
                } catch (e) {
                    return $("data:" + d + "," + encodeURIComponent(a))
                }(n = new FileReader)
                .onload = function(e) {
                    $(this.result)
                }, n.readAsDataURL(a)
        }
        return !0
    }
}),
function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(window.jQuery)
}(function(e) {
    "use strict";
    var t = "dmUploader",
        i = 0,
        s = 1,
        a = 2,
        n = 3,
        o = 4,
        l = {
            auto: !0,
            queue: !0,
            dnd: !0,
            hookDocument: !0,
            multiple: !0,
            url: document.URL,
            method: "POST",
            extraData: {},
            headers: {},
            dataType: null,
            fieldName: "file",
            maxFileSize: 0,
            allowedTypes: "*",
            extFilter: null,
            onInit: function() {},
            onComplete: function() {},
            onFallbackMode: function() {},
            onNewFile: function() {},
            onBeforeUpload: function() {},
            onUploadProgress: function() {},
            onUploadSuccess: function() {},
            onUploadCanceled: function() {},
            onUploadError: function() {},
            onUploadComplete: function() {},
            onFileTypeError: function() {},
            onFileSizeError: function() {},
            onFileExtError: function() {},
            onDragEnter: function() {},
            onDragLeave: function() {},
            onDocumentDragEnter: function() {},
            onDocumentDragLeave: function() {}
        };
    var d = function(e, t) {
        this.data = e, this.widget = t, this.jqXHR = null, this.status = i, this.id = Math.random()
            .toString(36)
            .substr(2)
    };
    d.prototype.upload = function() {
        var t = this;
        if (!t.canUpload()) return t.widget.queueRunning && t.status !== s && t.widget.processQueue(), !1;
        var i = new FormData;
        i.append("upl", t.data, t.name);
        var a = t.widget.settings.extraData;
        return "function" == typeof a && (a = a.call(t.widget.element, t.id)), e.each(a, function(e, t) {
            i.append(e, t)
        }), t.status = s, t.widget.activeFiles++, t.widget.settings.onBeforeUpload.call(t.widget.element, t.id), t.jqXHR = e.ajax({
            url: t.widget.settings.url,
            type: t.widget.settings.method,
            dataType: t.widget.settings.dataType,
            data: i,
            headers: t.widget.settings.headers,
            cache: !1,
            contentType: !1,
            processData: !1,
            forceSync: !1,
            xhr: function() {
                return t.getXhr()
            },
            success: function(e) {
                t.onSuccess(e)
            },
            error: function(e, i, s) {
                t.onError(e, i, s)
            },
            complete: function() {
                t.onComplete()
            }
        }), !0
    }, d.prototype.onSuccess = function(e) {
        this.status = a, this.widget.settings.onUploadSuccess.call(this.widget.element, this.id, e)
    }, d.prototype.onError = function(e, t, i) {
        this.status !== o && (this.status = n, this.widget.settings.onUploadError.call(this.widget.element, this.id, e, t, i), b4j_raiseEvent("page_parseevent", {
            eventname: this.widget.settings.parent.id + "_uploadfailed",
            eventparams: "status,message",
            status: "" + t,
            message: "" + i
        }))
    }, d.prototype.onComplete = function() {
        this.widget.activeFiles--, this.status !== o && this.widget.settings.onUploadComplete.call(this.widget.element, this.id), this.widget.queueRunning ? this.widget.processQueue() : this.widget.settings.queue && 0 === this.widget.activeFiles && (this.widget.settings.onComplete.call(this.element), b4j_raiseEvent("page_parseevent", {
            eventname: this.widget.settings.parent.id + "_uploaded",
            eventparams: ""
        }))
    }, d.prototype.getXhr = function() {
        var t = this,
            i = e.ajaxSettings.xhr();
        return i.upload && i.upload.addEventListener("progress", function(e) {
            var i = 0,
                s = e.loaded || e.position,
                a = e.total || e.totalSize;
            e.lengthComputable && (i = Math.ceil(s / a * 100)), t.widget.settings.onUploadProgress.call(t.widget.element, t.id, i)
        }, !1), i
    }, d.prototype.cancel = function(e) {
        e = void 0 !== e && e;
        var t = this.status;
        return !!(t === s || e && t === i) && (this.status = o, this.widget.settings.onUploadCanceled.call(this.widget.element, this.id), t === s && this.jqXHR.abort(), !0)
    }, d.prototype.canUpload = function() {
        return this.status === i || this.status === n
    };
    var r = function(t, i) {
        return this.element = e(t), this.settings = e.extend({}, l, i), this.checkSupport() ? (this.init(), this) : (e.error("Browser not supported by jQuery.dmUploader"), this.settings.onFallbackMode.call(this.element), !1)
    };
    r.prototype.checkSupport = function() {
        return void 0 !== window.FormData && !new RegExp("/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle/(1.0|2.0|2.5|3.0))/")
            .test(window.navigator.userAgent)
    }, r.prototype.init = function() {
        var i = this;
        this.queue = [], this.queuePos = -1, this.queueRunning = !1, this.activeFiles = 0, this.draggingOver = 0, this.draggingOverDoc = 0;
        var s = e("#" + i.settings.parent.id + "-input");
        return s.length > 0 && (s.prop("multiple", this.settings.multiple), s.on("change." + t, function(t) {
            var s = t.target && t.target.files;
            s && s.length && (i.addFiles(s), e(this)
                .val(""))
        })), this.settings.dnd && this.initDnD(), 0 !== s.length || this.settings.dnd ? (this.settings.onInit.call(this.element), this) : (e.error("Markup error found by jQuery.dmUploader"), null)
    }, r.prototype.initDnD = function() {
        var i = this;
        i.element.on("drop." + t, function(t) {
            t.preventDefault(), i.settings.parent.IsDragging = !1, e("#" + i.settings.parent.id + "-background")
                .css("z-index", 0), i.draggingOver > 0 && (i.draggingOver = 0, i.settings.onDragLeave.call(i.element));
            var s = t.originalEvent && t.originalEvent.dataTransfer;
            if (s && s.files && s.files.length) {
                var a = [];
                i.settings.multiple ? a = s.files : a.push(s.files[0]), i.addFiles(a)
            }
        }), i.element.on("dragenter." + t, function(e) {
            e.preventDefault(), 0 === i.draggingOver && i.settings.onDragEnter.call(i.element), i.draggingOver++, i.settings.parent.IsDragging = !0
        }), i.element.on("dragleave." + t, function(e) {
            e.preventDefault(), i.draggingOver--, i.settings.parent.IsDragging = !1, 0 === i.draggingOver && i.settings.onDragLeave.call(i.element)
        }), i.settings.hookDocument && (e(document)
            .off("drop." + t)
            .on("drop." + t, function(e) {
                e.preventDefault(), i.draggingOverDoc > 0 && (i.draggingOverDoc = 0, i.settings.onDocumentDragLeave.call(i.element))
            }), e(document)
            .off("dragenter." + t)
            .on("dragenter." + t, function(e) {
                e.preventDefault(), 0 === i.draggingOverDoc && i.settings.onDocumentDragEnter.call(i.element), i.draggingOverDoc++
            }), e(document)
            .off("dragleave." + t)
            .on("dragleave." + t, function(e) {
                e.preventDefault(), i.draggingOverDoc--, 0 === i.draggingOverDoc && i.settings.onDocumentDragLeave.call(i.element)
            }), e(document)
            .off("dragover." + t)
            .on("dragover." + t, function(e) {
                e.preventDefault()
            }))
    }, r.prototype.releaseEvents = function() {
        this.element.off("." + t), e("#" + widget.settings.parent.id + "-input")
            .off("." + t), this.settings.hookDocument && e(document)
            .off("." + t)
    }, r.prototype.validateFile = function(t) {
        if (this.settings.maxFileSize > 0 && t.size > this.settings.maxFileSize) return this.settings.onFileSizeError.call(this.element, t), this.settings.parent.counter++, Materialize.toast('<span id="toastabmfilemanager' + this.settings.parent.counter + '" class="white-text">' + this.settings.parent.options.toastMax + " " + function(e, t) {
                var i = t ? 1e3 : 1024;
                if (Math.abs(e) < i) return e + " B";
                var s = t ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"] : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"],
                    a = -1;
                do {
                    e /= i, ++a
                } while (Math.abs(e) >= i && a < s.length - 1);
                return e.toFixed(1) + " " + s[a]
            }(this.settings.maxFileSize, !0) + "</span>", 5e3, "rounded"), e("#toasterror" + this.settings.parent.counter)
            .parent()
            .css("background-color", "#FF0000"), !1;
        if ("*" !== this.settings.allowedTypes && !t.type.match(this.settings.allowedTypes)) return this.settings.onFileTypeError.call(this.element, t), this.settings.parent.counter++, Materialize.toast('<span id="toastabmfilemanager' + this.settings.parent.counter + '" class="white-text">' + this.settings.parent.options.toastType + "</span>", 5e3, "rounded"), e("#toasterror" + this.settings.parent.counter)
            .parent()
            .css("background-color", "#FF0000"), !1;
        if (null !== this.settings.extFilter) {
            var i = t.name.toLowerCase()
                .split(".")
                .pop();
            if (e.inArray(i, this.settings.extFilter) < 0) return this.settings.onFileExtError.call(this.element, t), this.settings.parent.counter++, Materialize.toast('<span id="toastabmfilemanager' + this.settings.parent.counter + '" class="white-text">' + this.settings.parent.options.toastExt + "</span>", 5e3, "rounded"), e("#toasterror" + this.settings.parent.counter)
                .parent()
                .css("background-color", "#FF0000"), !1
        }
        return new d(t, this)
    }, r.prototype.addFiles = function(e) {
        for (var t = 0, i = 0; i < e.length; i++) {
            var s = this.validateFile(e[i]);
            if (s) !1 !== this.settings.onNewFile.call(this.element, s.id, s.data) && (this.settings.auto && !this.settings.queue && s.upload(), this.queue.push(s), t++)
        }
        return 0 === t ? this : (this.settings.auto && this.settings.queue && !this.queueRunning && this.processQueue(), this)
    }, r.prototype.processQueue = function() {
        return this.queuePos++, this.queuePos >= this.queue.length ? (0 === this.activeFiles && (this.settings.onComplete.call(this.element), b4j_raiseEvent("page_parseevent", {
            eventname: this.settings.parent.id + "_uploaded",
            eventparams: ""
        })), this.queuePos = this.queue.length - 1, this.queueRunning = !1, !1) : (this.queueRunning || b4j_raiseEvent("page_parseevent", {
            eventname: this.settings.parent.id + "_uploadstarted",
            eventparams: ""
        }), this.queueRunning = !0, this.queue[this.queuePos].upload())
    }, r.prototype.restartQueue = function() {
        this.queuePos = -1, this.queueRunning = !1, this.processQueue()
    }, r.prototype.findById = function(e) {
        for (var t = !1, i = 0; i < this.queue.length; i++)
            if (this.queue[i].id === e) {
                t = this.queue[i];
                break
            }
        return t
    }, r.prototype.cancelAll = function() {
        var e = this.queueRunning;
        this.queueRunning = !1;
        for (var t = 0; t < this.queue.length; t++) this.queue[t].cancel();
        e && this.settings.onComplete.call(this.element)
    }, r.prototype.startAll = function() {
        if (this.settings.queue) this.restartQueue();
        else
            for (var e = 0; e < this.queue.length; e++) this.queue[e].upload()
    }, r.prototype.methods = {
        start: function(t) {
            if (this.queueRunning) return !1;
            var s = !1;
            return void 0 === t || (s = this.findById(t)) ? s ? (s.status === o && (s.status = i), s.upload()) : (this.startAll(), !0) : (e.error("File not found in jQuery.dmUploader"), !1)
        },
        cancel: function(t) {
            var i = !1;
            return void 0 === t || (i = this.findById(t)) ? i ? i.cancel(!0) : (this.cancelAll(), !0) : (e.error("File not found in jQuery.dmUploader"), !1)
        },
        reset: function() {
            return this.cancelAll(), this.queue = [], this.queuePos = -1, this.activeFiles = 0, !0
        },
        destroy: function() {
            this.cancelAll(), this.releaseEvents(), this.element.removeData(t)
        }
    }, e.fn.dmUploader = function(i) {
        var s = arguments;
        if ("string" != typeof i) return this.each(function() {
            e.data(this, t) || e.data(this, t, new r(this, i))
        });
        this.each(function() {
            var a = e.data(this, t);
            a instanceof r ? "function" == typeof a.methods[i] ? a.methods[i].apply(a, Array.prototype.slice.call(s, 1)) : e.error("Method " + i + " does not exist in jQuery.dmUploader") : e.error("Unknown plugin data found by jQuery.dmUploader")
        })
    }
});