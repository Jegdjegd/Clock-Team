import { Clock, MapPin, Moon, Sun, Thermometer } from "lucide-react";
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
  // Posición en la órbita
  angle: number;
  orbitRadius: number;
}

export const OrbitCard = ({
  id, name, role, location, timezone, city,
  imageUrl, isActive = false, angle, orbitRadius,
}: OrbitCardProps) => {
  const dispatch = useAppDispatch();
  const { time, isDay, isWorking } = useLocalTime(timezone);
  const { temp, isLoading } = useWeather(city);

  // Calcula posición X/Y desde ángulo y radio
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * orbitRadius;
  const y = Math.sin(rad) * orbitRadius;

  const handleSelect = () => {
    dispatch(setActiveTeammate(id));
    dispatch(setThemeFromTimezone(timezone));
  };

  return (
    <motion.div
      onClick={handleSelect}
      animate={{
        x: [x, x, x + (Math.cos(rad) * 8), x],
        y: [y, y - 8, y, y],
      }}
      transition={{
        duration: 4 + (angle % 3),
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        zIndex: 10,
      }}
      className="cursor-pointer"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className={`
          glass rounded-3xl p-4 w-52 relative overflow-hidden
          transition-all duration-300 border
          ${isActive
            ? "border-universe-purple/50 shadow-[0_0_20px_rgba(124,58,237,0.15)]"
            : "border-white/5 hover:border-white/15"
          }
        `}
      >
        {/* Glow activo */}
        {isActive && (
          <div className="absolute inset-0 bg-universe-purple/5 rounded-3xl" />
        )}

        {/* Header — nombre + icono clima */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-white font-black text-base tracking-wide leading-tight">
              {name.split(" ")[0].toUpperCase()}
            </h3>
            <p className="text-white/30 text-[10px] tracking-widest uppercase mt-0.5">
              {location}
            </p>
          </div>
          <div className="text-lg">
            {isDay
              ? <Sun size={18} className="text-yellow-400" />
              : <Moon size={18} className="text-blue-300" />
            }
          </div>
        </div>

        {/* Hora grande */}
        <p className="text-white font-black text-3xl tracking-tight leading-none mb-3">
          {time.split(" ")[0]}
        </p>

        {/* Divider */}
        <div className="border-t border-white/5 mb-3" />

        {/* Meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-white/30 text-[10px]">
            <div className="flex items-center gap-1">
              <Thermometer size={10} className="text-orange-400/60" />
              <span>{isLoading ? "—" : temp !== null ? `${temp}°` : "—"}</span>
            </div>
          </div>

          {/* Badge */}
          <div className={`
            text-[8px] font-black tracking-widest px-2 py-0.5 rounded-full
            ${isWorking
              ? "bg-green-500/10 text-green-400"
              : "bg-red-500/10 text-red-400"
            }
          `}>
            {isWorking ? "WORKING" : "CLOSED"}
          </div>
        </div>

        {/* Iconos de acción */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
          {[
            { label: "MSG", color: "text-universe-blue" },
            { label: "SYNC", color: "text-universe-purple" },
          ].map(action => (
            <button
              key={action.label}
              onClick={e => e.stopPropagation()}
              className={`
                text-[8px] font-black tracking-widest px-2 py-1 rounded-lg
                bg-white/5 hover:bg-white/10 transition-colors ${action.color}
              `}
            >
              {action.label}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};