// Plain-language explanations of cigar terms, shared by product cards and product pages.
// Edit the wording here; nothing is written per product. Smoking times are general ranges for the size,
// not facts about a specific cigar (a product's own `minutes` value is shown separately).

import { STRENGTH_LABELS, type Vitola } from "./products";

export const STRENGTH_PLAIN = [
  "",
  "Light and creamy. The gentlest place to start.",
  "A little more flavour, still smooth. A good first step.",
  "Noticeable body and richer notes. Best after a mild one.",
  "Bold and peppery. For when you know your taste.",
  "Very strong and intense. Save it for later.",
];

export const VITOLAS: Record<Vitola, { plain: string; time: string }> = {
  "Petit corona": { plain: "a small, slim cigar", time: "25–35 minutes" },
  Corona: { plain: "a slim, classic cigar of medium length", time: "40–50 minutes" },
  Robusto: { plain: "a medium-sized cigar, short and a little thick", time: "45–60 minutes" },
  Toro: { plain: "a longer, thicker cigar than a robusto", time: "60–90 minutes" },
  Churchill: { plain: "a long, elegant cigar", time: "90–120 minutes" },
};

export const WRAPPER = "The outer leaf you see and touch. It gives the cigar a lot of its flavour.";
export const BINDER = "The leaf that holds the inside together.";
export const FILLER = "The tobacco in the middle. It sets most of the strength.";

// Wrapper names that need their own explanation. Matched against the product's wrapper description.
const WRAPPER_TYPES: { name: string; match: RegExp; plain: string }[] = [
  { name: "Maduro", match: /maduro/i, plain: "a darker wrapper leaf, aged longer. Often sweeter, with notes like cocoa." },
  { name: "Connecticut", match: /connecticut/i, plain: "a light golden wrapper leaf, usually soft and creamy." },
];

export function explainStrength(strength: number) {
  return `${STRENGTH_LABELS[strength]}: ${STRENGTH_PLAIN[strength]}`;
}

export function explainVitola(v: Vitola) {
  const { plain, time } = VITOLAS[v];
  return `${v}: ${plain}. A cigar this size usually takes about ${time}.`;
}

// Generic wrapper explanation, plus the specific wrapper type when the description names one.
export function explainWrapper(wrapper: string) {
  const type = WRAPPER_TYPES.find((t) => t.match.test(wrapper));
  return type ? `${WRAPPER} ${type.name}: ${type.plain}` : WRAPPER;
}
