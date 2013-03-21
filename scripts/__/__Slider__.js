/*
jQuery Slider has been painful to edit, so 
it necessitates that one create their own.
Here goes...
*/



var defaultArgs__Slider__ = {
	id: "__Slider__",
	parent: document.body,
	orientation: 'horizontal',
	min: 0,
	max: 100,
	step: 1,
	value: 50,
	margin: 20,
	longSide: 500,
	shortSlide: 10,
	_css:{
		position: "absolute",
		backgroundColor: "rgba(200, 10, 10, 1)",
		border: "solid",
		borderWidth: 1,
		borderColor: "rgba(255,255,100, 1)",
		borderRadius: 4,
		"overflow-x" : "visible",
		"overflow-y" : "visible",
		cursor: "pointer",
	},
	_handlecss:{
		position: "absolute",
		height: 40,
		width: 10,
		backgroundColor: "rgba(200, 200, 200, 1)",
		border: "solid",
		borderWidth: 1,
		borderColor: "rgba(0,205,50, .5)",
		borderRadius: 4,
	}
}


var __Slider__ = function(args){
	 var that = this;
	 __Init__(this, defaultArgs__Slider__, args, function(){
			 		
			 that.mouseDown = false;
			 that.value = that.args.value;
			 
			 //--------------------------------
			 //	HANDLE init
			 //--------------------------------
			 that.handle = __MakeElement__("div", that.widget, that.args.id + "_handle", that.args._handlecss);
			 
			 
			 //--------------------------------
			 //	MOUSEDOWN ON HANDLE
			 //--------------------------------
			 /*
			 that.handle.onmousedown = function(event){
				  if (event.stopPropagation) {
				      event.stopPropagation();   // W3C model
				  } else {
				      event.cancelBubble = true; // IE model
				  }
				 that.mouseDownOnHandle = true;
			 }
			 that.handle.onmouseup = function(event){
			 	console.log("mouseUp");
			 	   if (event.stopPropagation) {
				      event.stopPropagation();   // W3C model
				  } else {
				      event.cancelBubble = true; // IE model
				  }
			 	 that.mouseDownOnHandle = false;
			 }
			 */
			 /*
			 that.handle.onmousemove = function(){
			 	 if (that.mouseDownOnHandle){
			 	 	console.log("HAHA");
			 	 }
			 }
			 */
			 
			 //--------------------------------
			 //	MOUSEDOWN ON SLIDER
			 //--------------------------------
			 that.widget.onclick = function(e){	 	
				if (that.mouseDown){
				 	var layerPos = layerMouseClick(e);
				 	that.setValue_bymouse(layerPos)			
				}
			 }
			 
			 that.widget.onmousemove = function(e){	 	
				if (that.mouseDown){
				 	var layerPos = layerMouseClick(e);
				 	that.setValue_bymouse(layerPos)			
				}
			 }
			 
			 that.widget.onmousedown = function(e){	 	
				that.mouseDown = true;
				that.widget.onmousemove(e);
			 }
			 that.widget.onmouseup = function(e){	
			 	console.log("MOUSEUP!") 	
				that.mouseDown = false;
			 }
		}
	 );

	//setInterval(that.setValue,100);
}

__Slider__.prototype.addSlideMethod = function(method){
	for (var i=0;i<this.slideMethods.length;i++){
		if (method == this.slideMethods[i]){
			return;
		}
	}
	this.slideMethods.push(method);	
}


 //--------------------------------
 //	SET VALUE BY MOUSE POSITION
 //
 // Remaps the mouse click on the slider to a 
 // value within the [this.args.min,this.args.max] domain.
 //--------------------------------
__Slider__.prototype.setValue_bymouse = function(pos){
	//console.log(this.handle.style.left)
	var that = this;
	if (pos){
		if (this.args.orientation == "horizontal"){
			var d1 = [that.args.margin, (that.widget.offsetWidth - that.args.margin - that.handle.offsetWidth)];
			var left = _remap1D(pos.x, d1, [this.args.min, this.args.max]);
			that.value = left.newVal;
			
			if (left.adjOld == that.args.margin){
				/*
				console.log("************");
				console.log("DOMAIN: " + d1);
				console.log("pos: " + pos.x)
				console.log(this.args.margin);
				console.log($(this.widget).outerWidth());
				console.log(this.handle.offsetWidth);
				console.log(that.handle.style.left)		
				*/
				if(Math.abs(that.currPos - left.adjOld) > 20)
					return;
			}
			that.handle.style.left = _px(left.adjOld);	

		  	
		  	that.currPos = left.adjOld;

	 	}
	 	else if (this.args.orientation == "vertical"){
	 		var d1 = [that.args.margin, (that.widget.offsetHeight - that.args.margin - that.handle.offsetHeight)];
	 		var top = _remap1D(pos.y, d1, [this.args.min, this.args.max]);
	 		that.value = top.newVal;
		 	that.handle.style.top = _px(top.adjOld);
		 	that.currPos = top.adjOld;
	 	}	
	}
	else{
		/*
		console.log("NO POS!")
		if (this.args.orientation == "horizontal"){
			that.handle.style.left = _px(that.currPos);
	 	}
	 	else if (this.args.orientation == "vertical"){
		 	that.handle.style.top = _px(that.currPos);
	 	}
	 	*/	
		
	}
}

 //--------------------------------
 //	SET VALUE BY PCT
 //
 // This is basically a reverse of the above function
 // where a user would input a number based on the max, min
 // values of the slider, and the mouse would move to
 // the outputted location.
 //--------------------------------
__Slider__.prototype.setValue = function(val){
	
	if (!val){
		val = this.value;
	}
	if (this.args.orientation == "horizontal"){
		console.log(this.widget.style.width);
		var d1 = [this.args.margin, (this.widget.offsetWidth - this.args.margin - this.handle.offsetWidth)];
		console.log("domain: " + d1);
		console.log("val: " + val)
		console.log("margin: " + this.args.margin);
		console.log("widgetWidth: " + $(this.widget).outerWidth());
		console.log("handleWidth: " + this.handle.offsetWidth);
		var left = _remap1D(val, [this.args.min, this.args.max], d1);
		this.value = left.adjOld;
		console.log("LEFT: " + left.newVal)
		this.handle.style.left = _px(left.newVal);
 	}
 	else if (this.args.orientation == "vertical"){
 		var d2 = [this.args.margin, (this.widget.offsetHeight - this.args.margin - this.handle.offsetHeight)];
 		var top = _remap1D(val, [this.args.min, this.args.max], d2);
 		console.log(d2)
 		this.value = top.adjOld;
 		console.log("TOP: " + top.newVal)
	 	this.handle.style.top = _px(top.newVal);
 	}
}

__Slider__.prototype.restyle = function(){

	if (this.handle){

		 //--------------------------------
		 //	horiz
		 //--------------------------------	
		if (this.args.orientation == "horizontal"){
			
			 //--------------------------------
			 //	WIDGET
			 //--------------------------------			
			$(this.widget).css({
				height: this.args.shortSide,
				width: this.args.longSide
			});

			//--------------------------------
			 //	HANDLE
			 //--------------------------------	
			$(this.handle).css({
				left: - this.args._css.borderWidth,
				top: - this.args._css.borderWidth - this.handle.offsetHeight/2 + this.widget.offsetHeight/2,
			});
			
			
		}
		
		 //--------------------------------
		 //	vert
		 //--------------------------------		
		else if (this.args.orientation == "vertical"){
			
			 //--------------------------------
			 //	WIDGET
			 //--------------------------------				
			$(this.widget).css({
				height: this.args.longSide,
				width: this.args.shortSide,
			});
			
			
			//--------------------------------
			 //	HANDLE
			 //--------------------------------	
			$(this.handle).css({
				left: -this.args._css.borderWidth - this.handle.offsetWidth/2 + this.widget.offsetWidth/2,
				//top: -this.args._css.borderWidth,
			});		
			
		}
	}
	this.setValue();
}
