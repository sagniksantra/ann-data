ry = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
        embeddings = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
        db = Chroma(persist_directory="db", embedding_function=embeddings, client_settings=CHROMA_SETTINGS)
        
        retriever = db.as_retriever()
        qa = ConversationalRetrievalChain.from_llm(llm, retriever=retriever, memory = memory)

        l = translator.detect(instruction)
        if (source != des):
            if (l.lang != source):
                raise Exception("Wrong language")
            else:
                instruction = translator.translate(instruction, src = source, dest = des)
            instruction = instruction.text
    #  print(instruction)
        # qa = qa_llm()
        # generated_text = qa(instruction)
        # answer = generated_text['result']
        generated_text = qa({"question": instruction})
        answer = generated_text['answer']
        ans = {
            "Answer": answer
        }