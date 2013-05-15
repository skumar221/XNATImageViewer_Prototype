xmiv.prototype.animateModalChange = function(animLen, callbacks){
		
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
		// Animate the viewers
		//-------------------------	
		for (var i=0; i<this.scanViewers.length; i++){
			for (var j=0; j<this.scanViewers[i].length; j++){ 
				//-------------------------
				// Fade OUT the viewer contents only if there's height change in the modal
				//-------------------------	
				 if (modalDims.height != __toInt__(this.modal.style.height)){
				 	for (var k=0;k<this.scanViewers[i][j].widget.childNodes.length;k++){
					 	$(this.scanViewers[i][j].widget.childNodes[k]).stop().fadeTo(animLen, 0);	
					 }
					 var svWidget = this.scanViewers[i][j].widget;	
				 }
				 
				 
				 $(svWidget).stop().animate({
				    left: modalDims.scanViewer.lefts[i],
				    top: modalDims.scanViewer.tops[i],
				    width: modalDims.scanViewer.width,
				    height: modalDims.scanViewer.height,
				  }, animLen, function() {
				  	
				  	//-------------------------
					// Fade IN the viewer contents if they were faded out
					//-------------------------	
				  	for (var x=0; x<this.scanViewers.length; x++){
						for (var y=0; y<this.scanViewers[x].length; y++){ 
					  		var svWidget = this.scanViewers[x][y].widget;
					  	    for (var z=0; z<svWidget.childNodes.length; z++){
						 		$(svWidget.childNodes[z]).stop().fadeTo(animLen, 1);	
						 	}
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
		  }, animLen, function() {
		    // Animation complete.
		 });
		 
		 		
		 		
		 		
		//-------------------------
		// Animate the horizontal expand button
		//-------------------------	
		 $(this.horizontalExpandButtons).stop().animate({
		 	opacity: .5,
		    left: modalDims.horizontalExpandButtons.left,
		  }, animLen, function() {
		    // Animation complete.
		 });
		
}