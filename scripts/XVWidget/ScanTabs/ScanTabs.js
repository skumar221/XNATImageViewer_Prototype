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
		color: "rgba(255,255,255,1)",
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



	//------------------------------
	// Tabs
	//------------------------------

	var tabWidth = 50;
	var firstTab;
	var selectedBorder = {
		"border" : "solid 1px rgb(200,200,200)",
		"border-bottom": "rgb(0,0,0)"
	}
	var deselectedBorder = {
		"border" : "solid 1px rgba(0,0,0,0)"
	}
	
	
	
	goog.array.forEach(this.args.tabTitles, function(title, i) { 
		
		var tab = utils.dom.makeElement("div", that.widget, "Tab", {
			position: "absolute",
			top: -1,
			left: tabWidth * i + i*3, 
			color: 'white',
			fontSize: GLOBALS.fontSizeMed,
			fontFamily: GLOBALS.fontFamily,
			backgroundColor: 'rgb(0,0,0)',
			width: tabWidth,
			height: GLOBALS.minScanTabHeight,
			cursor: 'pointer',
			backgroundColor: "rgba(0,0,0,1)",
		});

		
		if (i==0) {
			firstTab = tab;
		}
		
		var tabImg = utils.dom.makeElement("img", tab, "TabImage", {
			position: "absolute",
			top: (GLOBALS.minScanTabHeight - (GLOBALS.minScanTabHeight * .85))/2,
			height: GLOBALS.minScanTabHeight * .85,
			width: GLOBALS.minScanTabHeight * .85,
			opacity: .6,
			left: tabWidth/2 - (GLOBALS.minScanTabHeight * .85) / 2
			
		});
		//t.innerHTML = title;
		tabImg.src = that.args.tabImgSrc[i];
		

		
		var tabPage = utils.dom.makeElement("div", args.parent, "TabPage", {
			position: "absolute",
			top: GLOBALS.minScanTabHeight -1,
			//left: tabWidth * i, 
			color: 'white',
			fontFamily: GLOBALS.fontFamily,
			backgroundColor: 'rgb(0,0,0)',
			width: '100%',
			height: 200
		});
		tabPage.label = title;
		that.tabPane.addPage(new goog.ui.TabPane.TabPage(tabPage), i);
		that.tabs.push(tabPage);
		
		
		goog.events.listen(tab, goog.events.EventType.MOUSEOVER, function() { 
			utils.css.setCSS(tab, {
				backgroundColor: "rgba(90,90,90,1)"
			})
		});
		
		
		goog.events.listen(tab, goog.events.EventType.MOUSEOUT, function() { 
			utils.css.setCSS(tab, {
				backgroundColor: "rgba(0,0,0,1)"
			})		
		});
		




		goog.events.listen(tab, goog.events.EventType.CLICK, function(e) { 
			
			
			var ind = 0;
			var targetImage = goog.dom.getElementsByClass('TabImage', e.currentTarget);
			
			e.currentTarget.isExpanded = (e.currentTarget.isExpanded === 'undefined') ? false : e.currentTarget.isExpanded;
			e.currentTarget.isExpanded = !e.currentTarget.isExpanded;

			
			goog.array.forEach(goog.dom.getElementsByClass('TabImage', that.widget), function(elt, i) { 
				
				var op =  .6;
				
				if (elt == targetImage[0]) {
					op = 1;
					ind = i;
					that.tabPane.setSelectedIndex(i);
				}
				
				utils.css.setCSS(elt, { 
					opacity: op,
				})				
			})
			
			
			
			goog.array.forEach(goog.dom.getElementsByClass('Tab', that.widget), function(elt, i) { 

				var border =  (i === ind) ? selectedBorder : deselectedBorder;
				var zIndex =  (i === ind) ? 1000 : 10;
				
				utils.css.setCSS(elt, utils.dom.mergeArgs(border,{
					zIndex: zIndex,
				}));	
				
				utils.css.setCSS(that.tabPane.getPage(i).elContent_, utils.dom.mergeArgs(border,{
					zIndex: zIndex,
					'border-bottom' : selectedBorder['borderTop']
				}));
			})
			
			
			var viewerHeight = utils.css.dims(that.widget.parentNode, 'height');
			var widgetTop = (e.currentTarget.isExpanded) ? viewerHeight - GLOBALS.minScanTabHeight - GLOBALS.tabClickHeight : 
							utils.css.dims(that.widget.parentNode, 'height') - GLOBALS.minScanTabHeight + 1;
			
			utils.css.setCSS( that.widget, {
				top: widgetTop,
			})
			
			goog.array.forEach(goog.dom.getElementsByClass('TabPage', that.widget), function(elt, i) {
				utils.css.setCSS(elt, {
					height: viewerHeight - widgetTop - GLOBALS.minScanTabHeight - 1
				})
			});
	
	
		});
	})


	firstTab.click(); 
	firstTab.isExpanded = false;

	
	//------------------------------
	// CSS
	//------------------------------	
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
	tabImgSrc: ["./icons/InfoIcon.png", "./icons/Adjust.png"],
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
		width: 300,
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
	
	var parentHeight = $(this.widget.parentNode).height();
	
	var defaultTop = parentHeight - GLOBALS.defaultScanTabHeight;
	
	var currTop = $(this.widget).position().top;
	
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
	})


	/*
	//------------------------------
	// TAB CONTENTS
	//------------------------------
	var contentsHeight = utils.css.dims(this.widget, 'height') - GLOBALS.scanTabLabelHeight;
	
	
	for (var i = 0, len = this.tabs.length; i < len; i++) {
	
		utils.css.setCSS( this.tabs[i], {
			"font-size": this.args.contentFontSize,
			"font-family": 'Helvetica, Helvetica neue, Arial, sans-serif',
			width: $(this.widget).width() - 20,
			"padding": 10,
			borderWidth: 1,
			borderColor: GLOBALS.inactiveLineColor,
			"border-bottom-right-radius": "0px",
			"border-bottom-left-radius": "0px",
			"color": "rgba(255,255,255,1)",
			background: "none",
			"backgroundColor": "rgba(0,0,0,1)",
			height: contentsHeight,// compensating for the padding,
			marginLeft:-1,
			overflow: "hidden"

		})
	}
	*/

	/*	
	//------------------------------
	// PARENT TITLE ELEMENT
	//------------------------------
	utils.css.setCSS( this.tabTitleObj.titleElt, {
		"font-size": this.args.contentFontSize,
		"font-family": 'Helvetica, Helvetica neue, Arial, sans-serif',
		borderRadius: 0,
		background: "none",
		borderWidth: 0,
		"color": GLOBALS.activeFontColor,
		padding: 0,
		cursor: "pointer"
		
	})


	
	//------------------------------
	// TAB TITLES
	//------------------------------
	for (var i = 0, len = this.tabTitleObj.titlesA.length; i < len; i++) {
		
		var bColor = (i === this.activeTab) ? 
					 GLOBALS.inactiveLineColor : 
					 GLOBALS.inactiveLineColor;
					 
		var fColor = (i === this.activeTab) ? 
					 GLOBALS.activeFontColor : 
					 GLOBALS.semiactiveFontColor;


		var op = ((i === this.activeTab) && !this.topWithinCompressedRange()) ? 1 : .4;
		 
		 
		//------------------------------
		// The Text
		//------------------------------
		utils.css.setCSS( this.tabTitleObj.titlesA[i], {
			"font-size": this.args.contentFontSize,
			"font-family": 'Helvetica, Helvetica neue, Arial, sans-serif',
			borderRadius: 0,
			opacity: op,
			cursor: "pointer"
		})
		
		
		//------------------------------
		// The Frame
		//------------------------------
		utils.css.setCSS( this.tabTitleObj.titlesLi[i], {
			background: "none",
			backgroundColor:"rgb(0,0,0)",
			borderColor: bColor,
			borderRadius: 0,
			height: GLOBALS.scanTabLabelHeight,
			width: GLOBALS.scanTabLabelWidth,
			marginTop: -1* this.CSS.borderWidth,
			marginLeft:-1* this.CSS.borderWidth
		})
	}	
	*/

}
