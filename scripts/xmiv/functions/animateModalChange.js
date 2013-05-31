XMIV.prototype.animateModalChange = function (animLen, callbacks) {
		
		var that = this;
		
		if (!animLen && animLen != 0) { var animLen = 500; }
		
		
		
		//-------------------------
		//  GET THE MODAL DIMENSIONS, 
		//-------------------------	
		 var modalDims = this.modalDims();




		//-------------------------
		//  CHECK TO SEE IF THE VIEWERS ARE TOO SMALL 
		//-------------------------	
		if (__toInt__(this.ScanViewers[0][0].widget.style.width) < GLOBALS.minScanViewerWidth) {
			//this.modal.removeChild(this.ScanViewers[__lengthMD__(this.ScanViewers) - 1].widget);
			//this.ScanViewers.pop();
			//$(this.ScanViewers[__lengthMD__(this.ScanViewers) - 1].widget).fadeTo(animLen,1);
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
		  }, animLen, function () {
		  	    
		  	
		    that.updateCSS();
			if (callbacks && callbacks.modal && callbacks.modal.length > 0) {
		  		for (i in callbacks.modal) { callbacks.modal[i](that); }
		  	}	
			
		 });




		//-------------------------
		// SCAN VIEWERS
		//-------------------------	
		for (var i in this.ScanViewers) {
			for (var j in this.ScanViewers[i]) { 
				
			
				//
				// FADE OUT/IN: ScanViewer contents
				//
				 if (modalDims.ScanViewer.height != __toInt__(this.ScanViewers[0][0].widget.style.height)) {
				 	
				 	if (this.ScanViewers[i][j]) {


				 		
					 	for (var k in this.ScanViewers[i][j].widget.childNodes) {
					 		
					 		
					 		var childObj = this.ScanViewers[i][j].widget.childNodes[k]
	
						 	//
						 	// Check if the childObject is DOM element otherwise jQuery throws errors
						 	//  
						 	if (__isElement__(childObj)) {
						 		
						 		$(this.ScanViewers[i][j].widget.childNodes[k]).stop().fadeTo(animLen, 0).fadeTo(animLen, 1);		
						 		
						 	}	
						 }	
						 
						 var svWidget = this.ScanViewers[i][j].widget;	
				 	}
				 }
				 

				//
				// ANIMATE: ScanViewer widget
				//
				$(svWidget).draggable( "destroy");
				
				$(svWidget).off();
				

				 $(svWidget).off().stop().animate({
				    
				    left: modalDims.ScanViewer.lefts[i][j],
				    top: modalDims.ScanViewer.tops[i][j],
				    width: modalDims.ScanViewer.width,
				    height: modalDims.ScanViewer.height,
				    
				  }, GLOBALS.animSlow, function () {	
				  	
				  	//$(this).on();
				  	 for (var i in that.ScanViewers) {
						for (var j in that.ScanViewers[i]) { 	
							
							
							that.ScanViewers[i][j].setJQueryEvents();

						}
					}  	
				 
				  });	
				  
				  
				  		
			}
		} 


	

		//-------------------------
		// Animate the close button
		//-------------------------		
		 $(this.closeButton).stop().animate({
		    left: modalDims.closeButton.left,
		    top: modalDims.closeButton.top
		  }, animLen, function () {
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