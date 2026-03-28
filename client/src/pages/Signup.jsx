// src/pages/Signup.jsx
import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSignup = async () => {
    await API.post("/auth/signup", form);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Signup</h2>
        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button onClick={handleSignup}>Signup</button>
      </div>
    </div>
  );
}