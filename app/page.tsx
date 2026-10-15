import Link from "next/link";
import ImgPh from "@/components/ImgPh";
import ProductCard from "@/components/ProductCard";
import TrustBar from "@/components/TrustBar";
import { getProduct, OCCASION_LABELS, type Occasion } from "@/lib/products";

const steps = [
  { n: "1", title: "Choose with our guide", body: "Answer three simple questions or browse beginner picks. Every cigar term is explained in plain language." },
  { n: "2", title: "We verify your age", body: "A quick MitID check at checkout keeps things safe and legal. Adults 18+ only." },
  { n: "3", title: "Fresh to your door", body: "Stored in a humidor, shipped fresh in 1–3 working days, with a care guide so you know what to do next." },
];

const quotes = [
  { text: "I had no idea where to begin for my dad’s 60th. The guide picked a cigar in five minutes and he loved it.", who: "Mikkel, Aarhus" },
  { text: "Everything was explained without making me feel silly. It arrived perfectly fresh.", who: "Sofie, Copenhagen" },
  { text: "The starter trio let me find out what I like. Honest descriptions, and they were right.", who: "Jonas, Odense" },
];

const pickIds = [1, 5, 9, 2];
const ic = { fill: "none", stroke: "#8A5A3B", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const cardLink = { textDecoration: "none", color: "#2A1A12", padding: 28, display: "flex", flexDirection: "column", gap: 12 } as const;

export default function Home() {
  return (
    <>
      <section className="wrap" style={{ paddingTop: 56, paddingBottom: 48 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center" }}>
          <div style={{ flex: "1 1 440px", minWidth: 0, display: "flex", flexDirection: "column", gap: 22 }}>
            <span className="eyebrow">A Danish cigar shop for first-timers</span>
            <h1>Your first cigar, chosen for you.</h1>
            <hr className="rule-l" />
            <p style={{ fontSize: 21, maxWidth: 520, color: "#3d2a20" }}>Simple guidance, honest descriptions and fresh delivery.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 6 }}>
              <Link className="btn btn-primary" href="/guide" data-funnel="engagement:start-here">Start Here – New to cigars?</Link>
              <Link className="btn btn-ghost" href="/shop" data-funnel="awareness:browse-all">Browse all cigars</Link>
            </div>
            <p style={{ fontSize: 15, color: "#5a4435" }}>No jargon, no pressure. If a word is new, we explain it.</p>
          </div>
          <ImgPh
            alt="Photo slot: a cigar resting on a crystal ashtray in soft window light"
            label="Photo slot – a cigar resting on a crystal ashtray in soft window light, warm afternoon tones"
            style={{ flex: "1 1 380px", minHeight: 460, borderRadius: "220px 220px 18px 18px", border: "2px solid #C8963E", outline: "1px solid #C8963E", outlineOffset: 6 }}
          />
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 64 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}><h2>Where do you want to start?</h2></div>
        <div className="g-3">
          <Link href="/guide" className="card" style={cardLink} data-funnel="engagement:new-to-cigars">
            <svg width="34" height="34" viewBox="0 0 24 24" {...ic} aria-hidden="true"><path d="M2 5.5C5 4 8.5 4 12 6c3.5-2 7-2 10-.5V19c-3-1.5-6.5-1.5-10 .5-3.5-2-7-2-10-.5z" /><path d="M12 6v13.5" /></svg>
            <h3>I’m new to cigars</h3>
            <p>A three-minute guide to strength, flavour and the words people use, plus a short quiz.</p>
            <span style={{ fontWeight: 700, color: "#8A5A3B" }}>Read the Beginner Guide →</span>
          </Link>
          <Link href="/shop" className="card" style={cardLink}>
            <svg width="34" height="34" viewBox="0 0 24 24" {...ic} aria-hidden="true"><rect x="3" y="8" width="18" height="13" rx="2" /><path d="M12 8v13M3 13h18M12 8c-2.5 0-4-1-4-2.5S9.5 3 12 8c2.5-5 4-3.5 4-2" /></svg>
            <h3>Shop by occasion</h3>
            <p>Celebrating, gifting or just unwinding? We’ll show cigars that suit the moment.</p>
            <span style={{ fontWeight: 700, color: "#8A5A3B" }}>Open the Finder →</span>
          </Link>
          <Link href="/shop#packs" className="card" style={cardLink}>
            <svg width="34" height="34" viewBox="0 0 24 24" {...ic} aria-hidden="true"><rect x="3" y="9" width="18" height="11" rx="2" /><path d="M3 13h18M8 9V6h8v3" /></svg>
            <h3>Starter &amp; sampler packs</h3>
            <p>Three or four hand-picked cigars in one box, so you can find what you like.</p>
            <span style={{ fontWeight: 700, color: "#8A5A3B" }}>See the packs →</span>
          </Link>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 64 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "center", textAlign: "center" }}>
          <span className="eyebrow">Shop by occasion</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            {(Object.keys(OCCASION_LABELS) as Occasion[]).map((o) => (
              <Link key={o} className="chip" href={`/shop?occ=${o}`}>{OCCASION_LABELS[o]}</Link>
            ))}
          </div>
        </div>
      </section>

      <hr className="rule" />

      <section className="wrap sec">
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "end", gap: 16, marginBottom: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span className="eyebrow">Our beginner picks</span>
            <h2>Smooth, gentle and easy to enjoy</h2>
          </div>
          <Link className="btn btn-ghost btn-sm" href="/shop?chip=beginner">See all beginner picks</Link>
        </div>
        <div className="g-4">
          {pickIds.map((id) => <ProductCard key={id} p={getProduct(id)!} />)}
        </div>
      </section>

      <section className="dark-sec on-dark">
        <div className="wrap sec">
          <div style={{ textAlign: "center", marginBottom: 40, display: "flex", flexDirection: "column", gap: 10 }}>
            <span className="eyebrow">How it works</span>
            <h2>From “where do I start?” to your door</h2>
          </div>
          <div className="g-3">
            {steps.map((s) => (
              <div key={s.n} style={{ display: "flex", flexDirection: "column", gap: 10, padding: "8px 8px 8px 0" }}>
                <span style={{ fontFamily: "var(--serif)", fontSize: 56, color: "#C8963E", lineHeight: 1 }}>{s.n}</span>
                <h3>{s.title}</h3>
                <p style={{ color: "#E8DCC6" }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap sec">
        <div style={{ textAlign: "center", marginBottom: 28, display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
          <span className="eyebrow">Why people trust First Draw</span>
          <h2>Fresh, guaranteed and age-checked</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ fontFamily: "var(--serif)", fontSize: 34 }}>4.8</span>
            <span className="star" style={{ fontSize: 22, letterSpacing: 2 }} aria-hidden="true">★★★★★</span>
            <span style={{ color: "#5a4435" }}>average from customers (demo data)</span>
          </div>
        </div>
        <TrustBar />
        <div className="g-3" style={{ marginTop: 36 }}>
          {quotes.map((q) => (
            <figure key={q.who} className="card" style={{ margin: 0, padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
              <span className="star" role="img" aria-label="5 out of 5 stars" style={{ letterSpacing: 2 }}>★★★★★</span>
              <blockquote style={{ margin: 0, fontSize: 18 }}>{q.text}</blockquote>
              <figcaption style={{ fontWeight: 700, color: "#8A5A3B" }}>{q.who}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 80 }}>
        <div className="card card-gold" style={{ padding: 0, overflow: "hidden", display: "flex", flexWrap: "wrap" }}>
          <ImgPh alt="Photo slot: hands holding an unlit cigar beside a cutter" label="Photo slot – hands holding an unlit cigar beside a cutter, shallow focus" style={{ flex: "1 1 320px", minHeight: 280 }} />
          <div style={{ flex: "1 1 380px", padding: 40, display: "flex", flexDirection: "column", gap: 16, justifyContent: "center" }}>
            <span className="eyebrow">From the guide</span>
            <h2>How to choose your first cigar in 3 minutes</h2>
            <p>Strength, flavour, size and the three words you need to know. Then a three-question quiz that ends with a short list made for you.</p>
            <div><Link className="btn btn-primary" href="/guide" data-funnel="awareness:guide-to-shop">Read the guide</Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
