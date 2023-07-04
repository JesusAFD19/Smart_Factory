# Imagen base para el backend
FROM python:3.9

# Copiar los archivos del backend al contenedor
COPY ./backend /app/backend

# Establecer el directorio de trabajo
WORKDIR /app/backend

# Instalar las dependencias del proyecto
RUN pip install -r requirements.txt

# Especificar el comando para ejecutar el proyecto
CMD ["python", "app.py"]
