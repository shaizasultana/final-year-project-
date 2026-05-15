const express = require("express");
const router = express.Router();

router.get("/diary", (req, res) => {
  res.send("This is the diary page");
});