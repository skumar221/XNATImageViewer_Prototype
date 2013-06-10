utils.gui.progressBar = function (parent, args) {
	
	var progBar = {};
	
	progBar.widget = utils.dom.makeElement("div", parent, "ProgressWidget", {});
	

	progBar.label = utils.dom.makeElement("div", progBar.widget, "ProgressBar_Label", {
		fontFamily: GLOBALS.fontFamily,
		color: "rgba(255,255,255)",
		fontSize: GLOBALS.fontSizeMed,
	});
	progBar.label.innerHTML = "Loading..."
	

	progBar.bar = utils.dom.makeElement("div", progBar.widget, "ProgressBar", {
		height: 10,
		borderRadius: "none"
	});	
	$(progBar.bar).progressbar();
	
	progBar.update = function(args) {
	
		var isClear = (args["clear"]) ? args["clear"] : false;
		var isMax = (args["max"]) ? args["clear"] : false;
		var isAdd = (args["add"]) ? args["add"] : false;		
		var isLabel = (args["label"]) ? args["label"] : false;		
				
		if (isClear){
			$(progBar.bar).progressbar("option", "value", 0 );
		}
		
		if (isMax){
			$(progBar.bar).progressbar("option", "max", args["max"] );
		}
		
		if (isAdd){
			$(progBar.bar).progressbar("option", "value", $(progBar.bar).progressbar( "option", "value" ) + 1);
		}
		
		if (isLabel){
			progBar.label.innerHTML = args["label"];
		}		
		
	}
	
	progBar.hide = function(){
		$(progBar.widget).fadeOut(0);
	}
	
	progBar.show = function(){
		$(progBar.widget).fadeIn(0);
	}
	
	
	return progBar;
}