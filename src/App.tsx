import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BottomNav } from "./components/BottomNav";
import { UserCard } from "./components/UserCard";
import { DesktopNav } from "./components/desktop/DesktopNav";
import { OrbitalView } from "./components/desktop/OrbitalView";
import { useAppSelector } from "./hooks/useAppDispatch";
import { useLocalTime } from "./hooks/useLocalTime";

const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  top: `${(i * 37.3) % 100}%`,
  left: `${(i * 61.7) % 100}%`,
  size: (i * 13) % 3 === 0 ? "2px" : "1px",
  opacity: 0.1 + ((i * 7) % 10) / 14,
  duration: 2 + ((i * 3) % 3),
  delay: `${(i * 0.4) % 3}s`,
}));

const DynamicBackground = () => {
  const { list, activeId, lightMode } = useAppSelector(state => state.theme as any);
  const teammates = useAppSelector(state => state.teammates.list);
  const activeTeammateId = useAppSelector(state => state.teammates.activeId);
  const active = teammates.find(t => t.id === activeTeammateId);
  const timezone = active?.timezone ?? "UTC";
  const { isDay } = useLocalTime(timezone);
  const isNight = !activeTeammateId || !isDay;

 if (lightMode) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Fondo base más sólido — menos lavanda, más blanco cálido */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, #dde3f5 0%, #eaf0ff 40%, #dfe8ff 70%, #e4dcff 100%)" }}
      />
      {/* Manchas más saturadas para dar profundidad */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 20% 20%, rgba(109,40,217,0.13) 0%, transparent 50%)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 80% 80%, rgba(14,165,233,0.14) 0%, transparent 50%)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 60% 10%, rgba(234,179,8,0.10) 0%, transparent 40%)" }}
      />
    </div>
  );
}

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0f]" />

      {/* Noche */}
      <div
        className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
        style={{ opacity: isNight ? 1 : 0 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(124,58,237,0.18) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(99,38,180,0.12) 0%, transparent 50%)",
          }}
        />
        {STARS.map(star => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              animation: `pulse ${star.duration}s ease-in-out infinite`,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Día */}
      <div
        className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
        style={{ opacity: isNight ? 0 : 1 }}
      >
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(56,189,248,0.45) 0%, rgba(14,165,233,0.20) 35%, rgba(99,179,237,0.08) 60%, transparent 80%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(56,189,248,0.15) 0%, rgba(56,189,248,0.05) 40%, transparent 70%)" }} />
        <div className="absolute" style={{ top: "6%", left: "50%", transform: "translateX(-50%)", width: "140px", height: "140px", borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.35) 0%, rgba(251,191,36,0.12) 50%, transparent 70%)" }} />
        <div className="absolute" style={{ top: "2%", left: "50%", transform: "translateX(-50%)", width: "260px", height: "260px", borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.10) 0%, rgba(56,189,248,0.06) 50%, transparent 70%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 10%, rgba(147,210,255,0.12) 0%, transparent 50%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 80% 10%, rgba(147,210,255,0.10) 0%, transparent 50%)" }} />
      </div>

      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at bottom, rgba(10,10,15,0.8) 0%, transparent 70%)" }} />
    </div>
  );
};

const MobileView = () => {
  const { list, activeId } = useAppSelector(state => state.teammates);
  const lightMode = useAppSelector(state => (state.theme as any).lightMode);

  return (
    <div className="flex flex-col items-center pt-12 px-6 md:hidden">
      <h1 className={`text-4xl font-black tracking-tighter italic ${lightMode ? "text-slate-800" : "text-white/90"}`}>
        CHRONOS
      </h1>
      <p className="text-[9px] text-universe-purple tracking-[0.4em] font-bold mt-2">
        GLOBAL SYNC ACTIVE
      </p>
      <div className="mt-12 w-full max-w-md flex flex-col gap-5">
        {list.map((teammate) => (
          <UserCard
            key={teammate.id}
            id={teammate.id}
            name={teammate.name}
            role={teammate.role}
            location={teammate.location}
            timezone={teammate.timezone}
            city={teammate.city}
            imageUrl={teammate.imageUrl}
            delay={teammate.delay}
            isActive={teammate.id === activeId}
          />
        ))}
      </div>
    </div>
  );
};

// Aplica clase light-mode al body según el estado
const ThemeApplier = () => {
  const lightMode = useAppSelector(state => (state.theme as any).lightMode);
  useEffect(() => {
    if (lightMode) {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }
  }, [lightMode]);
  return null;
};

function App() {
  return (
    <Router>
      <div className="relative min-h-screen flex flex-col pb-32 md:pb-0">
        <ThemeApplier />
        <DynamicBackground />
        <DesktopNav />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <MobileView />
                <OrbitalView />
              </>
            }
          />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;