# Librerías
from flask import Flask, render_template


# Nueva instancia de Flask
app = Flask(__name__)


# Funciones
@app.route('/')
def index():
    list = ['Bird','Cat','Fish','House','Plane','Rocket','Swan','Tree']
    return render_template('index.html', list=list)


# Ejecución de la aplicación
if __name__ == '__main__':
    app.run(debug=True)