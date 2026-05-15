const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");

router.post("/", (req, res) => {
  const { answers } = req.body;

  if (!answers || !Array.isArray(answers) || answers.length !== 9) {
    return res.status(400).json({ message: "Invalid survey answers." });
  }

  const python = spawn(
    "C:\\Users\\Shaiz\\anaconda3\\python.exe",
    ["./predict_cluster.py", JSON.stringify(answers)]
  );

  let result = "";
  let errorOutput = "";

  python.stdout.on("data", (data) => {
    result += data.toString();
  });

  python.stderr.on("data", (data) => {
    errorOutput += data.toString();
  });

  python.on("error", (err) => {
    console.error("Spawn error:", err);
    return res.status(500).json({ message: err.message || "Failed to start Python." });
  });

  python.on("close", (code) => {
    if (code !== 0) {
      console.error("Python error:", errorOutput);
      return res.status(500).json({ message: errorOutput || "Python script failed." });
    }

    try {
      const parsed = JSON.parse(result);
      res.json(parsed);
    } catch (err) {
      console.error("Parse error:", err);
      res.status(500).json({ message: "Failed to read Python output." });
    }
  });
});

module.exports = router;