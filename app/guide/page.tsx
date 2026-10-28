import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Quiz from "@/components/Quiz";
import Term from "@/components/Term";
import { getProduct } from "@/lib/products";

export const metadata: Metadata = {
  title: "How to Smoke a Cigar: Beginner’s Guide",
  description: "How to smoke a cigar, step by step: choosing a cigar for beginners, how to cut and light it, and why you don’t inhale. Plain language, no jargon.",
};

const toc = [["what", "Cigar or cigarillo?"], ["strength", "Strength explained"], ["flavour", "Flavour notes"], ["words", "Glossary"], ["time", "How long it takes"], ["occasion", "Which occasion"], ["quiz", "Find my first cigar"], ["picks", "Our 3 safest picks"], ["how-to-smoke-a-cigar", "How to smoke a cigar"], ["faq", "Quick answers"]];
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

// [anchor id, heading, text]. The ids let other pages link to a single step.
const steps = [
  ["", "Set aside time", "A cigar is not something to rush. Choose a calm moment and a mild cigar for your first try."],
  ["how-to-cut-a-cigar", "Cut the cap", "Use a sharp guillotine cutter and cut only the rounded cap, about 2–3 mm from the tip. Cutting too deep can make the wrapper unravel."],
  ["how-to-light-a-cigar", "Toast the foot", "Hold the open end just above the flame (without touching it) and turn it slowly until the edge glows evenly. Use a soft-flame lighter, a wooden match or a cedar spill. Avoid lighters that give off a strong fuel taste."],
  ["", "Light it gently", "Take a few soft puffs while turning the cigar until it is evenly lit."],
  ["", "Smoke slowly, and don’t inhale", "Draw the smoke into your mouth, taste it, and let it out. Cigar smoke is not inhaled into the lungs like cigarette smoke. Take a puff every 30–60 seconds, since puffing too fast makes the cigar bitter and hot."],
  ["", "Let the ash fall, and put it down", "Tap the ash gently into an ashtray when it gets long. When you are done, leave the cigar in the ashtray and let it go out by itself instead of crushing it."],
];
// Shown on the page and as FAQPage structured data (JSON-LD) for search engines.
const faq = [
  ["Do you inhale cigars?", "No. You draw the smoke into your mouth, taste it and let it out. Cigar smoke is not inhaled into the lungs like cigarette smoke."],
  ["How do you cut a cigar?", "Use a sharp guillotine cutter and cut only the rounded cap, about 2–3 mm from the tip. Cutting deeper can make the wrapper unravel."],
  ["How do you light a cigar?", "Toast the open end just above a soft flame, turning it until the edge glows evenly. Then take a few gentle puffs while turning the cigar until it is evenly lit."],
];
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

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
              <p>First Draw sells <strong>premium cigars</strong>: hand-rolled, aged and kept in a humidor. They’re about taking your time, not about nicotine hits. Draw the smoke into your mouth, taste it, and let it out: it stays in your mouth and is not inhaled into the lungs.</p>
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

            <section style={sec}>
              <h2 id="how-to-smoke-a-cigar">How to enjoy your first cigar in 6 steps</h2>
              <p>Here’s how to smoke a cigar, calmly and step by step. For a first time, choose a mild cigar for beginners. Our <Link href="/shop#first-draw-starter-set">First Draw Starter Set</Link> has three mild cigars and the simple tools you need, or you can <Link href="/shop">browse all cigars</Link>.</p>
              <ol className="card" style={{ listStyle: "none", margin: 0, padding: "8px 22px" }}>
                {steps.map(([id, title, body], i) => (
                  <li key={title} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "16px 0", borderBottom: i < steps.length - 1 ? "1px solid #E4D7C2" : undefined }}>
                    <span className="stepno" aria-hidden="true">{i + 1}</span>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <h3 id={id || undefined} style={{ fontSize: 20, scrollMarginTop: 16 }}>{title}</h3>
                      <p>{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p style={{ fontWeight: 600 }}>Cigars are for adults (18+) and are not risk-free.</p>
            </section>

            <section id="faq" style={sec}>
              <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
              <h2>Quick answers for beginners</h2>
              <div className="card" style={{ padding: "8px 22px" }}>
                {faq.map(([q, a], i) => (
                  <div key={q} style={{ display: "flex", flexDirection: "column", gap: 4, padding: "16px 0", borderBottom: i < faq.length - 1 ? "1px solid #E4D7C2" : undefined }}>
                    <h3 style={{ fontSize: 20 }}>{q}</h3>
                    <p>{a}</p>
                  </div>
                ))}
              </div>
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
