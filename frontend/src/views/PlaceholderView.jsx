import React from 'react';
import { Settings } from 'lucide-react';
import './PlaceholderView.css';
 
const PlaceholderView = ({ title }) => (
  <div className="placeholder-view">
    <div className="placeholder-view__icon">
      <Settings size={40} />
    </div>
    <h2 className="placeholder-view__title">{title}</h2>
    <p className="placeholder-view__desc">This module is under development.</p>
  </div>
);
 
export default PlaceholderView;