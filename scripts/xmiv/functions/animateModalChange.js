xmiv.prototype.animateModalChange = function(animLen, callbacks){
		
		var that = this;
		
		if (!animLen && animLen != 0) { var animLen = 500; }
		
		
		
		//-------------------------
		//  GET THE MODAL DIMENSIONS, 
		//-------------------------	
		 var modalDims = this.modalDims();




		//-------------------------
		//  CHECK TO SEE IF THE VIEWERS ARE TOO SMALL 
		//-------------------------	
		if (__toInt__(this.scanViewers[0][0].widget.style.width) < Globals.minScanViewerWidth){
			//this.modal.removeChild(this.scanViewers[__lengthMD__(this.scanViewers) - 1].widget);
			//this.scanViewers.pop();
			//$(this.scanViewers[__lengthMD__(this.scanViewers) - 1].widget).fadeTo(animLen,1);
			//return;	
		} 
		
		
		
		
		//-------------------------
		// Animate the window
		//-------------------------	
		 $(this.modal).stop().animate({
		    width: modalDims.width,
		    left: modalDims.left,
		    height: modalDims.height,
		    top: modalDims.top,
		  }, animLen, function() {
		  	    
		  	
		    that.updateCSS();
			if (callbacks && callbacks.modal && callbacks.modal.length > 0){
		  		for (i in callbacks.modal) { callbacks.modal[i](that); }
		  	}	
			
		 });




		//-------------------------
		// SCAN VIEWERS
		//-------------------------	
		for (var i in this.scanViewers){
			for (var j in this.scanViewers[i]){ 
				

				//
				// FADE OUT/IN: scanViewer contents
				//
				 if (modalDims.scanViewer.height != __toInt__(this.scanViewers[0][0].widget.style.height)){
				 	
				 	if (this.scanViewers[i][j]){
				 		
					 	for (var k in this.scanViewers[i][j].widget.childNodes){
					 		
					 		
					 		var childObj = this.scanViewers[i][j].widget.childNodes[k]
	
						 	//
						 	// Check if the childObject is DOM element otherwise jQuery throws errors
						 	//  
						 	if (__isElement__(childObj)){
						 		
						 		$(this.scanViewers[i][j].widget.childNodes[k]).stop().fadeTo(animLen, 0).fadeTo(animLen, 1);		
						 		
						 	}	
						 }	
						 
						 var svWidget = this.scanViewers[i][j].widget;	
				 	}
				 }
				 

				//
				// ANIMATE: scanViewer widget
				//
				 $(svWidget).stop().animate({
				    left: modalDims.scanViewer.lefts[i][j],
				    top: modalDims.scanViewer.tops[i][j],
				    width: modalDims.scanViewer.width,
				    height: modalDims.scanViewer.height,
				  }, animLen, function() {});	
				  
				  
				  		
			}
		} 


	

		//-------------------------
		// Animate the close button
		//-------------------------		
		 $(this.closeButton).stop().animate({
		    left: modalDims.closeButton.left,
		    top: modalDims.closeButton.top
		  }, animLen, function() {
		    // Animation complete.
		 });
		 
		 		
		 		
		 		
		//-------------------------
		// Animate the horizontal expand button
		//-------------------------	
		 $(this.horizontalExpandButtons).stop().fadeOut(animLen, 0).fadeIn(animLen);	
		 
		 
		 
		//-------------------------
		// Animate the vertical expand buttons
		//-------------------------		
		 $(this.verticalExpandButtons).stop().fadeOut(animLen, 0).fadeIn(animLen);		
		
		
}