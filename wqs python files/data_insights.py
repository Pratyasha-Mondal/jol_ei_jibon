import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv(r"C:\Users\Annwesha Das\Desktop\jol_ei_jibon\jol_ei_jibon\datasets\water_quality_final.csv")

# Correlation heatmap
plt.figure(figsize=(10,8))

sns.heatmap(
    df[[
        "Temperature",
        "D.O",
        "pH",
        "Conductivity",
        "B.O.D",
        "Nitrate",
        "Fecalcaliform",
        "Totalcaliform",
        "WQS"
    ]].corr(),
    annot=True,
    cmap="coolwarm"
)

plt.title("Correlation Between Water Quality Parameters")

plt.show()

# Detect pollution hotspots
hotspots = df[df["WQS"] < 55]

print("\nPollution Hotspots:\n")
print(hotspots[["Area","Timestamp","WQS","Water_Class"]])

# Pollution distribution by area
pollution_counts = df.groupby("Area")["Water_Class"].value_counts()

print("\nPollution Count by Area:\n")
print(pollution_counts)

# Distribution chart
sns.countplot(data=df, x="Water_Class")

plt.title("Water Quality Distribution")

plt.show()