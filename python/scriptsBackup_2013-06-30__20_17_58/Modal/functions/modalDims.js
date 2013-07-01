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
Modal.prototype.modalDims = function (conversion) {
		
	var that = this;
	
	var ScrollGalleryLeft = 0;
	var maxModalWidth = Math.round(window.innerWidth * GLOBALS.maxModalHeightPct);
	
	
	
	//-------------------------
	// 1. Generate a prelimiary width
	//-------------------------	
	
	
	
	//	Get the prescribed height of the modal		
	var modalHeight = GLOBALS.maxModalHeightPct * window.innerHeight;
	
	
	//	Get the number of scan viewers
	var viewers = XV.Viewers();
	var ViewerBoxColumns = viewers[0].length;
	var ViewerBoxRows = viewers.length;
	
	
	// determine the minimum modal width
	var minModalWidth = GLOBALS.ScrollGalleryWidth + 
						GLOBALS.minViewerBoxWidth * ViewerBoxColumns + 
						GLOBALS.ViewerBoxVerticalMargin * ViewerBoxColumns + 
						GLOBALS.expandButtonWidth;
	
	// determine the the modal width based on prescribed proportions
	var ViewerBoxHeight = ( modalHeight - ((ViewerBoxRows + 1) * GLOBALS.expandButtonWidth)) / ViewerBoxRows;
	var ViewerBoxWidth = GLOBALS.ViewerBoxDimRatio * ViewerBoxHeight;
	
	// determine the minimum modal width
	var modalWidth = GLOBALS.ScrollGalleryWidth + 
					 ViewerBoxWidth  * ViewerBoxColumns + 
					 GLOBALS.ViewerBoxVerticalMargin * ViewerBoxColumns + 
					 GLOBALS.expandButtonWidth;



 
	//-------------------------
	// 2. If the modal is too wide, scale it down
	//-------------------------
	
	if (modalWidth > maxModalWidth) {	

		ViewerBoxWidth = (maxModalWidth - (GLOBALS.ScrollGalleryWidth + GLOBALS.ViewerBoxVerticalMargin * ViewerBoxColumns + GLOBALS.expandButtonWidth))/ViewerBoxColumns;	
		ViewerBoxHeight = ViewerBoxWidth / GLOBALS.ViewerBoxDimRatio;
		modalWidth= maxModalWidth;
		modalHeight = (ViewerBoxHeight * ViewerBoxRows) + (GLOBALS.ViewerBoxVerticalMargin  * (ViewerBoxRows  - 1)) + GLOBALS.expandButtonWidth*2;

	}
	


	var _l = (window.innerWidth - modalWidth) /2 ;
	var _t = (window.innerHeight - modalHeight)/2;
	
	
	

	//-------------------------
	// SCROLL GALLERY DIMS
	//-------------------------	
	var ScrollGalleryCSS = {
		height: Math.round(modalHeight) - GLOBALS.expandButtonWidth*2,
		top: GLOBALS.expandButtonWidth
	}
		
		
		
		
	//-------------------------
	// SCAN VIEWER DIMS
	//-------------------------	
	var ViewerBoxLefts = [];
	var ViewerBoxTops = [];
	var ScrollGalleryDims = utils.css.dims(this.ScrollGallery.widget)
	var viewerStart = ScrollGalleryDims.width +  ScrollGalleryDims.left + GLOBALS.ViewerBoxVerticalMargin;

	XV.Viewers( function (ViewerBox, i, j) { 
			
		l = viewerStart + j * (ViewerBoxWidth + GLOBALS.ViewerBoxVerticalMargin);
		

		if (j==0 || !ViewerBoxLefts[i]) {
			ViewerBoxLefts.push([])
		}
		
		ViewerBoxLefts[i][j] = l;
		
		if (j==0 || !ViewerBoxTops[i]) {
			ViewerBoxTops.push([]);
		}
		
		ViewerBoxTops[i][j] = (-1 + i * (ViewerBoxHeight + GLOBALS.ViewerBoxHorizontalMargin));
		
		//if (i==0)
		ViewerBoxTops[i][j] +=  GLOBALS.expandButtonWidth;
		
	});

	return  {
		
		width: Math.round(modalWidth),
		left: Math.round(_l),
		height: Math.round(modalHeight),
		top: Math.round(_t),
		ViewerBox: {
			
			width: Math.round(ViewerBoxWidth),
			height: Math.round(ViewerBoxHeight),
			lefts: ViewerBoxLefts,
			tops: ViewerBoxTops	
			
		},
		ScrollGallery: {
			
			widgetCSS: ScrollGalleryCSS
		
		},
		closeButton: {
			
			left: Math.round(_l) + Math.round(modalWidth) - (utils.convert.toInt(that.closeButton.style.width)) - 13,
			top: Math.round(_t) + 10
			
		},
		ColumnMenu: {
			
			left: Math.round(modalWidth) - GLOBALS.expandButtonWidth,
			top: ViewerBoxTops[0][0] + Math.round(modalHeight)/2 - GLOBALS.expandButtonWidth - 20,
			width: GLOBALS.expandButtonWidth - 1,
			height: 40
			
		},
		RowMenu: {
			
			left: ViewerBoxLefts[0][0] + (Math.round(modalWidth) - ViewerBoxLefts[0][0] - GLOBALS.expandButtonWidth)/2 - 17,
			top: Math.round(modalHeight) - GLOBALS.expandButtonWidth,
			width: 40,
			height: GLOBALS.expandButtonWidth - 1
			
		}

	}

}
