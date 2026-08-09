import type { ReactNode } from "react";

export default function Marquee({
  items,
  speed = 28,
  className = "py-6",
  gap = "gap-14",
}: {
  items: ReactNode[];
  speed?: number;
  className?: string;
  gap?: string;
}) {
  const track = [...items, ...items];

  return (
    <div
      className={`relative overflow-hidden ${className} [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]`}
    >
      <div
        className={`flex items-center ${gap} w-max`}
        style={{ animation: `marquee-scroll ${speed}s linear infinite` }}
      >
        {track.map((item, i) => (
          <div key={i} className="flex items-center gap-3 text-text-dim shrink-0">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
