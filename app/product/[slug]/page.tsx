import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import BuyBox from "@/components/BuyBox";
import Flag from "@/components/Flag";
import Gallery from "@/components/Gallery";
import ProductCard from "@/components/ProductCard";
import StrengthMeter from "@/components/StrengthMeter";
import TrustBar from "@/components/TrustBar";
import { DELIVERY_FEE, FREE_DELIVERY_FROM, OCCASION_LABELS, ORIGIN_STORIES, VITOLA_EXPLAINED, getProductBySlug, packs, products, recommendFor, reviewsFor } from "@/lib/products";

// All 14 product pages are prerendered; skip the dev-only instant-navigation check for the dynamic slug.
export const instant = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  return p ? { title: `${p.name} – ${p.brand}`, description: p.blurb } : {};
}

const PROFILE_LABELS = [["sweet", "Sweet"], ["creamy", "Creamy"], ["woody", "Woody"], ["spicy", "Spicy"], ["earthy", "Earthy"]] as const;

function hoursLabel(min: number) {
  if (min < 90) return `About ${min} minutes`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `About ${h} hour${h > 1 ? "s" : ""}${m ? ` ${m} minutes` : ""}`;
}

export default function ProductPage({ params }: PageProps<"/product/[slug]">) {
  return (
    <Suspense fallback={<div className="wrap" style={{ padding: "80px 24px", minHeight: 600 }} aria-busy="true">Loading cigar…</div>}>
      <ProductContent params={params} />
    </Suspense>
  );
}

async function ProductContent({ params }: { params: PageProps<"/product/[slug]">["params"] }) {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) notFound();

  const reviews = reviewsFor(p);
  const related = recommendFor(p);
  const trio = packs[0];
  const pairs = [
    { name: trio.name, body: "Three mild cigars and a printed care guide card.", price: trio.price },
    { name: packs[2].name, body: "Two cigars, a cutter and matches in a wooden box.", price: packs[2].price },
    { name: "Double-blade cutter", body: "A clean cut every time. Fits robusto and toro sizes.", price: 149 },
  ];
  const row = { display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" } as const;

  return (
    <>
      <nav className="wrap" aria-label="Breadcrumb" style={{ paddingTop: 20, fontSize: 15 }}>
        <Link href="/">Home</Link> / <Link href="/shop">Shop Cigars</Link> / <span>{p.name}</span>
      </nav>

      <section className="wrap" style={{ paddingTop: 20, paddingBottom: 48 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "flex-start" }}>
          <Gallery name={p.name} strength={p.strength} beginner={p.beginner} />

          <div style={{ flex: "1 1 440px", minWidth: 0, display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span className="eyebrow">{p.brand}</span>
              <h1 style={{ fontSize: "clamp(34px,4vw,50px)" }}>{p.name}</h1>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 16px", fontSize: 16 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Flag country={p.country} w={24} h={16} />{p.country}</span>
                <span><span className="star" aria-hidden="true">★★★★★</span> <strong>{p.rating.toFixed(1)}</strong> <a href="#reviews">{p.reviews} reviews</a></span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--serif)", fontSize: 42, fontWeight: 600 }}>{p.price} DKK</span>
              <span style={{ color: "#2f5d2a", fontWeight: 700 }}>In stock · ships within 1 working day</span>
            </div>
            <p style={{ fontSize: 18, color: "#3d2a20" }}>{p.blurb}</p>

            <div className="card card-gold" style={{ padding: 22, display: "flex", flexDirection: "column", gap: 14, background: "#FBF3E0" }}>
              <h2 style={{ fontSize: 24 }}>Is this right for me?</h2>
              <div style={row}><span style={{ fontWeight: 600 }}>Beginner-friendly</span><strong>{p.beginner ? "Yes, a good first cigar" : "Not ideal for a first cigar"}</strong></div>
              <div style={{ ...row, alignItems: "center" }}><span style={{ fontWeight: 600 }}>Strength</span><StrengthMeter value={p.strength} showLabel /></div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontWeight: 600 }}>Flavour profile</span>
                {PROFILE_LABELS.map(([k, label]) => (
                  <div key={k} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 70, fontSize: 15 }}>{label}</span>
                    <span className="bar" role="img" aria-label={`${label}: ${p.profile[k]} of 5`}><span style={{ width: `${p.profile[k] * 20}%` }} /></span>
                  </div>
                ))}
              </div>
              <div style={row}><span style={{ fontWeight: 600 }}>Smoking time</span><strong>{hoursLabel(p.minutes)}</strong></div>
              <div style={row}>
                <span style={{ fontWeight: 600 }}>Best for</span>
                <span style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{p.occasions.map((o) => <span key={o} className="tag">{OCCASION_LABELS[o]}</span>)}</span>
              </div>
            </div>

            <BuyBox id={p.id} name={p.name} price={p.price} />
            <Link href="/shop#packs" style={{ fontWeight: 700 }}>Add the starter pack instead (3 mild cigars, {trio.price} DKK) →</Link>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "18px 20px", border: "1px solid #E4D7C2", borderRadius: 12, background: "#FBF7EF", fontSize: 16 }}>
              <div><strong>Stored in a humidor at 70% humidity.</strong> It arrives soft, fresh and ready.</div>
              <div><strong>Replacement guarantee.</strong> If it’s damaged or dry, we’ll send another.</div>
              <div><strong>Delivery:</strong> {DELIVERY_FEE} DKK, free over {FREE_DELIVERY_FROM} DKK. Arrives in 1–3 working days. You see the cost before checkout.</div>
              <div><strong>MitID age check.</strong> A quick Danish digital ID check at checkout confirms you’re 18+.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 56 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 400px", minWidth: 0 }}>
            <h2 style={{ fontSize: 30, marginBottom: 12 }}>Key facts</h2>
            <table className="facts" style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr><td>Country of origin</td><td>{p.country}</td></tr>
                <tr><td>Wrapper</td><td>{p.wrapper}. The outer leaf you see and touch.</td></tr>
                <tr><td>Binder</td><td>{p.binder}. The leaf that holds the inside together.</td></tr>
                <tr><td>Filler</td><td>{p.filler}. The tobacco in the middle that sets the strength.</td></tr>
                <tr><td>Size</td><td>{p.lengthMm} mm long, ring gauge {p.ring} (about {(p.ring * 0.0397).toFixed(1)} cm thick)</td></tr>
                <tr><td>Vitola</td><td>{p.vitola}: {VITOLA_EXPLAINED[p.vitola]}</td></tr>
                <tr><td>Sold as</td><td>Single cigar</td></tr>
              </tbody>
            </table>
          </div>
          <div style={{ flex: "1 1 400px", minWidth: 0 }}>
            <h2 style={{ fontSize: 30, marginBottom: 12 }}>Good to know</h2>
            <details open><summary>Tasting notes</summary><div>{p.tasting}</div></details>
            <details><summary>Origin story</summary><div>{ORIGIN_STORIES[p.brand]}</div></details>
            <details><summary>How to enjoy it</summary><div>Clip the rounded end with a cutter, toast the foot with a match, then take slow puffs, about one a minute. Never inhale. Put it down when it stops tasting good; there are no rules about finishing it.</div></details>
            <details><summary>Storage tips</summary><div>Keep it somewhere cool at 65–72% humidity, ideally in a small humidor. For a few days, a zip bag with a damp sponge nearby is fine.</div></details>
            <details><summary>Delivery &amp; returns</summary><div>Delivered in 1–3 working days. If your cigar arrives damaged or dry, email us a photo within 7 days and we’ll replace it.</div></details>
          </div>
        </div>
      </section>

      <section id="reviews" className="wrap" style={{ paddingBottom: 56 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 24px", alignItems: "baseline", marginBottom: 24 }}>
          <h2>Reviews</h2>
          <span><span className="star" aria-hidden="true">★★★★★</span> {p.rating.toFixed(1)} from {p.reviews} customers (demo data)</span>
        </div>
        <div className="g-2" style={{ gap: 20 }}>
          {reviews.map((r) => (
            <figure key={r.who} className="card" style={{ margin: 0, padding: 22, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                <span className="star" role="img" aria-label={`${r.stars} out of 5 stars`} style={{ letterSpacing: 2 }}>{"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}</span>
                <span className="tag">{r.tag}</span>
              </div>
              <blockquote style={{ margin: 0 }}>{r.text}</blockquote>
              <figcaption style={{ fontWeight: 700, color: "#8A5A3B" }}>{r.who}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 56 }}>
        <h2 style={{ marginBottom: 20 }}>Pairs well with…</h2>
        <div className="g-3" style={{ gap: 20 }}>
          {pairs.map((x) => (
            <Link key={x.name} href="/shop#packs" className="card" style={{ padding: 22, textDecoration: "none", color: "#2A1A12", display: "flex", flexDirection: "column", gap: 6 }}>
              <strong style={{ fontFamily: "var(--serif)", fontSize: 20 }}>{x.name}</strong>
              <span>{x.body}</span>
              <span style={{ fontWeight: 700, color: "#8A5A3B" }}>{x.price} DKK</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 80 }}>
        <h2 style={{ marginBottom: 20 }}>If you like this, try…</h2>
        <div className="g-4">{related.map((r) => <ProductCard key={r.id} p={r} />)}</div>
      </section>

      <TrustBar />
      <div className="only-m" style={{ height: 76 }} aria-hidden="true" />
    </>
  );
}
