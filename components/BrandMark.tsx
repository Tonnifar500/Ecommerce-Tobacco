import { BRANDS } from "@/lib/products";

// A cigar-band style label: the brand's initials in its colour, then its name. Text only, no product imagery.
export default function BrandMark({ brand, size = "sm" }: { brand: string; size?: "sm" | "lg" }) {
  const b = BRANDS[brand] ?? { mark: brand.slice(0, 2).toUpperCase(), color: "#8A5A3B" };
  return (
    <span className={`brand-mark ${size === "lg" ? "lg" : ""}`} style={{ "--brand": b.color } as React.CSSProperties}>
      <span className="mono" aria-hidden="true">{b.mark}</span>
      {brand}
    </span>
  );
}
