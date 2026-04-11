import { MapPin, Sun, Moon } from "lucide-react";
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
    <div className="relative flex items-center justify-center">
      {/* Anillo exterior decorativo */}
      <div className="w-64 h-64 rounded-full border border-universe-purple/20 flex items-center justify-center">
        <div className="w-56 h-56 rounded-full border border-universe-purple/30 flex items-center justify-center">

          {/* Círculo principal — todo el contenido aquí dentro */}
          <div className="w-48 h-48 rounded-full bg-universe-dark border-2 border-universe-purple/50 flex flex-col items-center justify-center gap-1 relative overflow-hidden">

            {/* Glow interno */}
            <div className="absolute inset-0 rounded-full bg-universe-purple/10" />

            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-universe-blue/20 border border-white/10 flex items-center justify-center z-10 shrink-0">
              <span className="text-white font-black text-base">{ME.initials}</span>
            </div>

            {/* Nombre */}
            <p className="text-white font-black text-sm tracking-wide z-10 leading-tight">
              {ME.name.toUpperCase()}
            </p>

            {/* Rol */}
            <p className="text-universe-purple text-[8px] font-black tracking-[0.15em] uppercase z-10 leading-tight px-2 text-center">
              {ME.role}
            </p>

            {/* Hora grande */}
            <p className="text-white font-black text-2xl tracking-tight z-10 leading-none mt-1">
              {time.split(" ")[0]}
              <span className="text-universe-purple text-xs ml-1">
                {time.split(" ")[1]}
              </span>
            </p>

            {/* Ubicación */}
            <div className="flex items-center gap-1 z-10 mt-0.5">
              <MapPin size={9} className="text-white/30" />
              <span className="text-white/40 text-[9px]">{ME.location}</span>
            </div>

            {/* Clima */}
            {temp !== null && (
              <p className="text-white/25 text-[8px] z-10 leading-tight">
                {temp}°C · {description}
              </p>
            )}

            {/* Indicador día/noche */}
            <div className="absolute top-3 right-3 z-10">
              {isDay
                ? <Sun size={10} className="text-yellow-400" />
                : <Moon size={10} className="text-blue-300" />
              }
            </div>

            {/* Punto online */}
            <div className="absolute bottom-4 right-6 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-universe-dark z-10" />
          </div>

        </div>
      </div>
    </div>
  );
};