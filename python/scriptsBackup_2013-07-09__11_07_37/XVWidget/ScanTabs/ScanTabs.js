

//******************************************************
//  Init
//
//******************************************************
goog.require('XVWidget');
goog.provide('ScanTabs');
/**
 * @constructor
 * @extends {XVWidget}
 */
ScanTabs = function (args) {
	
	var that = this;
	var tabPane;
	
	XVWidget.call(this, args);	
	utils.dom.addCallbackManager(this);

	
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

	this.addTabs();
	
	
	/**
	 * @private
	 */
	this.lastSelectedTab = 0;
	/**
	 * @return {number}
	 */
	this.getLastSelectedTab = function() {
		return this.lastSelectedTab;
	}
	



	/**
	 * @param {string} 
	 * @return {Element}
	 */
	this.getTab = function (value) {
		
		var that = this;
		var retVal;
		
		if (typeof value === 'string') {
			value = value.toLowerCase();
			utils.array.forEach(this.tabs, function(tab) {
				if (tab.label.toLowerCase().indexOf(value) > -1 && !retVal) { 
					retVal = tab; 
				}				
			})
								
		} else if (typeof value === 'number') {

			utils.array.forEach(goog.dom.getElementsByClass('TabPage', that.widget), function(tabPage, i) { 			
				if (i === value) {
					retVal = tabPage;
				}
			})			
			
		}
		return retVal;
	}


	

	this.updateCSS();
	this.setClickUI();

	this.setActive(0);
	utils.array.forEach(goog.dom.getElementsByClass('Tab', that.widget), function(tab, i) { 
		tab.isActive = false;
	})


}
goog.inherits(ScanTabs, XVWidget);





/**
 * @type {Object}
 * @protected
 */
ScanTabs.prototype.defaultArgs = {
	parent: document.body,
	className: GLOBALS.classNames.ScanTabs,
	tabTitles: ["Info", "Adjust"],
	tabIconSrc: ["./icons/InfoIcon.png", "./icons/Adjust.png"],
	widgetCSS: {
		position: 'absolute',
		top: 400,
		left: 20,
		height: 300,
		width: '100%',
		borderWidth: 1,
		backgroundColor: GLOBALS.ContentDividerColor
	}
}




/**
 * @private
 */
ScanTabs.prototype.setClickUI = function() {
	
	var that = this;
	//
	// CYCLE THROUGH
	//
	utils.array.forEach(goog.dom.getElementsByClass('Tab', that.widget), function(tab, i) { 
		
		goog.events.listen(tab, goog.events.EventType.CLICK, function(event) { 
			
			if (!tab.isActive) {
				that.setActive(i);
				that.callbacks['activate']();	
			}
			else {
				that.callbacks['deactivate']();
				tab.isActive = false;
			}
			
		})
		
		goog.events.listen(tab, goog.events.EventType.MOUSEOVER, function(event) { 
			
			tab.style.opacity = 1;
		})
		
	})	
	
}




/**
 * @param {Object}
 */
ScanTabs.prototype.setClickCallbacks = function(object) {

	if (!this.callbacks) {
		this.callbacks = {};
	}
	
	for (callbackType in object) {
		this.callbacks[callbackType] = object[callbackType];
	}	
	
}





/**
 * @param {number}
 */
ScanTabs.prototype.setActive = function (activeTabNum) {
	
	var that = this;
	var setActiveColor = "rgb(120,120,120)";
	var deselectColor = "rgb(80,80,80)";
	var black = "rgb(0,0,0)";
	var border, zIndex;//, disp;

	var selectedBorder = {
		"border" : "solid 1px " + setActiveColor
	}

	var deselectedBorder = {
		"border" : "solid 1px " + deselectColor
	}	


	this.tabPane.setSelectedIndex(activeTabNum);
	//
	// CYCLE THROUGH, hightlihting the tab associated with tabNum, not hightlting the other
	//
	utils.array.forEach(goog.dom.getElementsByClass('Tab', that.widget), function(tab, i) { 
		
		//
		// params: if current tab is the one to setActive or not
		//
		border =  deselectedBorder;
		zIndex =  10;
		tab.isActive = false;
		
		if (i === activeTabNum) {
			border = selectedBorder;
			zIndex = 1000;
			disp = 'visible';
			tab.isActive = true;
		}
		
		
		
		//
		// Set Tab background and zIndex
		//
		utils.css.setCSS(tab, utils.dom.mergeArgs(border,{
			zIndex: zIndex,
			backgroundColor: black,
			'border-bottom': black
		}));	
		
		
		
		//
		// Set the tabPage border
		//

		utils.css.setCSS(that.getTab(i), utils.dom.mergeArgs(border, {
			zIndex: zIndex
		}));


	})
}





/**
 * @param {number}
 */
ScanTabs.prototype.expandVertically = function (newTop) {
	
	var that = this;
	var parentHeight = utils.css.dims(that.widget.parentNode, 'height');
	var parentWidth = utils.css.dims(that.widget.parentNode, 'width');
	var tabHeight = utils.css.dims(goog.dom.getElementsByClass('Tab', that.widget)[0] , 'outerHeight')
	var pageHeight =  parentHeight - newTop - tabHeight;
	

	utils.css.setCSS(this.widget, {
		top: newTop
	})
	
	utils.array.forEach(goog.dom.getElementsByClass('TabPage', that.widget), function(elt, i) {			
		//
		// Set the tabPage border
		//
		utils.css.setCSS(elt, {
			height: pageHeight - 1,
			width: parentWidth - 2
		});
	})
}



ScanTabs.prototype.updateCSS = function (args) {

	utils.css.setCSS(this.widget, args);

	var that = this;
	var parentHeight = utils.css.dims(that.widget.parentNode, 'height');
	var parentWidth = utils.css.dims(that.widget.parentNode, 'width');
	var tabHeight = utils.css.dims(goog.dom.getElementsByClass('Tab', that.widget)[0] , 'outerHeight')
	var pageHeight =  (parentHeight - utils.css.dims(that.widget, 'top') - tabHeight -1) || 0;

	
	//-----------------------------
	// TAB PAGE
	//-----------------------------
	utils.array.forEach(goog.dom.getElementsByClass('TabPage', that.widget), function(elt, i) {			
		utils.css.setCSS(elt, {
			height: pageHeight,
			width: parentWidth-2
		});
	})
}
