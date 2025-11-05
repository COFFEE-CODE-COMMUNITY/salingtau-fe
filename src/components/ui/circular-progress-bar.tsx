import React from "react";

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
}

const CircularProgressBar: React.FC<CircularProgressProps> = ({
                                                                    value,
                                                                    size = 100,
                                                                    strokeWidth = 8,
                                                                  }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedValue = Math.min(Math.max(value, 0), 100);
  const offset = circumference - (clampedValue / 100) * circumference;

  return (
    <svg width={size} height={size} className="-rotate-90">
      {/* background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#e5e7eb" // abu-abu pudar
        strokeWidth={strokeWidth}
        fill="transparent"
      />

      {/* progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#3b82f6"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        fill="transparent"
      />
    </svg>
  );
};

export default CircularProgressBar;