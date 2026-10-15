import type { Metadata } from "next";
import Link from "next/link";
import ConfirmationSummary, { OrderNumber } from "@/components/ConfirmationSummary";
import ImgPh from "@/components/ImgPh";
import ProductCard from "@/components/ProductCard";
import { getProduct } from "@/lib/products";

export const metadata: Metadata = { title: "Order confirmed" };

const steps = [
  { n: "1", title: "Store it", body: "Keep your cigars in a humidor, or a sealed container with a humidity pack, in a cool place. Aim for 65–72% humidity and avoid sunlight and the fridge.", art: "a cedar humidor with a small hygrometer" },
  { n: "2", title: "Cut it", body: "Use a sharp cutter and clip only the rounded cap, about 2 mm. A clean cut makes the draw smooth.", art: "a cutter clipping the cap of a cigar" },
  { n: "3", title: "Light it", body: "Hold the foot just above a match or soft flame and turn slowly until it glows evenly. Then puff gently. Don’t use a petrol lighter.", art: "a cigar foot being toasted over a match" },
  { n: "4", title: "Enjoy it", body: "Take a slow puff about once a minute and let the smoke out. Never inhale. Rest it in an ashtray between puffs.", art: "a cigar resting on a crystal ashtray" },
  { n: "5", title: "Know when to stop", body: "Put it down when it gets hot, bitter or you’ve had enough. Most people stop with the last third left. No one is counting.", art: "a half-smoked cigar left to go out" },
];

export default function ConfirmationPage() {
  return (
    <>
      <section className="wrap" style={{ paddingTop: 56, paddingBottom: 40 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 40, alignItems: "center" }}>
          <div style={{ flex: "1 1 420px", display: "flex", flexDirection: "column", gap: 16 }}>
            <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="26" fill="none" stroke="#C8963E" strokeWidth="2" /><circle cx="28" cy="28" r="19" fill="#A63A24" /><path d="M19 29l6 6 12-13" fill="none" stroke="#F6EFE3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="eyebrow">Demo order</span>
            <h1 style={{ fontSize: "clamp(34px,4.6vw,56px)" }}>Thank you. Your first draw is on its way.</h1>
            <p style={{ fontSize: 19, color: "#3d2a20" }}>We’ve sent a confirmation and a short care guide to your inbox. Nothing was charged: this is a demo.</p>
          </div>
          <ConfirmationSummary />
        </div>
      </section>

      <section className="wrap sec" style={{ paddingTop: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
          <span className="eyebrow">Your care guide</span>
          <h2>From the box to the first puff</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {steps.map((s) => (
            <div key={s.n} className="card" style={{ display: "flex", flexWrap: "wrap", overflow: "hidden" }}>
              <ImgPh alt={`Illustration slot: ${s.art}`} label={`Illustration – ${s.art}`} style={{ flex: "0 1 240px", minHeight: 150, width: "100%", maxWidth: 240 }} />
              <div style={{ flex: "1 1 320px", padding: "24px 28px", display: "flex", flexDirection: "column", gap: 8, justifyContent: "center" }}>
                <span style={{ fontFamily: "var(--serif)", fontSize: 36, color: "#A63A24", lineHeight: 1 }}>{s.n}</span>
                <h3>{s.title}</h3>
                <p style={{ color: "#3d2a20" }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="dark-sec on-dark">
        <div className="wrap sec">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center" }}>
            <div style={{ flex: "1 1 360px", display: "flex", flexDirection: "column", gap: 14 }}>
              <span className="eyebrow">In your inbox</span>
              <h2>The care guide, by email</h2>
              <p style={{ color: "#E8DCC6" }}>The same steps arrive as a short email you can keep. Here’s a preview.</p>
            </div>
            <div style={{ flex: "1 1 440px", background: "#FBF7EF", color: "#2A1A12", borderRadius: 12, overflow: "hidden", boxShadow: "0 18px 40px rgba(0,0,0,.35)" }}>
              <div style={{ padding: "14px 18px", borderBottom: "1px solid #E4D7C2", fontSize: 14.5, color: "#5a4435", display: "flex", flexDirection: "column", gap: 2 }}>
                <span><strong style={{ color: "#2A1A12" }}>From:</strong> First Draw &lt;hello@firstdraw.example&gt;</span>
                <span><strong style={{ color: "#2A1A12" }}>Subject:</strong> Your cigars are on their way: a quick care guide</span>
              </div>
              <div style={{ padding: "24px 22px", display: "flex", flexDirection: "column", gap: 12 }}>
                <h3 style={{ fontSize: 24 }}>Welcome to your first draw.</h3>
                <p>Your order <OrderNumber /> is packed and on its way. While you wait, here’s everything you need:</p>
                <p><strong>1. Store it</strong>: cool place, 65–72% humidity.<br /><strong>2. Cut it</strong>: clip just the rounded cap.<br /><strong>3. Light it</strong>: toast the foot, then puff gently.<br /><strong>4. Enjoy it</strong>: slow puffs, never inhale.<br /><strong>5. Stop</strong>: whenever it stops tasting good.</p>
                <p style={{ fontSize: 15, color: "#5a4435" }}>Questions? Reply to this email. We answer within 1 working day.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap sec">
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "end", gap: 16, marginBottom: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span className="eyebrow">Next time</span>
            <h2>If you liked this, try…</h2>
          </div>
          <Link className="btn btn-primary" href="/shop" data-funnel="post-purchase:what-to-smoke-next">What to smoke next</Link>
        </div>
        <div className="g-3">{[3, 14, 11].map((id) => <ProductCard key={id} p={getProduct(id)!} />)}</div>
      </section>
    </>
  );
}
