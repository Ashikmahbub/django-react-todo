import React, { useState } from "react";
import axios from "axios";

function RegisterForm({ setShowRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/register/", {
        username,
        password,
      });
      alert("Registration successful! Please login.");
      setShowRegister(false);
    } catch {
      alert("Registration failed. Try another username.");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Register</h2>
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
        onClick={register}
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
        Register
      </button>
      <p style={{ marginTop: "10px" }}>
        Already have an account?{" "}
        <span
          onClick={() => setShowRegister(false)}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default RegisterForm;
