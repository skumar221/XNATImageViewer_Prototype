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
		for (var i=0;i<__lengthMD__(this.scanViewers);i++){
			 
			//-------------------------
			// Fade OUT the viewer contents only if there's height change in the modal
			//-------------------------	
			 if (modalDims.height != __toInt__(this.modal.style.height)){
			 	for (var j=0;j<this.scanViewers[i].widget.childNodes.length;j++){
				 	$(this.scanViewers[i].widget.childNodes[j]).stop().fadeTo(animLen, 0);	
				 }
				 var svWidget = this.scanViewers[i].widget;	
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
			  	for (var i=0;i<__lengthMD__(this.scanViewers);i++){
			  		var svWidget = this.scanViewers[i].widget;
			  	    for (var j=0;j<svWidget.childNodes.length;j++){
				 		$(svWidget.childNodes[j]).stop().fadeTo(animLen, 1);	
				 	}
			  	}
			  	
			  	
			  	
			 });			
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
		 $(this.horizontalExpandButton).stop().animate({
		 	opacity: .5,
		    left: modalDims.horizontalExpandButton.left,
		  }, animLen, function() {
		    // Animation complete.
		 });
		
}