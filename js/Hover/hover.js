
/* Hover */
function banano_abmjavascript_abmhover() {var _B=this;_B.__1="";_B.__2={};_B.__3={};_B.__4="";_B.initialize=function(__5) {_B.__1=__5;};_B.setabmtargetid=function(_id) {_B.__4=_id;};_B.loadjson=function(__7,__8) {var __9;__9={};__9=JSON.parse(__7);if (__8) {_B.__2=__9;} else {deepmerge(_B.__2,__9);}};_B.addtemplate=function(__a,__b) {_B.__3[__a.toLowerCase()]=__b;};_B.build=function(__c) {console.log("Building...");ABMRaiseEvent(_B.__1+"_IsBuild",["success"],[true]);};_B.testreturn=function() {return true;};_B.testreturn2=function() {return true;};_B.testreturn3=function(__d) {return true;};_B.addhover=function(_id) {var __e,__f;__e=null;__e=u("#"+_id);__f={};__e.nodes[0].addEventListener("mouseenter", function(__f) {if (typeof _B[("HandleMouseEnter").toLowerCase()]==="function") {return _B[("HandleMouseEnter").toLowerCase()](__f,__e,_B)};}, true);__e.nodes[0].addEventListener("mouseout", function(__f) {if (typeof _B[("HandleMouseOut").toLowerCase()]==="function") {return _B[("HandleMouseOut").toLowerCase()](__f,__e,_B)};}, true);};_B.handlemouseenter=function(__f,__10) {__10.removeClass("light-blue").addClass("red");ABMRaiseEvent(_B.__1+"_Hover",["ID","IsOver"],[__10.attr('id'),true]);};_B.handlemouseout=function(__f,__10) {__10.removeClass("red").addClass("light-blue");ABMRaiseEvent(_B.__1+"_Hover",["ID","IsOver"],[__10.attr('id'),false]);};}function banano_abmjavascript() {var _B;this.banano_ready=function() {if (_B==null) _B=this;};}var BANversion=1611313006226;var BANhover=[];