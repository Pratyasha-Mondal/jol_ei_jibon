import pandas as pd
import numpy as np

# ================================
# STEP 1 : LOAD ORIGINAL DATASET
# ================================

file_path = r"C:\Users\Annwesha Das\Desktop\jol_ei_jibon\jol_ei_jibon\datasets\aquaattributes.xlsx"

df = pd.read_excel(file_path)

# shuffle rows
df = df.sample(frac=1).reset_index(drop=True)

rows_per_area = 325

areas = [
    "Howrah Ghat",
    "Babughat",
    "Dakshineswar",
    "Bally Bridge"
]

new_data = []

start_date = pd.to_datetime("2023-01-01")

for i, area in enumerate(areas):

    temp_df = df.iloc[i*rows_per_area:(i+1)*rows_per_area].copy()

    temp_df["Area"] = area

    temp_df["Timestamp"] = pd.date_range(
        start=start_date,
        periods=rows_per_area,
        freq="D"
    )

    new_data.append(temp_df)

final_df = pd.concat(new_data)

# remove unwanted columns
final_df = final_df.drop(columns=["State", "Capitalcity", "Stationcode","Locations"], errors="ignore")

# move Area and Timestamp to front
cols = ["Area", "Timestamp"] + [col for col in final_df.columns if col not in ["Area", "Timestamp"]]
final_df = final_df[cols]

# ================================
# SAVE TIMESERIES DATASET
# ================================

output_path = r"C:\Users\Annwesha Das\Desktop\jol_ei_jibon\jol_ei_jibon\datasets\kolkata_water_quality_timeseries.xlsx"

final_df.to_excel(output_path, index=False)

print("Dataset saved successfully!")
print(final_df.head())


# ================================
# STEP 2 : LOAD TIMESERIES DATA
# ================================

file_path = r"C:\Users\Annwesha Das\Desktop\jol_ei_jibon\jol_ei_jibon\datasets\kolkata_water_quality_timeseries.xlsx"

df = pd.read_excel(file_path)

print(df.head())


# ================================
# STEP 3 : DATA CLEANING
# ================================

numeric_cols = [
    "Temperature",
    "D.O",
    "pH",
    "Conductivity",
    "B.O.D",
    "Nitrate",
    "Fecalcaliform",
    "Totalcaliform"
]

for col in numeric_cols:
    df[col] = pd.to_numeric(df[col], errors="coerce")

# remove invalid values
df = df[(df["pH"] >= 0) & (df["pH"] <= 14)]
df = df[(df["D.O"] >= 0) & (df["D.O"] <= 20)]
df = df[(df["B.O.D"] >= 0) & (df["B.O.D"] <= 30)]
df = df[(df["Nitrate"] >= 0) & (df["Nitrate"] <= 50)]
df = df[(df["Conductivity"] >= 0) & (df["Conductivity"] <= 2000)]

# fill missing values
df = df.fillna(df.mean(numeric_only=True))

print("Data cleaned successfully")
print(df.head())

print(df.dtypes)


# ================================
# STEP 4 : WQS CALCULATION
# ================================

def chemical_score(row):

    nitrate = row["Nitrate"]
    bod = row["B.O.D"]
    conductivity = row["Conductivity"]

    score = 100 - (
        (nitrate / 50) * 40 +
        (bod / 30) * 40 +
        (conductivity / 2000) * 20
    )

    return max(score, 0)


def biological_score(row):

    bacteria = row["Fecalcaliform"]

    score = 100 * np.exp(-0.001 * bacteria)

    return score


def physical_score(row):

    ph = row["pH"]
    do = row["D.O"]

    ph_score = 100 - abs(7 - ph) * 15
    do_score = (do / 10) * 100

    score = (ph_score + do_score) / 2

    return max(min(score,100),0)


def source_score(row):

    source_map = {
        "Howrah Ghat":80,
        "Babughat":75,
        "Dakshineswar":78,
        "Bally Bridge":74
    }

    return source_map.get(row["Area"],70)


df["chemical_score"] = df.apply(chemical_score, axis=1)
df["biological_score"] = df.apply(biological_score, axis=1)
df["physical_score"] = df.apply(physical_score, axis=1)
df["source_score"] = df.apply(source_score, axis=1)

df["WQS"] = (
    0.40 * df["chemical_score"] +
    0.30 * df["biological_score"] +
    0.20 * df["physical_score"] +
    0.10 * df["source_score"]
)


# ================================
# STEP 5 : WATER CLASSIFICATION
# ================================

def classify_water(wqs):

    if wqs >= 75:
        return "Safe"

    elif wqs >= 55:
        return "Moderate"

    elif wqs >= 35:
        return "Polluted"

    else:
        return "Hazardous"


df["Water_Class"] = df["WQS"].apply(classify_water)


# ================================
# SAVE FINAL DATASET
# ================================

output_path = r"C:\Users\Annwesha Das\Desktop\jol_ei_jibon\jol_ei_jibon\datasets\water_quality_final.xlsx"

df.to_excel(output_path, index=False)

print("WQS calculation completed")