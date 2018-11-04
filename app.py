#!/usr/bin/env python3
from flask import Flask, url_for, request, render_template, Response
import json
import random


# Initialize the Flask application
app = Flask(__name__)

drones = {"drones": []}
drones['drones'].append({"name": "drone0", "lat": 48, "lon": 8})

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data')
def data():
    random_lat = random.uniform(48.0, 48.5)
    random_lon = random.uniform(8.0, 9.0)
    data = {"lat":random_lat, "lon": random_lon}
    return json.dumps(data)

@app.route('/getdrones', methods=["GET"])
def getdrones():
    return Response(json.dumps(drones), mimetype="application/json")

@app.route('/updatedrone/<int:num>', methods=['GET'])
def updatedrone(num):
    random_lat = random.uniform(48.0, 48.5)
    random_lon = random.uniform(8.0, 9.0)
    drones["drones"][num]["lat"] = random_lat
    drones["drones"][num]["lon"] = random_lon
    return json.dumps(drones)



@app.route('/newdrone', methods=['GET', 'POST'])
def newdrone():
    random_lat = random.uniform(48.0, 48.5)
    random_lon = random.uniform(8.0, 9.0)
    drones['drones'].append({"name": "drone"+str(random.randint(0,1000)), "lat": random_lat, "lon": random_lon})
    data = {"success":True}
    return json.dumps(data)

if __name__ == '__main__':
    app.run(host="0.0.0.0",port=5000, threaded=True)
