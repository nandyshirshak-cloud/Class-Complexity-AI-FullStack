import "./style.css";

const API_URL = "http://127.0.0.1:5000/api";

document.querySelector("#root").innerHTML = `
    <div class="container">

        <div class="header">
            <h1>Class Complexity AI</h1>
            <p>AI-powered student learning complexity analyzer</p>
        </div>

        <div class="card">

            <h2>Class Information</h2>

            <p class="subtitle">
                Enter your classroom details
            </p>

            <form id="predictionForm">

                <div class="grid">

                    <div class="input-group">
                        <label>Student Name</label>
                        <input id="student_name" type="text" required>
                    </div>

                    <div class="input-group">
                        <label>Subject</label>
                        <input id="subject" type="text" placeholder="Example: DBMS" required>
                    </div>

                    <div class="input-group">
                        <label>Number of Classes</label>
                        <input id="classes" type="number" required>
                    </div>

                    <div class="input-group">
                        <label>Study Hours per Day</label>
                        <input id="study_hours" type="number" step="0.5" required>
                    </div>

                    <div class="input-group">
                        <label>Assignments</label>
                        <input id="assignments" type="number" required>
                    </div>

                    <div class="input-group">
                        <label>Attendance (%)</label>
                        <input id="attendance" type="number" min="0" max="100" required>
                    </div>

                    <div class="input-group">
                        <label>Previous Marks (%)</label>
                        <input id="previous_marks" type="number" min="0" max="100" required>
                    </div>

                    <div class="input-group">
                        <label>Difficult Topics</label>
                        <input id="difficult_topics" type="number" required>
                    </div>

                </div>

                <button type="submit">
                    Analyze Class Complexity
                </button>

            </form>

            <div id="loading" class="loading hidden">
                Analyzing...
            </div>

            <div id="error" class="error hidden"></div>

        </div>

        <div id="result" class="card result hidden">

            <h2>AI Analysis Result</h2>

            <div class="score-box">
                <span>Complexity Score</span>
                <strong id="score">0</strong>
                <small>out of 100</small>
            </div>

            <div class="difficulty-box">
                <span>Difficulty Level</span>
                <strong id="difficulty">-</strong>
            </div>

            <div class="result-section">
                <h3>Main Factors</h3>
                <ul id="factors"></ul>
            </div>

            <div class="result-section">
                <h3>Personalized Suggestions</h3>
                <ul id="suggestions"></ul>
            </div>

            <div class="result-section">
                <h3>Machine Learning Prediction</h3>
                <p id="mlPrediction"></p>
            </div>

        </div>

        <footer>
            Class Complexity AI | Flask + Decision Tree + Vite
        </footer>

    </div>
`;

const form = document.querySelector("#predictionForm");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const loading = document.querySelector("#loading");
    const errorBox = document.querySelector("#error");
    const result = document.querySelector("#result");

    loading.classList.remove("hidden");
    errorBox.classList.add("hidden");
    result.classList.add("hidden");

    const data = {
        student_name: document.querySelector("#student_name").value,
        subject: document.querySelector("#subject").value,
        classes: Number(document.querySelector("#classes").value),
        study_hours: Number(document.querySelector("#study_hours").value),
        assignments: Number(document.querySelector("#assignments").value),
        attendance: Number(document.querySelector("#attendance").value),
        previous_marks: Number(document.querySelector("#previous_marks").value),
        difficult_topics: Number(document.querySelector("#difficult_topics").value)
    };

    try {

        const response = await fetch(
            `${API_URL}/predict`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.error || "Prediction failed");
        }

        document.querySelector("#score").textContent =
            responseData.complexity_score;

        document.querySelector("#difficulty").textContent =
            responseData.difficulty;

        document.querySelector("#mlPrediction").textContent =
            responseData.ml_prediction;

        const factors = document.querySelector("#factors");
        factors.innerHTML = "";

        responseData.factors.forEach((factor) => {
            const li = document.createElement("li");
            li.textContent = factor;
            factors.appendChild(li);
        });

        const suggestions = document.querySelector("#suggestions");
        suggestions.innerHTML = "";

        responseData.suggestions.forEach((suggestion) => {
            const li = document.createElement("li");
            li.textContent = suggestion;
            suggestions.appendChild(li);
        });

        result.classList.remove("hidden");

    } catch (error) {

        errorBox.textContent =
            "Backend connection error: " + error.message;

        errorBox.classList.remove("hidden");

    } finally {

        loading.classList.add("hidden");
    }
});