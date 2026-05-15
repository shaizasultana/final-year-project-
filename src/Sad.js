import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sad() {
  const navigate = useNavigate();

  const [tracks, setTracks] = useState([]);
  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/music/sad")
      .then((res) => res.json())
      .then((data) => setTracks(data.tracks || []))
      .catch((err) => console.error(err));

    const cuteQueries = [
      "cozy romance",
      "feel good fiction",
      "uplifting romance",
      "cozy fantasy",
      "comfort reads",
    ];

    const q = cuteQueries[Math.floor(Math.random() * cuteQueries.length)];

    setLoadingBooks(true);
    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=12`)
      .then((res) => res.json())
      .then((data) => {
        const cleaned = (data.docs || []).map((b) => ({
          key: b.key,
          title: b.title,
          author: (b.author_name && b.author_name[0]) || "Unknown",
          coverId: b.cover_i || null,
          url: b.key ? `https://openlibrary.org${b.key}` : null,
        }));
        setBooks(cleaned);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingBooks(false));
  }, []);

  return (
    <div style={page}>
      <div style={layout}>
      
        <div style={musicContainer}>
          <div style={scrollContainer}>
            <div style={transparentBox}>
  <p style={text}>
    Sadness can sometimes appear as low energy, loneliness, or feeling disconnected. 
    This page offers gentle activities to help users slow down, feel comforted, and take one small step at a time.
  </p>
  <p style={boldtext}>
   Listening to calming music, practising deep breathing, or taking a walk in a different environment, such as a park, may help improve emotional state and perspective.
  </p>
</div>

            {tracks.length === 0 && <p>Loading sad music...</p>}

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

        
        <div style={container}>
          <h1 style={title}>Comforting reads</h1>
          <p style={text}>Cute, cozy, feel-good books to lift your mood</p>

          {loadingBooks && <p style={text}>Loading books...</p>}

          {!loadingBooks && books.length === 0 && <p style={text}>Try again later</p>}

          <div style={bookGrid}>
            {books.map((b) => (
              <a
                key={b.key}
                href={b.url || "#"}
                target="_blank"
                rel="noreferrer"
                style={bookCard}
              >
                {b.coverId ? (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${b.coverId}-M.jpg`}
                    alt={b.title}
                    style={bookCover}
                  />
                ) : (
                  <div style={noCover}>No cover</div>
                )}

                <div style={bookInfo}>
                  <div style={bookTitle}>{b.title}</div>
                  <div style={bookMeta}>{b.author}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        
        <div style={container}>
          <h1 style={title}>colouring</h1>
          <p style={text}>Open the colouring page and draw over a calming template.</p>
         <p  style={text}> You’re not alone. Take things slowly — even small steps can help.
    Try one activity below and focus on your breathing.</p>

          <button onClick={() => navigate("/draw")} style={spinButton}>
            Open Colouring Page
          </button>
        </div>
        
        <div style={container}>
          <h1 style={title}>scalming puzzle</h1>
          <p style={text}>A slow, calming puzzle you can do at your own pace.</p>

          <div style={puzzleWrap}>
            <iframe
              title="Jigsaw Puzzle"
              src="https://www.jigsawexplorer.com/online-jigsaw-puzzle-player.html?puzzle_id=kinderdijk-windmills"
              style={puzzleIframe}
              loading="lazy"
            />
          </div>

          <p style={smallNote}>
            If the puzzle does not load inside the app, open it in a new tab:
          </p>

          <a
            href="https://www.jigsawexplorer.com/online-jigsaw-puzzle-player.html?puzzle_id=kinderdijk-windmills"
            target="_blank"
            rel="noreferrer"
            style={openLink}
          >
            Open puzzle
          </a>
        </div>
      </div>
    </div>
  );
}


const page = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #ffeaf3, #fff7fb)",
  display: "flex",
  justifyContent: "center",
  fontFamily: "Georgia, serif",
  padding: "42px 30px",
  boxSizing: "border-box",
};

const layout = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(360px, 1fr))",
  gap: "32px",
  width: "100%",
  maxWidth: "1180px",
};

const scrollContainer = {
  overflowY: "auto",
  flexGrow: 1,
  paddingRight: "10px",
};

const musicContainer = {
  background: "rgba(255,255,255,0.86)",
  borderRadius: "28px",
  padding: "30px",
  boxShadow: "0 16px 34px rgba(120,80,100,0.12)",
  height: "500px",
  display: "flex",
  flexDirection: "column",
  border: "1px solid rgba(255,210,230,0.9)",
};

const container = {
  background: "rgba(255,255,255,0.86)",
  borderRadius: "28px",
  padding: "30px",
  boxShadow: "0 16px 34px rgba(120,80,100,0.12)",
  height: "500px",
  display: "flex",
  flexDirection: "column",
  border: "1px solid rgba(255,210,230,0.9)",
};
const title = {
  textAlign: "center",
  color: "#705267",
  marginBottom: "16px",
  fontSize: "2rem",
};

const text = {
  textAlign: "center",
  color: "#5f5660",
  marginBottom: "14px",
  lineHeight: 1.55,
};

const card = {
  background: "rgba(255,235,245,0.9)",
  borderRadius: "18px",
  padding: "16px",
  marginBottom: "20px",
  boxShadow: "0 8px 18px rgba(120,80,100,0.08)",
};

const image = {
  width: "100%",
  borderRadius: "14px",
  marginBottom: "10px",
};

const spinButton = {
  width: "240px",
  padding: "13px",
  borderRadius: "18px",
  border: "none",
  fontSize: "1rem",
  color: "white",
  background: "linear-gradient(135deg, #b97dbc, #95e8f3)",
  boxShadow: "0 10px 22px rgba(120,80,100,0.16)",
  display: "block",
  margin: "18px auto 0",
  cursor: "pointer",
};

const bookGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "14px",
  overflowY: "auto",
};

const bookCard = {
  display: "flex",
  gap: "10px",
  padding: "12px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.95)",
  textDecoration: "none",
  color: "inherit",
  boxShadow: "0 8px 16px rgba(120,80,100,0.08)",
};

const bookCover = {
  width: "64px",
  height: "96px",
  borderRadius: "10px",
  objectFit: "cover",
};

const noCover = {
  width: "64px",
  height: "96px",
  borderRadius: "10px",
  background: "#f7edf3",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.8rem",
};

const bookInfo = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const bookTitle = {
  fontWeight: "800",
  color: "#705267",
};

const bookMeta = {
  fontSize: "0.85rem",
  color: "rgba(0,0,0,0.6)",
};

const puzzleWrap = {
  width: "100%",
  height: "300px",
  borderRadius: "18px",
  overflow: "hidden",
  boxShadow: "0 10px 22px rgba(120,80,100,0.12)",
  background: "white",
};

const puzzleIframe = {
  width: "100%",
  height: "100%",
  border: 0,
};

const smallNote = {
  textAlign: "center",
  marginTop: "12px",
  marginBottom: "8px",
  color: "rgba(95,86,96,0.75)",
  fontSize: "0.9rem",
};

const openLink = {
  display: "block",
  textAlign: "center",
  fontWeight: 800,
  color: "#705267",
  textDecoration: "none",
  padding: "10px",
  borderRadius: "14px",
  background: "rgba(255,235,245,0.85)",
};
const transparentBox = {
  background: "rgba(255, 255, 255, 0.55)",
  border: "1px solid rgba(255,210,230,0.95)",
  borderRadius: "20px",
  padding: "14px",
  margin: "8px 0 18px",
  boxShadow: "0 8px 18px rgba(120,80,100,0.08)",
};
const boldtext = {
  fontWeight: "bold",
  color: "#5f5660",
  textAlign: "center",
  lineHeight: 1.55,
};