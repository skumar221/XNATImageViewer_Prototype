


//************************************
//  
//************************************
function validate2DArray(arr, callerString){
	if( !Object.prototype.toString.call( arr) === '[object Array]' ) {
		throw caller + " Error: Invalid Array -- not an array object!";
	}
	if( !Object.prototype.toString.call(arr[0]) === '[object Array]' ) {
		throw caller + " Error: Invaid Array -- need to have an array of arrays!";
	}	
}





//************************************
//  
//************************************
function spliceInRow(arr, obj){


	
	//-------------------------
	// 1. Validate arr
	//-------------------------	
	validate2DArray(arr, "spliceInRow")	

	

	//-------------------------
	// 2. Nullify, and pop if there are no connected viewers
	//-------------------------		
	var found = false;
	for (var i in arr){
		for (var j in arr[i]){

			if (arr[i][j] && arr[i][j].widget.id == obj.widget.id){
				arr[i][j] = null;
				
				// No column attched
				if (!arr[i-1] || !arr[i-1][j]){
					arr[i].splice(j , 1);
				}					
				found = true;
				break;	
			}
		}
	}
	if (!found) { 
		throw "spliceInRow Error: obj not found in 2D array!";
		return; 
	}	
	
	
	
	//-------------------------
	// 3.  Splice array depending on if viewers are connected to columns or not
	//-------------------------		
	function shiftIfNecessary(arr){
		for (var i=0; i<arr.length; i++){
			for (var j=0; j<arr[i].length; j++){
				var colAttached = true;
				var rowAttached = true;			
				if (arr[i][j] && arr[i][j].widget.id){

					// Check column attched
					if (i>0 && j>0 && (!arrayValueValid(arr, i-1, j))){
						console.log("NO COLUMN: ", i-1, j, " IN: ", i, j);
						colAttached = false;
					}	
					
					// Check row attched
					if (i>0 && j>0 && (!arrayValueValid(arr, i, j-1))){
						console.log("NO ROW: ", i, j-1, " IN: ", i, j);
						rowAttached = false;
					}			
					
					// If it's not row attached or column attached
					// then shift to the left
					if (!rowAttached && !colAttached){
						arr[i][j-1] = arr[i][j];
						arr[i][j] = null;
						shiftIfNecessary(arr);
						return;
					}	
				}			
			}
		}	
	}

	shiftIfNecessary(arr);

	
	//-------------------------
	// 3. Shift any empty or unconnected columns up
	//-------------------------			
	removeEmptyRows(arr);
	removeEmptyColumns(arr);
}




function arrayValueValid(arr, i, j){
	
	if (!arr[i] || !arr[i][j] || !arr[i][j].widget.id || arr[i][j] === null){
		return false;
	}
	
	return true;
}



//************************************
//  
//************************************
function removeEmptyRows(arr){	

	for (var i =0; i<arr.length; i++){

		var undefCount = 0;
		
		for (var j=0; j<arr[i].length; j++){
			
			if (! arrayValueValid(arr, i, j)){
				undefCount++;
			}
		}			

		
		if (undefCount == arr[i].length){
			arr.splice(i, 1);	
			console.log("removing empty b: ", i)
			removeEmptyRows(arr);
			return;			
		}
		
	}
}



//************************************
//  
//************************************
function removeEmptyColumns(arr){	

	//var emptyCols = [];
	for (var i =0; i<arr.length; i++){

		var undefCount = 0;
		
		for (var j=0; j<arr[i].length; j++){
			
			if (!arrayValueValid(arr, i, j)){
				
				var emptyColCount = 0;
				
				for (var k=0; k<arr.length; k++){
					if (!arrayValueValid(arr, k, j)){
						emptyColCount ++;
					}
				}
				
				console.log("EMPTY COL COUNT: ", emptyColCount, arr.length, j);
				if (emptyColCount == arr.length){
					
					console.log("SPLICING")
					for (var k=0; k<arr.length; k++){
						arr[k].splice(j, 1);
						
					}	
					
					removeEmptyColumns(arr);
					return;
									
				}
					
			}
		}			

		
	}
}
