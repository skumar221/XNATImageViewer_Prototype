defaultArgs_scanThumbnail = {
	id: "scanThumbnail",
	parent: document.body,
	draggableParent: document.body,
	returnAnimMax: 300,
	_css: {
		position: "absolute",
		width: 100,
		height: 100,
		top: 0,
		left: 0,
		"fontSize": 12,		
		"overflow-y": "hidden",
		"overflow-x": "hidden",
	    "font-family": 'Helvetica,"Helvetica neue", Arial, sans-serif',
	    "border" : "solid",
		"border-color": "rgba(220,220,220,1)",
		"color": "rgba(0,0,0,1)",
	  	"background-color" : "rgba(120,31,60,1)",
	  	"border-width" : 0,
	  	"border-radius": 0,	 
	}	
	
}


function scanThumbnail(args){
	this.args = (args) ? mergeArgs(defaultArgs_scanThumbnail, args) : defaultArgs_scanThumbnail;
	this._css = this.args._css;
	var that = this;
	
	this.mouseDown = false;
	
	this.widget = elementMaker("div", this.args.parent, this.args.id, this._css);
	
	this.image = new Image();
	
	this.hover = document.createElement("div");
	this.highlight = document.createElement("div");
	
	this.draggable = document.createElement("div");
	this.draggable.setAttribute("id", this.args.id + "_draggable");
	$(this.draggable).draggable();
	
	this.frames = this.getFrameList();
	
	that.widget.appendChild(that.draggable);	
	
	this.widget.onmousedown = function(){
		that.onmousedown(that);
	};
	
	this.draggable.onmousemove = function(){
		that.onmousemove(that);
	};
	//this.widget.onmouseup = function(){that.onmouseup(that);};

	this.restyle();
}

scanThumbnail.prototype.getFrameList = function(){
	return imageScans;
}

scanThumbnail.prototype.onmousemove = function(that){
	if (that.mouseDown){

	}
}

scanThumbnail.prototype.onmousedown = function(that){
	that.mouseDown = true;
	that.args.draggableParent.appendChild(that.draggable);
	$(that.draggable).css({
		top: $(that.widget).offset().top,
		left: $(that.widget).offset().left,
		backgroundColor : "rgba(0,50,230,.5)",
		opacity: 1,
	});	
	$(that.draggable).draggable({
		scroll: false
	})
	
	for (var i=0; i<that.dropZones.length; i++){
		that.dropZones[i].startHoverListener();
	}
		
	that.args.draggableParent.onmouseup = function(){	
		var wPos = $(that.widget).offset();
		var dPos = $(that.draggable).offset();
		that.mouseDown = false;
		// If hovering over a drop zone...
		var dz = that.getDropZone();
		if (dz > -1){
			$(that.draggable).css({
				opacity: 0,
				top: 0,
				left: 0
			});		
			that.resetDrag();
			that.dropZones[dz].dropEvent(that);	
		}
		// Otherwise animate/move back to position
		else{
			var animTime = that.args.returnAnimMax;
			$(that.draggable).animate({
				left: "+=" + (wPos.left - dPos.left).toString(),
				top: "+=" + (wPos.top - dPos.top).toString(),
			}, animTime, function(){that.resetDrag(that)})		
		}
		
		for (var i=0; i<that.dropZones.length; i++){
			that.dropZones[i].stopHoverListener();
		}
	
	}
}



scanThumbnail.prototype.restyle = function(){
	$(this.widget).css(this._css);
	$(this.draggable).css(this._css);
	$(this.draggable).css({
		top: 0,
		left: 0,
		backgroundColor : "rgba(0,50,230,.5)",
		opacity: 0
	});	
}

scanThumbnail.prototype.resetDrag = function(that){
	if (!that){
		that = this;
	}
	that.widget.appendChild(that.draggable);
	$(that.draggable).css({
		opacity: 0,
		top: 0,
		left: 0
	});
	that.args.draggableParent.onmouseup = function(){};
}

scanThumbnail.prototype.addDropZone = function(dz){
	if (!this.dropZones){
		this.dropZones = [];
	}
	else{
		for (var i=0; i<this.dropZones.length; i++){
			if (this.dropZones[i] == dz){
				console.log("Already tracking drop zone: " + dz.args["id"]);
				return false;
			}
		}
	}
	this.dropZones.push(dz);
	return true;
}

scanThumbnail.prototype.getDropZone = function(){
	var hoverDropZones = []
	for (var i=0; i<this.dropZones.length; i++){
		if (this.dropZones[i].hovering){
			hoverDropZones.push(i)
		}
	}
	if (hoverDropZones.length > 0){
		return (hoverDropZones.length > 1) ? hoverDropZones : hoverDropZones[0];
	}
	return -1;
}


