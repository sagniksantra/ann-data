import os
import openai
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

openai.api_key ="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"

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

# prompt = "I am a farmer from {User.location} and my plant has {Predicted disease name}, how should i treat that. Give a detailed answer with a step by step procedure including all details. in the answer , include the necessary steps, fertilizers, medicines."
# response = chatgpt_call(prompt)
# print(response)
if __name__ == "__main__":
   app.run(debug = True)