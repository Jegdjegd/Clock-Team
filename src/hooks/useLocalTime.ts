// src/hooks/useLocalTime.ts
import { useState, useEffect } from "react";

function getTimeData(timezone: string) {
  const now = new Date(); // instancia nueva cada llamada

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
    setData(getTimeData(timezone));

    const now = new Date();
    const msToNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    let interval: ReturnType<typeof setInterval>;

    const timeout = setTimeout(() => {
      setData(getTimeData(timezone));

      interval = setInterval(() => {
        setData(getTimeData(timezone));
      }, 60_000);

    }, msToNextMinute);

    // cleanup correcto — ambos accesibles desde el return
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [timezone]);

  return data;
}