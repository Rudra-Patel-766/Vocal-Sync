import React from "react";
import { TrendingUp } from "lucide-react";
import "./StatCard.css";
 
const StatCard = ({ title, value, subtext, icon: Icon, color, trend }) => (
  <div className="stat-card">
    <div className="stat-card__header">
      <div>
        <p className="stat-card__title">{title}</p>
        <h3 className="stat-card__value">{value}</h3>
      </div>
      <div className={`stat-card__icon-wrapper stat-card__icon-wrapper--${color}`}>
        {Icon && <Icon size={22} className={`stat-card__icon stat-card__icon--${color}`} />}
      </div>
    </div>
    <div className="stat-card__footer">
      <span className={`stat-card__badge stat-card__badge--${trend}`}>
        {trend === "up" ? (
          <TrendingUp size={12} />
        ) : (
          <TrendingUp size={12} style={{ transform: "rotate(180deg)" }} />
        )}
        {subtext}
      </span>
      <span className="stat-card__compare">vs last week</span>
    </div>
  </div>
);
 
export default StatCard;