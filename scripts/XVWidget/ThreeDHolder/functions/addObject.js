goog.require('ThreeDHolder');
goog.provide('ThreeDHolder.addObject');

ThreeDHolder.prototype.addObject = function(file, attributes) {
    // create object
    var newObj = this.SlicerFileHandler_.createXObject(file);
    filetype = this.SlicerFileHandler_.getFileObjectType(file);
    
    // set attributes if there are preset values (from slicer scenes)
    if (attributes) {
        // color -- volumes: .maxColor, meshes: .color
        var colors = attributes['color'].split(' ');
        for (var i = 0; i < colors.length; ++i) colors[i] = parseFloat(colors[i], 10);
        newObj.color = colors;
        
        // color table (if exists)
        /*
        if (attributes['colorVolume']) {
            newObj.labelmap.file = file.split('/Data/')[0] + '/' + attributes['colorVolume'];
            if (attributes['colorTable'])
                newObj.labelmap.colortable.file = file.split('/Data/')[0] + '/' + attributes['colorTable'];
        }
        /*/
        if (attributes['colorTable']) {
            newObj.labelmap.file = file;
            newObj.labelmap.colortable.file = file.split('/Data/')[0] + '/' + attributes['colorTable'];
        }
        
        // opacity
        newObj.opacity = parseFloat(attributes['opacity'], 10);
        
        // visibility
        newObj.visible = attributes['visibility'] == 'true';
    }
    
//    if (filetype == 'volume') {
//        if (this.currentVolObject) this.currentVolObject.visible = false;  /////////////
//        this.currentVolObject = newObj;
//    }
    
    // add to collection of objects, add to menu, and add to viewer!
    this.currentObjects.push(newObj);
    this.addToMenu(newObj);
    this.PlaneHolder3.Renderer.add(newObj);
    
    return newObj;
}
goog.exportProperty(ThreeDHolder.prototype, 'addObject', ThreeDHolder.prototype.addObject);




//    this.PlaneHolder3.widget.style.background = (isSlicer) ? '#aae' : '#000';