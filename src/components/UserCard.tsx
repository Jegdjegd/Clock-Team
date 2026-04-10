// src/components/UserCard.tsx
import { MapPin, Clock, Moon, Sun, Thermometer, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLocalTime } from "../hooks/useLocalTime";
import { useWeather } from "../hooks/useWeather";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setActiveTeammate, removeTeammate } from "../store/slices/    teammatesSlice";
import { setThemeFromTimezone, resetTheme } from "../store/slices/    themeSlice";

interface UserCardProps {
  id: string;
  name: string;
  role: string;
  location: string;
  timezone: string;
  city: string;
  imageUrl?: string;
  delay?: string;
  isActive?: boolean;
}

export const UserCard = ({
  id, name, role, location, timezone, city,
  imageUrl, delay = "0s", isActive = false,
}: UserCardProps) => {
  const dispatch = useAppDispatch();
  const { time, isDay, isWorking } = useLocalTime(timezone);
  const { temp, description, isLoading } = useWeather(city);
  const [showDelete, setShowDelete] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const pressTimer = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleSelect = () => {
    if (showDelete) {
      setShowDelete(false);
      return;
    }
    dispatch(setActiveTeammate(id));
    dispatch(setThemeFromTimezone(timezone));
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }
    dispatch(removeTeammate(id));
    dispatch(resetTheme());
  };

  const handlePressStart = () => {
    pressTimer[1](setTimeout(() => setShowDelete(s => !s), 500));
  };

  const handlePressEnd = () => {
    if (pressTimer[0]) {
      clearTimeout(pressTimer[0]);
      pressTimer[1](null);
    }
  };

  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: parseFloat(delay),
      }}
      className="relative w-full"
    >
      {/* Botón eliminar — detrás de la card */}
      <AnimatePresence>
        {showDelete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute right-0 top-0 bottom-0 flex items-center pl-3 pr-2 z-0"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleDelete}
              className={`
                flex flex-col items-center justify-center gap-1
                w-16 h-16 rounded-3xl transition-all duration-200
                ${confirmDelete
                  ? "bg-red-500 text-white"
                  : "bg-red-500/10 text-red-400 border border-red-500/20"
                }
              `}
            >
              <Trash2 size={16} />
              <span className="text-[8px] font-black tracking-wider">
                {confirmDelete ? "SURE?" : "DELETE"}
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card principal */}
      <motion.div
        onClick={handleSelect}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
        animate={{ x: showDelete ? -84 : 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={`
          glass rounded-4xl p-4 flex items-center gap-4 w-full relative
          overflow-hidden cursor-pointer group transition-colors duration-300
          ${isActive ? "ring-1 ring-universe-purple/60" : ""}
        `}
      >
        {/* Glow */}
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-universe-purple/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Avatar */}
        <div className="w-16 h-16 rounded-full overflow-hidden bg-white/5 border border-white/10 shrink-0 relative">
          {imageUrl ? (
            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-universe-blue/20 flex items-center justify-center">
              <span className="text-white/60 text-xl font-bold">
                {name.charAt(0)}
              </span>
            </div>
          )}
          {/* Indicador día/noche */}
          <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-universe-dark flex items-center justify-center border border-white/10">
            {isDay
              ? <Sun size={10} className="text-yellow-400" />
              : <Moon size={10} className="text-blue-300" />
            }
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col flex-1 z-10">
          <h3 className="text-white font-bold text-lg leading-tight tracking-wide">
            {name}
          </h3>
          <p className="text-universe-purple text-[10px] font-black tracking-[0.2em] uppercase mt-0.5">
            {role}
          </p>

          <div className="flex items-center gap-4 mt-3 text-white/40 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <Clock size={12} className="text-universe-blue" />
              <span className="text-white/80">{time}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={12} />
              <span>{location}</span>
            </div>
          </div>

          {/* Clima */}
          <div className="flex items-center gap-1.5 mt-2 text-white/40 text-xs">
            <Thermometer size={12} className="text-orange-400" />
            {isLoading ? (
              <span className="text-white/30">cargando...</span>
            ) : temp !== null ? (
              <span className="text-white/60">
                {temp}°C · {description}
              </span>
            ) : (
              <span className="text-white/30">—</span>
            )}
          </div>
        </div>

        {/* Badge disponibilidad + hint swipe */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className={`
            text-[9px] font-black tracking-widest px-2 py-1 rounded-full
            ${isWorking
              ? "bg-green-500/10 text-green-400"
              : "bg-red-500/10 text-red-400"
            }
          `}>
            {isWorking ? "WORKING" : "CLOSED"}
          </div>
          <div className="flex gap-0.5 opacity-20">
            <div className="w-0.5 h-3 rounded-full bg-white" />
            <div className="w-0.5 h-3 rounded-full bg-white" />
            <div className="w-0.5 h-3 rounded-full bg-white" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};