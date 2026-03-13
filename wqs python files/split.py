import pandas as pd
from sklearn.model_selection import train_test_split

# Load dataset
df = pd.read_csv(r"C:\Users\Annwesha Das\Desktop\jol_ei_jibon\jol_ei_jibon\datasets\water_quality_final.csv")


# Split dataset
train_df, test_df = train_test_split(
    df,
    test_size=0.2,
    random_state=42
)

# Save files
train_df.to_csv("water_quality_final_train.csv", index=False)
test_df.to_csv("water_quality_final_test.csv", index=False)

print("Dataset split completed.")
print("Train rows:", len(train_df))
print("Test rows:", len(test_df))