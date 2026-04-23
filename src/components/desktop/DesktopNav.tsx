import { Bell, Sun, Moon } from "lucide-react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppDispatch";
import { toggleLightMode } from "../../store/slices/    themeSlice";

export const DesktopNav = () => {
  const dispatch = useAppDispatch();
  const lightMode = useAppSelector(state => (state.theme as any).lightMode);

  return (
    <nav className="hidden md:flex items-center justify-between px-10 py-5 w-full z-30 relative">
      {/* Logo */}
      <span className={`font-black text-lg tracking-tighter italic ${
        lightMode ? "text-slate-900" : "text-white"
      }`}>
        CHRONOS
      </span>

      {/* Nav tabs */}
      <div className="flex items-center gap-8">
        {["TEAM", "WORLD", "INSIGHTS", "SETTINGS"].map((tab, i) => (
          <button
            key={tab}
            className={`text-[11px] font-black tracking-[0.2em] transition-colors ${
              i === 0
                ? lightMode
                  ? "text-slate-900"           // activo: casi negro
                  : "text-white"
                : lightMode
                  ? "text-slate-500 hover:text-slate-800"  // inactivo: gris medio → oscuro en hover
                  : "text-white/30 hover:text-white/60"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Iconos derecha */}
      <div className="flex items-center gap-3">
        {/* Toggle claro/oscuro */}
        <button
          onClick={() => dispatch(toggleLightMode())}
          className={`
            w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300
            ${lightMode
              ? "bg-slate-100 border border-slate-300 hover:bg-slate-200 shadow-sm"
              : "bg-white/5 border border-white/10 hover:bg-white/10"
            }
          `}
        >
          {lightMode
            ? <Moon size={15} className="text-slate-700" />
            : <Sun size={15} className="text-yellow-400" />
          }
        </button>

        {/* Bell */}
        <button className={`
          w-9 h-9 rounded-full flex items-center justify-center transition-colors
          ${lightMode
            ? "bg-slate-100 border border-slate-300 hover:bg-slate-200 shadow-sm"
            : "bg-white/5 border border-white/10 hover:bg-white/10"
          }
        `}>
          <Bell size={15} className={lightMode ? "text-slate-700" : "text-white/60"} />
        </button>

        {/* Grid dots */}
        <button className={`
          w-9 h-9 rounded-full flex items-center justify-center transition-colors
          ${lightMode
            ? "bg-purple-100 border border-purple-300 hover:bg-purple-200 shadow-sm"
            : "bg-universe-purple/20 border border-universe-purple/30 hover:bg-universe-purple/30"
          }
        `}>
          <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`rounded-full ${
                  lightMode ? "bg-purple-600" : "bg-universe-purple"
                }`}
              />
            ))}
          </div>
        </button>
      </div>
    </nav>
  );
};