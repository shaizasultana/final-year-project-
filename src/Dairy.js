import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Diary() {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString();

  const [pages, setPages] = useState([""]);
  const [currentPage, setCurrentPage] = useState(0);
  const [entry, setEntry] = useState("");

  useEffect(() => {
    const savedPages = JSON.parse(localStorage.getItem("diaryPages") || '[""]');
    setPages(savedPages);
    setEntry(savedPages[0] || "");
  }, []);

  
  const savePages = (updatedPages) => {
    setPages(updatedPages);
    localStorage.setItem("diaryPages", JSON.stringify(updatedPages));
  };

  const handleTextChange = (e) => {
    const value = e.target.value;
    setEntry(value);

    const updatedPages = [...pages];
    updatedPages[currentPage] = value;
    savePages(updatedPages);
  };

  const changePage = (pageIndex) => {
    if (pageIndex >= 0 && pageIndex < pages.length) {
      setCurrentPage(pageIndex);
      setEntry(pages[pageIndex]);
    }
  };

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
      setEntry(pages[currentPage + 1]);
    } else {
      const updatedPages = [...pages, ""];
      savePages(updatedPages);
      setCurrentPage(currentPage + 1);
      setEntry("");
    }
  };

  return (
    <div style={diaryPage}>
      <div style={bookWrap}>
        <h1 style={title}>My Diary</h1>
            
        <div style={paper}>
          <div style={paperTop}>
            <span>{today}</span>
            <span>Page {currentPage + 1}</span>
          </div>

          <div style={linedPage}>
            <textarea
              style={textArea}
              placeholder="Dear Diary..."
              value={entry}
              onChange={handleTextChange}
            />
          </div>

          <div style={navRow}>
            <button
              style={navButton}
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 0}
            >
              ⟵
            </button>

            <button style={navButton} onClick={nextPage}>
              ⟶
            </button>
          </div>
        </div>

        <button style={backButton} onClick={() => navigate("/Dashboard")}>
          Back
        </button>
      </div>
    </div>
  );
}
const diaryPage = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #a8bfa0, #dce8d4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingTop: "40px",
  fontFamily: "Georgia, serif",
};

const bookWrap = {
  width: "100%",
  maxWidth: "500px",
  textAlign: "center",
};

const title = {
  color: "#4f6b4f",
  marginBottom: "20px",
};

const paper = {
  background: "#fdfcf7",
  borderRadius: "10px",
  padding: "20px",
  minHeight: "700px", 
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  display: "flex",
  flexDirection: "column",
};

const paperTop = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
  fontSize: "0.9rem",
  color: "#666",
};

const linedPage = {
  flex: 1,
  background:
    "repeating-linear-gradient(to bottom, #fdfcf7 0px, #fdfcf7 28px, #cfdccf 29px)",
  borderRadius: "6px",
};

const textArea = {
  width: "100%",
  height: "100%",
  minHeight: "600px",
  border: "none",
  outline: "none",
  resize: "none",
  background: "transparent",
  fontSize: "1rem",
  lineHeight: "29px",
  padding: "10px",
  fontFamily: "Georgia, serif",
  color: "#333",
};

const navRow = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "10px",
};

const navButton = {
  background: "#8da58b",
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: "8px",
  cursor: "pointer",
};

const backButton = {
  marginTop: "15px",
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  background: "#d6e4d2",
  cursor: "pointer",
};