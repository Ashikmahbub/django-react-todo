import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    let res = await axios.get("http://127.0.0.1:8000/api/tasks/");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title.trim()) return;
    await axios.post("http://127.0.0.1:8000/api/tasks/", { title, completed: false });
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

  return (
    <div
      style={{
        backgroundColor: "#121212",
        color: "#f5f5f5",
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "500px", margin: "auto", textAlign: "center" }}>
        <h1 style={{ color: "#00e676", marginBottom: "10px" }}>To-Do List ✅</h1>
        <p style={{ color: "#aaa", marginBottom: "30px" }}>
          Stay organized and productive — add tasks, mark them done, or clear them when complete.
        </p>

        <div style={{ display: "flex", marginBottom: "20px" }}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New Task..."
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px 0 0 8px",
              border: "1px solid #333",
              backgroundColor: "#1e1e1e",
              color: "#f5f5f5",
            }}
          />
          <button
            onClick={addTask}
            style={{
              padding: "10px 20px",
              borderRadius: "0 8px 8px 0",
              border: "none",
              backgroundColor: "#00e676",
              color: "#121212",
              fontWeight: "bold",
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
                padding: "12px 16px",
                marginBottom: "10px",
                borderRadius: "8px",
                backgroundColor: "#1e1e1e",
                boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
              }}
            >
              <span
                onClick={() => toggleTask(task)}
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "#888" : "#f5f5f5",
                  cursor: "pointer",
                  flex: 1,
                  textAlign: "left",
                }}
              >
                {task.title}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  marginLeft: "10px",
                  border: "none",
                  background: "transparent",
                  color: "#ff5252",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
