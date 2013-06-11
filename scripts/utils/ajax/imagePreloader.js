utils.ajax.imagePreloader = function(){

	var queue = [];
	
	function loadNextImage(appendArr) {
		if (imgQueue.length > 0) {
			var imgN = new Image();
			imgN.src = imgQueue.shift();
			$(imgN).load(function(){
			    appendArr.push(imgN)
			    loadNextImage();
			});
		}
	}
	
	function addToQueue(src) {
		
		//
		// Check for duplicates
		//
		var ind = queue.indexOf(src); 
		if (ind > -1) {
			queue.splice(ind, 1)
		}
		
		//
		// Add to top of heap
		//
		queue.unshift(src);
	}
	
}
