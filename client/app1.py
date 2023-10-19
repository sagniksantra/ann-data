import tensorflow as tf
import numpy as np
from flask import Flask, jsonify, render_template, request
import pickle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# model  = load_model('rcrop_rec.h5')
model= pickle.load(open('model.pkl', 'rb'))

crops = ['rice', 'maize', 'chickpea', 'kidneybeans', 'pigeonpeas',
       'mothbeans', 'mungbean', 'blackgram', 'lentil', 'pomegranate',
       'banana', 'mango', 'grapes', 'watermelon', 'muskmelon', 'apple',
       'orange', 'papaya', 'coconut', 'cotton', 'jute', 'coffee']


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
    print(f)
    pred = model.predict(tf.expand_dims(f, 0))
    output = crops[np.argmax(pred)]
    ans = {
        "crop" : output
    }
    return ans

if __name__ ==  "__main__":
    app.run(debug = True)
# t = [1, 1, 1, 1, 1, 1, 1]
# a = predict(np.reshape(t, (1, -1)))
