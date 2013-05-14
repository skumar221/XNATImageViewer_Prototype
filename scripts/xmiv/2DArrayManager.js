


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
	// 2. Pop by row using splice
	//-------------------------		
	var found = false;
	for (var i=0; i<arr.length; i++){
		for (var j=0; j<arr[i].length; j++){
			if (arr[i][j] && arr[i][j].widget.id == obj.widget.id){
				arr[i][j] = null;
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
	}
	

	
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
		console.log(arr[i])

		var undefCount = 0;
		for (var j=0; j<arr[i].length; j++){
			console.log("i: ", i, "   j: ", j, arr[i][j])
			if (!arr[i] || !arr[i][j] || !arr[i][j].widget.id){
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
