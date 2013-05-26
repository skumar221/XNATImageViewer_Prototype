function __mouseListener__(parent, callbacks) {

	var that = this;
	parent.hasMouseListener = true;
	
	var mouseListenerElement =  __makeElement__("div", parent, "__mouseListener__", {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		zIndex: 1999999999,
		borderWidth: 0,
		backgroundColor: "rgba(0,0,0,0)"
	});
	
	
	mouseListenerElement.onmousedown = function(event){ 
		this.style.position = "fixed";
		
		this.style.backgroundColor = "rgba(255, 0, 0, 0)";
		this.mouseDown = true;
		if (callbacks.mousedown){
			for (var i=0; i<callbacks.mousedown.length; i++){
				callbacks.mousedown[i](event)
			}
		}

		
	}
	
	
	mouseListenerElement.onmousemove = function(event){ 
		if (this.mouseDown){
			if (callbacks.mousemove){
				for (var i=0; i<callbacks.mousemove.length; i++){
					callbacks.mousemove[i](event)
				}
			}
		}		
	}
	
	mouseListenerElement.onmouseup = function(event){ 
		this.style.position = "absolute";
		this.style.backgroundColor = "rgba(255, 0, 0, 0)";
		this.mouseDown = false;
		
		if (callbacks.mouseup){
			for (var i=0; i<callbacks.mouseup.length; i++){
				callbacks.mouseup[i](event)
			}
		}
	}
	
	parent.clearMouseListener = function(){
		parent.removeChild(mouseListenerElement);
		parent.hasMouseListener = false;
	}
		
}