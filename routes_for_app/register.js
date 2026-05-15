const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { firstName, lastName, userName, email, DateOfBirth, password, confirmPassword } = req.body;

  if (!firstName || !lastName || !userName || !email || !DateOfBirth || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // 🔐 Password strength validation
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{12,}$/;

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message: "Password must be at least 12 characters, contain one capital letter and one special character"
    });
  }

  try {
    const [existing] = await db.promise().query(
      "SELECT * FROM users WHERE userName = ? OR email = ?",
      [userName, email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Username or email already exists" });
    }

    const hash = await bcrypt.hash(password, 12);

    await db.promise().query(
      "INSERT INTO users (firstName, lastName, userName, email, DateOfBirth, password_hash) VALUES (?, ?, ?, ?, ?, ?)",
      [firstName, lastName, userName, email, DateOfBirth, hash]
    );

    return res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
