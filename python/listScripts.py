import sys
import os

def main():
    
    scriptPath = "../scripts"
    
    """
    from os import listdir
    from os.path import isfile, join
    onlyfiles = [ f for f in listdir(mypath) if isfile(join(mypath,f)) ]
    
    print onlyfiles
    """
    s = []
    
    
    prependStr = '' #'<script src="'
    appendStr = '' #"></script>'
    
    for root, dirs, files in os.walk(scriptPath):
       for f in files:
           a = root + os.sep + f
           a = prependStr + a.replace("\\", "/").replace("..",".") + appendStr
           print '"' + a  + '"' + " ,"
           s.append(a)
 
    print s


if __name__ == "__main__":
    main()