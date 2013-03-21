
var dropZoneHightlightBorderWidth = 2;

defaultArgs_dropZone = {
	id: "_dropZone",
	parent: document.body,
	highlightTime: 100,
	_highlightcss: {
		left: -dropZoneHightlightBorderWidth,
		top: -dropZoneHightlightBorderWidth,
		"border": "solid",
		borderWidth: dropZoneHightlightBorderWidth, 
		width: 300,
		height: 300,
		borderColor: "rgba(255,0,0,1)", 
		backgroundColor: "rgba(255,255,255, .5)",
		zIndex: 200
	},
	_css: {
		position: "absolute",
		top: 0,
		left: 0,
		height: 300,
		width: 300,
		backgroundColor: "rgba(0,0,0, .25)",
	}	
}


function dropZone(args){
	this.args = (args) ? mergeArgs(defaultArgs_dropZone, args): defaultArgs_dropZone;
	this._css = this.args._css;
	this._defaultStateSwitch = false;
	this.hovering = false;
	this._hovered = false;
	this.dropMethods = [];
	
	var that = this;
	
	var defaultID = defaultArgs_dropZone.id;
	this.args.id = (this.args.id.search(defaultID) == -1) ? (this.args.id + defaultID) : this.args.id;
	
	this.widget = __MakeElement__("div", this.args.parent, this.args.id, mergeArgs(this._css,{
		top: this.args._css.top,
		left: this.args._css.left,
		margin: "0 auto",
		overflow: "visible",
		border: "none"
	}));

	this.highlightDiv = __MakeElement__("div", this.widget, this.args.id + "_highlight", mergeArgs(this.args._highlightcss,{
		margin: "0 auto"
	}));
	
	$(this.highlightDiv).fadeTo(0,0);
	
	this.addDropMethod = function(de){
		this.dropMethods.push(de)
	}
}

dropZone.prototype.dropEvent = function(dropable){
	for (var i=0;i<this.dropMethods.length;i++){
		this.dropMethods[i](dropable);
	}
}

dropZone.prototype.startHoverListener = function(){
	var that = this;
	$(this.widget).mouseenter(function(){
		that.hovering=true;
		$(that.highlightDiv).stop().fadeTo(200,1);	
	}).mouseleave(function(){
		that.hovering=false;
		$(that.highlightDiv).stop().fadeTo(200,0);	
	});
}

dropZone.prototype.stopHoverListener = function(){
	var that = this;
	$(that.highlightDiv).stop().fadeTo(200,0);	
	$(that.widget).unbind('mouseenter mouseleave');	
}
