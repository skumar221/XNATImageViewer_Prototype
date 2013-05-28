//******************************************************
//  Update CSS.
//
//******************************************************
function regenerateButtons(buttonList, newLen, callback) {

	for (var i in buttonList) {
		
		var b = buttonList[i];
		$(b).remove();
		
	}

	callback();		
}



//******************************************************
//  
//
//******************************************************
XMIV.prototype.regenerateExpandButtons_Horiz = function (newLen) {
	
	var that = this;
	
	regenerateButtons(this.horizontalExpandButtons, newLen, function () {
		
		that.horizontalExpandButtons = [];
		
		for (var i=0;i<newLen; i++) {
			
			that.addHorizontalExpandButton();		
			
		}
	});		
}



//******************************************************
//  
//
//******************************************************
XMIV.prototype.regenerateExpandButtons_Vert = function (newLen) {
	
	var that = this;
	
	regenerateButtons(this.verticalExpandButtons, newLen, function () {
		
		that.verticalExpandButtons = [];
		
		for (var i=0;i<newLen; i++) {
			
			that.addVerticalExpandButton();		
			
		}
	});	
}
