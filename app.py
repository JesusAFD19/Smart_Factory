# Librerías
from flask import Flask, render_template, request
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

def format_list(list):
    return [list[i:i + 4] for i in range(0, len(list), 4)]


# Renderización de index como página principal
@app.route('/', methods=['GET', 'POST'])
def index():
    # Lista de opciones a renderizar
    list = ['Bird','Cat','Fish','House','Plane','Rocket','Swan','Tree']

    # Si se envía el formulario de index.html
    if request.method == 'POST':
        picture_selection = request.form['picture_selection']
        send_mqtt(picture_selection,picture_selection)

    # Renderizamos index.html pasandole la lista de figuras
    return render_template('index.html', list=format_list(list))


# Ejecución de la aplicación
if __name__ == '__main__':
    app.run(debug=True)