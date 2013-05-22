//******************************************************
//  Expand button
//
//******************************************************
xmiv.prototype.addVerticalExpandButton = function(rowPos, colPos){
	var that = this;

//	console.log("*************************add Vertical!")
	if (!this.verticalExpandButtons) {this.verticalExpandButtons = []};
	
	//-------------------------
	// The button CSS
	//-------------------------
	var currButton = __makeElement__("button", this.modal, this.args.id + "_verticalExpandButton", {
		position: "absolute",
		"color": "rgba(255,255,255,1)",
		"font-size": 18,
		"font-weight": "bold",
		"cursor": "pointer",
		"border": "solid rgba(255, 255, 255, 0) 0px",
		"border-radius": 0,
		backgroundColor: "rgba(70, 70, 70, 1)",
		zIndex: 100
	})	

		
	this.verticalExpandButtons.push(currButton);

	
	//-------------------------
	// Its natural state -- slightly faded
	//-------------------------
	$(currButton).fadeTo(0, .5);
	//-------------------------
	// What do do when the mouse leaves
	//-------------------------		
	$(currButton).mouseenter(function(){
	  $(currButton).stop().fadeTo(200, .8);
	}).mouseleave(
		function(){ 
			if (that.changeState != "expanding"){
				$(currButton).stop().fadeTo(200, .5);
			}			
    });

	
	
	//-------------------------
	// Its inner text
	//-------------------------			
	currButton.innerHTML = "+";



	//-------------------------
	// Button onlclick
	//-------------------------		
	currButton.onclick = function(){ 
		that.addRow(that.verticalExpandButtons.indexOf(this)); 
	}	
}
