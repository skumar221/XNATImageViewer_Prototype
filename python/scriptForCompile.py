import sys
import os
import shutil
from datetime import datetime


def createBackup(rootDir, backupPath):
    for root, dirs, files in os.walk(rootDir):
       for f in files:
           filename = (f).replace('\\', "/")
           rVal = root.replace(rootDir, "")
           dst = (os.path.join("./", backupPath + "/" + rVal + "/" + filename)).replace("\\", "/").replace("//", "/")           
           src = os.path.join(root, filename)                                                                                                            
           
           # make paths that don't exist
           if (not os.path.exists(os.path.dirname(dst))):
                os.makedirs(os.path.dirname(dst))
           
           # copy files to backup
           shutil.copyfile(src, dst)
    
   
           
def replaceInFile(src, findStr, replaceStr):
   
   # read the file line by line, store it.
   lines = [line for line in open(src)]
   newLines = []
   for l in lines:
       l = l.replace(findStr, replaceStr)
       newLines.append(l)

   try:
       fl = open(src, 'w')
       for item in newLines:
           fl.write("%s" % item)
       fl.close()
       print "Replaced '%s' with '%s' in %s."%(findStr, replaceStr, src)
   except ValueError:
        print ValueError    
        
        
        
def main():
    
    indexFile = "../index-uncompressed.html"
    namespaceDir = "../scripts/utils"


    textArr = [];
    nameSpaces = [];

   
    #
    # Parse index-uncompressed for scripts
    #
    lines = [line for line in open(indexFile)]
    for l in lines:
        if (".js" in l):
            if (not "testscans" in l):
                
                scr = l.split("src=")[1].split('"')[1]
                print scr
                textArr.append(scr)


    #
    # Parse the namespace dir for namespaces
    #
    for root, dirs, files in os.walk(namespaceDir):
       for f in files:
           if f.endswith('.js'):
               lines = [line for line in open(os.path.join(root, f))]
               for l in lines:
                   if ("goog.exportSymbol" in l):
                       nameSpaces.append(l.split(",")[1].split(")")[0].strip())
    
    
    namespaceStr = ""
    for n in nameSpaces:
        namespaceStr += '--n="' + n + '" '
    
    print namespaceStr
    
    
    startStr = "python closure-library/closure/bin/build/closurebuilder.py --root=closure-library/ --root=scripts/utils/  "
    midStr = ""
    endStr = "--output_mode=compiled --compiler_jar=../GoogleClosure/compiler.jar --output_file=utils-compiled.js"
    advancedStr = '--compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS"'

    for t in textArr:
        if ("utils" in t and not "jquery" in t):
            midStr += "--i=" + t.replace("./", "") + " "

    print midStr    
    #print startStr + namespaceStr + midStr + endStr
    print startStr + namespaceStr + endStr
    #print startStr + '--n="utils" ' + endStr
if __name__ == "__main__":
    main()
