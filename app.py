# Librerías
from flask import Flask, render_template


# Nueva instancia de Flask
app = Flask(__name__)


# Funciones
@app.route('/')
def index():
    return render_template('index.html')


# Ejecución de la aplicación
if __name__ == '__main__':
    app.run(debug=True)