var ABMFileManager = function(id, options) {
	var self=this;
	self.id = id;
	self.isBig=options.isBig;
	self.files={};
	self.folders={};
	self.crumbs={};
	self.options = options;
	self.supportsTouch = true;
	self.selectedFiles={};
	if ($('#devicetype').html()=='desktop') {
		self.supportsTouch = false;
	}
	self.selected=0;
	
	init(options);
	
	function init(options) {
		if ($('#' + self.id).html("")) {
			$('#' + self.id).html("<div class=\"abmfileheader\"><div class=\"row\"><div class=\"col s3 m5 l6 offset-s0 offset-m0 offset-l0 transparent\" style=\"height: 54px\"><div class=\"abmfilebreadcrumbs\"></div></div><div class=\"col s9 m7 l6 offset-s0 offset-m0 offset-l0 transparent\"><ul><li id=\"" + self.id + "-view\" style=\"float:right;cursor: pointer;margin-right:10px\" class=\"\"><a><i id=\"" + self.id + "-view-i\" class=\"material-icons white-text\">view_module</i></a></li><li id=\"" + self.id + "-search\" style=\"margin-left: 15px;float:right;cursor: pointer\" class=\"\"><form id=\"" + self.id + "-form\" class=\"abmfilebuttons\"><input class=\"abmfileinput\" type=\"search\" placeholder=\"Search\"></form></li></ul></div></div></div><div class=\"abmfilewrapper\"><div class=\"row abmfileheight\"><div class=\"col s0 m0 l4 offset-s0 offset-m0 offset-l0 abmfilesidebar\"><div class=\"abmfoldersall\"></div></div><div class=\"col s12 m12 l8 offset-s0 offset-m0 offset-l0 transparent abmfilesallwrapper\"><div class=\"abmfilesall\"><div class=\"col s12 m12 l12 offset-s0 offset-m0 offset-l0 abmfileoverflow\"></div></div></div></div></div><div class=\"abmfilefooter\"><div class=\"row\"><div class=\"col s4 m4 l4 offset-s0 offset-m0 offset-l0 transparent\"><ul><li class=\"abmfileinfo\"><span id=\"" + self.id + "-info\">Selected: 0</span></li></ul></div><div class=\"col s8 m8 l8 offset-s0 offset-m0 offset-l0 transparent\"><ul id=\"" + self.id + "-buttons\"></ul></div></div></div>");
		}
		SetButtons(self.options);
		if (self.isBig) {
			$('#' + self.id + "-view-i").html("view_list");
		} else {
			$('#' + self.id + "-view-i").html("view_module");
		}
		if (self.supportsTouch) {
			$('#' + self.id + "-view-i")[0].addEventListener("touchend", handleView, false);
		} else {
			$('#' + self.id + "-view-i")[0].addEventListener("mouseup", handleView, false);
		}
		SetEvents();		
	}
	
	function handleView() {
		self.isBig = !self.isBig;
		if (self.isBig) {
			$('#' + self.id + "-view-i").html("view_list");
		} else {
			$('#' + self.id + "-view-i").html("view_module");
		}
		ReloadFolder();
	}
	
	function SetButtons(options) {
		self.options.canUpload=options.canUpload;
		self.options.canDownload=options.canDownload;
		self.options.canCut=options.canCut;
		self.options.canCopy=options.canCopy;
		self.options.canPaste=options.canPaste;
		self.options.canDelete=options.canDelete;
		self.options.canRename=options.canRename;
		self.options.ttUpload=options.ttUpload;
		self.options.ttDownload=options.ttDownload;
		self.options.ttCut=options.ttCut;
		self.options.ttCopy=options.ttCopy;
		self.options.ttPaste=options.ttPaste;
		self.options.ttDelete=options.ttDelete;
		self.options.ttRename=options.ttRename;
		var frame = $('#' + self.id + "-buttons");
		frame.html("");
		var tt="";
		if (self.options.canUpload) {
			tt = "";
			if (self.ttupload) {
				tt = "<span class=\"abmfiletooltiptext\">" + self.ttupload + "</span>";
			}
			frame.append("<li id=\"" + self.id + "-upload\" style=\"margin-left:15px;margin-right:10px;float:right;cursor: pointer\" class=\"abmfiletooltip\"><a><i class=\"material-icons white-text\">cloud_upload</i></a>" + tt + "</li>");
		}
		if (self.options.canDownload) {
			tt = "";
			if (self.ttdownload) {
				tt = "<span class=\"abmfiletooltiptext\">" + self.ttdownload + "</span>";
			}
			frame.append("<li id=\"" + self.id + "-download\" style=\"margin-left: 15px;float:right;cursor: pointer\" class=\"abmfiletooltip hide\"><a><i class=\"material-icons white-text\">file_download</i></a>" + tt + "</li>");
		}
		if (self.options.canDelete) {
			tt = "";
			if (self.ttdelete) {
				tt = "<span class=\"abmfiletooltiptext\">" + self.ttdelete + "</span>";
			}
			frame.append("<li id=\"" + self.id + "-delete\" style=\"margin-left: 15px;float:right;cursor: pointer\" class=\"abmfiletooltip hide\"><a><i class=\"material-icons white-text\">delete_forever</i></a>" + tt + "</li>");
		}
		if (self.options.canPaste) {
			tt = "";
			if (self.ttpaste) {
				tt = "<span class=\"abmfiletooltiptext\">" + self.ttpaste + "</span>";
			}
			frame.append("<li id=\"" + self.id + "-paste\" style=\"margin-left: 15px;float:right;cursor: pointer\" class=\"abmfiletooltip hide\"><a><i class=\"material-icons white-text\">content_paste</i></a>" + tt + "</li>");
		}
		if (self.options.canCopy) {
			tt = "";
			if (self.ttcopy) {
				tt = "<span class=\"abmfiletooltiptext\">" + self.ttcopy + "</span>";
			}
			frame.append("<li id=\"" + self.id + "-copy\" style=\"margin-left: 15px;float:right;cursor: pointer\" class=\"abmfiletooltip hide\"><a><i class=\"material-icons white-text\">content_copy</i></a>" + tt + "</li>");
		}
		if (self.options.canCut) {
			tt = "";
			if (self.ttcut) {
				tt = "<span class=\"abmfiletooltiptext\">" + self.ttcut + "</span>";
			}
			frame.append("<li id=\"" + self.id + "-cut\" style=\"margin-left: 15px;float:right;cursor: pointer\" class=\"abmfiletooltip hide\"><a><i class=\"material-icons white-text\">content_cut</i></a>" + tt + "</li>");
		}		
		if (self.options.canRename) {
			tt = "";
			if (self.ttrename) {
				tt = "<span class=\"abmfiletooltiptext\">" + self.ttrename + "</span>";
			}
			frame.append("<li id=\"" + self.id + "-rename\" style=\"margin-left: 15px;float:right;cursor: pointer\" class=\"abmfiletooltip hide\"><a><i class=\"material-icons white-text\">create</i></a>" + tt + "</li>");
		}
		SetEventsButtons();
	}
	
	function SetEvents() {
		if (self.isBig) {
			if (self.supportsTouch) {
				$('#' + self.id).find('.abmfilebig').each(function() {
					this.removeEventListener("touchend", handleMouseUp);
					this.addEventListener("touchend", handleMouseUp, false);				
				});
			} else {
				$('#' + self.id).find('.abmfilebig').each(function() {
					this.removeEventListener("mouseup", handleMouseUp);
					this.addEventListener("mouseup", handleMouseUp, false);				
				});
			}
		} else {
			if (self.supportsTouch) {
				$('#' + self.id).find('.abmfilelistitem').each(function() {
					this.removeEventListener("touchend", handleMouseUp);
					this.addEventListener("touchend", handleMouseUp, false);				
				});
			} else {
				$('#' + self.id).find('.abmfilelistitem').each(function() {
					this.removeEventListener("mouseup", handleMouseUp);
					this.addEventListener("mouseup", handleMouseUp, false);				
				});
			}
		}		
	}
	
	function SetEventsButtons() {
		//console.log("Setting events buttons");
		if (self.options.canUpload) {
			if (self.supportsTouch) {
				$('#' + self.id).find('#' + self.id + '-upload')[0].removeEventListener("touchend", handleUpload);
				$('#' + self.id).find('#' + self.id + '-upload')[0].addEventListener("touchend", handleUpload, false);				
			} else {
				$('#' + self.id).find('#' + self.id + '-upload')[0].removeEventListener("mouseup", handleUpload);
				$('#' + self.id).find('#' + self.id + '-upload')[0].addEventListener("mouseup", handleUpload, false);				
			}
		}
		if (self.options.canDownload) {
			if (self.supportsTouch) {
				$('#' + self.id).find('#' + self.id + '-download')[0].removeEventListener("touchend", handleDownload);
				$('#' + self.id).find('#' + self.id + '-download')[0].addEventListener("touchend", handleDownload, false);				
			} else {
				$('#' + self.id).find('#' + self.id + '-download')[0].removeEventListener("mouseup", handleDownload);
				$('#' + self.id).find('#' + self.id + '-download')[0].addEventListener("mouseup", handleDownload, false);				
			}
		}
		if (self.options.canDelete) {
			if (self.supportsTouch) {
				$('#' + self.id).find('#' + self.id + '-delete')[0].removeEventListener("touchend", handleDelete);
				$('#' + self.id).find('#' + self.id + '-delete')[0].addEventListener("touchend", handleDelete, false);				
			} else {
				$('#' + self.id).find('#' + self.id + '-delete')[0].removeEventListener("mouseup", handleDelete);
				$('#' + self.id).find('#' + self.id + '-delete')[0].addEventListener("mouseup", handleDelete, false);				
			}
		}
		if (self.options.canPaste) {
			if (self.supportsTouch) {
				$('#' + self.id).find('#' + self.id + '-paste')[0].removeEventListener("touchend", handlePaste);
				$('#' + self.id).find('#' + self.id + '-paste')[0].addEventListener("touchend", handlePaste, false);				
			} else {
				$('#' + self.id).find('#' + self.id + '-paste')[0].removeEventListener("mouseup", handlePaste);
				$('#' + self.id).find('#' + self.id + '-paste')[0].addEventListener("mouseup", handlePaste, false);				
			}
		}
		if (self.options.canCopy) {
			if (self.supportsTouch) {
				$('#' + self.id).find('#' + self.id + '-copy')[0].removeEventListener("touchend", handleCopy);
				$('#' + self.id).find('#' + self.id + '-copy')[0].addEventListener("touchend", handleCopy, false);				
			} else {
				$('#' + self.id).find('#' + self.id + '-copy')[0].removeEventListener("mouseup", handleCopy);
				$('#' + self.id).find('#' + self.id + '-copy')[0].addEventListener("mouseup", handleCopy, false);				
			}
		}
		if (self.options.canCut) {
			if (self.supportsTouch) {
				$('#' + self.id).find('#' + self.id + '-cut')[0].removeEventListener("touchend", handleCut);
				$('#' + self.id).find('#' + self.id + '-cut')[0].addEventListener("touchend", handleCut, false);				
			} else {
				$('#' + self.id).find('#' + self.id + '-cut')[0].removeEventListener("mouseup", handleCut);
				$('#' + self.id).find('#' + self.id + '-cut')[0].addEventListener("mouseup", handleCut, false);				
			}
		}
		if (self.options.canRename) {
			if (self.supportsTouch) {
				$('#' + self.id).find('#' + self.id + '-rename')[0].removeEventListener("touchend", handleRename);
				$('#' + self.id).find('#' + self.id + '-rename')[0].addEventListener("touchend", handleRename, false);				
			} else {
				$('#' + self.id).find('#' + self.id + '-rename')[0].removeEventListener("mouseup", handleRename);
				$('#' + self.id).find('#' + self.id + '-rename')[0].addEventListener("mouseup", handleRename, false);				
			}
		}
		SetAvailableButtons();
	}
	
	function DisableEvents() {
		//console.log("Disabling events");
		if (self.isBig) {
			if (self.supportsTouch) {
				$('#' + self.id).find('.abmfilebig').each(function() {
					this.removeEventListener("touchend", handleMouseUp);					
				});
			} else {
				$('#' + self.id).find('.abmfilebig').each(function() {
					this.removeEventListener("mouseup", handleMouseUp);					
				});
			}
		} else {
			if (self.supportsTouch) {
				$('#' + self.id).find('.abmfilelistitem').each(function() {
					this.removeEventListener("touchend", handleMouseUp);					
				});
			} else {
				$('#' + self.id).find('.abmfilelistitem').each(function() {
					this.removeEventListener("mouseup", handleMouseUp);					
				});
			}
		}		
	}
	
	function DisableEventsButtons() {
		/*
		if (self.options.canUpload) {
			if (self.supportsTouch) {
				$('#' + self.id).find('#' + self.id + '-upload')[0].removeEventListener("touchend", handleUpload);				
			} else {
				$('#' + self.id).find('#' + self.id + '-upload')[0].removeEventListener("mouseup", handleUpload);				
			}
		}
		if (self.options.canDownload) {
			if (self.supportsTouch) {
				$('#' + self.id).find('#' + self.id + '-download')[0].removeEventListener("touchend", handleDownload);				
			} else {
				$('#' + self.id).find('#' + self.id + '-download')[0].removeEventListener("mouseup", handleDownload);				
			}
		}
		if (self.options.canCut) {
			if (self.supportsTouch) {
				$('#' + self.id).find('#' + self.id + '-cut')[0].removeEventListener("touchend", handleCut);				
			} else {
				$('#' + self.id).find('#' + self.id + '-cut')[0].removeEventListener("mouseup", handleCut);				
			}
		}
		if (self.options.canCopy) {
			if (self.supportsTouch) {
				$('#' + self.id).find('#' + self.id + '-copy')[0].removeEventListener("touchend", handleCopy);				
			} else {
				$('#' + self.id).find('#' + self.id + '-copy')[0].removeEventListener("mouseup", handleCopy);				
			}
		}
		if (self.options.canPaste) {
			if (self.supportsTouch) {
				$('#' + self.id).find('#' + self.id + '-paste')[0].removeEventListener("touchend", handlePaste);				
			} else {
				$('#' + self.id).find('#' + self.id + '-paste')[0].removeEventListener("mouseup", handlePaste);				
			}
		}
		if (self.options.canDelete) {
			if (self.supportsTouch) {
				$('#' + self.id).find('#' + self.id + '-delete')[0].removeEventListener("touchend", handleDelete);				
			} else {
				$('#' + self.id).find('#' + self.id + '-delete')[0].removeEventListener("mouseup", handleDelete);				
			}
		}
		if (self.options.canRename) {
			if (self.supportsTouch) {
				$('#' + self.id).find('#' + self.id + '-rename')[0].removeEventListener("touchend", handleRename);				
			} else {
				$('#' + self.id).find('#' + self.id + '-rename')[0].removeEventListener("mouseup", handleRename);				
			}
		}
		*/
	}
	
	function handleUpload(evt) {
		console.log("Upload");
	}
	
	function handleDownload(evt) {
		console.log("Download");
		// on server generate zip in www folder and then call ajax method
		StartDownload("http://gorgeousapps.com/ABCHIP8.zip", "ABCHIP8.zip")
	}
	
	function StartDownload(url, fileName) {
		/*
		$.ajax({
			url: url,
			success: download.bind(true, fileName, "application/zip" )
		});
		*/
		var x=new XMLHttpRequest();
		x.open("GET", url, true);
		x.responseType = 'blob';
		x.onload=function(e){download(x.response, fileName, "application/zip" ); }
		x.send();		
	}
	
	function handleCut(evt) {
		console.log("Cut");
		self.selectedFiles={};
		for (var i=0;i<self.files.length;i++) {
			file = self.files[i];
			var $pos = $('[data-pos="' + i + '"]');
			if (file.isActive) {
				file.isCut=true;
				file.isCopy=false;
				//console.log('[data-pos="' + i + '"]');
				if ($pos.hasClass('copy')) {
					$pos.removeClass('copy');
				}
				if (!$pos.hasClass('move')) {
					$pos.addClass('move');
				}
				self.selectedFiles["" + file.name] = CloneFile(file);
			} else {
				file.isCut=false;
				file.isCopy=false;
				$pos.removeClass('move');
				$pos.removeClass('copy');
			}
		}
		SetAvailableButtons();		
	}
	
	function handleCopy(evt) {
		console.log("Copy");
		self.selectedFiles={};
		for (var i=0;i<self.files.length;i++) {
			file = self.files[i];
			var $pos = $('[data-pos="' + i + '"]');
			if (file.isActive) {
				file.isCut=false;
				file.isCopy=true;
				//console.log('[data-pos="' + i + '"]');
				if ($pos.hasClass('move')) {
					$pos.removeClass('move');
				}
				if (!$pos.hasClass('copy')) {
					$pos.addClass('copy');
				}
				self.selectedFiles["" + file.name] = CloneFile(file);
			} else {
				file.isCut=false;
				file.isCopy=false;
				$pos.removeClass('move');
				$pos.removeClass('copy');
			}
		}
		SetAvailableButtons();
	}
	
	function handlePaste(evt) {
		console.log("Paste");
		
		SetAvailableButtons();
	}
	
	function handleDelete(evt) {
		console.log("Delete");
		
		SetAvailableButtons();
	}
	
	function handleRename(evt) {
		console.log("Rename");
	}
	
	function handleMouseUp(evt) {
		$(this).toggleClass('active');
		//console.log($(this).data('pos'));
		var isActive=$(this).hasClass('active');
		var file = self.files[$(this).data('pos')];
		file.isActive=isActive;
		if (isActive) {
			self.selected++;
			//self.selectedFiles["" + file.name] = CloneFile(file);
		} else {
			self.selected--;
			//delete self.selectedFiles["" + file.name];
		}
		self.selectedFiles={};
		for (var i=0;i<self.files.length;i++) {
			file = self.files[i];
			file.isCut=false;
			file.isCopy=false;
			var $pos = $('[data-pos="' + i + '"]');
			$pos.removeClass('move');
			$pos.removeClass('copy');			
		}
		$('#' + self.id + '-info').html(self.options.Selected + ": <b>" + self.selected + "</b>");
		SetAvailableButtons();
		evt.stopPropagation();
		if (evt.preventDefault) {
			evt.preventDefault();
		} else {
			if (evt.returnValue) {
				evt.returnValue = false;
			}
		}
		return false;
	}
	
	function CloneFile(file) {
		var newFile="{\"icon\": " + file.icon + ",\"name\": " + file.name + ",\"folder\": " + file.folder + ", \"size\": " + file.size + ", \"date\": " + file.date + ", \"image\": " + file.image + "}";		
		return newFile;
	}
		
	this.loadFolder = function(filesJson, filter) {
		var json = $.parseJSON(filesJson);		
		self.files = json.files;
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
		self.selected=0;
		$('#' + self.id + '-info').html(self.options.Selected + ": <b>" + self.selected + "</b>");
		ReloadFolder(filter);
	}
	
	function handleFolder() {
		if ($(this).hasClass('active')) {
			return;
		}
		var index = $(this).attr('id').substring(self.id.length + 1);
		var folder = self.folders[index];
		console.log("Clicked on folder " + folder.fullPath);
	}
	
	function handleCrumb() {
		var index = $(this).attr('id').substring(self.id.length + 2);
		var crumb = self.crumbs[index];
		console.log("Clicked on crumb " + crumb.fullPath);
	}
	
	function ReloadFolder(filter) {
		ClearFolder();
		var frame = $('#' + self.id).find('.abmfilesall').find('.col');
		var $newDiv="";
		var Copy="";
		var Cut="";
		if (self.isBig) {			
			for (var i=0;i<self.files.length;i++) {
				var Activate="";
				var file = self.files[i];		
				if (file.isActive===true) {
					Activate=" active ";
				}
				if (file.isCopy===true) {
					Copy=" copy ";
				}
				if (file.isCut===true) {
					Cut=" move ";
				}
				if (file.image=="") {
					$newDiv = "<a data-pos=\"" + i + "\" class=\"abmfilebig" + Activate + Copy + Cut + "\"><div class=\"abmfilethumbnailbig\"><i class=\"material-icons medium\" style=\"position: relative;top: -14px;left: -14px;\">" + file.icon + "</i></div><div class=\"abmfilebiglabel\">" + file.name + "</div></a>";
				} else {
					$newDiv = "<a data-pos=\"" + i + "\" class=\"abmfilebig" + Activate + Copy + Cut +"\"><div class=\"abmfilethumbnailbig\"><img style=\"margin-top: -18px;margin-left: -18px\" width=64 height=64 src=\"" + file.image + "\"></img></div><div class=\"abmfilebiglabelimg\">" + file.name + "</div></a>";
				}
				frame.append($newDiv);
			}
		} else {
			$newDiv = "<div class=\"row abmfilelistheader\"><div class=\"col s12 m9 l5 offset-s0 offset-m0 offset-l0\"><a ><span>" + self.options.Name + "</span></a></div><div class=\"col s0 m3 l3 offset-s0 offset-m0 offset-l0 abmfileright abmfilelistitemsize\"><a ><span>" + self.options.Size + "</span></a></div><div class=\"col s0 m0 l4 offset-s0 offset-m0 offset-l0 abmfilelistitemdate\"><a ><span>" + self.options.Date + "</span></a></div></div>";
			frame.append($newDiv);
			for (var i=0;i<self.files.length;i++) {
				var Activate="";
				var file = self.files[i];		
				if (file.isActive===true) {
					Activate=" active ";
				}
				if (file.isCopy===true) {
					Copy=" copy ";
				}
				if (file.isCut===true) {
					Cut=" move ";
				}
				if (file.image=="") {
					if (file.icon!="") {
						switch (file.icon.substring(0,3)) {
							case "mdi":								
								$newDiv = "<div data-pos=\"" + i + "\" class=\"row abmfilelistitem" + Activate + Copy + Cut + "\"><div class=\"col s12 m9 l5 offset-s0 offset-m0 offset-l0\"><a class=\"abmfilelistitem-file\"><i class=\"" + file.icon + "\"></i><span>" + file.name + "</span></a></div><div class=\"col s0 m3 l3 offset-s0 offset-m0 offset-l0 abmfileright abmfilelistitemsize\"><span>" + file.size + "</span></div><div class=\"col s0 m0 l4 offset-s0 offset-m0 offset-l0 abmfilelistitemdate\"><span>" + file.date + "</span></div></div>";
								break;
							case "fa ":							
							case "fa-":								
								$newDiv = "<div data-pos=\"" + i + "\" class=\"row abmfilelistitem" + Activate + Copy + Cut + "\"><div class=\"col s12 m9 l5 offset-s0 offset-m0 offset-l0\"><a class=\"abmfilelistitem-file\"><i class=\"" + file.icon + "\"></i><span>" + file.name + "</span></a></div><div class=\"col s0 m3 l3 offset-s0 offset-m0 offset-l0 abmfileright abmfilelistitemsize\"><span>" + file.size + "</span></div><div class=\"col s0 m0 l4 offset-s0 offset-m0 offset-l0 abmfilelistitemdate\"><span>" + file.date + "</span></div></div>";
								break;
							case "abm":
								console.log("abm icons are not supported!")								
								break;
							default:
								$newDiv = "<div data-pos=\"" + i + "\" class=\"row abmfilelistitem" + Activate + Copy + Cut + "\"><div class=\"col s12 m9 l5 offset-s0 offset-m0 offset-l0\"><a class=\"abmfilelistitem-file\"><i class=\"material-icons\">" + file.icon + "</i><span>" + file.name + "</span></a></div><div class=\"col s0 m3 l3 offset-s0 offset-m0 offset-l0 abmfileright abmfilelistitemsize\"><span>" + file.size + "</span></div><div class=\"col s0 m0 l4 offset-s0 offset-m0 offset-l0 abmfilelistitemdate\"><span>" + file.date + "</span></div></div>";
						}						
					}
				} else {
					$newDiv = "<div data-pos=\"" + i + "\" class=\"row abmfilelistitem" + Activate + Copy + Cut + "\"><div class=\"col s12 m9 l5 offset-s0 offset-m0 offset-l0\"><a class=\"abmfilelistitem-file\"><img style=\"margin-right: 10px;position: relative;top: 3px;\" width=16 height=16 src=\"" + file.image + "\"></img><span>" + file.name + "</span></a></div><div class=\"col s0 m3 l3 offset-s0 offset-m0 offset-l0 abmfileright abmfilelistitemsize\"><span>" + file.size + "</span></div><div class=\"col s0 m0 l4 offset-s0 offset-m0 offset-l0 abmfilelistitemdate\"><span>" + file.date + "</span></div></div>";
				}
				frame.append($newDiv);
			}
		}
		SetEvents();
	}
	
	this.clearFolder = function() {
		ClearFolder();
	}
	
	function ClearFolder() {
		DisableEvents();
		$('#' + self.id).find('.abmfilesall').find('.col').html("");		
	}
	
	function SetAvailableButtons() {
		var hasActive=0;		
		for (var i=0;i<self.files.length;i++) {
			if (self.files[i].isActive===true) {
				hasActive++;				
			}
		}
		if (hasActive>0) {
			$('#' + self.id + '-download').removeClass('hide');
			$('#' + self.id + '-cut').removeClass('hide');
			$('#' + self.id + '-copy').removeClass('hide');
			if (Object.keys(self.selectedFiles).length>0) {
				$('#' + self.id + '-paste').removeClass('hide');
			} else {
				if (!$('#' + self.id + '-paste').hasClass('hide')) {
					$('#' + self.id + '-paste').addClass('hide');
				}
			}
			$('#' + self.id + '-delete').removeClass('hide');
			if (hasActive==1) {
				$('#' + self.id + '-rename').removeClass('hide');
			} else {
				if (!$('#' + self.id + '-rename').hasClass('hide')) {
					$('#' + self.id + '-rename').addClass('hide');
				}
			}
		} else {
			if (!$('#' + self.id + '-download').hasClass('hide')) {
				$('#' + self.id + '-download').addClass('hide');
			}
			if (!$('#' + self.id + '-cut').hasClass('hide')) {
				$('#' + self.id + '-cut').addClass('hide');
			}
			if (!$('#' + self.id + '-copy').hasClass('hide')) {
				$('#' + self.id + '-copy').addClass('hide');
			}
			if (!$('#' + self.id + '-delete').hasClass('hide')) {
				$('#' + self.id + '-delete').addClass('hide');
			}
			if (!$('#' + self.id + '-rename').hasClass('hide')) {
				$('#' + self.id + '-rename').addClass('hide');
			}
			if (!$('#' + self.id + '-paste').hasClass('hide')) {
				$('#' + self.id + '-paste').addClass('hide');
			}
		}		
	}
}
/*
!function(e,t){"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?module.exports=t():e.download=t()}(this,function(){return function e(t,n,o){var a,r,i=window,d="application/octet-stream",c=o||d,l=t,s=!n&&!o&&l,u=document.createElement("a"),f=function(e){return String(e)},p=i.Blob||i.MozBlob||i.WebKitBlob||f,m=n||"download";if(p=p.call?p.bind(i):Blob,"true"===String(this)&&(c=(l=[l,c])[0],l=l[1]),s&&s.length<2048&&(m=s.split("/").pop().split("?")[0],u.href=s,-1!==u.href.indexOf(s))){var b=new XMLHttpRequest;return b.open("GET",s,!0),b.responseType="blob",b.onload=function(t){e(t.target.response,m,d)},setTimeout(function(){b.send()},0),b}if(/^data\:[\w+\-]+\/[\w+\-]+[,;]/.test(l)){if(!(l.length>2096103.424&&p!==f))return navigator.msSaveBlob?navigator.msSaveBlob(w(l),m):h(l);l=w(l),c=l.type||d}function w(e){for(var t=e.split(/[:;,]/),n=t[1],o=("base64"==t[2]?atob:decodeURIComponent)(t.pop()),a=o.length,r=0,i=new Uint8Array(a);r<a;++r)i[r]=o.charCodeAt(r);return new p([i],{type:n})}function h(e,t){if("download"in u)return u.href=e,u.setAttribute("download",m),u.className="download-js-link",u.innerHTML="downloading...",u.style.display="none",document.body.appendChild(u),setTimeout(function(){u.click(),document.body.removeChild(u),!0===t&&setTimeout(function(){i.URL.revokeObjectURL(u.href)},250)},66),!0;if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent))return e=e.replace(/^data:([\w\/\-\+]+)/,d),window.open(e)||confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")&&(location.href=e),!0;var n=document.createElement("iframe");document.body.appendChild(n),t||(e="data:"+e.replace(/^data:([\w\/\-\+]+)/,d)),n.src=e,setTimeout(function(){document.body.removeChild(n)},333)}if(a=l instanceof p?l:new p([l],{type:c}),navigator.msSaveBlob)return navigator.msSaveBlob(a,m);if(i.URL)h(i.URL.createObjectURL(a),!0);else{if("string"==typeof a||a.constructor===f)try{return h("data:"+c+";base64,"+i.btoa(a))}catch(e){return h("data:"+c+","+encodeURIComponent(a))}(r=new FileReader).onload=function(e){h(this.result)},r.readAsDataURL(a)}return!0}});
*/