// src/hooks/useLocalTime.ts
import { useState, useEffect } from "react";

function getTimeData(timezone: string) {
  const now = new Date();

  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(now);

  const hour24 = parseInt(
    new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "numeric",
      hour12: false,
      hourCycle: "h23",
    }).format(now),
    10
  );

  return {
    time,
    isDay: hour24 >= 6 && hour24 < 20,
    isWorking: hour24 >= 9 && hour24 < 18,
  };
}

export function useLocalTime(timezone: string) {
  const [data, setData] = useState(() => getTimeData(timezone));

  useEffect(() => {
    // Actualiza cada segundo — liviano y siempre sincronizado
    const interval = setInterval(() => {
      setData(prev => {
        const next = getTimeData(timezone);
        // Solo re-renderiza si la hora cambió
        if (next.time === prev.time) return prev;
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  return data;
}