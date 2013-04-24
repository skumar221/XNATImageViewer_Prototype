import sys
import os
import shutil


def main():
    
    saggitalPath = "../TESTSCANS/ICBM_UCLA_1297/saggital"
    axialPath = "../TESTSCANS/ICBM_UCLA_1297/axial"
    coronalPath = "../TESTSCANS/ICBM_UCLA_1297/coronal"
    
    generateListFiles(saggitalPath)
    generateListFiles(axialPath)
    generateListFiles(coronalPath)

def generateListFiles(pathName):
    str1 = "%sPaths: [\n"%(pathName.split("/")[-1]) 
    for root, dirs, files in os.walk(pathName):
       for f in files:
            fn = root + "/" + f
            str1 += "\""  + fn  + "\",\n"
  
    str1 += "],"
    
    print str1
    
if __name__ == "__main__":
    main()