import pandas as pd 
df = pd.read_excel(r"C:\Users\Annwesha Das\Desktop\jol_ei_jibon\jol_ei_jibon\datasets\kolkata_water_quality_timeseries.xlsx")
df.to_csv(r"C:\Users\Annwesha Das\Desktop\jol_ei_jibon\jol_ei_jibon\datasets\kolkata_water_quality_timeseries.csv", index=False)
print("conversion successful!")