"use client";

import { useState, useSyncExternalStore } from "react";

const G = [
  { id: "age", title: "Age verification", items: [
    ["Why do you check my age?", "Tobacco products can only be sold to adults aged 18 and over in Denmark. We check before every order."],
    ["How does the MitID check work?", "At checkout you confirm with MitID, Denmark’s digital ID. We only learn that you’re 18 or over. We don’t see or store anything else."],
    ["Can someone else receive the parcel?", "Parcels are handed to an adult. The carrier may ask for ID on delivery."]] },
  { id: "delivery", title: "Delivery & shipping", items: [
    ["How long does delivery take?", "1–3 working days after we ship. Most orders ship within 1 working day."],
    ["How much is delivery?", "39 DKK. It’s free on orders over 500 DKK. You see the cost in your cart, before checkout."],
    ["Can I track my parcel?", "Yes. You’ll get a tracking link by email as soon as your order ships."]] },
  { id: "freshness", title: "Freshness & storage", items: [
    ["How do you keep cigars fresh?", "Every cigar is stored in a humidor at about 70% humidity and packed in protective sleeves for the journey."],
    ["How should I store mine at home?", "Somewhere cool, at 65–72% humidity. A small humidor is ideal. For a few days, a sealed bag with a humidity pack works."],
    ["How long can I keep a cigar?", "Properly stored, many months. If you’re just starting, enjoy them within a few weeks for the best taste."]] },
  { id: "damaged", title: "Damaged or dry cigars", items: [
    ["My cigar arrived damaged or dry. What now?", "Email us a photo within 7 days. We’ll send a replacement. No return needed."],
    ["What does a dry cigar feel like?", "It feels brittle or crackly when gently squeezed, and may smoke hot and harsh. A fresh cigar has a soft spring."]] },
  { id: "returns", title: "Returns & replacement", items: [
    ["Can I return a cigar I don’t like?", "Because of hygiene and freshness rules, we can’t take back opened cigars. Unopened packs can be returned within 14 days."],
    ["What does the replacement guarantee cover?", "Any cigar that arrives damaged, dry or different from what you ordered."]] },
  // TODO: Verify this answer against current Danish tobacco legislation before launch. It deliberately cites no
  // specific law or paragraph; have the exact legal wording checked and adjust the text if needed.
  { id: "pictures", title: "Product pictures", items: [
    ["Why don’t you show pictures of the cigars?", "Danish tobacco legislation restricts how tobacco products may be advertised and displayed, so we don’t show photos of the cigars themselves. The pictures in our shop show the flavours and places behind each cigar, not the cigar. Instead, we describe every cigar in words, including size, strength and flavour, so you can still choose with confidence."]] },
  { id: "contact-faq", title: "Contact", items: [
    ["How can I reach you?", "Use the form on this page or email hello@firstdraw.example. We reply within 1 working day."],
    ["I’m new and don’t know what to order. Can you help?", "Of course. Take our 3-question quiz under “Find my cigar” (it takes about 1 minute), or tell us the occasion and we’ll suggest something."]] },
];

// The URL hash (e.g. /help#pictures), so a linked section opens its answers.
const subscribeHash = (cb: () => void) => { window.addEventListener("hashchange", cb); return () => window.removeEventListener("hashchange", cb); };

export default function HelpCenter() {
  const hash = useSyncExternalStore(subscribeHash, () => window.location.hash.slice(1), () => "");
  const [query, setQuery] = useState("");
  const [sent, setSent] = useState(false);
  const q = query.trim().toLowerCase();
  const groups = G.map((g) => ({ ...g, items: g.items.filter(([a, b]) => !q || `${a} ${b}`.toLowerCase().includes(q)) })).filter((g) => g.items.length > 0);

  return (
    <>
      <section className="wrap" style={{ paddingTop: 48, paddingBottom: 28 }}>
        <div style={{ maxWidth: 720, display: "flex", flexDirection: "column", gap: 16 }}>
          <span className="eyebrow">Help &amp; support</span>
          <h1 style={{ fontSize: "clamp(34px,4.6vw,56px)" }}>How can we help?</h1>
          <hr className="rule-l" />
          <div>
            <label className="lbl" htmlFor="faq-search">Search the answers</label>
            <input id="faq-search" className="field" type="search" placeholder="Try “age”, “dry” or “delivery”" value={query} onChange={(e) => setQuery(e.target.value)} style={{ minHeight: 56, borderRadius: 999, padding: "0 22px", fontSize: 18 }} />
          </div>
        </div>
      </section>

      <div className="wrap" style={{ paddingBottom: 64 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 560px", minWidth: 0, display: "flex", flexDirection: "column", gap: 36 }}>
            {groups.map((g) => (
              <section key={g.id} id={g.id}>
                <h2 style={{ fontSize: 28, marginBottom: 6 }}>{g.title}</h2>
                <div style={{ borderTop: "1px solid #E4D7C2" }}>
                  {g.items.map(([a, b]) => (
                    <details key={a} open={!!q || hash === g.id}><summary>{a}</summary><div>{b}</div></details>
                  ))}
                </div>
              </section>
            ))}
            {groups.length === 0 && (
              <div className="card" style={{ padding: "36px 28px", textAlign: "center", display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                <h3>No answers found for “{query}”</h3>
                <p>Try a simpler word, or send us a message. We’re happy to help.</p>
                <a className="btn btn-primary btn-sm" href="#contact">Contact us</a>
              </div>
            )}
          </div>

          <aside id="contact" style={{ flex: "0 1 400px", minWidth: 300, width: "100%", position: "sticky", top: 16 }}>
            <div className="card card-gold" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 14 }}>
              <h2 style={{ fontSize: 28 }}>Still stuck? Write to us.</h2>
              <p>Email <a href="#contact">hello@firstdraw.example</a><br /><strong>We reply within 1 working day.</strong></p>
              {!sent ? (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div><label className="lbl" htmlFor="h-name">Your name</label><input id="h-name" className="field" type="text" autoComplete="name" required /></div>
                  <div><label className="lbl" htmlFor="h-mail">Email</label><input id="h-mail" className="field" type="email" autoComplete="email" required /></div>
                  <div><label className="lbl" htmlFor="h-msg">How can we help?</label><textarea id="h-msg" className="field" required /></div>
                  <button type="submit" className="btn btn-primary">Send message</button>
                </form>
              ) : (
                <div style={{ padding: 18, borderRadius: 10, background: "#EFE3CE", display: "flex", flexDirection: "column", gap: 6 }}>
                  <strong>Message sent (demo).</strong>
                  <span>Thank you. We’ll reply within 1 working day.</span>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
