var Quills = {};
var icons = Quill.import("ui/icons");
    icons["undo"] = `<svg viewbox="0 0 18 18">
    <polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon>
    <path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path>
  </svg>`;
    icons["redo"] = `<svg viewbox="0 0 18 18">
    <polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10"></polygon>
    <path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"></path>
  </svg>`;  
  
Quill.register('modules/blotFormatter', QuillBlotFormatter.default);
Quill.register({'modules/better-table': quillBetterTable}, true);

/*
let Inline = Quill.import('blots/inline');

class OT1Block extends Inline{   	
    static create(value){
        let node = super.create();
		node.setAttribute('class','onetwo1');
        return node;    
    } 	
}
OT1Block.blotName = 'onetwo1';
OT1Block.tagName = 'p';
Quill.register(OT1Block);

class OT2Block extends Inline{    
    static create(value){
        let node = super.create();
		node.setAttribute('class','onetwo2');
        return node;    
    } 
}
OT2Block.blotName = 'onetwo2';
OT2Block.tagName = 'p';
Quill.register(OT2Block);

class OT3Block extends Inline{    
    static create(value){
        let node = super.create();
		node.setAttribute('class','onetwo3');
        return node;    
    } 
}
OT3Block.blotName = 'onetwo3';
OT3Block.tagName = 'p';
Quill.register(OT3Block);
*/

var ABMQuill=function() {
	var quill;
	var IsDirty=false;
	var evName='';
	var Self=this;
	
	this.QuillInitEdit = function(id, eventName) {		
	  this.evName = eventName;
	  this.quill = new Quill(id, {
		 modules: {			
			'syntax': true,
			'history': {
				delay: 1000,
				maxStack: 500
			},			
			'toolbar': {
				container: 
				[
				/*[{ 'onetwo': ['Normal','OneTwo1', 'OneTwo2', 'OneTwo3'] }],*/
				[{ 'font': [] }],
				[ 'bold', 'italic', 'underline', 'strike' ],
				[{ 'color': [] }, { 'background': [] }],
				[{ 'script': 'super' }, { 'script': 'sub' }],
				[{ 'header': [1,2,3,4,5,6,false]}],
				['blockquote', 'code-block'] ,
				[{ 'list': 'ordered' }, { 'list': 'bullet'}, { 'indent': '-1' }, { 'indent': '+1' }],
				[{ 'align': [] }],
				['table'],
				[ 'link', 'image', 'video'],
				[ 'clean' ],
				['undo' , 'redo' ],
				['omega'],				
				],				
				handlers: {
					'undo': this.undoChange,
					'redo': this.redoChange,
					'table': this.addtable,	
					/*
					'onetwo': function (value) { 
					    var v='';
						switch (value) {
							case "OneTwo1":
							    v = "onetwo1";
								break;
							case "OneTwo2":
							    v = "onetwo2";
								break;	
							case "OneTwo3":
							    v = "onetwo3";
								break;	
						}						
						if (value) {
							const cursorPosition = this.quill.getSelection().index;
							var range = this.quill.getSelection();
							console.log(range);
							if(range){
								//if (Math.abs(range.length - range.index)>0) {
								if (range.length>0) {
									//console.log("nu1");
									if (value=='Normal') {
										//console.log("nu2");
										this.quill.removeFormat(range.index, range.index + range.length);									
									} else {
										//console.log("nu3");
										this.quill.removeFormat(range.index, range.index + range.length);
										this.quill.formatText(range,v,true);								    									
									}
									//this.quill.setSelection(cursorPosition + 5000000);
									
								} else {				
									
								}
							}else{
								
																
							}
							
						}
					}*/
				}
			},	            		
			blotFormatter: {},        
			table: false,
			  'better-table': {
				operationMenu: {
				  items: {
					unmergeCells: {
					  text: 'Another unmerge cells name'
					}
				  },
				  color: {
					colors: ['green', 'red', 'yellow', 'blue', 'white'],
					text: 'Background Colors:'
				  }
				}
			  },
			  keyboard: {
				bindings: quillBetterTable.keyboardBindings
			  }
		  },		  
		  theme: 'snow',
		  placeholder: '',
		  readOnly: false			 
		});		
		
		/*
		const placeholderPickerItems = Array.prototype.slice.call(document.querySelectorAll('.ql-onetwo .ql-picker-item'));

        placeholderPickerItems.forEach(item => item.textContent = item.dataset.value);

        document.querySelector('.ql-onetwo .ql-picker-label').innerHTML = 'OneTwo' + document.querySelector('.ql-onetwo .ql-picker-label').innerHTML;
		*/
		
		this.quill.on('text-change', function(delta, source) {
			//console.log("setting isdirty=true");
			Self.IsDirty=true;
		});
		this.quill.on('selection-change', function(range, oldRange, source) {
			if (range === null && oldRange !== null) {	
				//console.log(Self);
			    //console.log(Self.evName+"_lostfocus");
				b4j_raiseEvent("page_parseevent",{eventname: Self.evName+"_lostfocus",eventparams:""});
			}
		});		
		
		var customButton = document.querySelector('.ql-omega');
		customButton.addEventListener('click', function() {
			if (screenfull.enabled) {
				console.log('requesting fullscreen');
				screenfull.request();
			} else {
				console.log('Screenfull not enabled');
			}
		});
		
		
		/*
		var OT1Button = document.querySelector('.ql-ot1');
		
		OT1Button.addEventListener('click', function() {
			var range = Self.quill.getSelection();
			if(range){
				Self.quill.formatText(range,'ot1',true);
			}else{

			}
		}
		);
		*/
		
		Quills[id]=this;
		return this;
	};
		
	this.QuillInitForPrint = function (id) {		
		this.quill = new Quill(id, {
			modules: {
				'syntax': true,			
			},
			theme: 'snow',
			placeholder: '',
			readOnly: true			 
		});	
		
		var element = document.getElementById(id.substring(1) + '-parent');
		element.classList.add('forPrint');
		Quills[id]=this;
		return this;
	};	
	
	this.SetInitialHTML = function (value) {
		this.quill.setText("");
		
		this.quill.clipboard.dangerouslyPasteHTML(0,value.replaceAll('<blockquote>', '<div class="ql-indent-1">').replaceAll('</blockquote>', '</div>'));
	}

	this.GetText = function () {
		return this.quill.getText();
	}

	this.undoChange = function () {
		
	  this.quill.history.undo();
	}
	
	this.redoChange = function() {
	  this.quill.history.redo();
	}

	this.addtable = function() {
		var tableModule = this.quill.getModule('better-table');
		tableModule.insertTable(3, 3);
	}

	this.GetContents = function () {
		var json = JSON.stringify(this.quill.getContents());
		//console.log(json);
		return json;
	}
	
	this.SetContents = function (json) {
		//console.log(json);
		//var delta = JSON.parse(json);
		this.quill.setContents(json);
	}
	
	this.SetFocus = function() {
		//this.quill.focus();
		setTimeout(() => {this.quill.focus()}, 600);
	}
	
	this.SetIsDirtyFalse = function() {
		//console.log("setting isdirty=false");
		this.IsDirty = false;
	}
	
	this.ClearHistory = function() {
		this.quill.history.clear();
	}
}

