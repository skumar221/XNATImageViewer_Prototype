var GLOBALS = {
	
	setScanViewers: function (ScanViewers) {
		this.ScanViewers = [];
		for (var i=0; i<ScanViewers.length; i++) {
			for (var j=0; j<ScanViewers[i].length; j++) {
				this.ScanViewers.push(ScanViewers[i][j])
			}
		}

	},
	
	getScanViewers: function () { return this.ScanViewers},
}






//---------------------------
//  FONTS AND COLORS
//---------------------------
GLOBALS.inactiveFontColor = "rgba(55,55,55,1)";
GLOBALS.inactiveLineColor = "rgba(55,55,55,1)"; 

GLOBALS.activeFontColor = "rgba(255,255,255,1)"; 
GLOBALS.activeLineColor = "rgba(205,205,205,1)"; 

GLOBALS.semiactiveFontColor = "rgba(85,85,85,1)"; 
GLOBALS.semiactiveLineColor = "rgba(85,85,85,1)"; 

GLOBALS.fontSizeSmall = 10;
GLOBALS.fontSizeMed = 12;
GLOBALS.fontSizeLarge = 14;
GLOBALS.fontFamily = 'Helvetica, Helvetica neue, Arial, sans-serif';


//---------------------------
//  ANIMATION LENGTHS
//---------------------------

GLOBALS.animFast = 200;
GLOBALS.animMed = 500;
GLOBALS.animSlow = 100;



//---------------------------
//  FRAME VIEWER
//---------------------------
GLOBALS.minFrameViewerHeight = 150;
GLOBALS.minFrameViewerWidth = 150;

//---------------------------
//  SCAN VIEWER
//---------------------------
GLOBALS.ScanViewerDimRatio = .85
GLOBALS.minScanViewerHeight = 320;
GLOBALS.minScanViewerWidth = GLOBALS.minScanViewerHeight * GLOBALS.ScanViewerDimRatio;
GLOBALS.ScanViewerVerticalMargin = 20;
GLOBALS.ScanViewerHorizontalMargin = 20;

//---------------------------
//  THUMBNAILS
//---------------------------
GLOBALS.thumbnailHeight = 85;
GLOBALS.thumbnailWidth = 85;

//---------------------------
//  EXPAND BUTTON
//---------------------------
GLOBALS.expandButtonWidth = 30;

//---------------------------
//  SCROLL GALLERY
//---------------------------
GLOBALS.ScrollGalleryWidth = 110;

//---------------------------
//  SCAN TABS
//---------------------------
GLOBALS.scanTabLabelHeight = 20;
GLOBALS.scanTabLabelWidth = 40;
GLOBALS.minScanTabHeight = GLOBALS.scanTabLabelHeight;
GLOBALS.defaultScanTabHeight = GLOBALS.minScanTabHeight;

GLOBALS.maxModalWidthPct = .90;
GLOBALS.maxModalHeightPct = .95;


GLOBALS.tabClickHeight = 300;

//---------------------------
//  SCROLL LINK GROUPS
//---------------------------
GLOBALS.maxScrollLinkGroups = 10;
GLOBALS.SliderLinker = new SliderLinker();


//---------------------------
//  CONTENT DIVIDER HEIGHT
//---------------------------
GLOBALS.ContentDividerHeight = 6;
GLOBALS.minContentDividerTop = function(widgetHeight){
	return widgetHeight - GLOBALS.ContentDividerHeight - GLOBALS.minScanTabHeight;
} 




