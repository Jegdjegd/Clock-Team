import { useState, useEffect } from "react";

export function useLocalTime(timezone: string) {
  const getTime = () =>
    new Date().toLocaleTimeString("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const getHour = () =>
    new Date(
      new Date().toLocaleString("en-US", { timeZone: timezone })
    ).getHours();

  const [time, setTime] = useState(getTime);
  const [hour, setHour] = useState(getHour);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTime());
      setHour(getHour());
    }, 60_000);
    return () => clearInterval(interval);
  }, [timezone]);

  const isDay = hour >= 6 && hour < 20;
  const isWorking = hour >= 9 && hour < 18;

  return { time, isDay, isWorking };
}