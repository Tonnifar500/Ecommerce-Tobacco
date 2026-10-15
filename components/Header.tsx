"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import Logo from "./Logo";

const NAV = [
  { href: "/guide", label: "Start Here", match: "/guide" },
  { href: "/shop", label: "Shop Cigars", match: "/shop" },
  { href: "/guide#picks", label: "Guides", match: "" },
  { href: "/help", label: "Help", match: "/help" },
  { href: "/about", label: "About", match: "/about" },
];

export default function Header() {
  const path = usePathname();
  const router = useRouter();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const isCur = (m: string) =>
    !!m && (path === m || path.startsWith(m + "/") || (m === "/shop" && (path.startsWith("/product") || path === "/cart" || path === "/confirmation")));

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(q.trim() ? `/shop?q=${encodeURIComponent(q.trim())}` : "/shop");
  };

  return (
    <header>
      <div style={{ background: "#2A1A12", color: "#F6EFE3", fontSize: 13.5, textAlign: "center", padding: "9px 16px", lineHeight: 1.4 }}>
        Free delivery over 500 DKK · Delivered fresh from humidor storage · 18+ only
      </div>
      <div style={{ background: "#FBF7EF", borderBottom: "1px solid #E4D7C2" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", gap: 18, minHeight: 76 }}>
          <Link href="/" aria-label="First Draw – home" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#2A1A12" }}>
            <Logo />
            <span className="logo-text" style={{ fontFamily: "var(--serif)", fontSize: 26, fontWeight: 600, letterSpacing: "-.01em" }}>First Draw</span>
          </Link>
          <nav className="only-d" aria-label="Main" style={{ display: "flex", gap: 24, marginLeft: 28 }}>
            {NAV.map((n) => (
              <Link key={n.label} className={`navlink ${isCur(n.match) ? "cur" : ""}`} href={n.href}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
            <form className="only-d" role="search" onSubmit={search} style={{ display: "flex", alignItems: "center" }}>
              <label className="sr" htmlFor="hdr-search">Search cigars</label>
              <input id="hdr-search" className="field" type="search" placeholder="Search cigars" value={q} onChange={(e) => setQ(e.target.value)} style={{ width: 200, minHeight: 44, borderRadius: 999, padding: "0 18px" }} />
            </form>
            <Link className="icon-btn only-m" href="/shop" aria-label="Search cigars">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
            </Link>
            <Link className="icon-btn" href="/cart" aria-label={`Cart, ${count} items`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 8h14l-1.2 11H6.2z" /><path d="M9 8V6a3 3 0 016 0v2" /></svg>
              {count > 0 && (
                <span style={{ position: "absolute", top: 2, right: 0, minWidth: 18, height: 18, padding: "0 4px", borderRadius: 9, background: "#A63A24", color: "#fff", font: "700 11px/18px var(--sans)", textAlign: "center" }}>{count}</span>
              )}
            </Link>
            <button type="button" className="icon-btn only-m" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            </button>
          </div>
        </div>
        {open && (
          <nav className="only-m" aria-label="Mobile" style={{ flexDirection: "column", padding: "6px 18px 18px", borderTop: "1px solid #E4D7C2", gap: 2 }}>
            {NAV.map((n) => (
              <Link key={n.label} className="navlink" href={n.href} onClick={() => setOpen(false)} style={{ minHeight: 48, fontSize: 18 }}>
                {n.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
