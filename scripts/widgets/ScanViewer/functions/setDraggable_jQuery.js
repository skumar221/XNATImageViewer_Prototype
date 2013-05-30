//******************************************************
//  
//
//******************************************************
ScanViewer.prototype.setDraggable_jQuery = function () {
	
	console.log("HERE2")
	
	$(this.widget).draggable( {
		
		
		start: function () {
			
			this.prevBorder = this.style.border;
			this.style.border = "solid 1px rgba(255,255,255,1)";
			
			var viewers = $(this.parentNode).find("div[id*=" + "ScanViewer" + "]");

			for (var i=0; i<viewers.length; i++) {
				viewers[i].origin  = $(viewers[i]).position();
			}
			
		},
		
		drag: function () {

			var viewers = $(this).collision("div[id*=" + "ScanViewer" + "]");
			
			for (var i=0; i<viewers.length; i++) {
				
				if (viewers[i] != this) {
					

					var targetArea = $(viewers[i]).height() * $(viewers[i]).width();;
					var collisionDiv = $(this).collision(viewers[i], {as : "<div />"});	
					var collisionArea = $(collisionDiv).width() * $(collisionDiv).height()
					
					
					//
					// SWAP
					//
					if ((collisionArea/targetArea) > .4) {

						var draggable = this;				
							
						$(draggable).draggable( "option", "disabled", true );
						
						$(viewers[i]).stop().animate({
							
							top: draggable.origin.top,
							left: draggable.origin.left,
							
						}, GLOBALS.animVeryFast, function () { 
							
							var tempOrigin = this.origin;
							this.origin = draggable.origin;
							draggable.origin = tempOrigin;
							
							$(draggable).draggable( "option", "disabled", false );
						});
						
						return;
					}			
				}
			}
		},
		stop: function () {

			$(this).stop().animate({
				
				top: Math.round(this.origin.top),
				left: Math.round(this.origin.left),
				
				}, GLOBALS.animFast, function () {	
					
					//
					//  Cleanup custom attributes
					//
					var viewers = $(this.parentNode.childNodes);	
					for (var i=0; i<viewers.length; i++) {
	
						/*
						if (viewers[i].origin) {
							viewers[i].origin = undefined;
						}
						*/													
						
						if (viewers[i].prevBorder){
							viewers[i].style.border = viewers[i].prevBorder;
						}
							
					}  	
			});				
			
		}
	});
}