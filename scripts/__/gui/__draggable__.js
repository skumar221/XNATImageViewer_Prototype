






//******************************************************
//  The general idea here is that there's an overlaying
//  div on top of the slider that, when clicked
//  expands to 100% of the page size.
//******************************************************
function __draggable__(element, dragBounds, callbacks){




	
	//------------------------
	//  Clear mouse listener
	//------------------------	
	if (element.hasMouseListener){
		element.clearMouseListener();
	}

	


	//------------------------
	//  Validate boundary args
	//------------------------	
	var paramList = ["height", "width", "top", "left"];	
	for (i in paramList){
		if (! paramList[i] in dragBounds){
			throw "__draggable__ init: Missing necessary dragBounds parameter: " + paramList[i]
		}

		if (! paramList[i] in dragBounds){
			throw "__draggable__ init: Missing necessary dragBounds parameter: " + paramList[i]
		}
	}
	
	
	
	
	//------------------------
	//  Recalculate the drag bounds in case the element is outside of it.
	//------------------------	
	
	var eltTop = __toInt__(element.style.top);
	var eltLeft = __toInt__(element.style.left);
	var eltHeight = __toInt__(element.style.height);
	var eltWidth = __toInt__(element.style.width);
	
	if (eltTop < dragBounds.top){
		dragBounds.top = eltTop
	}
	if ((eltTop + eltHeight) > dragBounds.height){
		dragBounds.height += (eltTop + eltHeight) - dragBounds.height;
	}

	if (eltLeft < dragBounds.left){
		dragBounds.left = eltLeft
	}
	if ((eltLeft + eltWidth) > dragBounds.width){
		dragBounds.width += (eltLeft + eltWidth) - dragBounds.width;
	}
	
	
	

	

	//------------------------
	//  Define the mouselistener function
	//------------------------		
	__mouseListener__(element, {
		mousemove: [function(event){
			
			
			var newPt = __getMouseXY__(event);	
			var elementWidth = __toInt__(element.style.width);
			var elementHeight = __toInt__(element.style.height);
			var elementTop = __toInt__(element.style.top);
			var elementLeft = __toInt__(element.style.left);




			//------------------------
			//  Temporary top/left positions.  Validated later.
			//------------------------						   
			var tempLeft = newPt.x - // mouseclick x
						   element.parentNode.getBoundingClientRect().left - 
						   elementWidth/2; // centers the handle on the mouse pointer		
						   
			var tempTop = newPt.y - // mouseclick x
						   element.parentNode.getBoundingClientRect().top - 
						   elementHeight/2; // centers the handle on the mouse pointer	
						   



			//------------------------
			//  The extents of the element
			//------------------------					
			var extentsWidth = (tempLeft + elementWidth);
			var extentsHeight = (tempTop + elementHeight);				
			



			//------------------------
			//  Validate X Pos w/ boundary
			//------------------------										
			if (tempLeft < dragBounds.left){
				tempLeft = dragBounds.left;
			}
			else if (extentsWidth > dragBounds.width){
				tempLeft = dragBounds.width - elementWidth;
			}
			


			//------------------------
			//  Validate Y Pos w/ boundary
			//------------------------
			if (tempTop < dragBounds.top){
				//console.log("TOP BOUND REACHED")
				tempTop = dragBounds.top;
			}
			else if (extentsHeight > dragBounds.height){
				//console.log("BOTTOM BOUND REACHED", tempTop, elementHeight, extentsHeight, dragBounds.height)
				tempTop = dragBounds.height - elementHeight;
			}
			
			
						
			
			//------------------------
			//  Apply to style
			//------------------------	
			element.style.left = __toPx__(tempLeft);
			element.style.top = __toPx__(tempTop);	
			

			
			
			//------------------------
			//  Callbacks
			//------------------------	
			if (callbacks && callbacks.length > 0){
				for (var i=0; i<callbacks.length; i++){
					callbacks[i](element);
				}
			}							
		}]
	});


	

	element.updateDragBounds = function(dragBounds){
		__draggable__(element, dragBounds, callbacks);
	}	
		

	element.clearDragCallbacks = function(callback){
		__draggable__(element, dragBounds);
	}	
	
	
	element.addDragCallback = function(callback){
		if (!callbacks) { callbacks = [] };
		callbacks.push(callback); 
		__draggable__(element, dragBounds, callbacks);
	}	
}
