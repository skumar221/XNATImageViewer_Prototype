
var defaultArgs_scrollGallery = {
	id: "scrollGallery",
	parent: document.body,
	orientation: "vertical",
	sliderLocation: "left",
	sliderWidth: 8,
	scrollMarginY: 8,
	scrollMarginX: 8,
	CSS: {
		top: 0,
		left: 30,
		width: 110,
		height: 400,
		border: "solid rgba(90,90,90,1) 1px"
	},

	
	_sliderCSS:	
	{
		id: "_frameSlider", 
		parent: document.body,
		round: true,
		handleOffsetLeft: 0,
	  	handleOffsetTop: 0,
		widgetCSS:{
		},
		handleCSS:{
			height: 50,
			width: 5,
			borderWidth: 0,
			borderColor: XNATImageViewerGlobals.semiactiveLineColor,
			backgroundColor: "rgba(255,255,255,1)"
		},
		trackCSS:{
			borderWidth: 0,
			borderColor: XNATImageViewerGlobals.semiactiveLineColor,
			backgroundColor: "rgba(50, 50, 50, 1)"
		}
	}
}



//******************************************************
//  Init
//
//******************************************************
var scrollGallery = function(args){
  	var that = this;
	 INIT(this, defaultArgs_scrollGallery, args, function(){
	 });
	 
	 this.contentsHeight = this.CSS.height;




	//-------------------------------
	// THE WIDGET
	//-------------------------------	 
	 $(this.widget).css({
	    position: "relative",
	 	overflow: "hidden",
	 	"overflow-x": "hidden",
	 	"overflow-y": "hidden"
	 })




	//-------------------------------
	// THE CONTENTS DIV 
	//-------------------------------
	  this.scrollContent = __makeElement__("div", this.widget, this.args.id + "_scrollContent", {
	  	position: "relative",
	  	border: "solid rgb(0,0,255,1) 1px",
	  	top: 0,
	  })




	//-------------------------------
	// THE SLIDER
	//-------------------------------	
	var mArgs = this.args._sliderCSS;
	this.contentSlider = new __verticalSlider__(__mergeArgs__(mArgs,{
		parent: this.widget,
		id: this.args.id + "_contentSlider",
		round: true,
	}));
  
  
  
  
	//-------------------------------
	// THE CONTENTS - BLANK FOR NOW
	//-------------------------------
	var blankContents = (that.args.orientation == "vertical") ?
					    __makeElement__("div", document.body, "blankElement", {height: 800, width: 100, backgroundColor: "rgba(200,100,51,1)"}):
					    __makeElement__("div", document.body, "blankElement", {height: 100, width: 800, backgroundColor: "rgba(100,200,51,1)"});
	blankContents.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."	    
	this.setContents(blankContents)
  
	
	this.updateCSS();
}




//******************************************************
//  Need to map the min/max and step values of the slider
//  to the length of the contents so we can scroll
//  in a proportional manner. This varies depending on 
//  the orientation of the gallery: vertical or horizontal.
//******************************************************
scrollGallery.prototype.mapSliderToContents = function(){
	var that = this;
	return function(_slider){		
//		console.log(_slider.value);
   }
}




//******************************************************
//  Sets contents.
//******************************************************
scrollGallery.prototype.setContents = function(obj){
  
	var that = this;

  
	//-------------------------------
	// REMOVE PREXISTING CHILD ELEMENTS
	//-------------------------------  
	while (this.scrollContent.hasChildNodes()) {
	    this.scrollContent.removeChild(this.scrollContent.lastChild);
	}
	

	//-------------------------------
	// IF OBJ IS A FUNCTION
	//-------------------------------  
	if (typeof obj == "function"){
		obj();
	}
	else if (typeof obj == "object"){
		// if obj is a DOM Element
		if(obj.tagName){
			that.scrollContent.appendChild(obj);
			that.scrollContent.style.height = __toPx__($(obj).height());
			that.scrollContent.style.width = __toPx__($(obj).width());
		}
	}

	that.contentSlider.addSlideCallback(that.mapSliderToContents());  
	that.contentSlider.bindToMouseWheel(that.widget);		
	this.updateCSS();
}




//******************************************************
//  UpdateCSS
//******************************************************
scrollGallery.prototype.updateCSS = function(){



	//----------------------------------
	// CSS: FRAME SLIDER
	//----------------------------------
    this.contentSlider.updateCSS({
    	widgetCSS:{
 			top : 0,
			left : 0,   		
    	},
    	trackCSS:{
    		height: __toInt__($(this.widget).css('height')),
    	}
    })
}
