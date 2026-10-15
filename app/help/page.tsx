import type { Metadata } from "next";
import HelpCenter from "@/components/HelpCenter";
import TrustBar from "@/components/TrustBar";

export const metadata: Metadata = { title: "Help & support", description: "Answers about age verification, delivery, freshness, storage and replacements." };

export default function HelpPage() {
  return (
    <>
      <HelpCenter />
      <TrustBar />
    </>
  );
}
