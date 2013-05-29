//******************************************************
//  Expand button
//
//******************************************************
XMIV.prototype.addHorizontalExpandButton = function () {
	
//	console.log("*************************HORIZONTAL ADD!")
	var that = this;
	
	if (!this.horizontalExpandButtons) { this.horizontalExpandButtons = []};
	
	//-------------------------
	// The button CSS
	//-------------------------
	var currButton = __makeElement__("button", this.modal, "HorizontalExpandButton", {
		position: "absolute",
		"color": "rgba(255,255,255,1)",
		"font-size": GLOBALS.fontSizeMed,
		fontFamily: GLOBALS.fontFamily,
		//"font-weight": "bold",
		"cursor": "pointer",
		"border": "solid rgba(255, 255, 255, 0) 0px",
		"border-radius": 0,
		//backgroundColor: "rgba(70, 70, 70, 1)",
		backgroundColor: "rgba(0, 0, 0, 0)",
		width: this.args.expandButtonWidth,
		zIndex: 100,
		"-webkit-transform": "rotate(90deg)",
		"-moz-transform": "rotate(90deg)",   
		"-o-transform": "rotate(90deg)",
		//"vertical-align": "middle",
		//align: "middle"
		//width: 500,
	});
	this.horizontalExpandButtons.push(currButton);
	
	
	
	//-------------------------
	// Its natural state -- slightly faded
	//-------------------------
	$(currButton).fadeTo(0, .5);
	//-------------------------
	// What do do when the mouse leaves
	//-------------------------		
	$(currButton).mouseenter(function () {
	  $(currButton).stop().fadeTo(200, .8);
	}).mouseleave( function () { 
		
		//if (that.changeState != "expanding") {
			
			$(currButton).stop().fadeTo(200, .5);
		
		//}			
    });

	
	
	//-------------------------
	// Its inner text
	//-------------------------			
	currButton.innerHTML = "+ column";


	//-------------------------
	// Button onlclick
	//-------------------------		

	currButton.onclick = function () {
		$(currButton).stop().fadeTo(200, .5);
		that.addColumn(that.horizontalExpandButtons.indexOf(this));
	}; 
}
