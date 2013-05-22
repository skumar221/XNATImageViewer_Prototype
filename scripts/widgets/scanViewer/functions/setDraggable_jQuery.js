//******************************************************
//  
//
//******************************************************
scanViewer.prototype.setDraggable_jQuery = function(){
	
	
	$(this.widget).draggable({
		
		
		start: function(){
			
			var viewers = $(this.parentNode.childNodes);

			for (var i=0; i<viewers.length; i++){
				
				if ((viewers[i].id.indexOf("ScanViewer")>-1)){
					
					var vPos = $(viewers[i]).position();
					viewers[i].originTop = vPos.top;
					viewers[i].originLeft = vPos.left;
					
				}
			}
		},
		
		drag: function(){
			
			var viewers = $(this.parentNode.childNodes);
			
			var currPos = $(this).position();
			
			for (var i=0; i<viewers.length; i++){
				
				if (viewers[i] != this && (viewers[i].id.indexOf("ScanViewer")>-1)){
					
					var vPos = $(viewers[i]).position();
					var vHeight = $(viewers[i]).height();
					var vWidth = $(viewers[i]).width();
					var vArea = vHeight * vWidth;

							
					var currArea = (vWidth - Math.abs(currPos.left - vPos.left)) * (vHeight - Math.abs(currPos.top - vPos.top));
					
					if ((currArea/vArea) > .6){

			
						var w = this;

						$(viewers[i]).stop().animate({
							
							top: w.originTop,
							left: w.originLeft
							
						}, 100, function(){

							w.originTop = this.originTop;
							w.originLeft = this.originLeft;	
					
						});
						

						


					}			
				}
			}
		},
		stop: function(){

			$(this).stop().animate({
				
				top: Math.round(this.originTop),
				left: Math.round(this.originLeft),
				
				}, 100, function(){	
					
					//
					//  Cleanup custom attributes
					//
					var viewers = $(this.parentNode.childNodes);	
					for (var i=0; i<viewers.length; i++){
	
						if (viewers[i].originTop){
							viewers[i].originTop= undefined;
						}
						if (viewers[i].originLeft){
							viewers[i].originLeft= undefined;
						}																					
						
					}  	
			});				
			
		}
	});
}