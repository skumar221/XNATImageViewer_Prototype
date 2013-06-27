goog.require('goog.ui.TabPane');

//******************************************************
//  Init
//
//******************************************************
goog.require(GLOBALS.classNames.XVWidget);
goog.provide(GLOBALS.classNames.ScanTabs);
/**
 * @constructor
 * @extends {XVWidget}
 */
ScanTabs = function (args) {
	
	var that = this;
	var tabPane;
	
	XVWidget.call(this, args);	
	utils.dom.addCallbackManager(this);

	// Adjust widgetcss
	utils.css.setCSS( this.widget, {
		backgroundColor: "rgb(55,55,55)",
	})
	// Set Tabs, google -style
	
	/**
	 * @type {goog.ui.TabPane}
	 * @private
	 */
	this.tabPane = new goog.ui.TabPane(this.widget);	
	/**
	 * @type {Array}
	 * @private
	 */
	this.tabs = [];

	this.setUI();

	this.updateCSS();
}
goog.inherits(ScanTabs, XVWidget);




/**
 * @protected
 */
ScanTabs.prototype.defaultArgs = {
	parent: document.body,
	className: GLOBALS.classNames.ScanTabs,
	scanContents: 0,
	tabTitles: ["Info", "Adjust"],
	tabIconSrc: ["./icons/InfoIcon.png", "./icons/Adjust.png"],
	contentFontSize: 10,
	activeLineColor: GLOBALS.activeLineColor,
	activeFontColor: GLOBALS.activeFontColor,
	inactiveLineColor: GLOBALS.inactiveLineColor,
	inactiveFontColor: GLOBALS.inactiveFontColor,
	widgetCSS: {
		position: 'absolute',
		top: 400,
		left: 20,
		height: 300,
		width: '100%',
		borderWidth: 1
	}
}



//******************************************************
//  getTab
//
//******************************************************
ScanTabs.prototype.getTab = function (value) {
	var that = this;
	var tab;
	
	for (var i=0; tab = this.tabs[i]; i++) {
		if (typeof value === "string") {
			
			if (tab.label.toLowerCase().indexOf(value.toLowerCase()) > -1) {

				return tab;
			}	
		}		
	}

	
}




ScanTabs.prototype.topWithinCompressedRange = function (range) {
	
	var rangeVal = (typeof range === 'undefined') ? 10 : range;	
	var parentHeight = utils.css.dims(this.widget.parentNode, 'height');
	var defaultTop = parentHeight - GLOBALS.defaultScanTabHeight;
	var currTop = utils.css.dims(this.widget, 'top');
	var diff = Math.abs(currTop - defaultTop);	
	
	
	if ( diff <= rangeVal) {
		return true;
	}		
	return false;	
}


ScanTabs.prototype.updateCSS = function () {


	//------------------------------
	// WIDGET
	//------------------------------

	utils.css.setCSS( this.widget, {
		top: utils.css.dims(this.widget.parentNode, 'height') - GLOBALS.minScanTabHeight + 1,
		width: '100%'
	})


}
