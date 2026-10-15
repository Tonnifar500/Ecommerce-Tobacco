"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";

export default function BuyBox({ id, name, price }: { id: number; name: string; price: number }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const total = price * qty;
  const label = added ? "Added to cart" : `Add to cart · ${total} DKK`;
  const doAdd = () => { add(id, qty); setAdded(true); };

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", border: "1.5px solid #B89E7A", borderRadius: 999, background: "#fff" }} role="group" aria-label="Quantity">
          <button type="button" className="icon-btn" onClick={() => { setQty(Math.max(1, qty - 1)); setAdded(false); }} aria-label="Decrease quantity" style={{ fontSize: 22 }}>−</button>
          <span style={{ minWidth: 34, textAlign: "center", fontWeight: 700 }} aria-live="polite">{qty}</span>
          <button type="button" className="icon-btn" onClick={() => { setQty(Math.min(10, qty + 1)); setAdded(false); }} aria-label="Increase quantity" style={{ fontSize: 22 }}>+</button>
        </div>
        <button type="button" className="btn btn-primary" onClick={doAdd} style={{ flex: "1 1 220px" }} data-funnel="consideration:add-to-cart" aria-label={`${label} (${name})`}>{label}</button>
      </div>
      {added && <Link className="btn btn-gold" href="/cart">View cart and check out</Link>}
      <div className="only-m sticky-buy" aria-hidden={false}>
        <span style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 600 }}>{total} DKK</span>
        <button type="button" className="btn btn-primary" onClick={doAdd} style={{ flex: 1, maxWidth: 240 }}>{added ? "Added to cart" : "Add to cart"}</button>
      </div>
    </>
  );
}
