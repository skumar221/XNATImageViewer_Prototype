//******************************************************
//  Expand button
//
//******************************************************
Modal.prototype.addColumnMenu = function () {

	var that = this;

	this.ColumnMenu = utils.dom.makeElement("div", this.modal, "ColumnMenu", {
		position: "absolute",
		textAlign: "right",
		display: "inline-block",
		bottom: "0px"
	});
	
	
	
	function makeButton(args) {

		//-------------------------
		// The button CSS
		//-------------------------
		var button = utils.dom.makeElement("img", that.ColumnMenu, args.id, {
			position: "absolute",
			"cursor": "pointer",
			zIndex: 100,
			width: utils.convert.px(GLOBALS.expandButtonWidth * .5),
			left: utils.convert.px(GLOBALS.expandButtonWidth * .25),
			top: utils.convert.px(args.top),
			"vertical-align": "bottom"
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
		id : "InsertColumnButton", 
		src:  "./icons/Arrows/insertColumnArrow.png", 
		top: 0,
		title: "Insert Column",
		onclick: function () { 
			XV.ViewerManager({"insert" : "column"}); 
		}	
	});

	makeButton({
		id : "RemoveColumnButton", 
		src:  "./icons/Arrows/removeColumnArrow.png",
		top: 22,
		title: "Remove Column",
		onclick: function () { 
			XV.ViewerManager({"remove" : "column"});  
		}	
	});
}
