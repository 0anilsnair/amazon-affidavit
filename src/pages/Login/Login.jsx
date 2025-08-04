import React, { useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { loginWithUsernamePassword } from "../../common/services/authService";
import { analytics } from "../../config/firebase";
import { logEvent } from "firebase/analytics";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      const token = await loginWithUsernamePassword(username.trim(), password);
      localStorage.setItem('ack-tk', token);
      logEvent(analytics, "login", {
        action: "Login",
        time: new Date(),
      });
      navigate("/app/admin");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="admin-login-page">
      <header className="admin-login-header">🔒 Admin Login</header>

      <form className="admin-login-form" onSubmit={(e) => e?.preventDefault()}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        <button type="submit" className="login-btn" onClick={handleLogin}>
          Login
        </button>
      </form>
      <div className="alternative-login">
        <p>
          Not admin?{" "}
          <Link to="/" className="user-dashboard-link">
            Go to User Dashboard
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
