import pandas as pd
import numpy as np
from sklearn.neighbors import KNeighborsClassifier
from flask import Flask, jsonify, render_template, request
import pickle
from flask_cors import CORS
import collections
import tensorflow as tf

app = Flask(__name__)
CORS(app)

model= pickle.load(open('model.pkl', 'rb'))

crops = ['rice', 'maize', 'chickpea', 'kidneybeans', 'pigeonpeas',
       'mothbeans', 'mungbean', 'blackgram', 'lentil', 'pomegranate',
       'banana', 'mango', 'grapes', 'watermelon', 'muskmelon', 'apple',
       'orange', 'papaya', 'coconut', 'cotton', 'jute', 'coffee']
data = pd.read_csv('Crop_recommendation.csv')
y = data['label']

# @app.route('/')
# def home():
#     return render_template('index.html')

# @app.route('/predict', methods = ['POST'])
# def predict():
#     features = [int(x) for x in request.form.values()]
#     features = np.array(features)
#     final_features = tf.expand_dims(features, 0)
#     pred = model.predict(final_features)

#     output = crops[np.argmax(pred)]
#     return render_template('index.html', prediction_text = 'Best suited crop is $ {}'.format(output))

@app.route('/predict/<string:features>', methods = ['POST'])
def predict(features):
#     data = request.get_json(force = True)
    f = [float(x) for x in features.split()]
    # distances, indices = model.kneighbors(np.reshape(f, (1, -1)),  n_neighbors=3)
    # output = [y[i] for i in indices]
    # output = list(output)
    # if all(count == 1 for count in collections.Counter(output).values()):
    #     print("nice")
    pred = model.predict(tf.expand_dims(f, 0))
    output = crops[np.argmax(pred)]
    ans = {
        "crop" : output
    }
    return ans

if __name__ ==  "__main__":
    app.run(debug = True)
# t = "1 1 1 1 1 1 1"
# a = predict(t)
