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
XMIV.prototype.modalDims = function (conversion) {
		
	var that = this;
	
	var ScrollGalleryLeft = 0;
	var maxModalWidth = Math.round(window.innerWidth * Globals.maxModalHeightPct);
	
	
	
	//-------------------------
	// 1. Generate a prelimiary width
	//-------------------------	
	
	
	
	//	Get the prescribed height of the modal		
	var modalHeight = Globals.maxModalHeightPct * window.innerHeight;
	
	
	//	Get the number of scan viewers
	var ScanViewerColumns = __numColumns__(that.ScanViewers);
	var ScanViewerRows = __numRows__(that.ScanViewers);
	
	
	// determine the minimum modal width
	var minModalWidth = Globals.ScrollGalleryWidth + 
						Globals.minScanViewerWidth * ScanViewerColumns + 
						Globals.ScanViewerVerticalMargin * ScanViewerColumns + 
						Globals.expandButtonWidth;
	
	// determine the the modal width based on prescribed proportions
	var ScanViewerHeight = ( modalHeight - (ScanViewerRows * Globals.expandButtonWidth)) / ScanViewerRows;
	var ScanViewerWidth = Globals.ScanViewerDimRatio * ScanViewerHeight;
	
	// determine the minimum modal width
	var modalWidth = Globals.ScrollGalleryWidth + 
					 ScanViewerWidth  * ScanViewerColumns + 
					 Globals.ScanViewerVerticalMargin * ScanViewerColumns + 
					 Globals.expandButtonWidth;



 
	//-------------------------
	// 2. If the modal is too wide, scale it down
	//-------------------------
	
	if (modalWidth > maxModalWidth) {	
							 		
		ScanViewerWidth = (maxModalWidth - (Globals.ScrollGalleryWidth + Globals.ScanViewerVerticalMargin * ScanViewerColumns + Globals.expandButtonWidth))/ScanViewerColumns;	
		ScanViewerHeight = ScanViewerWidth / Globals.ScanViewerDimRatio;
		modalWidth= maxModalWidth;
		modalHeight = (ScanViewerHeight * ScanViewerRows) + (Globals.ScanViewerVerticalMargin  * (ScanViewerRows  - 1)) + Globals.expandButtonWidth;

	}
	


	var _l = (window.innerWidth - modalWidth) /2 ;
	var _t = (window.innerHeight - modalHeight)/2;
	
	
	

	//-------------------------
	// SCROLL GALLERY DIMS
	//-------------------------	
	var ScrollGalleryCSS = {
		width: 110,
		height: Math.round(modalHeight),
		left: 0,
		top: 0,
	}
		
		
		
		
	//-------------------------
	// SCAN VIEWER DIMS
	//-------------------------	
	var ScanViewerLefts = [];
	var ScanViewerTops = [];
	var viewerStart = ScrollGalleryCSS.width + ScrollGalleryCSS.left + Globals.ScanViewerVerticalMargin;

	for (var i in this.ScanViewers) {
		for (var j in this.ScanViewers[i]) { 
			
			l = viewerStart + j * (ScanViewerWidth + Globals.ScanViewerVerticalMargin);
			

			if (j==0 || !ScanViewerLefts[i]) ScanViewerLefts.push([])
			ScanViewerLefts[i][j] = l;
			
			if (j==0 || !ScanViewerTops[i]) ScanViewerTops.push([]);
			ScanViewerTops[i][j] = (-1 + i * (ScanViewerHeight + Globals.ScanViewerHorizontalMargin));
		}
	} 
	
	
   
	//-------------------------
	// SCROLL LINK DIMS
	//-------------------------	
	var scrollLinkLefts = [];
	var scrollLinkTops = [];	
	/*
	for (var i=0;i<that.scrollLinks.length;i++) {
		scrollLinkLefts.push(ScanViewerLefts[i] + ScanViewerWidth - 
							 $(that.scrollLinks[i]).width()/2 + 
							 Globals.ScanViewerVerticalMargin/2);
		scrollLinkTops.push(ScanViewerTops[i] + ScanViewerHeight/2 - 2);
	}
	*/
	
		
				
				
	return  {
		
		width: Math.round(modalWidth),
		left: Math.round(_l),
		height: Math.round(modalHeight),
		top: Math.round(_t),
		ScanViewer: {
			
			width: Math.round(ScanViewerWidth),
			height: Math.round(ScanViewerHeight),
			lefts: ScanViewerLefts,
			tops: ScanViewerTops,	
			
		},
		ScrollGallery: {
			
			widgetCSS: ScrollGalleryCSS
		
		},
		closeButton: {
			
			left: Math.round(_l) + Math.round(modalWidth) - (__toInt__(that.closeButton.style.width)/2),
			top: Math.round(_t) - $(this.closeButton).height()/2,// (__toInt__(that.closeButton.style.width)/2),
			
		},
		horizontalExpandButtons: {
			
			left: Math.round(modalWidth) - Globals.expandButtonWidth,
			tops: ScanViewerTops,
			height: Math.round(ScanViewerHeight),
			width: Globals.expandButtonWidth
			
		},
		verticalExpandButtons:{
			
			lefts: ScanViewerLefts[0],
			top: Math.round(modalHeight) - Globals.expandButtonWidth,
			width: Math.round(ScanViewerWidth),
			height: Globals.expandButtonWidth,
			
		},
		scrollLink:{
			
			tops:  scrollLinkTops,
			lefts: scrollLinkLefts,
			
		}
	}

}