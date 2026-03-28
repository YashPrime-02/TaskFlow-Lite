
# 🚀 TaskFlow — Full Stack Dockerized Task Manager

A production-ready full stack task management application built with modern technologies and deployed using a multi-container Docker architecture.

---

## 📌 Overview

TaskFlow is a clean, responsive, and secure task manager that demonstrates:

- Real-world backend architecture (JWT + protected APIs)
- Modern frontend UX (React + animations)
- Production deployment mindset (Docker + Nginx + PostgreSQL)

---

## 🧱 Tech Stack

### 🖥 Frontend
- React (Vite)
- Axios
- Framer Motion (animations)
- React Hot Toast (notifications)
- Nginx (production serving + reverse proxy)

### ⚙️ Backend
- Node.js
- Express.js
- Sequelize ORM
- JWT Authentication

### 🗄 Database
- PostgreSQL (with persistent volumes)

### 🐳 DevOps / Deployment
- Docker
- Docker Compose (multi-container setup)
- Nginx reverse proxy

---

## ✨ Features

### 🔐 Authentication
- User signup & login
- JWT-based secure authentication
- Protected routes

### 📋 Task Management
- Create tasks
- Delete tasks
- Toggle completion (todo ↔ done)
- User-specific data isolation

### 🎨 UI/UX
- Responsive design (mobile + desktop)
- Smooth animations (Framer Motion)
- Toast notifications (success/error feedback)
- Clean SaaS-style UI

### ⚡ Architecture
- Full Dockerized stack
- Nginx reverse proxy for API routing
- Persistent database using Docker volumes
- Scalable folder structure

---

## 🧠 System Architecture

Browser → Nginx (Frontend) → Node API → PostgreSQL

---

## 🐳 Run Locally (Docker)

git clone https://github.com/YashPrime-02/taskflow-lite.git
cd taskflow-lite
docker-compose up --build

---

## 🌐 Access

Frontend → http://localhost:3000  
Backend API → http://localhost:5000  

---

## 📁 Project Structure

taskflow/
├── client/
├── server/
├── docker-compose.yml

---


---

## 🚀 Highlights

- Production-ready architecture (Docker + Nginx)
- Secure authentication (JWT)
- REST API design (CRUD + PATCH)
- Responsive UI with animations
- Containerized full stack

---

## 👨‍💻 Author

Yash Mishra  
https://github.com/YashPrime-02
