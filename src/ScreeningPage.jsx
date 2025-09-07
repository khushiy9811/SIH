import React, { useState } from "react";
import PHQ9Module from "./PHQ9Module";
import GAD7Module from "./GAD7Module";
import "./ScreeningModule.css";

export default function ScreeningPage() {
  const [selectedTool, setSelectedTool] = useState("PHQ9");

  return (
    <div className="screening-bg">
      <div className="screening-card" style={{ maxWidth: "850px", margin: "0 auto" }}>
        <h1 className="screening-title">Mental Health Screening</h1>

        {/* Tabs */}
        <div className="tabs-container">
          <button
            className={`tab-btn ${selectedTool === "PHQ9" ? "active" : ""}`}
            onClick={() => setSelectedTool("PHQ9")}
          >
            PHQ-9 (Depression)
          </button>
          <button
            className={`tab-btn ${selectedTool === "GAD7" ? "active" : ""}`}
            onClick={() => setSelectedTool("GAD7")}
          >
            GAD-7 (Anxiety)
          </button>
        </div>

        {/* Render selected tool */}
        <div style={{ marginTop: "2rem" }}>
          {selectedTool === "PHQ9" ? <PHQ9Module /> : <GAD7Module />}
        </div>
      </div>
    </div>
  );
}
