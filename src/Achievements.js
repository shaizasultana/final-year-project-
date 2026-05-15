import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Achievements() {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString();

  const [entry, setEntry] = useState("");
  const [notes, setNotes] = useState([]);
  const [confettiBursts, setConfettiBursts] = useState([]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("achievementsNotes") || "[]");
    setNotes(savedNotes);
  }, []);

  const saveNotes = (updatedNotes) => {
    setNotes(updatedNotes);
    localStorage.setItem("achievementsNotes", JSON.stringify(updatedNotes));
  };

  const fireConfetti = (x, y) => {
    const id = Date.now().toString();
    setConfettiBursts((prev) => [{ id, x, y }, ...prev]);

    setTimeout(() => {
      setConfettiBursts((prev) => prev.filter((b) => b.id !== id));
    }, 900);
  };

  const handleTextChange = (e) => {
    setEntry(e.target.value);
  };

  const saveTextareaAchievement = () => {
    if (!entry.trim()) return;

    const newNote = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      content: entry.trim(),
      done: false,
    };

    const updatedNotes = [newNote, ...notes];
    saveNotes(updatedNotes);
    setEntry("");
  };

  const markDone = (id, e) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, done: true } : note
    );
    saveNotes(updatedNotes);
    fireConfetti(e.clientX, e.clientY);
  };

  const removeAchievement = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    saveNotes(updatedNotes);
  };

  return (
    <div style={page}>
      <div style={container}>
        <div style={topRow}>
          <div>
            <h1 style={heading}>Weekly Achievements</h1>
            <p style={subtitle}>
              This space is for your small weekly wins. Goals are for the long term,
              but achievements are the little moments that still matter.
            </p>
          </div>

          <div style={dateBadge}>{today}</div>
        </div>

        <div style={card}>
          <p style={sectionTitle}>Add a weekly achievement</p>

          <div style={notepad}>
            <textarea
              style={textArea}
              placeholder="Examples: got out of bed, drank water, went outside, answered an email, brushed my teeth..."
              value={entry}
              onChange={handleTextChange}
            />

            <button style={saveBtn} onClick={saveTextareaAchievement}>
              Save achievement
            </button>
          </div>
        </div>

        <div style={card}>
          <p style={sectionTitle}>This week's wins</p>

          {notes.length === 0 ? (
            <div style={emptyState}>
              No weekly achievements added yet. Start with one small thing — it still counts.
            </div>
          ) : (
            <div style={notesList}>
              {notes.map((note) => (
                <div
                  key={note.id}
                  style={{
                    ...noteCard,
                    ...(note.done ? doneCard : pendingCard),
                  }}
                >
                  <div style={noteTopRow}>
                    <div style={noteDate}>{note.date}</div>

                    <div style={noteButtonGroup}>
                      <button
                        style={note.done ? doneBtnDisabled : doneBtn}
                        onClick={(e) => markDone(note.id, e)}
                        disabled={note.done}
                      >
                        {note.done ? "Done ✓" : "Done"}
                      </button>

                      <button
                        style={removeBtn}
                        onClick={() => removeAchievement(note.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div
                    style={{
                      ...noteText,
                      textDecoration: note.done ? "line-through" : "none",
                      opacity: note.done ? 0.75 : 1,
                    }}
                  >
                    {note.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={buttonRow}>
          <button style={backBtn} onClick={() => navigate("/Dashboard")}>
            Back to dashboard
          </button>
        </div>

        {confettiBursts.map((burst) => (
          <div
            key={burst.id}
            style={{
              ...confetti,
              left: burst.x - 20,
              top: burst.y - 20,
            }}
          >
            ✨ 🎉 💖
          </div>
        ))}
      </div>
    </div>
  );
}

const page = {
  minHeight: "100vh",
 background: " #bbbfff",
  padding: "30px",
  fontFamily: "Georgia, serif",
};

const container = {
  maxWidth: "950px",
  margin: "0 auto",
  background: "rgba(255, 255, 255, 0.16)",
  borderRadius: "24px",
  padding: "32px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.18)",
  backdropFilter: "blur(8px)",
};

const topRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "20px",
  flexWrap: "wrap",
  marginBottom: "25px",
};

const heading = {
  margin: 0,
  fontSize: "2.4rem",
  color: "#fbff0c",
};

const subtitle = {
  color: "#ffffff",
  maxWidth: "650px",
  lineHeight: 1.6,
  marginTop: "10px",
};

const dateBadge = {
  background: "rgba(255,255,255,0.9)",
  color: "#333",
  padding: "10px 16px",
  borderRadius: "999px",
  fontSize: "0.95rem",
  fontWeight: "bold",
};

const card = {
  background: "rgba(255,255,255,0.88)",
  borderRadius: "20px",
  padding: "22px",
  marginBottom: "20px",
  boxShadow: "0 12px 24px rgba(0,0,0,0.10)",
};

const sectionTitle = {
  fontWeight: "bold",
  fontSize: "1.2rem",
  color: "#7b3b7e",
  marginBottom: "15px",
};

const notepad = {
  backgroundColor: "rgba(233, 252, 255, 0.75)",
  borderRadius: "16px",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const saveBtn = {
  padding: "12px 18px",
  borderRadius: "14px",
  border: "none",
  cursor: "pointer",
  background: "#2dbed1",
  color: "white",
  fontSize: "1rem",
  boxShadow: "0 8px 18px rgba(0,0,0,0.15)",
};

const textArea = {
  width: "100%",
  minHeight: "140px",
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid rgba(0,0,0,0.1)",
  resize: "vertical",
  fontSize: "1rem",
  fontFamily: "inherit",
  boxSizing: "border-box",
};

const notesList = {
  display: "grid",
  gap: "14px",
};

const noteCard = {
  borderRadius: "16px",
  padding: "16px",
  boxShadow: "0 8px 16px rgba(0,0,0,0.06)",
};

const pendingCard = {
  background: "linear-gradient(135deg, #fff8cc, #fff2a8)",
  borderLeft: "6px solid #ffe956",
};

const doneCard = {
  background: "linear-gradient(135deg, #e7ffe7, #c8f7c8)",
  borderLeft: "6px solid #41b85a",
};

const noteTopRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  marginBottom: "8px",
  flexWrap: "wrap",
};

const noteButtonGroup = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
};

const noteDate = {
  fontSize: "0.9rem",
  color: "#7b3b7e",
  fontWeight: "bold",
};

const noteText = {
  color: "#333",
  lineHeight: 1.5,
};

const doneBtn = {
  padding: "8px 14px",
  borderRadius: "12px",
  border: "none",
  cursor: "pointer",
  background: "#f0d000",
  color: "#4d4300",
  fontWeight: "bold",
};

const doneBtnDisabled = {
  padding: "8px 14px",
  borderRadius: "12px",
  border: "none",
  background: "#41b85a",
  color: "white",
  fontWeight: "bold",
  cursor: "default",
};

const removeBtn = {
  padding: "8px 14px",
  borderRadius: "12px",
  border: "none",
  cursor: "pointer",
  background: "#ff6b6b",
  color: "white",
  fontWeight: "bold",
};

const emptyState = {
  padding: "18px",
  borderRadius: "16px",
  background: "rgba(123, 59, 126, 0.08)",
  color: "#5a4560",
};

const buttonRow = {
  display: "flex",
  justifyContent: "center",
  marginTop: "24px",
};

const backBtn = {
  padding: "12px 20px",
  borderRadius: "14px",
  border: "none",
  cursor: "pointer",
  background: "#ffef3e",
  color: "#333",
  fontWeight: "bold",
  boxShadow: "0 8px 18px rgba(0,0,0,0.15)",
};

const confetti = {
  position: "fixed",
  pointerEvents: "none",
  fontSize: "1.5rem",
  animation: "popFade 0.9s ease-out forwards",
  zIndex: 9999,
};