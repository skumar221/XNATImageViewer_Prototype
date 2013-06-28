ScanTabs.prototype.setUI = function() {
	
	var that = this;
	
	//------------------------------
	// CSS
	//------------------------------
	
	/**
	 * @type {Object}
	 */
	var selectedBorder = {
		"border" : "solid 1px rgb(200,200,200)",
		"border-bottom": "rgb(0,0,0)"
	}
	/**
	 * @type {Object}
	 */	
	var deselectedBorder = {
		"border" : "solid 1px rgb(80,80,80)"
	}
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
		top: (GLOBALS.minScanTabHeight - (GLOBALS.minScanTabHeight * .85))/2,
		height: GLOBALS.minScanTabHeight * .85,
		width: GLOBALS.minScanTabHeight * .85,
		opacity: .6,
		left: GLOBALS.scanTabLabelWidth/2 - (GLOBALS.minScanTabHeight * .85) / 2
	}
	/**
	 * @type {Object}
	 */	
	var tabPageCSS = {
		position: "absolute",
		top: GLOBALS.minScanTabHeight -1,
		color: 'white',
		fontFamily: GLOBALS.fontFamily,
		backgroundColor: 'rgb(0,0,0)',
	}
	/**
	 * @type {Object}
	 */	
	var mouseoverBG = {
		backgroundColor: "rgba(90,90,90,1)"		
	}
	/**
	 * @type {Object}
	 */	
	var mouseoutBG = {
		backgroundColor: "rgba(0,0,0,1)"
	}
	
	
	
	
	
	//
	//  Loop through tabTitles array to create them
	//
	goog.array.forEach(this.args.tabTitles, function(title, i) { 
		
		
		
		
		//----------------------------------
		//	TAB
		//----------------------------------			
		var tab = utils.dom.makeElement("div", 
			that.widget, "Tab", 
			utils.dom.mergeArgs(tabCSS, {
			left: GLOBALS.scanTabLabelWidth * i + i*3, 
		}));
		utils.css.setCSS(tab, deselectedBorder);
		
		
		
		
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
			


		//
		//	MOUSEOVER
		//
		goog.events.listen(tab, goog.events.EventType.MOUSEOVER, function(e) { 
		
			if (!e.currentTarget.isExpanded) {
				utils.css.setCSS(tab, mouseoverBG)				
			}
		
		});
		
		
		
		
		//
		//	MOUSEOUT
		//		
		goog.events.listen(tab, goog.events.EventType.MOUSEOUT, function(e) { 
			
			utils.css.setCSS(tab, mouseoutBG)		
		
		});
		
		


		//
		//	CLICK
		//
		goog.events.listen(tab, goog.events.EventType.CLICK, function(e) { 			
			
			var ind = 0;
			var targetImage = goog.dom.getElementsByClass('TabIcon', e.currentTarget);
			var viewerHeight = utils.css.dims(that.widget.parentNode, 'height');
	
							
		
			//
			// Set the isExpanded on clicked tab, false on unclicked tab
			//
			goog.array.forEach(goog.dom.getElementsByClass('Tab', that.widget), function(elt, i) { 
				
				if (elt == e.currentTarget) {
					elt.isExpanded = (elt.isExpanded === 'undefined') ? false : elt.isExpanded;
					elt.isExpanded = !elt.isExpanded;					
				}
				else {
					elt.isExpanded = false;
				}
				
			})


			
			//
			// widgetTop calculated based on the isExpanded parameter
			//
			var widgetTop = (e.currentTarget.isExpanded) ? viewerHeight - GLOBALS.minScanTabHeight - GLOBALS.tabClickHeight : 
							utils.css.dims(that.widget.parentNode, 'height') - GLOBALS.minScanTabHeight + 1;
			var pageHeight = viewerHeight - widgetTop - GLOBALS.minScanTabHeight - 1;



			//
			// Set the border of the tabs, clicked vs. other...
			//			
			
			var dims = utils.css.dims(that.widget);
			var slide = new goog.fx.dom.Slide(that.widget, [dims.left, dims.top], [0, widgetTop], GLOBALS.animMed, goog.fx.easing.easeOut);
			slide.play();
			

			
			//
			// Set the opacity of Icon when you click (1 for clicked, .6 for unclicked)
			//
			goog.array.forEach(goog.dom.getElementsByClass('TabIcon', that.widget), function(elt, i) { 
				
				var op =  .6;	
				if (elt == targetImage[0] && goog.dom.getAncestorByClass(elt, "Tab").isExpanded) {
					op = 1;
					ind = i;
					that.tabPane.setSelectedIndex(i);
				}
				
				utils.css.setCSS(elt, { 
					opacity: op,
				})		
						
			})			
			
			
			
			//
			// Set the border of the tabs, clicked vs. other...
			//
			goog.array.forEach(goog.dom.getElementsByClass('Tab', that.widget), function(elt, i) { 

				var border =  deselectedBorder;
				var zIndex =  10;
				
				if (i === ind && elt.isExpanded) {
					border = selectedBorder;
					zIndex = 1000;
				}
				
				
				
				//
				// Set Tab background and zIndex
				//
				utils.css.setCSS(elt, utils.dom.mergeArgs(border,{
					zIndex: zIndex,
					backgroundColor: "rgba(0,0,0,1)"
				}));	
				
				
				
				
				//
				// Set the tabPage border
				//
				utils.css.setCSS(that.tabPane.getPage(i).elContent_, utils.dom.mergeArgs(border,{
					zIndex: zIndex,
					'border-bottom' : selectedBorder['borderTop']
				}));
			})
			
			
			
			
			//
			// Set the height of the tab page
			//
			goog.array.forEach(goog.dom.getElementsByClass('TabPage', that.widget), function(elt, i) {

				var pageWidth = utils.css.dims(that.widget, 'width')-2;
				utils.css.setCSS(elt, {
					width: pageWidth
				})	
				
				
				var dims = utils.css.dims(elt);
				var anim = new goog.fx.dom.Resize(
					elt, 
					[pageWidth, dims.height], 
					[pageWidth, pageHeight], 
					GLOBALS.animMed, goog.fx.easing.easeOut);

				anim.play();
			});
		});
	})
}
