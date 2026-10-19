// All brands, farms, reviews and people are fictional (prototype content).

export type Country = "Colombia" | "Dominican Republic" | "Nicaragua" | "Honduras" | "Ecuador" | "Mexico";
export type Flavour = "sweet" | "woody" | "spicy" | "earthy" | "coffee";
export type Occasion = "celeb" | "gift" | "relax" | "out" | "first";
export type Vitola = "Petit corona" | "Corona" | "Robusto" | "Toro" | "Churchill";

export type Product = {
  id: number;
  slug: string;
  name: string;
  brand: string;
  country: Country;
  strength: 1 | 2 | 3 | 4 | 5;
  flavours: Flavour[];
  notes: string[];
  occasions: Occasion[];
  vitola: Vitola;
  lengthMm: number;
  ring: number;
  minutes: number;
  beginner: boolean;
  price: number;
  rating: number;
  reviews: number;
  wrapper: string;
  binder: string;
  filler: string;
  profile: { sweet: number; creamy: number; woody: number; spicy: number; earthy: number };
  blurb: string;
  tasting: string;
  image?: { src: string; alt: string };
};

export type Pack = {
  id: number;
  slug: string;
  name: string;
  tag: string;
  body: string;
  price: number;
};

export const STRENGTH_LABELS = ["", "Mild", "Mild–Medium", "Medium", "Medium–Full", "Full"];

export const OCCASION_LABELS: Record<Occasion, string> = {
  celeb: "Celebration",
  gift: "Gift",
  relax: "Relaxing evening",
  out: "Outdoors / with friends",
  first: "First-time try",
};

export const FLAVOUR_LABELS: Record<Flavour, string> = {
  sweet: "Sweet & creamy",
  woody: "Woody & nutty",
  spicy: "Spicy",
  earthy: "Earthy",
  coffee: "Coffee & cocoa",
};

export const COUNTRY_FLAGS: Record<Country, string> = {
  Colombia: "linear-gradient(#FCD116 50%,#003893 50% 75%,#CE1126 75%)",
  "Dominican Republic": "linear-gradient(90deg,#002D62 0 45%,#ffffff 45% 55%,#CE1126 55%)",
  Nicaragua: "linear-gradient(#0067C6 33%,#ffffff 33% 66%,#0067C6 66%)",
  Honduras: "linear-gradient(#0073CF 33%,#ffffff 33% 66%,#0073CF 66%)",
  Ecuador: "linear-gradient(#FFDD00 50%,#034EA2 50% 75%,#ED1C24 75%)",
  Mexico: "linear-gradient(90deg,#006847 33%,#ffffff 33% 66%,#CE1126 66%)",
};

export const STRENGTH_BG = [
  "",
  "linear-gradient(135deg,#8f6740,#E3B867)",
  "linear-gradient(135deg,#7a4f33,#D9A85A)",
  "linear-gradient(135deg,#5f3b28,#B7803F)",
  "linear-gradient(135deg,#432a1d,#8A5A3B)",
  "linear-gradient(135deg,#2A1A12,#5b3825)",
];

export const photoBg = (src: string) => `center / cover no-repeat url(${src})`;

export const VITOLA_EXPLAINED: Record<Vitola, string> = {
  "Petit corona": "Small and quick: a short, slim cigar for a short break.",
  Corona: "Slim and classic. A relaxed smoke of about 45 minutes.",
  Robusto: "A classic shape: short and a little thick, easy to enjoy in under an hour.",
  Toro: "Longer and thicker than a robusto, made for a slow evening.",
  Churchill: "Long and elegant. Block out an evening and settle in.",
};

export const ORIGIN_STORIES: Record<string, string> = {
  "Casa Aurelia":
    "Casa Aurelia is a small family-run farm in Colombia’s coffee highlands, where leaves are dried slowly in shaded barns and aged for over a year before rolling.",
  "Finca Montaña":
    "Finca Montaña grows its tobacco on steep mountain terraces in Colombia, picking by hand and ageing the leaf next to the farm’s coffee drying sheds.",
  "Luna Vieja":
    "Luna Vieja is a long-established rolling house in the Dominican Republic’s Cibao valley, known for a mellow, classic style that suits first-timers.",
  "Tabaquera Santiago":
    "Tabaquera Santiago is a third-generation workshop in Santiago, Dominican Republic. Their reserve blends are aged for several years.",
  "Isla Ceniza":
    "Isla Ceniza works in Nicaragua’s volcanic soil, which gives the leaf its depth. Their Connecticut-wrapped blends are the gentlest in the range.",
  "Valle Brisa":
    "Valle Brisa is a boutique rolling house with farms in Honduras and Ecuador, known for light, silky wrapper leaves.",
  "Rancho Sol":
    "Rancho Sol grows sun-dried tobacco in Mexico’s Veracruz region, where warm days give the leaf its sweet spice.",
};

type Seed = Omit<Product, "slug" | "profile"> & { p: [number, number, number, number, number] };

const seeds: Seed[] = [
  { id: 1, name: "Aurora Robusto", brand: "Casa Aurelia", country: "Colombia", strength: 2, flavours: ["sweet", "woody"], notes: ["Cream", "Honey", "Light cedar"], occasions: ["gift", "first", "relax"], vitola: "Robusto", lengthMm: 124, ring: 50, minutes: 45, beginner: true, price: 89, rating: 4.8, reviews: 128, wrapper: "Colombian, light golden", binder: "Colombian", filler: "Colombian", p: [4, 5, 2, 1, 1], blurb: "A mild, creamy cigar with honey sweetness and a whisper of cedar. Gentle enough for a first time, and nice enough to give.", tasting: "Cream and honey on the first puffs, then light cedar and a soft finish. No sharp edges and no bitterness when smoked slowly." },
  { id: 2, name: "Andes Corona", brand: "Casa Aurelia", country: "Colombia", strength: 2, flavours: ["woody", "sweet"], notes: ["Almond", "Vanilla", "Toast"], occasions: ["first", "out"], vitola: "Corona", lengthMm: 142, ring: 44, minutes: 40, beginner: true, price: 79, rating: 4.7, reviews: 96, wrapper: "Colombian, golden brown", binder: "Colombian", filler: "Colombian", p: [4, 3, 4, 1, 1], blurb: "A slim, easy corona with toasted almond and vanilla. Short enough for a conversation, smooth enough for a beginner.", tasting: "Toasted almond up front, vanilla in the middle and a gentle toast at the end. Very easy to enjoy.", image: { src: "/products/andes-corona.webp", alt: "Bowls of almonds, hazelnuts and Brazil nuts on a rustic wooden table" } },
  { id: 3, name: "Sierra Dorada Toro", brand: "Finca Montaña", country: "Colombia", strength: 3, flavours: ["coffee", "spicy"], notes: ["Cocoa", "Caramel", "Soft spice"], occasions: ["celeb", "relax"], vitola: "Toro", lengthMm: 152, ring: 52, minutes: 70, beginner: true, price: 119, rating: 4.8, reviews: 74, wrapper: "Colombian, medium brown", binder: "Colombian", filler: "Colombian and Dominican", p: [4, 2, 3, 2, 1], blurb: "A step up in body, still smooth. Cocoa and caramel with a little spice at the end. Beautiful for a celebration.", tasting: "Cocoa and caramel early on, then a soft spice that warms but doesn’t bite.", image: { src: "/products/sierra-dorada-toro.webp", alt: "Freshly harvested cocoa pods and cocoa beans in front of young plants" } },
  { id: 4, name: "Café de la Sierra", brand: "Finca Montaña", country: "Colombia", strength: 3, flavours: ["coffee"], notes: ["Coffee", "Dark chocolate"], occasions: ["relax"], vitola: "Robusto", lengthMm: 127, ring: 50, minutes: 55, beginner: false, price: 109, rating: 4.6, reviews: 58, wrapper: "Colombian, dark brown", binder: "Colombian", filler: "Colombian", p: [2, 1, 3, 2, 3], blurb: "Rich coffee and dark chocolate. A medium cigar for people who like their coffee black. Better once you’ve tried a mild one.", tasting: "Fresh espresso and dark chocolate, with a dry finish. Rich, but not harsh.", image: { src: "/products/cafe-de-la-sierra.webp", alt: "Ripe red coffee cherries, one cut open to show the beans" } },
  { id: 5, name: "Golden Hour Petit Corona", brand: "Luna Vieja", country: "Dominican Republic", strength: 1, flavours: ["sweet"], notes: ["Light", "Creamy", "Sweet hay"], occasions: ["first", "out"], vitola: "Petit corona", lengthMm: 127, ring: 42, minutes: 30, beginner: true, price: 69, rating: 4.9, reviews: 211, wrapper: "Dominican, light", binder: "Dominican", filler: "Dominican", p: [4, 5, 1, 1, 1], blurb: "Our gentlest cigar. Light, creamy and short, so it’s perfect for a first try or a quiet half hour.", tasting: "Soft cream and sweet hay. Almost no pepper, no bitterness and no pressure.", image: { src: "/products/golden-hour-petit-corona.webp", alt: "Golden hay bales on a stubble field under a summer sky" } },
  { id: 6, name: "Ember Evening Robusto", brand: "Luna Vieja", country: "Dominican Republic", strength: 3, flavours: ["woody"], notes: ["Toasted nuts", "Leather"], occasions: ["out", "relax"], vitola: "Robusto", lengthMm: 127, ring: 50, minutes: 50, beginner: true, price: 99, rating: 4.7, reviews: 87, wrapper: "Dominican, medium brown", binder: "Dominican", filler: "Dominican and Nicaraguan", p: [2, 2, 4, 2, 2], blurb: "Toasted nuts and soft leather. A warm medium cigar that works as well on a balcony as by a fire.", tasting: "Toasted nuts first, then soft leather and a little warmth from the spice at the end.", image: { src: "/products/ember-evening-robusto.png", alt: "Close-up of a dark brown, leathery wrapper leaf" } },
  { id: 7, name: "Santiago Reserve", brand: "Tabaquera Santiago", country: "Dominican Republic", strength: 4, flavours: ["spicy", "coffee"], notes: ["Pepper", "Cedar", "Espresso"], occasions: ["celeb"], vitola: "Toro", lengthMm: 152, ring: 54, minutes: 80, beginner: false, price: 149, rating: 4.7, reviews: 49, wrapper: "Dominican, dark", binder: "Dominican", filler: "Dominican, Nicaraguan and Peruvian", p: [1, 1, 4, 5, 3], blurb: "A bold, peppery reserve for when you know your taste. Cedar and espresso under a firm spice.", tasting: "Black pepper and cedar, then espresso and a long, dry finish. Lots going on." },
  { id: 8, name: "Volcán Maduro", brand: "Isla Ceniza", country: "Nicaragua", strength: 4, flavours: ["coffee", "earthy"], notes: ["Dark cocoa", "Black pepper", "Earth"], occasions: ["relax"], vitola: "Robusto", lengthMm: 127, ring: 52, minutes: 60, beginner: false, price: 129, rating: 4.6, reviews: 63, wrapper: "Nicaraguan maduro, very dark", binder: "Nicaraguan", filler: "Nicaraguan", p: [2, 1, 2, 4, 5], blurb: "A dark maduro wrapper over bold Nicaraguan leaf. Cocoa, pepper and earth. Not for a first cigar.", tasting: "Dark cocoa and black pepper, then a deep earthy base. Slow, rich and bold.", image: { src: "/products/volcan-maduro.png", alt: "A dark volcanic island at dusk, a glow of fire at its peak reflected in the sea" } },
  { id: 9, name: "Volcán Connecticut", brand: "Isla Ceniza", country: "Nicaragua", strength: 2, flavours: ["sweet", "woody"], notes: ["Butter", "Cedar", "Light spice"], occasions: ["first", "gift"], vitola: "Robusto", lengthMm: 127, ring: 52, minutes: 55, beginner: true, price: 95, rating: 4.8, reviews: 142, wrapper: "Connecticut, light golden", binder: "Nicaraguan", filler: "Nicaraguan", p: [3, 5, 3, 2, 1], blurb: "The gentle side of Isla Ceniza. Buttery, with cedar and just a trace of spice. A safe first choice.", tasting: "Butter and cream, then soft cedar with a faint tingle of spice. Smooth throughout.", image: { src: "/products/volcan-connecticut.webp", alt: "A smoking volcano above green fields and trees under a clear blue sky" } },
  { id: 10, name: "Noche Fuerte", brand: "Isla Ceniza", country: "Nicaragua", strength: 5, flavours: ["spicy", "earthy"], notes: ["Strong pepper", "Tobacco", "Dark roast"], occasions: ["celeb"], vitola: "Toro", lengthMm: 152, ring: 56, minutes: 90, beginner: false, price: 159, rating: 4.5, reviews: 37, wrapper: "Nicaraguan, very dark", binder: "Nicaraguan", filler: "Nicaraguan", p: [1, 1, 2, 5, 5], blurb: "Our strongest cigar. Big pepper, dark roast and a long finish. Save this one for later.", tasting: "Strong pepper and dark roast, with a full, earthy body. Intense from start to end." },
  { id: 11, name: "Río Claro Corona", brand: "Valle Brisa", country: "Honduras", strength: 3, flavours: ["woody", "spicy"], notes: ["Cedar", "Nutmeg", "Dried fruit"], occasions: ["out", "gift"], vitola: "Corona", lengthMm: 142, ring: 44, minutes: 45, beginner: true, price: 85, rating: 4.6, reviews: 71, wrapper: "Honduran, medium brown", binder: "Honduran", filler: "Honduran and Nicaraguan", p: [2, 2, 4, 3, 2], blurb: "A medium cigar with cedar, nutmeg and a hint of dried fruit. A good next step after a mild one.", tasting: "Cedar and nutmeg, with a touch of dried fruit sweetness in the middle." },
  { id: 12, name: "Honey Leaf Petit", brand: "Valle Brisa", country: "Ecuador", strength: 1, flavours: ["sweet"], notes: ["Honey", "Hay", "Soft wood"], occasions: ["first", "out"], vitola: "Petit corona", lengthMm: 115, ring: 40, minutes: 25, beginner: true, price: 59, rating: 4.7, reviews: 119, wrapper: "Ecuadorian, silky light", binder: "Honduran", filler: "Honduran", p: [5, 4, 3, 1, 1], blurb: "A small, sweet cigar with a silky Ecuadorian wrapper. The lowest price and one of the easiest to enjoy.", tasting: "Honey and hay from the first puff, with a touch of soft wood. Light and friendly.", image: { src: "/products/honey-leaf-petit.webp", alt: "A honeybee on golden honeycomb" } },
  { id: 13, name: "Tierra Roja", brand: "Rancho Sol", country: "Mexico", strength: 4, flavours: ["earthy", "spicy"], notes: ["Earthy", "Sweet spice", "Cocoa"], occasions: ["relax"], vitola: "Robusto", lengthMm: 127, ring: 50, minutes: 60, beginner: false, price: 115, rating: 4.5, reviews: 44, wrapper: "Mexican, reddish dark", binder: "Mexican", filler: "Mexican and Nicaraguan", p: [2, 1, 2, 4, 5], blurb: "Earthy and sweet-spiced, with cocoa underneath. A bold, characterful cigar from Mexico.", tasting: "Earth and sweet spice up front, cocoa underneath, with a long, warm finish." },
  { id: 14, name: "Celebration Churchill", brand: "Casa Aurelia", country: "Colombia", strength: 3, flavours: ["sweet", "woody"], notes: ["Smooth", "Vanilla", "Toasted bread"], occasions: ["celeb", "gift"], vitola: "Churchill", lengthMm: 178, ring: 48, minutes: 100, beginner: true, price: 169, rating: 4.9, reviews: 93, wrapper: "Colombian, golden brown", binder: "Colombian", filler: "Colombian and Dominican", p: [4, 5, 3, 1, 1], blurb: "Long, smooth and made for a moment. Vanilla and toasted bread, with no sharp edges for the full hundred minutes.", tasting: "Smooth vanilla and toasted bread throughout. Remarkably even from first puff to last.", image: { src: "/products/celebration-churchill.png", alt: "Winston Churchill giving a speech with open arms in front of a large portrait of Abraham Lincoln" } },
];

const slugify = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const products: Product[] = seeds.map(({ p, ...rest }) => ({
  ...rest,
  slug: slugify(rest.name),
  profile: { sweet: p[0], creamy: p[1], woody: p[2], spicy: p[3], earthy: p[4] },
}));

export const packs: Pack[] = [
  { id: 101, slug: "first-draw-starter-trio", name: "First Draw Starter Trio", tag: "Mild · 3 cigars", body: "Three mild cigars (Aurora Robusto, Golden Hour Petit Corona, Volcán Connecticut), with a printed care guide card.", price: 229 },
  { id: 102, slug: "colombian-discovery-pack", name: "Colombian Discovery Pack", tag: "Colombian · 4 cigars", body: "Aurora Robusto, Andes Corona, Sierra Dorada Toro and Celebration Churchill: four ways to taste Colombia.", price: 349 },
  { id: 103, slug: "gift-celebration-box", name: "Gift Celebration Box", tag: "Gift · boxed", body: "Two cigars, a cutter and matches in a wooden box. Ready to give.", price: 399 },
];

export const FREE_DELIVERY_FROM = 500;
export const DELIVERY_FEE = 39;

export function getProduct(id: number) {
  return products.find((p) => p.id === id);
}
export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export type CatalogueItem = { id: number; name: string; brand: string; price: number; href: string; bg: string };

export function getItem(id: number): CatalogueItem | undefined {
  const p = getProduct(id);
  if (p) return { id, name: p.name, brand: p.brand, price: p.price, href: `/product/${p.slug}`, bg: p.image ? photoBg(p.image.src) : STRENGTH_BG[p.strength] };
  const k = packs.find((x) => x.id === id);
  if (k) return { id, name: k.name, brand: "First Draw", price: k.price, href: "/shop#packs", bg: STRENGTH_BG[1] };
  return undefined;
}

export function reviewsFor(p: Product) {
  const first = p.notes[0].toLowerCase();
  const list = [
    p.beginner
      ? { stars: 5, tag: "I’m a beginner", who: "Camilla, Frederiksberg", text: `My first ever cigar and I was nervous. The description of ${p.name} was spot on: ${first}, easy, no coughing. I felt looked after.` }
      : { stars: 5, tag: "Verified buyer", who: "Thomas, Aarhus", text: `Exactly as described. ${p.notes.join(", ")}. Glad the page was honest that this one is not for beginners.` },
    { stars: 5, tag: "Gift", who: "Henrik, Aalborg", text: "Bought it for my brother’s birthday. Arrived fresh, with a care card that made me look like I knew what I was doing." },
    { stars: 4, tag: "Verified buyer", who: "Anders, Copenhagen", text: `Lovely cigar for an evening on the balcony. Burned evenly the whole way through.` },
    { stars: 5, tag: "Verified buyer", who: "Maja, Odense", text: `${p.notes[0]} and ${p.notes[p.notes.length - 1].toLowerCase()}, exactly as promised. Ordering a pack next.` },
  ];
  return list;
}

export function recommendFor(p: Product): Product[] {
  return products
    .filter((x) => x.id !== p.id)
    .map((x) => ({ x, s: Math.abs(x.strength - p.strength) * 2 + (x.country === p.country ? -2 : 0) + (x.beginner === p.beginner ? 0 : 3) }))
    .sort((a, b) => a.s - b.s)
    .slice(0, 4)
    .map((r) => r.x);
}
