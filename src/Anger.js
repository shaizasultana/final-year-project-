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

export default function Anger() {
  const navigate = useNavigate();

  const breathingExercises = useMemo(
    () => [
      { name: "Box Breathing (4–4–4–4)", steps: "Inhale 4 seconds → Hold 4 → Exhale 4 → Hold 4. Repeat 5 times." },
      { name: "4–7–8 Breathing", steps: "Inhale 4 → Hold 7 → Exhale 8. Repeat 4 times." },
      { name: "Triangle Breathing (4–4–4)", steps: "Inhale 4 → Hold 4 → Exhale 4. Repeat slowly for 2 minutes." },
      { name: "Physiological Sigh", steps: "Inhale through nose → short top-up inhale → long slow exhale through mouth. Repeat 3–5 times." },
      { name: "Paced Breathing (5–5)", steps: "Inhale 5 seconds → Exhale 5 seconds. Continue for 2 minutes." },
      { name: "Equal Breathing (4–4)", steps: "Inhale 4 → Exhale 4. Keep it steady for 2 minutes." },
      { name: "Extended Exhale (4–6)", steps: "Inhale 4 → Exhale 6. Focus on a long, slow exhale. Repeat 8 times." },
      { name: "Belly Breathing (Diaphragmatic)", steps: "Place a hand on your belly. Inhale so your belly rises → exhale slowly. Repeat for 2 minutes." },
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
    const targetAngle = 360 * 6 + (360 - (index * segmentAngle + segmentAngle / 2));

    setSpinning(true);
    setChosen(null);
    setAngle((prev) => prev + targetAngle);

    setTimeout(() => {
      setChosen(breathingExercises[index]);
      setSpinning(false);
    }, 2800);
  };

  const taiChiRoutines = useMemo(
    () => [
      {
        id: "reset-3",
        name: "3-Minute Tai Chi Reset",
        durationSec: 180,
        videoUrl: "https://www.youtube.com/embed/8QW0tH9f9pc",
        steps: [
          "Stand tall, feet shoulder-width. Soften knees. Hands by sides.",
          "Inhale slowly, lift hands to chest height (palms down).",
          "Exhale slowly, lower hands like smoothing the air.",
          "Repeat this wave for 6–8 slow breaths.",
          "Finish: hands on belly, 3 calm breaths.",
        ],
      },
      {
        id: "cloud-hands",
        name: "Cloud Hands (Beginner)",
        durationSec: 240,
        videoUrl: "https://www.youtube.com/embed/4-0K5I5VQ9E",
        steps: [
          "Feet wider than hips. Relax shoulders. Eyes soft.",
          "Shift weight to right foot while right hand floats across chest.",
          "Left hand lowers and circles—keep movements round.",
          "Shift weight to left foot while hands switch smoothly.",
          "Do 8–12 slow side-to-side shifts.",
        ],
      },
      {
        id: "open-chest",
        name: "Opening the Chest (Calm + Release)",
        durationSec: 240,
        videoUrl: "https://www.youtube.com/embed/3b6pQ6XqV2M",
        steps: [
          "Hands in front of chest, palms facing you.",
          "Inhale: open arms wide like opening curtains.",
          "Exhale: bring arms back in like hugging a big ball.",
          "Keep elbows soft, shoulders down.",
          "Repeat 8–10 times.",
        ],
      },
      {
        id: "push-wave",
        name: "Push the Wave (Grounding)",
        durationSec: 300,
        videoUrl: "https://www.youtube.com/embed/0bZB0QJvGmM",
        steps: [
          "Hands at belly height, palms forward (like holding water).",
          "Inhale: pull hands back toward belly (elbows soft).",
          "Exhale: gently push forward (like pushing a wave).",
          "Shift weight slightly forward on exhale, back on inhale.",
          "Repeat 10–12 times.",
        ],
      },
      {
        id: "wuji",
        name: "Standing Meditation (Wu Ji)",
        durationSec: 120,
        videoUrl: "https://www.youtube.com/embed/0Zz7lTqfX4k",
        steps: [
          "Feet shoulder-width, knees soft, tailbone relaxed.",
          "Imagine head floating up, shoulders dropping down.",
          "Hands rest by sides or on belly.",
          "Breathe naturally through the nose.",
          "Stay still. If thoughts come, return to breath.",
        ],
      },
    ],
    []
  );

  const [taiChosen, setTaiChosen] = useState(null);
  const [taiSecondsLeft, setTaiSecondsLeft] = useState(0);
  const [taiTimerRunning, setTaiTimerRunning] = useState(false);

  const [taiFavourites, setTaiFavourites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("taiFavourites") || "[]");
    } catch {
      return [];
    }
  });

  const [taiRating, setTaiRating] = useState(7);
  const [taiJustFinished, setTaiJustFinished] = useState(false);

  const [taiSessions, setTaiSessions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("taiSessions") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("taiFavourites", JSON.stringify(taiFavourites));
  }, [taiFavourites]);

  useEffect(() => {
    localStorage.setItem("taiSessions", JSON.stringify(taiSessions));
  }, [taiSessions]);

  useEffect(() => {
    if (!taiTimerRunning) return;
    if (taiSecondsLeft <= 0) return;

    const t = setInterval(() => {
      setTaiSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);

    return () => clearInterval(t);
  }, [taiTimerRunning, taiSecondsLeft]);

  useEffect(() => {
    if (taiSecondsLeft === 0 && taiTimerRunning) {
      setTaiTimerRunning(false);
      setTaiJustFinished(true);
      setTaiRating(7);
    }
  }, [taiSecondsLeft, taiTimerRunning]);

  const pickTaiChi = () => {
    const index = Math.floor(Math.random() * taiChiRoutines.length);
    const routine = taiChiRoutines[index];
    setTaiChosen(routine);
    setTaiSecondsLeft(routine.durationSec);
    setTaiTimerRunning(false);
    setTaiJustFinished(false);
  };

  const toggleFavourite = () => {
    if (!taiChosen) return;
    setTaiFavourites((prev) =>
      prev.includes(taiChosen.id) ? prev.filter((id) => id !== taiChosen.id) : [...prev, taiChosen.id]
    );
  };

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const startTaiTimer = () => {
    if (!taiChosen) return;
    if (taiSecondsLeft === 0) setTaiSecondsLeft(taiChosen.durationSec);
    setTaiTimerRunning(true);
    setTaiJustFinished(false);
  };

  const pauseTaiTimer = () => setTaiTimerRunning(false);

  const resetTaiTimer = () => {
    if (!taiChosen) return;
    setTaiTimerRunning(false);
    setTaiSecondsLeft(taiChosen.durationSec);
    setTaiJustFinished(false);
  };

  const saveTaiSession = () => {
    if (!taiChosen) return;

    const session = {
      id: `${Date.now()}`,
      routineId: taiChosen.id,
      routineName: taiChosen.name,
      durationSec: taiChosen.durationSec,
      rating: Number(taiRating),
      completedAt: new Date().toISOString(),
    };

    setTaiSessions((prev) => [session, ...prev].slice(0, 200));
    setTaiJustFinished(false);
  };

  const average = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);

  const overallAvg = useMemo(() => average(taiSessions.map((s) => s.rating)), [taiSessions]);
  const last7Avg = useMemo(() => average(taiSessions.slice(0, 7).map((s) => s.rating)), [taiSessions]);
  const prev7Avg = useMemo(() => average(taiSessions.slice(7, 14).map((s) => s.rating)), [taiSessions]);

  const improvement = useMemo(() => {
    if (taiSessions.length < 8) return null;
    return last7Avg - prev7Avg;
  }, [taiSessions.length, last7Avg, prev7Avg]);

  const runAndWriteRoutines = useMemo(
    () => [
      {
    
        name: "Run  Jump !!",
        durationSec: 120,
        steps: [
          "wether a field or a small room run from side to side",
          "take a break when need",
          "Now do a few star jumps",
          "Shake arms + shoulders for 15 seconds.",
          "Breathe slowly for 15 seconds.",
        ],
      },
      {
        
        name: "Shake It Off",
        durationSec: 120,
        steps: [
          "Shake arms for 20 seconds.",
          "Shake legs for 20 seconds.",
          "Shake shoulders and jaw for 20 seconds.",
          "Do as many star jumps.",
          "lay down on you back and breath",
        ],
      },
      {
        id: "scribble-120",
        name: "Run + Scribble",
        durationSec: 120,
        steps: [
          "Run side to side or on the spot ",
          "Grab paper and scribble hard for 30 seconds (let it out).",
          "Scrunch the paper into a ball.",
          "Take 3 slow breaths and relax your shoulders.",
          "do jumps or star jumps",
        ],
      },
      {
        
        name: "Jump + Paper Boat",
        durationSec: 180,
        steps: [
          "Jump as high as you can for 20 seconds.",
          "Drink some water, loosen your shoulders.",
          "Make a paper boat (follow the video link below).",
          "When done, take 4 calm breaths and notice your body.",
        ],
        link: "https://www.youtube.com/watch?v=3N7EUi3-PG8",
      },
      {
    
        name: "Write + 10 Star Jumps",
        durationSec: 180,
        steps: [
          "Write and answers:",
          "• What happened?",
          "• What did I need in that moment?",
          "• What’s one kind thing I can do for myself next?",
          "Then do 10 star jumps and breathe slowly.",
        ],
      },
    ],
    []
  );

  const [runChosen, setRunChosen] = useState(null);
  const [runSecondsLeft, setRunSecondsLeft] = useState(0);
  const [runTimerRunning, setRunTimerRunning] = useState(false);

  const pickRun = () => {
    const index = Math.floor(Math.random() * runAndWriteRoutines.length);
    const routine = runAndWriteRoutines[index];
    setRunChosen(routine);
    setRunSecondsLeft(routine.durationSec);
    setRunTimerRunning(false);
  };

  useEffect(() => {
    if (!runTimerRunning) return;
    if (runSecondsLeft <= 0) return;

    const t = setInterval(() => {
      setRunSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);

    return () => clearInterval(t);
  }, [runTimerRunning, runSecondsLeft]);

  useEffect(() => {
    if (runSecondsLeft === 0 && runTimerRunning) {
      setRunTimerRunning(false);
    }
  }, [runSecondsLeft, runTimerRunning]);

  const startRunTimer = () => {
    if (!runChosen) return;
    if (runSecondsLeft === 0) setRunSecondsLeft(runChosen.durationSec);
    setRunTimerRunning(true);
  };

  const pauseRunTimer = () => setRunTimerRunning(false);

  const resetRunTimer = () => {
    if (!runChosen) return;
    setRunTimerRunning(false);
    setRunSecondsLeft(runChosen.durationSec);
  };

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
                transition: spinning ? "transform 2.8s cubic-bezier(0.12, 0.85, 0.2, 1)" : "none",
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
                    <div style={{ ...segmentLabel, transform: `rotate(${segAngle / 2}deg)` }}>{item.name}</div>
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
            style={{ ...spinButton, opacity: spinning ? 0.7 : 1, cursor: spinning ? "not-allowed" : "pointer" }}
            disabled={spinning}
          >
            {spinning ? "Spinning..." : "Spin the wheel"}
          </button>

          {!chosen && <p style={resultText}>Press spin to get a random breathing exercise.</p>}

          {chosen && (
            <div style={instructionCard}>
              <h3 style={instructionTitle}>!! {chosen.name}</h3>
              <p style={instructionText}>{chosen.steps}</p>
            </div>
          )}
        </div>

        <div style={container}>
          <h1 style={title}>TAI CHI</h1>

          <p style={text}>Slow movement helps calm your body first, then release anger safely.</p>

          <div style={taiTopRow}>
            <button onClick={pickTaiChi} style={spinButton}>
              Pick a Tai Chi Routine
            </button>

            <button
              onClick={toggleFavourite}
              style={{
                ...smallButtonAlt,
                minWidth: 160,
                border: taiChosen && taiFavourites.includes(taiChosen.id) ? "2px solid rgba(45,190,209,0.9)" : smallButtonAlt.border,
              }}
              disabled={!taiChosen}
            >
              {taiChosen && taiFavourites.includes(taiChosen.id) ? "★ Favourited" : "☆ Add Favourite"}
            </button>
          </div>

          {!taiChosen && <p style={resultText}>Press “Pick” to get steps + timer + video + rating.</p>}

          {taiChosen && (
            <div style={instructionCard}>
              <h3 style={instructionTitle}>✅ {taiChosen.name}</h3>

              <p style={{ ...instructionText, marginBottom: 10 }}>
                <b>Time:</b> {Math.ceil(taiChosen.durationSec / 60)} min
              </p>

              <div style={taiTimerRow}>
                <div style={taiTimerBox}>
                  <div style={taiTimerLabel}>Timer</div>
                  <div style={taiTimerTime}>
                    {formatTime(taiSecondsLeft)}
                    {taiSecondsLeft === 0 && !taiTimerRunning ? " !!" : ""}
                  </div>
                </div>

                <div style={taiTimerButtons}>
                  <button onClick={startTaiTimer} style={smallButton} disabled={taiTimerRunning}>
                    Start
                  </button>
                  <button onClick={pauseTaiTimer} style={smallButtonAlt} disabled={!taiTimerRunning}>
                    Pause
                  </button>
                  <button onClick={resetTaiTimer} style={smallButtonAlt}>
                    Reset
                  </button>
                </div>
              </div>

              <ol style={taiSteps}>
                {taiChosen.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>

              <div style={taiVideoWrap}>
                <div style={taiVideoTitle}>Follow-along video (optional)</div>
                <iframe
                  style={taiIframe}
                  src={taiChosen.videoUrl}
                  title={taiChosen.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {taiJustFinished && (
                <div style={ratingCard}>
                  <h3 style={instructionTitle}>⭐ Quick Rating</h3>
                  <p style={instructionText}>How calm do you feel after this routine? (1 = not calm, 10 = very calm)</p>

                  <div style={ratingRow}>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={taiRating}
                      onChange={(e) => setTaiRating(Number(e.target.value))}
                      style={ratingRange}
                    />
                    <div style={ratingValue}>{taiRating}/10</div>
                  </div>

                  <div style={ratingButtons}>
                    <button onClick={saveTaiSession} style={smallButton}>
                      Save Rating
                    </button>
                    <button onClick={() => setTaiJustFinished(false)} style={smallButtonAlt}>
                      Not now
                    </button>
                  </div>
                </div>
              )}

              {taiSessions.length > 0 && (
                <div style={progressCard}>
                  <h3 style={instructionTitle}>Your Tai Chi Progress</h3>

                  <p style={instructionText}>
                    <b>Overall average:</b> {overallAvg.toFixed(1)}/10
                    <br />
                    <b>Last 7 sessions average:</b> {last7Avg.toFixed(1)}/10
                    {improvement !== null && (
                      <>
                        <br />
                        <b>Change vs previous 7:</b> {improvement >= 0 ? "+" : ""}
                        {improvement.toFixed(1)}
                      </>
                    )}
                  </p>

                  <div style={miniHistory}>
                    <div style={miniHistoryTitle}>Recent ratings</div>
                    <div style={miniHistoryList}>
                      {taiSessions.slice(0, 8).map((s) => (
                        <div key={s.id} style={miniHistoryItem}>
                          <div style={miniHistoryLeft}>
                            <div style={miniHistoryName}>{s.routineName}</div>
                            <div style={miniHistoryMeta}>
                              {new Date(s.completedAt).toLocaleDateString()} • {Math.ceil(s.durationSec / 60)} min
                            </div>
                          </div>
                          <div style={miniHistoryScore}>{s.rating}/10</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {taiFavourites.length > 0 && (
                <div style={taiFavNote}>
                  <b>Favourites saved:</b> {taiFavourites.length} routine{taiFavourites.length === 1 ? "" : "s"}
                </div>
              )}
            </div>
          )}
        </div>

        <div style={container}>
          <h1 style={title}>drawing</h1>
          <button onClick={() => navigate("/DrawBoard")} style={spinButton}>
            Open and draw 
          </button>
         <p style={text}>
  You are not alone. Feeling angry is a normal emotion, and expressing it through drawing can help release tension safely. Understanding where the anger comes from can make it easier to manage and return to a calmer state.
</p>
        </div>


        <div style={container}>
          <h1 style={title}>running and writing</h1>
          <p style={text}>Pick a quick anger-release routine with a timer.</p>

          <button onClick={pickRun} style={spinButton}>
            Destress Routine
          </button>

          {!runChosen && <p style={resultText}>Press “Destress Routine” to pick one.</p>}

          {runChosen && (
            <div style={instructionCard}>
              <h3 style={instructionTitle}>!! {runChosen.name}</h3>

              <p style={{ ...instructionText, marginBottom: 10 }}>
                <b>Time:</b> {Math.ceil(runChosen.durationSec / 60)} min
              </p>

              <div style={taiTimerRow}>
                <div style={taiTimerBox}>
                  <div style={taiTimerLabel}>Timer</div>
                  <div style={taiTimerTime}>
                    {formatTime(runSecondsLeft)}
                    {runSecondsLeft === 0 && !runTimerRunning ? " !!" : ""}
                  </div>
                </div>

                <div style={taiTimerButtons}>
                  <button onClick={startRunTimer} style={smallButton} disabled={runTimerRunning}>
                    Start
                  </button>
                  <button onClick={pauseRunTimer} style={smallButtonAlt} disabled={!runTimerRunning}>
                    Pause
                  </button>
                  <button onClick={resetRunTimer} style={smallButtonAlt}>
                    Reset
                  </button>
                </div>
              </div>

              <ol style={taiSteps}>
                {runChosen.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>

              {runChosen.link && (
                <div style={{ marginTop: 12, textAlign: "center" }}>
                  <a href={runChosen.link} target="_blank" rel="noreferrer" style={{ color: "#1f5f3b", fontWeight: 700 }}>
                    Paper boat video link
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const page = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #fff8c9, #fffdf0)",
  display: "flex",
  justifyContent: "center",
  fontFamily: "Georgia, serif",
  padding: "40px 30px",
  boxSizing: "border-box",
};

const layout = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(360px, 1fr))",
  gap: "32px",
  width: "100%",
  maxWidth: "1200px",
};

const container = {
  background: "rgba(255,255,255,0.86)",
  borderRadius: "28px",
  padding: "30px",
  boxShadow: "0 16px 34px rgba(120,105,50,0.12)",
  border: "1px solid rgba(255,240,170,0.9)",
  boxSizing: "border-box",
};

const title = {
  textAlign: "center",
  color: "#6b6040",
  marginBottom: "18px",
  fontSize: "2rem",
};

const text = {
  textAlign: "center",
  fontSize: "1.05rem",
  color: "#5f5a48",
  marginBottom: "18px",
  lineHeight: 1.5,
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
  borderBottom: "20px solid #6b6040",
  zIndex: 5,
};

const wheel = {
  width: "340px",
  height: "340px",
  borderRadius: "50%",
  border: "12px solid rgba(216,184,95,0.35)",
  background: "#ffffff",
  position: "relative",
  overflow: "hidden",
  boxShadow: "0 18px 35px rgba(120,105,50,0.16)",
};

const segment = {
  position: "absolute",
  width: "50%",
  height: "50%",
  top: "50%",
  left: "50%",
  transformOrigin: "0% 0%",
  borderLeft: "1px solid rgba(120,105,50,0.08)",
  borderTop: "1px solid rgba(120,105,50,0.08)",
};

const segmentLabel = {
  position: "absolute",
  top: "16px",
  left: "12px",
  width: "135px",
  fontSize: "0.78rem",
  color: "#6b6040",
  fontWeight: "600",
  lineHeight: 1.25,
};

const wheelCenter = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "92px",
  height: "92px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #d8b85f, #95e8f3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontWeight: "bold",
  fontSize: "1.1rem",
  boxShadow: "0 8px 20px rgba(120,105,50,0.22)",
  zIndex: 4,
};

const centerText = { userSelect: "none" };

const spinButton = {
  width: "240px",
  padding: "13px",
  borderRadius: "18px",
  border: "none",
  fontSize: "1rem",
  color: "white",
  background: "linear-gradient(135deg, #d8b85f, #95e8f3)",
  boxShadow: "0 10px 22px rgba(120,105,50,0.16)",
  display: "block",
  margin: "0 auto",
  cursor: "pointer",
};

const resultText = {
  textAlign: "center",
  marginTop: "14px",
  color: "#5f5a48",
  fontSize: "1rem",
};

const instructionCard = {
  marginTop: "18px",
  padding: "18px",
  borderRadius: "18px",
  background: "rgba(255,248,201,0.85)",
  boxShadow: "0 8px 18px rgba(120,105,50,0.10)",
};

const instructionTitle = {
  margin: "0 0 8px",
  color: "#6b6040",
};

const instructionText = {
  margin: 0,
  fontSize: "1rem",
  color: "#5f5a48",
  lineHeight: 1.5,
};

const smallButton = {
  padding: "12px 14px",
  borderRadius: "14px",
  border: "none",
  fontSize: "0.95rem",
  color: "white",
  background: "linear-gradient(135deg, #d8b85f, #95e8f3)",
  boxShadow: "0 10px 18px rgba(120,105,50,0.12)",
  cursor: "pointer",
};

const smallButtonAlt = {
  padding: "10px 12px",
  borderRadius: "14px",
  border: "1px solid rgba(120,105,50,0.15)",
  fontSize: "0.95rem",
  color: "#5f5a48",
  background: "rgba(255,255,255,0.9)",
  boxShadow: "0 10px 18px rgba(120,105,50,0.08)",
  cursor: "pointer",
};

const taiTopRow = {
  display: "flex",
  gap: "12px",
  justifyContent: "center",
  flexWrap: "wrap",
  marginBottom: "12px",
};

const taiTimerRow = {
  display: "flex",
  gap: "12px",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  marginBottom: "12px",
};

const taiTimerBox = {
  background: "rgba(255,255,255,0.9)",
  borderRadius: "14px",
  padding: "10px 14px",
  border: "1px solid rgba(120,105,50,0.12)",
  boxShadow: "0 10px 18px rgba(120,105,50,0.08)",
  minWidth: "160px",
};

const taiTimerLabel = {
  fontSize: "0.85rem",
  color: "#6b6040",
  fontWeight: "700",
};

const taiTimerTime = {
  fontSize: "1.2rem",
  fontWeight: "800",
  color: "#5f5a48",
  marginTop: "4px",
};

const taiTimerButtons = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  justifyContent: "center",
};

const taiSteps = {
  margin: 0,
  paddingLeft: 18,
  color: "#5f5a48",
  lineHeight: 1.65,
};

const taiVideoWrap = {
  marginTop: "14px",
  borderRadius: "16px",
  overflow: "hidden",
  border: "1px solid rgba(120,105,50,0.12)",
  boxShadow: "0 16px 28px rgba(120,105,50,0.10)",
  background: "white",
};

const taiVideoTitle = {
  padding: "10px 12px",
  fontWeight: "700",
  color: "#6b6040",
  background: "rgba(255,248,201,0.75)",
  borderBottom: "1px solid rgba(120,105,50,0.08)",
};

const taiIframe = {
  width: "100%",
  height: "280px",
  border: "none",
  display: "block",
};

const taiFavNote = {
  marginTop: "12px",
  textAlign: "center",
  color: "#2f2f2f",
  fontSize: "0.95rem",
};

const ratingCard = {
  marginTop: "14px",
  padding: "16px",
  borderRadius: "14px",
  background: "rgba(255,255,255,0.92)",
  border: "1px solid rgba(0,0,0,0.08)",
  boxShadow: "0 10px 18px rgba(0,0,0,0.10)",
};

const ratingRow = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  justifyContent: "center",
  flexWrap: "wrap",
  marginTop: "10px",
};

const ratingRange = {
  width: "260px",
};

const ratingValue = {
  fontWeight: "800",
  color: "#2f2f2f",
  fontSize: "1.05rem",
  minWidth: "70px",
  textAlign: "center",
};

const ratingButtons = {
  display: "flex",
  gap: "10px",
  justifyContent: "center",
  flexWrap: "wrap",
  marginTop: "12px",
};

const progressCard = {
  marginTop: "14px",
  padding: "16px",
  borderRadius: "14px",
  background: "#f0ffd3ff",
  boxShadow: "0 10px 18px rgba(0,0,0,0.10)",
};

const miniHistory = {
  marginTop: "10px",
};

const miniHistoryTitle = {
  fontWeight: "800",
  color: "#1f5f3b",
  marginBottom: "8px",
};

const miniHistoryList = {
  display: "grid",
  gap: "8px",
};

const miniHistoryItem = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "10px",
  padding: "10px 12px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.9)",
  border: "1px solid rgba(0,0,0,0.06)",
};

const miniHistoryLeft = {
  display: "flex",
  flexDirection: "column",
  gap: "2px",
};

const miniHistoryName = {
  fontWeight: "700",
  color: "#2f2f2f",
};

const miniHistoryMeta = {
  fontSize: "0.85rem",
  color: "rgba(0,0,0,0.55)",
};

const miniHistoryScore = {
  fontWeight: "900",
  color: "#1f5f3b",
  minWidth: "60px",
  textAlign: "right",
};
