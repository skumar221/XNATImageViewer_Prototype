
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
	
	_slidercss_vertical:{
		id: "contentSlider", 
		parent: document.body,
		constrainMargin: 2, 
		orientation: "vertical",
		top: 0, 
		left: 0, 
		width: 10,
		value:100, 
		step: 1, 
		width_handle: 6, 
		borderRadius_slider: 0,
		borderRadius_handle: 0,
		border: "solid rgba(200,200,200,1) 0px",
		"sliderBGColor":"rgba(50, 50, 50, 1)" ,
		borderWidth_handle: 0,
		height_handle: 40,
	},
	
	_slidercss_horizontal:{
		id: "contentSlider", 
		parent: document.body,
		constrainMargin: 0, 
		orientation: "horizontal",
		top: 0, 
		left: 0, 
		height: 10,
		width: 300,
		value:0, 
		step: 1, 
  	    height_handle: 6,	
		width_handle: 30,
		borderRadius_slider: 0,
		borderRadius_handle: 0,
		border: "solid rgba(200,200,200,1) 0px",
		"sliderBGColor":"rgba(50, 50, 50, 1)" ,
		borderWidth_handle: 0,
	}
}



var scrollGallery = function(args){
  	var that = this;
	 __Init__(this, defaultArgs_scrollGallery, args, function(){
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
	  this.scrollContent = __MakeElement__("div", this.widget, this.args.id + "_scrollContent", {
	  	position: "relative",
	  	border: "solid rgb(0,0,255,1) 1px",
	  	top: 0,
	  })




	//-------------------------------
	// THE SLIDER
	//-------------------------------	
	var mArgs = (this.args.orientation == "vertical") ? this.args._slidercss_vertical : this.args._slidercss_horizontal;
	this.contentSlider = new __Slider__(__MergeArgs__(mArgs,{
		parent: this.widget,
		id: this.args.id + "_contentSlider",
	}));
  
  
  
  
	//-------------------------------
	// THE CONTENTS - BLANK FOR NOW
	//-------------------------------
	var blankContents = (that.args.orientation == "vertical") ?
					    __MakeElement__("div", document.body, "blankElement", {height: 800, width: 100, backgroundColor: "rgba(200,100,51,1)"}):
					    __MakeElement__("div", document.body, "blankElement", {height: 100, width: 800, backgroundColor: "rgba(100,200,51,1)"});
	blankContents.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."	    
	this.setContents(blankContents)
  
	
	this.updateCSS();
}

scrollGallery.prototype.mapSliderToContents = function(){
	var that = this;
	return function(_slider){		
		if (that.args.orientation == "vertical"){
	  		var t = -1 * __RemapID__(_slider.currValue, [_slider.args.min, _slider.args.max], 
	   							    [0, $(that.scrollContent).outerHeight() - $(that.widget).height() - that.args.scrollMarginY]).newVal;	
	   		$(that.scrollContent).css({
	  			top: t,
	  		});
		}
		else{
	  		var t =   __RemapID__(_slider.currValue, [_slider.args.min, _slider.args.max], 
	   							    [0,__toInt__(that.scrollContent.style.width) - $(that.widget).width() - that.args.scrollMarginX]).newVal;	
	   		if (t<0) t= 0;	
	   		console.log(t);
	   		$(that.scrollContent).css({
	  			left: -t,
	  		});	   							  
		}
   }
}
	
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

scrollGallery.prototype.updateCSS = function(){
	
	


	 //----------------------------------
	 // The WIDGET
	 //----------------------------------
	 $(this.widget).css({
	 	//top: this.CSS.top,
	 	//left: this.CSS.left,
	 })



	 //----------------------------------
	 // THE SLIDER
	 //----------------------------------	
	if (this.contentSlider){		
		if(this.args.orientation == "vertical"){
			if(this.args.sliderLocation == "right"){
				this.contentSlider.args.left = 	$(this.widget).width() - $(this.contentSlider.widget).outerWidth();
			}
			else{			
				$(this.scrollContent).css({
					left: $(this.contentSlider.widget).outerWidth(),
				});		
			}
			

			$(this.contentSlider.widget).css({
				height : $(this.widget).height(),
				width : 10
			});
			this.contentSlider.updateCSS();
			
			
		}
		else{

			if(this.args.sliderLocation == "top"){
				this.contentSlider.args.top = 	0;
				$(this.scrollContent).css({
					top: $(this.contentSlider.widget).outerHeight(),
					left: 0,
				});		
			}
			else{
				this.contentSlider.args.top = 	$(this.widget).height() - $(this.contentSlider.widget).outerHeight();
				$(this.scrollContent).css({
					top: 0,
					left: 0,
				});	
			}
			this.contentSlider.args.width = $(this.widget).width();
		}	

		this.contentSlider.updateCSS();  
	 }
}
