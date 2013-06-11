ScanThumbnail.prototype.asyncLoad = function (args) {

	var that = this;
	var priorityViewPlane = (args["priority"]) ? args["priority"] : "sagittal";
	var pFrames;
	var rFrames;

	/*
	 function loadNextImage() {
    if (imgQueue.length > 0) {
        var imgN = new Image();
        imgN.src = imgQueue.shift();
        $(imgN).load(function(){
            $("#main").append(imgN);
            loadNextImage();
        });
    }
}
	 */
	
	this.sagittalFrames_preloaded = [];
	this.coronalFrames_preloaded = [];
	this.transverseFrames_preloaded = [];

	function loadSet(set, args) {

		if (args && args["start"]) {
			args["start"](set);
		}
		
		var counter = 0;
		var imgArr = [];
		
		for (var i=0; i<set.length; i++) {
			var img = new Image();
			img.src = set[i];
			imgArr.push(img);
			
			img.onload = function () { 
				counter++;
				
				if (counter ==set.length) {
					setPreloaded(set, imgArr);
					
					if (args && args["finish"]) {
						args["finish"]();
					}
				}
				else {
					if (args && args["during"]) {
						args["during"]();
					}
				}	
			}
		}
	}
	
	function preLoad(pSet, uSet, args) {
		
		var tempFinish = (args && args["finish"]) ? args["finish"] : function () {};
		args["finish"] = function() {
			tempFinish();
			loadSet(uSet[0], {
				"finish" : function() {loadSet(uSet[1])}
			});
		}
		loadSet(pSet, args);
		
	}
	
	
	function setPreloaded(sources, imageArr) {
		if (sources[0] == that.sagittalFrames[0]) {
			that.sagittalFrames_preloaded = imageArr;
		}
		else if (sources[0] == that.coronalFrames[0]) {
			that.coronalFrames_preloaded = imageArr;
		}
		else if (sources[0] == that.transverseFrames[0]) {
			that.transverseFrames_preloaded = imageArr;
		}
	}
	
	
	switch(priorityViewPlane)
	{
		case 'sagittal':
			preLoad (this.sagittalFrames, [
				this.coronalFrames,
				this.transverseFrames
			], args);
			break;
		case 'coronal':
			preLoad (this.coronalFrames, [
				this.sagittalFrames,
				this.transverseFrames
			], args);
			break;
		case 'transverse':
			preLoad (this.transverseFrames, [
				this.sagittalFrames,
				this.coronalFrames
			], args);
			break;
	}
}