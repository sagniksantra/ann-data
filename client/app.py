import os
import openai
import pandas as pd
import numpy as np
from sklearn.neighbors import KNeighborsClassifier
import tensorflow as tf
from flask import Flask, jsonify
from flask_cors import CORS
from langchain.chat_models import ChatOpenAI
import pickle
from googletrans import Translator
from langchain.embeddings import SentenceTransformerEmbeddings
from langchain.vectorstores import Chroma
from langchain.memory import ConversationBufferMemory
from langchain.llms import HuggingFacePipeline
from langchain.chains import RetrievalQA, ConversationalRetrievalChain, LLMChain
from constants import CHROMA_SETTINGS 

app = Flask(__name__)
CORS(app)


os.environ["TOKENIZERS_PARALLELISM"] = "False"
# llm = OpenAI(openai_api_key=openai_api_key, temperature=0)
llm = ChatOpenAI(openai_api_key=os.environ["OPENAI_API_KEY"], temperature=0.1, model="gpt-3.5-turbo")

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

model = pickle.load(open('model.pkl', 'rb'))
translator = Translator()

@app.route('/rec/<string:details>', methods = ['POST'])
def get_rec(details):
    state, district, season = details.split()

    # translate state
    # state_l = translator.detect(state)
    # if (state_l.lang != 'en'):
    #     state_t = translator.translate(state, src = state_l.lang, dest = 'en')
    #     state = state_t.text
    # #translate district
    # district_l = translator.detect(district)
    # if (district_l.lang != 'en'):
    #     district_t = translator.translate(district, src = district_l.lang, dest = 'en')
    #     district = district_t.text
    # #translate season
    # season_l = translator.detect(season)
    # if (season_l.lang != 'en'):
    #     season_t = translator.translate(season, src = season_l.lang, dest = 'en')
    #     season = season_t.text
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

@app.route('/chatbot/<string:instruction>/<string:source>/<string:des>/<int:ch>', methods = ['POST'])
def chatgpt_call(instruction, source, des, ch):
    if (ch == 0):
    #     memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
    #     embeddings = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
    #     db = Chroma(persist_directory="db", embedding_function=embeddings, client_settings=CHROMA_SETTINGS)
        
    #     retriever = db.as_retriever()
    #     qa = ConversationalRetrievalChain.from_llm(llm, retriever=retriever, memory = memory)

    #     l = translator.detect(instruction)
    #     if (source != des):
    #         if (l.lang != source):
    #             raise Exception("Wrong language")
    #         else:
    #             instruction = translator.translate(instruction, src = source, dest = des)
    #         instruction = instruction.text
    # #  print(instruction)
    #     # qa = qa_llm()
    #     # generated_text = qa(instruction)
    #     # answer = generated_text['result']
    #     generated_text = qa({"question": instruction})
    #     answer = generated_text['answer']
    #     ans = {
    #         "Answer": answer
    #     }
        l = translator.detect(instruction)
        if (source != des):
            if (l.lang != source):
                raise Exception("Wrong language")
            else:
                instruction = translator.translate(instruction, src = source, dest = des)
            instruction = instruction.text
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": instruction}]
        )
        answer = response.choices[0].message["content"]
        ans = {
            "Answer": answer           
        }
    elif (ch == 1):
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": instruction}]
        )
        answer = response.choices[0].message["content"]
        answer_l = translator.detect(answer)
        if (answer_l.lang != 'hi'):
            answer_hin = translator.translate(answer, src = source, dest = 'hi')
            ans = {
                "Answer": answer,
                "Hindi" : answer_hin.text
            }
        else:
            ans = {
            "   Answer": answer
            }
    # print(ans)
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

if __name__ == "__main__":
   app.run(debug = True)