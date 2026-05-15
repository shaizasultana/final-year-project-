#import libraries
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np
import sklearn
from sklearn.cluster import KMeans
from sklearn.preprocessing import LabelEncoder
#this dataset is choose for this project because it includes 9 standardized questions assessing depression symptoms
#the dataset has the answers represented numbers as shown on the report of this open data set https://data.mendeley.com/datasets/kkzjk253cy/6 
#also useful for my project as the data set is from young adults aged 17-26 years
#Responses are scored on a 4-point scale from 0 (Not at all) to 3 (Nearly every day) with total scores ranging from 0 to 27

#Minimal (0-4): 206 participants (30.2%)
#Mild (5-9): 155 participants (22.7%)
#Moderate (10-14): 128 participants (18.8%)
#Moderately Severe (15-19): 125 participants (18.3%)
#Severe (20-27): 68 participants (10.0%)
#for my prject i will group minimal and mild and moderate and moderately severtely and servere so there are 3 groups 

data=pd.read_csv("C:/Users/Shaiz/Downloads/PHQ-9_Dataset_5th Edition.csv")
list(data)#will remove the unrelavent columns so age gender and  'PHQ_Severity','Sleep Quality' 'Study Pressure','Financial Pressure']

del data['Age']
del data['Gender']
del data['Sleep Quality']
del data ['Study Pressure']
del data['Financial Pressure']
del data['PHQ_Severity']#removing these because there are not useful for the app 

mapping = {
    "Not at all": 0,
    "Several days": 1,
    "More than half the days": 2,
    "Nearly every day": 3
}

question_columns = data.columns.drop("PHQ_Total")
#based on the data using answers that are also based on number as it showns in the report of where this database was found i change the answrs to the numbers 
data[question_columns] = data[question_columns].replace(mapping)

#so clustering groups will be 
#mild (0-9):
#Moderate (10-19): 
#Severe (20-27):

X = data[question_columns]

kmeans = KMeans(n_clusters=3, random_state=42)
data["Cluster"] = kmeans.fit_predict(X)
cluster_summary = data.groupby("Cluster")["PHQ_Total"].mean()

print(cluster_summary)

cluster_means = data.groupby("Cluster")["PHQ_Total"].mean().sort_values()


severity_map = {
    cluster_means.index[0]: "Mild",
    cluster_means.index[1]: "Moderate",
    cluster_means.index[2]: "Severe"
}

data["Severity_Group"] = data["Cluster"].map(severity_map)

print(data[["PHQ_Total", "Cluster", "Severity_Group"]].head())
