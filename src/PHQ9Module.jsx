import React, { useState, useMemo } from "react";
import "./ScreeningModule.css";

const CHOICES = [
  { value: 0, label: "0 – Not at all" },
  { value: 1, label: "1 – Several days" },
  { value: 2, label: "2 – More than half the days" },
  { value: 3, label: "3 – Nearly every day" },
];

const PHQ9_ITEMS = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself or that you are a failure",
  "Trouble concentrating on reading or watching TV",
  "Moving or speaking very slowly or being restless/fidgety",
  "Thoughts that you would be better off dead or of hurting yourself",
];

function phq9Severity(score) {
  if (score <= 4) return { level: "Normal", color: "green" };
  if (score <= 9) return { level: "Mild", color: "goldenrod" };
  if (score <= 14) return { level: "Moderate", color: "orange" };
  return { level: "Severe", color: "red" };
}

export default function PHQ9Module() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(null);

  const score = useMemo(
    () => Object.values(answers).reduce((s, v) => s + (Number(v) || 0), 0),
    [answers]
  );

  const severity = useMemo(() => phq9Severity(score), [score]);

  function handleSelect(qIdx, value) {
    setAnswers((prev) => ({ ...prev, [qIdx]: Number(value) }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted({ score, severity });
  }

  const progress = (Object.keys(answers).length / PHQ9_ITEMS.length) * 100;

  return (
    <div className="tool-container">
      <h2 className="screening-title">PHQ-9 Screening</h2>

      {/* Progress bar */}
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <form onSubmit={handleSubmit}>
        {PHQ9_ITEMS.map((q, idx) => (
          <div key={idx}>
            <p className="question">{idx + 1}. {q}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {CHOICES.map((c) => (
                <label
                  key={c.value}
                  className={`answer-option ${
                    answers[idx] === c.value ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name={`phq9_q${idx}`}
                    value={c.value}
                    checked={answers[idx] === c.value}
                    onChange={(e) => handleSelect(idx, e.target.value)}
                  />
                  <span>{c.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="btn-submit"
          disabled={Object.keys(answers).length < PHQ9_ITEMS.length}
        >
          Submit Screening
        </button>
      </form>

      {submitted && (
        <div className="result-card">
          <h3 className="result-title">Your Result</h3>
          <p className="result-score">
            Score: <strong>{submitted.score}/27</strong>
          </p>
          <p
            className="result-level"
            style={{ color: submitted.severity.color }}
          >
            {submitted.severity.level}
          </p>
        </div>
      )}
    </div>
  );
}
