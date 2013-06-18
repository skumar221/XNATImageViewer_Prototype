//******************************************************
//  Expand button
//
//******************************************************
XNATViewer.prototype.addColumnMenu = function () {

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
		
		$(button).click(function () {
			$(this).stop().fadeTo(GLOBALS.animFast, .5);
			args.onclick();
		})	
		
		
	}

	makeButton({
		id : "InsertColumnButton", 
		src:  "./icons/Arrows/insertColumnArrow.png", 
		top: 0,
		title: "Insert Column",
		onclick: function () { 
			XV.Viewers({"insert" : "column"}); 
		}	
	});

	makeButton({
		id : "RemoveColumnButton", 
		src:  "./icons/Arrows/removeColumnArrow.png",
		top: 22,
		title: "Remove Column",
		onclick: function () { 
			XV.Viewers({"remove" : "column"});  
		}	
	});
}
