// Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    DateOfBirth: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        
        if (data.errors) {
          setErrors(data.errors.map((err) => err.msg));
        } else if (data.error) {
          setErrors([data.error]);
        }
      } else {
        alert(data.message); 
        localStorage.setItem("currentUser", form.userName);
        navigate("/Survey");
      }
    } catch (err) {
      console.error(err);
      setErrors(["Server error. Please try again later."]);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontFamily: "Georgia, serif",
        background: "linear-gradient(to bottom right, #32393eff, #6898b6ff)",
      }}
    >
      <h2 style={{ color: "#ffef3eff" }}>signup</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: "10px",
          marginTop: "20px",
        }}
      >
       <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="userName"
          placeholder="Username"
          value={form.userName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="DateOfBirth"
          placeholder="Date of Birth"
          value={form.DateOfBirth}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#afede1ff",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Register
        </button>
      </form>

      {errors.length > 0 && (
        <div style={{ marginTop: "20px", color: "red" }}>
          {errors.map((err, idx) => (
            <div key={idx}>{err}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Register;
