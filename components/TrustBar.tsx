const items = [
  { label: "Age verified with MitID", d: <><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><path d="M9 12l2 2 4-4" /></> },
  { label: "Stored in a humidor, shipped fresh", d: <><rect x="3" y="8" width="18" height="12" rx="2" /><path d="M3 12h18M10 15h4M3 8l2-3h14l2 3" /></> },
  { label: "Replacement guarantee", d: <><path d="M20 12a8 8 0 10-2.5 5.8" /><path d="M20 5v5h-5" /></> },
  { label: "Delivery in 1–3 working days", d: <><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></> },
];

export default function TrustBar() {
  return (
    <div style={{ padding: "8px 0" }}>
      <div style={{ borderTop: "1px solid #C8963E", borderBottom: "1px solid #C8963E", background: "#FBF7EF", padding: "22px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: "20px 28px", maxWidth: 1200, margin: "0 auto" }}>
          {items.map((i) => (
            <div key={i.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#8A5A3B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none" }}>{i.d}</svg>
              <span style={{ fontWeight: 600, lineHeight: 1.3 }}>{i.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
