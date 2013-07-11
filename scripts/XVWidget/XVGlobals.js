
goog.provide('XVGlobals');

/**
 * @constructor
 */
XVGlobals = function (){}
goog.exportSymbol('XVGlobals', XVGlobals);
XVGlobals = new XVGlobals();

/**
 * @const
 * @type {string}
 */
XVGlobals.ModalId = "XNATModal";
/**
 * @const
 * @type {string}
 */
XVGlobals.ViewerPreId = "Viewer";



//---------------------------
//  FONTS AND COLORS
//---------------------------
/**
 * @const
 * @type {string}
 */
XVGlobals.inactiveFontColor = "rgba(55,55,55,1)";
/**
 * @const
 * @type {string}
 */
XVGlobals.inactiveLineColor = "rgba(55,55,55,1)"; 	
/**
 * @const
 * @type {string}
 */
XVGlobals.activeFontColor = "rgba(255,255,255,1)"; 
/**
 * @const
 * @type {string}
 */
XVGlobals.activeLineColor = "rgba(205,205,205,1)"; 		
/**
 * @const
 * @type {string}
 */
XVGlobals.semiactiveFontColor = "rgba(85,85,85,1)"; 
/**
 * @const
 * @type {string}
 */
XVGlobals.semiactiveLineColor = "rgba(85,85,85,1)"; 	
/**
 * @const
 * @type {string}
 */
XVGlobals.fontSizeSmall = 10;
/**
 * @const
 * @type {string}
 */
XVGlobals.fontSizeMed = 12;
/**
 * @const
 * @type {string}
 */
XVGlobals.fontSizeLarge = 14;
/**
 * @const
 * @type {string}
 */
XVGlobals.fontFamily = 'Helvetica, Helvetica neue, Arial, sans-serif';




//---------------------------
//  ANIMATION LENGTHS
//---------------------------
/**
 * @const
 * @type {number}
 */
XVGlobals.animVeryFast = 100;
/**
 * @const
 * @type {number}
 */
XVGlobals.animFast = 200;
/**
 * @const
 * @type {number}
 */
XVGlobals.animMed = 500;
/**
 * @const
 * @type {number}
 */
XVGlobals.animSlow = 1000;





//---------------------------
//  FRAME VIEWER
//---------------------------
/**
 * @const
 * @type {number}
 */
XVGlobals.minFrameHolderHeight = 200;
/**
 * @const
 * @type {number}
 */
XVGlobals.minFrameHolderWidth = 150;




//---------------------------
//  SCAN VIEWER
//---------------------------
/**
 * @const
 * @type {number}
 */
XVGlobals.ViewerDimRatio = .85
/**
 * @const
 * @type {number}
 */
XVGlobals.minViewerHeight = 320;
/**
 * @const
 * @type {number}
 */
XVGlobals.minViewerWidth = XVGlobals.minViewerHeight * XVGlobals.ViewerDimRatio;
/**
 * @const
 * @type {number}
 */
XVGlobals.ViewerVerticalMargin = 20;
/**
 * @const
 * @type {number}
 */
XVGlobals.ViewerHorizontalMargin = 20;




//---------------------------
//  THUMBNAILS
//---------------------------
/**
 * @const
 * @type {number}
 */
XVGlobals.ThumbnailImageHeight = 72;
/**
 * @const
 * @type {number}
 */
XVGlobals.ThumbnailImageWidth = 72;
/**
 * @const
 * @type {number}
 */
XVGlobals.ThumbnailImageMarginX = 8;
/**
 * @const
 * @type {number}
 */
XVGlobals.ThumbnailImageMarginY = 8;

/**
 * @const
 * @type {number}
 */
 XVGlobals.ThumbnailWidgetHeight = XVGlobals.ThumbnailImageHeight + XVGlobals.ThumbnailImageMarginX*2;
/**
 * @const
 * @type {number}
 */
XVGlobals.ThumbnailWidgetWidth = 200;




//---------------------------
//  EXPAND BUTTON
//---------------------------
/**
 * @const
 * @type {number}
 */
XVGlobals.expandButtonWidth = 30;





//---------------------------
//  SCROLL GALLERY
//---------------------------
/**
 * @const
 * @type {number}
 */
XVGlobals.ScrollGalleryWidth = 180;






//---------------------------
//  SCAN TABS
//---------------------------
/**
 * @const
 * @type {number}
 */
XVGlobals.scanTabLabelHeight = 15;
/**
 * @const
 * @type {number}
 */
XVGlobals.scanTabLabelWidth = 50;
/**
 * @const
 * @type {number}
 */
XVGlobals.minScanTabHeight = XVGlobals.scanTabLabelHeight;
/**
 * @const
 * @type {number}
 */
XVGlobals.defaultScanTabHeight = XVGlobals.minScanTabHeight;	
/**
 * @const
 * @type {number}
 */
XVGlobals.maxModalWidthPct = .90;
/**
 * @const
 * @type {number}
 */
XVGlobals.maxModalHeightPct = .95;
/**
 * @const
 * @type {number}
 */
XVGlobals.tabClickHeight = 300;
/**
 * @const
 * @type {number}
 */ 	
XVGlobals.minScanTabHeightBeforeActive = 80;




//---------------------------
//  SCROLL LINK GROUPS
//---------------------------
/**
 * @const
 * @type {number}
 */
XVGlobals.MAX_SCROLL_LINK_GROUPS = 10;






//---------------------------
//  CONTENT DIVIDER HEIGHT
//---------------------------
/**
 * @const
 * @type {number}
 */
XVGlobals.ContentDividerHeight = 4;
/**
 * @param {number}
 * @return {number}
 */
XVGlobals.minContentDividerTop = function (widgetHeight) {
	return widgetHeight - XVGlobals.ContentDividerHeight - XVGlobals.minScanTabHeight;
} 
/**
 * @const
 * @type {string}
 */
XVGlobals.ContentDividerColor = 'rgb(35,35,35)';




//---------------------------
//  DRAG AND DROP IMAGE
//---------------------------
/**
 * @const
 * @type {Image}
 */
XVGlobals.dragAndDropImage = new Image();
XVGlobals.dragAndDropImage.src = "./icons/DragAndDrop-3pt.png";




/**
 * @const
 * @struct
 */	
XVGlobals.classNames = {
	
	XVWidget: 'XVWidget',
	
	Modal: 'Modal',
	
	ContentDivider: 'ContentDivider',
	
	Thumbnail : 'Thumbnail',
	ScanThumbnail : 'ScanThumbnail',
	SlicerThumbnail : 'SlicerThumbnail',		
	
	Viewer : 'Viewer',
	ScanViewer : 'ScanViewer',
	SlicerViewer : 'SlicerViewer',		
	
	FrameHolder: 'FrameHolder',
	FrameHolderCanvas: 'FrameHolderCanvas',
		
	ScrollGallery: 'XVWidget_ScrollGallery',


	ThumbnailCanvas: 'ThumbnailCanvas',		
	FrameSlider: 'FrameSlider',	
		
	ScrollGalleryZippyHeader: 'ZippyHeader',		
	
	ViewerTabs: 'ViewerTabs',
	ScanTabs: 'ScanTabs',	
	
	ViewerDivider: 'ViewerDivider',
	
	
	//
	// UI
	//
	ThumbnailDragDropTarget : 'ThumbnailDragDropTarget',	
	ViewerDragDropTarget : 'ViewerDragDropTarget'
}


