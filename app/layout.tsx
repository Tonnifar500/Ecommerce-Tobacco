import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FunnelTracker from "@/components/FunnelTracker";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const source = Source_Sans_3({ subsets: ["latin"], variable: "--font-source", display: "swap" });

export const metadata: Metadata = {
  title: { default: "First Draw – Your first cigar, chosen for you", template: "%s · First Draw" },
  description: "A Danish cigar shop for first-timers. Simple guidance, honest descriptions and fresh delivery. Prototype with fictional products.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${source.variable}`}>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <FunnelTracker />
        </CartProvider>
      </body>
    </html>
  );
}
