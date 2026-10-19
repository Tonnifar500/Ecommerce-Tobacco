"use client";

import { useState } from "react";
import { photoBg } from "@/lib/products";

const BGS = [
  "linear-gradient(135deg,#7a4f33,#D9A85A)",
  "linear-gradient(135deg,#8A5A3B,#E3B867)",
  "linear-gradient(135deg,#432a1d,#8A5A3B)",
  "linear-gradient(135deg,#2A1A12,#A63A24)",
];

export default function Gallery({ name, beginner, image }: { name: string; strength: number; beginner: boolean; image?: { src: string; alt: string } }) {
  const [i, setI] = useState(0);
  const caps = [
    `${name} resting on a crystal ashtray in soft window light`,
    "Close-up of the golden wrapper leaf and the gold-and-ember band",
    "Cigars lying in an open cedar humidor, a wisp of smoke above",
    "Two friends sharing a quiet evening on a balcony, cigars glowing",
  ];
  const bgs = image ? [photoBg(image.src), ...BGS.slice(1)] : BGS;
  const isPhoto = image && i === 0;
  return (
    <div style={{ flex: "1 1 440px", minWidth: 0, display: "flex", flexDirection: "column", gap: 14 }}>
      <div className="img-ph" role="img" aria-label={isPhoto ? image.alt : caps[i]} style={{ aspectRatio: "1/1", maxHeight: 600, width: "100%", borderRadius: 16, background: bgs[i] }}>
        {beginner && <div style={{ position: "absolute", top: 14, left: 14 }}><span className="badge">Beginner-friendly</span></div>}
        {!isPhoto && <div className="cap">Photo slot – {caps[i]}</div>}
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        {bgs.map((bg, n) => (
          <button key={n} type="button" onClick={() => setI(n)} aria-label={`Show photo ${n + 1}`} aria-pressed={i === n} style={{ flex: 1, aspectRatio: "1/1", minHeight: 64, borderRadius: 10, border: `3px solid ${i === n ? "#A63A24" : "transparent"}`, background: bg, cursor: "pointer", padding: 0 }} />
        ))}
      </div>
    </div>
  );
}
