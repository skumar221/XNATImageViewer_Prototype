defaultArgs_ScanTabs = {
	parent: document.body,
	id: "_ScanTabs",
	scanContents: 0,
	tabTitles: ["<b>Info.</b>", "<b>Adjust</b>"],
	contentFontSize: 10,
	activeLineColor: GLOBALS.activeLineColor,
	activeFontColor: GLOBALS.activeFontColor,
	inactiveLineColor: GLOBALS.inactiveLineColor,
	inactiveFontColor: GLOBALS.inactiveFontColor,
	CSS: {
		top: 400,
		left: 20,
		height: 300,
		width: 300,
		borderWidth: 1
	}
}




//******************************************************
//  The tab "titles" themselves are elements.  
//  Treated this as a separate method b/c jQuery UI
//  has some quirks as to how it treats tab titles.
//******************************************************
var makeTabTitles = function (parent, titles) {

	var titleElt = __makeElement__("ul", parent);	
	var titlesA = [];
	var titlesLi = [];
	
	var iconList = [{	
			src: "./icons/InfoIcon.png",
			w: 15,
			h: 16,
		} , 
		{
			src: "./icons/Adjust.png",
			w: 18,
			h: 16
		}
	];
	
	for (var i=0;i<titles.length;i++) {
		var li = __makeElement__("li", titleElt);	
		var a = __makeElement__("a", li);

		$(a).attr('href', "#" + parent.id + "-" + (i+1).toString());
		a.setAttribute("id", "tabA_" + i.toString());
		li.setAttribute("id", "tabLi_" + i.toString());
		a.innerHTML = titles[i];	
		a.style.color = "rgba(0,0,0,0)";
		
		var img = __makeElement__("img", a, a.id + " _img", {
			position: "absolute",
		});
		img.src = iconList[i].src;
		img.height = iconList[i].h;
		img.width = iconList[i].w;
		img.style.left = __toPx__(GLOBALS.scanTabLabelWidth/2 - iconList[i].w/2);
		img.style.top = __toPx__(GLOBALS.scanTabLabelHeight/2 - iconList[i].h/2);
		
		titlesA.push(a);
		titlesLi.push(li);
		
	}	
	//titleElt.className = "menu"
	return {
		titleElt: titleElt,
		titlesA: titlesA,
		titlesLi: titlesLi,
	}
}




//******************************************************
//  Init
//
//******************************************************
var ScanTabs = function (args) {
	
	var that = this;
	
	__addCallbackManager__(this);
		
	this.args = (args) ? __mergeArgs__(defaultArgs_ScanTabs, args) : defaultArgs_ScanTabs;
	this.CSS = this.args.CSS;
	
	this.activeTab = 0;
	
	this.widget = __makeElement__("div", this.args.parent, this.args.id, this.args.CSS);	
	$(this.widget).css({
		top: $(this.widget.parentNode).height() - GLOBALS.minScanTabHeight,
		height: GLOBALS.minScanTabHeight,
	})

	
	this.tabTitleObj = makeTabTitles(this.widget, this.args.tabTitles);
	this.tabs = []
	
	
	// Set Active Tab to 0
	$(this.tabTitleObj.titlesA[this.activeTab]).click();  
	





	
	//------------------------------
	// Tab Titles
	//------------------------------	
	for (var i=0;i<this.args.tabTitles.length;i++) {
		var e = __makeElement__("div", this.widget, this.args.id + "-" + (i+1).toString());
		e.label = this.tabTitleObj.titlesA[i].innerHTML;
		this.tabs.push(e)
	}

	$(this.widget).tabs();
	
	

	
	//------------------------------
	// ACTIVE TAB TRACKING
	//------------------------------
	for (var i=0;i<this.tabTitleObj.titlesA.length;i++) {		
		$(this.tabTitleObj.titlesA[i]).click(function (e) {
			that.setActiveTab(e);
			
		})
	}

	
	//------------------------------
	// CSS
	//------------------------------	
	this.updateCSS();
}




//******************************************************
//  getTab
//
//******************************************************
ScanTabs.prototype.getTab = function (value) {
	if (typeof value == "string") {
		for (var i=0;i<this.tabs.length;i++) {
			var v = (this.tabs[i].label).toLowerCase();
			if (v.search(value.toLowerCase()) > -1) {
				return this.tabs[i];
			}
		}		
	}
}




//******************************************************
//  setActiveTab
//
//******************************************************
ScanTabs.prototype.setActiveTab = function (e) {
	
	var elt = document.getElementById(e.currentTarget.id);
	
	var elt = e.currentTarget;
	
	for (var i=0; i<this.tabTitleObj.titlesA.length; i++) {
		if (this.tabTitleObj.titlesA[i] == elt) {
			
			var newTop = $(this.widget).position().top;
			var newHeight = GLOBALS.tabClickHeight;
			
			if (this.topWithinCompressedRange()){
				
				newTop = $(this.widget.parentNode).height() - GLOBALS.tabClickHeight;
				newHeight = GLOBALS.tabClickHeight;
			} 
			else {

				// Compress to default only if you select the same tab
				if (i == this.activeTab){
					newTop = $(this.widget.parentNode).height() - GLOBALS.defaultScanTabHeight;
					newHeight = GLOBALS.defaultScanTabHeight;
				}
				
			}
			
			$(this.widget).css({
				height: newHeight,
				top: newTop,
			});
			
			this.activeTab = i;
			this.updateCSS();
			this.runCallbacks('setActiveTab');
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
	$(this.widget).css({
		"font-size": this.args.contentFontSize,
		"padding": 0,
		"borderRadius": 0,
		"borderWidth": this.CSS.borderWidth,
		 background: "none",
		"borderColor": GLOBALS.inactiveLineColor,
		//"backgroundColor": "rgba(25,25,25,1)",
		"font-family": 'Helvetica, Helvetica neue, Arial, sans-serif',
	})



	//------------------------------
	// TAB CONTENTS
	//------------------------------
	var contentsHeight = $(this.widget).height() - GLOBALS.scanTabLabelHeight;
	
	for (var i=0;i<this.tabs.length;i++) {
	
		$(this.tabs[i]).css({
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
			overflow: "hidden",

		})
	}


	
	//------------------------------
	// PARENT TITLE ELEMENT
	//------------------------------
	$(this.tabTitleObj.titleElt).css({
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
	for (var i=0;i<this.tabTitleObj.titlesA.length;i++) {
		
		var bColor = (i == this.activeTab) ? 
					 GLOBALS.inactiveLineColor : 
					 GLOBALS.inactiveLineColor;
					 
		var fColor = (i == this.activeTab) ? 
					 GLOBALS.activeFontColor : 
					 GLOBALS.semiactiveFontColor;


		var op = ((i == this.activeTab) && !this.topWithinCompressedRange()) ? 1 : .4;
		 
		 
		//------------------------------
		// The Text
		//------------------------------
		$(this.tabTitleObj.titlesA[i]).css({
			"font-size": this.args.contentFontSize,
			"font-family": 'Helvetica, Helvetica neue, Arial, sans-serif',
			borderRadius: 0,
			opacity: op,
			cursor: "pointer",
		})
		
		
		//------------------------------
		// The Frame
		//------------------------------
		$(this.tabTitleObj.titlesLi[i]).css({
			background: "none",
			backgroundColor:"rgb(0,0,0)",
			borderColor: bColor,
			borderRadius: 0,
			height: GLOBALS.scanTabLabelHeight,
			width: GLOBALS.scanTabLabelWidth,
			marginTop: -1* this.CSS.borderWidth,
			marginLeft:-1* this.CSS.borderWidth,
		})
	}	

}
