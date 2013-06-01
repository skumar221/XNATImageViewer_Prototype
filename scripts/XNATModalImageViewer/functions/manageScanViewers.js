XNATModalImageViewer.prototype.manageScanViewers = function() {
	
	var viewers = this.ScanViewers;
	
	this.SCANViewers = function(args1, args2, args3, args4, args5) {
		
		//console.log(typeof args1)
		//var viewers = [[]];
		
		
		var isUndefined = (typeof args1 === 'undefined');
		var isString = (typeof args1 === 'string');
		var isObject = (typeof args1 === 'object');	
		var isFunction = (typeof args1 === 'function');	
	
		function widget(args1, args2) {
			
		}
		
		
		var loop = function(callback) {
			
				var returnVals = [];
				var ScanViewers = viewers;
				
				for (var i=0; i<viewers.length; i++) {
					for (var j=0; j<viewers[i].length; j++) {
						
						var r = callback(viewers[i][j], i, j);
						if (r){
							returnVals.push(r);
						}
						
					}
				}
				
				if (returnVals.length > 0){
					if (returnVals.length === 1){
						return returnVals[0]
					}
					else{
						return returnVals;
					}
				}		
		}

		
		
		function widgets() {
			var ws = loop (function (ScanViewer) { 
				return ScanViewer.widget;	
			})
			return ws;				
		}		
		


		function swap(v1, v2){

			var arrLoc = loop ( function (v, i, j) { 
				
				var byObj = (v === v1) || (v === v2);
				var byElement = (v.widget === v1) || (v.widget === v2);
				var byId = (v.widget.id === v1) || (v.widget.id === v2);
				
				if (byObj || byElement || byId) {
					return {
						"i" : i,
						"j" : j,
					}				
				}
				
			})
			
			if (arrLoc.length == 2){
	
				console.log("NEED TO CORRECT HERE")
				var tempViewer = viewers[arrLoc[0].i][arrLoc[0].j];
				viewers[arrLoc[0].i][arrLoc[0].j] = viewers[arrLoc[1].i][arrLoc[1].j];
				viewers[arrLoc[1].i][arrLoc[1].j] = tempViewer;
	
			}
			else{
				throw "SWAP ERROR: "
			}
		}	
		
		//---------------------
		// UNDEFINED
		//---------------------
		if (isUndefined) {
			return viewers;
		}
		

		//---------------------
		// STRING
		//---------------------		
		else if (isString) {
			var isWidget = (args1.toLowerCase().indexOf("widgets")  === 0 );
			if (isWidget){
				return widgets();
			}				
		}	
		
		
		//---------------------
		// OBJECT
		//---------------------		
		else if (isObject){
			
			var isElement = args1["element"];
			if (isElement){
				
				var isWidget = (args1["element"].toLowerCase().indexOf("widgets")  === 0 );
				if (isWidget){
					return widgets();
				}				
			}

			var isLoop = args1["loop"];
			if (isLoop){
				return loop(args1["loop"]);			
			}
			
			
			var isSwap = args1["swap"];
			if (isSwap){
				return swap(args1["swap"][0], args1["swap"][1]);			
			}
			
		}
		
		
		//---------------------
		// FUNCION
		//---------------------	
		if (isFunction) {
			loop(args1)
		}
		
	}

}