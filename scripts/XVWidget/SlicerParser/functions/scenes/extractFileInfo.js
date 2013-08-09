goog.require('SlicerParser');
goog.provide('SlicerParser.extractFileInfo');

SlicerParser.prototype.extractFileInfo = function(scene, tagName, storageNodeType) {
    var objects = [];
    
    // volume to display in 2D renderers
    var selectedVolumeID = scene.getElementsByTagName('Selection')[0].getAttribute('activeVolumeID');
    
    // colormap information
    /*
    // this was an attempt to stick the labelmapped volume onto the "main"
    // volume... it *sort of* worked -- the background became a bright pink,
    // possibly because of the color table values

    var labelMapVolumeDisplay = scene.getElementsByTagName('LabelMapVolumeDisplay')[0];
    var colorTableFile;     // we want the color table...
    var colorVolumeFile;    // ...and the volume file it goes with
    
    // find volume object that corresponds to label map
    utils.array.forEach(scene.getElementsByTagName('Volume'), function (v) {
        if (v.getAttribute('displayNodeRef') == labelMapVolumeDisplay.getAttribute('id')) {
            
            // set volume file
            utils.array.forEach(scene.getElementsByTagName('VolumeArchetypeStorage'), function(s) {
                if (s.getAttribute('id') == v.getAttribute('storageNodeRef')) {
                    colorVolumeFile = s.getAttribute('fileName');
                    if (colorVolumeFile.split('/Data/')[1])
                        colorVolumeFile = 'Data/' + colorVolumeFile.split('/Data/')[1];
                }
            });
            
            // set color table file
            utils.array.forEach(scene.getElementsByTagName('ColorTable'), function(ct) {
                if (ct.getAttribute('id') == labelMapVolumeDisplay.getAttribute('colorNodeID')) {
                    utils.array.forEach(scene.getElementsByTagName('ColorTableStorage'), function(cts) {
                        if (cts.getAttribute('id') == ct.getAttribute('storageNodeRef')) {
                            colorTableFile = cts.getAttribute('fileName');
                            if (colorTableFile.split('/Data/')[1])
                                colorTableFile = 'Data/' + colorTableFile.split('/Data/')[1];
                        }
                    });
                }
            });
            
        }
    });
    */
    
    //----------------------------------
    // EXTRACT INFO 
    //----------------------------------
    utils.array.forEach(scene.getElementsByTagName(tagName), function(i) {
        
        //----------------------------------
        // STORAGE INFO 
        //----------------------------------
        var storageNodeRef = i.getAttribute('storageNodeRef');
        var storageNode;
        // find corresponding tagName storage component
        utils.array.forEach(scene.getElementsByTagName(storageNodeType), function(itemStorage) {
            if (itemStorage.getAttribute('id') == storageNodeRef) storageNode = itemStorage;
        });
        
        
        
        //----------------------------------
        // DISPLAY INFO 
        //----------------------------------
        var displayNode;
        
        // fiber bundles are special... they have multiple display nodes (3)
        // one or more of them may have the visibility set to true.
        // if any are set to true, we want to display the fibers.
        if (tagName == 'FiberBundle') {
            var displayNodeRefs = i.getAttribute('displayNodeRef').split(' ');
            var displayNodeTypes = [];
            visibility = 'false';
            for (var j = 0; j < displayNodeRefs.length; ++j) {
                // strip away the vtkMRML and the Node##, but then we still need 'Node'
                displayNodeTypes[j] = displayNodeRefs[j].split('vtkMRML')[1].split('Node')[0] + 'Node';
                
                utils.array.forEach(scene.getElementsByTagName(displayNodeTypes[j]), function(itemDisplay) {
                    if (itemDisplay.getAttribute('id') == displayNodeRefs[j]) {
                        // set the color to be the line display node's color
                        if (!color) color = itemDisplay.getAttribute('color');
                        
                        // if there is no displayNode yet, set one just so we have one
                        if (!displayNode) displayNode = itemDisplay;
                        
                        // ok, now set visibility
                        if (itemDisplay.getAttribute('visibility') == 'true') {
                            visibility = 'true';
                            var colorMode = itemDisplay.getAttribute('colorMode');
                            // if colorMode = 0, regular color
                            // if colorMode = 1, fancy multicolors
                            if (colorMode == '1') {
                                var fancyColors = itemDisplay.getAttribute('DiffusionTensorDisplayPropertiesNodeRef');
                                console.log(fancyColors);
                            }
                        }
                    }
                });
            }
        }
        
        // volumes, meshes (models)
        else {
            var displayNodeRef = i.getAttribute('displayNodeRef').split(' ')[0];
            var displayNodeType = displayNodeRef.split('vtkMRML')[1].split('Node')[0];
            
            if (displayNodeType == 'ScalarVolumeDisplay')
                displayNodeType = 'VolumeDisplay';
            if (displayNodeType == 'NCIRayCastVolumeRenderingDisplay')
                displayNodeType = 'NCIRayCastVolumeRendering';
            
            // find corresponding tagName display component
            utils.array.forEach(scene.getElementsByTagName(displayNodeType), function(itemDisplay) {
                
                if (itemDisplay.getAttribute('id') == displayNodeRef) {
                    displayNode = itemDisplay;
                    color = itemDisplay.getAttribute('color');
                    visibility = itemDisplay.getAttribute('visibility');
                }
            });
        }
        
        
        
        
        
        
        //----------------------------------
        // COLORTABLE INFO 
        //----------------------------------
        // find corresponding tagName color table (if exists)
        var colorTableFile;
        if (displayNode.getAttribute('colorNodeID')) {
        
            utils.array.forEach(scene.getElementsByTagName('ColorTable'), function(ct) {
            
                if (ct.getAttribute('id') == displayNode.getAttribute('colorNodeID')) {
                    utils.array.forEach(scene.getElementsByTagName('ColorTableStorage'), function(cts) {
                        if (cts.getAttribute('id') == ct.getAttribute('storageNodeRef')) {
                            colorTableFile = cts.getAttribute('fileName');
                            if (colorTableFile.split('/Data/')[1])
                                colorTableFile = 'Data/' + colorTableFile.split('/Data/')[1];
                        }
                    });
                }
                
            });
            
        }
        
        
        
        //----------------------------------
        // MISCELLANEOUS STUFF TO DO
        //----------------------------------
        
        // we want relative path (full paths are incorrect)
        var fileName = storageNode.getAttribute('fileName');
        if (fileName.split('/Data/')[1])
            fileName = 'Data/' + fileName.split('/Data/')[1];
        
        
        // only the selected volume should be visible (or none)
        var isSelectedVolume;
        if (tagName == 'Volume') {
            visibility = displayNode.getAttribute('visibility');
            if (selectedVolumeID != i.getAttribute('id')) {
                visibility = 'false';
                isSelectedVolume = false;
            } else {
                isSelectedVolume = true;
            }
        } else {
            isSelectedVolume = false;
        }
        
        
        
        //----------------------------------
        // STORE ALL THE IMPORTANT STUFF
        //----------------------------------
        
        // only add if it's a 'data' volume (not just a volume used for coloring)
//        if (displayNode !== labelMapVolumeDisplay) {
            // add info to be returned
            objects.push({
                'file':             fileName,
                'isSelectedVolume': isSelectedVolume,
                
                'attributes':   {
                    'color':        color,
//                    'colorVolume':  colorVolumeFile,
                    'colorTable':   colorTableFile,
                    'opacity':      displayNode.getAttribute('opacity'),
                    'visibility':   visibility
                }
            });
//        }
    });
    
    return objects;
}
goog.exportProperty(SlicerParser.prototype, 'extractFileInfo', SlicerParser.prototype.extractFileInfo);