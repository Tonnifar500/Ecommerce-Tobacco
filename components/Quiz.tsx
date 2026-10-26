"use client";

import Link from "next/link";
import { useState } from "react";
import { OCCASION_LABELS, products, type Occasion } from "@/lib/products";
import ProductCard from "./ProductCard";

type Power = "gentle" | "medium" | "fuller";
type Taste = "sweet" | "woody" | "creamy";

const Q2: [Power, string][] = [["gentle", "Gentle and smooth"], ["medium", "A bit more body"], ["fuller", "Fuller and bolder"]];
const Q3: [Taste, string][] = [["sweet", "Sweet"], ["woody", "Woody"], ["creamy", "Creamy"]];

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [occ, setOcc] = useState<Occasion | null>(null);
  const [power, setPower] = useState<Power | null>(null);
  const [taste, setTaste] = useState<Taste | null>(null);

  const results =
    step === 3
      ? products
          .map((p) => {
            let s = 0;
            if (occ && p.occasions.includes(occ)) s += 2;
            if (taste && p.profile[taste] >= 3) s += 2;
            if (power === "gentle") s += p.strength <= 2 ? 3 : 0;
            if (power === "medium") s += p.strength === 3 ? 3 : p.strength === 2 ? 1 : 0;
            if (power === "fuller") s += p.strength === 4 ? 3 : p.strength === 3 ? 1 : 0;
            if (p.beginner) s += 1;
            return { p, s };
          })
          .sort((a, b) => b.s - a.s || a.p.strength - b.p.strength)
          .slice(0, 3)
          .map((r) => r.p)
      : [];

  const restart = () => { setStep(0); setOcc(null); setPower(null); setTaste(null); };
  const opt = (label: string, on: boolean, pick: () => void) => (
    <button key={label} type="button" className={`chip ${on ? "on" : ""}`} aria-pressed={on} onClick={pick} style={{ minHeight: 52, padding: "0 22px", fontSize: 17 }}>{label}</button>
  );

  return (
    <section id="quiz" className="card card-gold" style={{ padding: 32, display: "flex", flexDirection: "column", gap: 20, background: "#FBF3E0" }}>
      <span className="eyebrow">Find my first cigar</span>
      {step < 3 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <span style={{ fontWeight: 600, color: "#5a4435" }}>Question {step + 1} of 3</span>
            {step > 0 && <button type="button" className="chip" onClick={() => setStep(step - 1)}>Back</button>}
          </div>
          <h3 style={{ fontSize: 28 }}>{["What’s the occasion?", "How strong would you like it?", "Which taste sounds best?"][step]}</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {step === 0 && (Object.keys(OCCASION_LABELS) as Occasion[]).map((o) => opt(OCCASION_LABELS[o], occ === o, () => { setOcc(o); setStep(1); }))}
            {step === 1 && Q2.map(([k, l]) => opt(l, power === k, () => { setPower(k); setStep(2); }))}
            {step === 2 && Q3.map(([k, l]) => opt(l, taste === k, () => { setTaste(k); setStep(3); }))}
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h3 style={{ fontSize: 28 }}>Your short list</h3>
          <p>Based on your answers, these are the best places to begin. All are beginner-friendly where possible.</p>
          <div className="g-3" style={{ gap: 20 }}>{results.map((p) => <ProductCard key={p.id} p={p} />)}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Link className="btn btn-primary" href="/shop" data-funnel="consideration:quiz-to-finder">Browse all cigars</Link>
            <button type="button" className="btn btn-ghost" onClick={restart}>Start over</button>
          </div>
        </div>
      )}
    </section>
  );
}
