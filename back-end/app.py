from flask import Flask, send_from_directory
from flask_pymongo import PyMongo
from pymongo import MongoClient
import os

app = Flask(__name__, static_folder="../front-end/dist", static_url_path="/")

# Use environment variable for MongoDB URI (or fallback to a default local URI)
mongo_uri = os.getenv("MONGO_URI", "mongodb+srv://hienqd:DD50XKm29wUgg67q@afram.0uuzz.mongodb.net/test?retryWrites=true&w=majority")
app.config["MONGO_URI"] = mongo_uri

# Initialize Flask-PyMongo
mongo = PyMongo(app)

# Connect using pymongo.MongoClient (if needed elsewhere in the app)
client = MongoClient(mongo_uri)

@app.route('/')
def home():
    return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    app.run(port=5173, debug=False)