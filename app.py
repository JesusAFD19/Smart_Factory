# Librerías
from flask import Flask


# Nueva instancia de Flask
app = Flask(__name__)


# Funciones
@app.route('/')
def hello():
    return 'Hello World Flask'


# Ejecución de la aplicación
if __name__ == '__main__':
    app.run(debug=True)