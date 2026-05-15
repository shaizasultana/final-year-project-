import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    userName: "",
    email: "",
    supportAnimal: "",
    mood: "",
    joinDate: "",
    surveyScore: "",
  });
  const [moodHistory, setMoodHistory] = useState([]);

  useEffect(() => {
   const savedMood = localStorage.getItem("dailyCheckIn") || "No mood saved yet";
    const savedAnimal = localStorage.getItem("supportAnimal") || "No animal saved yet";
    const savedSurvey = localStorage.getItem("surveyScore") || "No survey yet";
const savedMoodHistory = JSON.parse(localStorage.getItem("moodHistory") || "[]");
setMoodHistory(savedMoodHistory); 

    fetch("http://localhost:5000/profile", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setProfileData({
          userName: data.user?.userName || "",
          email: data.user?.email || "",
          supportAnimal: savedAnimal,
          mood: savedMood,
          joinDate: data.user?.joinDate || "Recently",
          surveyScore: savedSurvey,
        });
      })
      .catch((err) => {
        console.error("Profile fetch error:", err);
        setProfileData((prev) => ({
          ...prev,
          mood: savedMood,
          supportAnimal: savedAnimal,
          surveyScore: savedSurvey,
        }));
      });
  }, []);
const getMoodColor = (mood) => {
  if (mood === "Happiness" || mood === "Happy" || mood === "Happyness") return "#8ee99a";
  if (mood === "Sadness") return "#f7a8d8";
  if (mood === "Fearful") return "#b8d8ff";
  if (mood === "Angry") return "#ffe680";
  return "#e5e7eb";
};

const getLastDays = () => {
  const days = [];

  for (let i = 83; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateKey = date.toISOString().split("T")[0];

    const moodEntry = moodHistory.find((item) => item.date === dateKey);

    days.push({
      date: dateKey,
      mood: moodEntry?.mood || "",
    });
  }

  return days;
};
  return (
    <div style={page}>
      <div style={container}>
        <h1 style={title}>My Profile</h1>
        <p style={subtitle}>
          Here is your information and stats about your mental health journey
        </p>

        <div style={card}>
          <h2 style={name}>{profileData.userName}</h2>
          <p style={email}>{profileData.email}</p>
          <p style={joined}>Joined: {profileData.joinDate}</p>

          <div style={grid}>
            <div style={stat}>
              <h3 style={statTitle}>Current Mood</h3>
              <p style={statValue}>{profileData.mood}</p>
            </div>

            <div style={stat}>
              <h3 style={statTitle}>Survey Score</h3>
              <p style={statValue}>{profileData.surveyScore}</p>
            </div>

            <div style={stat}>
              <h3 style={statTitle}>Support Animal</h3>
              <p style={statValue}>{profileData.supportAnimal}</p>
            </div>
          </div>

          <div style={Button}>
            <button style={mainButton} onClick={() => navigate("/diary")}>
              Diary
            </button>
            <button style={mainButton} onClick={() => navigate("/goals")}>
              Goals
            </button>
            <div style={moodChartCard}>
  <h3 style={statTitle}>Mood Activity</h3>
  <p style={chartText}>Your mood check-ins from the last few months</p>

  <div style={heatmapGrid}>
    {getLastDays().map((day) => (
      <div
        key={day.date}
        title={`${day.date} ${day.mood || "No mood saved"}`}
        style={{
          ...heatmapBox,
          backgroundColor: getMoodColor(day.mood),
        }}
      />
    ))}
  </div>

  <div style={legend}>
    <span>Less</span>
    <span style={{ ...legendBox, backgroundColor: "#e5e7eb" }} />
    <span style={{ ...legendBox, backgroundColor: "#8ee99a" }} />
    <span style={{ ...legendBox, backgroundColor: "#f7a8d8" }} />
    <span style={{ ...legendBox, backgroundColor: "#b8d8ff" }} />
    <span style={{ ...legendBox, backgroundColor: "#ffe680" }} />
    <span>More</span>
  </div>
</div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

const page = {
  minHeight: "100vh",
  backgroundColor: "rgba(255, 230, 230, 0.8)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "30px",
  fontFamily: "Arial, sans-serif",
};

const container = {
  width: "100%",
  maxWidth: "800px",
  backgroundColor: "white",
  borderRadius: "10px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  padding: "20px",
};

const title = {
  fontSize: "2.5rem",
  marginBottom: "10px",
  color: "#333",
  textAlign: "center",
};

const subtitle = {
  fontSize: "1.2rem",
  color: "#666",
  marginBottom: "30px",
  textAlign: "center",
};

const card = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: "8px",
  padding: "20px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const name = {
  margin: 0,
  color: "#4b3d73",
};

const email = {
  margin: "5px 0",
  color: "#777",
};

const joined = {
  margin: 0,
  color: "#999",
  fontSize: "0.9rem",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

const stat = {
  backgroundColor: "rgba(255, 230, 230, 0.5)",
  padding: "16px",
  borderRadius: "12px",
};

const statTitle = {
  fontSize: "1.1rem",
  color: "#555",
  marginBottom: "6px",
};

const statValue = {
  fontSize: "1.4rem",
  color: "#333",
  fontWeight: "bold",
};

const Button = {
  display: "flex",
  gap: "20px",
  marginTop: "30px",
  justifyContent: "center",
};

const mainButton = {
  backgroundColor: "rgb(51, 120, 106)",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: 12,
  cursor: "pointer",
  fontSize: "1rem",
  
};
const moodChartCard = {
  marginTop: "24px",
  backgroundColor: "rgba(248, 251, 255, 0.95)",
  borderRadius: "14px",
  padding: "18px",
  border: "1px solid rgba(147,197,253,0.45)",
};

const chartText = {
  color: "#666",
  fontSize: "0.95rem",
  marginBottom: "14px",
};

const heatmapGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(21, 14px)",
  gap: "5px",
  justifyContent: "center",
  marginTop: "12px",
};

const heatmapBox = {
  width: "14px",
  height: "14px",
  borderRadius: "4px",
  border: "1px solid rgba(0,0,0,0.05)",
};

const legend = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px",
  marginTop: "14px",
  color: "#666",
  fontSize: "0.85rem",
};

const legendBox = {
  width: "12px",
  height: "12px",
  borderRadius: "3px",
};