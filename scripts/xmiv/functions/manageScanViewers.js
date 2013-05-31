XMIV.prototype.manageScanViewers = function () {


	
	/*
		this.getScanViewers = function(filter){
		
		var isString = (typeof filter === 'string');
		
		if (isString){
			
			var isWidgetString = (filter.toLowerCase().indexOf("widget")  === 0 );
			
			if (isWidgetString){
				var widgets = this.runScanViewerLoop( function (ScanViewer) { 
						return ScanViewer.widget;	
				})
				return widgets;						
			}
	
		}
		
		return this.ScanViewers;
	}
	
	this.ScanViewerWidgets = function() {

	}
	
	this.runScanViewerLoop = function(callback){
		
		var returnVals = [];
		var ScanViewers = this.getScanViewers();
		
		for (var i=0; i<ScanViewers.length; i++) {
			for (var j=0; j<ScanViewers[i].length; j++) {
				
				var r = callback(ScanViewers[i][j], i, j);
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
	
	this.ScanViewer =  function (i, j) {	
		
		//console.log(typeof i)
		
		var isNum = ((typeof i === 'number') && (typeof j === 'number'));
		var isString = ((typeof i === 'string'));
		 
		if (isNum){
			return this.ScanViewers[i][j];						
		}

		if (isString){
			var id = i;
			
			var v = this.runScanViewerLoop( function(ScanViewer) {
				if (ScanViewer.widget.id == id) {
					return ScanViewer
				}			
			})
			
			if (v){
				return v;
			}
		}
	}
	*/

	this.ScanViewers = function(arg1, arg2, arg3, arg4, arg5) {
		
		var viewers = [[]];
		
		if (typeof arg1 === 'undefined'){
			return viewers;
		}

		this.swap =  function(a, b) {
			
		},
		
		this.widgets =  function() {
			
		},
		
		this.widget =  function(arg1, arg2){
			
		},
		
		this.loop =  function(loopMethod) {
			
			
		}		
		
		return ScanViewers;
	}

}