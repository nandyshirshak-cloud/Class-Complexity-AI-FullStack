# Class Complexity AI

Class Complexity AI is a lightweight AI/ML-based full-stack application that analyzes student learning data and predicts the complexity level of a subject.

It uses a Machine Learning Decision Tree model to generate a complexity score, identify important factors, and provide personalized study suggestions.

## 🚀 Features

- Student learning data analysis
- AI/ML-based complexity prediction
- Complexity score from 0–100
- Low / Medium / High difficulty prediction
- Explainable factors affecting complexity
- Personalized study suggestions
- Frontend and backend separation
- REST API
- SQLite database support
- Lightweight and suitable for student projects
- Designed to work on low-resource systems

## 🧠 How It Works

1. Student enters learning information.
2. Frontend sends the data to the Flask backend.
3. Backend processes the data.
4. Decision Tree Machine Learning model analyzes the information.
5. The system calculates a complexity score.
6. The result is returned to the frontend.
7. Student receives difficulty level, factors, and study suggestions.

## 📊 Input Data

The system uses:

- Student Name
- Subject
- Number of Classes
- Study Hours
- Assignment Count
- Attendance Percentage
- Previous Marks
- Number of Difficult Topics

## 🛠️ Technology Stack

### Frontend

- HTML
- CSS
- JavaScript
- Vite

### Backend

- Python
- Flask
- Flask-CORS
- REST API

### Machine Learning

- Scikit-learn
- Decision Tree Classifier

### Database

- SQLite

## 📁 Project Structure

```text
Class-Complexity-AI-FullStack/
│
├── backend/
│   ├── app.py
│   ├── model.py
│   ├── train_model.py
│   └── database.db
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.js
│       └── style.css
│
├── images/
│   └── cover.png
│
└── README.md
