import React, { useState, useEffect, useRef } from "react";
import { Video, Mic, StopCircle, Activity } from "lucide-react";
import "./PracticeView.css";
 
const PracticeView = ({ onSessionEnd }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const [metrics, setMetrics] = useState({ wpm: 0, fillers: 0, confidence: 50 });
  const [transcript, setTranscript] = useState([]);
  const [timer, setTimer] = useState(0);
 
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setMetrics((prev) => ({
          wpm: Math.floor(120 + Math.random() * 30),
          fillers: prev.fillers + (Math.random() > 0.8 ? 1 : 0),
          confidence: Math.min(
            100,
            Math.max(0, prev.confidence + (Math.random() - 0.5) * 10)
          ),
        }));
        setTimer((t) => t + 1);
        if (Math.random() > 0.7) {
          const words = [
            "So,", "basically,", "um,", "essentially,",
            "moving on,", "I think,", "you know,",
          ];
          const newWord = words[Math.floor(Math.random() * words.length)];
          setTranscript((prev) => [...prev.slice(-10), newWord]);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);
 
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
      setIsRecording(true);
    } catch (err) {
      console.error(err);
      alert("Camera access denied or unavailable. Using simulation mode.");
      setIsRecording(true);
    }
  };
 
  const stopCamera = () => {
    if (stream) stream.getTracks().forEach((track) => track.stop());
    setIsRecording(false);
    setStream(null);
 
    const sessionData = {
      title:
        "Practice Session " +
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date: new Date().toLocaleDateString(),
      score: Math.round(metrics.confidence),
      grade: metrics.confidence > 80 ? "A" : metrics.confidence > 60 ? "B" : "C",
      duration: timer,
      metrics: { ...metrics },
      transcript:
        transcript.length > 0
          ? transcript.join(" ")
          : "No words detected during this session.",
    };
 
    if (onSessionEnd) onSessionEnd(sessionData);
    setTimer(0);
    setMetrics({ wpm: 0, fillers: 0, confidence: 50 });
    setTranscript([]);
  };
 
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };
 
  return (
    <div className="practice">
      {/* Camera area */}
      <div className="practice__main">
        <div className="practice__camera">
          {isRecording ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="practice__video"
            />
          ) : (
            <div className="practice__camera-off">
              <div className="practice__camera-icon">
                <Video size={40} />
              </div>
              <p className="practice__camera-label">Camera is off</p>
            </div>
          )}
          {isRecording && (
            <div className="practice__rec-badge">
              <span className="practice__rec-dot" />
              <span className="practice__rec-text">REC {formatTime(timer)}</span>
            </div>
          )}
        </div>
 
        <div className="practice__controls">
          {!isRecording ? (
            <button onClick={startCamera} className="practice__btn practice__btn--start">
              <Mic size={24} /> Start Session
            </button>
          ) : (
            <button onClick={stopCamera} className="practice__btn practice__btn--stop">
              <StopCircle size={24} /> End Session
            </button>
          )}
        </div>
      </div>
 
      {/* Side panel */}
      <div className="practice__panel">
        {!isRecording ? (
          <div className="practice__panel-idle">
            <div className="practice__panel-idle-icon">
              <Activity size={32} />
            </div>
            <h3 className="practice__panel-idle-title">Ready when you are</h3>
            <p className="practice__panel-idle-desc">
              Start a session to enable the AI coach. Your real-time metrics and
              transcript will appear here.
            </p>
          </div>
        ) : (
          <>
            {/* Live Metrics */}
            <div className="practice__metrics">
              <h3 className="practice__metrics-title">
                <Activity size={18} /> Live Metrics
              </h3>
 
              <div className="practice__metric">
                <div className="practice__metric-label-row">
                  <span className="practice__metric-label">Pace (WPM)</span>
                  <span className="practice__metric-value">{metrics.wpm}</span>
                </div>
                <div className="practice__bar-bg">
                  <div
                    className={`practice__bar-fill ${
                      metrics.wpm > 130
                        ? "practice__bar-fill--green"
                        : "practice__bar-fill--blue"
                    }`}
                    style={{ width: `${Math.min(100, (metrics.wpm / 180) * 100)}%` }}
                  />
                </div>
              </div>
 
              <div className="practice__metric">
                <div className="practice__metric-label-row">
                  <span className="practice__metric-label">Vocal Confidence</span>
                  <span className="practice__metric-value">
                    {Math.round(metrics.confidence)}%
                  </span>
                </div>
                <div className="practice__bar-bg">
                  <div
                    className="practice__bar-fill practice__bar-fill--violet"
                    style={{ width: `${metrics.confidence}%` }}
                  />
                </div>
              </div>
 
              <div className="practice__filler-box">
                <div>
                  <span className="practice__filler-label">Filler Words</span>
                </div>
                <div className="practice__filler-count">{metrics.fillers}</div>
              </div>
            </div>
 
            {/* Transcript */}
            <div className="practice__transcript">
              <h3 className="practice__transcript-title">Live Transcript</h3>
              <div className="practice__transcript-text">
                {transcript.length === 0 ? (
                  <span className="practice__transcript-placeholder">
                    Listening...
                  </span>
                ) : (
                  <>
                    <span className="practice__transcript-ellipsis">...</span>
                    {transcript.map((word, i) => (
                      <span key={i} className="practice__transcript-word">
                        {word}
                      </span>
                    ))}
                  </>
                )}
              </div>
              <div className="practice__transcript-fade" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
 
export default PracticeView;