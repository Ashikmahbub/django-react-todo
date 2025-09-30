import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegistrationForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchTasks();
    }
  }, [token]);

  const fetchTasks = async () => {
    let res = await axios.get("http://127.0.0.1:8000/api/tasks/");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title.trim()) return;
    await axios.post("http://127.0.0.1:8000/api/tasks/", {
      title,
      completed: false,
    });
    setTitle("");
    fetchTasks();
  };

  const toggleTask = async (task) => {
    await axios.put(`http://127.0.0.1:8000/api/tasks/${task.id}/`, {
      ...task,
      completed: !task.completed,
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`);
    fetchTasks();
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      {!token ? (
        showRegister ? (
          <RegisterForm setShowRegister={setShowRegister} />
        ) : (
          <LoginForm setToken={setToken} setShowRegister={setShowRegister} />
        )
      ) : (
        <div>
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
            Welcome to your Task List ✅
          </h1>
          <div style={{ display: "flex", marginBottom: "20px" }}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="New Task"
              style={{
                flex: 1,
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px 0 0 4px",
              }}
            />
            <button
              onClick={addTask}
              style={{
                padding: "10px 20px",
                border: "none",
                backgroundColor: "skyblue",
                color: "white",
                borderRadius: "0 4px 4px 0",
                cursor: "pointer",
              }}
            >
              Add
            </button>
          </div>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {tasks.map((task) => (
              <li
                key={task.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  borderBottom: "1px solid #eee",
                }}
              >
                <span
                  onClick={() => toggleTask(task)}
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    cursor: "pointer",
                  }}
                >
                  {task.title}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "red",
                    cursor: "pointer",
                  }}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={logout}
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "10px",
              backgroundColor: "gray",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      )}
		 {/* Admin Panel Link */}
      <a
        href="http://127.0.0.1:8000/admin/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          borderRadius: "5px",
          textDecoration: "none",
        }}
      >
        Go to Admin Panel
      </a>


    </div>
  );
}

export default App;
