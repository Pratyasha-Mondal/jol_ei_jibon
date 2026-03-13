# ------------------------------------
# Import Libraries
# ------------------------------------
import pandas as pd
import joblib
import sys


# ------------------------------------
# Load trained model
# ------------------------------------
model = joblib.load("water_quality_xgboost_model.pkl")


# ------------------------------------
# Load label encoder
# ------------------------------------
label_encoder = joblib.load("label_encoder.pkl")


# ------------------------------------
# Load test dataset
# ------------------------------------
df = pd.read_csv("water_quality_final_test.csv")


# ------------------------------------
# Ensure Timestamp is string
# ------------------------------------
df["Timestamp"] = df["Timestamp"].astype(str)


# ------------------------------------
# Ask user for timestamp
# ------------------------------------
timestamp = input("Enter timestamp (YYYY-MM-DD): ").strip()


# ------------------------------------
# Find matching row
# ------------------------------------
row = df[df["Timestamp"] == timestamp]

if row.empty:
    print("❌ No data found for this timestamp")
    sys.exit()


# ------------------------------------
# Features used in training
# ------------------------------------
features = [
    "Temperature",
    "D.O",
    "pH",
    "Conductivity",
    "B.O.D",
    "Nitrate",
    "Fecalcaliform",
    "Totalcaliform"
]


X = row[features]


# ------------------------------------
# Predict
# ------------------------------------
prediction_encoded = model.predict(X)[0]

prediction = label_encoder.inverse_transform([prediction_encoded])[0]


# ------------------------------------
# Actual class
# ------------------------------------
actual = row["Water_Class"].values[0]


# ------------------------------------
# Output
# ------------------------------------
print("\n--------------------------------")
print("Prediction :", prediction)
print("Actual     :", actual)
print("--------------------------------")


# ------------------------------------
# Check correctness
# ------------------------------------
if prediction == actual:
    print("✅ Model prediction matches WQS classification")
else:
    print("❌ Model prediction does NOT match WQS classification")