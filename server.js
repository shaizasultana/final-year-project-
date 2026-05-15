require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const pyroute = require("./routes_for_app/pyroute");

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: false
}));

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/phq9", pyroute);

app.use("/register", require("./routes_for_app/register"));
app.use("/login", require("./routes_for_app/login"));
app.use("/mood", require("./routes_for_app/mood"));
app.use("/api/music", require("./routes_for_app/music"));
app.use("/api/activities", require("./routes_for_app/activities"));


app.get("/api/music/Fear", (req, res) => {
  res.json({ message: "Fear route is working" });
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});