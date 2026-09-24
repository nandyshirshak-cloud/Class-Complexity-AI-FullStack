from flask import Flask, jsonify, request
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

    data = request.get_json()

    students = int(data.get("students", 0))
    subjects = int(data.get("subjects", 0))
    teachers = int(data.get("teachers", 0))
    weekly_classes = int(data.get("classes", 0))

    score = 0

    # Student calculation
    if students > 50:
        score += 30
    elif students > 30:
        score += 20
    else:
        score += 10

    # Subject calculation
    if subjects > 7:
        score += 25
    elif subjects > 5:
        score += 15
    else:
        score += 10

    # Teacher calculation
    if teachers < 5:
        score += 20
    else:
        score += 10

    # Weekly classes calculation
    if weekly_classes > 30:
        score += 25
    elif weekly_classes > 20:
        score += 15
    else:
        score += 10

    # Complexity level
    if score >= 70:
        level = "High"
        message = (
            "The class has high complexity. Consider improving "
            "teacher allocation, class scheduling and resource distribution."
        )

    elif score >= 45:
        level = "Medium"
        message = (
            "The class has moderate complexity. Some improvements "
            "in scheduling and resource management may help."
        )

    else:
        level = "Low"
        message = (
            "The class has low complexity and appears relatively easy to manage."
        )

    return jsonify({
        "score": score,
        "level": level,
        "message": message
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)