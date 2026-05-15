const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { username, email } = req.body;

  if (!username && !email) {
    return res.status(400).json({ message: "Username or email required" });
  }

  try {
    const [rows] = await db.promise().query(
      "SELECT userName, email FROM users WHERE userName = ? OR email = ?",
      [username, email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];

    return res.status(200).json({
      message: "Profile retrieved successfully",
      user: {
        username: user.userName,
        email: user.email
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});




module.exports = router;