//******************************************************
//  Manage Active Thumbs
//******************************************************
xmiv.prototype.manageActiveThumbs = function(thumb, args){
	if (!this.activeThumbManager)
		this.activeThumbManager = {};
	

	// We basically want to cycle through the manager
	// so that any thumbnail associated with args.activeDropZoneID
	// is removed and replaced with thumb
	if (args.activeDropZoneID){
		for (var i=0;i<this.scanViewers.length;i++){
			for (var j=0;j<this.scanViewers[i].length;j++){
				if (arrayValueValid(this.scanViewers, i, j)){
					if (this.scanViewers[i][j].frameViewer.args.id == args.activeDropZoneID){
						if (this.activeThumbManager[args.activeDropZoneID]){
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