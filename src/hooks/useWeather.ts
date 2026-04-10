// src/hooks/useWeather.ts
import { useState, useEffect } from "react";

interface WeatherData {
  temp: number | null;
  description: string;
  icon: string;
  isLoading: boolean;
  error: boolean;
}

const cache: Record<string, { data: WeatherData; timestamp: number }> = {};
const CACHE_DURATION = 10 * 60 * 1000;

export function useWeather(city: string): WeatherData {
  const [weather, setWeather] = useState<WeatherData>({
    temp: null,
    description: "",
    icon: "",
    isLoading: true,
    error: false,
  });

  useEffect(() => {
    if (!city) return;

    const cached = cache[city];
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setWeather(cached.data);
      return;
    }

    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    const fetchWeather = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`;
        console.log("Fetching:", url);
        const res = await fetch(url);
        const json = await res.json();
        console.log("Response:", json);

        const data: WeatherData = {
          temp: Math.round(json.main.temp),
          description: json.weather[0].description,
          icon: json.weather[0].icon,
          isLoading: false,
          error: false,
        };

        cache[city] = { data, timestamp: Date.now() };
        setWeather(data);
      } catch {
        setWeather({
          temp: null,
          description: "—",
          icon: "",
          isLoading: false,
          error: true,
        });
      }
    };

    fetchWeather();
  }, [city]);

  return weather;
}