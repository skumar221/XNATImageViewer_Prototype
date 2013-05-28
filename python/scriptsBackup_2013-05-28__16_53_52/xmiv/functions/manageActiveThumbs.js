//******************************************************
//  Manage Active Thumbs
//******************************************************
XMIV.prototype.manageActiveThumbs = function (thumb, args) {
	if (!this.activeThumbManager)
		this.activeThumbManager = {};
	

	// We basically want to cycle through the manager
	// so that any thumbnail associated with args.activeDropZoneID
	// is removed and replaced with thumb
	if (args.activeDropZoneID) {
		for (var i=0;i<this.ScanViewers.length;i++) {
			for (var j=0;j<this.ScanViewers[i].length;j++) {
				if (arrayValueValid(this.ScanViewers, i, j)) {
					if (this.ScanViewers[i][j].FrameViewer.args.id == args.activeDropZoneID) {
						if (this.activeThumbManager[args.activeDropZoneID]) {
							//console.log("deactivating existing: " + this.activeThumbManager[args.activeDropZoneID].args.id + " in " + args.activeDropZoneID)
							this.activeThumbManager[args.activeDropZoneID].deactivate();
						}
		
						this.activeThumbManager[args.activeDropZoneID] = thumb;
						//console.log("inserting: " + thumb.args.id + " in " + args.activeDropZoneID);
						break;
					}	
				}
			}
		}
	}
	
}