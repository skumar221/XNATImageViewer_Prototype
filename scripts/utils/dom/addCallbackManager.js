utils.dom.addCallbackManager = function (obj) {
	
	obj.callbacks = {}
	
	obj.addCallback = function (key, callback) {
		
		if (!obj.callbacks[key]){
			obj.callbacks[key] = [];
		}
		
		if (obj.callbacks[key].indexOf(callback) == -1){
			obj.callbacks[key].push(callback);
		}
	}
	
	obj.deleteCallback = function(key, callback) {		
		var ind = obj.callbacks[key].indexOf(callback);
		if (ind > -1) {
			obj.callbacks[key].splice(ind, 1);
		}
	}
	
	obj.runCallbacks = function(key) {
		for (var i=0; i<obj.callbacks[key].length; i++){
			obj.callbacks[key][i]();
		}
	}

}