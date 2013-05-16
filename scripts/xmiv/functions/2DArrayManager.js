


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
	for (var i=0; i<arr.length; i++){
		for (var j=0; j<arr[i].length; j++){
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
					if (i>0 && (!arr[i-1] || !arr[i-1][j])){
						colAttached = false;
					}	
					
					// Check row attched
					if (j>0 && arr[i] && (!arr[i][j-1])){
						rowAttached = false;
					}			
					
					// If it's not row attached or column attached
					// then shift to the left
					if (!rowAttached && !colAttached){
						arr[i].splice(j-1, i);
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
}



//************************************
//  
//************************************
function removeEmptyRows(arr){	
	for (var i=0; i<arr.length; i++){
		//console.log(arr[i])

		var undefCount = 0;
		for (var j=0; j<arr[i].length; j++){
			//console.log("i: ", i, "   j: ", j, arr[i][j])
			if (!arr[i] || !arr[i][j] || !arr[i][j].widget.id){
				undefCount++;
			}
		}			
		
		if (undefCount == arr[i].length){
			arr.splice(i, 1);	
			//console.log("removing empty b: ", i)
			removeEmptyRows(arr);
			return;			
		}
		
	}
}
