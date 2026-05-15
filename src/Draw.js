import React, { useEffect, useRef, useState } from "react";

const templates = [
  { title: "Image1", url: "/image1.png" },
  { title: "Image2", url: "/image2.png" },
  { title: "Image3", url: "/image3.png" },
  { title: "Image4", url: "/image4.png" },
  { title: "Image5", url: "/image5.png" },
  { title: "Image6", url: "/image6.png" },
  { title: "Image7", url: "/image7.png" },
   { title: "Image8", url: "/image8.png" },
  { title: "Image9", url: "/image9.png" },


];

export default function Draw() {
  const [results] = useState(templates);
  const [selectedUrl, setSelectedUrl] = useState(templates[0].url);
  const [brushColor, setBrushColor] = useState("#b97dbc");
  const [brushSize, setBrushSize] = useState(8);
  const [mode, setMode] = useState("fill");

  const canvasRef = useRef(null);
  const bgImgRef = useRef(null);
  const drawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  const setupCanvasWithImage = (imgUrl) => {
    const canvas = canvasRef.current;
    if (!canvas || !imgUrl) return;

    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      bgImgRef.current = img;

      canvas.width = 760;
      canvas.height = 560;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = (canvas.width - w) / 2;
      const y = (canvas.height - h) / 2;

      ctx.drawImage(img, x, y, w, h);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    };

    img.src = imgUrl;
  };

  useEffect(() => {
    setupCanvasWithImage(selectedUrl);
  }, [selectedUrl]);

  const getCanvasPos = (evt) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
    const clientY = evt.touches ? evt.touches[0].clientY : evt.clientY;

    return {
      x: Math.floor(((clientX - rect.left) / rect.width) * canvas.width),
      y: Math.floor(((clientY - rect.top) / rect.height) * canvas.height),
    };
  };

  const hexToRgbArray = (hex) => {
    const bigint = parseInt(hex.replace("#", ""), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255, 255];
  };

  const colorsMatch = (a, b, tolerance = 35) => {
    return (
      Math.abs(a[0] - b[0]) <= tolerance &&
      Math.abs(a[1] - b[1]) <= tolerance &&
      Math.abs(a[2] - b[2]) <= tolerance
    );
  };

  const isBlackLine = (colour) => {
    return colour[0] < 80 && colour[1] < 80 && colour[2] < 80;
  };

  const floodFill = (x, y, fillColor) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const getIndex = (px, py) => (py * canvas.width + px) * 4;

    const startIndex = getIndex(x, y);
    const targetColor = [
      data[startIndex],
      data[startIndex + 1],
      data[startIndex + 2],
      data[startIndex + 3],
    ];

    if (isBlackLine(targetColor)) return;

    const fill = hexToRgbArray(fillColor);
    if (colorsMatch(targetColor, fill, 5)) return;

    const stack = [[x, y]];

    while (stack.length) {
      const [cx, cy] = stack.pop();

      if (cx < 0 || cy < 0 || cx >= canvas.width || cy >= canvas.height) continue;

      const idx = getIndex(cx, cy);

      const current = [
        data[idx],
        data[idx + 1],
        data[idx + 2],
        data[idx + 3],
      ];

      if (isBlackLine(current)) continue;
      if (!colorsMatch(current, targetColor, 35)) continue;

      data[idx] = fill[0];
      data[idx + 1] = fill[1];
      data[idx + 2] = fill[2];
      data[idx + 3] = 255;

      stack.push([cx + 1, cy]);
      stack.push([cx - 1, cy]);
      stack.push([cx, cy + 1]);
      stack.push([cx, cy - 1]);
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const startDraw = (e) => {
    e.preventDefault();

    if (mode === "fill") {
      const pos = getCanvasPos(e);
      floodFill(pos.x, pos.y, brushColor);
      return;
    }

    drawingRef.current = true;
    lastPosRef.current = getCanvasPos(e);
  };

  const endDraw = (e) => {
    if (e) e.preventDefault();
    drawingRef.current = false;
  };

  const drawStroke = (e) => {
    if (mode !== "brush") return;
    if (!drawingRef.current) return;

    e.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const pos = getCanvasPos(e);
    const last = lastPosRef.current;

    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;

    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    lastPosRef.current = pos;
  };

  const clearPainting = () => {
    setupCanvasWithImage(selectedUrl);
  };

  return (
    <div style={page}>
      <div style={container}>
        <h1 style={title}>Calm Colouring</h1>

        <p style={subtitle}>
          Choose a simple colouring template. Take your time, breathe slowly, and focus on one small area at a time.
        </p>

        <div style={calmBox}>
          <p style={calmText}>
            Try this: breathe in slowly, choose one colour, and colour one shape without rushing.
          </p>
        </div>

        <div style={thumbGrid}>
          {results.map((img) => (
            <button
              key={img.url}
              onClick={() => setSelectedUrl(img.url)}
              style={{
                ...thumbBtn,
                outline:
                  selectedUrl === img.url
                    ? "3px solid rgba(185,125,188,0.9)"
                    : "2px solid rgba(216,243,234,0.9)",
              }}
            >
              <img src={img.url} alt={img.title} style={thumbImg} />
            </button>
          ))}
        </div>

        <div style={toolRow}>
          <button
            onClick={() => setMode("fill")}
            style={mode === "fill" ? activeModeButton : modeButton}
          >
            Fill
          </button>

          <button
            onClick={() => setMode("brush")}
            style={mode === "brush" ? activeModeButton : modeButton}
          >
            Brush
          </button>

          <label style={toolLabel}>
            Colour
            <input
              type="color"
              value={brushColor}
              onChange={(e) => setBrushColor(e.target.value)}
              style={colorPicker}
            />
          </label>

          <label style={toolLabel}>
            Brush size
            <input
              type="range"
              min="2"
              max="24"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              style={range}
            />
            <span style={brushValue}>{brushSize}px</span>
          </label>

          <button onClick={clearPainting} style={smallButtonAlt}>
            Reset
          </button>
        </div>

        <div style={canvasWrap}>
          <canvas
            ref={canvasRef}
            style={canvasStyle}
            onMouseDown={startDraw}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
            onMouseMove={drawStroke}
            onTouchStart={startDraw}
            onTouchEnd={endDraw}
            onTouchMove={drawStroke}
          />
        </div>

        <p style={miniNote}>
          Fill mode colours inside closed spaces. Brush mode lets you draw freely.
        </p>
      </div>
    </div>
  );
}

const page = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #dff6f2, #fff7db)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Georgia, serif",
  padding: "30px",
  boxSizing: "border-box",
};

const container = {
  width: "100%",
  maxWidth: "1100px",
  background: "rgba(255,255,255,0.84)",
  borderRadius: "30px",
  padding: "30px",
  boxShadow: "0 18px 38px rgba(79,102,96,0.12)",
  border: "1px solid rgba(216,243,234,0.9)",
};

const title = {
  textAlign: "center",
  color: "#4f6660",
  marginBottom: "8px",
  fontSize: "2.2rem",
};

const subtitle = {
  textAlign: "center",
  color: "#5d6f69",
  marginBottom: "14px",
  lineHeight: 1.5,
};

const calmBox = {
  background: "rgba(223,246,242,0.55)",
  borderRadius: "18px",
  padding: "12px 16px",
  marginBottom: "16px",
  textAlign: "center",
};

const calmText = {
  margin: 0,
  color: "#4f6660",
  lineHeight: 1.5,
};

const thumbGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: "10px",
  marginBottom: "16px",
};

const thumbBtn = {
  padding: 0,
  borderRadius: "16px",
  background: "white",
  cursor: "pointer",
  overflow: "hidden",
  boxShadow: "0 8px 16px rgba(79,102,96,0.08)",
  border: "none",
};

const thumbImg = {
  width: "100%",
  height: "90px",
  objectFit: "cover",
  display: "block",
};

const toolRow = {
  display: "flex",
  gap: "14px",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  marginBottom: "16px",
  padding: "12px",
  borderRadius: "20px",
  background: "rgba(223,246,242,0.55)",
};

const toolLabel = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: "#4f6660",
  fontWeight: "600",
};

const modeButton = {
  padding: "10px 16px",
  borderRadius: "18px",
  border: "1px solid rgba(216,243,234,0.9)",
  background: "white",
  color: "#4f6660",
  cursor: "pointer",
  fontFamily: "Georgia, serif",
};

const activeModeButton = {
  padding: "10px 16px",
  borderRadius: "18px",
  border: "none",
  background: "linear-gradient(135deg, #b97dbc, #95e8f3)",
  color: "white",
  cursor: "pointer",
  fontFamily: "Georgia, serif",
  fontWeight: "bold",
};

const colorPicker = {
  width: "44px",
  height: "34px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
};

const range = {
  width: "150px",
  accentColor: "#b97dbc",
};

const brushValue = {
  color: "#4f6660",
  fontWeight: "600",
};

const smallButtonAlt = {
  padding: "10px 16px",
  borderRadius: "18px",
  border: "1px solid rgba(216,243,234,0.9)",
  fontSize: "0.95rem",
  color: "#4f6660",
  background: "rgba(255,255,255,0.95)",
  boxShadow: "0 8px 16px rgba(79,102,96,0.08)",
  cursor: "pointer",
  fontFamily: "Georgia, serif",
};

const canvasWrap = {
  display: "flex",
  justifyContent: "center",
  paddingTop: "8px",
};

const canvasStyle = {
  borderRadius: "20px",
  border: "1px solid rgba(216,243,234,0.9)",
  boxShadow: "0 16px 28px rgba(79,102,96,0.12)",
  touchAction: "none",
  background: "white",
  maxWidth: "100%",
  width: "760px",
};

const miniNote = {
  marginTop: "16px",
  textAlign: "center",
  color: "#5d6f69",
  fontSize: "0.95rem",
  lineHeight: 1.5,
};