import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Quiz from "@/components/Quiz";
import Term from "@/components/Term";
import { getProduct } from "@/lib/products";

export const metadata: Metadata = { title: "How to choose your first cigar", description: "A three-minute beginner guide to cigar strength, flavour, size and the words you need to know." };

const toc = [["what", "Cigar or cigarillo?"], ["strength", "Strength explained"], ["flavour", "Flavour notes"], ["words", "Glossary"], ["time", "How long it takes"], ["occasion", "Which occasion"], ["quiz", "Find my first cigar"], ["picks", "Our 3 safest picks"]];
const strengths: [number, string, string][] = [
  [1, "Mild", "Light and creamy, like a gentle tea. The easiest place to start."],
  [2, "Mild–Medium", "A little more flavour, still smooth. Our favourite for first-timers."],
  [3, "Medium", "Noticeable body and richer notes such as cocoa or toasted nuts."],
  [4, "Medium–Full", "Bold and peppery. Better once you know your taste."],
  [5, "Full", "Very strong, with lots of pepper and dark roast. Save it for later."],
];
const flavours = [
  ["Sweet & creamy", "Think honey, vanilla, butter or warm milk. Smooth and friendly."],
  ["Woody & nutty", "Cedar, toasted nuts and toast. Like a pencil-shaving smell, but nicer."],
  ["Spicy", "A tingle of black pepper or nutmeg on the tongue."],
  ["Earthy", "Rich, soil-like and dry, a bit like a forest after rain."],
  ["Coffee & cocoa", "Dark chocolate, espresso and roast. Deep and satisfying."],
];
const sizes = [
  ["Petit corona", "25–35 min", "A first try, or a short break"],
  ["Corona", "40–50 min", "A relaxed afternoon"],
  ["Robusto", "45–60 min", "The classic choice for most occasions"],
  ["Toro", "60–90 min", "A long evening with company"],
  ["Churchill", "90–120 min", "A celebration with nowhere to be"],
];
const occasions = [
  ["Celebration", "Something smooth with a sense of occasion.", "See the Celebration Churchill →", "/product/celebration-churchill"],
  ["Gift", "Easy-going and nicely presented, or a boxed set.", "See the Gift Celebration Box →", "/shop#packs"],
  ["Relaxing evening", "Medium body, coffee and cocoa notes.", "See evening picks →", "/shop?occ=relax"],
  ["Outdoors / with friends", "Shorter smokes that are easy to share a moment with.", "See short smokes →", "/shop?occ=out"],
  ["First-time try", "Mild, creamy and forgiving.", "See the Starter Trio →", "/shop#packs"],
];

const sec = { display: "flex", flexDirection: "column", gap: 16 } as const;

export default function GuidePage() {
  return (
    <>
      <section className="wrap" style={{ paddingTop: 48, paddingBottom: 24 }}>
        <div style={{ maxWidth: 760, display: "flex", flexDirection: "column", gap: 16 }}>
          <span className="eyebrow">Beginner Guide</span>
          <h1 style={{ fontSize: "clamp(34px,4.6vw,56px)" }}>How to choose your first cigar</h1>
          <hr className="rule-l" />
          <p style={{ fontSize: 20, color: "#3d2a20" }}>Three minutes, no jargon. By the end you’ll know what to look for, what the words mean and which cigar suits your moment. Nobody is born knowing this.</p>
        </div>
      </section>

      <div className="wrap" style={{ paddingBottom: 64 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 40, alignItems: "flex-start" }}>
          <nav className="toc" aria-label="In this guide" style={{ flex: "0 0 250px", position: "sticky", top: 16, alignSelf: "flex-start", display: "flex", flexDirection: "column", gap: 2, maxWidth: "100%" }}>
            <span className="eyebrow" style={{ marginBottom: 8 }}>In this guide</span>
            {toc.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </nav>

          <article style={{ flex: "1 1 560px", minWidth: 0, display: "flex", flexDirection: "column", gap: 56 }}>
            <section id="what" style={{ ...sec, gap: 14 }}>
              <h2>A cigar or a cigarillo?</h2>
              <p>A cigar is rolled from whole tobacco leaves and is meant to be sipped slowly, never inhaled. It usually takes 30 minutes to two hours. A cigarillo is a small, thin cigar, often machine-made and flavoured, and is over in about 10 minutes.</p>
              <p>First Draw sells <strong>premium cigars</strong>: hand-rolled, aged and kept in a humidor. They’re about taking your time, not about nicotine hits. Take the smoke into your mouth, taste it, and let it out.</p>
            </section>

            <section id="strength" style={sec}>
              <h2>Strength, from mild to full</h2>
              <p>Strength is how much body and punch a cigar has. For a first cigar, start at 1–3. You can always go stronger next time, but you can’t un-feel a cigar that was too much.</p>
              <div className="card" style={{ padding: "8px 22px" }}>
                {strengths.map(([n, label, body]) => (
                  <div key={n} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 18px", padding: "14px 0", borderBottom: "1px solid #E4D7C2" }}>
                    <div style={{ flex: "0 0 190px", display: "flex", alignItems: "center", gap: 10 }}>
                      <span className="meter" role="img" aria-label={`Strength ${n} of 5`}>{[1, 2, 3, 4, 5].map((i) => <span key={i} className={`seg ${i <= n ? "on" : ""}`} />)}</span>
                      <strong>{label}</strong>
                    </div>
                    <span style={{ flex: "1 1 260px" }}>{body}</span>
                  </div>
                ))}
              </div>
            </section>

            <section id="flavour" style={sec}>
              <h2>Flavour notes in plain language</h2>
              <p>You’ll see words like “cedar” or “leather” on a label. They describe what your mouth may notice, a bit like tasting notes on coffee or wine. Here are the five families we use.</p>
              <div className="g-3" style={{ gap: 16 }}>
                {flavours.map(([n, b]) => (
                  <div key={n} className="card" style={{ padding: 18, display: "flex", flexDirection: "column", gap: 6 }}>
                    <h3 style={{ fontSize: 19 }}>{n}</h3>
                    <p style={{ fontSize: 15.5 }}>{b}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="words" style={sec}>
              <h2>Words you’ll see (and what they mean)</h2>
              <p style={{ color: "#5a4435", fontSize: 15.5 }}>Hover or tap a dotted word for a short explanation.</p>
              <div className="card" style={{ padding: 22, display: "flex", flexDirection: "column", gap: 14, lineHeight: 2 }}>
                <p><Term tip="The outer leaf you see and touch. It adds a lot of the flavour.">Wrapper</Term> · <Term tip="A darker, sweeter wrapper leaf, aged longer. Often tastes of cocoa.">Maduro</Term> · <Term tip="A light golden wrapper, usually soft and creamy.">Connecticut</Term></p>
                <p><Term tip="The leaf that holds the inside together.">Binder</Term> · <Term tip="The tobacco in the middle. It sets most of the strength.">Filler</Term> · <Term tip="A popular size, about 12 cm long and a bit thicker than a pen.">Robusto</Term></p>
                <p><Term tip="How thick the cigar is, in 64ths of an inch. 50 is about 2 cm.">Ring gauge</Term> · <Term tip="The cigar world’s word for a shape and size, such as Robusto or Toro.">Vitola</Term> · <Term tip="A wooden box that keeps cigars at the right humidity so they stay fresh.">Humidor</Term></p>
              </div>
            </section>

            <section id="time" style={sec}>
              <h2>How long will it take?</h2>
              <p>Bigger cigars last longer. Give yourself time and don’t rush; a cigar that’s puffed too fast turns bitter.</p>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 440 }}>
                  <thead><tr style={{ textAlign: "left", borderBottom: "2px solid #C8963E" }}><th style={{ padding: "10px 8px" }}>Size</th><th style={{ padding: "10px 8px" }}>Roughly</th><th style={{ padding: "10px 8px" }}>Good for</th></tr></thead>
                  <tbody>
                    {sizes.map(([n, t, u]) => (
                      <tr key={n} style={{ borderBottom: "1px solid #E4D7C2" }}><td style={{ padding: "12px 8px", fontWeight: 600 }}>{n}</td><td style={{ padding: "12px 8px" }}>{t}</td><td style={{ padding: "12px 8px" }}>{u}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="occasion" style={sec}>
              <h2>Which cigar for which occasion?</h2>
              <div>
                {occasions.map(([n, b, l, href]) => (
                  <div key={n} style={{ display: "flex", flexWrap: "wrap", gap: "6px 24px", padding: "16px 0", borderBottom: "1px solid #E4D7C2" }}>
                    <strong style={{ flex: "0 0 190px" }}>{n}</strong>
                    <span style={{ flex: "1 1 260px" }}>{b} <Link href={href}>{l}</Link></span>
                  </div>
                ))}
              </div>
            </section>

            <Quiz />

            <section id="picks" style={{ ...sec, gap: 18 }}>
              <h2>Our 3 safest first picks</h2>
              <p>If you’d rather skip the quiz, these three are gentle, smooth and well liked.</p>
              <div className="g-3" style={{ gap: 20 }}>{[5, 1, 9].map((id) => <ProductCard key={id} p={getProduct(id)!} />)}</div>
            </section>

            <section className="on-dark" style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start", padding: 36, borderRadius: 16, background: "#2A1A12", color: "#F6EFE3" }}>
              <h2>Ready to look around?</h2>
              <p style={{ color: "#E8DCC6", maxWidth: 520 }}>Our shop lets you filter by strength, flavour and occasion, and every filter comes with a plain-English hint.</p>
              <Link className="btn btn-gold" href="/shop" data-funnel="consideration:guide-to-finder" style={{ color: "#2A1A12" }}>Browse all cigars</Link>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}
