var ABMTreeView = function(id) {
	var self=this;
	self.id = id;
	self.folders={};
	self.supportsTouch = true;
	if ($('#devicetype').html()=='desktop') {
		self.supportsTouch = false;
	}
	
	init();
	
	function init() {
		if ($('#' + self.id).html("")) {
			$('#' + self.id).html("<div class=\"abmfileheader\"><div class=\"row\"><div class=\"col s12 m12 l12 offset-s0 offset-m0 offset-l0 transparent\" style=\"height: 54px\"><div class=\"abmfilebreadcrumbs\"></div></div></div></div><div class=\"abmfilewrapper\"><div class=\"row abmfileheight\"><div class=\"col s0 m0 l4 offset-s0 offset-m0 offset-l0 abmfilesidebar\"><div class=\"abmfoldersall\"></div></div></div></div>");
		}					
	}
		
	this.loadFolder = function(filesJson, filter) {
		var json = $.parseJSON(filesJson);		
		self.folders = json.folders;
		var frame = $('#' + self.id).find('.abmfilebreadcrumbs');
		frame.html("");
		self.crumbs = json.crumbs;
		if (self.supportsTouch) {
			$('#' + self.id).find('.abmfilebreadcrumb').each(function() {
				this.removeEventListener("touchend", handleCrumb);
			});
		} else {
			$('#' + self.id).find('.abmfilebreadcrumb').each(function() {
				this.removeEventListener("mouseup", handleCrumb);
			});
		}
		var thePath="";
		for (var i=0;i<self.crumbs.length;i++) {
			if (i>0) {
				thePath = thePath + "/" + self.crumbs[i].name;
			} else {
				thePath = self.folders[0].name;
			}
			thePath = thePath.replace("//", "/");
			self.crumbs[i].fullPath = thePath;
			if (i==self.crumbs.length - 1) {
				if (i>0) {
					frame.append("<div class=\"abmfilebreadcrumbsep last\">&lt;</div>");
				}
				frame.append("<a id=\"" + self.id + "_C" + i + "\" class=\"abmfilebreadcrumb last\">" + self.crumbs[i].name + "</a>");
			} else {
				frame.append("<a id=\"" + self.id + "_C" + i + "\" class=\"abmfilebreadcrumb\">" + self.crumbs[i].name + "</a>");				
				frame.append("<div class=\"abmfilebreadcrumbsep\">&gt;</div>");									
			}
		}
		if (self.supportsTouch) {
			$('#' + self.id).find('.abmfilebreadcrumb').each(function() {
				this.addEventListener("touchend", handleCrumb, false);
			});
		} else {
			$('#' + self.id).find('.abmfilebreadcrumb').each(function() {
				this.addEventListener("mouseup", handleCrumb, false);
			});
		}
		if (self.supportsTouch) {
			$('#' + self.id).find('.abmfilefolder').each(function() {
				this.removeEventListener("touchend", handleFolder);
			});
		} else {
			$('#' + self.id).find('.abmfilefolder').each(function() {
				this.removeEventListener("mouseup", handleFolder);
			});
		}
		frame = $('#' + self.id).find('.abmfoldersall');
		frame.html("");
		var levels=[];
		for (var i=0;i<self.folders.length;i++) {
			var folder = self.folders[i];
			var isOpen="folder";
			var isOpenArrow="keyboard_arrow_right";
			folder.isOpen=false;
			if (folder.open==="true") {
				isOpen="folder_open";
				isOpenArrow="keyboard_arrow_down";
				folder.isOpen=true;
			}
			var isActive="";
			folder.isActive=false;
			if (folder.active==="true") {
				folder.isActive=true;
				isActive=" active ";
			}
			while (levels.length-1>=folder.level) {
				levels.pop();
			}
			levels.push(folder.name);
			folder.fullPath = levels.join("/").replace("//", "/");
			var $newDiv = "<div class=\"row\"><div class=\"col s12 m12 l12 offset-s0 offset-m0 offset-l0\"><div id=\"" + self.id + "_" + i + "\" class=\"abmfilefolder " + isActive + " abmfolderlev" + folder.level + "\"><a><i class=\"material-icons\">" + isOpenArrow + "</i></a><a ><i class=\"material-icons\">" + isOpen + "</i><span>" + folder.name + "</span></a></div></div></div>";
			frame.append($newDiv);			
		}
		if (self.supportsTouch) {
			$('#' + self.id).find('.abmfilefolder').each(function() {
				this.addEventListener("touchend", handleFolder, false);
			});
		} else {
			$('#' + self.id).find('.abmfilefolder').each(function() {
				this.addEventListener("mouseup", handleFolder, false);
			});
		}
		//self.selected=0;
		//$('#' + self.id + '-info').html(self.options.Selected + ": <b>" + self.selected + "</b>");		
	}
	
	function handleFolder() {
		if ($(this).hasClass('active')) {
			return;
		}
		var index = $(this).attr('id').substring(self.id.length + 1);
		var folder = self.folders[index];
		//console.log("Clicked on folder " + folder.fullPath);
	}
	
	function handleCrumb() {
		var index = $(this).attr('id').substring(self.id.length + 2);
		var crumb = self.crumbs[index];
		//console.log("Clicked on crumb " + crumb.fullPath);
	}
}