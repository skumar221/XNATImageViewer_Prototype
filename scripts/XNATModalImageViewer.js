defaultArgs_XNATModalImageViewer = {
	id: "XNATModalImageViewer",
	layout: "all_columns",
	numViewers: 1,
	parent: document.body,
	minLeft: 50,
	minTop: 20,
	compressWidth: .33,
	expandWidth: .9,
	expanded: false,
	gutter: 10,
	marginWidth: 50,
	marginTop: 10,
	marginLeft: 10,
	expandButtonWidth: 30,
	galleryWidth: 100,
	MINIMUMHEIGHT: 400,
	heightPct: .90,
	CSS: {
		position: "fixed",
		height: "100%",
		width: "100%",
		backgroundColor: "rgba(0,0,0,.95)",
		"overflow-x": "hidden",
		"overflow-y": "hidden",
		"display": "inline-block",
		"font-family": 'Helvetica,"Helvetica neue", Arial, sans-serif',
	},
	_modalcss: {
		position: "absolute",
		backgroundColor: "rgba(0,0,0,1)",
		border: "solid rgba(95, 95, 95, 1) 1px",
		"border-radius": "0px"	
		// for height mins and maxes, see below
	}
}



//******************************************************
//  Calculations, if necessary, for the modal's dimensions
//
//******************************************************
var getModalWidth = function(){
	
	var minPx = 440;
	/*
	var pctCompressed = .48;
	var currPx = (pctCompressed * window.innerWidth);
	var retVal =  (currPx < minPx) ?  ((minPx/window.innerWidth)) : (pctCompressed);
	*/
	return minPx;
}



//******************************************************
//  Calculations, if necessary, for the modal's dimensions
//
//******************************************************
var getModalHeight = function(that){
	
	var minPx = 520;
	var pctCompressed = that.args.heightPct;
	var currPx = (pctCompressed * window.innerHeight);
	
	var retVal =  (currPx < minPx) ?  ((minPx/window.innerHeight)) : (pctCompressed);
	//console.log("retVal_H: " + retVal)
	return retVal;
}




//******************************************************
//  Init
//
//******************************************************
var XNATModalImageViewer = function(args){
	var that = this;
	
	__Init__(this, defaultArgs_XNATModalImageViewer, args, function(){});
	
	
	
	//----------------------------------
	//	WIDGET
	//----------------------------------			
	this.widget.onclick = function(){ 
		that.destroy();
	}	
	
	
	
	
	//----------------------------------
	//	MODAL
	//----------------------------------
	this.modal = __MakeElement__("div", this.widget, this.args.id + "_modal", this.args._modalcss);	
	$(this.modal).css({
		"overflow-x": "hidden",
		"overflow-y": "hidden"
	})
	
	// Don't destroy when clicking on window (i.e. don't propagate)				
	this.modal.onclick = function(event, element) {
		  if (event.stopPropagation) {
		      event.stopPropagation();   // W3C model
		  } else {
		      event.cancelBubble = true; // IE model
		  }
	}

	
	
	
	//----------------------------------
	//	CLOSE BUTTON
	//----------------------------------
	this.closeButton = __MakeElement__("img", this.widget, this.args.id + "_closeIcon", {
		position: "absolute", 
		cursor: "pointer",
		width: 20,
		height: 20,
		zIndex: 103
	});	
	this.closeButton.src = "./icons/closeButton.png";
	
	
	
	//----------------------------------
	//	COMPARE BUTTON
	//----------------------------------	
	this.createExpandButton();
	
	
	
	//----------------------------------
	//	SCROLL GALLERY
	//----------------------------------
	this.scrollGallery = new scrollGallery({
		parent: this.modal,
		orientation: "vertical",
		CSS: {
			left: this.args.gutter,
			top: this.args.marginTop,
			height: 700,
		}
	});	
	// set the contents
	this.scrollGallery.setContents(function(){
		that.scrollGallery.thumbs = [];
		var thumbSpacing = that.scrollGallery.args.scrollMarginY;
		var totalHeight = 0;
		  	  
		for (var i=0; i<20; i++){
		 var h = i*(100) + thumbSpacing*i + that.scrollGallery.args.scrollMarginY;  	
		 var a = new scanThumbnail({
			  	id: "scrollContent_" + i.toString(),
			  	parent: that.scrollGallery.scrollContent,
			  	CSS: {
			  		top: h, 
			  		left: that.scrollGallery.args.scrollMarginX,
			  	}
			  });
		   that.scrollGallery.thumbs.push(a)
		}
		  
		  that.scrollGallery.scrollContent.style.height = __toPx__(h + that.scrollGallery.args.scrollMarginY*1 + 100);
		  that.scrollGallery.scrollContent.style.borderColor= "rgba(10, 200, 2, 1)";  
	})
	
	
	
	//----------------------------------
	//	SCAN VIEWERS
	//----------------------------------	
	this.scanViewers = [];	
	this.addScanViewer(this.args.numScanViewers);	
	
	
		
	//----------------------------------
	//	LINK SLIDER CHAINS
	//----------------------------------
	this.scrollLinks = [];
		
	
	this.updateCSS();
}

XNATModalImageViewer.prototype.setDropZones = function(dz){
	
	//----------------------------------
	//	SET DROPZONES
	//----------------------------------			
	for (var i=0; i < this.scrollGallery.thumbs.length; i++){
		this.scrollGallery.thumbs[i].addDropZone(dz);	
	}
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
		
	var _w = getModalWidth();
	var _h = getModalHeight(this);
	

	var _l = (window.innerWidth * (1-_w))/2;	
	_l = (_l > this.args.minLeft) ? _l : this.args.minLeft;	
	_l = _l/window.innerWidth;

	
	var _t = (1-this.args.heightPct)/2;
	
	var pctObj =  {
		width: _w,
		left: _l,
		height: _h,
		top: _t
	}
	
	var pxObj =  {
		width: Math.round(_w * window.innerWidth),
		left: Math.round(_l * window.innerWidth),
		height: Math.round(_h * window.innerHeight),
		top: Math.round(_t * window.innerHeight),
	}
	
	
	var pctStrObj = {};
	for (key in pctObj){
		pctStrObj[key] = _pct(pctObj[key]);
	}
	
	var pxStrObj = {};
	for (key in pxObj){
		pxStrObj[key] = __toPx__(pxObj[key]);
	}

	return{
		original: pctObj,
		pctStr: pctStrObj,
		pxStr: pxStrObj,
		px: pxObj
	}
}




//******************************************************
//  Update CSS.
//
//******************************************************
XNATModalImageViewer.prototype.updateCSS = function(args){



	//----------------------------------
	//	CSS: MODAL - PASS 1
	//----------------------------------

	this.modalDimensions = this.modalDims();
	$(this.modal).css(this.modalDimensions["px"]);	
	if(args){
		$(this.modal).css(args);
	}	

	
	//----------------------------------
	//	CSS: SCROLL GALLERY
	//----------------------------------
	$(this.scrollGallery.widget).css({
		left: this.args.marginLeft,
		top: this.args.marginTop,
		height: $(this.modal).height() - this.args.marginTop*2,	
	})
	this.scrollGallery.updateCSS();




	//----------------------------------
	//	CSS: SCAN VIEWERS
	//----------------------------------		
	for (var i=0;i<this.scanViewers.length;i++){
		var l = (i==0) ? $(this.scrollGallery.widget).position().left + $(this.scrollGallery.widget).width() + this.args.marginLeft*2 : 
						 $(this.scanViewers[i-1].widget).position().left + $(this.scanViewers[i-1].widget).width() + this.args.marginLeft*2;
		$(this.scanViewers[i].widget).css({
			height: $(this.modal).height() - this.args.marginTop*2,
			left: l,
			top: this.args.marginTop,
		})
		this.scanViewers[i].updateCSS();
	}
	
	
	
	//----------------------------------
	//	CSS: MODAL - PASS 2
	//----------------------------------	
	var modalWidth = $(this.scanViewers[this.scanViewers.length-1].widget).position().left + 
					 $(this.scanViewers[this.scanViewers.length-1].widget).width() + 
					 this.args.marginLeft*2 + __toInt__(this.expandButton.style.width);		
	$(this.modal).css({
		width: modalWidth,
		left: window.innerWidth/2 - modalWidth/2
	});

	
		
	//----------------------------------
	//	CSS: CLOSE BUTTON
	//----------------------------------
	$(this.closeButton).css({
		left: $(this.modal).position().left + modalWidth - $(this.closeButton).width()/2,
		top: this.modalDimensions["px"]["top"]- $(this.closeButton).height()/2,
		opacity: .9
	})		

	
	
	
	//----------------------------------
	//	CSS: EXPAND BUTTON
	//----------------------------------
	if (this.expandButton){
		$(this.expandButton).css({
			left:  (modalWidth - __toInt__(this.expandButton.style.width)),
			height: "100%",
			top: 0,
		})			
	}	
	
	
	//----------------------------------
	//	CSS: SCROLL LINKS
	//----------------------------------
	for (var i=0;i<this.scrollLinks.length;i++){
		$(this.scrollLinks[i]).css({
			left: $(this.scanViewers[i].widget).position().left + $(this.scanViewers[i].widget).width() - 2,
			top: $(this.scanViewers[i].widget).position().top + $(this.scanViewers[i].widget).height()*.3 - 2
		})	
	}
}




//******************************************************
//  Clears the modal out of the DOM.
//
//******************************************************
XNATModalImageViewer.prototype.destroy = function(fadeOut){
	var fadeOut = (fadeOut) ? fadeOut: 200;	
	//console.log("Destroying! " + this.args.id);
	var that = this;
	$(this.widget).fadeOut(fadeOut, function(){
		try{
			that.args.parent.removeChild(that.widget);			
		}
		catch(e){//do nothing
			}
	});
}




//******************************************************
//  Adds a scanViewer based on the arguments.
//  If no arguments, defaulted to 1
//
//******************************************************
XNATModalImageViewer.prototype.addScanViewer = function(numViewers){
	if(!numViewers) numViewers = 1;
	
	for (var i=0;i<numViewers;i++){
		var v = new scanViewer({
			parent: this.modal,
			id: this.args.id + "_scanViewer_" + (this.scanViewers.length + i).toString(),
		});			
		this.scanViewers.push(v);	
		this.setDropZones(v.frameViewer);	
	}
}




//******************************************************
//  The general idea of viewer/slider linking is this:
//  
//  when a mouse is hovering over a given viewer, we tell
//  the other viewers to "subordinate" themselves to the slider
//  of the viewer being hovered on.  We propagate the slide 
//  signal both to the left and right of the hovered viewer,
//  making sure to stop when a chain link is "broken".
//
//  Once we stop hovering over a given viewer, its propagation
//  commands are cleared.
//
//******************************************************
XNATModalImageViewer.prototype.linkViewers = function(leftInd, rightInd){
	
	
	var that = this;
	
	
	//-----------------------------------------
	//  VERIFY ARGUMENTS
	//-----------------------------------------
	if ((leftInd >= rightInd) || (leftInd != (rightInd -1))){
		throw "Link Viewers: Unacceptable Link Indices.  They have to be one apart, unequal, and left less than right."
	}
	
	
	
	//-----------------------------------------
	//  SET THE MOUSEOVER via JQUERY
	//-----------------------------------------
	var defineMouseover = function(that, indA){

		$(that.scanViewers[indA].widget).mouseover(function(){
			
			
			
			//-----------------------------------------
			//  PROPAGATE RIGHT
			//-----------------------------------------
			var rInd = indA;						
			if (that.scanViewers[rInd+1]){
				while(that.scrollLinks[rInd]){
					
					if ($(that.scrollLinks[rInd]).data('activated')){
						//console.log("Prop Right " + indA + " with " + (rInd + 1));
						that.scanViewers[indA].frameSlider.linkSlider(that.scanViewers[rInd + 1].frameSlider);		
					}
					else{
						//console.log("!Prop Right " + indA + " with " + (rInd + 1) + " -- BREAK");
						break;
					}				
					rInd++;					
				}	
			}
			
			
			
			//-----------------------------------------
			//  PROPAGATE LEFT
			//-----------------------------------------
			var rInd = indA;
			if (that.scanViewers[rInd-1]){
				while(that.scrollLinks[rInd-1]){
					
					if ($(that.scrollLinks[rInd-1]).data('activated')){
						//console.log("Prop Left  " + indA + " with " + (rInd - 1));
						that.scanViewers[indA].frameSlider.linkSlider(that.scanViewers[rInd - 1].frameSlider);		
					}
					else{
						//console.log("!Prop Left  " + indA + " with " + (rInd - 1) + " -- BREAK");
						break;
					}				
					rInd--;					
				}	
			}			
		    //console.log("**********************")		
			
			
			
			
		//-----------------------------------------
		//  SET THE MOUSEOUT via JQUERY
		//-----------------------------------------
		}).mouseout(function(){		
			that.scanViewers[indA].frameSlider.clearLinked();			
		});			
	}
	
	defineMouseover(that, leftInd);
	defineMouseover(that, rightInd);
}




//******************************************************
//  ADD SCROLL LINK ICON
//
//******************************************************
XNATModalImageViewer.prototype.addScrollLinkIcon = function(){
	
	var that = this;

	
	
	//-----------------------------------------
	//  MAKE ICON
	//-----------------------------------------
	var c = __MakeElement__("img", this.modal, this.args.id + "_scrollLink", {
		position: "absolute",
		width: 30,
		height: 15,
		cursor: "pointer"
	});
	c.src = "./icons/Chain1-Broken.png";
	
	

	
	//-----------------------------------------
	//  STORE ICON IN ARRAY
	//-----------------------------------------	
	this.scrollLinks.push(c);
	
	
	
	
	//-----------------------------------------
	//  CUSTOM ELEMENT DATA
	//-----------------------------------------	
	$(c).data('number', this.scrollLinks.length - 1);
	$(c).data('activated', false);
	
	
	
	
	//------------------------------------------
	// CHAIN ONCLICK
	//------------------------------------------
	that.widgetOver = -1;
	var c = this.scrollLinks[this.scrollLinks.length -1];
	c.onclick = function(){
		// Set it to the opposite
		$(c).data('activated', !$(c).data('activated'));
		
		if ($(c).data('activated')){
			// Change the icon's image
			c.src = "./icons/Chain1-Closed.png";
			// Link viewers
			that.linkViewers($(c).data('number'), $(c).data('number') + 1);
		}
		else{
			c.src = "./icons/Chain1-Broken.png";				
		}
	}
	

}




//******************************************************
//  Expand button
//
//******************************************************
XNATModalImageViewer.prototype.createExpandButton = function(){
	
	
	var that = this;
	
		
	//-------------------------
	// The button CSS
	//-------------------------
	this.expandButton = __MakeElement__("button", this.modal, this.args.id + "_expandButton", {
		position: "absolute",
		"color": "rgba(255,255,255,1)",
		"font-size": 18,
		"font-weight": "bold",
		"cursor": "pointer",
		"border": "solid rgba(255, 255, 255, 0) 0px",
		"border-radius": 0,
		backgroundColor: "rgba(70, 70, 70, 1)",
		width: this.args.expandButtonWidth,
		zIndex: 100
	});
	
	
	
	//-------------------------
	// Its natural state -- slightly faded
	//-------------------------
	$(this.expandButton).fadeTo(0, .7);
	
	
	//-------------------------
	// What do do when the mouse leaves
	//-------------------------		
	$(this.expandButton).mouseover(function(){
	  $(this.expandButton).stop().fadeTo(200, 1);
	}).mouseleave(
		function(){ 
			if (this.changeState != "expanding"){
				$(this.expandButton).stop().fadeTo(200, .7);
			}			
    });

	
	
	//-------------------------
	// Its inner text
	//-------------------------			
	this.expandButton.innerHTML = "+";



	//-------------------------
	// Button onlclick
	//-------------------------		
	this.expandButton.onclick = function(){
		 
		 
		 // clear any Jquery actions happening on other
		 // parts of the modal.
		 $(that.modal).stop();
		 $(that.closeButton).stop();
		 $(that.expandButton).stop().unbind('mouseleave');
		 $(that.expandButton).stop().unbind('mouseover');

		  //that.addScanViewer();
		  //that.updateCSS();
		 
		 
		 
		//-------------------------
		// Define animation parameters
		//-------------------------	
		 var animLen = 500;
		 var scanViewerWidth = $(that.scanViewers[that.scanViewers.length-1].widget).width();	
		 var newWidth = $(that.modal).width() + scanViewerWidth + __toInt__(that.closeButton.style.width);



		//-------------------------
		// Animate the window
		//-------------------------	
		 $(that.modal).stop().animate({
		    width: newWidth,
		    left: window.innerWidth/2 - newWidth/2,
		  }, animLen, function() {
		    that.addScanViewer();
		    that.addScrollLinkIcon();
		    that.updateCSS({width: newWidth});
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
		 $(that.expandButton).stop().animate({
		 	opacity: .5,
		    left: (newWidth - __toInt__(that.expandButton.style.width)),
		  }, animLen, function() {
		    // Animation complete.
		 });
		 

 	}
}



