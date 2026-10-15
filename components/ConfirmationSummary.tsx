"use client";

import { useSyncExternalStore } from "react";
import { useLastOrder, type Order } from "@/lib/cart";

const demo: Order = {
  number: "FD-20418",
  lines: [
    { id: 1, name: "Aurora Robusto", brand: "Casa Aurelia", price: 89, qty: 2, total: 178, href: "", bg: "" },
    { id: 101, name: "First Draw Starter Trio", brand: "First Draw", price: 229, qty: 1, total: 229, href: "", bg: "" },
  ],
  subtotal: 407, shipping: 39, total: 446,
};

export function useOrder() {
  return useLastOrder() ?? demo;
}

export function deliveryRange() {
  const add = (n: number) => { const d = new Date(); let c = 0; while (c < n) { d.setDate(d.getDate() + 1); if (d.getDay() % 6) c++; } return d; };
  const f = (d: Date) => d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
  return `${f(add(1))} – ${f(add(3))}`;
}

export default function ConfirmationSummary() {
  const o = useOrder();
  // Dates depend on "today", so render a neutral text on the server and the real range on the client.
  const range = useSyncExternalStore(() => () => {}, deliveryRange, () => "1–3 working days");
  return (
    <div className="card card-gold" style={{ flex: "1 1 360px", padding: 26, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}><span style={{ color: "#5a4435" }}>Order number</span><strong>{o.number}</strong></div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}><span style={{ color: "#5a4435" }}>Estimated delivery</span><strong>{range}</strong></div>
      <hr className="rule" />
      {o.lines.map((l) => (
        <div key={l.id} style={{ display: "flex", justifyContent: "space-between", gap: 12 }}><span>{l.qty} × {l.name}</span><span>{l.total} DKK</span></div>
      ))}
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}><span>Delivery</span><span>{o.shipping === 0 ? "Free" : `${o.shipping} DKK`}</span></div>
      <hr className="rule" />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><strong>Total (demo)</strong><strong style={{ fontFamily: "var(--serif)", fontSize: 26 }}>{o.total} DKK</strong></div>
    </div>
  );
}

export function OrderNumber() {
  return <>{useOrder().number}</>;
}
