

defaultArgs_dropZone = {
	id: "dropZone",
	parent: document.body,
	highlightTime: 150,
	_highlightcss: {
		left: "-=" + _px(3),
		top: "-=" + _px(3),
		"border": "solid",
		borderWidth: 3, 
		borderColor: "rgba(0,0,0,1)", 
		backgroundColor: "rgba(0,0,0, .5)"
	},
	_css: {
		position: "absolute",
		top: 20,
		left: 700,
		height: 300,
		width: 300,
		backgroundColor: "rgba(20,100,250, .3)",
		"border": "solid",
		borderColor: "rgba(0,0,0,1)",
		borderWidth: 1,
	}	
}

function dropZone(args){
	this.args = (args) ? mergeArgs(defaultArgs_dropZone, args): defaultArgs_dropZone;
	this._css = this.args._css;
	this._defaultStateSwitch = false;
	this._hovered = false;
	var that = this;

	this.widget = elementMaker("div", this.args.parent, this.args.id, this._css);
	
	this.checkMouseOver = function(){
  		var lmin = $(that.widget).offset().left;
  		var lmax = $(that.widget).offset().left + $(that.widget).width();
  		var tmin = $(that.widget).offset().top;
  		var tmax = $(that.widget).offset().top + $(that.widget).height();
  		if ((_MOUSEX > lmin) && (_MOUSEX < lmax) &&
  		   		(_MOUSEY > tmin) && (_MOUSEY < tmax)){
			//$(that.widget).animate(that._css, 100, function(){});	
  			return true;
  		}
   		return false;
	}
}

dropZone.prototype.dropEvent = function(){
	$(this.widget).animate(this.args._css, this.args.highlightTime, function(){});	
}

dropZone.prototype.highlightHover = function(){
	var that = this;
	if (this.checkMouseOver()){
		if (!that.hovered){
			this.hovered = true;
			$(this.widget).stop().animate(this.args._highlightcss, that.args.highlightTime, function(){});				
		}	
	}
	else if (this.hovered && !this.checkMouseOver()){
		$(this.widget).stop().animate(this.args._css, that.args.highlightTime, function(){});
		this.hovered = false;
	}
}
