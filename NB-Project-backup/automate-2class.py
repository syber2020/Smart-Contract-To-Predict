import numpy as np
#import pandas as pd
import os

#node = 'node -r esm ./build/automation/typescript/automation/mitigation-2.js "http://127.0.0.1:8545" "place team glass leaf skin ice main jaguar avocado foil stand charge" "temp.txt" "output.txt"'
# node = 'node -r esm ./build/automation/typescript/automation/binaryclass.js "http://127.0.0.1:8545" "copper easy program later fruit earth chair enjoy bone wild grace nuclear" "feature-2class.txt" "predicted-2class.txt" "2class-gasuse" "time-2class"'

node = 'node -r esm ./build/automation/typescript/automation/binaryclass.js "https://ropsten.infura.io/v3/0337bb9e0a074dfd8de737681ba9eead" "grit start safe lonely dirt palace short judge quiz process tomorrow avoid" "feature-2class.txt" "predicted-2class.txt" "2class-gasuse" "time-2class"'
file1 = open('class2_File.txt', 'r')
Lines = file1.readlines()
step =3
for i in range(0, len(Lines), 3):
    file2 =open('feature-2class.txt','w')
    print("................................ITERATING ",i," execution")
    print("................................ITERATING ",i," execution")
    print("................................ITERATING ",i," execution")
    print("................................ITERATING ",i," execution")
    file2.writelines(Lines[i])
    file2.writelines(Lines[i+1])
    file2.writelines(Lines[i+2])
    print (Lines[i])
    print (Lines[i+1])
    print (Lines[i+2])
    file2.close()
    os.system(node)
