"use client";
import React, { useEffect, useState } from "react";
import { Timer } from "lucide-react";

const InterviewTimer = ({ running }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  const format = (s) =>
    new Date(s * 1000).toISOString().substr(11, 8); // hh:mm:ss

  return (
    <span className="flex gap-2 items-center">
      <Timer />
      {format(seconds)}
    </span>
  );
};

export default InterviewTimer;
