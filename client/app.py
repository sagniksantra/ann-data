import os
import openai
import pandas as pd
import numpy as np
from sklearn.neighbors import KNeighborsClassifier
import tensorflow as tf
from flask import Flask, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)

openai.api_key ="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"
model= pickle.load(open('model.pkl', 'rb'))

crops = ['rice', 'maize', 'chickpea', 'kidneybeans', 'pigeonpeas',
       'mothbeans', 'mungbean', 'blackgram', 'lentil', 'pomegranate',
       'banana', 'mango', 'grapes', 'watermelon', 'muskmelon', 'apple',
       'orange', 'papaya', 'coconut', 'cotton', 'jute', 'coffee']
data = pd.read_csv('Crop_recommendation.csv')
y = data['label']

df = pd.read_csv('crop_production.csv')
df = df.drop(['index'], axis = 1)
df.fillna(df['Production'].mean(), inplace = True)

cols = ['State_Name','District_Name','Season', 'Crop']
for i in cols:
    df[i] = [s.strip() for s in df[i]]
    df[i] = [s.replace(' ', '') for s in df[i]]
    df[i] = [s.lower() for s in df[i]]

@app.route('/rec/<string:details>', methods = ['POST'])
def get_rec(details):
    state, district, season = details.split()
    x1 = df[df.State_Name == state]
    x2 = x1[x1.District_Name == district]
    x3 = x2[x2.Season == season]
    crops = x3['Crop'].unique()
    maxi = 0
    max_ind = 0
    total_dict = {}
    for i, crop in enumerate(crops):
        y = x3[x3.Crop == crop]
        total = 0
        for a, p in zip(y.Area, y.Production):
            total += (p/a)
        total_dict[total] = i
 
    myKeys = list(total_dict.keys())
    myKeys.sort(reverse = True)
    sorted_dict = {i: total_dict[i] for i in myKeys}
    ans = {}
    indexes = list(sorted_dict.values())
    cnt = 0
    for i in range(len(crops)):
        if (cnt >= 5):
            break
        s = "crop" + str(i + 1)
        ans[s] = crops[indexes[i]]
        cnt += 1
 
    return  ans

@app.route('/chatbot/<string:prompt>', methods = ['POST'])
def chatgpt_call(prompt, model="gpt-3.5-turbo"):
   response = openai.ChatCompletion.create(
       model=model,
       messages=[{"role": "user", "content": prompt}]
   )
   ans = {
      "Answer" : response.choices[0].message["content"]
   }
   return ans

@app.route('/predict/<string:features>', methods = ['POST'])
def predict(features):
    f = [float(x) for x in features.split()]
    f = np.reshape(f, (1, -1))
    probs = model.predict_proba(f)
    best_n = np.flip(np.argsort(probs, axis=1)[:,-3:])
    ans = {
        "crop1" : crops[best_n[0][0]],
        "crop2" : crops[best_n[0][1]],
        "crop3" : crops[best_n[0][2]]
    }
    return ans

# prompt = "I am a farmer from {User.location} and my plant has {Predicted disease name}, how should i treat that. Give a detailed answer with a step by step procedure including all details. in the answer , include the necessary steps, fertilizers, medicines."
# response = chatgpt_call(prompt)
# print(response)
if __name__ == "__main__":
   app.run(debug = True)