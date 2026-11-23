"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { STRENGTH_PLAIN, VITOLAS, explainVitola } from "@/lib/glossary";
import { FLAVOUR_LABELS, OCCASION_LABELS, STRENGTH_LABELS, packs, photoBg, products, type Country, type Flavour, type Occasion, type Product, type Vitola } from "@/lib/products";
import { QUIZ_LENGTH } from "@/lib/quiz";
import ProductCard from "./ProductCard";
import Term from "./Term";

type Chip = "all" | "beginner" | "colombia" | "gifts" | "mild";
const CHIPS: [Chip, string][] = [["all", "All cigars"], ["beginner", "Beginner picks"], ["colombia", "Colombian cigars"], ["gifts", "Gifts"], ["mild", "Mild & smooth"]];
const MAX = 170;

const FLAVOUR_HINTS: Record<Flavour, string> = {
  sweet: "Honey, vanilla and butter. Smooth and friendly.",
  woody: "Cedar, toast and nuts. Warm and familiar.",
  spicy: "A tingle of pepper or nutmeg on the tongue.",
  earthy: "Rich and dry, like a forest after rain.",
  coffee: "Espresso and dark chocolate. Deep and satisfying.",
};
const OCC_HINTS: Record<Occasion, string> = {
  celeb: "Cigars with a sense of occasion.",
  gift: "Easy to love and nice to give.",
  relax: "Medium body for slow evenings.",
  out: "Shorter smokes that fit a good conversation.",
  first: "Mild, creamy and forgiving.",
};
const COUNTRIES: [Country, string][] = [
  ["Colombia", "Often smooth and sweet."],
  ["Dominican Republic", "Classic, mellow and creamy."],
  ["Nicaragua", "Bolder, peppery and earthy."],
  ["Honduras", "Rich and woody, medium body."],
  ["Ecuador", "Known for silky, light wrapper leaves."],
  ["Mexico", "Sweet spice and earth."],
];

const flip = <T,>(arr: T[], v: T) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

type Opt<T> = { v: T; label: string; sub?: string; hint: string; count: number };

// One filter group. Each option shows how many cigars it would give with the other filters already chosen,
// and an "i" with a plain-language explanation (hover, focus or tap).
function Group<T extends string | number>({ title, intro, opts, sel, onToggle }: { title: string; intro: string; opts: Opt<T>[]; sel: T[]; onToggle: (v: T) => void }) {
  return (
    <fieldset style={{ border: 0, borderTop: "1px solid #E4D7C2", padding: "12px 0 6px", margin: 0 }}>
      <legend style={{ fontFamily: "var(--serif)", fontWeight: 600, fontSize: 18, padding: "0 0 4px", float: "left", width: "100%" }}>{title}</legend>
      <p style={{ clear: "both", fontSize: 14, color: "#5a4435", marginBottom: 4 }}>{intro}</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {opts.map(({ v, label, sub, hint, count }) => (
          <div key={String(v)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, opacity: count === 0 && !sel.includes(v) ? 0.55 : 1 }}>
            <label className="fopt">
              <input type="checkbox" checked={sel.includes(v)} onChange={() => onToggle(v)} />
              <span>{label}{sub && <span style={{ fontSize: 14, color: "#5a4435" }}> · {sub}</span>} <span style={{ fontSize: 14, color: "#5a4435" }}>({count})</span></span>
            </label>
            <Term tip={hint} label={`What does ${label} mean?`} className="term info-i" align="right">i</Term>
          </div>
        ))}
      </div>
    </fieldset>
  );
}

function FinderInner() {
  const sp = useSearchParams();
  const { add } = useCart();

  const initChip = (["beginner", "colombia", "gifts", "mild"].includes(sp.get("chip") || "") ? sp.get("chip") : "all") as Chip;
  const initOcc = (Object.keys(OCCASION_LABELS) as Occasion[]).filter((o) => o === sp.get("occ"));

  const [chip, setChip] = useState<Chip>(initChip);
  const [str, setStr] = useState<number[]>([]);
  const [flav, setFlav] = useState<Flavour[]>([]);
  const [occ, setOcc] = useState<Occasion[]>(initOcc);
  const [country, setCountry] = useState<Country[]>([]);
  const [size, setSize] = useState<Vitola[]>([]);
  const [max, setMax] = useState(MAX);
  const [beg, setBeg] = useState(false);
  const [sort, setSort] = useState("rec");
  const [open, setOpen] = useState(false);
  const [packAdded, setPackAdded] = useState(0);
  const q = (sp.get("q") || "").trim().toLowerCase();

  // This list renders in the browser only, so on a full page load the browser can't find /shop#packs (or a single
  // pack's id) before it exists. Scroll to it once it has rendered.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  // Ticks within a group widen the list (any of them); different groups narrow it (all of them).
  const base = (p: Product) => {
    if (chip === "beginner" && !p.beginner) return false;
    if (chip === "colombia" && p.country !== "Colombia") return false;
    if (chip === "gifts" && !p.occasions.includes("gift")) return false;
    if (chip === "mild" && p.strength > 2) return false;
    if (beg && !p.beginner) return false;
    if (q && !`${p.name} ${p.brand} ${p.country} ${p.notes.join(" ")} ${p.vitola}`.toLowerCase().includes(q)) return false;
    return p.price <= max;
  };
  const groups = {
    str: (p: Product) => !str.length || str.includes(p.strength),
    flav: (p: Product) => !flav.length || flav.some((f) => p.flavours.includes(f)),
    occ: (p: Product) => !occ.length || occ.some((o) => p.occasions.includes(o)),
    country: (p: Product) => !country.length || country.includes(p.country),
    size: (p: Product) => !size.length || size.includes(p.vitola),
  };
  type G = keyof typeof groups;
  const matches = (p: Product, skip?: G) => base(p) && (Object.keys(groups) as G[]).every((g) => g === skip || groups[g](p));
  // How many cigars an option would show, given everything chosen outside its own group.
  const count = (g: G, test: (p: Product) => boolean) => products.filter((p) => matches(p, g) && test(p)).length;

  let rows = products.filter((p) => matches(p));
  const sorts: Record<string, (a: (typeof rows)[0], b: (typeof rows)[0]) => number> = {
    rec: (a, b) => Number(b.beginner) - Number(a.beginner) || a.strength - b.strength || b.rating - a.rating,
    priceUp: (a, b) => a.price - b.price,
    priceDown: (a, b) => b.price - a.price,
    strUp: (a, b) => a.strength - b.strength,
    rating: (a, b) => b.rating - a.rating,
  };
  rows = [...rows].sort(sorts[sort]);

  const chosen: { label: string; remove: () => void }[] = [
    ...(chip !== "all" ? [{ label: CHIPS.find(([k]) => k === chip)![1], remove: () => setChip("all") }] : []),
    ...(beg ? [{ label: "Beginner-friendly only", remove: () => setBeg(false) }] : []),
    ...str.map((v) => ({ label: STRENGTH_LABELS[v], remove: () => setStr(flip(str, v)) })),
    ...flav.map((v) => ({ label: FLAVOUR_LABELS[v], remove: () => setFlav(flip(flav, v)) })),
    ...occ.map((v) => ({ label: OCCASION_LABELS[v], remove: () => setOcc(flip(occ, v)) })),
    ...country.map((v) => ({ label: v, remove: () => setCountry(flip(country, v)) })),
    ...size.map((v) => ({ label: v, remove: () => setSize(flip(size, v)) })),
    ...(max < MAX ? [{ label: `Up to ${max} DKK`, remove: () => setMax(MAX) }] : []),
  ];
  const active = chosen.length;
  const clearAll = () => { setChip("all"); setStr([]); setFlav([]); setOcc([]); setCountry([]); setSize([]); setMax(MAX); setBeg(false); };

  return (
    <>
      <section className="wrap" style={{ paddingTop: 40, paddingBottom: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <span className="eyebrow">Shop cigars</span>
          <h1 style={{ fontSize: "clamp(34px,4.4vw,52px)" }}>Browse all cigars</h1>
          <p style={{ fontSize: 19, maxWidth: 640, color: "#3d2a20" }}>Every filter has a plain-English explanation. Hover or tap the small “i”.</p>
          <p style={{ fontSize: 15, color: "#5a4435" }}>Why are there no photos of the cigars? <Link href="/help#pictures">Read why</Link>.</p>
          {q && <p style={{ fontWeight: 600 }}>Search results for “{sp.get("q")}” · <Link href="/shop">clear search</Link></p>}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 22 }} role="group" aria-label="Quick categories">
          {CHIPS.map(([k, label]) => (
            <button key={k} type="button" className={`chip ${chip === k ? "on" : ""}`} aria-pressed={chip === k} onClick={() => setChip(k)}>{label}</button>
          ))}
          <a className="chip" href="#packs">Starter packs</a>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 20 }}>
        <div className="card" style={{ background: "#FBF3E0", borderColor: "#C8963E", padding: "18px 22px", display: "flex", flexWrap: "wrap", gap: "12px 24px", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <strong style={{ fontFamily: "var(--serif)", fontSize: 21 }}>Not sure? Let us help.</strong>
            <br />
            <span>We’ll suggest 2–3 cigars that suit you. {QUIZ_LENGTH}.</span>
          </div>
          <Link className="btn btn-primary btn-sm" href="/quiz" data-funnel="engagement:finder-to-quiz">Take the 3-question quiz</Link>
        </div>
      </section>

      <div className="wrap" style={{ paddingBottom: 56 }}>
        <button type="button" className="btn btn-ghost btn-sm only-m" onClick={() => setOpen(!open)} aria-expanded={open} style={{ marginBottom: 16 }}>
          {open ? "Hide filters" : "Show filters"}{active ? ` (${active})` : ""}
        </button>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 36, alignItems: "flex-start" }}>
          <aside className={`fsb ${open ? "open" : ""}`} aria-label="Filters">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <h2 style={{ fontSize: 24 }}>Filters</h2>
              <button type="button" className="chip" onClick={clearAll} style={{ minHeight: 36, padding: "0 12px", fontSize: 14 }}>Clear all</button>
            </div>
            <p style={{ fontSize: 14, color: "#5a4435", marginBottom: 6 }}>Tick as many as you like. More ticks in one group show more cigars; ticks in different groups narrow the list. The number shows how many cigars you’ll see.</p>
            <label className="fopt" style={{ padding: "10px 12px", background: "#FBF3E0", border: "1px solid #C8963E", borderRadius: 10, fontWeight: 600 }}>
              <input type="checkbox" checked={beg} onChange={() => setBeg(!beg)} /> Beginner-friendly only
            </label>
            <Group
              title="Strength"
              intro="How strong it tastes. For a first cigar, start with Mild or Mild–Medium."
              opts={[1, 2, 3, 4, 5].map((v) => ({ v, label: STRENGTH_LABELS[v], hint: STRENGTH_PLAIN[v], count: count("str", (p) => p.strength === v) }))}
              sel={str}
              onToggle={(v) => setStr(flip(str, v))}
            />
            <Group
              title="Flavour"
              intro="The taste you’ll notice most."
              opts={(Object.keys(FLAVOUR_LABELS) as Flavour[]).map((v) => ({ v, label: FLAVOUR_LABELS[v], hint: FLAVOUR_HINTS[v], count: count("flav", (p) => p.flavours.includes(v)) }))}
              sel={flav}
              onToggle={(v) => setFlav(flip(flav, v))}
            />
            <Group
              title="Occasion"
              intro="What the cigar is for."
              opts={(Object.keys(OCCASION_LABELS) as Occasion[]).map((v) => ({ v, label: OCCASION_LABELS[v], hint: OCC_HINTS[v], count: count("occ", (p) => p.occasions.includes(v)) }))}
              sel={occ}
              onToggle={(v) => setOcc(flip(occ, v))}
            />
            <Group
              title="Where it’s from"
              intro="Each country has its own typical style."
              opts={COUNTRIES.map(([v, hint]) => ({ v, label: v, hint, count: count("country", (p) => p.country === v) }))}
              sel={country}
              onToggle={(v) => setCountry(flip(country, v))}
            />
            <Group
              title="Size and smoking time"
              intro="Bigger cigars take longer to smoke. Times are a rough guide."
              opts={(Object.keys(VITOLAS) as Vitola[]).map((v) => ({ v, label: v, sub: VITOLAS[v].time.replace(" minutes", " min"), hint: explainVitola(v), count: count("size", (p) => p.vitola === v) }))}
              sel={size}
              onToggle={(v) => setSize(flip(size, v))}
            />
            <div style={{ borderTop: "1px solid #E4D7C2", padding: "12px 0" }}>
              <label className="lbl" htmlFor="price" style={{ fontFamily: "var(--serif)", fontSize: 18 }}>Price: up to {max} DKK</label>
              <input id="price" type="range" min={50} max={MAX} step={5} value={max} onChange={(e) => setMax(Number(e.target.value))} />
              <p style={{ fontSize: 14, color: "#5a4435" }}>Our cigars run from 59 to 169 DKK.</p>
            </div>
          </aside>

          <div style={{ flex: "1 1 560px", minWidth: 0, display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
              <p style={{ fontWeight: 600 }} aria-live="polite">Showing {rows.length} {rows.length === 1 ? "cigar" : "cigars"}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <label className="lbl" htmlFor="sort" style={{ margin: 0 }}>Sort</label>
                <select id="sort" className="field" style={{ width: "auto", minWidth: 230 }} value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="rec">Recommended for beginners</option>
                  <option value="priceUp">Price: low to high</option>
                  <option value="priceDown">Price: high to low</option>
                  <option value="strUp">Strength: mild to full</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
            {chosen.length > 0 && (
              <div role="group" aria-label="Your filters" style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                <span style={{ fontWeight: 600, fontSize: 15 }}>Your filters:</span>
                {chosen.map((f) => (
                  <button key={f.label} type="button" className="chip" onClick={f.remove} aria-label={`Remove filter: ${f.label}`} style={{ minHeight: 36, padding: "0 12px", fontSize: 14 }}>
                    {f.label}<span aria-hidden="true" style={{ marginLeft: 6 }}>×</span>
                  </button>
                ))}
                <button type="button" className="chip" onClick={clearAll} style={{ minHeight: 36, padding: "0 12px", fontSize: 14 }}>Clear all</button>
              </div>
            )}
            {rows.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 22 }}>
                {rows.map((p) => <ProductCard key={p.id} p={p} />)}
              </div>
            ) : (
              <div className="card" style={{ padding: "44px 28px", textAlign: "center", display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
                <h3>No match – try removing a filter or take the quiz.</h3>
                <p style={{ color: "#3d2a20" }}>Sometimes one filter too many hides a good cigar.</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                  <button type="button" className="btn btn-primary btn-sm" onClick={clearAll}>Clear all filters</button>
                  <Link className="btn btn-ghost btn-sm" href="/quiz">Take the quiz</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <section id="packs" className="dark-sec on-dark">
        <div className="wrap sec">
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
            <span className="eyebrow">Starter &amp; sampler packs</span>
            <h2>Can’t decide? Start with a few.</h2>
          </div>
          <div className="g-3">
            {packs.map((k) => (
              <div key={k.id} id={k.slug} style={{ background: "#3a251a", border: "1px solid #6b4430", borderRadius: 14, padding: 26, display: "flex", flexDirection: "column", gap: 12, scrollMarginTop: 16 }}>
                {k.image && <div role="img" aria-label={k.image.alt} style={{ aspectRatio: "4 / 3", borderRadius: 10, background: photoBg(k.image.src) }} />}
                <span className="badge badge-dark" style={{ alignSelf: "flex-start" }}>{k.tag}</span>
                <h3>{k.name}</h3>
                {k.tagline && <p style={{ color: "#C8963E", fontWeight: 600 }}>{k.tagline}</p>}
                <p style={{ color: "#E8DCC6", flex: k.contents ? undefined : 1 }}>{k.body}</p>
                {k.contents && (
                  <ul style={{ color: "#E8DCC6", flex: 1, margin: 0, paddingLeft: 20, fontSize: 15.5, display: "flex", flexDirection: "column", gap: 4 }}>
                    {k.contents.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                )}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <span style={{ fontFamily: "var(--serif)", fontSize: 28 }}>{k.price} <span style={{ fontSize: 15, fontFamily: "var(--sans)" }}>DKK</span></span>
                  <button
                    type="button"
                    className="btn btn-gold btn-sm"
                    style={{ minWidth: 120 }}
                    onClick={() => { add(k.id); setPackAdded(k.id); setTimeout(() => setPackAdded(0), 1600); }}
                  >
                    {packAdded === k.id ? "Added" : "Add to cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// Remount when the URL query changes (header search, occasion chips) so filters re-initialise from it.
export default function Finder() {
  const sp = useSearchParams();
  return <FinderInner key={sp.toString()} />;
}
