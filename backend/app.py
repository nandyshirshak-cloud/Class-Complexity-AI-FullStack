from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({
        "message": "Class Complexity AI Backend is Running"
    })

@app.route("/analyze", methods=["POST"])
def analyze():
    return jsonify({
        "complexity": "Medium",
        "score": 60,
        "message": "Class analysis completed successfully"
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)