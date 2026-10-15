import { COUNTRY_FLAGS, type Country } from "@/lib/products";

export default function Flag({ country, w = 22, h = 15 }: { country: Country; w?: number; h?: number }) {
  return <span aria-hidden="true" style={{ display: "inline-block", width: w, height: h, borderRadius: 2, border: "1px solid rgba(42,26,18,.25)", background: COUNTRY_FLAGS[country] }} />;
}
