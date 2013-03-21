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
	_css: {
		position: "fixed",
		height: "100%",
		width: "100%",
		backgroundColor: "rgba(0,0,0,.8)",
		"overflow-x": "hidden",
		"overflow-y": "hidden",
		"display": "inline-block",
		"font-family": 'Helvetica,"Helvetica neue", Arial, sans-serif',
	},
	_modalcss: {
		//"min-height": "600px",
		//"min-width": "300px",
		position: "absolute",
		height: "80%",
		backgroundColor: "rgba(0,0,0,1)",
		border: "solid rgba(95, 95, 95, 1) 1px",
		"border-radius": "0px"
		
	}
}


var minModalWidth_C = function(){
	
	var minPx = 550;
	var pctCompressed = .6;
	var currPx = (pctCompressed * window.innerWidth);
	
	var retVal =  (currPx < minPx) ?  ((minPx/window.innerWidth)) : (pctCompressed);
	//console.log("retVal_C: " + retVal)
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
	
	var minPx = 650;
	var pctCompressed = .8;
	var currPx = (pctCompressed * window.innerHeight);
	
	var retVal =  (currPx < minPx) ?  ((minPx/window.innerHeight)) : (pctCompressed);
	//console.log("retVal_H: " + retVal)
	return retVal;
}

var XNATModalImageViewer = function(args){
	var that = this;
	
	__init__(this, defaultArgs_XNATModalImageViewer, args, function(){	
		
		//----------------------------------
		//	WIDGET
		//----------------------------------			
		that.widget.onclick = function(){ 
			that.destroy();
		}	
		
		
		//----------------------------------
		//	MODAL
		//----------------------------------
		that.modal = makeElement("div", that.widget, that.args.id + "_modal", that.args._modalcss);	
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
		
		
		//----------------------------------
		//	CLOSE BUTTON
		//----------------------------------
		that.closeButton = makeElement("img", that.widget, that.args.id + "_closeIcon", {
			position: "absolute", 
			cursor: "pointer",
			width: 30,
			height: 30,
			"backgroundColor": "rgba(0,0,0,0)"
		});	
		that.closeButton.src = "./icons/closeButton.png";
		
		
		//----------------------------------
		//	SCAN GALLERY
		//----------------------------------
		that.scanGallery = new scanGallery({
			parent: that.modal
		});	
		
		
		//----------------------------------
		//	SCAN VIEWER LEFT
		//----------------------------------	
		that.scanViewer_left;// = new scanFrameViewer()
		
		
		//----------------------------------
		//	SCAN VIEWER RIGHT
		//----------------------------------	
		that.scanViewer_right;// = new scanFrameViewer()
		
		//----------------------------------
		//	COMPARE BUTTON
		//----------------------------------	
		that.createCompareButton();
	});
}

XNATModalImageViewer.prototype.modalDims = function(conversion){
		
	var _w = (this.args.expanded) ? minModalWidth_E() : minModalWidth_C();
	var _h = minModalHeight();
	

	var _l = (window.innerWidth * (1-_w))/2;	
	_l = (_l > this.args.minLeft) ? _l : this.args.minLeft;	
	_l = _l/window.innerWidth;

	var _t = (window.innerHeight * (1-_h))/2;	
	_t = (_t > this.args.minTop) ? _t : this.args.minTop;	
	_t = _t/window.innerHeight;
	
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

XNATModalImageViewer.prototype.restyle = function(){

	//----------------------------------
	//	MODAL
	//----------------------------------
	var modalDims = this.modalDims();
	//console.log(modalDims)
	$(this.modal).css(modalDims["pctStr"]);
	
	
	//----------------------------------
	//	CLOSE BUTTON
	//----------------------------------
	var buttonW = _i(this.closeButton.style.width);
	var buttonL = ((modalDims["px"]["width"] + modalDims["px"]["left"] - buttonW/2));
	//console.log(buttonL)
	$(this.closeButton).css({
		left: buttonL,
		top: modalDims["px"]["top"]- $(this.closeButton).height()/2,
		opacity: .9
	})

	//----------------------------------
	//	COMPARE BUTTON
	//----------------------------------
	$(this.compareButton).css({
		left:  (modalDims["px"]["width"] - _i(this.compareButton.style.width)),
		top: 0,
		height: "100%",
	})	
	
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

XNATModalImageViewer.prototype.createCompareButton = function(){
	var that = this;
	
	that.compareButton = makeElement("button", that.modal, that.args.id + "_compareButton", {
		position: "relative",
		"color": "rgba(255,255,255,1)",
		"font-size": 10,
		"cursor": "pointer",
		"border": "solid rgba(255, 255, 255, 0) 0px",
		"border-radius": 2,
		backgroundColor: "rgba(70, 70, 70, 1)",
		width: "20px",
	});
	
	
	$(that.compareButton).fadeTo(0, .7);
	
	var bindMouseLeave = function(){	
		$(that.compareButton).mouseover(function(){
		  $(that.compareButton).stop().fadeTo(200, 1);
		}).mouseleave(
			function(){ 
				if (that.changeState != "expanding"){
					$(that.compareButton).stop().fadeTo(200, .7);
				}			
	    });
	}
	
	that.compareButton.innerHTML = (this.args.expanded) ? "<<" : ">>";
	bindMouseLeave();
	
	that.compareButton.onclick = function(){
		 
		 $(that.modal).stop();
		 $(that.closeButton).stop();
		 $(that.compareButton).stop().unbind('mouseleave');
		 $(that.compareButton).stop().unbind('mouseover');
		 //$(that.compareButton).stop()
		 
		 that.changeState = "expanding";
		 
		 var inner = ">>";
		 var changePct= minModalWidth_C();
		// var closeButtonLeft = 
		
		 if (!that.args.expanded){
		 	inner = "<<";
		 	changePct= minModalWidth_E();
		 }
		 
		 that.compareButton.innerHTML = inner; 
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
		 

		 $(that.compareButton).stop().animate({
		 	opacity: .5,
		    left: (changePct*window.innerWidth - _i(that.compareButton.style.width)),
		  }, animLen, function() {
		    // Animation complete.
		 });

		 that.args.expanded = !that.args.expanded;
		 
		 //console.log("EXPANDED: " + that.args.expanded)
 	}
}



