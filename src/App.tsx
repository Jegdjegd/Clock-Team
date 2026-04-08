import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { BottomNav } from "./components/BottomNav.tsx";

// Componente temporal para la vista principal
const OrbitView = () => (
  <div className="flex flex-col items-center pt-10 px-6">
    <h1 className="text-3xl font-black tracking-tighter italic text-white/90">CHRONOS</h1>
    <p className="text-xs text-universe-purple tracking-[0.3em] font-bold mt-2">GLOBAL SYNC ACTIVE</p>
    
    {/* Aquí vendrán las Cards flotantes en el siguiente paso */}
    <div className="mt-20 w-full flex flex-col gap-6">
       <p className="text-center text-white/30 text-sm">Waiting for connection...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="relative min-h-screen pb-24">
        <Routes>
          <Route path="/" element={<OrbitView />} />
        </Routes>

        <BottomNav />
      </div>
    </Router>
  );
}

export default App;