goog.require('ThreeDHolder');
goog.provide('ThreeDHolder.getPlaneFromTitle');
goog.provide('ThreeDHolder.changeViewManyToOne');
goog.provide('ThreeDHolder.changeViewOneToMany');
goog.provide('ThreeDHolder.changeViewOneToOne');
goog.provide('ThreeDHolder.expandPanel');
goog.provide('ThreeDHolder.closePanel');

ThreeDHolder.prototype.getPlaneFromTitle = function(viewer, title) {
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



ThreeDHolder.prototype.changeViewManyToOne = function(viewer, newIcon) {
    var twoD = this.getPlaneFromTitle(viewer, newIcon);
    this.expandPanel(twoD);
}
goog.exportProperty(ThreeDHolder.prototype, 'changeViewManyToOne', ThreeDHolder.prototype.changeViewManyToOne);



ThreeDHolder.prototype.changeViewOneToMany = function(viewer, oldIcon) {
    var twoD = this.getPlaneFromTitle(viewer, oldIcon);
    this.closePanel(twoD);
}
goog.exportProperty(ThreeDHolder.prototype, 'changeViewOneToMany', ThreeDHolder.prototype.changeViewOneToMany);



ThreeDHolder.prototype.changeViewOneToOne = function(viewer, oldIcon, newIcon) {
    var o = this.getPlaneFromTitle(viewer, oldIcon);
    var n = this.getPlaneFromTitle(viewer, newIcon);
    this.closePanel(o);
    this.expandPanel(n);
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







    /*
    
    var par = goog.dom.getParentElement(elt);
    
    var slide = new goog.fx.dom.Slide(elt, [elt.offsetLeft, elt.offsetTop],
            [0, 0], 500, goog.fx.easing.easeOut);
    
    var resize = new goog.fx.dom.Resize(elt, [elt.offsetWidth, elt.offsetHeight],
            [par.offsetWidth, par.offsetHeight], 500, goog.fx.easing.easeOut);
    
    slide.play();
    resize.play();
    */

    /*
        switch (elt.id[0]) {
        case 'x':
            ox = 0, oy = 0;
            px = '0%', py = '0%';
            break;
        case 'y':
            ox = par.offsetWidth*0.5, oy = 0;
            px = '50%', py = '0%';
            break;
        case 'z':
            ox = 0, oy = par.offsetHeight*0.5;
            px = '0%', py = '50%';
            break;
        case 'v':
            ox = par.offsetWidth*0.5, oy = par.offsetHeight*0.5;
            px = '50%', py = '50%';
            break;
    }
    
    var slide = new goog.fx.dom.Slide(elt, [elt.offsetLeft, elt.offsetTop],
            [ox, oy], 500, goog.fx.easing.easeOut);
    
    var resize = new goog.fx.dom.Resize(elt, [elt.offsetWidth, elt.offsetHeight],
            [par.offsetWidth*0.5, par.offsetHeight*0.5], 500, goog.fx.easing.easeOut);
    
    slide.play();
    resize.play();
    */