import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const email = localStorage.getItem("email");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <header className="header">
      <div className="logo">TaskFlow</div>

      <div className="user-section">
        <div className="avatar" onClick={() => setOpen(!open)}>
          {email?.charAt(0).toUpperCase() || "U"}
        </div>

        {open && (
          <div className="dropdown">
            <p className="email">{email}</p>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}