import { MapPin } from "lucide-react";
import { useLocalTime } from "../../hooks/useLocalTime";
import { useWeather } from "../../hooks/useWeather";

const ME = {
  name: "Alex Dev",
  role: "Frontend Developer",
  timezone: "Europe/Madrid",
  city: "Vitoria",
  location: "Vitoria, ES",
  initials: "AD",
};

export const CenterCard = () => {
  const { time, isDay } = useLocalTime(ME.timezone);
  const { temp, description } = useWeather(ME.city);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {/* Anillo exterior */}
      <div className="relative flex items-center justify-center">
        <div className="w-52 h-52 rounded-full border border-universe-purple/30 flex items-center justify-center">
          <div className="w-44 h-44 rounded-full border border-universe-purple/20 flex items-center justify-center">
            {/* Card central */}
            <div className="w-36 h-36 rounded-full bg-universe-dark border-2 border-universe-purple/50 flex flex-col items-center justify-center gap-1 relative overflow-hidden">
              {/* Glow interno */}
              <div className="absolute inset-0 rounded-full bg-universe-purple/10" />

              {/* Avatar */}
              <div className="w-14 h-14 rounded-full bg-universe-blue/20 border border-white/10 flex items-center justify-center z-10">
                <span className="text-white font-black text-lg">{ME.initials}</span>
              </div>

              {/* Nombre */}
              <p className="text-white font-black text-sm tracking-wide z-10 mt-1">
                {ME.name.split(" ")[0]}
              </p>

              {/* Hora */}
              <p className="text-universe-purple font-black text-xs z-10">
                {time}
              </p>
            </div>
          </div>
        </div>

        {/* Punto de presencia online */}
        <div className="absolute bottom-6 right-6 w-3 h-3 rounded-full bg-green-400 border-2 border-universe-dark" />
      </div>

      {/* Info debajo del círculo */}
      <div className="mt-5 flex flex-col items-center gap-1">
        <h2 className="text-white font-black text-xl tracking-tight">
          {ME.name.toUpperCase()}
        </h2>
        <p className="text-universe-purple text-[10px] font-black tracking-[0.25em] uppercase">
          {ME.role}
        </p>
        <div className="flex items-center gap-1.5 mt-1 text-white/40 text-xs">
          <MapPin size={11} />
          <span>{ME.location}</span>
        </div>
        <p className="text-white font-black text-3xl tracking-tight mt-2">
          {time}
          <span className="text-universe-purple text-sm ml-1 font-bold">
            {isDay ? "AM" : "PM"}
          </span>
        </p>
        {temp !== null && (
          <p className="text-white/30 text-xs mt-0.5">
            {temp}°C · {description}
          </p>
        )}
        <p className="text-white/20 text-[10px] tracking-widest mt-0.5 uppercase">
          Central European Time
        </p>
      </div>
    </div>
  );
};