import type { Metadata } from "next";
import Checkout from "@/components/Checkout";
import TrustBar from "@/components/TrustBar";

export const metadata: Metadata = { title: "Cart & checkout (demo)" };

export default function CartPage() {
  return (
    <>
      <Checkout />
      <TrustBar />
    </>
  );
}
