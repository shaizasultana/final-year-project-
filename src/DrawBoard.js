import React, { useEffect, useRef, useState } from "react";

export default function DrawBoard() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState("#1f5f3b");
  const [brushSize, setBrushSize] = useState(10);
  const [mode, setMode] = useState("brush"); 

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    ctx.scale(dpr, dpr);

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;

    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    ctx.lineWidth = brushSize;

    if (mode === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "rgba(0,0,0,1)";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = brushColor;
    }
  }, [brushColor, brushSize, mode]);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    if (e.touches && e.touches[0]) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const ctx = ctxRef.current;
    if (!ctx) return;

    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing) return;

    const ctx = ctxRef.current;
    if (!ctx) return;

    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (e) => {
    e.preventDefault();
    const ctx = ctxRef.current;
    if (!ctx) return;

    ctx.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.save();
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.restore();
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "my_drawing.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div style={page}>
      <div style={panel}>
        <h1 style={title}>🎨 Colouring / Drawing Board</h1>
        <p style={text}>Pick a brush, colour, and size — then draw freely.</p>

        <div style={toolbar}>
          <button
            onClick={() => setMode("brush")}
            style={{
              ...toolBtn,
              border: mode === "brush" ? "2px solid #2dbed1" : toolBtn.border,
            }}
          >
            Brush
          </button>

          <button
            onClick={() => setMode("eraser")}
            style={{
              ...toolBtn,
              border: mode === "eraser" ? "2px solid #2dbed1" : toolBtn.border,
            }}
          >
            Eraser
          </button>

          <div style={toolGroup}>
            <span style={label}>Colour</span>
            <input
              type="color"
              value={brushColor}
              onChange={(e) => setBrushColor(e.target.value)}
              style={colorPick}
              disabled={mode === "eraser"}
              title={mode === "eraser" ? "Switch to Brush to pick colour" : "Pick a colour"}
            />
          </div>

          <div style={toolGroup}>
            <span style={label}>Size</span>
            <input
              type="range"
              min="2"
              max="40"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              style={range}
            />
            <span style={sizeNum}>{brushSize}</span>
          </div>

          <button onClick={clearCanvas} style={toolBtnAlt}>
            Clear
          </button>

          <button onClick={saveImage} style={saveBtn}>
            Save
          </button>
        </div>

        <div style={canvasWrap}>
          <canvas
            ref={canvasRef}
            style={canvasStyle}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>

        <p style={hint}>
          Tip: Use eraser to gently rub out. Save downloads a PNG to your device.
        </p>
      </div>
    </div>
  );
}

const page = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #dcf0aa, #ffb0fc)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "26px",
  fontFamily: "Georgia, serif",
};

const panel = {
  width: "min(1100px, 96vw)",
  background: "rgba(255,255,255,0.92)",
  borderRadius: "22px",
  padding: "22px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
};

const title = {
  textAlign: "center",
  color: "#1f5f3b",
  margin: "0 0 10px",
};

const text = {
  textAlign: "center",
  color: "#2f2f2f",
  margin: "0 0 16px",
};

const toolbar = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "14px",
};

const toolBtn = {
  padding: "10px 14px",
  borderRadius: "14px",
  border: "1px solid rgba(0,0,0,0.12)",
  background: "white",
  cursor: "pointer",
  fontSize: "0.95rem",
};

const toolBtnAlt = {
  ...toolBtn,
  background: "rgba(255,255,255,0.9)",
};

const saveBtn = {
  padding: "10px 14px",
  borderRadius: "14px",
  border: "none",
  color: "white",
  cursor: "pointer",
  background: "linear-gradient(135deg, #7b3b7e, #2dbed1)",
  boxShadow: "0 10px 18px rgba(0,0,0,0.14)",
  fontSize: "0.95rem",
};

const toolGroup = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "8px 10px",
  borderRadius: "14px",
  border: "1px solid rgba(0,0,0,0.10)",
  background: "rgba(255,255,255,0.9)",
};

const label = {
  fontWeight: "700",
  color: "#1f5f3b",
  fontSize: "0.9rem",
};

const colorPick = {
  width: "42px",
  height: "32px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
};

const range = {
  width: "160px",
};

const sizeNum = {
  fontWeight: "800",
  color: "#2f2f2f",
  minWidth: "26px",
  textAlign: "center",
};

const canvasWrap = {
  borderRadius: "18px",
  overflow: "hidden",
  border: "1px solid rgba(0,0,0,0.10)",
  boxShadow: "0 14px 26px rgba(0,0,0,0.10)",
  background: "white",
};

const canvasStyle = {
  width: "100%",
  height: "520px",
  display: "block",
  touchAction: "none",
  cursor: "crosshair",
};

const hint = {
  textAlign: "center",
  marginTop: "12px",
  color: "rgba(0,0,0,0.65)",
  fontSize: "0.95rem",
};
