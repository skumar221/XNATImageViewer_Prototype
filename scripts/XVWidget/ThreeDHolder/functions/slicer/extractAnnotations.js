

extractAnnotations = function(scene) {
    var annotations = [];
    
    utils.array.forEach(scene.getElementsByTagName('AnnotationFiducials'), function(a) {
        var displayNodeRefs = a.getAttribute('displayNodeRef').split(' ');
        var displayNodeTypes = [];
        var pointDisplay;
        
        for (var i = 0; i < displayNodeRefs.length; ++i) {
            displayNodeTypes[i] = displayNodeRefs[i].split('vtkMRML')[1].split('Node')[0];
        }
        
        // find corresponding point display node
        utils.array.forEach(scene.getElementsByTagName(displayNodeTypes[1]), function(itemDisplay) {
            if (itemDisplay.getAttribute('id') == displayNodeRefs[1]) {
                pointDisplay = itemDisplay;
            }
        });
        
        annotations.push([a, pointDisplay]);
        
    });
    
    return annotations;
    
}