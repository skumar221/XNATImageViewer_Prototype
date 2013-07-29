

ThreeDHolder.prototype.addObject = function(file, attributes) {
    var newObj = createXObject(file);
    filetype = getFileObjectType(file);
    
    if (attributes) {
        // color -- volumes: .maxColor, meshes: .color
        var colors = attributes['color'].split(' ');
        for (var i = 0; i < colors.length; ++i) colors[i] = parseFloat(colors[i], 10);
        newObj.color = colors;
        
        // color table (if exists)
        if (attributes['colorTable']) {
//            console.log(file + attributes['colorTable']);
//            newObj.labelmap.colortable.file = file + attributes['colorTable'];
        }
        
        // opacity
        newObj.opacity = parseFloat(attributes['opacity'], 10);
        
        // visibility
        newObj.visible = attributes['visibility'] == 'true';
    }
    
    var isVol = filetype == 'volume';
    if (isVol) this.currentVolObject = newObj;
    
    this.currentObjects.push(newObj);
    this.addToMenu(newObj);
    
    this.PlaneHolder3.widget.style.background = '#000';//(isSlicer) ? '#aae' : '#000';
    this.PlaneHolder3.Renderer.add(newObj);
    this.setOnShowtime(isVol, newObj);
}