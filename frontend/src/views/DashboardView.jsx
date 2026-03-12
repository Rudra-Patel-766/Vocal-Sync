import React from "react";
import { Play, Activity, Clock, Smile, AlertCircle, Mic } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import StatCard from "../components/StatCard";
import { performanceData } from "../data/mockData";
import "./DashboardView.css";
 
const DashboardView = ({ setActivePage, isDarkMode, sessions }) => {
  if (!sessions || sessions.length === 0) {
    return (
      <div className="dashboard-empty">
        <div className="dashboard-empty__icon">
          <Activity size={40} />
        </div>
        <h2 className="dashboard-empty__title">Your Dashboard is Empty</h2>
        <p className="dashboard-empty__desc">
          Record your first speech in the Practice Room to unlock performance
          metrics, pacing trends, and AI analysis.
        </p>
        <button
          onClick={() => setActivePage("practice")}
          className="dashboard-empty__btn"
        >
          <Mic size={20} /> Start First Session
        </button>
      </div>
    );
  }
 
  const totalDuration = sessions.reduce((acc, curr) => acc + curr.duration, 0);
  const avgWpm = Math.round(
    sessions.reduce((acc, curr) => acc + curr.metrics.wpm, 0) / sessions.length
  );
  const avgConf = Math.round(
    sessions.reduce((acc, curr) => acc + curr.metrics.confidence, 0) /
      sessions.length
  );
  const totalFillers = sessions.reduce(
    (acc, curr) => acc + curr.metrics.fillers,
    0
  );
  const fillersPerMin =
    totalDuration > 0
      ? (totalFillers / (totalDuration / 60)).toFixed(1)
      : 0;
 
  const formatDuration = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m ${secs % 60}s`;
  };
 
  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard__header">
        <div>
          <h1 className="dashboard__title">Welcome back 👋</h1>
          <p className="dashboard__subtitle">
            You have recorded{" "}
            <span className="dashboard__highlight">{sessions.length}</span>{" "}
            practice sessions. Keep the momentum going!
          </p>
        </div>
        <button
          onClick={() => setActivePage("practice")}
          className="dashboard__start-btn"
        >
          <Play size={18} style={{ fill: "currentColor" }} />
          Start Practice
        </button>
      </div>
 
      {/* Stat Cards */}
      <div className="dashboard__stats">
        <StatCard
          title="Avg. Pace"
          value={avgWpm || "0"}
          subtext="WPM across sessions"
          icon={Activity}
          color="emerald"
          trend="up"
        />
        <StatCard
          title="Practice Time"
          value={formatDuration(totalDuration)}
          subtext="Total time recorded"
          icon={Clock}
          color="blue"
          trend="up"
        />
        <StatCard
          title="Confidence"
          value={`${avgConf || 0}%`}
          subtext="Average vocal tone"
          icon={Smile}
          color="violet"
          trend="up"
        />
        <StatCard
          title="Filler Words"
          value={fillersPerMin}
          subtext="Per minute avg"
          icon={AlertCircle}
          color="orange"
          trend="down"
        />
      </div>
 
      {/* Charts Row */}
      <div className="dashboard__charts">
        <div className="dashboard__chart-card">
          <div className="dashboard__chart-header">
            <h3 className="dashboard__chart-title">Performance Trend</h3>
          </div>
          <div className="dashboard__chart-body">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDarkMode ? "#334155" : "#e2e8f0"}
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  stroke="#64748b"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="#64748b"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? "#1e293b" : "#fff",
                    borderColor: isDarkMode ? "#334155" : "#e2e8f0",
                    borderRadius: "8px",
                    color: isDarkMode ? "#f8fafc" : "#1e293b",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#2563eb"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorScore)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
 
        {/* Recent sessions */}
        <div className="dashboard__sessions-card">
          <h3 className="dashboard__sessions-title">Recent Sessions</h3>
          <div className="dashboard__sessions-list">
            {[...sessions]
              .reverse()
              .map((session, i) => (
                <div
                  key={i}
                  onClick={() => setActivePage("analysis")}
                  className="dashboard__session-item"
                >
                  <div className="dashboard__session-top">
                    <div>
                      <h4 className="dashboard__session-name">{session.title}</h4>
                      <p className="dashboard__session-date">
                        <Clock size={10} /> {session.date}
                      </p>
                    </div>
                    <div
                      className={`dashboard__session-grade ${
                        session.grade.startsWith("A")
                          ? "dashboard__session-grade--green"
                          : "dashboard__session-grade--yellow"
                      }`}
                    >
                      {session.grade}
                    </div>
                  </div>
                  <div className="dashboard__session-bar-bg">
                    <div
                      className="dashboard__session-bar-fill"
                      style={{ width: `${session.score}%` }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default DashboardView;