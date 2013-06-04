## Overview

The basic organizational structure of the XNATViewer centers on javascript objects which control various DOM elements.
The XNATImageViewer makes use of jquery, jquery-ui, and jquery-collision.

Usually there's a centralizing div element called a "widget" for every javascript object.  Most objects
utilize an "init" paradigm that allows it to manage its arguments and set up its "widget" element. 

The main controller object is the XNATViewer, which contains the following objects: ScrollGallery, ScanViewers, and ExpandMenus.

The CSS is updated dynamically using the function call "updateCSS", which all widget-containing javascript objects have.  This is
heirarchically controlled: the XNATImageViewer.updateCSS() function controls the updateCSS functions of the other widgets.  That said,
individual updateCSS calls can also be (and are) applied when needed.

### Code organization

	1. "utils": Contains various conversion tools where jquery either
doesn't have the functionality or a new type of functionality is desired.


	1. ./XNATViewer (Manages "ScrollGallery", the ScanViewer manager (known globally as XV.ScanViewers()), and expand menus):
Manages all of the various "widgets" that comprise the viewer.
This is where AJAX calls would be.  (Right now, we're working with a local
data set called TESTSCANDATA found in the ./testscans directory)


	2. ./widgets/ScrollGallery (Manages "ScanThumbnails"):
Mousewheel responsive filmstrip gallery that hosts "scanThumbnails", which contain are
jquery draggable divs that can be dropped into ScanViewers. 


	3. ./widgets/ScanThumbnail (comprised of several elements, mostly divs):
Contains the basic information of the scan itself, a thumbnail, and its metadata.  The images
are themselves not loaded onto the thumbnail, but their paths are.


	4. ./widgets/ScanViewer (Manages: FrameViewer, ScanTabs, a utils.gui.horizontalSlider, LinkMenu, OrientationMenu):
Main manager for viewing scans.


	5. ./widgets/FrameViewer:
A div containing a canvas.  The javascript object holds a number of img elements (frames) that are subsequently drawn 
onto an HTML5 canvas using the drawImage function. Movement of the ScanViewer slider initiates a traversal through
the images, which are then drawn onto the canvas.


	6. ./widgets/imaging/imageProcessingFunctions.js:
Contains utility methods for brightness and contrast.


	7. ScanTabs.js:
Modified jquery-ui tabs for hosting metadata, brightness and contrast sliders

