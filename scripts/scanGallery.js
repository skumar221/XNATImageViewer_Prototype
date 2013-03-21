
var defaultArgs_scanGallery = {
	id: "scanGallery",
	parent: document.body,
	orientation: "vertical",
	sliderWidth: 10,
	_css: {
		top: 0,
		left: 30,
		width: 140,
		border: "solid rgba(150,150,150,1) 1px"
	}
}

var scanGallery = function(args){
  	var that = this;
	 __init__(this, defaultArgs_scanGallery, args, function(){
	 });
	 
	 $(this.widget).css({
	    position: "relative",
	    top: 0,
	 	left: 0,
	 	height: "95%",
	 	backgroundColor: "rgba(100,225, 90, .6)",
	 	overflow: "hidden",
	 	"overflow-x": "hidden",
	 	"overflow-y": "hidden"
	 })
	
	  this.scrollBounds = makeElement("div", this.widget, this.args.id + "_scrollBounds", {
	  	position: "absolute",
	  	top: 0,
	  	left: this.args.sliderWidth + 2,
	  	height: "100%",
	  	width: 130,
	 	border: "solid rgb(0,0,255,1) 1px",
	 	backgroundColor: "rgba(200, 50, 10, .5)",
	  	borderWidth: "1px",
	  	overflow: "hidden",
	  });
	  
	  this.scrollContent = makeElement("div", this.scrollBounds, this.args.id + "_scrollContent", {
	  	position: "relative",
	  	top: 0,
	  })
	
	  var scrollMarginY = 12;
	  var scrollMarginX = 12;
	  var thumbSpacing = scrollMarginY;
	  var totalHeight = 0;
	  	  
	  for (var i=0; i<10; i++){
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
	  
	console.log("WDIGET HEIGHT: " + this.widget.style.height);
	console.log("PARENT HEIGHT: " + $(this.widget).outerHeight());
	  
	this.contentSlider = new modSlider({
		id: "contentSlider", 
		parent: this.widget,
		constrainMargin: 2, 
		top: 0, 
		left: 0, 
		orientation: "vertical",  
		value:100, step: 1, 
		height: $(this.args.parent).outerHeight(), 
		width: this.args.sliderWidth, 
		width_handle: 8, 
		borderRadius_slider: 0,
		borderRadius_handle: 0,
		border: "solid rgba(200,200,200,1) 1px",
		"sliderBGColor":"rgba(0, 0, 200, 1)" 
	});
  

  this.contentSlider.addSlideFunction(function(_slider){
  	   var t = -_remap1D(_slider.currValue, [_slider.args.min, _slider.args.max], [0, scHeight - $(this.scrollBounds).height() - scrollMarginY]);
  		$(this.scrollContent).css({
  			top: -_remap1D(_slider.currValue, [_slider.args.min, _slider.args.max], [0, scHeight - $(this.scrollBounds).height() - scrollMarginY])
  		});
  });  
  this.contentSlider.bindToMouseWheel(this.scrollBounds);
  
}

scanGallery.prototype.restyle = function(){
	
}
