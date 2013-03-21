defaultArgs_scanThumbnail = {
	id: "scanThumbnail",
	parent: document.body,
	draggableParent: document.body,
	returnAnimMax: 300,
	_css: {
		position: "absolute",
		width: 80,
		height: 80,
		top: 0,
		left: 0,
		"font-size": 12,		
		"overflow-y": "hidden",
		"overflow-x": "hidden",
	    "font-family": 'Helvetica,"Helvetica neue", Arial, sans-serif',
	    "border" : "solid",
		"border-color": "rgba(50,50,50,1)",
		"color": "rgba(0,0,0,1)",
	  	"background-color" : "rgba(120,31,60,1)",
	  	"border-width" : 1,
	  	"border-radius": 0,	 
	  	"cursor": "pointer"
	}	
}


function scanThumbnail(args){
	var that = this;
	 __Init__(this, defaultArgs_scanThumbnail, args, function(){});

	//--------------------------------
	// WIDGET ADDS
	//--------------------------------	
	this.widget.onmousedown = function(){
		that.onmousedown(that);
	};


	//--------------------------------
	// MOUSE INTERACTIONS
	//--------------------------------
	this.mouseDown = false;
	this.setHoverMethods();
	

	//--------------------------------
	// THUMBNAIL IMAGE
	//--------------------------------	
	this.thumbImage = new Image();
	this.thumbImage.src = "./imageScans/ICBM_UCLA_1297_MR_SAG_MPRAGE_8_CHANNEL_br_raw_20060720120938860_80.jpg"; 
	
	//--------------------------------
	// THUMBNAIL CANVAS
	//--------------------------------
	this.thumb = this.makeThumbnailCanvas("_thumb");
	
	
	//--------------------------------
	// DRAGGABLE CANVAS
	//--------------------------------
	this.draggable = this.makeThumbnailCanvas("_draggable");
	$(this.draggable).draggable(); //apply jquery draggable to it
	that.widget.appendChild(that.draggable);	
	this.draggable.onmousemove = function(){
		that.onmousemove(that);
	};
	
	//--------------------------------
	// FRAMES
	//--------------------------------
	this.frames = this.getFrameList();

	this.restyle();
}


//*********************************************
// THUMB CANVASES
//*********************************************
scanThumbnail.prototype.makeThumbnailCanvas = function(idAppend){

	elt = __MakeElement__("canvas", this.widget, this.args.id + idAppend, mergeArgs(this._css,{
		top: 0,
		left: 0,
		"border-width": 0
	}));

	elt.width = this._css.width;
	elt.height = this._css.height;

	elt.getContext("2d").drawImage(this.thumbImage, 0, 0, this._css.width, this._css.height);

	return elt;	
}

//*********************************************
// HIGHLIGHT HOVER
//*********************************************
scanThumbnail.prototype.setHoverMethods = function(){
	var that = this;
	applyHoverAnim(this.widget);
}

//*********************************************
// FRAMES
//*********************************************
scanThumbnail.prototype.getFrameList = function(){
	return imageScans;
}

//*********************************************
// Does nothing for now...
//*********************************************
scanThumbnail.prototype.onmousemove = function(that){
	if (that.mouseDown){}
}


//*********************************************
//	THE DRAGGING PROCESS
//*********************************************
scanThumbnail.prototype.onmousedown = function(that){
	//--------------------------------
	// SET GLOBAL
	//--------------------------------
	that.mouseDown = true;

	//--------------------------------
	// SWITCH DRAGGABLE's PARENT
	//--------------------------------
	that.args.draggableParent.appendChild(that.draggable);


	//--------------------------------
	// SET DRAGGABLE's CSS
	//--------------------------------
	$(that.draggable).css({
		top: $(that.widget).offset().top,
		left: $(that.widget).offset().left,
		opacity: 1,
	});	
	
	//--------------------------------
	// DRAW HINTS AND COLORING
	//--------------------------------
	var context = that.draggable.getContext("2d");
	var hintFontHeight = 12;
	context.fillStyle = "white";
	context.font =  _px(hintFontHeight) + " " + that._css["font-family"];
	context.fillText("Drag to", that._css.width/2 - 20, that._css.height/2);
	context.fillText("viewer", that._css.width/2 -20, that._css.height/2 + hintFontHeight);
	context.fillStyle = "rgba(200,200,200, .5)";
	//context.fillRect(0, 0, 150, 100);
	
	//var context = that.thumb.getContext("2d");
	//context.fillStyle = "rgba(200,200,200, .2)";
	//context.fillRect(0, 0, 150, 100);
	
	//--------------------------------
	// TWEAK JQUERY UI
	//--------------------------------	
	$(that.draggable).draggable({scroll: false})
	

	//--------------------------------
	// START DROP ZONE LISTENING...
	//--------------------------------	
	if (that.dropZones && that.dropZones.length >0){
		for (var i=0; i<that.dropZones.length; i++){
			that.dropZones[i].startHoverListener();
		}		
	}

	//--------------------------------
	// DROP
	//--------------------------------			
	that.args.draggableParent.onmouseup = function(){	
		var wPos = $(that.widget).offset();
		var dPos = $(that.draggable).offset();
		
		//--------------------------------
		// RESET MOUSEDOWN TRACKER
		//--------------------------------
		that.mouseDown = false;
		
		
		//--------------------------------
		// IF OVER A DROPZONE...
		//--------------------------------
		var dz = that.getDropZone();
		if (dz > -1){
			$(that.draggable).css({
				opacity: 0,
				top: 0,
				left: 0
			});		
			that.restoreDrag();
			if (that.dropZones && that.dropZones.length >0){
				that.dropZones[dz].dropEvent(that);		
			}
		}
		
		
		//--------------------------------
		// IF NOT, ANIMATE BACK TO POSITION
		//--------------------------------
		else{
			var animTime = that.args.returnAnimMax;
			$(that.draggable).animate({
				left: "+=" + (wPos.left - dPos.left).toString(),
				top: "+=" + (wPos.top - dPos.top).toString(),
			}, animTime, function(){that.restoreDrag(that)})		
		}
		
		
		//--------------------------------
		// EITHER WAY, STOP DROP ZONES FROM LISTENING
		//--------------------------------
		if (that.dropZones && that.dropZones.length >0){
			for (var i=0; i<that.dropZones.length; i++){
				that.dropZones[i].stopHoverListener();
			}
		}
	
	}
}


//*********************************************
// WINDOW RESIZING
//*********************************************
scanThumbnail.prototype.restyle = function(){
	$(this.widget).css(this._css);
	
	$(this.draggable).css(this._css);
	
	//draggable customizations
	$(this.draggable).css({
		top: 0,
		left: 0,
		backgroundColor : "rgba(0,50,230,.5)",
		opacity: 0,
		borderColor: this._css["border_color"],
	});	
}


//*********************************************
// RESTORE AFTER DRAGGING
//*********************************************
scanThumbnail.prototype.restoreDrag = function(that){
	if (!that){
		that = this;
	}
	
	that.widget.appendChild(that.draggable);
	
	$(that.draggable).css({
		opacity: 0,
		top: 0,
		left: 0
	});
	
	$(that.widget).css({
		borderColor: that._css["border-color"]
	});
	
	that.thumb.getContext("2d").drawImage(that.thumbImage, 0, 0, that._css.width, that._css.height);
	
	that.args.draggableParent.onmouseup = function(){};
}

//*********************************************
// ADD DROP ZONE -- checks for dups
//*********************************************
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

//*********************************************
// GET DROP ZONE, returns a number, -1 if none
//*********************************************
scanThumbnail.prototype.getDropZone = function(){
	var hoverDropZones = []
	if (this.dropZones && this.dropZones.length > 0){
		for (var i=0; i<this.dropZones.length; i++){
			if (this.dropZones[i].hovering){
				hoverDropZones.push(i)
			}
		}
		if (hoverDropZones.length > 0){
			return (hoverDropZones.length > 1) ? hoverDropZones : hoverDropZones[0];
		}		
	}
	return -1;
}


