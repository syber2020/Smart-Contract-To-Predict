import numpy as np
#import pandas as pd
import os

#node = 'node -r esm ./build/automation/typescript/automation/mitigation-2.js "http://127.0.0.1:8545" "place team glass leaf skin ice main jaguar avocado foil stand charge" "temp.txt" "output.txt"'
#node = 'node -r esm ./build/automation/typescript/automation/Classify3.js "http://127.0.0.1:8545" "copper easy program later fruit earth chair enjoy bone wild grace nuclear" "feature-3class.txt" "predicted-3class.txt" "3class-gasuse" "time-3class"'
node = 'node -r esm ./build/automation/typescript/automation/Classify3.js "https://ropsten.infura.io/v3/0337bb9e0a074dfd8de737681ba9eead" "grit start safe lonely dirt palace short judge quiz process tomorrow avoid" "feature-3class.txt" "predicted-3class.txt" "3class-gasuse" "time-3class"'
file1 = open('class3_File.txt', 'r')
Lines = file1.readlines()
step =4
for i in range(0, len(Lines), 4):
    file2 =open('feature-3class.txt','w')
    print("Iteration number",i)
    file2.writelines(Lines[i])
    file2.writelines(Lines[i+1])
    file2.writelines(Lines[i+2])
    file2.writelines(Lines[i+3])
    file2.close()
    os.system(node)
