
/* MultiSelect */
function banano_abmjavascript_abmmultiselect() {var _B=this;_B._meventname="";_B._allrecordsselected={};_B._filterrecords={};_B._allrecordsinfo=[];_B._searchtable=[];_B._htmltemplate="";_B._htmlparams=[];_B._htmlitemidentificationcssclass="mi-box";_B._htmlitemselectedcssclass="miselected";_B._mid="";_B._msingle=false;_B._mselected=0;_B._mtoggletype=0;_B._mfiltervalue="";_B._mallselected=false;_B._midfield="";_B._msearchfields=[];_B._monlyselectedview=false;_B._mmaxshow=0;_B._mmaxcols=0;_B._filtermulti1selected=0;_B.initialize=function(_targetid,_eventname,_maxshow,_maxcols) {_B._mid=_targetid;_B._meventname=_eventname.toLowerCase();_B._mmaxshow=_maxshow-1;_B._mmaxcols=_maxcols;_B._allrecordsselected={};_B._allrecordsinfo.length=0;_B._searchtable.length=0;_B._msearchfields.length=0;_B._filterrecords={};_B._htmlparams.length=0;_B._htmlitemidentificationcssclass="mi-box-"+_B._meventname;};_B.setsingle=function(_single) {_B._msingle=_single;};_B.settemplate=function(_template,_params,_searchfields) {_B._htmltemplate=_template;_B._htmlparams=_params;_B._msearchfields=_searchfields;};_B.loaditems=function(_jsonallstr,_idfield,_allselected,_sortfield,_sortorder) {var _jsonall,_i,_m,_term,_j,_s,_state,_lst,_tmp,_key;_B._midfield=_idfield;_B._mallselected=_allselected;_jsonall={};_jsonall=JSON.parse(_jsonallstr);_B._allrecordsinfo=DeepClone(_jsonall);_B._searchtable.length=0;if (_sortfield!="" && _B._allrecordsinfo.length>0) {if (_sortorder=="" || _sortorder.toUpperCase()=="ASC") {if (!isNaN(parseFloat(_B._allrecordsinfo[0][_sortfield])) && isFinite(_B._allrecordsinfo[0][_sortfield])) {_B._allrecordsinfo.sort(function(a, b){return a[_sortfield] - b[_sortfield]});} else {_B._allrecordsinfo.sort(function (a, b) {return a[_sortfield].toUpperCase().localeCompare(b[_sortfield].toUpperCase());});};} else {if (!isNaN(parseFloat(_B._allrecordsinfo[0][_sortfield])) && isFinite(_B._allrecordsinfo[0][_sortfield])) {_B._allrecordsinfo.sort(function(a, b){return b[_sortfield] - a[_sortfield]});} else {_B._allrecordsinfo.sort(function(a, b){if (a[_sortfield].toUpperCase().localeCompare(b[_sortfield].toUpperCase())) {return -1;} else {if (a[_sortfield].toUpperCase().localeCompare(b[_sortfield].toUpperCase())) {return 1;} else {return 0;}}});};}}for (_i=0;_i<=_B._allrecordsinfo.length-1;_i++) {_m=_B._allrecordsinfo[_i];_term="^";for (_j=0;_j<=_B._msearchfields.length-1;_j++) {_s=_m[_B._msearchfields[_j]]===undefined? "":_m[_B._msearchfields[_j]];if (_s!="") {_term=_term+_s.toLowerCase()+"^";}}_B._searchtable.push(_term);}_state=0;if (_B._mallselected) {_state=1;}_B._allrecordsselected={};_B._filterrecords={};_lst=_jsonall;for (_i=0;_i<=_lst.length-1;_i++) {_m=_lst[_i];_B._allrecordsselected[_m[_idfield]]=_state;}_tmp=null;_tmp=u("."+_B._meventname+"-mitotal");if (_B._msingle) {_tmp.html("");_tmp.addClass("mi-width100");} else {_tmp.html("/ "+Object.keys(_B._allrecordsselected).length);_tmp.removeClass("mi-width100");}if (_allselected) {_B._mselected=Object.keys(_B._allrecordsselected).length;var _keyKeys = Object.keys(_B._allrecordsselected);for (var _keyindex=0;_keyindex<_keyKeys.length;_keyindex++) {_key=_keyKeys[_keyindex];_B._allrecordsselected[_key]=1;}} else {_B._mselected=0;}_B._monlyselectedview=false;_B._mtoggletype=_state;return Object.keys(_B._allrecordsselected).length;};_B.onlyselectedview=function(_b) {_B._monlyselectedview=_b;};_B.setfiltervalue=function(_filtervalue) {_B._mfiltervalue=_filtervalue.toLowerCase();};_B.selectitems=function(_jsonselectedarraystr) {var _jsonp,_lst,_key,_i,_tmp;_jsonp={};_jsonp=JSON.parse(_jsonselectedarraystr);_lst=_jsonp;var _keyKeys = Object.keys(_B._allrecordsselected);for (var _keyindex=0;_keyindex<_keyKeys.length;_keyindex++) {_key=_keyKeys[_keyindex];_B._allrecordsselected[_key]=0;}for (_i=0;_i<=_lst.length-1;_i++) {_B._allrecordsselected[_lst[_i]]=1;}_B._mselected=_lst.length;_tmp=null;_tmp=u("."+_B._meventname+"-miselected");_tmp.html("Geselecteerd: <b>"+_B._mselected+"</b>");if (_B._mselected==Object.keys(_B._allrecordsselected).length) {_B._mtoggletype=1;} else {_B._mtoggletype=0;}};_B.getallselected=function() {var _final,_key;_final=[];_final.length=0;var _keyKeys = Object.keys(_B._allrecordsselected);for (var _keyindex=0;_keyindex<_keyKeys.length;_keyindex++) {_key=_keyKeys[_keyindex];if (1==_B._allrecordsselected[_key]) {_final.push(_key);}}_B._filtermulti1selected=_final.length;return "["+_final.join(",")+"]";};_B.getallselectedsize=function() {return _B._filtermulti1selected;};_B.build=function() {var _melement,_tmp,_selectionhtml,_newhtml,_currshow,_i,_info,_id,_tmptemplateinfo,_j,_term,_maxshow,_mitems,_mitemsingle,_mtoggle,_mreset;_melement=null;_melement=u("#"+_B._mid);_melement.html("");_tmp=null;_tmp=u("."+_B._meventname+"-mitotal");if (_B._msingle) {_tmp.html("");_tmp.addClass("mi-width100");} else {_tmp.html("/ "+Object.keys(_B._allrecordsselected).length);_tmp.removeClass("mi-width100");}_selectionhtml="";_newhtml="<div class=\"row mi-rowNM\">";if (_B._monlyselectedview) {if (_B._mfiltervalue=="") {_currshow=0;_B._filterrecords={};for (_i=0;_i<=_B._allrecordsinfo.length-1;_i++) {_info=_B._allrecordsinfo[_i];_id=_info[_B._midfield];if (1==_B._allrecordsselected[_id]) {_B._filterrecords[_id]=_B._allrecordsselected[_id];if (_currshow<=_B._mmaxshow) {if ((_currshow>0) && (_currshow % _B._mmaxcols==0)) {_newhtml=_newhtml+"</div><div class=\"row mi-rowNM\">";}_tmptemplateinfo=_B._htmltemplate;for (_j=0;_j<=_B._htmlparams.length-1;_j++) {_tmptemplateinfo=_tmptemplateinfo.split("{"+_B._htmlparams[_j]+"}").join(_info[_B._htmlparams[_j]]);}if (1==_B._allrecordsselected[_id]) {if (_B._msingle) {_tmptemplateinfo=_tmptemplateinfo.split("{selected}").join("");} else {_tmptemplateinfo=_tmptemplateinfo.split("{selected}").join(" "+_B._htmlitemselectedcssclass+" ");}} else {_tmptemplateinfo=_tmptemplateinfo.split("{selected}").join("");}_newhtml=_newhtml+_tmptemplateinfo;}_currshow=_currshow+1;}}_newhtml=_newhtml+"</div>";if (Object.keys(_B._filterrecords).length-1>_B._mmaxshow) {_newhtml=_newhtml+"<div class=\"row mi-rowNM\">";_newhtml=_newhtml+"<div class=\"col s12 m12 l12\"><h4 class=\"mi-center\">...</h4></div>";_newhtml=_newhtml+"</div>";}if (Object.keys(_B._filterrecords).length==0) {_newhtml=_newhtml+"<div class=\"row mi-rowNM\">";_newhtml=_newhtml+"<div class=\"col s12 m12 l12\"><h6 class=\"mi-center\">Geen resultaten voor deze selectie...</h6></div>";_newhtml=_newhtml+"</div>";}} else {_currshow=0;_B._filterrecords={};for (_i=0;_i<=_B._allrecordsinfo.length-1;_i++) {_info=_B._allrecordsinfo[_i];_id=_info[_B._midfield];if (1==_B._allrecordsselected[_id]) {_term=_B._searchtable[_i];if (_term.contains(_B._mfiltervalue)) {_B._filterrecords[_id]=_B._allrecordsselected[_id];if (_currshow<=_B._mmaxshow) {if ((_currshow>0) && (_currshow % _B._mmaxcols==0)) {_newhtml=_newhtml+"</div><div class=\"row mi-rowNM\">";}_tmptemplateinfo=_B._htmltemplate;for (_j=0;_j<=_B._htmlparams.length-1;_j++) {_tmptemplateinfo=_tmptemplateinfo.split("{"+_B._htmlparams[_j]+"}").join(_info[_B._htmlparams[_j]]);}if (1==_B._allrecordsselected[_id]) {_tmptemplateinfo=_tmptemplateinfo.split("{selected}").join(" "+_B._htmlitemselectedcssclass+" ");} else {_tmptemplateinfo=_tmptemplateinfo.split("{selected}").join("");}_newhtml=_newhtml+_tmptemplateinfo;}_currshow=_currshow+1;}}}_newhtml=_newhtml+"</div>";if (Object.keys(_B._filterrecords).length-1>_B._mmaxshow) {_newhtml=_newhtml+"<div class=\"row mi-rowNM\">";_newhtml=_newhtml+"<div class=\"col s12 m12 l12\"><h4 class=\"mi-center\">...</h4></div>";_newhtml=_newhtml+"</div>";}if (Object.keys(_B._filterrecords).length==0) {_newhtml=_newhtml+"<div class=\"row mi-rowNM\">";_newhtml=_newhtml+"<div class=\"col s12 m12 l12\"><h6 class=\"mi-center\">Geen resultaten voor deze selectie...</h6></div>";_newhtml=_newhtml+"</div>";}}} else {if (_B._mfiltervalue=="") {_B._filterrecords=DeepClone(_B._allrecordsselected);_maxshow=Object.keys(_B._allrecordsselected).length-1;if (_maxshow>_B._mmaxshow) {_maxshow=_B._mmaxshow;}for (_i=0;_i<=_maxshow;_i++) {if ((_i>0) && (_i % _B._mmaxcols==0)) {_newhtml=_newhtml+"</div><div class=\"row mi-rowNM\">";}_info=_B._allrecordsinfo[_i];_id=_info[_B._midfield];_tmptemplateinfo=_B._htmltemplate;for (_j=0;_j<=_B._htmlparams.length-1;_j++) {_tmptemplateinfo=_tmptemplateinfo.split("{"+_B._htmlparams[_j]+"}").join(_info[_B._htmlparams[_j]]);}if (1==_B._allrecordsselected[_id]) {if (_B._msingle) {_tmptemplateinfo=_tmptemplateinfo.split("{selected}").join("");} else {_tmptemplateinfo=_tmptemplateinfo.split("{selected}").join(" "+_B._htmlitemselectedcssclass+" ");}} else {_tmptemplateinfo=_tmptemplateinfo.split("{selected}").join("");}_newhtml=_newhtml+_tmptemplateinfo;if (_B._msingle && 1==_B._allrecordsselected[_id]) {_selectionhtml=_B._htmltemplate.split("col s12 m6 l3 multiitem").join("col s6 m12 l12 multiitem2");_selectionhtml=_selectionhtml.split("mi-box ").join("mi-box mi-box2 ");for (_j=0;_j<=_B._htmlparams.length-1;_j++) {_selectionhtml=_selectionhtml.split("{"+_B._htmlparams[_j]+"}").join(_info[_B._htmlparams[_j]]);}_selectionhtml=_selectionhtml.split("{selected}").join(" "+_B._htmlitemselectedcssclass+" ");}}_newhtml=_newhtml+"</div>";if (Object.keys(_B._filterrecords).length-1>_B._mmaxshow) {_newhtml=_newhtml+"<div class=\"row mi-rowNM\">";_newhtml=_newhtml+"<div class=\"col s12 m12 l12\"><h4 class=\"mi-center\">...</h4></div>";_newhtml=_newhtml+"</div>";}if (Object.keys(_B._filterrecords).length==0) {_newhtml=_newhtml+"<div class=\"row mi-rowNM\">";_newhtml=_newhtml+"<div class=\"col s12 m12 l12\"><h6 class=\"mi-center\">Geen resultaten voor deze selectie...</h6></div>";_newhtml=_newhtml+"</div>";}} else {_currshow=0;_B._filterrecords={};for (_i=0;_i<=_B._allrecordsinfo.length-1;_i++) {_info=_B._allrecordsinfo[_i];_term=_B._searchtable[_i];_id=_info[_B._midfield];if (_term.contains(_B._mfiltervalue)) {_B._filterrecords[_id]=_B._allrecordsselected[_id];if (_currshow<=_B._mmaxshow) {if ((_currshow>0) && (_currshow % _B._mmaxcols==0)) {_newhtml=_newhtml+"</div><div class=\"row mi-rowNM\">";}_tmptemplateinfo=_B._htmltemplate;for (_j=0;_j<=_B._htmlparams.length-1;_j++) {_tmptemplateinfo=_tmptemplateinfo.split("{"+_B._htmlparams[_j]+"}").join(_info[_B._htmlparams[_j]]);}if (1==_B._allrecordsselected[_id]) {if (_B._msingle) {_tmptemplateinfo=_tmptemplateinfo.split("{selected}").join("");} else {_tmptemplateinfo=_tmptemplateinfo.split("{selected}").join(" "+_B._htmlitemselectedcssclass+" ");}} else {_tmptemplateinfo=_tmptemplateinfo.split("{selected}").join("");}_newhtml=_newhtml+_tmptemplateinfo;}_currshow=_currshow+1;}if (_B._msingle && 1==_B._allrecordsselected[_id]) {_selectionhtml=_B._htmltemplate.split("col s12 m6 l3 multiitem").join("col s6 m12 l12 multiitem2");_selectionhtml=_selectionhtml.split("mi-box ").join("mi-box mi-box2 ");for (_j=0;_j<=_B._htmlparams.length-1;_j++) {_selectionhtml=_selectionhtml.split("{"+_B._htmlparams[_j]+"}").join(_info[_B._htmlparams[_j]]);}_selectionhtml=_selectionhtml.split("{selected}").join(" "+_B._htmlitemselectedcssclass+" ");}}_newhtml=_newhtml+"</div>";if (Object.keys(_B._filterrecords).length-1>_B._mmaxshow) {_newhtml=_newhtml+"<div class=\"row mi-rowNM\">";_newhtml=_newhtml+"<div class=\"col s12 m12 l12\"><h4 class=\"mi-center\">...</h4></div>";_newhtml=_newhtml+"</div>";}if (Object.keys(_B._filterrecords).length==0) {_newhtml=_newhtml+"<div class=\"row mi-rowNM\">";_newhtml=_newhtml+"<div class=\"col s12 m12 l12\"><h6 class=\"mi-center\">Geen resultaten voor deze selectie...</h6></div>";_newhtml=_newhtml+"</div>";}}}_melement.html(_newhtml);if (_selectionhtml!="") {_tmp.html(_selectionhtml);}_mitems=null;_mitems=u("."+_B._htmlitemidentificationcssclass);_mitems.off("click").on("click", function(event) {if (typeof _B[("HandleClick").toLowerCase()]==="function") {return _B[("HandleClick").toLowerCase()](event,_B)}});_mitemsingle=null;_mitemsingle=u(".mi-box2");_mitemsingle.off("click");_mtoggle=null;_mtoggle=u("."+_B._meventname+"-mitoggle");if (_B._msingle) {_mtoggle.off("click");} else {_mtoggle.text(""+Object.keys(_B._filterrecords).length);_mtoggle.off("click").on("click", function(event) {if (typeof _B[("HandleToggle").toLowerCase()]==="function") {return _B[("HandleToggle").toLowerCase()](event,_B)}});}_mreset=null;_mreset=u("."+_B._meventname+"-mireset");_mreset.off("click").on("click", function(event) {if (typeof _B[("HandleReset").toLowerCase()]==="function") {return _B[("HandleReset").toLowerCase()](event,_B)}});ABMRaiseEvent(_B._meventname+"_IsBuild",["success"],[true]);};_B.empty=function() {var _melement;if (_B._mid!="") {_melement=null;_melement=u("#"+_B._mid);_melement.html("");}};_B.settogglebutton=function() {var _tmp;_tmp=null;_tmp=u("."+_B._meventname+"-mitoggle");if (_B._mtoggletype==0) {_tmp.removeClass("btntoggleoff").addClass("btntoggleon");} else {_tmp.removeClass("btntoggleon").addClass("btntoggleoff");}};_B.handlereset=function(_event) {_B.resetall(_B);};_B.resetall=function() {var _key,_mitems,_tmp;var _keyKeys = Object.keys(_B._allrecordsselected);for (var _keyindex=0;_keyindex<_keyKeys.length;_keyindex++) {_key=_keyKeys[_keyindex];_B._allrecordsselected[_key]=0;}_mitems=null;_mitems=u("."+_B._htmlitemidentificationcssclass);_mitems.removeClass(_B._htmlitemselectedcssclass);_B._mselected=0;_B._mtoggletype=0;_tmp=null;_tmp=u("."+_B._meventname+"-miselected");_tmp.html("Geselecteerd: <b>"+_B._mselected+"</b>");};_B.handletoggle=function(_event) {var _key,_mitems,_tmp;if (_B._mtoggletype==1) {var _keyKeys = Object.keys(_B._filterrecords);for (var _keyindex=0;_keyindex<_keyKeys.length;_keyindex++) {_key=_keyKeys[_keyindex];_B._allrecordsselected[_key]=0;}_mitems=null;_mitems=u("."+_B._htmlitemidentificationcssclass);_mitems.removeClass(_B._htmlitemselectedcssclass);} else {var _keyKeys = Object.keys(_B._filterrecords);for (var _keyindex=0;_keyindex<_keyKeys.length;_keyindex++) {_key=_keyKeys[_keyindex];_B._allrecordsselected[_key]=1;}_mitems=null;_mitems=u("."+_B._htmlitemidentificationcssclass);_mitems.addClass(_B._htmlitemselectedcssclass);}_B._mtoggletype=1-_B._mtoggletype;_B._mselected=0;var _keyKeys = Object.keys(_B._allrecordsselected);for (var _keyindex=0;_keyindex<_keyKeys.length;_keyindex++) {_key=_keyKeys[_keyindex];if (1==_B._allrecordsselected[_key]) {_B._mselected=_B._mselected+1;}}_tmp=null;_tmp=u("."+_B._meventname+"-miselected");_tmp.html("Geselecteerd: <b>"+_B._mselected+"</b>");};_B.handleclick=function(_event) {var _id,_elem,_idstr,_key,_mitems,_tmp;_id=_event.target;_elem=null;_elem=u("#"+_id["id"]);_idstr=""+_id["id"];_idstr=_idstr.substring(2);if (_B._msingle) {var _keyKeys = Object.keys(_B._allrecordsselected);for (var _keyindex=0;_keyindex<_keyKeys.length;_keyindex++) {_key=_keyKeys[_keyindex];_B._allrecordsselected[_key]=0;}_mitems=null;_mitems=u("."+_B._htmlitemidentificationcssclass);_mitems.removeClass(_B._htmlitemselectedcssclass);_elem.addClass(_B._htmlitemselectedcssclass);_B._allrecordsselected[_idstr]=1;ABMRaiseEvent(_B._meventname+"_singleclick",["ID"],[_idstr]);} else {if (_elem.hasClass(_B._htmlitemselectedcssclass)) {_elem.removeClass(_B._htmlitemselectedcssclass);_B._allrecordsselected[_idstr]=0;_B._mselected=_B._mselected-1;} else {_elem.addClass(_B._htmlitemselectedcssclass);_B._allrecordsselected[_idstr]=1;_B._mselected=_B._mselected+1;}}_tmp=null;_tmp=u("."+_B._meventname+"-miselected");_tmp.html("Geselecteerd: <b>"+_B._mselected+"</b>");};}function banano_abmjavascript() {var _B;this.banano_ready=function() {if (_B==null) _B=this;};}var BANversion=1638888414957;var BANmultiselect=[];