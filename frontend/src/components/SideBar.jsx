import React from "react";
import {
  Home,
  LayoutDashboard,
  History,
  Mic,
  BarChart2,
  Sun,
  Moon,
  User,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import "./Sidebar.css";
 
const Sidebar = ({
  activePage,
  setActivePage,
  isMobileOpen,
  setIsMobileOpen,
  isCollapsed,
  setIsCollapsed,
  isDarkMode,
  toggleTheme,
  isLoggedIn,
}) => {
  const menuItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "history", icon: History, label: "History" },
    { id: "practice", icon: Mic, label: "Practice Room" },
    { id: "analysis", icon: BarChart2, label: "Analysis" },
  ];
 
  return (
    <>
      {isMobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      <aside
        className={[
          "sidebar",
          isMobileOpen ? "sidebar--mobile-open" : "",
          isCollapsed ? "sidebar--collapsed" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/* Logo */}
        <div className={`sidebar__logo ${isCollapsed ? "sidebar__logo--collapsed" : ""}`}>
          <div className="sidebar__logo-icon">
            <Mic size={20} color="white" />
          </div>
          <span className={`sidebar__logo-text ${isCollapsed ? "sidebar__logo-text--hidden" : ""}`}>
            VocalSync
          </span>
        </div>
 
        {/* Nav */}
        <nav className="sidebar__nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActivePage(item.id);
                setIsMobileOpen(false);
              }}
              title={isCollapsed ? item.label : ""}
              className={[
                "sidebar__nav-btn",
                isCollapsed ? "sidebar__nav-btn--collapsed" : "",
                activePage === item.id ? "sidebar__nav-btn--active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <item.icon
                size={20}
                className={`sidebar__nav-icon ${activePage === item.id ? "sidebar__nav-icon--active" : ""}`}
              />
              <span className={`sidebar__nav-label ${isCollapsed ? "sidebar__nav-label--hidden" : ""}`}>
                {item.label}
              </span>
              {activePage === item.id && !isCollapsed && (
                <span className="sidebar__nav-dot" />
              )}
            </button>
          ))}
        </nav>
 
        {/* Bottom panel */}
        <div className="sidebar__bottom">
          <button
            onClick={toggleTheme}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className={`sidebar__theme-btn ${isCollapsed ? "sidebar__theme-btn--collapsed" : ""}`}
          >
            {isDarkMode ? (
              <Sun size={20} className="sidebar__sun-icon" />
            ) : (
              <Moon size={20} className="sidebar__moon-icon" />
            )}
            <span className={`sidebar__theme-label ${isCollapsed ? "sidebar__theme-label--hidden" : ""}`}>
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </span>
          </button>
 
          {isLoggedIn ? (
            <div className={`sidebar__user ${isCollapsed ? "sidebar__user--collapsed" : ""}`}>
              <div className="sidebar__avatar sidebar__avatar--logged">
                <User size={20} />
              </div>
              <div className={`sidebar__user-info ${isCollapsed ? "sidebar__user-info--hidden" : ""}`}>
                <p className="sidebar__user-name">Student User</p>
                <div className="sidebar__user-status">
                  <span className="sidebar__status-dot" />
                  <p className="sidebar__plan">Pro Plan</p>
                </div>
              </div>
            </div>
          ) : (
            <div
              onClick={() => {
                setActivePage("login");
                setIsMobileOpen(false);
              }}
              className={`sidebar__guest ${isCollapsed ? "sidebar__guest--collapsed" : ""}`}
            >
              <div className="sidebar__avatar sidebar__avatar--guest">
                <User size={20} />
              </div>
              <div className={`sidebar__guest-info ${isCollapsed ? "sidebar__guest-info--hidden" : ""}`}>
                <p className="sidebar__guest-label">Guest Mode</p>
                <p className="sidebar__guest-signin">Sign in to save</p>
              </div>
            </div>
          )}
        </div>
 
        {/* Collapse toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="sidebar__collapse-btn"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </aside>
    </>
  );
};
 
export default Sidebar;