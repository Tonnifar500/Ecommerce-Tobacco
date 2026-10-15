import { STRENGTH_LABELS } from "@/lib/products";

export default function StrengthMeter({ value, showLabel = false }: { value: number; showLabel?: boolean }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <span className="meter" role="img" aria-label={`Strength ${value} of 5`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={`seg ${i <= value ? "on" : ""}`} />
        ))}
      </span>
      {showLabel && <strong>{STRENGTH_LABELS[value]}</strong>}
    </span>
  );
}
