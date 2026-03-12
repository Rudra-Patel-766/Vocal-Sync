import React from "react";
import { Mic, Activity, Wand2, Smile } from "lucide-react";
import "./HomeView.css";
 
const HomeView = ({ setActivePage }) => (
  <div className="home-view">
    {/* Hero Section */}
    <div className="home-hero">
      <div className="home-hero__bg-image">
        <img
          src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=2070"
          alt="Professional Studio Background"
        />
        <div className="home-hero__overlay" />
      </div>
      <div className="home-hero__glow" />
 
      <div className="home-hero__content">
        <h1 className="home-hero__title">
          Master Public Speaking with{" "}
          <span className="home-hero__title-accent">Real-Time AI</span>
        </h1>
        <p className="home-hero__subtitle">
          VocalSync is your private, intelligent speech coach. We analyze your
          pace, tone, and facial expressions instantly to help you communicate
          with confidence.
        </p>
        <div className="home-hero__actions">
          <button
            onClick={() => setActivePage("practice")}
            className="home-hero__btn-primary"
          >
            <Mic size={20} /> Start Practice
          </button>
        </div>
      </div>
 
      <div className="home-hero__rings" aria-hidden="true">
        <div className="home-hero__ring home-hero__ring--1" />
        <div className="home-hero__ring home-hero__ring--2" />
        <div className="home-hero__ring home-hero__ring--3" />
      </div>
    </div>
 
    {/* Feature Cards */}
    <div className="home-features">
      <div className="home-feature-card">
        <div className="home-feature-card__icon home-feature-card__icon--blue">
          <Activity size={24} />
        </div>
        <h3 className="home-feature-card__title">Real-Time Feedback</h3>
        <p className="home-feature-card__desc">
          Get instant alerts on your speaking pace and filler words while you
          speak, acting as a smart mirror.
        </p>
      </div>
      <div className="home-feature-card">
        <div className="home-feature-card__icon home-feature-card__icon--purple">
          <Wand2 size={24} />
        </div>
        <h3 className="home-feature-card__title">Smart AI Coaching</h3>
        <p className="home-feature-card__desc">
          Our advanced AI provides deep transcript analysis and intelligent
          impromptu topics to sharpen your skills.
        </p>
      </div>
      <div className="home-feature-card">
        <div className="home-feature-card__icon home-feature-card__icon--green">
          <Smile size={24} />
        </div>
        <h3 className="home-feature-card__title">Emotion Analysis</h3>
        <p className="home-feature-card__desc">
          Our multi-modal AI understands your vocal tone and facial expressions
          to gauge confidence and engagement.
        </p>
      </div>
    </div>
  </div>
);
 
export default HomeView;