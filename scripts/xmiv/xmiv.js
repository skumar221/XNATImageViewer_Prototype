defaultArgs_xmiv = {
	id: "xmiv",
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
//  Init
//
//******************************************************
var xmiv = function(args){

	var that = this;
	
	INIT(this, defaultArgs_xmiv, args, function(){});
	
	
	
	//----------------------------------
	//	WIDGET
	//----------------------------------			
	this.widget.onclick = function(){ 
		that.destroy();
	}	
	
	
	
	
	//----------------------------------
	//	MODAL
	//----------------------------------
	this.modal = __makeElement__("div", this.widget, this.args.id + "_modal", this.args._modalcss);	
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
	this.closeButton = __makeElement__("img", this.widget, this.args.id + "_closeIcon", {
		position: "absolute", 
		cursor: "pointer",
		width: 20,
		height: 20,
		zIndex: 103
	});	
	this.closeButton.src = "./icons/closeButton.png";


	
	//----------------------------------
	//SCAN DATA PATHS - AJAX QUERY HERE
	//
	// FOR PROTOTYPING PURPOSES
	//----------------------------------	
	this.scanDataPaths = TESTSCANDATA;

	
	
	//----------------------------------
	//	SCROLL GALLERY
	//----------------------------------
	this.scrollGallery = new scrollGallery({
		parent: this.modal,
		orientation: "vertical",
		widgetCSS: {
			left: this.args.gutter,
			top: this.args.marginTop,
			height: 700,
			border: "solid rgba(90,90,90,1) 0px"
		}
	});	
	// set the contents
	this.scrollGallery.setContents(function(){
		that.scrollGallery.thumbs = [];
		var thumbSpacing = that.scrollGallery.args.scrollMarginY;
		var totalHeight = 0;
		  	  
		for (var i=0; i<that.scanDataPaths.length; i++){
			var h = i*(100) + thumbSpacing*i + that.scrollGallery.args.scrollMarginY;  	
			var scanThumb = new scanThumbnail(that.scanDataPaths[i], {
				  	id: "scrollContent_" + i.toString(),
				  	parent: that.scrollGallery.scrollContent,
				  	CSS: {
				  		top: h, 
				  		left: that.scrollGallery.args.scrollMarginX,
				  	}
				  });
	
				
			// We want to manage the active thumbnails...
			// we need to "deactivate" them when another has replaced
			// their slot.  
			scanThumb.addActivatedCallback(function(thumb, args){
				that.manageActiveThumbs(thumb, args);
			})
			
			
			that.scrollGallery.thumbs.push(scanThumb);
		}
		  
		  that.scrollGallery.scrollContent.style.height = __toPx__(h + that.scrollGallery.args.scrollMarginY*1 + 100);
		  that.scrollGallery.scrollContent.style.borderColor= "rgba(10, 200, 2, 1)";  
	})
	
	
	
	//----------------------------------
	//	SCAN VIEWERS
	//----------------------------------	
	this.scanViewers = [[]];	
	this.addScanViewer(0, 0);	
	
	
		
	//----------------------------------
	//	LINK SLIDER CHAINS
	//----------------------------------
	this.scrollLinks = [];
		
	
	this.updateCSS();
}

xmiv.prototype.setDropZones = function(dz){
	
	//----------------------------------
	//	SET DROPZONES
	//----------------------------------			
	for (var i=0; i < this.scrollGallery.thumbs.length; i++){
		this.scrollGallery.thumbs[i].addDropZone(dz);	
	}
}












//*******************************a***********************
//  Clears the modal out of the DOM.
//
//******************************************************
xmiv.prototype.destroy = function(fadeOut){
	var fadeOut = (fadeOut) ? fadeOut: 500;	
	console.log("Destroying! " + this.args.id);
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
xmiv.prototype.linkViewers = function(leftInd, rightInd){
	
	
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
		
		if (! that.scanViewers[indA]){
			//console.log("ERROR: ", indA, that.scanViewers);
			return;
		}

		
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
		    	
			
			
			
			
		//-----------------------------------------
		//  SET THE MOUSEOUT via JQUERY
		//-----------------------------------------
		}).mouseout(function(){	
			if (that.scanViewers[indA]) { that.scanViewers[indA].frameSlider.clearLinked() };		
		});			
	}
	
	defineMouseover(that, leftInd);
	defineMouseover(that, rightInd);
}




//******************************************************
//  ADD SCROLL LINK ICON
//
//******************************************************
xmiv.prototype.addScrollLinkIcon = function(){
	
	var that = this;

	
	
	//-----------------------------------------
	//  MAKE ICON
	//-----------------------------------------
	var c = __makeElement__("div", this.modal, this.args.id + "_scrollLink", {
		position: "absolute",
		width: 40,
		height: 10,
		cursor: "pointer",
		overflow: "visible",
		//backgroundColor: "rgba(200, 200, 200, .5)"
	});

	
	var icon1 = __makeElement__("img", c, this.args.id + "_scrollLinkIcon1", {
		position: "absolute",
		width: 40,
		height: 10,
	});
	icon1.src = "./icons/LinkArrow-Broken.png";
	
	var icon2 = __makeElement__("img", c, this.args.id + "_scrollLinkIcon2", {
		position: "absolute",
		width: 40,
		height: 10,
	});
	icon2.src = "./icons/LinkArrow.png";
	
	
	var label = __makeElement__("div", c, this.args.id + "_scrollLink", {
		position: "absolute",
		top: 15,
		left: -10,
		width: 200,
		color: "rgba(255,255,255,1)",
		fontSize: Globals.fontSizeSmall
	});
	

	$(label).fadeTo(0,0);
	$(icon2).fadeTo(0,0);
	
	
	

	
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
	c.onclick = function(inputState, animTime){
		
		var animLen = (animTime || animTime === 0) ? animTime : 300;
		//console.log("ANUIMN: ", animLen, inputState, animTime);
		if (inputState && inputState == 'deactivate') { $(c).data('activated', true);}
		else if (inputState && inputState == 'activate') { $(c).data('activated', false);}
		// Set it to the opposite
		$(c).data('activated', !$(c).data('activated'));
		
		if ($(c).data('activated')){
			// Change the icon's image
			$(icon1).fadeTo(animLen,0);
			$(icon2).fadeTo(animLen,1);
			
			
			if (animLen != 0) {
				label.innerHTML = "Linking Scrollers";
				$(label).fadeTo(animLen,1).delay(1000).fadeTo(animLen,0);
			}
			else {
				$(label).fadeTo(animLen,0)
			}
			// Link viewers
			//console.log("linking: ", $(c).data('number'), "with ", $(c).data('number')+1);
			that.linkViewers($(c).data('number'), $(c).data('number') + 1);
		}
		else if (!$(c).data('activated')){
			$(icon1).fadeTo(animLen,1);
			$(icon2).fadeTo(animLen,0);		
			
			if (animLen != 0) {
				label.innerHTML = "Unlinking Scrollers";
				$(label).fadeTo(animLen,1).delay(1000).fadeTo(animLen,0);
			}
			else {
				$(label).fadeTo(animLen,0)
			}
		}
	}
	

}




//******************************************************
//  Expand button
//
//******************************************************
xmiv.prototype.addVerticalExpandButton = function(rowPos, colPos){
	var that = this;

//	console.log("*************************add Vertical!")
	if (!this.verticalExpandButtons) {this.verticalExpandButtons = []};
	
	//-------------------------
	// The button CSS
	//-------------------------
	var currButton = __makeElement__("button", this.modal, this.args.id + "_verticalExpandButton", {
		position: "absolute",
		"color": "rgba(255,255,255,1)",
		"font-size": 18,
		"font-weight": "bold",
		"cursor": "pointer",
		"border": "solid rgba(255, 255, 255, 0) 0px",
		"border-radius": 0,
		backgroundColor: "rgba(70, 70, 70, 1)",
		zIndex: 100
	})	

		
	this.verticalExpandButtons.push(currButton);

	
	//-------------------------
	// Its natural state -- slightly faded
	//-------------------------
	$(currButton).fadeTo(0, .5);
	//-------------------------
	// What do do when the mouse leaves
	//-------------------------		
	$(currButton).mouseover(function(){
	  $(currButton).stop().fadeTo(200, .8);
	}).mouseleave(
		function(){ 
			if (that.changeState != "expanding"){
				$(currButton).stop().fadeTo(200, .5);
			}			
    });

	
	
	//-------------------------
	// Its inner text
	//-------------------------			
	currButton.innerHTML = "+";



	//-------------------------
	// Button onlclick
	//-------------------------		
	currButton.onclick = function(){ 
		that.expandByRow(that.verticalExpandButtons.indexOf(this)); 
	}	
}


//******************************************************
//  Expand button
//
//******************************************************
xmiv.prototype.addHorizontalExpandButton = function(){
	
//	console.log("*************************HORIZONTAL ADD!")
	var that = this;
	
	if (!this.horizontalExpandButtons){ this.horizontalExpandButtons = []};
	
	//-------------------------
	// The button CSS
	//-------------------------
	var hB = __makeElement__("button", this.modal, this.args.id + "_expandButton", {
		position: "absolute",
		"color": "rgba(255,255,255,1)",
		"font-size": 18,
		"font-weight": "bold",
		"cursor": "pointer",
		"border": "solid rgba(255, 255, 255, 0) 0px",
		"border-radius": 0,
		backgroundColor: "rgba(70, 70, 70, 1)",
		width: this.args.expandButtonWidth,
		zIndex: 100,
		//"vertical-align": "middle",
		//align: "middle"
	});
	this.horizontalExpandButtons.push(hB);
	
	
	
	//-------------------------
	// Its natural state -- slightly faded
	//-------------------------
	$(hB).fadeTo(0, .5);
	//-------------------------
	// What do do when the mouse leaves
	//-------------------------		
	$(hB).mouseover(function(){
	  $(hB).stop().fadeTo(200, .8);
	}).mouseleave(
		function(){ 
			if (that.changeState != "expanding"){
				$(hB).stop().fadeTo(200, .5);
			}			
    });

	
	
	//-------------------------
	// Its inner text
	//-------------------------			
	hB.innerHTML = "+";


	//-------------------------
	// Button onlclick
	//-------------------------		

	hB.onclick = function(){
//		console.log("ONCLICK")
		that.expandByColumn(that.horizontalExpandButtons.indexOf(this));
	}; 
}



//******************************************************
//  Manage Active Thumbs
//******************************************************
xmiv.prototype.manageActiveThumbs = function(thumb, args){
	if (!this.activeThumbManager)
		this.activeThumbManager = {};
	

	// We basically want to cycle through the manager
	// so that any thumbnail associated with args.activeDropZoneID
	// is removed and replaced with thumb
	if (args.activeDropZoneID){
		for (var i=0;i<this.scanViewers.length;i++){
			for (var j=0;j<this.scanViewers[i].length;j++){
				if (arrayValueValid(this.scanViewers, i, j)){
					if (this.scanViewers[i][j].frameViewer.args.id == args.activeDropZoneID){
						if (this.activeThumbManager[args.activeDropZoneID]){
							//console.log("deactivating existing: " + this.activeThumbManager[args.activeDropZoneID].args.id + " in " + args.activeDropZoneID)
							this.activeThumbManager[args.activeDropZoneID].deactivate();
						}
		
						this.activeThumbManager[args.activeDropZoneID] = thumb;
						//console.log("inserting: " + thumb.args.id + " in " + args.activeDropZoneID);
						break;
					}	
				}
			}
		}
	}
	
}

