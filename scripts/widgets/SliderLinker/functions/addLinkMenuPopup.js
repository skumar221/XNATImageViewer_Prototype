SliderLinker.prototype.addLinkMenuPopup = function (currViewer, message) {
	
	var that = this;
	
	this.takeSnapshot();
	this.lastViewerSelected = currViewer;
			
	this.setScanViewerClickListen(currViewer);

	var that = this;
	
	var messageVal = (typeof message === 'undefined') ?  "Select viewers to link. Click 'Done' when finished." : message;
	
	XV.ScanViewers( function(ScanViewer) { 
		ScanViewer.updateCSS();
	})	
	
	var b = new __dialogBox__({	  	
		buttons: ["DONE", "Cancel"],
		message: messageVal,
	  	widgetCSS: {
	  		fontFamily: __globals__.fontFamily,
	  		fontSize: __globals__.fontSizeM,
	  		color: "rgba(255,255,255,1)",
	  		border: "solid",
	  		borderWidth: 1,
	  		borderColor: "rgba(255,255,255,1)",
	  		backgroundColor: "rgba(0,0,0,1)",
	  		borderRadius: 0,
	  		zIndex: 10000,
	  	},
	  	
	  	buttonCSS: {
	  		height: __globals__.fontSizeM * 2,
	  		position: "absolute",
	  		border: "solid",
	  		color: "rgba(255,255,255,1)",	  		
	  		borderWidth: 1,
	  		borderColor: "rgba(255,255,255,1)",
	  		backgroundColor: "rgba(125,125,125,1)",
	  		borderRadius: 0,
	  		cursor: "pointer"
	  	},
  	});
	
	var popup = b.widget();	
	
	
	b.setButtonOnclick("done", function (event) {
		__stopPropagation__(event);

		$(popup).fadeOut(GLOBALS.animFast).remove();
		
		that.processGroups();
		
		XV.ScanViewers( function(ScanViewer) { 
			$(ScanViewer.widget).draggable({ disabled: false });
		})

		
	});


	b.setButtonOnclick("cancel", function (event) {
		__stopPropagation__(event);
		
		$(popup).fadeOut(GLOBALS.animFast).remove();
		
		that.cancel();
		
		XV.ScanViewers( function(ScanViewer) { 
			$(ScanViewer.widget).draggable({ disabled: false });
		})

	});

	
	XV.updateCSS();
	$(popup).fadeOut(0).fadeIn(GLOBALS.animFast);
	
	XV.ScanViewers( function(ScanViewer) { 
		$(ScanViewer.widget).draggable({ disabled: true });
	})
	
		
}