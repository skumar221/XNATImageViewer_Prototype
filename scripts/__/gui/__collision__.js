function __collision__(a,b, flip) {

    var al = $(a).offset().left;
    var ar = al + $(a).outerWidth();
    var at = $(a).offset().top;
    var ab = at + $(a).outerHeight();

    var bl = $(b).offset().left;
    var br = bl + $(b).outerWidth();
    var bt = $(b).offset().top;
    var bb = bt + $(b).outerHeight();

	
    if(bl>ar || br<al) {return false;}//overlap not possible
    if(bt>ab || bb<at) {return false;}//overlap not possible

    if(bl>al && bl<ar) {return true;}
    if(br>al && br<ar) {return true;}

    if(bt>at && bt<ab) {return true;}
    if(bb>at && bb<ab) {return true;}

    if (flip === false) return false;
    else return (elementCollision(b, a, false))
}