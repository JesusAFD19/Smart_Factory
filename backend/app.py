# Librerías
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import paho.mqtt.client as mqtt
from dotenv import load_dotenv
load_dotenv()
import os

# Nueva instancia de Flask
app = Flask(__name__)
CORS(app, origins=[os.getenv('FRONTEND_SERVER')], methods=['GET', 'POST'], headers=['Content-Type', 'Authorization'])

# Variables
shapes = ['Bird','Cat','Fish','House','Plane','Rocket','Swan','Tree']
piecesDict = {
    'r-blue' : '^',
    's-yellow' : 'I',
    't-purple' : '7',
    't-brown' : '3',
    't-green' : 't',
    't-orange' : 'U',
    't-red' : 'r',
}
mqtt_client = mqtt.Client()
#broker_address = "34.125.48.250"
mqtt_client.connect("broker.mqttdashboard.com", 1883, 60)

# Funciones
def format_message(message):
    hashed_msg = [piecesDict[piece] for piece in message.split('/')]
    return hashed_msg

def send_mqtt(topic, message):
    mqtt_client.publish(topic, message)
    mqtt_client.disconnect()
    print(f'MQTT => Petición {topic} enviada')
    print(f'... {message}')

# Cards API Route
@app.route('/cards')
def get_cards():
    # Lista de cartas a renderizar
    return {
        'Shapes': shapes,
        'Pieces': list(piecesDict),
    }
@app.route('/cards/<folder>/<image>')
def get_image(folder, image):
    # Retornamos imagen de carta
    return send_from_directory('static/'+folder, image)

# SendMqtt API Route
@app.route('/sendMqtt', methods=['POST'])
def send_message():
    message = request.json.get('message')
    message['pieces'] = format_message(message['pieces'])
    send_mqtt('assembly', message['shape'] + '/' + '/'.join(message['pieces']))
    return jsonify('String recibido con éxito')

# Ejecución de la aplicación
if __name__ == '__main__':
    app.run(debug=True)
