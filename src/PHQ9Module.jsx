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

const GAD7_ITEMS = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid, as if something awful might happen",
];

function phq9Severity(score) {
  if (score <= 4) return { level: "Normal", color: "green" };
  if (score <= 9) return { level: "Mild", color: "goldenrod" };
  if (score <= 14) return { level: "Moderate", color: "orange" };
  return { level: "Severe", color: "red" };
}

function gad7Severity(score) {
  if (score <= 4) return { level: "Minimal Anxiety", color: "green" };
  if (score <= 9) return { level: "Mild Anxiety", color: "goldenrod" };
  if (score <= 14) return { level: "Moderate Anxiety", color: "orange" };
  return { level: "Severe Anxiety", color: "red" };
}

export default function ScreeningModule() {
  const [testType, setTestType] = useState("PHQ9"); // PHQ9 or GAD7
  const QUESTIONS = testType === "PHQ9" ? PHQ9_ITEMS : GAD7_ITEMS;

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(null);

  const score = useMemo(
    () => Object.values(answers).reduce((s, v) => s + (Number(v) || 0), 0),
    [answers]
  );

  const severity = useMemo(() => {
    return testType === "PHQ9" ? phq9Severity(score) : gad7Severity(score);
  }, [score, testType]);

  function handleSelect(qIdx, value) {
    setAnswers((prev) => ({ ...prev, [qIdx]: Number(value) }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted({ score, severity });
  }

  const progress = (Object.keys(answers).length / QUESTIONS.length) * 100;

  return (
    <div className="screening-container">
      {/* Tabs for switching */}
      <div className="tabs">
        <button
          className={testType === "PHQ9" ? "tab active" : "tab"}
          onClick={() => {
            setTestType("PHQ9");
            setAnswers({});
            setSubmitted(null);
          }}
        >
          PHQ-9 (Depression)
        </button>
        <button
          className={testType === "GAD7" ? "tab active" : "tab"}
          onClick={() => {
            setTestType("GAD7");
            setAnswers({});
            setSubmitted(null);
          }}
        >
          GAD-7 (Anxiety)
        </button>
      </div>

      <div className="screening-card">
        <h1 className="screening-title">
          {testType === "PHQ9" ? "PHQ-9 Depression Screening" : "GAD-7 Anxiety Screening"}
        </h1>

        {/* Progress Bar */}
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {QUESTIONS.map((q, idx) => (
            <div key={idx}>
              <p className="question">{idx + 1}. {q}</p>
              <div className="choices">
                {CHOICES.map((c) => (
                  <label
                    key={c.value}
                    className={`answer-option ${answers[idx] === c.value ? "selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name={`q${idx}`}
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
            disabled={Object.keys(answers).length < QUESTIONS.length}
          >
            Submit Screening
          </button>
        </form>
      </div>

      {/* Result */}
      {submitted && (
        <div className="result-card">
          <h2>Your Result</h2>
          <p><strong>Score: {submitted.score}</strong></p>
          <p style={{ color: submitted.severity.color }}>
            {submitted.severity.level}
          </p>
        </div>
      )}
    </div>
  );
}
