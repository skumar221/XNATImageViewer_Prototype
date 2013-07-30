

ThreeDHolder.prototype.addAnnotations = function(annotations) {
    var that = this;
    
    utils.array.forEach(annotations, function(annotObj) {
        var a = annotObj[0];
        var pointDisplay = annotObj[1];
        
        var center = a.getAttribute('ctrlPtsCoord').split(' ');
        var colors = pointDisplay.getAttribute('color').split(' ');
        for (var i = 0; i < center.length; ++i) center[i] = parseFloat(center[i], 10);
        for (var i = 0; i < colors.length; ++i) colors[i] = parseFloat(colors[i], 10);
        
        
        var point = new X.sphere();
        point.center = center;
        point.radius = 4;
        point.caption = a.getAttribute('name');
        point.color = colors;
        point.opacity = parseFloat(pointDisplay.getAttribute('opacity'), 10);
        point.visible = pointDisplay.getAttribute('visibility') == 'true';
        
        that.PlaneHolder3.Renderer.add(point);
        that.addToMenu(point, a.getAttribute('name'), 'sphere');
        
    });
}