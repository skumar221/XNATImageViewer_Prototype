// Returns the total lenght of values in a multi-dimensional array
function __lengthMD__(arr) {
	
  var count = 0;
  
  if( Object.prototype.toString.call(arr) === '[object Array]' ) {
    for (var i=0; i<arr.length; i++) {
    	if( Object.prototype.toString.call(arr[i]) === '[object Array]' ) {
    		count += __lengthMD__(arr[i]);
    	}
    	else{
    		count = arr.length;
    	}
    }
    return count;
  }
  else{
  	throw ("Invalid parameter for __length2D__!  It's not an array!")
  } 

}


function arrayValueValid(arr, i, j) {
	
	if (!arr[i] || !arr[i][j] || !arr[i][j].widget.id || arr[i][j] === null) {
		return false;
	}
	
	return true;
}


function __numColumns__(arr) {

  colCount = 0;
  if( Object.prototype.toString.call(arr) === '[object Array]' ) {
    for (var i=0; i<arr.length; i++) {
    	if (arr[i].length > colCount) {
    		colCount = arr[i].length;
    	}
    }
    return colCount;
  }	
  
}

function __numRows__(arr) {

  rowCount = 0;
  if( Object.prototype.toString.call(arr) === '[object Array]' ) {
    return arr.length;
  }	
  
}