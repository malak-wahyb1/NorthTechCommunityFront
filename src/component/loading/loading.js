import React from 'react';
import './loading.css'

function Loading() {
  return (
    <div id="loader-wrapper">
    <div id="loader"></div>
    
    <div className="loader-section section-left"></div>
    <div className="loader-section section-right"></div>
    
  </div>
  );
}
export default Loading