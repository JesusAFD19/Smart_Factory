
##########  Librerias  ##########
from time import sleep
import paho.mqtt.client as mqtt
from wlkata_mirobot import WlkataMirobot
import datetime;

arm = WlkataMirobot(portname='COM4')

#arm.home()

##########  MQTT Parameters  ##########
broker_address = "34.125.48.250"
broker_port = 1883


##########  MQTT Topics  ##########
topic1 = "/R0_flag"         #subscriber
topic2 = "/home"           #publisher
topic3 = "/zero"                  #publisher
topic0 = "/recepcion"
topic4 = "/pick_routine"

routine_list = [0]

positions_routine0 = [[0,0,0,0,0,0,0],[10,5,5,10,5,5,10],[20,15,0,15,10,20,20],[0,0,0,0,0,0,0]]
positions_routine1 = [[0,0,0,0,0,0,0],[-10,15,0,10,5,15,30],[-20,15,0,15,10,20,50],[0,0,0,0,0,0,0]]

def routine(routine_no):
    
    if routine_no == 0:
        positions = positions_routine0
        routine_list.append(1)

    if routine_no == 1:
        positions = positions_routine1
        routine_list.append(0)
    
    for i in positions:
        arm.go_to_axis(i[0],i[1],i[2],i[3],i[4],i[5],i[6])
        current_time = datetime.datetime.now()
        time_stamp = current_time + datetime.timedelta(hours=6)
        r1_information_t = "2,"+str(i[0]) + ","+str(i[1]) + ","+str(i[2]) + ","+str(i[3]) + ","+str(i[4]) + ","+str(i[5]) + ","+str(i[6]) + ","+str(routine_no) + "," + str(time_stamp)        
        #r1_information = "1,"+str(i[0]) + ","+str(i[1]) + ","+str(i[2]) + ","+str(i[3]) + ","+str(i[4]) + ","+str(i[5]) + ","+str(i[6]) + ","+str(routine_no)
        sleep(1)
        client.publish(topic2,r1_information_t)
        sleep(1)
        print(r1_information_t)
        client.publish(topic3,"R2")
        sleep(1)
        
def routine_BC(str1):
    vector1 = str1.split(",")
    Ro =int(vector1[0])
    J1=int(vector1[1])
    J2=int(vector1[2])
    J3=int(vector1[3])
    J4=int(vector1[4])
    J5=int(vector1[5])
    J6=int(vector1[6])
    J7=int(vector1[7])
        
    arm.go_to_axis(J1,J2,J3,J4,J5,J6,J7)
    current_time = datetime.datetime.now()
    current_time = current_time.replace(microsecond=0)
    print(current_time)
  

def routine_home():
    arm.home()
    

def routine_zero():
    arm.go_to_axis(0,0,0,0,0,0,0)
    arm.pump_off()

def routine_pick():
    arm.go_to_axis(0,0,0,0,0,0,0)
    arm.pump_off()
    sleep(1)
    arm.go_to_axis(-43.1,41,7.7,0,-53.7,-1.6,0)
    sleep(1)
    arm.pump_on()
    sleep(1)
    arm.go_to_axis(-43.1,14.6,-10.5,0,-9,-1.5,0)
    sleep(1)
    arm.go_to_axis(0,0,0,0,0,0,0)
    sleep(1)
    arm.go_to_axis(0,40.8,20.6,0,-61.5,0,0)
    sleep(1)
    arm.pump_off()
    sleep(1)
    arm.go_to_axis(0,0,0,0,0,0,0)
        
    

##########  Funciones  ##########
def on_message_msgs(client, userdata, message):
    if message.topic == topic1:
        var1 =  message.payload.decode("utf-8")
        if var1 == "R1":
            print("Topico: " + topic1 +"; Payload: " + str(var1) +"\n")
            sleep(3)
            number = routine_list[-1]
            print("rutina numero: " + str(number))
            routine(number)
         

    if message.topic == topic0:
        var1 =  message.payload.decode("utf-8")
        
        print(var1)
        vector0 = var1.split(";")
        print(len(vector0))
        for i in vector0:
            print("Posiciones: ")
            print(i)
            print(" ")
            routine_BC(i)
            


    if message.topic == topic2:
        var1 =  message.payload.decode("utf-8")
        print(var1)
        routine_home()

    if message.topic == topic3:
        var1 =  message.payload.decode("utf-8")
        print(var1)
        routine_zero()

    if message.topic == topic4:
        var1 =  message.payload.decode("utf-8")
        print(var1)
        routine_pick()

        
        #routine_BC(var1)
    


##########  Funcion main (Loop)  ##########
if __name__ == '__main__':
    while (True):
        client = mqtt.Client('Robot2') 
        client.on_message = on_message_msgs
        client.connect(broker_address, broker_port, 60) 
        client.subscribe(topic1)
        client.subscribe(topic0)
        client.subscribe(topic2)
        client.subscribe(topic3)
        client.subscribe(topic4)  
    
        client.message_callback_add(topic0, on_message_msgs)
        client.message_callback_add(topic1, on_message_msgs)
        client.message_callback_add(topic2, on_message_msgs)
        client.message_callback_add(topic3, on_message_msgs)
        client.message_callback_add(topic4, on_message_msgs)
      
        client.loop_forever()

