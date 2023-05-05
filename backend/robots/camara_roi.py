# -*- coding: utf-8 -*-
"""

@author: 
"""

#%% Importar libreríasssssssss

import cv2
import numpy as nps
from matplotlib import pyplot as plt
import time
import numpy as np

#%%Inicialización de la cámara y la imagen a mostrar

# Objeto de la cámara
cap=cv2.VideoCapture(0)

#%% Algoritmo 

while True:
    start_all = time.time()
    ret,frame=cap.read()
    if ret==True:
        a=118
        b=362
        c=30
        d=650
        ROI = frame[a:b,c:d]     
        width = ROI.shape[0]
        lenght = ROI.shape[1]
        #print("ROI-Width={} ROI-Length={}".format(width,lenght))
        B,G,R = cv2.split(ROI)
  
        

        cv2.imshow('frame1',frame)
        
        cv2.imshow('frame2',ROI)
        
        stop_all = time.time()
        #print("Tiempo total por iteración: {}s".format(stop_all-start_all))
        
        if cv2.waitKey(1) & 0xFF == ord('s'):
            break

cap.release()
cv2.destroyAllWindows()