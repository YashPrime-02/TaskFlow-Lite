// src/controllers/task.controller.js
const Task = require("../models/Task");

/* =========================
   📥 GET TASKS
========================= */
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      where: { UserId: req.user.id },
      order: [["createdAt", "DESC"]],
    });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

/* =========================
   ➕ CREATE TASK
========================= */
exports.createTask = async (req, res, next) => {
  try {
    const { title } = req.body;

    const task = await Task.create({
      title,
      UserId: req.user.id,
    });

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

/* =========================
   ✏️ UPDATE TASK (SECURE)
========================= */
exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      where: {
        id,
        UserId: req.user.id, // 🔒 ownership
      },
    });

    if (!task)
      return res.status(404).json({ message: "Task not found" });

    await task.update(req.body);
    res.json(task);
  } catch (err) {
    next(err);
  }
};

/* =========================
   🔁 TOGGLE STATUS
========================= */
exports.toggleTaskStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      where: {
        id,
        UserId: req.user.id,
      },
    });

    if (!task)
      return res.status(404).json({ message: "Task not found" });

    const newStatus = task.status === "todo" ? "done" : "todo";

    await task.update({ status: newStatus });

    res.json(task);
  } catch (err) {
    next(err);
  }
};

/* =========================
   ❌ DELETE TASK (SECURE)
========================= */
exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      where: {
        id,
        UserId: req.user.id,
      },
    });

    if (!task)
      return res.status(404).json({ message: "Task not found" });

    await task.destroy();

    res.json({ message: "Task deleted" });
  } catch (err) {
    next(err);
  }
};