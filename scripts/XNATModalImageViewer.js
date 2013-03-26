defaultArgs_XNATModalImageViewer = {
	id: "XNATModalImageViewer",
	layout: "all_columns",
	numViewers: 1,
	parent: document.body,
	minLeft: 50,
	minTop: 20,
	compressWidth: .33,
	expandWidth: .9,
	expanded: true,
	gutter: 10,
	marginWidth: 50,
	marginTop: 10,
	expandButtonWidth: 30,
	_css: {
		position: "fixed",
		height: "100%",
		width: "100%",
		backgroundColor: "rgba(0,0,0,.95)",
		"overflow-x": "hidden",
		"overflow-y": "hidden",
		"display": "inline-block",
		"font-family": 'Helvetica,"Helvetica neue", Arial, sans-serif',
	},
	_modalcss: {
		position: "absolute",
		backgroundColor: "rgba(0,0,0,1)",
		border: "solid rgba(95, 95, 95, 1) 1px",
		"border-radius": "0px"
		
		// for height mins and maxes, see below
	}
}


var minModalWidth_C = function(){
	
	var minPx = 400;
	var pctCompressed = .48;
	var currPx = (pctCompressed * window.innerWidth);
	
	var retVal =  (currPx < minPx) ?  ((minPx/window.innerWidth)) : (pctCompressed);
	
	return retVal;
}

var minModalWidth_E = function(){
	
	var minPx = 1000;
	var pctCompressed = .9;
	var currPx = (pctCompressed * window.innerWidth);
	
	var retVal =  (currPx < minPx) ?  ((minPx/window.innerWidth)) : (pctCompressed);
	//console.log("retVal_E: " + retVal)
	return retVal;
}

var maxModalWidth_C = function(){
	
	var minPx = 550;
	var pctCompressed = .6;
	var currPx = (pctCompressed * window.innerWidth);
	
	var retVal =  (currPx < minPx) ?  ((minPx/window.innerWidth)) : (pctCompressed);
	//console.log("retVal_C: " + retVal)
	return retVal;
}

var maxModalWidth_E = function(){
	
	var minPx = 1000;
	var pctCompressed = .9;
	var currPx = (pctCompressed * window.innerWidth);
	
	var retVal =  (currPx < minPx) ?  ((minPx/window.innerWidth)) : (pctCompressed);
	//console.log("retVal_E: " + retVal)
	return retVal;
}

var minModalHeight = function(){
	
	var minPx = 450;
	var pctCompressed = .88;
	var currPx = (pctCompressed * window.innerHeight);
	
	var retVal =  (currPx < minPx) ?  ((minPx/window.innerHeight)) : (pctCompressed);
	//console.log("retVal_H: " + retVal)
	return retVal;
}

var XNATModalImageViewer = function(args){
	var that = this;
	
	__Init__(this, defaultArgs_XNATModalImageViewer, args, function(){	
		
		//----------------------------------
		//	WIDGET
		//----------------------------------			
		that.widget.onclick = function(){ 
			that.destroy();
		}	
		
		
		//----------------------------------
		//	MODAL
		//----------------------------------
		that.modal = __MakeElement__("div", that.widget, that.args.id + "_modal", that.args._modalcss);	
		$(that.modal).css({
			"overflow-x": "hidden",
			"overflow-y": "hidden"
		})
		
		// Don't destroy when clicking on window (i.e. don't propagate)				
		that.modal.onclick = function(event, element) {
			  if (event.stopPropagation) {
			      event.stopPropagation();   // W3C model
			  } else {
			      event.cancelBubble = true; // IE model
			  }
		}
		that.updateCSS();
		
		//----------------------------------
		//	CLOSE BUTTON
		//----------------------------------
		that.closeButton = __MakeElement__("img", that.widget, that.args.id + "_closeIcon", {
			position: "absolute", 
			cursor: "pointer",
			width: 20,
			height: 20,
			zIndex: 103
		});	
		that.closeButton.src = "./icons/closeButton.png";
		
		//----------------------------------
		//	COMPARE BUTTON
		//----------------------------------	
		that.createExpandButton();
		
		
		//----------------------------------
		//	SCAN GALLERY
		//----------------------------------
		that.scanGallery = new scanGallery({
			parent: that.modal,
			_css: {
				left: that.args.gutter,
				top: that.args.marginTop
			}
		});	
		
		
		//----------------------------------
		//	SCAN VIEWER LEFT
		//----------------------------------	
		that.scanViewer_left = new scanViewer({
			parent: that.modal,
			id: "SCANVIEW_LEFT",
			_css:{
				left: $(that.scanGallery.widget).outerWidth() + that.args.marginWidth,
			}
		});
		
		
		//----------------------------------
		//	SCAN VIEWER RIGHT
		//----------------------------------	
		that.scanViewer_right = new scanViewer({
			parent: that.modal,
			id: "SCANVIEW_RIGHT",			
			_css:{
				left: $(that.scanViewer_left.widget).outerWidth()
					+ $(that.scanViewer_left.widget).position().left
					+ that.args.marginWidth,
			}
		});
  
  		
		//----------------------------------
		//	ADDING DROPZONES
		//----------------------------------			
		for (var i=0; i < that.scanGallery.thumbs.length; i++){
			that.scanGallery.thumbs[i].addDropZone(that.scanViewer_right.frameViewer);	
			that.scanGallery.thumbs[i].addDropZone(that.scanViewer_left.frameViewer);	
		}
		
	});
}

XNATModalImageViewer.prototype.modalDims = function(conversion){
		
	var _w = (this.args.expanded) ? minModalWidth_E() : minModalWidth_C();
	var _h = minModalHeight();
	

	var _l = (window.innerWidth * (1-_w))/2;	
	_l = (_l > this.args.minLeft) ? _l : this.args.minLeft;	
	_l = _l/window.innerWidth;

	/*
	var _t = (window.innerHeight * (1-_h))/2;	
	_t = (_t > this.args.minTop) ? _t : this.args.minTop;	
	_t = _t/window.innerHeight;
	*/
	
	var _t = .05;
	
	var pctObj =  {
		width: _w,
		left: _l,
		height: _h,
		top: _t
	}
	
	var pxObj =  {
		width: Math.round(_w * window.innerWidth),
		left: Math.round(_l * window.innerWidth),
		height: Math.round(_h * window.innerHeight),
		top: Math.round(_t * window.innerHeight),
	}
	
	
	var pctStrObj = {};
	for (key in pctObj){
		pctStrObj[key] = _pct(pctObj[key]);
	}
	
	var pxStrObj = {};
	for (key in pxObj){
		pxStrObj[key] = _px(pxObj[key]);
	}

	return{
		original: pctObj,
		pctStr: pctStrObj,
		pxStr: pxStrObj,
		px: pxObj
	}
}

XNATModalImageViewer.prototype.updateCSS = function(){

	//----------------------------------
	//	MODAL
	//----------------------------------
	this.modalDimensions = this.modalDims();
	//console.log(modalDims)
	$(this.modal).css(this.modalDimensions["px"]);
	
	
	//----------------------------------
	//	CLOSE BUTTON
	//----------------------------------
	if (this.closeButton){
		var buttonW = _i(this.closeButton.style.width);
		var buttonL = ((this.modalDimensions["px"]["width"] + this.modalDimensions["px"]["left"] - buttonW/2));
		//console.log(buttonL)
		$(this.closeButton).css({
			left: buttonL,
			top: this.modalDimensions["px"]["top"]- $(this.closeButton).height()/2,
			opacity: .9
		})		
	}
	
	
	//----------------------------------
	//	COMPARE BUTTON
	//----------------------------------
	if (this.expandButton){
		$(this.expandButton).css({
			left:  (this.modalDimensions["px"]["width"] - _i(this.expandButton.style.width)),
			height: "100%",
			top: 0,
		})			
	}	
	//console.log("-------------------")
}

XNATModalImageViewer.prototype.destroy = function(fadeOut){
	
	var fadeOut = (fadeOut) ? fadeOut: 200;
	
	//console.log("Destroying! " + this.args.id);
	
	var that = this;
	$(this.widget).fadeOut(fadeOut, function(){
		try{
			that.args.parent.removeChild(that.widget);			
		}
		catch(e){//do nothing
			}
	});

}

XNATModalImageViewer.prototype.createExpandButton = function(){
	var that = this;
	
	that.expandButton = __MakeElement__("button", that.modal, that.args.id + "_expandButton", {
		position: "absolute",
		"color": "rgba(255,255,255,1)",
		"font-size": 10,
		"cursor": "pointer",
		"border": "solid rgba(255, 255, 255, 0) 0px",
		"border-radius": 0,
		backgroundColor: "rgba(70, 70, 70, 1)",
		width: that.args.expandButtonWidth,
		zIndex: 100
	});
	
	
	$(that.expandButton).fadeTo(0, .7);
	
	var bindMouseLeave = function(){	
		$(that.expandButton).mouseover(function(){
		  $(that.expandButton).stop().fadeTo(200, 1);
		}).mouseleave(
			function(){ 
				if (that.changeState != "expanding"){
					$(that.expandButton).stop().fadeTo(200, .7);
				}			
	    });
	}
	
	that.expandButton.innerHTML = (this.args.expanded) ? "<<" : ">>";
	bindMouseLeave();
	
	that.expandButton.onclick = function(){
		 
		 $(that.modal).stop();
		 $(that.closeButton).stop();
		 $(that.expandButton).stop().unbind('mouseleave');
		 $(that.expandButton).stop().unbind('mouseover');
		 //$(that.expandButton).stop()
		 
		 that.changeState = "expanding";
		 
		 var inner = ">>";
		 var changePct= minModalWidth_C();
		// var closeButtonLeft = 
		
		 if (!that.args.expanded){
		 	inner = "<<";
		 	changePct= minModalWidth_E();
		 }
		 
		 that.expandButton.innerHTML = inner; 
		 var animLen = 500;

		 var modalW = window.innerWidth * changePct;		
		 $(that.modal).stop().animate({
		    width: _pct(changePct),
		    left: _pct((1-changePct)/2),
		  }, animLen, function() {
		    that.changeState = "normal";
		    bindMouseLeave();
		 });

		 $(that.closeButton).stop().animate({
		    left: _pct(changePct+ (1-changePct)/2 - (_i(that.closeButton.style.width)/2)/window.innerWidth),
		  }, animLen, function() {
		    // Animation complete.
		 });
		 

		 $(that.expandButton).stop().animate({
		 	opacity: .5,
		    left: (changePct*window.innerWidth - _i(that.expandButton.style.width)),
		  }, animLen, function() {
		    // Animation complete.
		 });

		 that.args.expanded = !that.args.expanded;
		 
		 //console.log("EXPANDED: " + that.args.expanded)
 	}
}



