import type { Metadata } from "next";
import Link from "next/link";
import Quiz from "@/components/Quiz";
import TrustBar from "@/components/TrustBar";
import { QUIZ_LENGTH } from "@/lib/quiz";

export const metadata: Metadata = { title: "Find my first cigar", description: "Answer 3 quick questions and we’ll suggest 2–3 cigars to start with." };

export default function QuizPage() {
  return (
    <>
      <section className="wrap" style={{ paddingTop: 48, paddingBottom: 24 }}>
        <div style={{ maxWidth: 760, display: "flex", flexDirection: "column", gap: 16 }}>
          <span className="eyebrow">Chosen for you</span>
          <h1 style={{ fontSize: "clamp(34px,4.6vw,56px)" }}>Find my first cigar</h1>
          <hr className="rule-l" />
          <p style={{ fontSize: 20, color: "#3d2a20" }}>Tell us the occasion, how strong you’d like it and which taste sounds best. We’ll suggest 2–3 cigars to start with.</p>
          <p style={{ fontWeight: 600, color: "#5a4435" }}>{QUIZ_LENGTH}.</p>
        </div>
      </section>

      <div className="wrap" style={{ paddingBottom: 64, display: "flex", flexDirection: "column", gap: 20 }}>
        <Quiz />
        <p>Prefer to read first? <Link href="/guide">The Beginner Guide</Link> explains strength, flavour and the words people use.</p>
      </div>

      <TrustBar />
    </>
  );
}
