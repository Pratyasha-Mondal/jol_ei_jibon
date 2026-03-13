import pandas as pd 
df = pd.read_excel(r"C:\Users\Annwesha Das\Desktop\jol_ei_jibon\jol_ei_jibon\datasets\water_quality_final.xlsx")
df.to_csv("water_quality_final.csv", index=False)
print("conversion successful!")