import sys
import os

def main():
    
    filePaths = ["../TESTSCANS/09_Defaced", "../TESTSCANS/10_Defaced", "../TESTSCANS/19_Defaced", "../TESTSCANS/20_Defaced", "../TESTSCANS/21_Defaced"]

    for p in filePaths:
        for root, dirs, files in os.walk(p):
           for f in files:
               
               a = root + os.sep + f
               b = a.replace("-Defaced", "_Defaced")
               if b != a:
                   print "Renaming %s with %s"%(a, b)
                   os.rename(a, b)



if __name__ == "__main__":
    main()