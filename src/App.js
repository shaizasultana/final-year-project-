import React, {  useState } from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import Mmood from "./Mmood";
import Happy from "./Happy";
import Survey from "./Survey";
import Sad from "./Sad";
import Fear from "./Fear";
import Anger from "./Anger";
import Draw from "./Draw";
import DrawBoard from "./DrawBoard";
import Profile from "./Profile";
import Goals from "./Goals";
import Header from "./stuff/Header";
import Dashboard from "./Dashboard";
import Guide from "./Guide";
import Diary from "./Dairy";
import Achievements from "./Achievements";
import Planner from "./Planner";
import PlanA from "./PlanA";


const needsSurvey = () => {
  const lastSurvey = localStorage.getItem("lastSurveyDate");
  const getSurveyRoute = () => {
  const cluster = localStorage.getItem("surveyCluster");

  if (cluster === "Mild") return "/Dashboard";
  if (cluster === "Moderate") return "/mood";
  if (cluster === "Severe") return "/PlanA";

  return "/Survey";
};
  
  if (!lastSurvey) return true;

  const lastDate = new Date(lastSurvey);
  const now = new Date();

  const diffTime = now - lastDate;
  const diffMonths = diffTime / (1000 * 60 * 60 * 24 * 30);

  return diffMonths >= 6;
};

function Home() {
  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  

  return (
    <div style={homePage}>
      <div style={homeCard}>
        <div style={homeHeaderRow}>
          <div style={{ textAlign: "left" }}>
            <h1 style={{ fontSize: "3rem", color: "#ffef3eff" }}>Welcome to Content</h1>
            <p style={homeSubtitle}>
              A calm space to check in, reflect, and get support based on how you feel.
            </p>
          </div>

          <div style={homePill}>
            <span style={homePillDot} />
            <span style={homePillText}>wellbeing</span>
          </div>
        </div>

        <div style={homeButtonRow}>
          <button onClick={() => setShowLogin(true)} style={homeButtonPrimary}>
            Login
          </button>

          <button onClick={() => setShowSignup(true)} style={homeButtonSecondary}>
            Create Account
          </button>
        </div>

        <div style={homeMiniCard}>
          <div style={homeMiniTitle}>Quick note</div>
          <div style={homeMiniText}>
           here to support your mental health
          </div>
        </div>
      </div>

      {showLogin && (
  <LoginModal
    close={() => setShowLogin(false)}
    goMood={() => {
      if (needsSurvey()) {
        navigate("/Survey");
      } else {
        navigate("/Dashboard");
      }
    }}
  />
)}
        
      {showSignup && (
        <SignupModal
          close={() => setShowSignup(false)}
          goMood={() => navigate("/Survey")}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Header /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mood" element={<Mmood />} />
        <Route path ="/Survey" element={<Survey/>} />
        <Route path="/happy" element={<Happy />} />
        <Route path="/sad" element={<Sad />} />
        <Route path="/fear" element={<Fear />} />
        <Route path="/anger" element={<Anger />} />
        <Route path="/draw" element={<Draw />} />
        <Route path="/drawBoard" element={<DrawBoard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Guide" element={<Guide />} />
         <Route path="/Diary" element={<Diary />} />
         <Route path="/Achievements" element={<Achievements />} />
         <Route path="/Profile" element={<Profile />} />
        <Route path="/Planner" element={<Planner />} />        
         <Route path="/PlanA" element={<PlanA />} />
      </Routes>
    </Router>
  );
}

function LoginModal({ close, goMood }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      alert(data.message);
      goMood();
    } catch (err) {
      console.error(err);
      alert("Could not connect to server. Is backend running on port 5000?");
    }
  };

  return (
    <Modal>
      <h2 style={modalTitle}>Login</h2>

      <input
        placeholder="Username or Email"
        style={inputStyle}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        style={inputStyle}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div style={{ marginTop: 8 }}>
        <button onClick={handleLogin} style={actionButton}>
          Login
        </button>
        <button onClick={close} style={secondaryButton}>
          Cancel
        </button>
      </div>
    </Modal>
  );
}

function SignupModal({ close, goMood }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    DateOfBirth: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignup = async () => {
    try {
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        userName: form.userName,
        DateOfBirth: form.DateOfBirth,
        password: form.password,
        confirmPassword: form.confirmPassword,
      };

      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert(data.message);
      goMood();
    } catch (err) {
      console.error(err);
      alert("Could not connect to server. Is backend running on port 5000?");
    }
  };

  return (
    <Modal>
      <h2 style={modalTitle}>Create Account</h2>

      <input
        placeholder="First Name"
        style={inputStyle}
        value={form.firstName}
        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
      />

      <input
        placeholder="Last Name"
        style={inputStyle}
        value={form.lastName}
        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
      />

      <input
        placeholder="Email"
        style={inputStyle}
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Username"
        style={inputStyle}
        value={form.userName}
        onChange={(e) => setForm({ ...form, userName: e.target.value })}
      />

      <input
        type="date"
        style={inputStyle}
        value={form.DateOfBirth}
        onChange={(e) => setForm({ ...form, DateOfBirth: e.target.value })}
      />

      <input
        placeholder="Password"
        type="password"
        style={inputStyle}
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <input
        placeholder="Confirm Password"
        type="password"
        style={inputStyle}
        value={form.confirmPassword}
        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
      />

      <div style={{ marginTop: 8 }}>
        <button onClick={handleSignup} style={actionButton}>
          Create Account
        </button>
        <button onClick={close} style={secondaryButton}>
          Cancel
        </button>
      </div>
    </Modal>
  );
}

function Modal({ children }) {
  return (
    <div style={overlay}>
      <div style={modal}>{children}</div>
    </div>
  );
}

const homePage = {
  minHeight: "100vh",
  background: "#bfc9ff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Georgia, serif",
  padding: "30px",
};

const homeCard = {
  background: "rgba(78, 153, 240, 0.61)",
  padding: "55px",
  borderRadius: "24px",
  maxWidth: "950px",
  width: "100%",
  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
};

const homeHeaderRow = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "20px",
  flexWrap: "wrap",
};

const homeSubtitle = {
  margin: 0,
  fontSize: "1.1rem",
  color: "#ffffffff",
  maxWidth: "560px",
  lineHeight: 1.6,
};

const homePill = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  background: "rgba(255, 255, 255, 1)",
  padding: "10px 14px",
  borderRadius: "999px",
};

const homePillDot = {
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  background: "#f19090ff",
  display: "inline-block",
};

const homePillText = {
  fontSize: "0.95rem",
  color: "#000000ff",
};

const homeButtonRow = {
  marginTop: "40px",
  display: "flex",
  gap: "16px",
  flexWrap: "wrap",
};

const homeButtonPrimary = {
  backgroundColor: "#a8c5ff",
  color: "white",
  border: "none",
  padding: "14px 26px",
  borderRadius: "14px",
  fontSize: "1.05rem",
  cursor: "pointer",
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
};

const homeButtonSecondary = {
  backgroundColor: "#a8c5ff",
  color: "white",
  border: "none",
  padding: "14px 26px",
  borderRadius: "14px",
  fontSize: "1.05rem",
  cursor: "pointer",
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
};

const homeMiniCard = {
  marginTop: "35px",
  padding: "18px 20px",
  borderRadius: "18px",
  background: "rgba(255, 255, 255, 0.04)",
};

const homeMiniTitle = {
  fontWeight: "bold",
  color: "#ffffffff",
  marginBottom: "6px",
};

const homeMiniText = {
  color: "#ffffffff",
  margin: 0,
  lineHeight: 1.5,
};

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.55)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "18px",
};

const modal = {
  background: "rgba(255,255,255,0.95)",
  border: "none",
  padding: "28px 40px",
  borderRadius: "20px",
  fontSize: "1.1rem",
  textAlign: "center",
  minWidth: "360px",
  maxWidth: "520px",
  width: "92%",
  boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
};

const modalTitle = {
  marginTop: 0,
  marginBottom: 12,
  color: "#2f2f2f",
};

const inputStyle = {
  width: "86%",
  padding: "14px",
  margin: "10px 0",
  borderRadius: "16px",
  border: "1px solid rgba(0,0,0,0.12)",
  fontSize: "1rem",
  outline: "none",
  boxShadow: "0 8px 18px rgba(0,0,0,0.10)",
};

const actionButton = {
  width: "56%",
  padding: "12px",
  margin: "10px 8px 0",
  borderRadius: "14px",
  border: "none",
  fontSize: "1rem",
  cursor: "pointer",
  color: "white",
  background: "linear-gradient( #a5e5ed)",
  boxShadow: "0 10px 22px rgba(0,0,0,0.18)",
};

const secondaryButton = {
  width: "56%",
  padding: "12px",
  margin: "10px 8px 0",
  borderRadius: "14px",
  border: "1px solid rgba(0,0,0,0.15)",
  fontSize: "1rem",
  cursor: "pointer",
  color: "#2f2f2f",
  background: "rgba(255,255,255,0.85)",
  boxShadow: "0 10px 22px rgba(0,0,0,0.10)",
};
