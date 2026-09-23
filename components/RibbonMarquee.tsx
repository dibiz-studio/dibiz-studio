export default function RibbonMarquee({
  label,
  times = 14,
  top,
}: {
  label: string;
  times?: number;
  top?: string;
}) {
    return (
    <div className="ribbon-wrap" style={top ? { top } : undefined}>
      <div className="ribbon">
        {[0, 1].map((rep) => (
          <div className="ribbon-group" key={rep} aria-hidden={rep === 1}>
            {Array.from({ length: times }).map((_, i) => (
              <span key={i}>{label} 🔗</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
