import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Happy() {
  const navigate = useNavigate();

  const [tracks, setTracks] = useState([]);
  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(false);

  const [goalInput, setGoalInput] = useState("");
  const [goals, setGoals] = useState(() => {
    try {
      const saved = localStorage.getItem("happy_goals");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/music/happy")
      .then((res) => res.json())
      .then((data) => setTracks(data.tracks || []))
      .catch((err) => console.error(err));

    const cuteQueries = [
      "cozy romance",
      "feel good fiction",
      "uplifting romance",
      "cozy fantasy",
      "funny",
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

  useEffect(() => {
    localStorage.setItem("happy_goals", JSON.stringify(goals));
  }, [goals]);

  const addGoal = () => {
    const trimmed = goalInput.trim();
    if (!trimmed) return;

    setGoals((prev) => [
      { id: Date.now().toString(), text: trimmed, done: false },
      ...prev,
    ]);
    setGoalInput("");
  };

  const toggleGoal = (id) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, done: !g.done } : g))
    );
  };

  const deleteGoal = (id) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const addExample = (text) => {
    setGoals((prev) => [
      { id: Date.now().toString(), text, done: false },
      ...prev,
    ]);
  };

  const ActivitiesWheel = useMemo(
    () => [
        {
        name: "Sports",
        steps: "Any sports that you want to play or want to watch",
      },
      {
        name: "Dancing",
        steps: "Dancing to any song freestyle or learn a choreography from youtube",
      },
      {
        name: "Yoga",
        steps: "Practice yoga or stretching to relax your body and mind",
      },
      {
        name: "Drawing",
        steps: "Draw within the app or get your materials and draw/paint something that makes you happy",
      },
      {
        name: "Cooking",
        steps: "Try out a new recipe or bake something sweet to enjoy",
      },
      {
        name: "Reading",
        steps: "Read a book old or new or write about your day within the app or in a journal",
      },
      {
        name: "Friend",
        steps: "Reach out to a friend old or new",
      },
      {
        name: "Group",
        steps: "Find a local club or group that shares an interest of yours and join them for an event or meeting",
      },
      {
        name: "Activity",
        steps: "Go for a walk or bike ride around your neighborhood or a nearby park",
      },
      {
        name: "Movie",
        steps: "Watch a movie or tv show that you love or have been wanting to see instead of scrolling through social media",
      },
      {
        name: "Games",
        steps: "Play a board game with family or friends or play a video game that you enjoy",
      },
      {
        name: "Swimming",
        steps: "Go for a swim at a local pool or beach to cool off and have fun",
      },
      {
        name: "Gardening" ,
        steps: "Spend time in nature and plant some flowers or vegetables in a garden or pots",
      },
      {
        name: "Photos",
        steps: "Create a photo album or scrapbook of  memories and moments in your life",
      },
    ],
    []
  
  );

  const [spinning, setSpinning] = useState(false);
  const [chosen, setChosen] = useState(null);
  const [angle, setAngle] = useState(0);

  const segments = ActivitiesWheel.length;

  const wheelBackground = `conic-gradient(${ActivitiesWheel.map((_, index) => {
    const segmentAngle = 360 / segments;
    const start = index * segmentAngle;
    const end = start + segmentAngle;
    return `hsl(${start}, 70%, 72%) ${start}deg ${end}deg`;
  }).join(", ")})`;

  const spinWheel = () => {
    if (spinning) return;

    const randomIndex = Math.floor(Math.random() * segments);
    const segmentAngle = 360 / segments;
    const randomAngle =
      360 * 5 + (360 - randomIndex * segmentAngle - segmentAngle / 2);

    setSpinning(true);
    setAngle(randomAngle);

    setTimeout(() => {
      setChosen(ActivitiesWheel[randomIndex]);
      setSpinning(false);
    }, 5000);
  };

  return (
    <div style={page}>
      <div style={layout}>
        <div style={container}>
          <h1 style={title}>activities</h1>

          <div style={wheelWrap}>
            

            <div
              style={{
                ...wheel,
                background: wheelBackground,
                transform: `rotate(${angle}deg)`,
               transition: spinning
                    ? "transform 2.2s ease-out"
                             : "none",
              }}
            >
              {ActivitiesWheel.map((activity, index) => {
                const segmentAngle = 360 / segments;
                const labelAngle = index * segmentAngle + segmentAngle / 2;
                const radius = 160;

                return (
                  <div
                    key={activity.name}
                    style={{
                      ...segmentLabel,
                     transform: `
                      rotate(${labelAngle}deg)
                      translate(${radius}px)
                      rotate(90deg)
                    `,
                    }}
                  >
                    {activity.name}
                  </div>
                );
              })}
            </div>
          </div>
          <div style={transparentBox}>
  <p style={text}>
    Happiness does not always mean everything feels perfect. Depression and anxiety can still be present even when someone is in a good mood, especially through feelings such as being left behind, disconnected, overwhelmed, or unsure about the future.
  </p>
  <p style={text}>
    This page is designed to support positive emotions while still being honest that difficult feelings can exist underneath. The activities, planner, goals, and comforting reads aim to help users maintain happiness, build structure, and gently manage hidden anxiety or low mood.
  </p>
</div>
          <button style={goalsBtn} onClick={spinWheel}>
            {spinning ? "Spinning..." : "Spin the wheel"}
          </button>

          {chosen && (
            <div style={{ ...text, marginTop: 14 }}>
              <strong>{chosen.name}</strong>
              <br />
              {chosen.steps}
            </div>
          )}
        </div>

        <div style={container}>
          <h1 style={title}>planner</h1>
          <p style={text}>plan your day ahead with things you want to do</p>
          <p style={text}>It can be anything from chores to fun activities</p>
          <p style={text}>Make a to-do list for the day or write down some goals</p>
          <p style={text}>Set realistic and achievable targets for yourself</p>
          <p style={text}>click the button below to open the planner</p>
          <button style={goalsBtn} onClick={() => navigate("/Planner")}>
            Planner Page
          </button>
        </div>

        <div style={container}>
          <h1 style={title}>Comforting reads</h1>
          <p style={text}>Cute, cozy, feel-good books to lift your mood</p>

          {loadingBooks && <p style={text}>Loading cute books…</p>}

          {!loadingBooks && books.length === 0 && (
            <p style={text}>Try again later</p>
          )}

          <div style={scrollArea}>
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
        </div>

        <div style={container}>
          <h1 style={title}>goals for the future</h1>
          <p style={text}>Write down goals for your future self</p>
          <p style={text}>They don’t have to be done today — small steps count.</p>

          <button style={goalsBtn} onClick={() => navigate("/goals")}>
            Open Goals Page
          </button>

          <p style={{ ...text, marginTop: 14 }}>Examples:</p>
          <div style={listvibe}>
            <div style={stylee}>Bake a treat</div>
            <div style={stylee}>Write 3 things you’re grateful for</div>
            <div style={stylee}>Do an activity with friends</div>
            <div style={stylee}>Call or text a friend</div>
            <div style={stylee}>10 minute walk</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const page = {
  minHeight: "100vh",
  overflowY: "auto",
  background: "linear-gradient(180deg, #dff6f2, #edf9f6)",
  display: "flex",
  justifyContent: "center",
  fontFamily: "Georgia, serif",
  padding: "40px 30px",
  boxSizing: "border-box",
};

const layout = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "32px",
  width: "100%",
  maxWidth: "1200px",
  alignItems: "stretch",
};

const container = {
  background: "rgba(255, 255, 255, 0.82)",
  borderRadius: "26px",
  padding: "30px",
  boxShadow: "0 14px 30px rgba(79, 102, 96, 0.10)",
  boxSizing: "border-box",
  minHeight: "520px",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  border: "1px solid rgba(216, 243, 234, 0.9)",
};

const title = {
  textAlign: "center",
  color: "#4f6660",
  marginBottom: "12px",
};

const text = {
  textAlign: "center",
  fontSize: "1.05rem",
  color: "#5d6f69",
  marginBottom: "10px",
};

const scrollArea = {
  flex: 1,
  overflowY: "auto",
  paddingRight: "8px",
  marginTop: "6px",
};

const bookGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "12px",
};

const bookCard = {
  display: "flex",
  gap: "10px",
  padding: "10px",
  borderRadius: "14px",
  background: "white",
  textDecoration: "none",
  color: "inherit",
  boxShadow: "0 10px 18px rgba(0,0,0,0.08)",
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
  background: "#eee",
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
  color: "#1f5f3b",
};

const bookMeta = {
  fontSize: "0.85rem",
  color: "rgba(0,0,0,0.6)",
};

const goalsBtn = {
  width: "100%",
  border: "none",
  borderRadius: "16px",
  padding: "12px 16px",
  cursor: "pointer",
  fontWeight: 800,
  color: "white",
  background: "linear-gradient(135deg, #b97dbc, #95e8f3)",
  boxShadow: "0 10px 22px rgba(0,0,0,0.14)",
};

const stylee = {
  padding: "8px 14px",
  borderRadius: "999px",
  border: "1px solid rgba(31,95,59,0.25)",
  background: "rgba(255,255,255,0.85)",
  cursor: "pointer",
  fontWeight: 700,
  color: "#1f5f3b",
  boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
};

const listvibe = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  justifyContent: "center",
};

const wheelWrap = {
  position: "relative",
  width: "380px",
  height: "380px",
  margin: "0 auto 16px",
};

const wheel = {
  width: "380px",
  height: "380px",
  borderRadius: "50%",
  border: "12px solid rgb(159, 166, 255)",
  position: "relative",
  overflow: "hidden",
  boxShadow: "0 14px 28px rgba(0,0,0,0.15)",
};
const segmentLabel = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "70px",
  fontSize: "0.58rem",
  color: "#1f5f3b",
  fontWeight: "700",
  lineHeight: 1.1,
  textAlign: "center",
  transformOrigin: "0 50%",
  whiteSpace: "nowrap",
};


const segment = {
  position: "absolute",
  width: "50%",   
  height: "50%",
  top: 0,
  left: 0,
  transformOrigin: "100% 100%",
};  
const transparentBox = {
  background: "rgba(255, 255, 255, 0.55)",
  border: "1px solid rgba(216, 243, 234, 0.95)",
  borderRadius: "20px",
  padding: "16px",
  margin: "8px 0 16px",
  boxShadow: "0 8px 18px rgba(79, 102, 96, 0.08)",
};