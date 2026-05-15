import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AnxietySupport() {
  const navigate = useNavigate();

  const [checkInMood, setCheckInMood] = useState("");
  const [supportMessage, setSupportMessage] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("currentUser") || "guest";

    const savedCheckIn = localStorage.getItem(`${user}_dailyCheckIn`) || "";
    const savedMessage = localStorage.getItem(`${user}_supportMessage`) || "";

    setCheckInMood(savedCheckIn);
    setSupportMessage(savedMessage);
  }, []);

  const getSupportMessage = (mood) => {
  if (mood === "Angry") return "It’s okay to feel this way. Let’s take a moment to slow down and breathe.";
  if (mood === "Sadness") return "You’re not alone in feeling this. Try to be gentle with yourself today.";
  if (mood === "Fearful") return "Take things one step at a time. Focus on your breathing and stay present.";
  if (mood === "Happiness") return "Hold onto this feeling. You deserve moments like this.";
    return "";
  };

  const saveMoodCheckIn = (mood) => {
    const user = localStorage.getItem("currentUser") || "guest";
    const today = new Date().toISOString().split("T")[0];
    const message = getSupportMessage(mood);

    localStorage.setItem(`${user}_dailyCheckIn`, mood);
    localStorage.setItem(`${user}_dailyCheckInDate`, today);
    localStorage.setItem(`${user}_supportMessage`, message);

    const moodHistory = JSON.parse(
      localStorage.getItem(`${user}_moodHistory`) || "[]"
    );

    const updatedHistory = [
      ...moodHistory.filter((item) => item.date !== today),
      { date: today, mood },
    ];

    localStorage.setItem(`${user}_moodHistory`, JSON.stringify(updatedHistory));

    setCheckInMood(mood);
    setSupportMessage(message);
  };

  return (
    <div style={page}>
      <div style={layout}>
        <div style={container}>
          <h1 style={title}>Mental Health Support</h1>

          <p style={text}>
            Your personalised mental wellness companion. Well done for answering
            the survey. Based on your responses, we recommend the following plan
            to support your mental wellness.
          </p>

          <p style={text}>
            This plan may feel overwhelming at first, but take it one step at a
            time. Small, consistent actions can support your wellbeing over time.
            You are not alone.
          </p>

          <div style={supportBox}>
            <h2 style={subTitle}>Support</h2>

            <ul style={list}>
              <li>
                Visit the NHS mental wellbeing pages:
                <br />
                <a
                  href="https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/five-steps-to-mental-wellbeing/"
                  target="_blank"
                  rel="noreferrer"
                  style={link}
                >
                  NHS Five Steps to Mental Wellbeing
                </a>
                <br />
                <a
                  href="https://www.nhs.uk/every-mind-matters/mental-health-issues/anxiety/"
                  target="_blank"
                  rel="noreferrer"
                  style={link}
                >
                  NHS Every Mind Matters - Anxiety
                </a>
                <br />
                <a
                  href="https://www.nhs.uk/nhs-services/mental-health-services/find-nhs-talking-therapies-for-anxiety-and-depression/"
                  target="_blank"
                  rel="noreferrer"
                  style={link}
                >
                  Find NHS Talking Therapies
                </a>
              </li>

              <li>
                Need someone to talk to about your mental health? Call{" "}
                <a href="tel:03001021234" style={link}>
                  0300 102 1234
                </a>{" "}
                between 9am and 6pm.
              </li>

              <li>
                For 24/7 emotional support, call{" "}
                <a href="tel:116123" style={link}>
                  116 123
                </a>{" "}
                or text <strong>SHOUT</strong> to <strong>85258</strong>.
              </li>

              <li>Visit your GP for a referral to a therapist or counsellor.</li>
              <li>Join a support group for people with similar challenges.</li>
              <li>Reach out to trusted friends or family members for support.</li>
              <li>
                Learning about mental health can help improve your state of mind.
              </li>
            </ul>

            <h3 style={sectionTitle}>How are you feeling today?</h3>

            <div style={moodRow}>
              {["Happiness", "Sadness", "Fearful", "Angry"].map((mood) => (
                <button
                  key={mood}
                  style={{
                    ...(checkInMood === mood ? moodBtnActive : moodBtn),
                    opacity: checkInMood && checkInMood !== mood ? 0.75 : 1,
                    cursor: "pointer",
                  }}
                  onClick={() => saveMoodCheckIn(mood)}
                >
                  {mood}
                </button>
              ))}
            </div>

            {checkInMood && (
              <div style={checkInBox}>
                <p style={savedMoodText}>
                  Saved check-in: <strong>{checkInMood}</strong>
                </p>
                <p style={supportText}>{supportMessage}</p>
              </div>
            )}
          </div>

          <div style={sectionCard}>
            <h3 style={sectionTitle}>Actions</h3>

            <div style={bubbleGrid}>
              <button
                style={{ ...bubbleBtn, ...goalsBtn }}
                onClick={() => navigate("/goals")}
              >
                My Goals
              </button>

              <button
                style={{ ...bubbleBtn, ...diaryBtn }}
                onClick={() => navigate("/diary")}
              >
                My Diary
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const page = {
  fontFamily: "Georgia, serif",
  background: "linear-gradient(135deg, #dbeafe, #e0f2fe, #f8fafc)",
  minHeight: "100vh",
  padding: "40px 20px",
};

const layout = {
  width: "100%",
  maxWidth: "900px",
  margin: "0 auto",
};

const container = {
  background: "rgba(255,255,255,0.88)",
  borderRadius: "28px",
  padding: "36px",
  boxShadow: "0 20px 45px rgba(37, 99, 235, 0.14)",
  border: "1px solid rgba(147,197,253,0.55)",
};

const title = {
  fontSize: "2.5rem",
  color: "#1e3a8a",
  marginBottom: "16px",
  textAlign: "center",
};

const text = {
  fontSize: "1.1rem",
  color: "#334155",
  lineHeight: 1.65,
  marginBottom: "20px",
};

const supportBox = {
  background: "#f8fbff",
  borderRadius: "22px",
  padding: "24px",
  marginTop: "20px",
  border: "1px solid #bfdbfe",
};

const subTitle = {
  color: "#1e40af",
  marginBottom: "12px",
};

const list = {
  fontSize: "1.05rem",
  color: "#475569",
  lineHeight: 1.8,
};

const link = {
  color: "#2563eb",
  fontWeight: "bold",
};

const sectionTitle = {
  marginTop: 0,
  color: "#1e40af",
  fontSize: "1.35rem",
};

const moodRow = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  justifyContent: "center",
  marginTop: "14px",
};

const moodBtn = {
  padding: "11px 18px",
  borderRadius: "18px",
  border: "1px solid #bfdbfe",
  cursor: "pointer",
  background: "#eff6ff",
  color: "#1e40af",
  fontWeight: "bold",
};

const moodBtnActive = {
  ...moodBtn,
  border: "1px solid #60a5fa",
  background: "#bfdbfe",
  color: "#1e3a8a",
};

const checkInBox = {
  marginTop: "16px",
  padding: "14px",
  borderRadius: "16px",
  background: "#e0f2fe",
  textAlign: "center",
};

const savedMoodText = {
  margin: 0,
  color: "#1e3a8a",
};

const supportText = {
  marginTop: "8px",
  marginBottom: 0,
  color: "#475569",
};

const sectionCard = {
  background: "#f8fbff",
  borderRadius: "22px",
  padding: "24px",
  marginTop: "22px",
  boxShadow: "0 8px 20px rgba(37, 99, 235, 0.08)",
  border: "1px solid #bfdbfe",
};

const bubbleGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "14px",
};

const bubbleBtn = {
  padding: 16,
  borderRadius: 18,
  border: "none",
  cursor: "pointer",
  fontSize: 16,
  fontFamily: "Georgia, serif",
  color: "#1e3a8a",
  fontWeight: "bold",
  boxShadow: "0 8px 18px rgba(37, 99, 235, 0.12)",
};

const goalsBtn = {
  background: "#dbeafe",
};

const diaryBtn = {
  background: "#e0f2fe",
};