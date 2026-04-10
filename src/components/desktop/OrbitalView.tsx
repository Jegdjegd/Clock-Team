import { useAppSelector } from "../../hooks/useAppDispatch";
import { CenterCard } from "./CenterCard";
import { OrbitCard } from "./OrbitCard";

// Distribuye los teammates en ángulos alrededor del centro
function getAngles(count: number): number[] {
  if (count === 0) return [];
  if (count === 1) return [0];
  if (count === 2) return [-45, 45];
  if (count === 3) return [-60, 0, 60];
  // Para 4+ reparte en 360 grados evitando la zona inferior (nav)
  return Array.from({ length: count }, (_, i) =>
    -120 + (i * 240) / (count - 1)
  );
}

export const OrbitalView = () => {
  const { list, activeId } = useAppSelector(state => state.teammates);

  const angles = getAngles(list.length);
  const ORBIT_RADIUS = 280;

  return (
    <div className="hidden md:flex flex-1 items-center justify-center relative overflow-hidden">

      {/* Anillos de órbita SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      >
        {[180, 280, 380, 480].map((r, i) => (
          <circle
            key={r}
            cx="50%"
            cy="50%"
            r={r}
            fill="none"
            stroke="rgba(124,58,237,0.08)"
            strokeWidth="1"
            strokeDasharray={i % 2 === 0 ? "4 8" : "2 12"}
          />
        ))}
        {/* Líneas desde el centro a cada teammate */}
        {list.map((_, i) => {
          const rad = (angles[i] * Math.PI) / 180;
          const x2 = 50 + (Math.cos(rad) * ORBIT_RADIUS * 100) / 1200;
          const y2 = 50 + (Math.sin(rad) * ORBIT_RADIUS * 100) / 700;
          return (
            <line
              key={i}
              x1="50%"
              y1="50%"
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="rgba(124,58,237,0.06)"
              strokeWidth="1"
              strokeDasharray="3 6"
            />
          );
        })}
      </svg>

      {/* Card central — tú */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <CenterCard />
      </div>

      {/* Teammates en órbita */}
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
          angle={angles[i]}
          orbitRadius={ORBIT_RADIUS}
        />
      ))}
    </div>
  );
};