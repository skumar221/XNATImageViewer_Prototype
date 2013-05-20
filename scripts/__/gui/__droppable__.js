//***************************************
// DROPZONE MOUSEOVER ANIMATION
//***************************************
var dropZoneMouseover = function(dz, obj){
	if (dz){
		
		$(dz).stop().animate({
			opacity: 1,
			backgroundColor: "rgba(120, 120, 120, 0.2)",
			borderColor: "rgba(255,255,255,1)",
		}, 100, function(){});	
	
		for (var i=0; i<obj.dropZones.length; i++){
			if (obj.dropZones[i].widget != dz){
				dropZoneMouseout(obj.dropZones[i].widget, obj);
			}	
		}
	}
}



//***************************************
// DROPZONE MOUSEOUT ANIMATION
//***************************************
var dropZoneMouseout = function(dz, obj){
	if (dz){

		//try{
			$(dz).stop().animate({
				opacity: 1,
				backgroundColor: "rgba(120,120,120,0)",
				borderColor: "rgba(55,55,55,1)",
			}, 100, function(){});	
		//}
		//catch(e){
		//	console.log("ERROR")
		//}
	}
}



//***************************************
// ADD DROP ZONE -- checks for dups
//***************************************
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




//***************************************
// ADD DROP ZONE -- checks for dups
//***************************************
var deleteDropZone = function(dz, obj){
	
	if(!obj) obj = this;
	
	var dzInd = obj.dropZones.indexOf(dz)
	
	if (dzInd >= 0){
		
		obj.dropZones.splice(dzInd, 1);	
		return true;
		
	}
	else{
		throw "deleteDropZones: dropZone " + dz + " not found in list!"
	}

	return false;;
}



//***************************************
//	THE DRAGGING PROCESS
//***************************************
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
			
			// set activated	
			if (that.args.activated !== null || that.activated !== null){
				that.activate(that.dropZones[dz].args.id);
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
			}, animTime, function(){				
				
				that.restoreDrag(that);

				if (that.args.activated !== null || that.activated !== null){
					//console.log("droppable deactivate");
					if (!that.args.activated)
						that.deactivate();
				}
				
			})			
		}
		
		
		//--------------------------------
		// Unbind mouseenter and leave events, either way
		//--------------------------------
		for (var i=0;i< that.dropZones.length; i++){
			that.dropZoneMouseout(that.dropZones[i].widget);	
			$(that.dropZones[i]).unbind('mouseenter').unbind('mouseleave');
		}
	
	}
}





//***************************************
//	Init
//
//***************************************
function __Droppable__(obj){
	
	obj.dropZones = [];

	//--------------------------------
	// CREATE DRAGGABLE
	//--------------------------------
	var cloneObj = (obj.cloneable) ? obj.cloneable : obj;
	
	// extract the element from the obj (we don't know wheter it's
	// a javascript object ir or a DOM element)
	obj.draggable = __extractElementFromObject__(cloneObj).cloneNode(true);
	obj.draggable.id = obj.args.id + "_draggable";
	
	//apply jquery draggable to it
	$(obj.draggable).draggable(); 
	
	// add it to the parent
	__extractElementFromObject__(obj).appendChild(obj.draggable);	

	// css customization
	$(obj.draggable).css({
		top: 0,
		left: 0,
		backgroundColor : "rgba(0,50,230,.5)",
		opacity: 0,
		borderColor: obj.CSS["border_color"],
	});	
	


	// Draw the image of the object has one associated 
	// with it.
	if (obj.thumbImage){
		if (obj.draggable.nodeName == "CANVAS")
		{						
			$(obj.thumbImage).load(function(){

				obj.draggable.getContext('2d').drawImage(obj.thumbImage, 0,0, 
														 obj.draggable.width, 
														 obj.draggable.height);		
			})
		}
	}		
	

		
	//--------------------------------
	// DRAW HINT
	//--------------------------------
	obj.draggable.style.overflow = "visible"
	var context = __makeElement__("div", __extractElementFromObject__(obj), obj.id + "_hint",{
		position: "absolute",
		top: $(obj.draggable).height() + 20,
		left: 0,
		fontFamily: obj.CSS["font-family"],
		fontSize: 12,
		color: "white",
		"white-space": "nowrap"  // no text wrapping
	});
	context.innerHTML = "Drag to viewer"

	
	obj.restoreDrag = function(){
		__extractElementFromObject__(obj).appendChild(obj.draggable);
	
		$(obj.draggable).css({
			opacity: 0,
			top: 0,
			left: 0
		});
		
		$(__extractElementFromObject__(obj)).css({borderColor: obj.CSS["border-color"]});

	}
	
	
	//--------------------------------
	// APPEND DRAGGABLE FUNCTIONS
	//--------------------------------	
	obj.addDropZone = function(dz){addDropZone(dz, obj)};
	obj.deleteDropZone = function(dz){deleteDropZone(dz, obj)};
	obj.dropZoneMouseout = function(dz){dropZoneMouseout(dz, obj)};
	obj.dropZoneMouseover = function(dz){dropZoneMouseover(dz, obj)};
	obj.draggable.onmousedown = function(){__Droppable__mousedown(obj);}
	obj.onmousedown = obj.draggable.onmousedown;

}


