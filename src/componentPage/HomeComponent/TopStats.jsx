import React from "react";
import "../../StylesPage/TopStats.css";

export default function GGLStatsStrip() {
  return (
    <div className="gglra-stats-strip-wrapper">
      <div className="gglra-stats-strip-container">

        <div className="gglra-stats-strip-item">
          <h2>2014</h2>
          <p>YEAR ESTABLISHED</p>
        </div>

        <div className="gglra-stats-strip-item">
          <h2>ISO</h2>
          <p>9001:2008 CERTIFIED</p>
        </div>

        <div className="gglra-stats-strip-item">
          <h2>10+</h2>
          <p>LANDMARK PROJECTS</p>
        </div>

        <div className="gglra-stats-strip-item">
          <h2>25+</h2>
          <p>YEARS OF EXCELLENCE</p>
        </div>

        <div className="gglra-stats-strip-item">
          <h2>2</h2>
          <p>MARKETS - INDIA & DUBAI</p>
        </div>

      </div>
    </div>
  );
}