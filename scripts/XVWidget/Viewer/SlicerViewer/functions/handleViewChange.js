
goog.require('goog.fx');
goog.require('goog.fx.dom');

function getPlaneFromTitle(viewer, title) {
    switch (title) {
        case 'Sagittal':    // x
            planeHolder = viewer.ThreeDHolder.PlaneHolderX;
            break;
        case 'Coronal':     // y
            planeHolder = viewer.ThreeDHolder.PlaneHolderY;
            break;
        case 'Transverse':  // z
            planeHolder = viewer.ThreeDHolder.PlaneHolderZ;
            break;
        case '3D':
            planeHolder = viewer.ThreeDHolder.PlaneHolder3;
            break;
    }
    return planeHolder;
}

function handle3Dto2D(viewer, newIcon) {
    var twoD = getPlaneFromTitle(viewer, newIcon);
    expandPanel(twoD);
}

function handle2Dto3D(viewer, oldIcon) {
    var twoD = getPlaneFromTitle(viewer, oldIcon);
    closePanel(twoD);
}

function handle2Dto2D(viewer, oldIcon, newIcon) {
    var o = getPlaneFromTitle(viewer, oldIcon);
    var n = getPlaneFromTitle(viewer, newIcon);
    closePanel(o);
    expandPanel(n);
}

function expandPanel(plane) {
    var elt = plane.widget;
    
    ++elt.style.zIndex;

    // refresh size of canvas and sliders w/in twoD
    plane.updateCSS({ left: 0, top: 0, width: '100%', height: '100%' });
}

function closePanel(plane) {
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
    plane.updateCSS({ left: px, top: py, width: '50%', height: '50%' });
}







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