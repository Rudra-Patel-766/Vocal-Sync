import React, { useState } from "react";
import { BarChart2, Play, Sparkles, Loader2, MessageSquare } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { callGeminiAPI } from "../api/gemini";
import "./AnalysisView.css";
 
const AnalysisView = ({ isDarkMode, sessions }) => {
  const [aiFeedback, setAiFeedback] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
 
  if (!sessions || sessions.length === 0) {
    return (
      <div className="analysis-empty">
        <div className="analysis-empty__icon">
          <BarChart2 size={40} />
        </div>
        <h2 className="analysis-empty__title">No Sessions to Analyze</h2>
        <p className="analysis-empty__desc">
          You need to complete at least one practice session before the AI can
          generate a detailed analysis report.
        </p>
      </div>
    );
  }
 
  const latestSession = sessions[sessions.length - 1];
  const mockTranscript = latestSession.transcript;
 
  const generateAIAnalysis = async () => {
    setIsGenerating(true);
    const sysPrompt =
      "You are an expert, encouraging public speaking coach. Review the user's transcript. Give a brief analysis of their strengths, point out their specific filler words from the text, and give 2 concrete tips for improvement. Format with clear headings and bullet points.";
    const userPrompt = `Analyze this speech transcript: "${mockTranscript}"`;
    const result = await callGeminiAPI(userPrompt, sysPrompt);
    setAiFeedback(result);
    setIsGenerating(false);
  };
 
  return (
    <div className="analysis">
      {/* Header */}
      <div className="analysis__header">
        <div>
          <h2 className="analysis__title">Session Analysis</h2>
          <p className="analysis__subtitle">
            Analysis for "{latestSession.title}" • {latestSession.date}
          </p>
        </div>
      </div>
 
      <div className="analysis__grid">
        {/* Left column */}
        <div className="analysis__left">
          {/* Video placeholder */}
          <div className="analysis__video-wrapper">
            <div className="analysis__video-play">
              <Play size={64} className="analysis__play-icon" />
            </div>
            <div className="analysis__video-progress">
              <div className="analysis__video-bar">
                <div className="analysis__video-thumb" />
              </div>
            </div>
          </div>
 
          {/* AI Coach */}
          <div className="analysis__ai-box">
            <div className="analysis__ai-header">
              <div className="analysis__ai-title">
                <Sparkles size={24} /> AI Coach Deep Analysis
              </div>
              {!aiFeedback && (
                <button
                  onClick={generateAIAnalysis}
                  disabled={isGenerating}
                  className="analysis__ai-btn"
                >
                  {isGenerating ? (
                    <Loader2 size={16} className="analysis__spin" />
                  ) : (
                    <MessageSquare size={16} />
                  )}
                  {isGenerating ? "Analyzing Transcript..." : "Generate AI Report ✨"}
                </button>
              )}
            </div>
 
            <div className="analysis__ai-body">
              {aiFeedback ? (
                <div className="analysis__ai-result">{aiFeedback}</div>
              ) : (
                <div className="analysis__ai-preview">
                  <p className="analysis__ai-preview-label">
                    Transcript to analyze:
                  </p>
                  <p className="analysis__ai-preview-text">
                    "{mockTranscript}"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
 
        {/* Right column */}
        <div className="analysis__right">
          {/* Score ring */}
          <div className="analysis__score-card">
            <div className="analysis__score-ring-wrapper">
              <svg
                className="analysis__score-ring-svg"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  strokeDasharray="290"
                  strokeDashoffset={`${
                    290 - (290 * latestSession.score) / 100
                  }`}
                  strokeLinecap="round"
                  style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
                />
              </svg>
              <div className="analysis__score-value">{latestSession.score}</div>
            </div>
            <h3 className="analysis__score-label">
              {latestSession.score > 80
                ? "Excellent Work!"
                : latestSession.score > 60
                ? "Good Effort!"
                : "Keep Practicing!"}
            </h3>
            <p className="analysis__score-desc">
              Overall confidence score from your last session.
            </p>
 
            <div className="analysis__score-stats">
              <div className="analysis__score-stat">
                <span className="analysis__score-stat-label">
                  Pace ({latestSession.metrics.wpm} WPM)
                </span>
                <span className="analysis__score-stat-value analysis__score-stat-value--green">
                  Recorded
                </span>
              </div>
              <div className="analysis__score-stat">
                <span className="analysis__score-stat-label">
                  Fillers ({latestSession.metrics.fillers})
                </span>
                <span className="analysis__score-stat-value analysis__score-stat-value--yellow">
                  Recorded
                </span>
              </div>
              <div className="analysis__score-stat analysis__score-stat--last">
                <span className="analysis__score-stat-label">Tonality</span>
                <span className="analysis__score-stat-value analysis__score-stat-value--blue">
                  {latestSession.score}% Confident
                </span>
              </div>
            </div>
          </div>
 
          {/* Filler chart */}
          <div className="analysis__chart-card">
            <h3 className="analysis__chart-title">Filler Word Frequency</h3>
            <div className="analysis__chart-body">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: "Um", count: latestSession.metrics.fillers || 0 },
                    {
                      name: "Like",
                      count: Math.floor(
                        (latestSession.metrics.fillers || 0) / 2
                      ),
                    },
                    { name: "Basically", count: 1 },
                  ]}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={isDarkMode ? "#334155" : "#e2e8f0"}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#64748b"
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{
                      fill: isDarkMode
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.05)",
                    }}
                    contentStyle={{
                      backgroundColor: isDarkMode ? "#1e293b" : "#fff",
                      borderColor: isDarkMode ? "#334155" : "#e2e8f0",
                    }}
                  />
                  <Bar
                    dataKey="count"
                    fill="#f97316"
                    radius={[4, 4, 0, 0]}
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default AnalysisView;