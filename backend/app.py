# Librerías
from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_cors import CORS
import paho.mqtt.client as mqtt


# Nueva instancia de Flask
app = Flask(__name__)


# Funciones
def send_mqtt(topic, message):
    client = mqtt.Client()
    #broker_address = "34.125.48.250"
    client.connect("broker.mqttdashboard.com", 1883, 60)

    # Cliente MQTT debe esperar una confirmación del broker MQTT
    sent = False
    def on_publish(client, userdata, mid):
        nonlocal sent
        sent = True
    client.on_publish = on_publish

    # Publicar el mensaje y esperar una confirmación
    client.publish(topic, message)
    while not sent:
        client.loop()

    client.disconnect()
    print(f'MQTT => Petición {topic} enviada')

# Cards API Route
@app.route('/cards')
def get_cards():
    # Lista de cartas a renderizar
    data = {'Cards': ['Bird','Cat','Fish','House','Plane','Rocket','Swan','Tree']}
    return jsonify(data=data)

# Ejecución de la aplicación
if __name__ == '__main__':
    app.run(debug=True)