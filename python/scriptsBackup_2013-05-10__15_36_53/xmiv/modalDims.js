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
xmiv.prototype.modalDims = function(conversion){
		
	var that = this;
	
	var scrollGalleryLeft = 0;
	var maxModalWidth = Math.round(window.innerWidth * Globals.maxModalHeightPct);
	
	
	
	//-------------------------
	// 1. Generate a prelimiary width
	//-------------------------	
	
	
	
	//	Get the prescribed height of the modal		
	var modalHeight = Globals.maxModalHeightPct * window.innerHeight;
	
	
	//	Get the number of scan viewers
	var scanViewerColumns = __numColumns__(that.scanViewers);
	var scanViewerRows = __numRows__(that.scanViewers);
	
	
	// determine the minimum modal width
	var minModalWidth = Globals.scrollGalleryWidth + 
						Globals.minScanViewerWidth * scanViewerColumns + 
						Globals.scanViewerVerticalMargin * scanViewerColumns + 
						Globals.expandButtonWidth;
	
	// determine the the modal width based on prescribed proportions
	var scanViewerHeight = ( modalHeight - (scanViewerRows * Globals.expandButtonWidth)) / scanViewerRows;
	var scanViewerWidth = Globals.scanViewerDimRatio * scanViewerHeight;
	
	// determine the minimum modal width
	var modalWidth = Globals.scrollGalleryWidth + 
					 scanViewerWidth  * scanViewerColumns + 
					 Globals.scanViewerVerticalMargin * scanViewerColumns + 
					 Globals.expandButtonWidth;



 
	//-------------------------
	// 2. If the modal is too wide, scale it down
	//-------------------------
	/*
	if (modalWidth > maxModalWidth){	
							 		
		scanViewerWidth = (maxModalWidth - (Globals.scrollGalleryWidth + Globals.scanViewerVerticalMargin * scanViewerColumns + Globals.expandButtonWidth))/scanViewerColumns;	
		scanViewerHeight = scanViewerWidth / Globals.scanViewerDimRatio;
		modalWidth= maxModalWidth;
		modalHeight = scanViewerHeight + Globals.expandButtonWidth;
		
	}
	*/


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
	
	console.log("NumRows: ", __numRows__(this.scanViewers), "  NumCols: " , __numColumns__(this.scanViewers))
	//console.log(this.scanViewers)
	for (var i=0; i<this.scanViewers.length; i++){
		for (var j=0; j<this.scanViewers[i].length; j++){
			
			l = viewerStart + j * (scanViewerWidth + Globals.scanViewerVerticalMargin);
			
			if (j==0) scanViewerLefts.push([])
			scanViewerLefts[i].push(l);
			
			if (j==0) scanViewerTops.push([]);
			scanViewerTops[i].push(-1 + i * (scanViewerHeight + Globals.scanViewerHorizontalMargin));
		}
	} 
	
	
   
	//-------------------------
	// SCROLL LINK DIMS
	//-------------------------	
	var scrollLinkLefts = [];
	var scrollLinkTops = [];	
	/*
	for (var i=0;i<that.scrollLinks.length;i++){
		scrollLinkLefts.push(scanViewerLefts[i] + scanViewerWidth - 
							 $(that.scrollLinks[i]).width()/2 + 
							 Globals.scanViewerVerticalMargin/2);
		scrollLinkTops.push(scanViewerTops[i] + scanViewerHeight/2 - 2);
	}
	*/
				
				
				
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
