import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap sec" style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
      <span className="eyebrow">404</span>
      <h1 style={{ fontSize: "clamp(34px,4.6vw,56px)" }}>We can’t find that page.</h1>
      <p style={{ fontSize: 19, maxWidth: 520 }}>It may have moved. Let’s get you back to something good.</p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <Link className="btn btn-primary" href="/guide">Start Here – New to cigars?</Link>
        <Link className="btn btn-ghost" href="/shop">Browse all cigars</Link>
      </div>
    </section>
  );
}
