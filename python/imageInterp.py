import sys
import os
from PIL import Image
import shutil
#import dicom

def main():
    
    imagePath = "../TESTSCANS/ICBM_UCLA_1297/saggital"
    #dicomPath = "../TESTSCANS/ICBM_UCLA_1297/DICOM"

    coronalDir = "./coronal"
    axialDir = "./axial"
    

    #===========================================================================
    # Open the first dicom to get orientation
    #===========================================================================
    #===========================================================================
    # fileCount = 0
    # for root, dirs, files in os.walk(dicomPath):
    #   for f in files:
    #        fn = root + "/" + f
    #        dicomFile = dicom.read_file(fn)
    #        print dicomFile
    #        return
    #            
    #===========================================================================
                
                
                
    #===========================================================================
    # Create the new directories
    #===========================================================================  
    if not os.path.exists("./coronal"):
        os.mkdir(coronalDir)
    if not os.path.exists("./axial"):
        os.mkdir(axialDir)
        
        

    
    
    #===========================================================================
    # Count the total files
    #===========================================================================
    fileCount = 0
    refFileNames = []
    genSize = None
    for root, dirs, files in os.walk(imagePath):
       for f in files:
            fn = root + "/" + f
            if (fn[-3:] == "jpg"):
                fileCount += 1
                im = Image.open(root + "/" + f) #Can be many different formats.
                
                if (genSize == None):
                    genSize = im.size
                if (im.size != genSize):
                    print "INEQUALITY IN IMAGE SIZES: %s, %s, %s"%(fn, im.size, genSize)
                
                refFileNames.append(root + "/" + f)
    

    #for name in refFileNames:
    #    print name, name.rsplit("_")[-1].split(".")[0]
    
    
    #===========================================================================
    # Create Blanks - 1
    #===========================================================================   
    createBlanks(axialDir, "ICBM_UCLA_1297_Axial_", genSize[1], "jpg", [fileCount, genSize[1]])
    generateAxial(axialDir, genSize, refFileNames)
    
    
    #===========================================================================
    # Create Blanks - 1
    #===========================================================================   
    createBlanks(coronalDir, "ICBM_UCLA_1297_Coronal_", genSize[1], "jpg", [fileCount, genSize[1]])
    generateCoronal(coronalDir, genSize, refFileNames)
    
    print "DONE"
    

def generateCoronal(blankDir, genSize, refFileNames):
    print("GENERATING CORONAL...")
    for root, dirs, files in os.walk(blankDir):
       for i in range(0, len(files)): # i is 256
            fn = root + "/" + files[i]
            
            img = Image.open(fn) 
            pix = img.load()
            size = img.size;         

            for k in range(0, len(refFileNames)):
                
                refImg = Image.open(refFileNames[len(refFileNames) -k -1]);
                refPx = refImg.load();
                refSize = refImg.size;
                
                for j in range(0, refSize[1]): # j is 256
                    pix[k, j] = refPx[ i , j]
            
            #img = img.resize((genSize[0], genSize[1]), Image.BICUBIC)
            img.save(fn, "JPEG");
            
                

def generateAxial(blankDir, genSize, refFileNames):
    print("GENERATING AXIAL...")
    for root, dirs, files in os.walk(blankDir):
       for i in range(0, len(files)): # i is 160
            fn = root + "/" + files[i]
            
            img = Image.open(fn) 
            pix = img.load()
            size = img.size;         

            for k in range(0, len(refFileNames)):
                #print ("OPENING: " + imagePath + "/" + refFileNames[k])
                refImg = Image.open(refFileNames[k]);
                refPx = refImg.load();
                refSize = refImg.size;
                for j in range(0, refSize[1]): # j is 256
                    pix[k, j] = refPx[ j , (refSize[1]- i -1)]
            
            #img = img.resize((genSize[0], genSize[1]), Image.BICUBIC)
            img.save(fn, "JPEG");



def makeNumStr(num, totalNums):
    totalStr = str(totalNums)
    
    numStr = str(num)
    
    if (len(numStr) < len(totalStr)):
        while len(numStr) < len(totalStr):
            numStr = "0" + numStr
    
    return numStr
    
    
def createBlanks(location, filename, numFiles, type, size):
    for x in range(1, numFiles+1):
        img = Image.new( 'L', (size[0] , size[1]), "black") # create a new black image
        pixels = img.load() # create the pixel map
         
        for i in range(img.size[0]):    # for every pixel:
            for j in range(img.size[1]):
                pixels[i,j] = 0 # set the colour accordingly
        
        newFn = os.path.join(location, filename + "_" + makeNumStr(x, numFiles)) + ".jpg"
        #print "MAKING: " + newFn
        img.save(newFn, "JPEG")   
        
        

if __name__ == "__main__":
    main()