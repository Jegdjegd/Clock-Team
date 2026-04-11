import { Moon, Sun, Thermometer } from "lucide-react";
import { motion } from "framer-motion";
import { useLocalTime } from "../../hooks/useLocalTime";
import { useWeather } from "../../hooks/useWeather";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setActiveTeammate } from "../../store/slices/    teammatesSlice";
import { setThemeFromTimezone } from "../../store/slices/    themeSlice";

interface OrbitCardProps {
  id: string;
  name: string;
  role: string;
  location: string;
  timezone: string;
  city: string;
  imageUrl?: string;
  isActive?: boolean;
  angle: number;
  orbitRadiusX: number;
  orbitRadiusY: number;
}

export const OrbitCard = ({
  id, name, location, timezone, city,
  isActive = false, angle, orbitRadiusX, orbitRadiusY,
}: OrbitCardProps) => {
  const dispatch = useAppDispatch();
  const { time, isDay, isWorking } = useLocalTime(timezone);
  const { temp, isLoading } = useWeather(city);

  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * orbitRadiusX;
  const y = Math.sin(rad) * orbitRadiusY;

  // depth: 0 = arriba/lejos, 1 = abajo/cerca del usuario
  const depth = (Math.sin(rad) + 1) / 2;

  // Opacidad con curva exponencial — solo la card más frontal brilla
  const opacity = Math.pow(depth, 1.5);

  // Escala proporcional a la profundidad
  const scale = 0.70 + depth * 0.35;

  // zIndex — cards frontales por delante del centro, traseras por detrás
  const isFront = Math.sin(rad) > 0;
  const zIndex = isFront
    ? Math.round(depth * 20) + 25
    : Math.round(depth * 10) + 5;

  const handleSelect = () => {
    dispatch(setActiveTeammate(id));
    dispatch(setThemeFromTimezone(timezone));
  };

  return (
    <div
      style={{
        position: "absolute",
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        zIndex,
        width: "160px",
      }}
    >
      <motion.div
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleSelect}
        className={`
          glass rounded-2xl p-3 w-40 relative overflow-hidden
          cursor-pointer transition-colors duration-300 border
          ${isActive
            ? "border-universe-purple/50 shadow-[0_0_20px_rgba(124,58,237,0.2)]"
            : "border-white/5 hover:border-white/20"
          }
        `}
      >
        {isActive && (
          <div className="absolute inset-0 bg-universe-purple/5 rounded-2xl" />
        )}

        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-black text-sm tracking-wide leading-tight truncate">
              {name.split(" ")[0].toUpperCase()}
            </h3>
            <p className="text-white/30 text-[9px] tracking-widest uppercase mt-0.5 truncate">
              {location}
            </p>
          </div>
          <div className="shrink-0 ml-1">
            {isDay
              ? <Sun size={13} className="text-yellow-400" />
              : <Moon size={13} className="text-blue-300" />
            }
          </div>
        </div>

        {/* Hora */}
        <p className="text-white font-black text-xl tracking-tight leading-none mb-2">
          {time.split(" ")[0]}
        </p>

        <div className="border-t border-white/5 mb-2" />

        {/* Meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-white/30 text-[9px]">
            <Thermometer size={9} className="text-orange-400/60" />
            <span>{isLoading ? "—" : temp !== null ? `${temp}°` : "—"}</span>
          </div>
          <div className={`
            text-[8px] font-black tracking-widest px-1.5 py-0.5 rounded-full
            ${isWorking
              ? "bg-green-500/10 text-green-400"
              : "bg-red-500/10 text-red-400"
            }
          `}>
            {isWorking ? "ON" : "OFF"}
          </div>
        </div>

        {/* Acciones */}
        <div className="flex gap-1.5 mt-2 pt-2 border-t border-white/5">
          {["MSG", "SYNC"].map(action => (
            <button
              key={action}
              onClick={e => e.stopPropagation()}
              className="text-[8px] font-black tracking-widest px-2 py-0.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-universe-blue/70"
            >
              {action}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};