from flask import Flask, send_from_directory, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from pymongo import MongoClient
import os
import pandas as pd
from autogluon.timeseries import TimeSeriesPredictor, TimeSeriesDataFrame

app = Flask(__name__, static_folder="../front-end/dist", static_url_path="/")
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins


# Load environment variables
load_dotenv()

# Use environment variable for MongoDB URI (or fallback to a default local URI)
mongo_uri = os.getenv("MONGO_URI", "mongodb+srv://hienqd:DD50XKm29wUgg67q@afram.0uuzz.mongodb.net/test?retryWrites=true&w=majority")
app.config["MONGO_URI"] = mongo_uri

# Initialize Flask-PyMongo
mongo = PyMongo(app)

# Connect using pymongo.MongoClient (if needed elsewhere in the app)
client = MongoClient(mongo_uri)

OPENWEATHER_API = os.getenv('OPENWEATHER_API')

# Define error messages
error_messages = {
    400: "Bad Request - Invalid/Missing parameters",
    401: "Unauthorized - Invalid API key",
    404: "Not Found - Resource not available",
    429: "Too Many Requests - Rate limit exceeded"
}

@app.route('/')
def home():
    # return send_from_directory(app.static_folder, "index.html")
    return "Hello from local!"

@app.route('/current')
def get_current_weather():
    try:
        # Make request to OpenWeather API
        url = f"https://api.openweathermap.org/data/3.0/onecall"
        params = {
            "lat": 32.7357, 
            "lon": -97.1081,
            "exclude": "daily,hourly,minutely",
            "appid": OPENWEATHER_API
        }
        
        response = requests.get(url, params=params)
        if response.status_code != 200:
            error_message = error_messages.get(
                response.status_code, 
                f"Weather API error: {response.status_code}"
            )
            return {"error": error_message}, response.status_code
        
        weather_data = response.json()
        
        return jsonify(weather_data)  # Ensure Flask returns JSON format

    except Exception as e:

        return jsonify({"error": str(e)}), 500

    #     return weather_data
        
    # except Exception as e:
    #     return {"error": str(e)}, 500
    
# Play ground with DB
@app.route('/create-user', methods=['POST'])
def create_user():
    try:
        user = {
            "userid": "123",
            "username": "testuser",
            "password": "password123",
            "age": 25
        }
        
        # Insert into MongoDB
        result = mongo.db.users.insert_one(user)
        
        return jsonify({
            "message": "User created successfully",
            "user_id": str(result.inserted_id)
        }), 201
        
    except Exception as e:
        return {"error": str(e)}, 500    

@app.route('/users', methods=['GET'])
def get_users():
    try:
        users = list(mongo.db.weather.find({}, {'dt': 1609462800}))
        return jsonify(users)
    except Exception as e:
        return {"error": str(e)}, 500
    

if __name__ == "__main__":
    app.run(port=5173, debug=False)
