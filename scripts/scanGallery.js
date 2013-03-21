
var defaultArgs_scanGallery = {
	id: "scanGallery",
	parent: document.body,
	orientation: "vertical",
	sliderWidth: 8,
	_css: {
		top: 0,
		left: 30,
		width: 110,
		border: "solid rgba(90,90,90,1) 1px"
	}
}

var scanGallery = function(args){
  	var that = this;
	 __Init__(this, defaultArgs_scanGallery, args, function(){
	 });
	 
	 $(this.widget).css({
	    position: "relative",
	    top: (10),
	 	left: 10,
	 	height: $(this.args.parent).outerHeight() - 24,
	 	overflow: "hidden",
	 	"overflow-x": "hidden",
	 	"overflow-y": "hidden"
	 })
	
	  this.scrollBounds = __MakeElement__("div", this.widget, this.args.id + "_scrollBounds", {
	  	position: "absolute",
	  	top: 0,
	  	left: this.args.sliderWidth + 2,
	  	height: "100%",
	  	width: 130,
	 	border: "solid rgb(0,0,255,1) 1px",
	 	//backgroundColor: "rgba(200, 50, 10, .5)",
	  	borderWidth: "1px",
	  	overflow: "hidden",
	  });
	  
	  this.scrollContent = __MakeElement__("div", this.scrollBounds, this.args.id + "_scrollContent", {
	  	position: "relative",
	  	border: "solid rgb(0,0,255,1) 1px",
	  	top: 0,
	  })
	
	  var scrollMarginY = 8;
	  var scrollMarginX = 8;
	  var thumbSpacing = scrollMarginY;
	  var totalHeight = 0;
	  	  
	  for (var i=0; i<20; i++){
		  var h = i*(100) + thumbSpacing*i + scrollMarginY;  	
	  	  var a = new scanThumbnail({
	  	  	id: "scrollContent_" + i.toString(),
	  	  	parent: this.scrollContent,
	  	  	_css: {
	  	  		top: h, 
	  	  		left: scrollMarginX,
	  	  	}
	  	  });
		  //a.addDropZone(_frameViewer.dropZone);
	  }
	  
	  var scHeight = h + scrollMarginY*2 + 100;
	  this.scrollContent.style.height = _px(scHeight);
	  this.scrollContent.style.borderColor= "rgba(10, 200, 2, 1)";
	  
	//console.log("WDIGET HEIGHT: " + this.widget.style.height);
	//console.log("PARENT HEIGHT: " + $(this.widget).outerHeight());
	  
	this.contentSlider = new modSlider({
		id: "contentSlider", 
		parent: this.widget,
		constrainMargin: 2, 
		top: 0, 
		left: 0, 
		orientation: "vertical",  
		value:100, 
		step: 1, 
		height: $(this.widget).height(), 
		width: this.args.sliderWidth, 
		width_handle: 6, 
		borderRadius_slider: 0,
		borderRadius_handle: 3,
		border: "solid rgba(200,200,200,1) 0px",
		"sliderBGColor":"rgba(50, 50, 50, 1)" ,
		borderWidth_handle: 0,
		height_handle: 40,
	});
  

  this.contentSlider.addSlideFunction(function(_slider){
  		var t = -1 * _remap1D(_slider.currValue, [_slider.args.min, _slider.args.max], 
  			   							    [0, scHeight - $(that.scrollBounds).height() - scrollMarginY]).newVal;
  		$(that.scrollContent).css({
  			top: t,
  		});
  });  
  this.contentSlider.bindToMouseWheel(this.scrollBounds);
  
  this.restyle();
}

scanGallery.prototype.restyle = function(){
	 $(this.widget).css({
	 	height: $(this.args.parent).outerHeight() * .5,// - 24,
	 })
	
	  this.scrollBounds = __MakeElement__("div", this.widget, this.args.id + "_scrollBounds", {
	  	height: "100%",
	  	overflow: "hidden",
	  });
}
