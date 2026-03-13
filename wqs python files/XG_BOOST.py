# -------------------------------------
# Import Libraries
# -------------------------------------
import pandas as pd
import joblib
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.preprocessing import LabelEncoder

from xgboost import XGBClassifier


# -------------------------------------
# Load Train Dataset
# -------------------------------------
train_df = pd.read_csv("water_quality_final_train.csv")


# -------------------------------------
# Load Test Dataset
# -------------------------------------
test_df = pd.read_csv("water_quality_final_test.csv")


# -------------------------------------
# Features used for training
# -------------------------------------
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


# -------------------------------------
# Input Features
# -------------------------------------
X_train = train_df[features]
X_test = test_df[features]


# -------------------------------------
# Target Column
# -------------------------------------
y_train = train_df["Water_Class"]
y_test = test_df["Water_Class"]


# -------------------------------------
# Encode Labels
# -------------------------------------
label_encoder = LabelEncoder()

y_train = label_encoder.fit_transform(y_train)
y_test = label_encoder.transform(y_test)


# -------------------------------------
# XGBoost Model
# -------------------------------------
model = XGBClassifier(
    n_estimators=300,
    learning_rate=0.05,
    max_depth=6,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42,
    eval_metric="mlogloss"
)


# -------------------------------------
# Train Model
# -------------------------------------
model.fit(X_train, y_train)


# -------------------------------------
# Make Predictions
# -------------------------------------
predictions = model.predict(X_test)


# -------------------------------------
# Model Accuracy
# -------------------------------------
accuracy = accuracy_score(y_test, predictions)

print("\nModel Accuracy:", accuracy)


# -------------------------------------
# Classification Report
# -------------------------------------
print("\nClassification Report\n")

print(
    classification_report(
        y_test,
        predictions,
        target_names=label_encoder.classes_
    )
)


# -------------------------------------
# Confusion Matrix
# -------------------------------------
cm = confusion_matrix(y_test, predictions)

plt.figure(figsize=(6,5))

sns.heatmap(
    cm,
    annot=True,
    fmt="d",
    cmap="Blues",
    xticklabels=label_encoder.classes_,
    yticklabels=label_encoder.classes_
)

plt.title("Confusion Matrix")
plt.xlabel("Predicted")
plt.ylabel("Actual")

plt.tight_layout()
plt.show()


# -------------------------------------
# Feature Importance
# -------------------------------------
importance = pd.Series(
    model.feature_importances_,
    index=features
).sort_values(ascending=False)

print("\nFeature Importance\n")
print(importance)

importance.plot(kind="bar", title="Feature Importance")

plt.tight_layout()
plt.show()


# -------------------------------------
# Save Model and Encoder
# -------------------------------------
joblib.dump(model, "water_quality_xgboost_model.pkl")
joblib.dump(label_encoder, "label_encoder.pkl")

print("\nModel saved as water_quality_xgboost_model.pkl")
print("Label encoder saved as label_encoder.pkl")