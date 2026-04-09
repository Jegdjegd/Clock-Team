import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BottomNav } from "./components/BottomNav";
import { UserCard } from "./components/UserCard";
import { useAppSelector } from "./hooks/useAppDispatch";

const OrbitView = () => {
  const { list, activeId } = useAppSelector(state => state.teammates);

  return (
    <div className="flex flex-col items-center pt-12 px-6">
      <h1 className="text-4xl font-black tracking-tighter italic text-white/90">ClockTeam "En construcción"</h1>
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
            imageUrl={teammate.imageUrl}
            delay={teammate.delay}
            isActive={teammate.id === activeId}
          />
        ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="relative min-h-screen pb-32">
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-universe-purple/10 via-universe-dark to-universe-dark -z-10" />
        <Routes>
          <Route path="/" element={<OrbitView />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;