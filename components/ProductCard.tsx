"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { STRENGTH_BG, STRENGTH_LABELS, type Product } from "@/lib/products";
import Flag from "./Flag";
import StrengthMeter from "./StrengthMeter";

export default function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const alt = `Photo slot – ${p.name} resting on a wooden tray in soft light`;

  return (
    <article className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}>
      <Link href={`/product/${p.slug}`} tabIndex={-1} aria-hidden="true" style={{ display: "block" }}>
        <div className="img-ph" role="img" aria-label={alt} style={{ height: 190, background: STRENGTH_BG[p.strength] }}>
          <div style={{ position: "absolute", top: 12, left: 12, display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
            {p.beginner && <span className="badge">Beginner-friendly</span>}
            {p.strength <= 2 && <span className="badge badge-ember">Mild &amp; smooth</span>}
          </div>
          <div className="cap">{alt}</div>
        </div>
      </Link>
      <div style={{ padding: "18px 18px 20px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <div>
          <div className="eyebrow" style={{ fontSize: 12 }}>{p.brand}</div>
          <h3 style={{ fontSize: 21, marginTop: 2 }}>
            <Link href={`/product/${p.slug}`} style={{ color: "#2A1A12", textDecoration: "none" }}>{p.name}</Link>
          </h3>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14.5, color: "#3d2a20" }}>
          <Flag country={p.country} />
          <span>{p.country}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
          <StrengthMeter value={p.strength} />
          <span style={{ fontWeight: 600 }}>{STRENGTH_LABELS[p.strength]}</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {p.notes.map((n) => (
            <span key={n} className="tag">{n}</span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14.5 }}>
          <span className="star" aria-hidden="true">★</span>
          <span aria-label={`Rated ${p.rating.toFixed(1)} out of 5`}>{p.rating.toFixed(1)}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginTop: "auto", paddingTop: 6 }}>
          <span style={{ fontFamily: "var(--serif)", fontSize: 24, fontWeight: 600 }}>
            {p.price} <span style={{ fontSize: 14, fontFamily: "var(--sans)" }}>DKK</span>
          </span>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            style={{ minWidth: 104 }}
            onClick={() => {
              add(p.id);
              setAdded(true);
              setTimeout(() => setAdded(false), 1600);
            }}
            aria-label={added ? `${p.name} added to cart` : `Quick add ${p.name} to cart`}
          >
            {added ? "Added" : "Quick add"}
          </button>
        </div>
      </div>
    </article>
  );
}
