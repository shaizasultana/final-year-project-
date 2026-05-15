import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DEFAULT_NOTES = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  text: "",
  done: false,
}));

export default function Planner() {
  const [entry, setEntry] = useState("");
  const [notes, setNotes] = useState(DEFAULT_NOTES);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEntry = localStorage.getItem("plannerEntry") || "";
    const savedNotes = localStorage.getItem("plannerNoteChecks");

    setEntry(savedEntry);

    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  const handleTextChange = (e) => {
    const value = e.target.value;
    setEntry(value);
    localStorage.setItem("plannerEntry", value);
  };

  const updateNotes = (updatedNotes) => {
    setNotes(updatedNotes);
    localStorage.setItem("plannerNoteChecks", JSON.stringify(updatedNotes));
  };

  const handleNoteTextChange = (id, value) => {
    const updated = notes.map((note) =>
      note.id === id ? { ...note, text: value } : note
    );
    updateNotes(updated);
  };

  const handleNoteCheck = (id) => {
    const updated = notes.map((note) =>
      note.id === id ? { ...note, done: !note.done } : note
    );
    updateNotes(updated);
  };

  return (
    <div style={page}>
      <div style={layout}>
        <div style={bookWrap}>
          <div style={linedPaper}>
            <p style={title}>My Planner</p>

            <textarea
              style={textArea}
              placeholder="Write your plans for the day..."
              value={entry}
              onChange={handleTextChange}
            />
          </div>

          <button style={backButton} onClick={() => navigate("/Happy")}>
            Back
          </button>
        </div>

        <div style={card}>
          <h2 style={title}>Note to self</h2>

          <div style={noteBox}>
            {notes.map((note) => (
              <div key={note.id} style={noteRow}>
                <input
                  type="checkbox"
                  checked={note.done}
                  onChange={() => handleNoteCheck(note.id)}
                  style={checkbox}
                />

                <input
                  type="text"
                  value={note.text}
                  onChange={(e) =>
                    handleNoteTextChange(note.id, e.target.value)
                  }
                  style={{
                    ...noteInput,
                    textDecoration: note.done ? "line-through" : "none",
                    opacity: note.done ? 0.65 : 1,
                  }}
                />
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
  background: "linear-gradient(135deg, #a0b6bf, #dce8d4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingTop: "40px",
  fontFamily: "Georgia, serif",
};

const layout = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "24px",
  width: "100%",
  maxWidth: "1200px",
  height: "720px",
  alignItems: "stretch",
};

const bookWrap = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

const linedPaper = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  background:
    "repeating-linear-gradient(to bottom, #fdfcf7 0px, #fdfcf7 28px, #cfdccf 29px)",
  borderRadius: "6px",
  padding: "12px",
  boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
  minHeight: 0,
};

const card = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  background: "linear-gradient(135deg, #ddfbc9, #dce8d4)",
  borderRadius: "20px",
  padding: "20px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  boxSizing: "border-box",
  minHeight: 0,
};

const title = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "#7b3b7e",
  marginBottom: "20px",
  marginTop: 0,
};

const textArea = {
  width: "100%",
  flex: 1,
  minHeight: 0,
  border: "none",
  outline: "none",
  resize: "none",
  background: "transparent",
  fontSize: "1rem",
  lineHeight: "29px",
  padding: "0 10px",        
  marginTop: "4px",         
  fontFamily: "Georgia, serif",
  color: "#333",
  boxSizing: "border-box",
};
const noteBox = {
  flex: 1,
  minHeight: 0,
  background:
    "repeating-linear-gradient(to bottom, rgba(255,255,255,0.45) 0px, rgba(255,255,255,0.45) 28px, #cfdccf 29px)",
  borderRadius: "14px",
  padding: "10px 12px",
  boxShadow: "inset 0 2px 6px rgba(0,0,0,0.05)",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const noteRow = {
  display: "grid",
  gridTemplateColumns: "24px 1fr",
  alignItems: "center",
  gap: "8px",
  minHeight: "29px",
};

const checkbox = {
  width: "16px",
  height: "16px",
  cursor: "pointer",
  accentColor:"#d476d9",
};

const noteInput = {
  width: "100%",
  border: "none",
  outline: "none",
  background: "transparent",
  fontSize: "0.95rem",
  lineHeight: "29px",
  fontFamily: "Georgia, serif",
  color: "#333",
  boxSizing: "border-box",
  padding: "0",
  marginTop: "2px",
};

const backButton = {
  marginTop: "15px",
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  background: "#d6e4d2",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};