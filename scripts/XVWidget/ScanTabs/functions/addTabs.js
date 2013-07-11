ScanTabs.prototype.addTabs = function() {
	
	var that = this;
	
	//------------------------------
	// CSS
	//------------------------------
	/**
	 * @type {Object}
	 */	
	var tabCSS = {
		position: "absolute",
		top: 0,	
		color: 'white',
		fontSize: XVGlobals.fontSizeMed,
		fontFamily: XVGlobals.fontFamily,
		backgroundColor: 'rgb(0,0,0)',
		width: XVGlobals.scanTabLabelWidth,
		height: XVGlobals.minScanTabHeight - 1,
		cursor: 'pointer',
		backgroundColor: "rgba(0,0,0,1)"			
	}
	/**
	 * @type {Object}
	 */	
	var tabIconCSS = {
		position: "absolute",
		top: Math.round((XVGlobals.minScanTabHeight - (XVGlobals.minScanTabHeight * .85))/2),
		left: Math.round(XVGlobals.scanTabLabelWidth/2 - (XVGlobals.minScanTabHeight * .85) / 2),
		height: Math.round(XVGlobals.minScanTabHeight * .75),
		width: Math.round(XVGlobals.minScanTabHeight * .75),
		opacity: .6
	}
	/**
	 * @type {Object}
	 */	
	var tabPageCSS = {
		position: "absolute",
		top: XVGlobals.minScanTabHeight -1,
		color: 'white',
		fontFamily: XVGlobals.fontFamily,
		backgroundColor: 'rgb(0,0,0)'
	}

	
	
	
	
	//
	//  Loop through tabTitles array to create them
	//
	utils.array.forEach(this.args.tabTitles, function(title, i) { 
		
		
		
		//----------------------------------
		//	TAB
		//----------------------------------			
		var tab = utils.dom.makeElement("div", 
			that.widget, "Tab", 
			utils.dom.mergeArgs(tabCSS, {
			left: XVGlobals.scanTabLabelWidth * i + i*3
		}));
		tab.title = title;
		
		
		
		//----------------------------------
		//	TAB ICON
		//----------------------------------			
		var tabIcon = utils.dom.makeElement("img", tab, "TabIcon", tabIconCSS);
		tabIcon.src = that.args.tabIconSrc[i];	




		//----------------------------------
		//	TAB PAGE
		//----------------------------------	
		var tabPage = utils.dom.makeElement("div", that.args.parent, "TabPage", utils.dom.mergeArgs(tabPageCSS, {
			width: utils.css.dims(that.widget, 'width')
		}));
		tabPage.label = title;
		that.tabPane.addPage(new goog.ui.TabPane.TabPage(tabPage), i);
		that.tabs.push(tabPage);
			

	})
}
