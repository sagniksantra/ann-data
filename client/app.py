from flask import Flask, jsonify
from flask_cors import CORS
# from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, AutoModelForCausalLM
# from transformers import pipeline
import torch
import os
import base64
import textwrap
from langchain.embeddings import SentenceTransformerEmbeddings
from langchain.vectorstores import Chroma 
from langchain.llms import HuggingFacePipeline
from langchain.chains import RetrievalQA, ConversationalRetrievalChain, LLMChain
from langchain.chains.question_answering import load_qa_chain
from langchain.chains.conversational_retrieval.prompts import CONDENSE_QUESTION_PROMPT
from langchain.memory import ConversationBufferMemory
from langchain.llms import OpenAI
from langchain.chat_models import ChatOpenAI
from langchain.embeddings.openai import OpenAIEmbeddings
from constants import CHROMA_SETTINGS

app = Flask(__name__)
CORS(app)
#model and tokenizer loading
# checkpoint = "LaMini-Cerebras-590M"
# tokenizer = AutoTokenizer.from_pretrained(checkpoint)
# base_model = AutoModelForSeq2SeqLM.from_pretrained(checkpoint, device_map='cpu', torch_dtype=torch.float32)
# base_model = AutoModelForCausalLM.from_pretrained(checkpoint, device_map='cpu', torch_dtype=torch.float32)

os.environ["OPENAI_API_KEY"] = "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"
os.environ["TOKENIZERS_PARALLELISM"] = "False"
# llm = OpenAI(openai_api_key=openai_api_key, temperature=0)
llm = ChatOpenAI(openai_api_key=os.environ["OPENAI_API_KEY"], temperature=0.1, model="gpt-3.5-turbo")

# def llm_pipeline():
#     pipe = pipeline(
#         # 'text2text-generation',
#         'text-generation',
#         model = base_model,
#         tokenizer = tokenizer,
#         max_length = 2000,
#         do_sample=True,
#         temperature = 0.01,
#         top_p = 0.95
#     )
#     local_llm = HuggingFacePipeline(pipeline=pipe)
#     return local_llm

# def qa_llm():
    # llm = llm_pipeline()
    # embeddings = OpenAIEmbeddings(model="text-embedding-ada-002")
    
    # qa = RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=retriever, return_source_documents=True)
    # question_generator = LLMChain(llm=llm, prompt=CONDENSE_QUESTION_PROMPT)
    # doc_chain = load_qa_chain(llm, chain_type="map_reduce")
    
    # qa = ConversationalRetrievalChain(
    #     retriever=retriever,
    #     question_generator=question_generator,
    #     combine_docs_chain=doc_chain,
    #     memory=memory,
    # )
    # return qa
# chat_history = []


@app.route('/chatbot/<string:instruction>', methods=['POST'])
def process_answer(instruction):
    print(f'Received request with instruction: {instruction}')
    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
    embeddings = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
    db = Chroma(persist_directory="db", embedding_function=embeddings, client_settings=CHROMA_SETTINGS)
    
    retriever = db.as_retriever()
    qa = ConversationalRetrievalChain.from_llm(llm, retriever=retriever, memory = memory)

    instruction = instruction
    # qa = qa_llm()
    # generated_text = qa(instruction)
    # answer = generated_text['result']
    generated_text = qa({"question": instruction})
    answer = generated_text['answer']
    result = {
        "Answer": answer
    }
    # memory.save_context({"input": instruction}, {"output": answer})
    # chat_history.append((instruction, answer))
    # print(chat_history)
    return result
# answer, metadata = process_answer("What are the steps of MCQA test for a 16ch shoulder coil?")
# print(answer)

if __name__ == '__main__':
    app.run(debug = True)