//******************************************************
//  Expand button
//
//******************************************************
xmiv.prototype.addHorizontalExpandButton = function(){
	
//	console.log("*************************HORIZONTAL ADD!")
	var that = this;
	
	if (!this.horizontalExpandButtons){ this.horizontalExpandButtons = []};
	
	//-------------------------
	// The button CSS
	//-------------------------
	var hB = __makeElement__("button", this.modal, this.args.id + "_expandButton", {
		position: "absolute",
		"color": "rgba(255,255,255,1)",
		"font-size": 18,
		"font-weight": "bold",
		"cursor": "pointer",
		"border": "solid rgba(255, 255, 255, 0) 0px",
		"border-radius": 0,
		backgroundColor: "rgba(70, 70, 70, 1)",
		width: this.args.expandButtonWidth,
		zIndex: 100,
		//"vertical-align": "middle",
		//align: "middle"
	});
	this.horizontalExpandButtons.push(hB);
	
	
	
	//-------------------------
	// Its natural state -- slightly faded
	//-------------------------
	$(hB).fadeTo(0, .5);
	//-------------------------
	// What do do when the mouse leaves
	//-------------------------		
	$(hB).mouseover(function(){
	  $(hB).stop().fadeTo(200, .8);
	}).mouseleave(
		function(){ 
			if (that.changeState != "expanding"){
				$(hB).stop().fadeTo(200, .5);

			}			
    });

	
	
	//-------------------------
	// Its inner text
	//-------------------------			
	hB.innerHTML = "+";


	//-------------------------
	// Button onlclick
	//-------------------------		

	hB.onclick = function(){
//		console.log("ONCLICK")
		that.expandByColumn(that.horizontalExpandButtons.indexOf(this));
	}; 
}
