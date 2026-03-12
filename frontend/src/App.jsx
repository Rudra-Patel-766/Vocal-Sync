import React, { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./components/Sidebar";
import HomeView from "./views/HomeView";
import DashboardView from "./views/DashboardView";
import PracticeView from "./views/PracticeView";
import AnalysisView from "./views/AnalysisView";
import LoginView from "./views/LoginView";
import "./App.css";
 
export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
 
  const handleSessionEnd = (sessionData) => {
    setSessions((prev) => [...prev, sessionData]);
    setActivePage("analysis");
  };
 
  const renderContent = () => {
    switch (activePage) {
      case "home":
        return <HomeView setActivePage={setActivePage} />;
      case "dashboard":
        return (
          <DashboardView
            setActivePage={setActivePage}
            isDarkMode={isDarkMode}
            sessions={sessions}
          />
        );
      case "practice":
        return (
          <PracticeView
            isDarkMode={isDarkMode}
            onSessionEnd={handleSessionEnd}
          />
        );
      case "analysis":
        return <AnalysisView isDarkMode={isDarkMode} sessions={sessions} />;
      case "history":
        return (
          <div className="placeholder-page">History Module Placeholder</div>
        );
      case "login":
        return (
          <LoginView
            setIsLoggedIn={setIsLoggedIn}
            setActivePage={setActivePage}
          />
        );
      default:
        return <HomeView setActivePage={setActivePage} />;
    }
  };
 
  return (
    <div
      className={`app-root ${isDarkMode ? "app-root--dark" : "app-root--light"}`}
    >
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        isLoggedIn={isLoggedIn}
      />
 
      <div
        className={`app-content ${
          isCollapsed ? "app-content--collapsed" : ""
        }`}
      >
        {/* Header */}
        <header className="app-header">
          <div className="app-header__left">
            <button
              className="app-header__menu-btn"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
            <div className="app-header__page-title">
              <h2>{activePage.replace("-", " ")}</h2>
            </div>
          </div>
 
          <div className="app-header__right">
            {isLoggedIn ? (
              <div
                className="app-header__avatar-wrapper"
                onClick={() => setIsLoggedIn(false)}
                title="Sign out"
              >
                <div className="app-header__avatar-inner">
                  <span className="app-header__avatar-letter">R</span>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setActivePage("login")}
                className="app-header__login-btn"
              >
                Login
              </button>
            )}
          </div>
        </header>
 
        {/* Main */}
        <main className="app-main">
          <div className="app-main__inner">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}