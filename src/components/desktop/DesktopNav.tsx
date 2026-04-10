import { Bell } from "lucide-react";

export const DesktopNav = () => (
  <nav className="hidden md:flex items-center justify-between px-10 py-5 w-full">
    <span className="text-white font-black text-lg tracking-tighter italic">
      CLOCK TEAM EN CONSTRUCCION
    </span>
    <div className="flex items-center gap-8">
      {["TEAM", "WORLD", "INSIGHTS", "SETTINGS"].map((tab, i) => (
        <button
          key={tab}
          className={`text-[11px] font-black tracking-[0.2em] transition-colors ${
            i === 0 ? "text-white" : "text-white/30 hover:text-white/60"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
    <div className="flex items-center gap-4">
      <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
        <Bell size={15} className="text-white/60" />
      </button>
      <button className="w-9 h-9 rounded-full bg-universe-purple/20 border border-universe-purple/30 flex items-center justify-center hover:bg-universe-purple/30 transition-colors">
        <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-full bg-universe-purple" />
          ))}
        </div>
      </button>
    </div>
  </nav>
);