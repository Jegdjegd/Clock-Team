import { MapPin, Clock, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useLocalTime } from "../hooks/useLocalTime";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setActiveTeammate } from "../store/slices/    teammatesSlice";
import { setThemeFromTimezone } from "../store/slices/    themeSlice";

interface UserCardProps {
  id: string;
  name: string;
  role: string;
  location: string;
  timezone: string;
  imageUrl?: string;
  delay?: string;
  isActive?: boolean;
}

export const UserCard = ({
  id, name, role, location, timezone,
  imageUrl, delay = "0s", isActive = false,
}: UserCardProps) => {
  const dispatch = useAppDispatch();
  const { time, isDay, isWorking } = useLocalTime(timezone);

  const handleSelect = () => {
    dispatch(setActiveTeammate(id));
    dispatch(setThemeFromTimezone(timezone));
  };

  return (
    <motion.div
      onClick={handleSelect}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: parseFloat(delay) }}
      className={`
        glass rounded-4xl p-4 flex items-center gap-4 w-full relative overflow-hidden 
        cursor-pointer group transition-all duration-300
        ${isActive ? "ring-1 ring-universe-purple/60" : ""}
      `}
    >
      {/* Glow hover */}
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
        <h3 className="text-white font-bold text-lg leading-tight tracking-wide">{name}</h3>
        <p className="text-universe-purple text-[10px] font-black tracking-[0.2em] uppercase mt-0.5">{role}</p>

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
      </div>

      {/* Badge de disponibilidad */}
      <div className={`
        text-[9px] font-black tracking-widest px-2 py-1 rounded-full shrink-0
        ${isWorking
          ? "bg-green-500/10 text-green-400"
          : "bg-red-500/10 text-red-400"
        }
      `}>
        {isWorking ? "WORKING" : "CLOSED"}
      </div>
    </motion.div>
  );
};