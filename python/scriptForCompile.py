import sys
import os
import shutil
from datetime import datetime

        
        
def main():
    
    indexFile = "../index-uncompressed.html"
    namespaceDir = "../scripts"
    textArr = [];
    nameSpaces = [];

   
    #
    # Parse indexFile for "<script" tag to identify scripts
    #
    lines = [line for line in open(indexFile)]
    for l in lines:
        if (".js" in l):
            if (not "testscans" in l):
                
                scr = l.split("src=")[1].split('"')[1]
                print scr
                textArr.append(scr)


    #
    # Get namespaces by os.walk, opening files, and looking for "goog.exportSymbol"
    #
    for root, dirs, files in os.walk(namespaceDir):
       for f in files:
           if f.endswith('.js'):
               lines = [line for line in open(os.path.join(root, f))]
               currLine = ""
               beginLine = False
               for l in lines:
                   l = l.strip()
                   if ("goog.exportSymbol" in l) and ("(" in l):
                       currLine = l
                       print "\n\nBEGIN STREAM: ", l
                       beginLine = True
                   if beginLine:
                       if (l != currLine):
                           print "\tADDING: ", l, "to", currLine
                           currLine += l
                           print "\tCURRLINE: ", currLine
                       if (")" in l):
                           v = currLine.split(",")[1].split(")")[0].strip();
                           print "FINAL LINE: ", currLine
                           print "END STREAM: ", v
                           nameSpaces.append(v)
                           beginLine = False

    #
    # Append to final namespace string
    #
    namespaceStr = ""
    #for n in nameSpaces:
    #    namespaceStr += '--n="' + n + '" '
    
    
    #
    # Get the files to include
    #
    for root, dirs, files in os.walk(namespaceDir):
       for f in files:
           #if (root.endswith('functions')) and (not f.startswith(".")):
           if (not f.startswith(".") and (f.endswith(".js"))): 
               filepath = os.path.abspath(os.path.join(root, f))
               #print filepath
               s = ' --i=' + filepath
               #print s
               totalPath = filepath.split("/")
               filename = totalPath[-1]
               threePath = totalPath[-2] + "/" + totalPath[-1]

               if (len(totalPath) > 2):
                   threePath = totalPath[-3] + "/" + threePath
 
               #
               # Check duplicates
               #
               addStrToNamespace = True
               if  (threePath in namespaceStr):
                   
                   #print '\n', threePath, " already found!"
                   startNum = namespaceStr.find(threePath, 0)
                   #print "HERE: ", namespaceStr[startNum-70 : startNum + len(threePath)]
                   #print filepath
                   #print filepath in namespaceStr
                   addStrToNamespace = False
                   
               if (addStrToNamespace): 
                   if ("goog/base" in s):
                       print "**************************", s
                   namespaceStr += " " + s + " "

    
    #
    # Define surrounding strings
    #
    startStr = "python /Users/sunilkumar/Desktop/Work/XNATImageViewerTesting/scripts/utils/lib/X/lib/google-closure-library/closure/bin/build/closurebuilder.py --root=/Users/sunilkumar/Desktop/Work/XNATImageViewerTesting/scripts/ "
    midStr = ""
    endStr = "--output_mode=compiled --compiler_jar=/Users/sunilkumar/Desktop/Work/XNATImageViewerTesting/scripts/utils/lib/X/lib/google-closure-compiler/compiler.jar --output_file=/Users/sunilkumar/Desktop/Work/XNATImageViewerTesting/TESTCOMPILE.js"
    advancedStr = ' --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" '
    
    
    #
    # Doublecheck the namespace string
    # to see if there are duplicates
    #
    namespaceArr = namespaceStr.split(" ")
    cleanArr = []
    for a in namespaceArr:
        a = a.strip()
        if (len(a) > 0):
            cleanArr.append(a)
    #for a in cleanArr:
    #    print a, (cleanArr.count(a))
        
    #print 
    advancedfinalStr = startStr + namespaceStr + endStr + advancedStr + " > /Users/sunilkumar/Desktop/Work/XNATImageViewerTesting/build.txt"
    uncompiledfinalStr = startStr + namespaceStr + "> /Users/sunilkumar/Desktop/Work/XNATImageViewerTesting/build.txt"
    #print advancedfinalStr
    #print uncompiledfinalStr

    #os.system(finalStr)
    os.system(advancedfinalStr)

    
if __name__ == "__main__":
    main()
