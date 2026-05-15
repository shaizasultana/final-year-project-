import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
     const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify({ username, password }), 
    });
      const data = await res.json();
      alert(data.message || JSON.stringify(data));
      if (data.message === "Login successful") {
        window.location.href = "/Survey"; 
      }
    };
    return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Login</h1>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;