import type { Metadata } from "next";
import { Suspense } from "react";
import Finder from "@/components/Finder";
import TrustBar from "@/components/TrustBar";

export const metadata: Metadata = { title: "Cigar Finder" };

export default function ShopPage() {
  return (
    <>
      <Suspense fallback={<div className="wrap" style={{ padding: "60px 24px" }}>Loading cigars…</div>}>
        <Finder />
      </Suspense>
      <TrustBar />
    </>
  );
}
