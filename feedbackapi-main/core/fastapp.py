import uvicorn
from fastapi import FastAPI
from Feedbacks import Feedback
import numpy as np
import pickle
import pandas as pd

app = FastAPI()
pickle_in = open("classifier.pkl","rb")
classifier = pickle.load(pickle_in)

@app.post('/predict')
def predict_tag(data:Feedback):
    data = data.dict()
    feedback = data['feedback']
    tag = classifier.predict([feedback])
    return {
        'tag': tag[0]
        }

if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1',port=8000)