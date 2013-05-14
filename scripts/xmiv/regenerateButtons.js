function regenerateButtons(buttonList, newLen, callback){
//	console.log("REMOVE AND REGEN: ", callback)
	// Remove element from modal
	for (var i=0; i<buttonList.length; i++){
		var b = buttonList[i];
		$(b).remove();
	}
	// Regenerate
	//console.log("newLen: ", newLen, buttonList.length)
	//console.log("VLENA: ", this.verticalExpandButtons.length, buttonList.length)

		//console.log("I: " , i)
		callback();
		//console.log("VLEN: ", that.verticalExpandButtons.length)
		
}


xmiv.prototype.regenerateExpandButtons_Horiz = function(newLen){
	regenerateButtons(this.horizontalExpandButtons, newLen, function(){
		that.horizontalExpandButtons = [];
		for (var i=0;i<newLen; i++){
			that.addHorizontalExpandButton();		
		}
	});		
}

xmiv.prototype.regenerateExpandButtons_Vert = function(newLen){
	var that = this;
	regenerateButtons(this.verticalExpandButtons, newLen, function(){
		that.verticalExpandButtons = [];
		for (var i=0;i<newLen; i++){
			that.addVerticalExpandButton();		
		}
	});	
}
