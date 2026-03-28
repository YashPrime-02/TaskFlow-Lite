import { useEffect, useState } from "react";
import API from "../api/axios";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const toggleTask = async (id) => {
    try {
      await API.patch(`/tasks/${id}/toggle`);
      fetchTasks();
    } catch {
      toast.error("Update failed");
    }
  };

  const addTask = async () => {
    if (!title.trim()) return toast.error("Task cannot be empty");

    try {
      await API.post("/tasks", { title });
      toast.success("Task added 🚀");
      setTitle("");
      fetchTasks();
    } catch {
      toast.error("Failed to add task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      toast.success("Task deleted");
      fetchTasks();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <>
      <Header />

      <div className="container">
        <h2 className="title">Task List</h2>

        {/* INPUT CARD */}
        <div className="card input-card">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
          />
          <button onClick={addTask}>Add</button>
        </div>

        {/* LOADING */}
        {loading && <p className="muted">Loading tasks...</p>}

        {/* EMPTY STATE */}
        {!loading && tasks.length === 0 && (
          <p className="muted">No tasks yet. Add one 🚀</p>
        )}

        {/* TASK GRID */}
        <div className="task-grid">
          <AnimatePresence>
            {tasks.map((t) => (
              <motion.div
                key={t.id}
                className={`task-card ${t.status}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="task-left">
                  <input
                    type="checkbox"
                    checked={t.status === "done"}
                    onChange={() => toggleTask(t.id)}
                  />

                  <span className={t.status === "done" ? "completed" : ""}>
                    {t.title}
                  </span>
                </div>

                <button onClick={() => deleteTask(t.id)}>Delete</button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </>
  );
}
