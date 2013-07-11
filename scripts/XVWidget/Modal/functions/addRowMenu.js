//******************************************************
//  Expand button
//
//******************************************************
Modal.prototype.addRowMenu = function (rowPos, colPos) {
	var that = this;

	this.RowMenu = utils.dom.makeElement("div", this.modal, "RowMenu", {
		position: "absolute",
		textAlign: "right",
		display: "inline-block",
		"vertical-align": "middle"
	});
	
	
	
	function makeButton(args) {

		//-------------------------
		// The button CSS
		//-------------------------

		var button = utils.dom.makeElement("img", that.RowMenu, args.id, {
			'position': "absolute",
			'cursor': 'pointer',
			'zIndex': 100,
			'height': utils.convert.px(GLOBALS.expandButtonWidth * .5),
			//'backgroundColor' : 'rgba(200,124,0, 1)',
			'top': utils.convert.px(GLOBALS.expandButtonWidth * .25),
			'textAlign': "right",
			'left': utils.convert.px(args.left)
		})	

	
	
		//
		// Its natural state -- slightly faded
		//
		utils.fx.fadeTo(button, 0, .5);	
		
		
		//
		// set UI
		//	
		goog.events.listen(button, goog.events.EventType.MOUSEOVER, function(event) { 
			utils.fx.fadeTo(button, GLOBALS.animFast, 1);
		});
		goog.events.listen(button, goog.events.EventType.MOUSEOUT, function(event) { 
			utils.fx.fadeTo(button, GLOBALS.animFast, .5);	
		});
			
		button.src = args.src;	
		button.title = args.title;

		goog.events.listen(button, goog.events.EventType.CLICK, function(event) { 
			utils.fx.fadeTo(button, GLOBALS.animFast, .5);
			args.onclick();
		});		
		
	}

	makeButton({
		id : "InsertRowButton", 
		src:  "./icons/Arrows/insertRowArrow.png", 
		left: 0,
		title: "Insert Row",
		onclick: function () { 
			XV.ViewerManager({"insert" : "row"}); 
		}	
	});

	makeButton({
		id : "RemoveRowButton", 
		src:  "./icons/Arrows/removeRowArrow.png",
		left: 23,
		title: "Remove Row",
		onclick: function () { 
			XV.ViewerManager({"remove" : "row"});  
		}	
	});

}
