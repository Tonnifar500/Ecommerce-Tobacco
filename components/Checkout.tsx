"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveOrder, useCart } from "@/lib/cart";
import { DELIVERY_FEE, FREE_DELIVERY_FROM } from "@/lib/products";

export default function Checkout() {
  const router = useRouter();
  const cart = useCart();
  const { lines, subtotal, shipping, total } = cart;
  const [verified, setVerified] = useState(false);
  const [pay, setPay] = useState<"card" | "mobilepay">("card");

  const left = Math.max(0, FREE_DELIVERY_FROM - subtotal);
  const canPlace = lines.length > 0 && verified;

  const place = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canPlace) return;
    saveOrder({ number: `FD-${Math.floor(20000 + Math.random() * 79999)}`, lines, subtotal, shipping, total });
    cart.clear();
    router.push("/confirmation");
  };

  const stepHead = (n: number, title: string, extra?: React.ReactNode) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}><span className="stepno">{n}</span><h2 style={{ fontSize: 26 }}>{title}</h2></div>
      {extra}
    </div>
  );
  const payBox = (on: boolean) => ({ flex: "1 1 220px", padding: "14px 16px", border: `2px solid ${on ? "#A63A24" : "#B89E7A"}`, borderRadius: 12, background: "#fff", fontWeight: 600, cursor: "pointer" }) as const;

  return (
    <>
      <section className="wrap" style={{ paddingTop: 40, paddingBottom: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span className="eyebrow">Your cart</span>
          <h1 style={{ fontSize: "clamp(34px,4.4vw,52px)" }}>Cart &amp; checkout</h1>
        </div>
      </section>

      <form className="wrap" onSubmit={place} style={{ paddingBottom: 56 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 40, alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 560px", minWidth: 0, display: "flex", flexDirection: "column", gap: 28 }}>
            <section className="card" style={{ padding: "8px 24px 16px" }}>
              {lines.length > 0 ? (
                <>
                  <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                    {lines.map((l) => (
                      <li key={l.id} style={{ display: "flex", flexWrap: "wrap", gap: "14px 18px", alignItems: "center", padding: "18px 0", borderBottom: "1px solid #E4D7C2" }}>
                        <div className="img-ph" role="img" aria-label={`Photo slot: ${l.name}`} style={{ width: 84, height: 84, borderRadius: 10, flex: "none", background: l.bg }} />
                        <div style={{ flex: "1 1 200px", minWidth: 0 }}>
                          <div className="eyebrow" style={{ fontSize: 12 }}>{l.brand}</div>
                          <Link href={l.href} style={{ fontFamily: "var(--serif)", fontSize: 20, fontWeight: 600, color: "#2A1A12", textDecoration: "none" }}>{l.name}</Link>
                          <div style={{ fontSize: 15, color: "#5a4435" }}>{l.price} DKK each</div>
                        </div>
                        <div style={{ display: "inline-flex", alignItems: "center", border: "1.5px solid #B89E7A", borderRadius: 999, background: "#fff" }} role="group" aria-label={`Quantity of ${l.name}`}>
                          <button type="button" className="icon-btn" onClick={() => cart.setQty(l.id, l.qty - 1)} aria-label="Decrease quantity" style={{ fontSize: 22 }}>−</button>
                          <span style={{ minWidth: 30, textAlign: "center", fontWeight: 700 }}>{l.qty}</span>
                          <button type="button" className="icon-btn" onClick={() => cart.setQty(l.id, l.qty + 1)} aria-label="Increase quantity" style={{ fontSize: 22 }}>+</button>
                        </div>
                        <strong style={{ minWidth: 84, textAlign: "right" }}>{l.total} DKK</strong>
                        <button type="button" className="chip" onClick={() => cart.remove(l.id)} aria-label={`Remove ${l.name}`}>Remove</button>
                      </li>
                    ))}
                  </ul>
                  <div style={{ paddingTop: 18, display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", fontWeight: 600 }}>
                      <span>{left > 0 ? `Add ${left} DKK more for free delivery` : "You’ve unlocked free delivery"}</span>
                      <span>{FREE_DELIVERY_FROM} DKK</span>
                    </div>
                    <div role="progressbar" aria-valuemin={0} aria-valuemax={FREE_DELIVERY_FROM} aria-valuenow={Math.min(subtotal, FREE_DELIVERY_FROM)} aria-label="Progress to free delivery" style={{ height: 12, borderRadius: 6, background: "#E4D7C2", overflow: "hidden" }}>
                      <div style={{ height: "100%", borderRadius: 6, background: "#C8963E", width: `${Math.min(100, (subtotal / FREE_DELIVERY_FROM) * 100)}%` }} />
                    </div>
                    <p style={{ fontSize: 15, color: "#5a4435" }}>Delivery is {DELIVERY_FEE} DKK, arriving in 1–3 working days. Free over {FREE_DELIVERY_FROM} DKK.</p>
                  </div>
                </>
              ) : (
                <div style={{ padding: "40px 8px", textAlign: "center", display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
                  <h3>Your cart is empty</h3>
                  <p>Let’s find a first cigar.</p>
                  <Link className="btn btn-primary" href="/shop">Browse cigars</Link>
                </div>
              )}
            </section>

            <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "16px 20px", borderRadius: 12, border: "1px solid #C8963E", background: "#FBF3E0" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8A5A3B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none" }}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><path d="M9 12l2 2 4-4" /></svg>
              <span><strong>Age check required at checkout.</strong> You’ll confirm you’re 18+ with MitID in step 2.</span>
            </div>

            <section className="card" style={{ padding: "26px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
              {stepHead(1, "Delivery details")}
              <p style={{ color: "#3d2a20" }}>Guest checkout. No account needed.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
                <div><label className="lbl" htmlFor="f-name">Full name</label><input id="f-name" className="field" type="text" autoComplete="name" placeholder="Anna Jensen" required /></div>
                <div><label className="lbl" htmlFor="f-mail">Email (for your care guide)</label><input id="f-mail" className="field" type="email" autoComplete="email" placeholder="anna@example.dk" required /></div>
                <div style={{ gridColumn: "1/-1" }}><label className="lbl" htmlFor="f-street">Street and number</label><input id="f-street" className="field" type="text" autoComplete="street-address" placeholder="Nørrebrogade 12, 2. th" required /></div>
                <div><label className="lbl" htmlFor="f-zip">Postcode</label><input id="f-zip" className="field" type="text" inputMode="numeric" autoComplete="postal-code" placeholder="2200" required /></div>
                <div><label className="lbl" htmlFor="f-city">City</label><input id="f-city" className="field" type="text" autoComplete="address-level2" placeholder="Copenhagen" required /></div>
              </div>
              <p style={{ fontSize: 15, color: "#5a4435" }}>Delivery: 1–3 working days, signed-for by an adult.</p>
            </section>

            <section className="card" style={{ padding: "26px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
              {stepHead(2, "Age verification")}
              <p style={{ color: "#3d2a20" }}>Tobacco is for adults only. MitID is Denmark’s digital ID. We only learn that you’re 18 or over, nothing else.</p>
              <div style={{ border: "2px dashed #9FB3BD", borderRadius: 14, padding: 22, background: "#fff", display: "flex", flexDirection: "column", gap: 14, maxWidth: 460 }}>
                <strong style={{ fontSize: 18 }}>MitID (demo screen)</strong>
                <div><label className="lbl" htmlFor="f-mitid">User ID</label><input id="f-mitid" className="field" type="text" placeholder="Demo – leave empty" /></div>
                {!verified ? (
                  <button type="button" className="btn btn-primary" onClick={() => setVerified(true)}>Verify with MitID (demo)</button>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, color: "#2f5d2a" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2f5d2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></svg>
                    Age verified (demo)
                  </div>
                )}
                <p style={{ fontSize: 13.5, color: "#5a4435" }}>Demo only. No real MitID connection is made.</p>
              </div>
            </section>

            <section className="card" style={{ padding: "26px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
              {stepHead(3, "Payment", <span className="badge badge-ember">Demo – no real payment</span>)}
              <div role="radiogroup" aria-label="Payment method" style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <label className="fopt" style={payBox(pay === "card")}><input type="radio" name="pay" checked={pay === "card"} onChange={() => setPay("card")} /> Card</label>
                <label className="fopt" style={payBox(pay === "mobilepay")}><input type="radio" name="pay" checked={pay === "mobilepay"} onChange={() => setPay("mobilepay")} /> MobilePay</label>
              </div>
              {pay === "card" ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 16 }}>
                  <div style={{ gridColumn: "1/-1" }}><label className="lbl" htmlFor="c-num">Card number (demo)</label><input id="c-num" className="field" type="text" inputMode="numeric" placeholder="0000 0000 0000 0000" /></div>
                  <div><label className="lbl" htmlFor="c-exp">Expiry</label><input id="c-exp" className="field" type="text" placeholder="MM/YY" /></div>
                  <div><label className="lbl" htmlFor="c-cvc">CVC</label><input id="c-cvc" className="field" type="text" inputMode="numeric" placeholder="123" /></div>
                </div>
              ) : (
                <p style={{ padding: 16, borderRadius: 10, background: "#EFE3CE" }}>You’d be sent to the MobilePay app to approve the payment. (Demo – this step is skipped.)</p>
              )}
              <button type="submit" className="btn btn-gold btn-block" disabled={!canPlace} data-funnel="purchase:checkout-complete">
                {canPlace ? `Place demo order · ${total} DKK` : lines.length === 0 ? "Add a cigar to continue" : "Verify your age in step 2 to continue"}
              </button>
            </section>
          </div>

          <aside style={{ flex: "0 1 380px", minWidth: 300, width: "100%", position: "sticky", top: 16, display: "flex", flexDirection: "column", gap: 18 }}>
            <div className="card card-gold" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
              <h2 style={{ fontSize: 26 }}>Order summary</h2>
              {lines.map((l) => (
                <div key={l.id} style={{ display: "flex", justifyContent: "space-between", gap: 12 }}><span>{l.qty} × {l.name}</span><span>{l.total} DKK</span></div>
              ))}
              <hr className="rule" />
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Subtotal</span><span>{subtotal} DKK</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Delivery (1–3 working days)</span><span>{subtotal === 0 ? "–" : shipping === 0 ? "Free" : `${shipping} DKK`}</span></div>
              <hr className="rule" />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <strong style={{ fontSize: 19 }}>Total</strong>
                <strong style={{ fontFamily: "var(--serif)", fontSize: 30 }}>{total} DKK</strong>
              </div>
              <p style={{ fontSize: 14, color: "#5a4435" }}>VAT included. No surprise fees.</p>
            </div>
          </aside>
        </div>
      </form>
    </>
  );
}
