import { useState, useEffect, useRef } from "react";
import { useAppSelector } from "../../hooks/useAppDispatch";
import { CenterCard } from "./CenterCard";
import { OrbitCard } from "./OrbitCard";

export const OrbitalView = () => {
  const { list, activeId } = useAppSelector(state => state.teammates);
  const [angles, setAngles] = useState<number[]>(() =>
    list.map((_, i) => (360 / Math.max(list.length, 1)) * i)
  );
  const rafRef = useRef<number>(0);
  const ORBIT_RADIUS_X = 310;
  const ORBIT_RADIUS_Y = 105; // más plano — no baja del círculo
  const SPEED = 0.10; // más rápido

  useEffect(() => {
    setAngles(prev => {
      if (prev.length === list.length) return prev;
      return list.map((_, i) => (360 / Math.max(list.length, 1)) * i);
    });
  }, [list.length]);

  useEffect(() => {
    const tick = () => {
      setAngles(prev => prev.map(a => (a + SPEED) % 360));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      className="hidden md:block relative"
      style={{ height: "calc(100vh - 72px)", overflow: "hidden" }}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <ellipse
          cx="50%"
          cy="50%"
          rx={ORBIT_RADIUS_X}
          ry={ORBIT_RADIUS_Y}
          fill="none"
          stroke="rgba(124,58,237,0.28)"
          strokeWidth="1"
          strokeDasharray="6 10"
        />
        <ellipse
          cx="50%"
          cy="50%"
          rx={ORBIT_RADIUS_X - 70}
          ry={ORBIT_RADIUS_Y - 35}
          fill="none"
          stroke="rgba(124,58,237,0.08)"
          strokeWidth="1"
          strokeDasharray="3 14"
        />
        <ellipse
          cx="50%"
          cy="50%"
          rx={ORBIT_RADIUS_X + 80}
          ry={ORBIT_RADIUS_Y + 40}
          fill="none"
          stroke="rgba(124,58,237,0.05)"
          strokeWidth="1"
          strokeDasharray="3 18"
        />
        {angles.map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x2 = Math.cos(rad) * ORBIT_RADIUS_X;
          const y2 = Math.sin(rad) * ORBIT_RADIUS_Y;
          return (
            <line
              key={i}
              x1="50%"
              y1="50%"
              x2={`calc(50% + ${x2}px)`}
              y2={`calc(50% + ${y2}px)`}
              stroke="rgba(124,58,237,0.08)"
              strokeWidth="1"
              strokeDasharray="4 8"
            />
          );
        })}
      </svg>

      {/* Centro — z-index 15 */}
      <div
        className="absolute z-[15]"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CenterCard />
      </div>

      {list.map((teammate, i) => (
        <OrbitCard
          key={teammate.id}
          id={teammate.id}
          name={teammate.name}
          role={teammate.role}
          location={teammate.location}
          timezone={teammate.timezone}
          city={teammate.city}
          imageUrl={teammate.imageUrl}
          isActive={teammate.id === activeId}
          angle={angles[i] ?? 0}
          orbitRadiusX={ORBIT_RADIUS_X}
          orbitRadiusY={ORBIT_RADIUS_Y}
        />
      ))}
    </div>
  );
};