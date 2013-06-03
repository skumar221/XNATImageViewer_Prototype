//******************************************************
//  Expand button
//
//******************************************************
XNATViewer.prototype.addRowMenu = function (rowPos, colPos) {
	var that = this;

	this.RowMenu = __makeElement__("div", this.modal, "RowMenu", {
		position: "absolute",
		textAlign: "right",
		display: "inline-block",
		"vertical-align": "middle",
	});
	
	
	
	function makeButton(args){

		//-------------------------
		// The button CSS
		//-------------------------
		var button = __makeElement__("img", that.RowMenu, args.id, {
			position: "absolute",
			"cursor": "pointer",
			zIndex: 100,
			height: GLOBALS.expandButtonWidth * .5,
			top: GLOBALS.expandButtonWidth * .25,
			textAlign: "right",
			left: args.left
		})	
	
		//-------------------------
		// Its natural state -- slightly faded
		//-------------------------
		$(button).fadeTo(0, .5);
		
		//-------------------------
		// What do do when the mouse leaves
		//-------------------------		
		$(button).mouseenter( function () {
			
			$(button).stop().fadeTo(GLOBALS.animFast, 1);
		
		}).mouseleave( function () { 
			
			$(button).stop().fadeTo(GLOBALS.animFast, .5);		
			
	    });
			
		button.src = args.src		
		button.title = args.title	
		
		$(button).click(function(){
			$(this).stop().fadeTo(GLOBALS.animFast, .5);
			args.onclick();
		})	
		
		
	}

	makeButton({
		id : "InsertRowButton", 
		src:  "./icons/Arrows/insertRowArrow.png", 
		left: 0,
		title: "Insert Row",
		onclick: function () { 
			XV.ScanViewers({"insert" : "row"}); 
		}	
	});

	makeButton({
		id : "RemoveRowButton", 
		src:  "./icons/Arrows/removeRowArrow.png",
		left: 23,
		title: "Remove Row",
		onclick: function () { 
			XV.ScanViewers({"remove" : "row"});  
		}	
	});

}
