utils.ajax.imagePreloader = function(){

	var that = this;
	var primaryQueue = [];
	var backgroundQueue = [];
	
	function loadBG(args) {
		var primaryDone = primaryQueue.length == 0;
		var backgroundDone = backgroundQueue.length == 0;

		if (primaryDone && backgroundDone) {
			//utils.dom.debug("All downloads complete.");
			return;
		}
				
		else if (primaryDone && !backgroundDone)	{
			utils.dom.debug("DOWNLOADING BG: " + backgroundQueue.length + " left.")
			that.loadNextImage(args); 
		}		
	}
	
	this.loadNextImage = function (args) {
		
		var primaryDone = primaryQueue.length == 0;
		var backgroundDone = backgroundQueue.length == 0;
		
		 
		if (!primaryDone || !backgroundDone) {
			
			var imgN = new Image();
			
			if (!primaryDone) {
				imgN.src = primaryQueue.shift();
				that.loadNextImage(args); 
			}
			else if (primaryDone && !backgroundDone) {
				imgN.src = backgroundQueue.shift();
			}
			
			imgN.onload = function(){
				
				var img = this;

				if (args["onload"]) { 
					
					$.when( args["onload"](img) ).then ( function() {  loadBG(args); })
					
				} 
				else {
					loadBG(args);			
				}
			};
		}
	}
	
	function addToQueue (arg1, queue) {	

		var isArray = arg1 instanceof Array;
		var isString = typeof arg1 === 'string';
		
		function addVal(val){
			// Check for duplicates
			var ind = queue.indexOf(val); 
			if (ind > -1) {
				queue.splice(ind, 1)
			}		
			// Add to top of heap

			queue.unshift(val);
				
		}
		
		
		if (isArray) {

			for (var i=0; i<arg1.length; i++) {
				addVal(arg1[i]);
			}

		}
		
		
		else if (isString) {
			addVal(arg1)
		}

	}
	
	this.addToBackgroundQueue = function (arg1) {	

		addToQueue(arg1, backgroundQueue)

	}
	
	this.addToPrimaryQueue = function (arg1) {	

		addToQueue(arg1, primaryQueue)

	}
	
}
