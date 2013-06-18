//******************************************************
//  
//
//******************************************************
ScanViewer.prototype.setDraggable_jQuery = function () {

	
	$(this.widget).draggable( {
		
		
		start: function () {
			
			this.prevBorder = this.style.border;
			this.style.border = "solid 1px rgba(255,255,255,1)";
			
			XV.Viewers(function (ScanViewer) {
				ScanViewer.widget.origin  = $(ScanViewer.widget).position();									
			});


			
		},
		
		drag: function () {

			var viewers = $(this).collision(XV.Viewers("widgets"));
			
			for (var i = 0, len = viewers.length; i < len; i++) {				
				if (viewers[i] !== this) {
					
					var target = viewers[i];
					
					if( !$(target).is(':animated') ) {
						
						var targetPos = $(target).position();
						var targetArea = $(target).height() * $(target).width();
						var collisionDiv = $(this).collision(target, {as : "<div />"});	
						var collisionArea = $(collisionDiv).width() * $(collisionDiv).height()						

						//
						// SWAP
						//
						if ((collisionArea/targetArea) > .4) {
	
							var draggable = this;				
														
							var tempOrigin = draggable.origin;
							draggable.origin = target.origin;
							target.origin = tempOrigin;
							
							XV.Viewers({"swap" : [draggable, target]});	
							
							$(target).stop().animate({
								
								top: Math.round(target.origin.top),
								left: Math.round(target.origin.left)
		
								
							}, GLOBALS.animFast, function () { });
						}
											
					}			
				}
			}
		},
		stop: function () {

			$(this).stop().animate({
				
				top: Math.round(this.origin.top),
				left: Math.round(this.origin.left)
				
				}, GLOBALS.animFast, function () {	
					
					//
					//  Cleanup custom attributes
					//
					XV.Viewers( function (ScanViewer) { 
						if (ScanViewer.widget.prevBorder) {
							ScanViewer.widget.style.border = ScanViewer.widget.prevBorder;
						}						
					});
					
					XV.updateCSS();
			});				
			
		}
	});
}