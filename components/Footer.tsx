import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  const col = { flex: "1 1 140px", display: "flex", flexDirection: "column", gap: 6 } as const;
  const h = { fontSize: 16, color: "#C8963E", marginBottom: 6 } as const;
  const a = { minHeight: 32 } as const;
  return (
    <footer className="dark-sec on-dark">
      <div className="wrap" style={{ paddingTop: 56, paddingBottom: 28 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 40, justifyContent: "space-between" }}>
          <div style={{ flex: "1 1 280px", display: "flex", flexDirection: "column", gap: 14, maxWidth: 360 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Logo />
              <span style={{ fontFamily: "var(--serif)", fontSize: 26, fontWeight: 600 }}>First Draw</span>
            </div>
            <p style={{ color: "#E8DCC6" }}>Your first cigar, chosen for you. Delivered fresh.</p>
            <p style={{ color: "#E8DCC6", fontSize: 15 }}>
              Contact: <Link href="/help#contact">hello@firstdraw.example</Link>
              <br />
              We reply within 1 working day.
            </p>
          </div>
          <div style={col}>
            <h4 style={h}>Shop</h4>
            <Link style={a} href="/guide">Start Here</Link>
            <Link style={a} href="/shop">Shop Cigars</Link>
            <Link style={a} href="/shop#packs">Starter packs</Link>
            <Link style={a} href="/guide">Guides</Link>
          </div>
          <div style={col}>
            <h4 style={h}>Help</h4>
            <Link style={a} href="/help">FAQ &amp; support</Link>
            <Link style={a} href="/help#age">Age verification</Link>
            <Link style={a} href="/help#delivery">Delivery &amp; returns</Link>
            <Link style={a} href="/about">About us</Link>
          </div>
          <div style={{ flex: "1 1 240px", display: "flex", flexDirection: "column", gap: 8, maxWidth: 320 }}>
            <h4 style={h}>Delivery &amp; returns</h4>
            <p style={{ color: "#E8DCC6", fontSize: 15 }}>Free delivery over 500 DKK. Delivery in 1–3 working days. Damaged or dry cigars are replaced, no questions asked.</p>
          </div>
        </div>
        <hr className="rule" style={{ margin: "36px 0 22px" }} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 32px", justifyContent: "space-between", fontSize: 14, color: "#E8DCC6" }}>
          <span>Tobacco products are sold to adults 18+ only.</span>
          <span>Prototype – products and brands are fictional.</span>
        </div>
      </div>
    </footer>
  );
}
