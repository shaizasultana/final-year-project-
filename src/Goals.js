import { useEffect, useState } from "react";

const STATUS = {
  NOT_ACHIEVED: "Not achieved",
  IN_PROCESS: "In process",
  DONE: "Done",
};

export default function Goals() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState(STATUS.NOT_ACHIEVED);

  const [goals, setGoals] = useState(() => {
    try {
      const saved = localStorage.getItem("goals_data");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // confetti burst state: [{id, x, y}]
  const [confettiBursts, setConfettiBursts] = useState([]);
  const fireConfetti = (x, y) => {
    const id = Date.now().toString();
    setConfettiBursts((prev) => [{ id, x, y }, ...prev]);

    setTimeout(() => {
      setConfettiBursts((prev) => prev.filter((b) => b.id !== id));
    }, 900);
  };

  useEffect(() => {
    localStorage.setItem("goals_data", JSON.stringify(goals));
  }, [goals]);

  const addGoal = () => {
    const t = text.trim();
    if (!t) return;

    setGoals((prev) => [{ id: Date.now().toString(), text: t, status }, ...prev]);
    setText("");
    setStatus(STATUS.NOT_ACHIEVED);
  };

  // pass event to place confetti
  const updateStatus = (id, newStatus, evt) => {
    const x = evt?.clientX ?? window.innerWidth / 2;
    const y = evt?.clientY ?? window.innerHeight / 3;

    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const becameDone = g.status !== STATUS.DONE && newStatus === STATUS.DONE;
          if (becameDone) fireConfetti(x, y);
          return { ...g, status: newStatus };
        }
        return g;
      })
    );
  };

  const removeGoal = (id) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const statusColour = (s) => {
    if (s === STATUS.DONE) return "#2ecc71"; // green
    if (s === STATUS.IN_PROCESS) return "#f39c12"; // orange
    return "#e74c3c"; // red
  };

  return (
    <div style={page}>
      <div style={confettiOverlay} aria-hidden="true">
        {confettiBursts.map((b) => (
          <ConfettiBurst key={b.id} x={b.x} y={b.y} />
        ))}
      </div>

      <div style={wrap}>
        <h1 style={title}>Your Goals</h1>
        <p style={subtitle}>
          Add a goal, then set its progress: red is not achieved, orange is in process, and green is done.
        </p>

        <div style={inputRow}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a goal..."
            style={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") addGoal();
            }}
          />

          <select value={status} onChange={(e) => setStatus(e.target.value)} style={select}>
            <option value={STATUS.NOT_ACHIEVED}>{STATUS.NOT_ACHIEVED}</option>
            <option value={STATUS.IN_PROCESS}>{STATUS.IN_PROCESS}</option>
            <option value={STATUS.DONE}>{STATUS.DONE}</option>
          </select>

          <button onClick={addGoal} style={addBtn}>
            Add
          </button>
        </div>

        <div style={list}>
          {goals.length === 0 ? (
            <div style={empty}>No goals yet. Add your first one above.</div>
          ) : (
            goals.map((g) => (
              <div key={g.id} style={card}>
                <div style={{ ...statusDot, background: statusColour(g.status) }} />

                <div style={{ flex: 1 }}>
                  <div style={goalText}>{g.text}</div>

                  <div style={statusRow}>
                    <span style={{ ...statusTag, borderColor: statusColour(g.status) }}>
                      {g.status}
                    </span>

                    <select
                      value={g.status}
                      onChange={(e) => updateStatus(g.id, e.target.value, e)}
                      style={{
                        ...selectSmall,
                        outline:
                          g.status === STATUS.DONE
                            ? "2px solid rgba(46,204,113,0.35)"
                            : "none",
                      }}
                    >
                      <option value={STATUS.NOT_ACHIEVED}>{STATUS.NOT_ACHIEVED}</option>
                      <option value={STATUS.IN_PROCESS}>{STATUS.IN_PROCESS}</option>
                      <option value={STATUS.DONE}>{STATUS.DONE}</option>
                    </select>
                  </div>
                </div>

                <button onClick={() => removeGoal(g.id)} style={deleteBtn}>
                  X
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <style>{confettiCss}</style>
    </div>
  );
}


function ConfettiBurst({ x, y }) {
  const pieces = Array.from({ length: 16 });

  return (
    <div className="confetti-burst" style={{ left: x, top: y }}>
      {pieces.map((_, i) => (
        <span
          key={i}
          className="confetti"
          style={{
            "--dx": `${Math.cos((i / 20) * Math.PI * 2) * (120 + (i % 4) * 18)}px`,
            "--dy": `${Math.sin((i / 20) * Math.PI * 2) * (120 + (i % 4) * 18)}px`,
            "--rot": `${(i * 35) % 1000}deg`,
            "--d": `${520 + (i % 200) * 70}ms`,
            "--i": `${i + 1}`,
          }}
        />
      ))}
    </div>
  );
}

const confettiCss = `
.confetti-burst{
  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
.confetti{
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 3px;
  opacity: 1;
  transform: translate(0,0) rotate(0deg);
  animation: pop var(--d) ease-out forwards;

  background: linear-gradient(135deg,
    hsl(calc(var(--i) * 35), 85%, 55%),
    hsl(calc(var(--i) * 35 + 60), 85%, 55%)
  );
  box-shadow: 0 6px 14px rgba(0,0,0,0.12);
}

@keyframes pop{
  0%{ transform: translate(0,0) rotate(0deg) scale(1); opacity: 0.98;}
  70%{ opacity: 0.95;}
  100%{
    transform: translate(var(--dx), var(--dy)) rotate(var(--rot)) scale(0.9);
    opacity: 0;
  }
}
`;


const page = {
  minHeight: "100vh",
  padding: "30px",
  background: "linear-gradient(135deg, #e8f8f5, #fdf2e9)",
  fontFamily: "Georgia, serif",
  boxSizing: "border-box",
  position: "relative",
};

const confettiOverlay = {
  position: "fixed",
  inset: 10,
  pointerEvents: "none",
  zIndex: 9999,
};

const wrap = {
  maxWidth: "900px",
  margin: "0 auto",
  background: "rgba(255,255,255,0.85)",
  borderRadius: "24px",
  padding: "26px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
};

const title = {
  margin: 0,
  color: "#2f2f2f",
  textAlign: "center",
};

const subtitle = {
  textAlign: "center",
  color: "rgba(0,0,0,0.65)",
  marginTop: 10,
};

const inputRow = {
  display: "grid",
  gridTemplateColumns: "1fr 180px 120px",
  gap: "10px",
  marginTop: "18px",
};

const input = {
  padding: "12px 14px",
  borderRadius: "14px",
  border: "1px solid rgba(0,0,0,0.12)",
  outline: "none",
  boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
  fontSize: "1rem",
};

const select = {
  padding: "12px 12px",
  borderRadius: "14px",
  border: "1px solid rgba(0,0,0,0.12)",
  background: "white",
  fontWeight: 700,
};

const addBtn = {
  border: "none",
  borderRadius: "14px",
  cursor: "pointer",
  fontWeight: 900,
  color: "white",
  background: "linear-gradient(135deg, #7b3b7e, #2dbed1)",
  boxShadow: "0 10px 22px rgba(0,0,0,0.14)",
};

const list = {
  marginTop: "18px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const empty = {
  textAlign: "center",
  padding: "20px",
  color: "rgba(0,0,0,0.55)",
  fontWeight: 700,
  background: "rgba(0,0,0,0.03)",
  borderRadius: "16px",
};

const card = {
  display: "flex",
  gap: "12px",
  alignItems: "flex-start",
  background: "rgba(255,255,255,0.95)",
  borderRadius: "18px",
  padding: "14px",
  boxShadow: "0 10px 22px rgba(0,0,0,0.10)",
  border: "1px solid rgba(0,0,0,0.06)",
};

const statusDot = {
  width: "14px",
  height: "14px",
  borderRadius: "999px",
  marginTop: "6px",
};

const goalText = {
  fontWeight: 900,
  color: "#2f2f2f",
};

const statusRow = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
  marginTop: "8px",
  flexWrap: "wrap",
};

const statusTag = {
  display: "inline-block",
  padding: "6px 10px",
  borderRadius: "999px",
  border: "2px solid",
  fontWeight: 900,
  fontSize: "0.85rem",
  background: "rgba(0,0,0,0.03)",
};

const selectSmall = {
  padding: "8px 10px",
  borderRadius: "12px",
  border: "1px solid rgba(0,0,0,0.12)",
  background: "white",
  fontWeight: 700,
};

const deleteBtn = {
  border: "none",
  background: "rgba(0,0,0,0.06)",
  borderRadius: "12px",
  width: "36px",
  height: "36px",
  cursor: "pointer",
  fontWeight: 900,
};
