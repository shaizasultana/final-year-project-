const express = require("express");
const router = express.Router();
const db = require("../db"); 

router.post("/", (req, res) => {
  req.session?.destroy(err => {
    if (err) return res.status(500).json({ error: "Could not logout" });
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  });
});

module.exports = router;
