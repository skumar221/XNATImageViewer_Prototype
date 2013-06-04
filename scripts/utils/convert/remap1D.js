utils.convert.remap1D = function(n, dold, dnew) {


	//console.log("N: " + n)
	//console.log("dold: " + dold)
	//console.log("dnew: " + dnew)
	
	function swapElts(darr) {
		var holder = darr[0];
		darr[0] = darr[1];
		darr[1] = holder;
		return darr;
	}
	
	if ((dold[0] == dold[1]) || (dnew[0] == dnew[1])) {
		throw ("Remap: initial domain is equal!");
	}
	
	if (dold[0] > dold[1]) {
		dold = swapElts(dold);
	}

	if (dnew[0] > dnew[1]) {
		dnew = swapElts(dnew);
	}

	if (n <= dold[0]) {
		n = dold[0];
		var returner = {
			newVal: dnew[0],
			adjOld: n
		};
		return returner;
	}
	else if (n >= dold[1]) {
		n = dold[1];
		var returner = {
			newVal: dnew[1],
			adjOld: n
		};
		return returner;
	}
	
    var newVal = Math.round((n/(dold[1]-dold[0])) * ((dnew[1]-dnew[0])));

    if (newVal < dnew[0]) {
		newVal = dnew[0];
	}
	else if (newVal > dnew[1]) {
		newVal = dnew[1];
	}
    
    //console.log("newVAl: " + newVal);    
    //console.log("*****************")
	return {
		newVal: newVal,
		adjOld: n
	};
}



