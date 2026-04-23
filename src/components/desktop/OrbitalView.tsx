import { useState, useEffect, useRef } from "react";
import { useAppSelector } from "../../hooks/useAppDispatch";
import { CenterCard } from "./CenterCard";
import { OrbitCard } from "./OrbitCard";

export const OrbitalView = () => {
  const { list, activeId } = useAppSelector(state => state.teammates);

  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const [size, setSize] = useState({ width: 0, height: 0 });

  const [angles, setAngles] = useState<number[]>(() =>
    list.map((_, i) => (360 / Math.max(list.length, 1)) * i)
  );

  const SPEED = 0.10;

  // 📐 ResizeObserver → tamaño responsivo
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 🔄 Recalcular ángulos si cambia la lista
  useEffect(() => {
    setAngles(prev => {
      if (prev.length === list.length) return prev;
      return list.map((_, i) => (360 / Math.max(list.length, 1)) * i);
    });
  }, [list.length]);

  // 🎯 Animación orbital
  useEffect(() => {
    const tick = () => {
      setAngles(prev => prev.map(a => (a + SPEED) % 360));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // 📏 Radios responsivos (con límites)
  const baseRadiusX = Math.min(Math.max(size.width * 0.35, 250), 500);
  const baseRadiusY = Math.min(Math.max(size.height * 0.25, 120), 250);

  const INNER_RADIUS_X = baseRadiusX * 0.8;
  const INNER_RADIUS_Y = baseRadiusY * 0.8;

  const ORBIT_RADIUS_X = baseRadiusX;
  const ORBIT_RADIUS_Y = baseRadiusY;

  const OUTER_RADIUS_X = baseRadiusX * 1.2;
  const OUTER_RADIUS_Y = baseRadiusY * 1.2;

  return (
    <div
      ref={containerRef}
      className="hidden md:block relative"
      style={{ height: "calc(100vh - 72px)", overflow: "hidden" }}
    >
      <svg
        className="absolute inset-7 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      >
        {/* Elipse interior */}
        <ellipse
          cx="50%"
          cy="50%"
          rx={INNER_RADIUS_X}
          ry={INNER_RADIUS_Y}
          fill="none"
          strokeWidth="1"
          strokeDasharray="3 14"
        />

        {/* Elipse principal */}
        <ellipse
          cx="50%"
          cy="50%"
          rx={ORBIT_RADIUS_X}
          ry={ORBIT_RADIUS_Y}
          fill="none"
          stroke="rgba(124,58,237,0.25)"
          strokeWidth="1"
          strokeDasharray="3 2"
        />

        {/* Elipse exterior */}
        <ellipse
          cx="50%"
          cy="50%"
          rx={OUTER_RADIUS_X}
          ry={OUTER_RADIUS_Y}
          fill="none"
          stroke="rgba(249, 249, 249, 0.25)"
          strokeWidth="2"
          strokeDasharray="3 5"
        />

        {/* Líneas hacia el elipse exterior */}
        {angles.map((angle, i) => {
          const rad = (angle * Math.PI) / 180;

          const x2 = Math.cos(rad) * OUTER_RADIUS_X;
          const y2 = Math.sin(rad) * OUTER_RADIUS_Y;

          return (
            <line
              key={i}
              x1="50%"
              y1="50%"
              x2={`calc(50% + ${x2}px)`}
              y2={`calc(50% + ${y2}px)`}
              stroke="rgba(255, 255, 255, 0.14)"
              strokeWidth="1"
              strokeDasharray="2 3"
            />
          );
        })}
      </svg>

      {/* Centro */}
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

      {/* Órbitas */}
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