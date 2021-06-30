import pika
import json 

def pushmsg(feedback,feedbackid):
    thisdict={
        "feedback":feedback,
        "feedbackid":feedbackid
    }
    
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
    channel = connection.channel()
    channel.queue_declare(queue='feedbacks')
    channel.basic_publish(exchange='', routing_key='feedbacks', body=json.dumps(thisdict))
    connection.close()