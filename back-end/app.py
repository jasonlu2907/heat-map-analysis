from flask import Flask, send_from_directory, request, jsonify
from flask_pymongo import PyMongo
from pymongo import MongoClient
import os
import pandas as pd
from autogluon.timeseries import TimeSeriesPredictor, TimeSeriesDataFrame

app = Flask(__name__, static_folder="../front-end/dist", static_url_path="/")

# Use environment variable for MongoDB URI (or fallback to a default local URI)
mongo_uri = os.getenv("MONGO_URI", "mongodb+srv://hienqd:DD50XKm29wUgg67q@afram.0uuzz.mongodb.net/test?retryWrites=true&w=majority")
app.config["MONGO_URI"] = mongo_uri

# Initialize Flask-PyMongo
mongo = PyMongo(app)

# Connect using pymongo.MongoClient (if needed elsewhere in the app)
client = MongoClient(mongo_uri)

# Load the trained model
predictor = TimeSeriesPredictor.load("path_to_your_model")

@app.route('/')
def home():
    return send_from_directory(app.static_folder, "index.html")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    df = pd.DataFrame(data)
    ts_data = TimeSeriesDataFrame.from_data_frame(
        df,
        id_column="Incident Number",
        timestamp_column="Time in Alarm DateTime"
    )
    predictions = predictor.predict(ts_data)
    return jsonify(predictions.to_dict())

if __name__ == "__main__":
    app.run(port=5173, debug=False)