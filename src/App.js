import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Mmood from "./Mmood";
import Survey from "./Survey";
import guide from "./client/src/Guide";
import Dashboard from "/client/src/Dashboard"; 
import Happy from "./client/src/Happy";
import Anger from "../../client/src/Anger";
import Sad from "../../client/src/Sad";
import Fear from "../../client/src/Fear";
import Draw from "../../client/src/ Draw";
import Guide from "../../client/src/Guide";
import Achievements from "../../client/src/Achievements";
import Profile from "../../client/src/profile";
import Diary from "../../client/src/Dairy";
import Planner from "../../client/src/Planner"; 
import PlanA from "../../client/src/PlanA";
function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px",
        fontFamily: "Georgia, serif",
        background: "linear-gradient(to bottom right, #32393eff, #6898b6ff)",
        height: "100vh",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", color: "#ffef3eff" }}>Welcome to Content</h1>

      <div style={{ marginTop: "30px" }}>
        <button
          onClick={() => navigate("/login")}
          style={{
            backgroundColor: "#ffc0e0ff",
            color: "white",
            border: "none",
            padding: "10px 30px",
            borderRadius: "8px",
            marginRight: "15px",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          style={{
            backgroundColor: "#afede1ff",
            color: "white",
            border: "none",
            padding: "10px 30px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
         <Route path="Survey" element={<Survey />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Mmood" element={<Mmood />} />
          <Route path="/Happy" element={<Happy />} />
            <Route path="/Fear" element={<Fear />} />
          <Route path="/Anger" element={<Anger />} />
            <Route path="/Sad" element={<Sad />} />
            <Route path="/Draw" element={<Draw />} />
        <Route path="/Guide" element={<Guide />} />
        <Route path="/Diary" element={<Diary />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Achievements" element={<Achievements />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Planner" element={<Planner />} />
        <Route path="/PlanA" element={<PlanA />} />
      </Routes>
    </Router>
  );
}

export default App;

