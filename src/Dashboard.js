import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [animal, setAnimal] = useState({ name: "", src: "" });
  const [bubbleText, setBubbleText] = useState(true);
  const [checkInMood, setCheckInMood] = useState("");
  const [supportMessage, setSupportMessage] = useState("");

 useEffect(() => {
  const user = localStorage.getItem("currentUser") || "guest";
  const name = localStorage.getItem(`${user}_supportAnimal`) || localStorage.getItem("supportAnimal") || "Your Mascot";
  const src = localStorage.getItem(`${user}_supportAnimal_src`) || localStorage.getItem("supportAnimal_src") || "";

  const savedCheckIn = localStorage.getItem(`${user}_dailyCheckIn`) || "";
  const savedMessage = localStorage.getItem(`${user}_supportMessage`) || "";

  setAnimal({ name, src });
  setCheckInMood(savedCheckIn);
  setSupportMessage(savedMessage);

  setBubbleText(true);
  const t = setTimeout(() => setBubbleText(false), 3000);
  return () => clearTimeout(t);
}, []);

  const updateSupportMessage = (mood) => {
  


    if (mood === "Angry") setSupportMessage("Let’s take some time to reset.");
    if (mood === "Sadness") setSupportMessage("Be gentle with yourself today.");
    if (mood === "Fearful") setSupportMessage("I inhale peace and exhale worry.");
    if (mood === "Happiness") setSupportMessage("Happiness is the best makeup!!");
  };

  
 const saveMoodCheckIn = (mood) => {
    setCheckInMood(mood);
    localStorage.setItem("dailyCheckIn", mood); 
    
    const moodHistory = JSON.parse(localStorage.getItem("moodHistory") || "[]");
    
    const today = new Date().toISOString().split("T")[0];
    const updatedHistory = [
      ...moodHistory.filter((item) => item.date !== today),
      {
        date: today,
        mood: mood,
      },
    ];

    localStorage.setItem("moodHistory", JSON.stringify(updatedHistory));
    updateSupportMessage(mood);
    setBubbleText(true);

    setTimeout(() => setBubbleText(false), 3000);
  };
    

  const calmMoment = (type) => {
    if (type === "breathing") {
      alert("Take a slow breath in for 4, hold for 4, and breathe out for 4.");
    }
    if (type === "grounding") {
      alert("Try naming 5 things you can see, 4 you can touch, 3 you can hear.");
    }
    if (type === "stretch") {
      alert("Roll your shoulders, unclench your jaw, and gently stretch.");
    }
    if (type === "sounds") {
      alert("Try soft music, rain sounds, or calm background noise for a few minutes.");
    }
  };

  return (
    <div style={Dashpage}>
      <div style={profile}>
        <div style={profileWrap}>
          {animal.src ? (
            <img src={animal.src} alt={animal.name} style={profileImg} />
          ) : (
            <div style={profileWrapHold}>?</div>
          )}

          <div>
            <h2 style={helloText}>Hello!!</h2>
            <p style={animalText}>
              Your support animal: <b>{animal.name}</b>
            </p>
          </div>
        </div>
      </div>

      <div style={container}>
        <div style={sectionCard}>
          <h3 style={sectionTitle}>Quick Actions</h3>
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

            <button
              style={{ ...bubbleBtn, ...drawBtn }}
              onClick={() => navigate("/DrawBoard")}
            >
              My Draw Board
            </button>

            <button
              style={{ ...bubbleBtn, ...achievementsBtn }}
              onClick={() => navigate("/achievements")}
            >
              Achievements
            </button>
          </div>
        </div>

        <div style={sectionCard}>
          <h3 style={sectionTitle}>Daily Check-in</h3>
          <p style={sectionText}>How are you feeling right now?</p>

          <div style={moodRow}>
            {[ "Sadness" ,"Fearful", "Angry", "Happiness"].map((mood) => (
              <button
                key={mood}
                style={checkInMood === mood ? moodBtnActive : moodBtn}
                onClick={() => saveMoodCheckIn(mood)}

              >
                {mood}
              </button>
            ))}
          </div>

          {checkInMood && (
            <div style={checkInBox}>
              <p style={savedMoodText}>
                Today’s check-in: <b>{checkInMood}</b>
              </p>
              <p style={supportText}>{supportMessage}</p>
            </div>
          )}
        </div>

        <div style={sectionCard}>
          <h3 style={sectionTitle}>Need a Calm Moment?</h3>
          <p style={sectionText}>
            Choose one small activity to help you slow down and reset.
          </p>

          <div style={calmGrid}>
            <button style={calmBtn} onClick={() => calmMoment("breathing")}>
              Breathing
            </button>
            <button style={calmBtn} onClick={() => calmMoment("grounding")}>
              Grounding
            </button>
            <button style={calmBtn} onClick={() => calmMoment("stretch")}>
              Stretch
            </button>
            <button style={calmBtn} onClick={() => calmMoment("sounds")}>
              Calming Sounds
            </button>
          </div>
        </div>

        <div style={infoCard}>
          <p style={infoText}>
            This space is here to support you through small daily steps. You can
            write in your diary, work on your goals, express yourself through
            drawing, and celebrate little wins through achievements.
          </p>
        </div>

        {bubbleText && animal.src && (
          <div style={bubbleWrap}>
            <div style={bubble}>
              <div style={bubbleRow}>
                <img src={animal.src} alt={animal.name} style={bubbleAvatar} />
                <div>
                  <div style={bubbleTitle}>{animal.name} says:</div>
                  <div>{supportMessage || "Good luck today!!"}</div>
                </div>
              </div>
              <div style={bubbleTail} />
            </div>
          </div>
        )}
      </div>
    </div>
  )};


const Dashpage = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #dff6f2, #edf9f6)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingBottom: "40px",
  fontFamily: "Georgia, serif",
};

const profile = {
  background: "#d8f3ea",
  width: "100%",
  padding: "18px 24px",
  marginBottom: 20,
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
};

const profileWrap = {
  display: "flex",
  gap: 16,
  alignItems: "center",
};

const profileImg = {
  width: 110,
  height: 110,
  borderRadius: 20,
  objectFit: "cover",
  boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
};

const profileWrapHold = {
  width: 110,
  height: 110,
  borderRadius: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(255,255,255,0.7)",
  fontSize: "2rem",
  color: "#5d6f69",
};

const helloText = {
  marginBottom: 0,
  color: "#4f6660",
};

const animalText = {
  margin: "6px 0 0 0",
  color: "#5d6f69",
};

const container = {
  background: "rgba(255, 255, 255, 0.72)",
  width: "72%",
  borderRadius: "24px",
  padding: "24px",
  textAlign: "center",
  margin: "0 auto",
  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
  backdropFilter: "blur(6px)",
};

const sectionCard = {
  background: "rgba(255,255,255,0.78)",
  borderRadius: "20px",
  padding: "20px",
  marginBottom: "18px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
};

const sectionTitle = {
  marginTop: 0,
  color: "#4f6660",
  fontSize: "1.45rem",
};

const sectionText = {
  color: "#5d6f69",
  marginBottom: "14px",
  lineHeight: 1.5,
};

const bubbleGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "14px",
};

const bubbleBtn = {
  padding: 16,
  borderRadius: 16,
  border: "none",
  cursor: "pointer",
  fontSize: 16,
  fontFamily: "Georgia, serif",
  color: "#435650",
  boxShadow: "0 8px 18px rgba(0,0,0,0.06)",
};

const goalsBtn = {
  background: "#cfeccf",
};

const diaryBtn = {
  background: "#ffdfe8",
};

const drawBtn = {
  background: "#fff1b8",
};

const achievementsBtn = {
  background: "#eadcff",
};

const moodRow = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  justifyContent: "center",
};

const moodBtn = {
  padding: "10px 16px",
  borderRadius: "14px",
  border: "none",
  cursor: "pointer",
  background: "#eef6f3",
  color: "#4f6660",
  fontWeight: "bold",
  boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
};

const moodBtnActive = {
  padding: "10px 16px",
  borderRadius: "14px",
  border: "none",
  cursor: "pointer",
  background: "#bfead8",
  color: "#355149",
  fontWeight: "bold",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
};

const checkInBox = {
  marginTop: "14px",
  padding: "14px",
  borderRadius: "16px",
  background: "#f2fbf7",
};

const savedMoodText = {
  margin: 0,
  color: "#4f6660",
};

const supportText = {
  marginTop: "8px",
  marginBottom: 0,
  color: "#5d6f69",
};

const calmGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "12px",
};

const calmBtn = {
  padding: "13px",
  borderRadius: "14px",
  border: "none",
  cursor: "pointer",
  background: "#dff3ef",
  color: "#435650",
  fontWeight: "bold",
  boxShadow: "0 6px 14px rgba(0,0,0,0.05)",
};

const infoCard = {
  background: "rgba(233, 248, 244, 0.9)",
  borderRadius: "18px",
  padding: "18px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
};

const infoText = {
  color: "#5d6f69",
  fontSize: "1.05rem",
  lineHeight: 1.6,
  margin: 0,
};

const bubbleWrap = {
  position: "fixed",
  left: 0,
  right: 0,
  bottom: 20,
  display: "flex",
  justifyContent: "center",
  zIndex: 9999,
};

const bubble = {
  position: "relative",
  width: "min(520px, calc(100% - 32px))",
  background: "white",
  borderRadius: 16,
  padding: 14,
  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
};

const bubbleRow = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const bubbleAvatar = {
  width: 42,
  height: 42,
  borderRadius: "50%",
  objectFit: "cover",
  background: "#d8f3ea",
};

const bubbleTitle = {
  fontWeight: 600,
  fontSize: "0.95rem",
  color: "#4f6660",
};

const bubbleTail = {
  position: "absolute",
  bottom: -10,
  left: 20,
  width: 18,
  height: 18,
  background: "white",
  transform: "rotate(45deg)",
};