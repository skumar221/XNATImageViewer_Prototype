function expandModalHorizontally(that){
		 
		 
		 // clear any Jquery actions happening on other
		 // parts of the modal.
		 $(that.modal).stop();
		 $(that.closeButton).stop();
		 $(that.horizontalExpandButton).stop().unbind('mouseleave');
		 $(that.horizontalExpandButton).stop().unbind('mouseover');

		  //that.addScanViewer();
		  //that.updateCSS();
		 
		 
		 
		//-------------------------
		// Define animation parameters
		//-------------------------	
		 var animLen = 500;
		 var scanViewerWidth = $(that.scanViewers[that.scanViewers.length-1].widget).width();	
		 var newWidth = $(that.modal).width() + scanViewerWidth + __toInt__(that.closeButton.style.width);
		 
		 if (newWidth > window.innerWidth){
		 	console.log("MODAL TOO WIDE, RESIZING");
		 	newWidth = window.innerWidth * Globals.maxModalWidthPct;	 	
		 }


		//-------------------------
		// Animate the window
		//-------------------------	
		 $(that.modal).stop().animate({
		    width: newWidth,
		    left: window.innerWidth/2 - newWidth/2,
		  }, animLen, function() {
		    that.addScanViewer();
		    that.addScrollLinkIcon();
		    that.updateCSS();
		 });



		//-------------------------
		// Animate the close button
		//-------------------------		
		 $(that.closeButton).stop().animate({
		    left: window.innerWidth/2 + newWidth/2 - (__toInt__(that.closeButton.style.width)/2),
		  }, animLen, function() {
		    // Animation complete.
		 });
		 
		 		
		 		
		//-------------------------
		// Animate the expand button
		//-------------------------	
		 $(that.horizontalExpandButton).stop().animate({
		 	opacity: .5,
		    left: (newWidth - __toInt__(that.horizontalExpandButton.style.width)),
		  }, animLen, function() {
		    // Animation complete.
		 });
		 

}



//******************************************************
//  Calculations, if necessary, for the modal's dimensions
//
//******************************************************
var getModalWidth = function(that){


}



//******************************************************
//  Calculations, if necessary, for the modal's dimensions
//
//******************************************************
var getModalHeight = function(that){
	
	var minPx = Globals.minScanViewerHeight + Globals.expandButtonWidth;
	var pctCompressed = that.args.heightPct;
	var currPx = (pctCompressed * window.innerHeight);
	
	var retVal =  (currPx < minPx) ?  ((minPx/window.innerHeight)) : (pctCompressed);
	//console.log("retVal_H: " + retVal)
	return retVal;
}





//******************************************************
//  Calculates the modal dimensions based on pixed values.
//  translates them to other representaions accordingly.
//
//  This was implemented for two reasons: 1) To avoid CSS
//  stylesheets and have dynamic acces to an element's properties
//  2) Sometimes there was a delay in jQuery registering
//  an element's dimensions if percentages were entered.
//
//******************************************************
XNATModalImageViewer.prototype.modalDims = function(conversion){
		
	var that = this;
	
	//-------------------------
	// THE WIDTH
	//-------------------------	
	
	//	Get the prescribed height of the modal		
	var pModalHeight = Globals.maxModalHeightPct * window.innerHeight;
	
	//	Get the number of scan viewers
	var numScanViewers = that.scanViewers.length;
	
	// determine the minimum modal width
	var minModalWidth = Globals.scrollGalleryWidth + 
						Globals.minScanViewerWidth * numScanViewers + 
						Globals.scanViewerVerticalMargin * numScanViewers + 
						Globals.expandButtonWidth;
	
	// determine the the modal width based on prescribed proportions
	var pScanViewerHeight = pModalHeight - Globals.expandButtonWidth;
	var pScanViewerWidth = Globals.scanViewerDimRatio * pScanViewerHeight;
	
	// determine the minimum modal width
	var preliminaryModalWidth = Globals.scrollGalleryWidth + 
						 		pScanViewerWidth  * numScanViewers + 
						 		Globals.scanViewerVerticalMargin * numScanViewers + 
						 		Globals.expandButtonWidth;

	console.log(Globals.scrollGalleryWidth, numScanViewers, pScanViewerWidth, preliminaryModalWidth)
	var _w = preliminaryModalWidth;
	
	
	
	
	
	
	
	
	
	
	
	
	var _h = pModalHeight;
	

	var _l = (window.innerWidth - _w) /2 ;

	
	var _t = (window.innerHeight - _h)/2;
	
	console.log("w: ", _w)
	return  {
		width: Math.round(_w),
		left: Math.round(_l),
		height: Math.round(_h),
		top: Math.round(_t),
		scanViewerWidth: Math.round(pScanViewerWidth),
		scanViewerHeight: Math.round(pScanViewerHeight),
	}

}







//******************************************************
//  Update CSS.
//
//******************************************************
XNATModalImageViewer.prototype.updateCSS = function(args){

	

    //----------------------------------
	//	CSS: RESIZE THE MODAL
	//----------------------------------
	this.modalDimensions = this.modalDims();
	console.log(this.modalDimensions);
	$(this.modal).css(this.modalDimensions);	
	if(args){$(this.modal).css(args);}	



	

	
	
	
	//----------------------------------
	//	CSS: SCROLL GALLERY
	//----------------------------------
	$(this.scrollGallery.widget).css({
		left: 0,//this.args.marginLeft,
		top: 0,//this.args.marginTop,
		height: $(this.modal).height(),// - this.args.marginTop*2,	
	})
	this.scrollGallery.updateCSS();
	
	console.log("WIDTH: ", $(this.scrollGallery.widget).width());


 
 	//----------------------------------
	//	CSS: SCAN VIEWERS
	//----------------------------------		
	for (var i=0;i<this.scanViewers.length;i++){
		var l = (i==0) ? $(this.scrollGallery.widget).position().left + $(this.scrollGallery.widget).width() + Globals.scanViewerVerticalMargin : 
						 $(this.scanViewers[i-1].widget).position().left + $(this.scanViewers[i-1].widget).width() + Globals.scanViewerVerticalMargin;
		console.log("l: ", l);		 	 
		this.scanViewers[i].updateCSS({
			height: this.modalDimensions.scanViewerHeight,// - this.args.marginTop*2,
			width: this.modalDimensions.scanViewerWidth,
			left: l,
			top: -1//this.args.marginTop,
		});
	}   
    
	
		
	//----------------------------------
	//	CSS: CLOSE BUTTON
	//----------------------------------
	$(this.closeButton).css({
		left: this.modalDimensions["left"] + this.modalDimensions["width"]- $(this.closeButton).width()/2,
		top: this.modalDimensions["top"]- $(this.closeButton).height()/2,
		opacity: .9
	})		

	
	
	
	//----------------------------------
	//	CSS: HORIZONTAL EXPAND BUTTON
	//----------------------------------
	if (this.horizontalExpandButton){
		$(this.horizontalExpandButton).css({
			left:  this.modalDimensions["width"] - Globals.expandButtonWidth,
			height: "100%",
			top: 0,
			width: Globals.expandButtonWidth
		})			
	}	
	
	
	
	//----------------------------------
	//	CSS: VERTICAL EXPAND BUTTONS
	//----------------------------------
	if (this.verticalExpandButtons){
			for (var i=0;i<this.scanViewers.length;i++){
				$(this.verticalExpandButtons[i]).css({
					left:  $(this.scanViewers[i].widget).position().left,
					height: Globals.expandButtonWidth,
					width: $(this.scanViewers[i].widget).width(),
					top: $(this.modal).height() - Globals.expandButtonWidth,
				})	
			}	
		//}	
	}	
	
	
	/*
	//----------------------------------
	//	CSS: SCROLL LINKS
	//----------------------------------
	for (var i=0;i<this.scrollLinks.length;i++){
		$(this.scrollLinks[i]).css({
			left: 2 + $(this.scanViewers[i].widget).position().left + $(this.scanViewers[i].widget).width() - $(this.scrollLinks[i]).width()/2 + this.args.marginLeft,
			top: $(this.scanViewers[i].widget).position().top + $(this.scanViewers[i].frameViewer.widget).height()/2 - 2
		})	
	}
	
	*/
}
