goog.require('ThreeDHolder');
goog.provide('ThreeDHolder.getPlaneFromTitle');
goog.provide('ThreeDHolder.changeViewManyToOne');
goog.provide('ThreeDHolder.changeViewOneToMany');
goog.provide('ThreeDHolder.changeViewOneToOne');
goog.provide('ThreeDHolder.expandPanel');
goog.provide('ThreeDHolder.closePanel');

ThreeDHolder.prototype.getPlaneFromTitle = function(title) {
    var planeHolder;
    switch (title) {
        case 'Sagittal':    // x
            planeHolder = this.PlaneHolderX;
            break;
        case 'Coronal':     // y
            planeHolder = this.PlaneHolderY;
            break;
        case 'Transverse':  // z
            planeHolder = this.PlaneHolderZ;
            break;
        case '3D':
            planeHolder = this.PlaneHolder3;
            break;
    }
    return planeHolder;
}
goog.exportProperty(ThreeDHolder.prototype, 'getPlaneFromTitle', ThreeDHolder.prototype.getPlaneFromTitle);



ThreeDHolder.prototype.changeViewManyToOne = function(newIcon) {
    var twoD = this.getPlaneFromTitle(newIcon);
    this.expandPanel(twoD);
    /*
    if (newIcon == '3D') {
        if (this.ScanTabs) this.ScanTabs.getTab("3D Menu").setActive(2);
//        this.deactivate2D();
    } else {
        if (this.ScanTabs) this.ScanTabs.getTab("2D Menu").setActive(1);
//        this.deactivate3D();
    }*/
}
goog.exportProperty(ThreeDHolder.prototype, 'changeViewManyToOne', ThreeDHolder.prototype.changeViewManyToOne);



ThreeDHolder.prototype.changeViewOneToMany = function(oldIcon) {
    var twoD = this.getPlaneFromTitle(oldIcon);
    this.closePanel(twoD);
    /*
    if (oldIcon == '3D') {
//        this.activate2D();
    } else {
//        this.activate3D();
    }*/
}
goog.exportProperty(ThreeDHolder.prototype, 'changeViewOneToMany', ThreeDHolder.prototype.changeViewOneToMany);



ThreeDHolder.prototype.changeViewOneToOne = function(oldIcon, newIcon) {
    // only care about changing when old and new icons are different
    if (oldIcon == newIcon) return;
    
    var o = this.getPlaneFromTitle(oldIcon);
    var n = this.getPlaneFromTitle(newIcon);
    this.closePanel(o);
    this.expandPanel(n);
    /*
    if (newIcon == '3D') {
        if (this.ScanTabs) this.ScanTabs.getTab("3D Menu").setActive(2);
//        this.deactivate2D();
//        this.activate3D();
    } else if (newIcon != '3D' && oldIcon != '3D') {
        // don't need to change what's visible in menu
    } else {
        if (this.ScanTabs) this.ScanTabs.getTab("2D Menu").setActive(1);
//        this.deactivate3D();
//        this.activate2D();
    }*/
}
goog.exportProperty(ThreeDHolder.prototype, 'changeViewOneToOne', ThreeDHolder.prototype.changeViewOneToOne);



ThreeDHolder.prototype.expandPanel = function(plane) {
    var elt = plane.widget;
    
    ++elt.style.zIndex;

    // refresh size of canvas and sliders w/in twoD
    plane.updateCSS({ 'left': '0', 'top': '0', 'width': '100%', 'height': '100%' });
    this.updateCSS();
}
goog.exportProperty(ThreeDHolder.prototype, 'expandPanel', ThreeDHolder.prototype.expandPanel);



ThreeDHolder.prototype.closePanel = function(plane) {
    var elt = plane.widget;
    var px, py;
    
    switch (elt.id[0]) {
        case 'x':
            px = '0%', py = '0%';
            break;
        case 'y':
            px = '50%', py = '0%';
            break;
        case 'z':
            px = '0%', py = '50%';
            break;
        case 'v':
            px = '50%', py = '50%';
            break;
    }

    --elt.style.zIndex;
    
    // refresh size of canvas and sliders
    plane.updateCSS({ 'left': px, 'top': py, 'width': '50%', 'height': '50%' });
    this.updateCSS();
}
goog.exportProperty(ThreeDHolder.prototype, 'closePanel', ThreeDHolder.prototype.closePanel);

