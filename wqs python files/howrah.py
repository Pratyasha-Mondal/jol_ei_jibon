import pandas as pd
import matplotlib.pyplot as plt

# Load dataset
df = pd.read_csv(r"C:\Users\Annwesha Das\Desktop\jol_ei_jibon\jol_ei_jibon\datasets\water_quality_final.csv")

# Convert timestamp
df["Timestamp"] = pd.to_datetime(df["Timestamp"])

# Filter Howrah Ghat
howrah_df = df[df["Area"] == "Howrah Ghat"]

# Sort by date
howrah_df = howrah_df.sort_values("Timestamp")

# Plot
plt.figure(figsize=(12,6))

plt.bar(howrah_df["Timestamp"], howrah_df["WQS"])

plt.title("Water Quality Score Over Time - Howrah Ghat")
plt.xlabel("Timestamp")
plt.ylabel("WQS")

plt.xticks(rotation=45)

plt.grid(axis="y")

plt.show()