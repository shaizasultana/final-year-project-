import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Survey() {
  const navigate = useNavigate();
  
  

  const questions = useMemo(() => [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
    "Trouble concentrating on things, such as reading the newspaper or watching television",
    "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
    "Thoughts that you would be better off dead or of hurting yourself in some way",
  ], []);

  const [answers, setAnswers] = useState(() => Array(questions.length).fill(null));
  const [error, setError] = useState("");

  const total = answers.reduce((sum, v) => sum + (typeof v === "number" ? v : 0), 0);

  const setAnswer = (index, value) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const missing = answers.findIndex((v) => v === null);
    if (missing !== -1) {
      setError(`Please answer question ${missing + 1}.`);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/phq9", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ answers }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to submit survey.");
        return;
      }

      alert(`Thank you! Your total score is ${data.total}.`);
      
        localStorage.setItem("lastSurveyDate", new Date().toISOString());
        localStorage.setItem("surveyScore", data.total);
        localStorage.setItem("surveyCluster", data.cluster);

       
      if (data.cluster === "Mild") {
        navigate("/guide");
      } else if (data.cluster === "Moderate") {
        navigate("/mood");
      } else if (data.cluster === "Severe") {
        navigate("/PlanA");
      } else {
        setError("Unknown cluster returned.");
      }
    } catch (err) {
      console.error("Error submitting survey:", err);
      setError("An error occurred while submitting the survey.");
    }
  };

  return (
    <div style={page}>
      <div style={container}>
        <h1 style={title}>PHQ-9 Survey</h1>
        <p style={subtitle}>Please select one option (0–3) for each question.</p>

        <form onSubmit={handleSubmit}>
          {questions.map((q, i) => (
            <div key={i} style={qCard}>
              <div style={qText}>
                <span style={qNum}>{i + 1}.</span> {q}
              </div>

              <div style={optionsRow}>
                {[0, 1, 2, 3].map((val) => (
                  <label key={val} style={optionChip}>
                    <input
                      type="radio"
                      name={`q_${i}`}
                      value={val}
                      checked={answers[i] === val}
                      onChange={() => setAnswer(i, val)}
                      style={{ marginRight: 8 }}
                    />
                    {val}
                  </label>
                ))}
              </div>

              <div style={hint}>
                0 = Not at all · 1 = Several days · 2 = More than half the days · 3 = Nearly every day
              </div>
            </div>
          ))}

          <div style={footerRow}>
            <div style={scoreBox}>
              <strong>Total score:</strong> {total}
            </div>

            <button type="submit" style={submitBtn}>
              Submit Survey
            </button>
          </div>

          {error && <div style={errorBox}>{error}</div>}
        </form>
      </div>
    </div>
  );
}

const page = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #f7eeb9, #ade4ec)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Georgia, serif",
  padding: 24,
};

const container = {
  background: "rgba(255,255,255,0.92)",
  padding: "38px",
  borderRadius: "24px",
  maxWidth: "980px",
  width: "100%",
  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
};

const title = { fontSize: "2.2rem", marginBottom: 6, color: "#2c2c2c" };
const subtitle = { fontSize: "1rem", color: "#555", marginBottom: 18 };

const qCard = {
  background: "white",
  borderRadius: 18,
  padding: 18,
  marginBottom: 14,
  boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
};

const qText = { fontSize: "1.05rem", color: "#2d2d2d", marginBottom: 12, lineHeight: 1.35 };
const qNum = { fontWeight: "700", marginRight: 6 };

const optionsRow = { display: "flex", gap: 12, flexWrap: "wrap" };

const optionChip = {
  display: "flex",
  alignItems: "center",
  padding: "10px 14px",
  borderRadius: 999,
  border: "1px solid #ddd",
  background: "#f8f8f8",
  cursor: "pointer",
  userSelect: "none",
};

const hint = { marginTop: 10, color: "#666", fontSize: "0.9rem" };

const footerRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  marginTop: 16,
  flexWrap: "wrap",
};

const scoreBox = {
  padding: "10px 14px",
  borderRadius: 14,
  background: "#eef9ff",
  border: "1px solid #cfefff",
};

const submitBtn = {
  backgroundColor: "rgb(51, 120, 106)",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: 12,
  cursor: "pointer",
  fontSize: "1rem",
};

const errorBox = { marginTop: 12, color: "#b00020", fontWeight: 700 };