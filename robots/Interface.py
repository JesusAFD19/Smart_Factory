# -*- coding: utf-8 -*-


import sys
import cv2
import numpy
import time
from PyQt5.QtGui import QImage, QPixmap

from PyQt5.QtCore import Qt
from PyQt5.QtWidgets import QWidget, QApplication, QVBoxLayout, QPushButton, QComboBox, QStyleFactory, QListWidget, QTableWidget, QTableWidgetItem, QListWidgetItem, QLabel, QHBoxLayout, QFileDialog
from time import sleep

import paho.mqtt.client as mqtt

#broker_address = "34.125.48.250"
broker_address = "broker.mqttdashboard.com"
broker_port = 1883
client = mqtt.Client('Interface') 
    #client.on_message = on_message1
client.connect(broker_address, broker_port, 60) 
topic1 = "/Assembly_select"
topic2 = "/Assembly_start"

class Example(QWidget):
    def __init__(self, parent=None):
        super(Example, self).__init__(parent)
        QApplication.setStyle(QStyleFactory.create('Fusion'))
        self.image = None
        self.label = QLabel()
        self.initUI()


    def itemChanged(self):
        item = QListWidgetItem(self.lv.currentItem())
        print("Ensamble seleccionado: ", item.text())
        #print("Publishing message to topic",topic1)
        payload1= item.text() #+ ' assembly'
        client.publish(topic1,payload1)
        root_item = item.text() + '.png'
        file = open(root_item, "rb") 
        data = numpy.array(bytearray(file.read()))
        self.image = cv2.imdecode(data, cv2.IMREAD_UNCHANGED)
        self.mostrarImagen()


    def initUI(self):
        self.label.setText('OpenCV Image')
        self.label.setAlignment(Qt.AlignCenter)
        self.label.setStyleSheet('border: gray; border-style:solid; border-width: 1px;')

        btn_open = QPushButton('Start Assembly...')
        btn_open.clicked.connect(self.startAssembly)
        
        btn_open2 = QPushButton('Vision...')
        btn_open2.clicked.connect(self.vision)


        top_bar = QHBoxLayout()
        top_bar.addWidget(btn_open)
        top_bar.addWidget(btn_open2)


    
        
                # -------------- QLISTWIDGET ---------------------
        items = ['Cat', 'House', 'Swan', 'Fish', 'Rocket', 'Tree', 'Plane', 'Bird']

        self.lv = QListWidget()
        self.lv.addItems(items)
        self.lv.itemSelectionChanged.connect(self.itemChanged)



    

        root = QVBoxLayout(self)
        root.addLayout(top_bar)
        root.setAlignment(Qt.AlignTop)    
        root.addWidget(self.lv)
        #root.addWidget(QPushButton('Start Assembly'))
        root.addWidget(self.label)

        self.resize(500, 500)
        self.setWindowTitle('Assembly Interface')

        #self.setWindowTitle("Assembly interface")
        #self.resize(362, 320)
        #self.setLayout(vbx)


    def startAssembly(self):
        print("Starting home routine ...")
        sleep(1)
        print("Publishing message to the cloud")
        client.publish(topic2,"start")

    def abrirImagen(self):
        
        file = open("color 2.png", "rb") 
        data = numpy.array(bytearray(file.read()))
        self.image = cv2.imdecode(data, cv2.IMREAD_UNCHANGED)
        self.mostrarImagen()
        
    def vision(self):
        exec(open("Sis_Vision_color_centroides.py").read())
          
    def mostrarImagen(self):
        size = self.image.shape
        step = self.image.size / size[0]
        qformat = QImage.Format_Indexed8

        if len(size) == 3:
            if size[2] == 4:
                qformat = QImage.Format_RGBA8888
            else:
                qformat = QImage.Format_RGB888

        img = QImage(self.image, size[1], size[0], step, qformat)
        img = img.rgbSwapped()

        self.label.setPixmap(QPixmap.fromImage(img))
        self.resize(self.label.pixmap().size())


if __name__ == '__main__':
    app = QApplication(sys.argv)
    ejm = Example()
    ejm.show()
    sys.exit(app.exec_())

