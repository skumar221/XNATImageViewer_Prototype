//*********************************************
// DROPZONE MOUSEOVER ANIMATION
//*********************************************
var dropZoneMouseover = function(dz, obj){
	if (dz){
		if (!obj.hovering || obj.hovering == ""){
			$(dz).stop().animate({
				opacity: 1,
				backgroundColor: "rgba(120, 120, 120, 0.2)",
				borderColor: "rgba(255,255,255,1)",
			}, 200, function(){});	
			obj.hovering = dz.id;
		}
	}
}

//*********************************************
// DROPZONE MOUSEOUT ANIMATION
//*********************************************
var dropZoneMouseout = function(dz, obj){
	if (dz){
		if (obj.hovering == dz.id){
			$(dz).stop().animate({
				opacity: 1,
				backgroundColor: "rgba(120,120,220,0)",
				borderColor: "rgba(55,55,55,1)",
			}, 200, function(){});
			obj.hovering = "";
		}
	}
}


//*********************************************
// ADD DROP ZONE -- checks for dups
//*********************************************
var addDropZone = function(dz, obj){
	if(!obj) obj = this;
	for (var i=0; i<obj.dropZones.length; i++){
		if (obj.dropZones[i] == dz){
			console.log("Already tracking drop zone: " + dz.args["id"]);
			return false;
		}
	}
	obj.dropZones.push(dz);
	return true;
}

//*********************************************
//	THE DRAGGING PROCESS
//*********************************************
var __Droppable__mousedown = function(that){

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
		opacity: .8,
	});	

	
	//--------------------------------
	// TWEAK JQUERY UI
	//--------------------------------	
	$(that.draggable).draggable({scroll: false})



	//--------------------------------
	// MOUSE MOVE
	//--------------------------------	
	that.args.draggableParent.onmousemove = function(){
		var dz = checkIfOverDropZone(that.draggable, that.dropZones);
		if (dz > -1){
			that.dropZoneMouseover(that.dropZones[dz].widget);
		}
		else
			for (var i=0; i<that.dropZones.length;i++){
				that.dropZoneMouseout(that.dropZones[i].widget);	
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
		var dz = checkIfOverDropZone(that.draggable, that.dropZones);
		if (dz > -1){
			$(that.draggable).css({
				opacity: 0,
				top: 0,
				left: 0
			});		
			that.restoreDrag(that);
			if (that.dropZones && that.dropZones.length >0){
				//that.dropZones[dz].loadFrames(that.frames);		
				that.dropZones[dz].loadDroppable(that);		
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
		for (var i=0;i< that.dropZones.length; i++){
			that.dropZoneMouseout(that.dropZones[i].widget);	
			$(that.dropZones[i]).unbind('mouseenter').unbind('mouseleave');
		}
	
	}
}





function __Droppable__(obj){
	
	obj.dropZones = [];

	//--------------------------------
	// CREATE DRAGGABLE
	//--------------------------------
	var cloneObj = (obj.cloneable) ? obj.cloneable : obj;
	obj.draggable = __ExtractElement__(cloneObj).cloneNode(true);
	obj.draggable.id = obj.args.id + "_draggable";
	
	//apply jquery draggable to it
	$(obj.draggable).draggable(); 
	
	// add it to the parent
	__ExtractElement__(obj).appendChild(obj.draggable);	

	// css customization
	$(obj.draggable).css({
		top: 0,
		left: 0,
		backgroundColor : "rgba(0,50,230,.5)",
		opacity: 0,
		borderColor: this._css["border_color"],
	});	
	

	if (obj.draggable.nodeName == "CANVAS")
	{
		obj.draggable.getContext('2d').drawImage(cloneObj, 0,0)
	}
		
	//--------------------------------
	// DRAW HINT
	//--------------------------------
	obj.draggable.style.overflow = "visible"
	var context = __MakeElement__("div", __ExtractElement__(obj), obj.id + "_hint",{
		position: "absolute",
		top: $(obj.draggable).height() + 20,
		left: 0,
		fontFamily: obj._css["font-family"],
		fontSize: 12,
		color: "white",
		"white-space": "nowrap"  // no text wrapping
	});
	context.innerHTML = "Drag to viewer"

	
	obj.restoreDrag = function(){
		__ExtractElement__(obj).appendChild(obj.draggable);
	
		$(obj.draggable).css({
			opacity: 0,
			top: 0,
			left: 0
		});
		
		$(__ExtractElement__(obj)).css({borderColor: obj._css["border-color"]});

	}
	//--------------------------------
	// APPEND DRAGGABLE FUNCTIONS
	//--------------------------------	
	obj.addDropZone = function(dz){addDropZone(dz, obj)};
	obj.dropZoneMouseout = function(dz){dropZoneMouseout(dz, obj)};
	obj.dropZoneMouseover = function(dz){dropZoneMouseover(dz, obj)};
	obj.draggable.onmousedown = function(){__Droppable__mousedown(obj);}

}


