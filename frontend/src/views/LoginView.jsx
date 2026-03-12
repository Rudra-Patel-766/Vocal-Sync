import React from "react";
import { Mic } from "lucide-react";
import "./LoginView.css";
 
const LoginView = ({ setIsLoggedIn, setActivePage }) => {
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setActivePage("home");
  };
 
  return (
    <div className="login">
      <div className="login__card">
        <div className="login__header">
          <div className="login__logo">
            <Mic size={24} color="white" />
          </div>
          <h2 className="login__title">Welcome Back</h2>
          <p className="login__subtitle">Sign in to continue to VocalSync</p>
        </div>
 
        <form onSubmit={handleLogin} className="login__form">
          <div className="login__field">
            <label className="login__label">Email</label>
            <input
              type="email"
              required
              className="login__input"
              placeholder="student@example.com"
            />
          </div>
          <div className="login__field">
            <label className="login__label">Password</label>
            <input
              type="password"
              required
              className="login__input"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="login__btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
 
export default LoginView;