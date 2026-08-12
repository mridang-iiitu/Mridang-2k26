import { useState, useEffect } from "react";

// Target: ~45 days from now (placeholder — replace with real event date)
const TARGET_DATE = new Date(Date.now() + 45 * 24 * 60 * 60 * 1000);

function calcTimeLeft() {
  const diff = Math.max(0, TARGET_DATE - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    min: Math.floor((diff / (1000 * 60)) % 60),
    sec: Math.floor((diff / 1000) % 60),
  };
}

function pad(n) {
  return String(n).padStart(2, "0");
}

export default function Countdown() {
  const [time, setTime] = useState(calcTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const blocks = [
    { value: time.days, label: "days" },
    { value: time.hours, label: "hours" },
    { value: time.min, label: "min" },
    { value: time.sec, label: "sec" },
  ];

  return (
    <div className="countdown" id="countdown-timer">
      {blocks.map((b, i) => (
        <div key={b.label} style={{ display: "flex", alignItems: "center" }}>
          <div className="countdown__block">
            <span className="countdown__number">{pad(b.value)}</span>
            <span className="countdown__label">{b.label}</span>
          </div>
          {i < blocks.length - 1 && <span className="countdown__sep">:</span>}
        </div>
      ))}
    </div>
  );
}
