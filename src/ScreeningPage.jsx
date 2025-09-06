import React from "react";
import ScreeningModule from "./ScreeningModule"; // Import the unified module
import "./ScreeningModule.css";

export default function ScreeningPage() {
  return (
    <div className="screening-bg">
      <div className="screening-card" style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1 className="screening-title">Mental Health Screening</h1>
        <p style={{ textAlign: "center", color: "#475569", marginBottom: "1.5rem" }}>
          Select a tool below (PHQ-9 for Depression or GAD-7 for Anxiety) and answer the questions honestly. 
          Your results will appear after submission.
        </p>

        {/* Screening module with tabs for PHQ-9 and GAD-7 */}
        <ScreeningModule />
      </div>
    </div>
  );
}
