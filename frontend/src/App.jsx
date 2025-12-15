import { useEffect, useState } from "react";

const API_BASE = "http://127.0.0.1:8000/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // 🔹 Fetch all tasks
  useEffect(() => {
    fetch(`${API_BASE}/tasks/`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);

  // 🔹 Add task
  const addTask = async () => {
    if (!title.trim()) return;

    const res = await fetch(`${API_BASE}/tasks/add/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    setTitle("");
  };

  // 🔹 Mark complete
  const completeTask = async (id) => {
    await fetch(`${API_BASE}/tasks/${id}/complete/`, {
      method: "PUT",
    });

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  };

  // 🔹 Delete task
  const deleteTask = async (id) => {
    await fetch(`${API_BASE}/tasks/${id}/delete/`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  // 🔹 Progress calculation
  const completedCount = tasks.filter((t) => t.completed).length;
  const progress =
    tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>📝 Task Board</h2>

        {/* Add Task */}
        <div style={styles.inputRow}>
          <input
            type="text"
            placeholder="Enter a task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />
          <button onClick={addTask} style={styles.addBtn}>
            Add
          </button>
        </div>

        {/* Progress */}
        <div style={styles.progressBox}>
          <p>Progress: {progress}%</p>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* Task List */}
        <ul style={styles.list}>
          {tasks.map((task) => (
            <li key={task.id} style={styles.listItem}>
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.title}
              </span>

              <div>
                {!task.completed && (
                  <button
                    onClick={() => completeTask(task.id)}
                    style={styles.completeBtn}
                  >
                    ✔
                  </button>
                )}
                <button
                  onClick={() => deleteTask(task.id)}
                  style={styles.deleteBtn}
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Unique Feature */}
        {progress === 100 && tasks.length > 0 && (
          <p style={styles.celebrate}>🎉 All tasks completed! Great job!</p>
        )}
      </div>
    </div>
  );
}

export default App;

// 🔹 Simple inline styles (clean & fast)
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f4f4",
  },
  card: {
    width: "350px",
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "15px",
  },
  inputRow: {
    display: "flex",
    gap: "5px",
  },
  input: {
    flex: 1,
    padding: "8px",
  },
  addBtn: {
    padding: "8px 12px",
    cursor: "pointer",
  },
  progressBox: {
    marginTop: "15px",
  },
  progressBar: {
    height: "8px",
    background: "#ddd",
    borderRadius: "5px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "green",
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "15px",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  completeBtn: {
    marginRight: "5px",
    cursor: "pointer",
  },
  deleteBtn: {
    cursor: "pointer",
  },
  celebrate: {
    textAlign: "center",
    color: "green",
    marginTop: "10px",
  },
};
