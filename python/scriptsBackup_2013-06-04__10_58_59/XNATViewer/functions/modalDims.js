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
XNATViewer.prototype.modalDims = function (conversion) {
		
	var that = this;
	
	var ScrollGalleryLeft = 0;
	var maxModalWidth = Math.round(window.innerWidth * GLOBALS.maxModalHeightPct);
	
	
	
	//-------------------------
	// 1. Generate a prelimiary width
	//-------------------------	
	
	
	
	//	Get the prescribed height of the modal		
	var modalHeight = GLOBALS.maxModalHeightPct * window.innerHeight;
	
	
	//	Get the number of scan viewers
	var viewers = XV.ScanViewers();
	var ScanViewerColumns = viewers[0].length;
	var ScanViewerRows = viewers.length;
	
	
	// determine the minimum modal width
	var minModalWidth = GLOBALS.ScrollGalleryWidth + 
						GLOBALS.minScanViewerWidth * ScanViewerColumns + 
						GLOBALS.ScanViewerVerticalMargin * ScanViewerColumns + 
						GLOBALS.expandButtonWidth;
	
	// determine the the modal width based on prescribed proportions
	var ScanViewerHeight = ( modalHeight - ((ScanViewerRows + 1) * GLOBALS.expandButtonWidth)) / ScanViewerRows;
	var ScanViewerWidth = GLOBALS.ScanViewerDimRatio * ScanViewerHeight;
	
	// determine the minimum modal width
	var modalWidth = GLOBALS.ScrollGalleryWidth + 
					 ScanViewerWidth  * ScanViewerColumns + 
					 GLOBALS.ScanViewerVerticalMargin * ScanViewerColumns + 
					 GLOBALS.expandButtonWidth;



 
	//-------------------------
	// 2. If the modal is too wide, scale it down
	//-------------------------
	
	if (modalWidth > maxModalWidth) {	

		ScanViewerWidth = (maxModalWidth - (GLOBALS.ScrollGalleryWidth + GLOBALS.ScanViewerVerticalMargin * ScanViewerColumns + GLOBALS.expandButtonWidth))/ScanViewerColumns;	
		ScanViewerHeight = ScanViewerWidth / GLOBALS.ScanViewerDimRatio;
		modalWidth= maxModalWidth;
		modalHeight = (ScanViewerHeight * ScanViewerRows) + (GLOBALS.ScanViewerVerticalMargin  * (ScanViewerRows  - 1)) + GLOBALS.expandButtonWidth*2;

	}
	


	var _l = (window.innerWidth - modalWidth) /2 ;
	var _t = (window.innerHeight - modalHeight)/2;
	
	
	

	//-------------------------
	// SCROLL GALLERY DIMS
	//-------------------------	
	var ScrollGalleryCSS = {
		height: Math.round(modalHeight) - GLOBALS.expandButtonWidth*2,
		top: GLOBALS.expandButtonWidth,
	}
		
		
		
		
	//-------------------------
	// SCAN VIEWER DIMS
	//-------------------------	
	var ScanViewerLefts = [];
	var ScanViewerTops = [];
	var viewerStart = $(this.ScrollGallery.widget).width() +  $(this.ScrollGallery.widget).position().left + GLOBALS.ScanViewerVerticalMargin;

	XV.ScanViewers( function(ScanViewer, i, j) { 
			
		l = viewerStart + j * (ScanViewerWidth + GLOBALS.ScanViewerVerticalMargin);
		

		if (j==0 || !ScanViewerLefts[i]) {
			ScanViewerLefts.push([])
		}
		
		ScanViewerLefts[i][j] = l;
		
		if (j==0 || !ScanViewerTops[i]) {
			ScanViewerTops.push([]);
		}
		
		ScanViewerTops[i][j] = (-1 + i * (ScanViewerHeight + GLOBALS.ScanViewerHorizontalMargin));
		
		//if (i==0)
		ScanViewerTops[i][j] +=  GLOBALS.expandButtonWidth;
		
	});
	
	
   
	//-------------------------
	// SCROLL LINK DIMS
	//-------------------------	
	var scrollLinkLefts = [];
	var scrollLinkTops = [];	
	/*
	for (var i=0;i<that.scrollLinks.length;i++) {
		scrollLinkLefts.push(ScanViewerLefts[i] + ScanViewerWidth - 
							 $(that.scrollLinks[i]).width()/2 + 
							 GLOBALS.ScanViewerVerticalMargin/2);
		scrollLinkTops.push(ScanViewerTops[i] + ScanViewerHeight/2 - 2);
	}
	*/
	
		
				
	//console.log(ScanViewerLefts[0])	
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
			
			left: Math.round(_l) + Math.round(modalWidth) - (utils.convert.int(that.closeButton.style.width)) - 13,
			top: Math.round(_t) + 10,// + $(this.closeButton).height()/3,// (utils.convert.int(that.closeButton.style.width)/2),
			
		},
		ColumnMenu: {
			
			left: Math.round(modalWidth) - GLOBALS.expandButtonWidth,
			top: ScanViewerTops[0][0] + Math.round(modalHeight)/2 - GLOBALS.expandButtonWidth - 20,
			width: GLOBALS.expandButtonWidth - 1,
			height: 40
			
		},
		RowMenu:{
			
			left: ScanViewerLefts[0][0] + (Math.round(modalWidth) - ScanViewerLefts[0][0] - GLOBALS.expandButtonWidth)/2 - 17,
			top: Math.round(modalHeight) - GLOBALS.expandButtonWidth,
			width: 40,
			height: GLOBALS.expandButtonWidth - 1,
			
		},

	}

}