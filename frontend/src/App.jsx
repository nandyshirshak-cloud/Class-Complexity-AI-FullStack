import { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState("");
  const [subjects, setSubjects] = useState("");
  const [teachers, setTeachers] = useState("");
  const [classes, setClasses] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

 async function analyzeClass() {
  if (!students || !subjects || !teachers || !classes) {
    alert("Please enter all class details.");
    return;
  }

  setLoading(true);
  setResult(null);

  try {
    const response = await fetch("http://127.0.0.1:5000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        students: students,
        subjects: subjects,
        teachers: teachers,
        classes: classes
      })
    });

    if (!response.ok) {
      throw new Error("Backend request failed");
    }

    const data = await response.json();

    setResult({
      score: data.score,
      level: data.level,
      message: data.message
    });

  } catch (error) {
    console.error(error);
    alert("Cannot connect to the backend. Make sure Flask is running.");
  }

  setLoading(false);
}

  function resetAnalysis() {
    setStudents("");
    setSubjects("");
    setTeachers("");
    setClasses("");
    setResult(null);
  }

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <div className="header-content">
          <div className="ai-icon">AI</div>

          <div>
            <h1>Class Complexity AI</h1>
            <p>
              Intelligent classroom complexity analysis system
            </p>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="main-container">

        {/* INPUT CARD */}
        <section className="card input-card">

          <div className="card-title">
            <span className="title-icon">📊</span>

            <div>
              <h2>Class Information</h2>
              <p>Enter your classroom details</p>
            </div>
          </div>

          {/* Students */}
          <div className="input-group">
            <label>Number of Students</label>

            <input
              type="number"
              min="1"
              placeholder="Example: 60"
              value={students}
              onChange={(e) => setStudents(e.target.value)}
            />
          </div>

          {/* Subjects */}
          <div className="input-group">
            <label>Number of Subjects</label>

            <input
              type="number"
              min="1"
              placeholder="Example: 8"
              value={subjects}
              onChange={(e) => setSubjects(e.target.value)}
            />
          </div>

          {/* Teachers */}
          <div className="input-group">
            <label>Number of Teachers</label>

            <input
              type="number"
              min="1"
              placeholder="Example: 5"
              value={teachers}
              onChange={(e) => setTeachers(e.target.value)}
            />
          </div>

          {/* Weekly Classes */}
          <div className="input-group">
            <label>Weekly Classes</label>

            <input
              type="number"
              min="1"
              placeholder="Example: 35"
              value={classes}
              onChange={(e) => setClasses(e.target.value)}
            />
          </div>

          {/* ANALYZE BUTTON */}
          <button
            className={`analyze-button ${loading ? "loading" : ""}`}
            onClick={analyzeClass}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Analyzing...
              </>
            ) : (
              <>
                ✨ Analyze Class
              </>
            )}
          </button>

        </section>

        {/* RESULT CARD */}
        {result && (
          <section className="card result-card">

            <div className="result-animation">

              <div className="result-icon">
                ✓
              </div>

              <h2>Analysis Complete</h2>

              <p className="result-subtitle">
                Your classroom complexity has been analyzed.
              </p>

              {/* SCORE */}
              <div className="score-circle">
                <div>
                  <span className="score-number">
                    {result.score}
                  </span>

                  <span className="score-total">
                    /100
                  </span>
                </div>
              </div>

              {/* LEVEL */}
              <div
                className={`complexity-badge ${result.level.toLowerCase()}`}
              >
                {result.level} Complexity
              </div>

              {/* MESSAGE */}
              <div className="result-message">
                <h3>AI Recommendation</h3>

                <p>
                  {result.message}
                </p>
              </div>

              {/* DATA SUMMARY */}
              <div className="summary">

                <div className="summary-item">
                  <span>Students</span>
                  <strong>{students}</strong>
                </div>

                <div className="summary-item">
                  <span>Subjects</span>
                  <strong>{subjects}</strong>
                </div>

                <div className="summary-item">
                  <span>Teachers</span>
                  <strong>{teachers}</strong>
                </div>

                <div className="summary-item">
                  <span>Weekly Classes</span>
                  <strong>{classes}</strong>
                </div>

              </div>

              {/* RESET BUTTON */}
              <button
                className="reset-button"
                onClick={resetAnalysis}
              >
                ↻ Analyze Another Class
              </button>

            </div>

          </section>
        )}

      </main>

      {/* FOOTER */}
      <footer>
        <p>
          Class Complexity AI • B.Tech Student Project
        </p>
      </footer>

    </div>
  );
}

export default App;