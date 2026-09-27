from flask import Flask, jsonify, request
from flask_cors import CORS
from sklearn.tree import DecisionTreeClassifier

app = Flask(__name__)
CORS(app)

# --------------------------------------------------
# Small training dataset
# --------------------------------------------------

training_data = [
    [20, 8, 2, 90, 85, 2],
    [25, 7, 2, 88, 82, 2],
    [30, 6, 3, 85, 80, 3],
    [35, 5, 4, 80, 75, 4],
    [40, 4, 4, 78, 72, 5],
    [45, 3, 5, 72, 68, 6],
    [50, 3, 6, 68, 62, 7],
    [55, 2, 7, 60, 55, 8],
    [60, 2, 8, 55, 50, 9],
    [25, 8, 2, 92, 88, 1],
    [30, 7, 3, 90, 85, 2],
    [40, 5, 4, 82, 78, 4],
    [45, 4, 5, 75, 70, 5],
    [50, 3, 6, 65, 60, 7],
    [60, 2, 8, 55, 50, 9]
]

training_labels = [
    "Low",
    "Low",
    "Low",
    "Medium",
    "Medium",
    "Medium",
    "High",
    "High",
    "High",
    "Low",
    "Low",
    "Medium",
    "Medium",
    "High",
    "High"
]

# --------------------------------------------------
# Train Decision Tree
# --------------------------------------------------

model = DecisionTreeClassifier(
    max_depth=4,
    random_state=42
)

model.fit(training_data, training_labels)


# --------------------------------------------------
# Home
# --------------------------------------------------

@app.route("/")
def home():
    return jsonify({
        "message": "Class Complexity AI Backend Running",
        "status": "success"
    })


# --------------------------------------------------
# Health Check
# --------------------------------------------------

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "Backend connected successfully"
    })


# --------------------------------------------------
# Prediction
# --------------------------------------------------

@app.route("/api/predict", methods=["POST"])
def predict():

    try:
        data = request.get_json()

        student_name = data.get("student_name", "")
        subject = data.get("subject", "")

        classes = float(data.get("classes", 0))
        study_hours = float(data.get("study_hours", 0))
        assignments = float(data.get("assignments", 0))
        attendance = float(data.get("attendance", 0))
        previous_marks = float(data.get("previous_marks", 0))
        difficult_topics = float(data.get("difficult_topics", 0))

        # ------------------------------------------
        # Basic validation
        # ------------------------------------------

        if not student_name:
            return jsonify({
                "error": "Student name is required"
            }), 400

        if not subject:
            return jsonify({
                "error": "Subject is required"
            }), 400

        if not 0 <= attendance <= 100:
            return jsonify({
                "error": "Attendance must be between 0 and 100"
            }), 400

        if not 0 <= previous_marks <= 100:
            return jsonify({
                "error": "Previous marks must be between 0 and 100"
            }), 400

        # ------------------------------------------
        # AI Prediction
        # ------------------------------------------

        features = [[
            classes,
            study_hours,
            assignments,
            attendance,
            previous_marks,
            difficult_topics
        ]]

        prediction = model.predict(features)[0]

        # ------------------------------------------
        # Complexity Score
        # ------------------------------------------

        class_factor = min(classes / 60, 1) * 20

        study_factor = max(0, (6 - study_hours) / 6) * 15

        assignment_factor = min(assignments / 8, 1) * 15

        attendance_factor = max(
            0,
            (85 - attendance) / 85
        ) * 15

        marks_factor = max(
            0,
            (80 - previous_marks) / 80
        ) * 15

        topic_factor = min(difficult_topics / 10, 1) * 20

        score = (
            class_factor
            + study_factor
            + assignment_factor
            + attendance_factor
            + marks_factor
            + topic_factor
        )

        score = round(min(score, 100), 2)

        # ------------------------------------------
        # Determine difficulty from score
        # ------------------------------------------

        if score < 35:
            difficulty = "Low"
        elif score < 65:
            difficulty = "Medium"
        else:
            difficulty = "High"

        # Keep ML prediction available
        ml_prediction = prediction

        # ------------------------------------------
        # Factors
        # ------------------------------------------

        factors = []

        if difficult_topics >= 5:
            factors.append("High number of difficult topics")

        if assignments >= 5:
            factors.append("High assignment workload")

        if attendance < 75:
            factors.append("Low attendance")

        if previous_marks < 60:
            factors.append("Low previous marks")

        if study_hours < 3:
            factors.append("Low study hours")

        if classes >= 45:
            factors.append("High number of classes")

        if not factors:
            factors.append("Learning workload is currently manageable")

        # ------------------------------------------
        # Suggestions
        # ------------------------------------------

        suggestions = []

        if study_hours < 4:
            suggestions.append(
                "Increase regular study time."
            )

        if difficult_topics >= 5:
            suggestions.append(
                "Practice difficult topics separately."
            )

        if assignments >= 5:
            suggestions.append(
                "Complete assignments using a weekly schedule."
            )

        if attendance < 75:
            suggestions.append(
                "Try to improve class attendance."
            )

        if previous_marks < 60:
            suggestions.append(
                "Revise basic concepts and practice questions."
            )

        if not suggestions:
            suggestions.append(
                "Continue your current study routine."
            )

        return jsonify({
            "success": True,
            "student_name": student_name,
            "subject": subject,
            "complexity_score": score,
            "difficulty": difficulty,
            "ml_prediction": ml_prediction,
            "factors": factors,
            "suggestions": suggestions
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# --------------------------------------------------
# Run Server
# --------------------------------------------------

if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )