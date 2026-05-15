const express = require("express");
const router = express.Router();

router.get("/planner", (req, res) => {
  res.json({ message: "planner" });
});

module.exports = router;
