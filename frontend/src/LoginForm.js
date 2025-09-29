import React, { useState } from "react";
import axios from "axios";

function LoginForm({ setToken, setShowRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });
      setToken(res.data.access);
      localStorage.setItem("token", res.data.access);
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.access}`;
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Login</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: "100%", padding: "10px", margin: "5px 0" }}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: "10px", margin: "5px 0" }}
      />
      <button
        onClick={login}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
          backgroundColor: "skyblue",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Login
      </button>
      <p style={{ marginTop: "10px" }}>
        No account?{" "}
        <span
          onClick={() => setShowRegister(true)}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Register here
        </span>
      </p>
    </div>
  );
}

export default LoginForm;
