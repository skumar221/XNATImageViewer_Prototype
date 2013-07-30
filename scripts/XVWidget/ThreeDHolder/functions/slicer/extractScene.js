

extractScene = function(mrml, sceneName) {
    
    var scene;
    
    utils.array.forEach(mrml.getElementsByTagName('SceneView'), function(s) {
        if (s.getAttribute('name') == sceneName) scene = s;
    });
    
    return scene;
    
}