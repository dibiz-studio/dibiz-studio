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
        {Array.from({ length: times }).map((_, i) => (
          <span key={i}>{label} 🔗</span>
        ))}
      </div>
    </div>
  );
}
