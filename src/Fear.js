import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const pastelColours = [
  "#e8f8f5",
  "#fdf2e9",
  "#f4ecf7",
  "#eaf2f8",
  "#f9ebea",
  "#e9f7ef",
  "#fef9e7",
  "#eef1f4",
];

export default function Fear() {
  const navigate = useNavigate();
  const [loadingMusic, setLoadingMusic] = useState(true);
  const [tracks, setTracks] = useState([]);

  const [drawPrompt, setDrawPrompt] = useState(null);
  const [drawLoading, setDrawLoading] = useState(false);
  const [drawError, setDrawError] = useState("");

  const breathingExercises = useMemo(
    () => [
      {
        name: "Box Breathing (4–4–4–4)",
        steps: "Inhale 4 seconds → Hold 4 → Exhale 4 → Hold 4. Repeat 5 times.",
      },
      {
        name: "4–7–8 Breathing",
        steps: "Inhale 4 → Hold 7 → Exhale 8. Repeat 4 times.",
      },
      {
        name: "Triangle Breathing (4–4–4)",
        steps: "Inhale 4 → Hold 4 → Exhale 4. Repeat slowly for 2 minutes.",
      },
      {
        name: "Physiological Sigh",
        steps:
          "Inhale through nose → short top-up inhale → long slow exhale through mouth. Repeat 3–5 times.",
      },
      {
        name: "Paced Breathing (5–5)",
        steps: "Inhale 5 seconds → Exhale 5 seconds. Continue for 2 minutes.",
      },
      {
        name: "Equal Breathing (4–4)",
        steps: "Inhale 4 → Exhale 4. Keep it steady for 2 minutes.",
      },
      {
        name: "Extended Exhale (4–6)",
        steps:
          "Inhale 4 → Exhale 6. Focus on a long, slow exhale. Repeat 8 times.",
      },
      {
        name: "Belly Breathing (Diaphragmatic)",
        steps:
          "Place a hand on your belly. Inhale so your belly rises → exhale slowly. Repeat for 2 minutes.",
      },
    ],
    []
  );



  
  const [spinning, setSpinning] = useState(false);
  const [chosen, setChosen] = useState(null);
  const [angle, setAngle] = useState(0);

  const segments = breathingExercises.length;

  const spinWheel = () => {
    if (spinning) return;

    const index = Math.floor(Math.random() * segments);

    const segmentAngle = 360 / segments;
    const targetAngle =
      360 * 6 + (360 - (index * segmentAngle + segmentAngle / 2));

    setSpinning(true);
    setChosen(null);
    setAngle((prev) => prev + targetAngle);

    setTimeout(() => {
      setChosen(breathingExercises[index]);
      setSpinning(false);
    }, 2800);
  };

  const getDrawingPrompt = () => {
    setDrawLoading(true);
    setDrawError("");
    setDrawPrompt(null);

    const queries = [
      "how to draw cute",
      "how to draw kawaii",
      "how to draw simple animal",
      "how to draw flower doodle",
      "how to draw easy heart",
    ];
    const q = queries[Math.floor(Math.random() * queries.length)];

    fetch(
      `https://www.wikihow.com/api.php?action=query&list=search&srsearch=${encodeURIComponent(
        q
      )}&format=json&origin=*`
    )
      .then((res) => res.json())
      .then((data) => {
        const results = data?.query?.search || [];
        if (!results.length) {
          setDrawError("No drawing ideas found — try again.");
          return;
        }
        const pick = results[Math.floor(Math.random() * results.length)];
        setDrawPrompt({
          title: pick.title,
          snippet: (pick.snippet || "").replace(/<[^>]+>/g, ""),
          url: `https://www.wikihow.com/${encodeURIComponent(
            pick.title.replace(/ /g, "-")
          )}`,
        });
      })
      .catch((err) => {
        console.error(err);
        setDrawError("Could not load a drawing idea. Try again.");
      })
      .finally(() => setDrawLoading(false));
  };


    useEffect(() => {
  fetch("http://localhost:5000/api/music/fear")
    .then((res) => res.json())
    .then((data) => {
      console.log("Fear music data:", data);
      setTracks(data.tracks || []);
    })
    .catch((err) => console.error("Fear music error:", err))
    .finally(() => setLoadingMusic(false));
}, []);
  return (
    <div style={page}>
      <div style={layout}>
        <div style={container}>
          <h1 style={title}>breathing activities</h1>

          <div style={wheelWrap}>
            <div style={pointer} />

            <div
              style={{
                ...wheel,
                transform: `rotate(${angle}deg)`,
                transition: spinning
                  ? "transform 2.8s cubic-bezier(0.12, 0.85, 0.2, 1)"
                  : "none",
              }}
            >
              {breathingExercises.map((item, i) => {
                const segAngle = 360 / segments;
                return (
                  <div
                    key={item.name}
                    style={{
                      ...segment,
                      background: pastelColours[i % pastelColours.length],
                      transform: `rotate(${i * segAngle}deg)`,
                    }}
                  >
                    <div
                      style={{
                        ...segmentLabel,
                        transform: `rotate(${segAngle / 2}deg)`,
                      }}
                    >
                      {item.name}
                    </div>
                  </div>
                );
              })}

              <div style={wheelCenter}>
                <span style={centerText}>Breathe</span>
              </div>
            </div>
          </div>

          <button
            onClick={spinWheel}
            style={{
              ...spinButton,
              opacity: spinning ? 0.7 : 1,
              cursor: spinning ? "not-allowed" : "pointer",
            }}
            disabled={spinning}
          >
            {spinning ? "Spinning..." : "Spin the wheel"}
          </button>

          {!chosen && (
            <p style={resultText}>
              Press spin to get a random breathing exercise.
            </p>
          )}

          {chosen && (
            <div style={instructionCard}>
              <h3 style={instructionTitle}>✅ {chosen.name}</h3>
              <p style={instructionText}>{chosen.steps}</p>
            </div>
          )}
        </div>

        <div style={container}>
          <h1 style={title}>drawing</h1>
          <button onClick={() => navigate("/DrawBoard")} style={spinButton}>
            Open and draw 
          </button>
          <p>You are not alone. Fear is a normal emotion that can be expressed through drawing or breathing exercises. Understanding your feelings can help reduce their intensity and bring a sense of calm.

Focusing on a simple, selected activity can help you feel more in control and less overwhelmed. Focus on the process, not the outcome, and let your hand move freely without judgment.

Try drawing your fear as a character or shape, then transform it into something cute or funny. This can help you feel more in control and less afraid of it.
          </p>
        </div>  

        <div style={container}>
          <h1 style={title}>colouring</h1>
          <p style={text}>
            Open the colouring page and colour over the calming template.
          </p>

          <button onClick={() => navigate("/draw")} style={spinButton}>
            Open Colouring Page
          </button>
        </div>

        <div style={musicContainer}>
          <div style={scrollContainer}>
            <h1 style={title}>Music for Calming</h1>

           {loadingMusic && <p>Loading calming music...</p>}

{!loadingMusic && tracks.length === 0 && (
  <p>Try again later.</p>
)}

            {tracks.map((track) => (
              <div key={track.id} style={card}>
                {track.image && <img src={track.image} alt={track.name} style={image} />}
                <h3>{track.name}</h3>
                <p>{track.artist}</p>

                {track.audio && (
                  <audio controls style={{ width: "100%" }}>
                    <source src={track.audio} type="audio/mpeg" />
                  </audio>
                )}
                
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
   
  );
}

const page = {
  minHeight: "100vh",
  background: "rgb(234, 255, 213)))",
  display: "flex",
  justifyContent: "center",
  fontFamily: "Georgia, serif",
  padding: "30px",
};

const layout = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "30px",
  width: "100%",
  maxWidth: "1200px",
};

const container = {
  background: "rgba(255, 255, 255, 1)",
  borderRadius: "20px",
  padding: "30px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
};

const title = {
  textAlign: "center",
  color: "#1f5f3b",
  marginBottom: "20px",
};

const text = {
  textAlign: "center",
  fontSize: "1.1rem",
  color: "#2f2f2f",
  marginBottom: "20px",
};



const image = {
  width: "100%",
  borderRadius: "10px",
  marginBottom: "10px",
};

const wheelWrap = {
  position: "relative",
  width: "340px",
  height: "340px",
  margin: "0 auto 20px",
};

const pointer = {
  position: "absolute",
  top: "-8px",
  left: "50%",
  transform: "translateX(-50%)",
  width: 0,
  height: 0,
  borderLeft: "14px solid transparent",
  borderRight: "14px solid transparent",
  borderBottom: "20px solid #1f5f3b",
  zIndex: 5,
};

const wheel = {
  width: "340px",
  height: "340px",
  borderRadius: "50%",
  border: "12px solid rgba(31,95,59,0.2)",
  background: "#ffffff",
  position: "relative",
  overflow: "hidden",
  boxShadow: "0 18px 35px rgba(0,0,0,0.18)",
};

const segment = {
  position: "absolute",
  width: "50%",
  height: "50%",
  top: "50%",
  left: "50%",
  transformOrigin: "0% 0%",
  borderLeft: "1px solid rgba(0,0,0,0.08)",
  borderTop: "1px solid rgba(0,0,0,0.08)",
};

const segmentLabel = {
  position: "absolute",
  top: "16px",
  left: "12px",
  width: "135px",
  fontSize: "0.78rem",
  color: "#1f5f3b",
  fontWeight: "500",
  lineHeight: 1.25,
};

const wheelCenter = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90px",
  height: "90px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #7b3b7e, #2dbed1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontWeight: "bold",
  fontSize: "1.1rem",
  boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
  zIndex: 4,
};

const centerText = {
  userSelect: "none",
};

const spinButton = {
  width: "220px",
  padding: "12px",
  borderRadius: "14px",
  border: "none",
  fontSize: "1rem",
  color: "white",
  background: "linear-gradient(135deg, #7b3b7e, #2dbed1)",
  boxShadow: "0 10px 22px rgba(0,0,0,0.18)",
  display: "block",
  margin: "0 auto",
  cursor: "pointer",
};

const resultText = {
  textAlign: "center",
  marginTop: "14px",
  color: "#2f2f2f",
  fontSize: "1rem",
};

const instructionCard = {
  marginTop: "18px",
  padding: "18px",
  borderRadius: "14px",
  background: "#f0ffd3ff",
  boxShadow: "0 8px 18px rgba(0,0,0,0.12)",
};

const instructionTitle = {
  margin: "0 0 8px",
  color: "#1f5f3b",
};

const instructionText = {
  margin: 0,
  fontSize: "1rem",
  color: "#2f2f2f",
  lineHeight: 1.5,
};

const drawLink = {
  display: "inline-block",
  marginTop: "10px",
  textAlign: "center",
  width: "100%",
  fontWeight: "700",
  color: "#1f5f3b",
  textDecoration: "none",
};

const scrollContainer = {
  overflowY: "auto",
  flexGrow: 1,
  paddingRight: "10px",
};

const musicContainer = {
  background: "#ffffff", // ← pure white
  borderRadius: "28px",
  padding: "30px",
  boxShadow: "0 16px 34px rgba(0,0,0,0.08)", // softer neutral shadow
  height: "500px",
  display: "flex",
  flexDirection: "column",
  border: "1px solid rgba(0,0,0,0.08)", // neutral border instead of green/pink
};
const card = {
  background: "#ffffff", // instead of #f0ffd3ff
  borderRadius: "12px",
  padding: "15px",
  marginBottom: "20px",
  boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
};