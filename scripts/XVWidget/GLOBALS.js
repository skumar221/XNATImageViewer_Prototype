var XV;


/*
	 * @const
	 * @type {string}
	 */

goog.provide('GLOBALS');

/**
 * @constructor
 */
GLOBALS = function (){


	/**
	 * @const
	 * @type {string}
	 */
 	this.ModalId = "XNATModal";
	/**
	 * @const
	 * @type {string}
	 */
 	this.ViewerBoxPreId = "ViewerBox";
	
	
	
	//---------------------------
	//  FONTS AND COLORS
	//---------------------------
	/**
	 * @const
	 * @type {string}
	 */
	this.inactiveFontColor = "rgba(55,55,55,1)";
	/**
	 * @const
	 * @type {string}
	 */
	this.inactiveLineColor = "rgba(55,55,55,1)"; 	
	/**
	 * @const
	 * @type {string}
	 */
	this.activeFontColor = "rgba(255,255,255,1)"; 
	/**
	 * @const
	 * @type {string}
	 */
	this.activeLineColor = "rgba(205,205,205,1)"; 		
	/**
	 * @const
	 * @type {string}
	 */
	this.semiactiveFontColor = "rgba(85,85,85,1)"; 
	/**
	 * @const
	 * @type {string}
	 */
	this.semiactiveLineColor = "rgba(85,85,85,1)"; 	
	/**
	 * @const
	 * @type {string}
	 */
	this.fontSizeSmall = 10;
	/**
	 * @const
	 * @type {string}
	 */
	this.fontSizeMed = 12;
	/**
	 * @const
	 * @type {string}
	 */
	this.fontSizeLarge = 14;
	/**
	 * @const
	 * @type {string}
	 */
	this.fontFamily = 'Helvetica, Helvetica neue, Arial, sans-serif';
	
	
	
	
	//---------------------------
	//  ANIMATION LENGTHS
	//---------------------------
	/**
	 * @const
	 * @type {number}
	 */
	this.animVeryFast = 100;
	/**
	 * @const
	 * @type {number}
	 */
	this.animFast = 200;
	/**
	 * @const
	 * @type {number}
	 */
	this.animMed = 500;
	/**
	 * @const
	 * @type {number}
	 */
	this.animSlow = 1000;
	
	
	
	
	
	//---------------------------
	//  FRAME VIEWER
	//---------------------------
	/**
	 * @const
	 * @type {number}
	 */
	this.minFrameViewerHeight = 150;
	/**
	 * @const
	 * @type {number}
	 */
	this.minFrameViewerWidth = 150;
	
	
	
	
	//---------------------------
	//  SCAN VIEWER
	//---------------------------
	/**
	 * @const
	 * @type {number}
	 */
	this.ViewerBoxDimRatio = .85
	/**
	 * @const
	 * @type {number}
	 */
	this.minViewerBoxHeight = 320;
	/**
	 * @const
	 * @type {number}
	 */
	this.minViewerBoxWidth = this.minViewerBoxHeight * this.ViewerBoxDimRatio;
	/**
	 * @const
	 * @type {number}
	 */
	this.ViewerBoxVerticalMargin = 20;
	/**
	 * @const
	 * @type {number}
	 */
	this.ViewerBoxHorizontalMargin = 20;
	
	
	
	
	//---------------------------
	//  THUMBNAILS
	//---------------------------
	/**
	 * @const
	 * @type {number}
	 */
	this.ThumbnailImageHeight = 72;
	/**
	 * @const
	 * @type {number}
	 */
	this.ThumbnailImageWidth = 72;
	/**
	 * @const
	 * @type {number}
	 */
	this.ThumbnailImageMarginX = 8;
	/**
	 * @const
	 * @type {number}
	 */
	this.ThumbnailImageMarginY = 8;
	
	/**
	 * @const
	 * @type {number}
	 */
	 this.ThumbnailWidgetHeight = this.ThumbnailImageHeight + this.ThumbnailImageMarginX*2;
	/**
	 * @const
	 * @type {number}
	 */
	this.ThumbnailWidgetWidth = 200;
	
	
	
	
	//---------------------------
	//  EXPAND BUTTON
	//---------------------------
	/**
	 * @const
	 * @type {number}
	 */
	this.expandButtonWidth = 30;
	
	
	
	
	
	//---------------------------
	//  SCROLL GALLERY
	//---------------------------
	/**
	 * @const
	 * @type {number}
	 */
	this.ScrollGalleryWidth = 180;
	
	
	
	
	
	
	//---------------------------
	//  SCAN TABS
	//---------------------------
	/**
	 * @const
	 * @type {number}
	 */
	this.scanTabLabelHeight = 20;
	/**
	 * @const
	 * @type {number}
	 */
	this.scanTabLabelWidth = 50;
	/**
	 * @const
	 * @type {number}
	 */
	this.minScanTabHeight = this.scanTabLabelHeight;
	/**
	 * @const
	 * @type {number}
	 */
	this.defaultScanTabHeight = this.minScanTabHeight;	
	/**
	 * @const
	 * @type {number}
	 */
	this.maxModalWidthPct = .90;
	/**
	 * @const
	 * @type {number}
	 */
	this.maxModalHeightPct = .95;
	/**
	 * @const
	 * @type {number}
	 */
 	this.tabClickHeight = 300;
	/**
	 * @const
	 * @type {number}
	 */ 	
	this.minScanTabHeightBeforeActive = 80;
	
	
	
	
	//---------------------------
	//  SCROLL LINK GROUPS
	//---------------------------
	/**
	 * @const
	 * @type {number}
	 */
 	this.maxScrollLinkGroups = 10;
 	
 	/**
 	 * @const
 	 * @type {SliderLinker}
 	 */
	this.SliderLinker = new SliderLinker();
	
	
	
	
	//---------------------------
	//  CONTENT DIVIDER HEIGHT
	//---------------------------
	/**
	 * @const
	 * @type {number}
	 */
 	this.ContentDividerHeight = 4;
	/**
	 * @param {number}
	 * @return {number}
	 */
	this.minContentDividerTop = function (widgetHeight) {
		return widgetHeight - this.ContentDividerHeight - this.minScanTabHeight;
	} 
	/**
	 * @const
	 * @type {string}
	 */
	this.ContentDividerColor = 'rgb(35,35,35)';
	
	
	
	
	//---------------------------
	//  DRAG AND DROP IMAGE
	//---------------------------
	/**
	 * @const
	 * @type {Image}
	 */
	this.dragAndDropImage = new Image();
	this.dragAndDropImage.src = "./icons/DragAndDrop-3pt.png";
	
	
	
	
	/**
	 * @const
	 * @struct
	 */	
	this.classNames = {
		
		XVWidget: 'XVWidget',
		
		Modal: 'Modal',
		
		ContentDivider: 'ContentDivider',
		
		Thumbnail : 'Thumbnail',
		ScanThumbnail : 'ScanThumbnail',
		SlicerThumbnail : 'SlicerThumbnail',		
		
		ViewerBox : 'ViewerBox',
		ScanViewerBox : 'ScanViewerBox',
		SlicerViewerBox : 'SlicerViewerBox',		
		
		FrameViewer: 'FrameViewer',
		FrameViewerCanvas: 'FrameViewerCanvas',
			
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

}

GLOBALS = new GLOBALS();





