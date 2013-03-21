function onloadOld(){
		
	frameSlider = new modSlider({
		id: "frameSlider", 
		value: 50,
		max: 100,
		min: 0,
		constrainMargin : 0,
		borderWidth_slider : 1,
		borderWidth_handle : 1,
		top : 327,
		left : 10,
		height : 7,
		width : 297,
		height_handle : 5,
		width_handle : 25,
		borderRadius_slider : 3,
		borderRadius_handle : 4,
	});
	
	frameSlider.styleBind = function(label, value){
		this.args[label] = value;
		this.restyle();
	}  
  
  var _frameViewer = new frameViewer();  
  _frameViewer.addOnloadCallback(function(){
  	  frameSlider.adjustSliderDims({
  	  	min: 0, 
  	  	max: _frameViewer.frames.length-1,
  	  	value: Math.round(_frameViewer.frames.length/2),
  	  	step: 1
  	  })
  	  frameSlider.addSlideFunction(function(_slider){  		
  		var subtractor = (_slider.args["sliderMin"] > 0) ? _slider.args["sliderMin"] : 0;
  		_frameViewer.drawFrame(_slider.currValue-subtractor, true); 
	  });
	  frameSlider.bindToMouseWheel(_frameViewer.widget);
  });
  
  contrastSlider = new modSlider(mergeArgs(frameSlider.args,{id: "constrastSlider", top: 350, min:1, max: 50, value:1, step: 1, "sliderBGColor":"rgba(0, 180, 60, .9)" }));
  contrastSlider.addSlideFunction(function(_slider){  		
  		_frameViewer.imageAdjust("contrast", _slider.currValue);
  });
  
  brightnessSlider = new modSlider(mergeArgs(frameSlider.args,{id: "brightnessSlider", top: 375, min:0, max: 255, value:0, step: 1, "sliderBGColor":"rgba(180, 0, 60, .9)" }));
  brightnessSlider.addSlideFunction(function(_slider){
  		_frameViewer.imageAdjust("brightness", _slider.currValue);
  });  
  
  
   /*
	var sliderSetArgs = {
		id: frameSlider.args.id + "_styleSliderSet",
		_css:{
				"top": 20,
				"left": 500,		
			  }
	}

	var ss = new sliderSet(sliderSetArgs, [		
		{id:"constrainMargin",	 	min: 0, max: 40, step: 1, value: 0},
		{id:"borderWidth_slider", 	min: 0, max: 40, step: 1, value: 1},
		{id:"borderWidth_handle", 	min: 0, max: 40, step: 1, value: 1},
		{id:"top", 					min: 0, max: 1000, step: 1, value: 327},
		{id:"left", 				min: 0, max: 1000, step: 1, value: 10},
		{id:"height", 				min: 0, max: 600, step: 1, value: 10},
		{id:"width", 				min: 0, max: 600, step: 1, value: 300},
		{id:"height_handle",		min: 0, max: 600, step: 1, value: 20},
		{id:"width_handle", 		min: 0, max: 600, step: 1, value: 20},
		{id:"borderRadius_slider", 	min: 0, max: 40, value:0},
		{id:"borderRadius_handle", 	min: 0, max: 40, value:0},
	]);    
	*/
	
		  /* Slider Set  for (var j=0;j<ss.sliders.length;j++){  	var sl = ss.sliders[j];  	sl.addSlideFunction(function(_slider){	  	contentSlider.args[_slider.args["corollary"]] = _slider.currValue;	  	contentSlider.restyle();	}, contentSlider.args[sl.args["corollary"]]);  }  */
  
  
  var sTabs = new scanTabs();
  
}


window.onload = function(){
	var XNATModal = new XNATModalImageViewer();
}