function removeScanViewer(that, scanViewer){
		 
		 
		 var animLen = 500;
		 
		 // clear any Jquery actions happening on other
		 // parts of the modal.
		 $(that.modal).stop();
		 $(that.closeButton).stop();
		 $(that.horizontalContractButton).stop().unbind('mouseleave');
		 $(that.horizontalContractButton).stop().unbind('mouseover');

		 

		//-------------------------
		// Fade out viewer, then delete it
		//-------------------------			
		
		// unlink the viewer sliders from one another
		for (var i=0; i<that.scanViewers.length; i++){
			that.scanViewers[i].frameSlider.clearLinked();
			$(that.scanViewers[i].widget).unbind('mouseover');
			$(that.scanViewers[i].widget).unbind('mouseout');
		}	
		
		// remove viewer from global list
		var viewerInd = that.scanViewers.indexOf(scanViewer);
		that.scanViewers.splice(viewerInd , 1);
		
		if (that.scanViewers.length == 0){
			that.destroy();
			return;
		}

		$(scanViewer.widget).stop().fadeTo(animLen, 0, function(){
			that.modal.removeChild(scanViewer.widget);
		});
		

		//-------------------------
		// Fade out expandButton, then delete it
		//-------------------------			
		$(that.verticalExpandButtons[viewerInd]).stop().fadeTo(animLen, 0, function(){
			that.modal.removeChild(that.verticalExpandButtons[viewerInd]);
			that.verticalExpandButtons.splice(viewerInd , 1);
		});
		
		
		//-------------------------
		// Fade out linkButton, then delete it
		//-------------------------		
		
		// check the position of the link, special case for viewerInd == 0
		scrollLinkInd = viewerInd -1;
		if (viewerInd == 0) { scrollLinkInd = 0 };

		// remember what is active and what isn't
		var activeList = [];
		
		
		// deactivate and delete all scroll links
		for (var j=0; j<that.scrollLinks.length; j++){

			// track the state of the current ones
			if (j != scrollLinkInd) { 
				activeList.push($(that.scrollLinks[j]).data('activated'));
			}
			
			// fade out the scrollLinks
			var sl = that.scrollLinks[j];
			$(sl).fadeTo(animLen, 0, function(){

				if (this == that.scrollLinks[that.scrollLinks.length - 1]){
					//console.log("HERE");
					for (var k=0; k<that.scrollLinks.length; k++){
						that.modal.removeChild(that.scrollLinks[k]);
					}
					that.scrollLinks = [];
					
					animateModalChange(that, animLen, {
						modal: [function(){
							for (var i=0; i<that.scanViewers.length; i++){
								if (i > 0) that.addScrollLinkIcon();	
							}
							for (var i=0; i<that.scrollLinks.length; i++){
								
								if(activeList[i]){
									that.scrollLinks[i].onclick('activate', 0);	
								}
							}
						}]
					});
				}

			});
			

		}
		




		 


	
}


function animateModalChange(that, animLen, callbacks){
		
		if (!animLen && animLen != 0) { var animLen = 500; }
		
		//-------------------------
		//  GET THE MODAL DIMENSIONS, 
		//-------------------------	
		 var modalDims = that.modalDims();




		//-------------------------
		//  CHECK TO SEE IF THE VIEWERS ARE TOO SMALL 
		//-------------------------	
		if (__toInt__(that.scanViewers[0].widget.style.width) < Globals.minScanViewerWidth){
			that.modal.removeChild(that.scanViewers[that.scanViewers.length - 1].widget);
			that.scanViewers.pop();
			$(that.scanViewers[that.scanViewers.length - 1].widget).fadeTo(animLen,1);
			return;	
		} 
		
		
		
		
		//-------------------------
		// Animate the window
		//-------------------------	
		 $(that.modal).stop().animate({
		    width: modalDims.width,
		    left: modalDims.left,
		    height: modalDims.height,
		    top: modalDims.top,
		  }, animLen, function() {
		  	
		  	if (callbacks && callbacks.modal && callbacks.modal.length > 0){
		  		for (i in callbacks.modal) { callbacks.modal[i](that); }
		  	}	    
		  	
		    that.updateCSS();
			$(that.scanViewers[that.scanViewers.length - 1].widget).fadeTo(animLen,1);
		 });




		//-------------------------
		// Animate the viewers
		//-------------------------	
		for (var i=0;i<that.scanViewers.length;i++){
			 
			//-------------------------
			// Fade OUT the viewer contents only if there's height change in the modal
			//-------------------------	
			 if (modalDims.height != __toInt__(that.modal.style.height)){
			 	for (var j=0;j<that.scanViewers[i].widget.childNodes.length;j++){
				 	$(that.scanViewers[i].widget.childNodes[j]).stop().fadeTo(animLen, 0);	
				 }
				 var svWidget = that.scanViewers[i].widget;	
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
			  	for (var i=0;i<that.scanViewers.length;i++){
			  		var svWidget = that.scanViewers[i].widget;
			  	    for (var j=0;j<svWidget.childNodes.length;j++){
				 		$(svWidget.childNodes[j]).stop().fadeTo(animLen, 1);	
				 	}
			  	}
			  	
			  	
			  	
			 });			
		} 




		//-------------------------
		// Animate the close button
		//-------------------------		
		 $(that.closeButton).stop().animate({
		    left: modalDims.closeButton.left,
		    top: modalDims.closeButton.top
		  }, animLen, function() {
		    // Animation complete.
		 });
		 
		 		
		 		
		 		
		//-------------------------
		// Animate the horizontal expand button
		//-------------------------	
		 $(that.horizontalExpandButton).stop().animate({
		 	opacity: .5,
		    left: modalDims.horizontalExpandButton.left,
		  }, animLen, function() {
		    // Animation complete.
		 });
		 
		 
		 
		/*
		//----------------------------------
		//	Animate the scroll links
		//----------------------------------
		for (var i=0;i<that.scrollLinks.length;i++){
			$(that.scrollLinks[i]).stop().animate( {
				left: modalDims.scrollLink.lefts[i],
				top: modalDims.scrollLink.tops[i],
			}, animLen, function(){
				
			});	
		}
		*/
		
}

function expandModalHorizontally(that){
		 
		 var animLen = 500;
		 
		 // clear any Jquery actions happening on other
		 // parts of the modal.
		 $(that.modal).stop();
		 $(that.closeButton).stop();
		 $(that.horizontalExpandButton).stop().unbind('mouseleave');
		 $(that.horizontalExpandButton).stop().unbind('mouseover');

		 

		//-------------------------
		// Add a scan viewer, then hide it
		//-------------------------		
		that.addScanViewer();
		$(that.scanViewers[that.scanViewers.length - 1].widget).fadeTo(0,0);

		
		//-------------------------
		//  GET THE MODAL DIMENSIONS, 
		//-------------------------	
		 var modalDims = that.modalDims();




		//-------------------------
		//  CHECK TO SEE IF THE VIEWERS ARE TOO SMALL 
		//-------------------------	
		if (__toInt__(that.scanViewers[0].widget.style.width) < Globals.minScanViewerWidth){
			that.modal.removeChild(that.scanViewers[that.scanViewers.length - 1].widget);
			that.scanViewers.pop();
			$(that.scanViewers[that.scanViewers.length - 1].widget).fadeTo(animLen,1);
			return;	
		} 
		

		animateModalChange(that, animLen, {
			modal: [function(){that.addScrollLinkIcon()}]
		});
		return;

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
	
	var scrollGalleryLeft = 0;
	var maxModalWidth = Math.round(window.innerWidth * Globals.maxModalHeightPct);
	
	
	
	//-------------------------
	// 1. Generate a prelimiary width
	//-------------------------	
	
	
	
	//	Get the prescribed height of the modal		
	var modalHeight = Globals.maxModalHeightPct * window.innerHeight;
	
	//	Get the number of scan viewers
	var numScanViewers = that.scanViewers.length;
	
	// determine the minimum modal width
	var minModalWidth = Globals.scrollGalleryWidth + 
						Globals.minScanViewerWidth * numScanViewers + 
						Globals.scanViewerVerticalMargin * numScanViewers + 
						Globals.expandButtonWidth;
	
	// determine the the modal width based on prescribed proportions
	var scanViewerHeight = modalHeight - Globals.expandButtonWidth;
	var scanViewerWidth = Globals.scanViewerDimRatio * scanViewerHeight;
	
	// determine the minimum modal width
	var modalWidth = Globals.scrollGalleryWidth + 
					 scanViewerWidth  * numScanViewers + 
					 Globals.scanViewerVerticalMargin * numScanViewers + 
					 Globals.expandButtonWidth;



 
	//-------------------------
	// 2. If the modal is too wide, scale it down
	//-------------------------
	if (modalWidth> maxModalWidth){	
							 		
		scanViewerWidth = (maxModalWidth - (Globals.scrollGalleryWidth + Globals.scanViewerVerticalMargin * numScanViewers + Globals.expandButtonWidth))/numScanViewers;	
		scanViewerHeight = scanViewerWidth / Globals.scanViewerDimRatio;
		modalWidth= maxModalWidth;
		modalHeight = scanViewerHeight + Globals.expandButtonWidth;
		
	}


	var _l = (window.innerWidth - modalWidth) /2 ;
	var _t = (window.innerHeight - modalHeight)/2;
	
	
	

	//-------------------------
	// SCROLL GALLERY
	//-------------------------	
	var scrollGalleryCSS = {
		width: 110,
		height: Math.round(modalHeight),
		left: 0,
		top: 0,
	}
		
		
		
		
	//-------------------------
	// SCAN VIEWER DIMS
	//-------------------------	
	var scanViewerLefts = [];
	var scanViewerTops = [];
	var viewerStart = scrollGalleryCSS.width + scrollGalleryCSS.left + Globals.scanViewerVerticalMargin;
	for (var i=0;i<this.scanViewers.length;i++){
		l = viewerStart + i* (scanViewerWidth + Globals.scanViewerVerticalMargin);
		scanViewerLefts.push(l);
		scanViewerTops.push(-1);
	} 
	
	

	//-------------------------
	// SCROLL LINK DIMS
	//-------------------------	
	var scrollLinkLefts = [];
	var scrollLinkTops = [];	
	for (var i=0;i<that.scrollLinks.length;i++){
		scrollLinkLefts.push(scanViewerLefts[i] + scanViewerWidth - 
							 $(that.scrollLinks[i]).width()/2 + 
							 Globals.scanViewerVerticalMargin/2);
		scrollLinkTops.push(scanViewerTops[i] + scanViewerHeight/2 - 2);
	}

				
				
				
//	console.log("VIWER WIDTH: ", Math.round(scanViewerWidth));
	return  {
		width: Math.round(modalWidth),
		left: Math.round(_l),
		height: Math.round(modalHeight),
		top: Math.round(_t),
		scanViewer: {
			width: Math.round(scanViewerWidth),
			height: Math.round(scanViewerHeight),
			lefts: scanViewerLefts,
			tops: scanViewerTops,	
		},
		scrollGallery: {widgetCSS: scrollGalleryCSS},
		closeButton: {
			left: Math.round(_l) + Math.round(modalWidth) - (__toInt__(that.closeButton.style.width)/2),
			top: Math.round(_t) - $(this.closeButton).height()/2,// (__toInt__(that.closeButton.style.width)/2),
		},
		horizontalExpandButton: {
			left: (Math.round(modalWidth) - __toInt__(that.horizontalExpandButton.style.width)),
			top: 0
		},
		scrollLink:{
			tops:  scrollLinkTops,
			lefts: scrollLinkLefts,
		}
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
	modalDims = this.modalDims();
//	console.log(modalDims);
	$(this.modal).css(modalDims);	
	if(args){$(this.modal).css(args);}	
	
	
	//----------------------------------
	//	CSS: SCROLL GALLERY
	//----------------------------------
	this.scrollGallery.updateCSS(modalDims.scrollGallery);



 
 	//----------------------------------
	//	CSS: SCAN VIEWERS
	//----------------------------------		
	for (var i=0;i<this.scanViewers.length;i++){	 	 
		this.scanViewers[i].updateCSS({
			height: modalDims.scanViewer.height,// - this.args.marginTop*2,
			width: modalDims.scanViewer.width,
			left: modalDims.scanViewer.lefts[i],
			top: modalDims.scanViewer.tops[i],
		});
	}   
    
	
		
	//----------------------------------
	//	CSS: CLOSE BUTTON
	//----------------------------------
	__setCSS__(this.closeButton, modalDims.closeButton);		

	
	
	
	//----------------------------------
	//	CSS: HORIZONTAL EXPAND BUTTON
	//----------------------------------
	if (this.horizontalExpandButton){
		$(this.horizontalExpandButton).css({
			left:  modalDims["width"] - Globals.expandButtonWidth,
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
	
	
	
	//----------------------------------
	//	CSS: SCROLL LINKS
	//----------------------------------
	for (var i=0;i<this.scrollLinks.length;i++){
		__setCSS__(this.scrollLinks[i], {
			left: modalDims.scrollLink.lefts[i],
			top: modalDims.scrollLink.tops[i],
		})	
	}
	
	
}
