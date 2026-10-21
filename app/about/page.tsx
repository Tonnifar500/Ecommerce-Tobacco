import type { Metadata } from "next";
import Link from "next/link";
import LoopVideo from "@/components/LoopVideo";
import TrustBar from "@/components/TrustBar";

export const metadata: Metadata = { title: "About us", description: "A small Danish team of enthusiasts who remember being beginners." };

const origins = [
  { country: "Colombia", body: "Highland farms where leaves are cured slowly in shaded barns. Known for smooth, sweet cigars that suit beginners.", farms: ["Casa Aurelia", "Finca Montaña"] },
  { country: "Dominican Republic", body: "Long-established rolling houses with a classic, mellow style. Where many people’s first cigar comes from.", farms: ["Luna Vieja", "Tabaquera Santiago"] },
  { country: "Nicaragua", body: "Volcanic soil and bold leaves. We offer mild Connecticut-wrapped blends and richer maduros for later.", farms: ["Isla Ceniza"] },
];
const team = [
  { name: "Jakob Skovbye Brandt", role: "Co-founder, selection", line: "Tastes every cigar before it reaches the shelf and decides what makes the cut.", photo: "/team/jakob-skovbye-brandt.jpg" },
  { name: "Olivia Simon-Pallesen", role: "Co-founder, sourcing", line: "Works with the farms and rolling houses, and keeps track of who rolls what.", photo: "/team/olivia-simon-pallesen.jpg" },
  { name: "Bertram Costa", role: "Head of Sales", line: "Makes sure the right cigars are in stock and the starter packs stay good value.", photo: "/team/bertram-costa.jpg" },
  { name: "Marcus Feltmann Espersen", role: "Head of IT", line: "Builds and runs the shop, from the cigar finder to a smooth checkout.", photo: "/team/marcus-feltmann-espersen.jpg" },
  { name: "Rasmus Thers", role: "Marketing", line: "Tells the First Draw story and keeps every page in plain, friendly language.", photo: "/team/rasmus-thers.jpg" },
];
const how = [
  ["How we select", "Taste-tested, beginner-friendly first", "Every cigar is smoked by at least three of us before it goes on the shelf. We rate strength, smoothness and how forgiving it is. If a beginner wouldn’t enjoy it, we say so on the page."],
  ["How we source", "Small farms we know by name", "We work with a handful of family farms and rollers, so we can tell you where each cigar comes from and who made it."],
  ["How we store", "Humidor-fresh, every time", "Cigars live in our humidor room at about 70% humidity until the moment we pack your order."],
];

export default function AboutPage() {
  return (
    <>
      <section className="wrap" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center" }}>
          <div style={{ flex: "1 1 440px", display: "flex", flexDirection: "column", gap: 20 }}>
            <span className="eyebrow">About First Draw</span>
            <h1 style={{ fontSize: "clamp(34px,4.8vw,58px)" }}>We remember being beginners.</h1>
            <hr className="rule-l" />
            <p style={{ fontSize: 20, color: "#3d2a20" }}>First Draw is a small Danish team of enthusiasts who still remember our own first cigar: the nerves, the jargon and the fear of doing it wrong. We built the shop we wished we’d had.</p>
          </div>
          <div role="img" aria-label="The First Draw team gathered around a wooden table with coffee" style={{ flex: "1 1 380px", minHeight: 380, borderRadius: 18, border: "2px solid #C8963E", background: "center / cover no-repeat url(/about/team.png)" }} />
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 64 }}>
        <div className="g-3">
          {how.map(([e, h, p]) => (
            <div key={e} className="card" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 10 }}>
              <span className="eyebrow">{e}</span><h3>{h}</h3><p>{p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="dark-sec on-dark">
        <div className="wrap sec">
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
            <span className="eyebrow">Where our cigars come from</span>
            <h2>Farms and partners (fictional)</h2>
          </div>
          <div className="g-3">
            {origins.map((o) => (
              <div key={o.country} style={{ background: "#3a251a", border: "1px solid #6b4430", borderRadius: 14, padding: 26, display: "flex", flexDirection: "column", gap: 10 }}>
                <h3>{o.country}</h3>
                <p style={{ color: "#E8DCC6" }}>{o.body}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{o.farms.map((f) => <span key={f} className="badge badge-dark">{f}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap sec">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center" }}>
          <LoopVideo name="lighter-flame" alt="Close-up of a lighter flame flickering against a dark background" style={{ flex: "1 1 380px", minHeight: 360, borderRadius: 18 }} />
          <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", gap: 16 }}>
            <span className="eyebrow">Our promise</span>
            <h2>Honest guidance. Fresh cigars. No snobbery.</h2>
            <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
              <li>We describe every cigar plainly, including who it isn’t for.</li>
              <li>If a cigar arrives damaged or dry, we replace it.</li>
              <li>We check age on every order, because it’s the right thing to do.</li>
              <li>No question is too basic. Ask us anything.</li>
            </ul>
            <div><Link className="btn btn-primary" href="/guide">Start with the guide</Link></div>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 80 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
          <span className="eyebrow">The team</span>
          <h2>The people behind First Draw</h2>
        </div>
        <div className="g-4" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}>
          {team.map((t) => (
            <div key={t.name} className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div role="img" aria-label={`Portrait of ${t.name}`} style={{ aspectRatio: "4 / 5", background: `center 20% / cover no-repeat url(${t.photo})` }} />
              <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
                <h3 style={{ fontSize: 21 }}>{t.name}</h3>
                <span style={{ fontWeight: 700, color: "#8A5A3B" }}>{t.role}</span>
                <p style={{ fontSize: 15.5 }}>{t.line}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <TrustBar />
    </>
  );
}
