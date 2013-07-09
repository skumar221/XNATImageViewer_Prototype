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
		fontSize: GLOBALS.fontSizeMed,
		fontFamily: GLOBALS.fontFamily,
		backgroundColor: 'rgb(0,0,0)',
		width: GLOBALS.scanTabLabelWidth,
		height: GLOBALS.minScanTabHeight - 1,
		cursor: 'pointer',
		backgroundColor: "rgba(0,0,0,1)"			
	}
	/**
	 * @type {Object}
	 */	
	var tabIconCSS = {
		position: "absolute",
		top: Math.round((GLOBALS.minScanTabHeight - (GLOBALS.minScanTabHeight * .85))/2),
		left: Math.round(GLOBALS.scanTabLabelWidth/2 - (GLOBALS.minScanTabHeight * .85) / 2),
		height: Math.round(GLOBALS.minScanTabHeight * .75),
		width: Math.round(GLOBALS.minScanTabHeight * .75),
		opacity: .6
	}
	/**
	 * @type {Object}
	 */	
	var tabPageCSS = {
		position: "absolute",
		top: GLOBALS.minScanTabHeight -1,
		color: 'white',
		fontFamily: GLOBALS.fontFamily,
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
			left: GLOBALS.scanTabLabelWidth * i + i*3
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
