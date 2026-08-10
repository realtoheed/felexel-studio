import PopIn from "./PopIn";
import WarningTicker from "./WarningTicker";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <>
      <section className="relative px-6 pt-48 pb-16 text-center overflow-hidden">
        <div
          className="absolute -inset-[20%] -z-10 blur-[70px]"
          style={{
            background:
              "radial-gradient(circle at 25% 20%, rgba(139,92,246,.28), transparent 45%), radial-gradient(circle at 75% 40%, rgba(124,58,237,.22), transparent 45%)",
          }}
        />
        <PopIn variant="pop" delay={0}>
          <p className="text-[13px] font-semibold tracking-[0.15em] text-accent-3 mb-[18px]">
            {eyebrow}
          </p>
        </PopIn>
        <PopIn variant="bounce" delay={0.1}>
          <h1 className="text-[clamp(32px,5vw,54px)] font-semibold mb-4 max-w-[820px] mx-auto">
            {title}
          </h1>
        </PopIn>
        {subtitle && (
          <PopIn variant="up" delay={0.25}>
            <p className="text-lg text-text-dim max-w-[640px] mx-auto">
              {subtitle}
            </p>
          </PopIn>
        )}
      </section>
      <WarningTicker />
    </>
  );
}
