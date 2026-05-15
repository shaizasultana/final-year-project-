import React from "react";
import { useNavigate } from "react-router-dom";


export default function Mmood() {
  const navigate = useNavigate();

  return (
    <div style={page}>
      <div style={container}>
        <h1 style={title}>How are you feeling today?</h1>
        <p style={subtitle}>
         <li>This is the severe category design to help understand your emtions better.</li>
         <li> Depresssion and anxiety can be overwhelming, but you are not alone.</li>
         <li> We have provided you with some support and resources to help you manage your emotions. </li>      
         <li> Please select the mood that best describes how you are feeling today.</li>
         <li> This will help us provide you with the most relevant support and resources to help you manage your emotions effectively.</li>
         </p>

        <div style={grid}>
          <MoodButton
            label="Happiness"
            description="Feeling good? click here!!"
            color="#e5ffcbff"
            onClick={() => navigate("/Happy")}
          />
          <MoodButton
            label="Sadness"
            description="feeling down wanna lift up your mood? click here"
            color="#fee1fcff"
            onClick={() => navigate("/Sad")}
          />
          <MoodButton
            label="Fearful"
            description="feeling anxious or scared? click here"
            color="#eaeff1ff"
            onClick={() => navigate("/Fear")}
          />
          <MoodButton
            label="Angry"
            description="feeling angry or frustrated? click here"
            color="#ffffb7ff"
            onClick={() => navigate("/anger")}
          />
        </div>
      </div>
    </div>
  );
}

function MoodButton({ label, description, color, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...card,
        backgroundColor: color,
      }}
    >
      <div style={cardTitle}>{label}</div>
      <div style={cardText}>{description}</div>
    </button>
  );
}



const page = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #dff6f2, #edf9f6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Georgia, serif",
};

const container = {
  background: "rgba(255,255,255,0.82)",
  padding: "50px",
  borderRadius: "24px",
  maxWidth: "900px",
  width: "90%",
  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
};

const title = {
  fontSize: "2.4rem",
  marginBottom: "10px",
  color: "#3a3a3a",
};

const subtitle = {
  fontSize: "1.1rem",
  color: "#666",
  marginBottom: "40px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "25px",
};

const card = {
  border: "none",
  borderRadius: "20px",
  padding: "30px",
  cursor: "pointer",
  textAlign: "left",
  transition: "transform 0.25s ease, box-shadow 0.25s ease",
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
};

const cardTitle = {
  fontSize: "1.4rem",
  fontWeight: "bold",
  marginBottom: "10px",
  color: "#2b2b2b",
};

const cardText = {
  fontSize: "1rem",
  color: "#444",
};
