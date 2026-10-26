"use client";

import { useEffect, useId, useRef, useState } from "react";

// A dotted term with a short explanation. Opens on mouse hover, on keyboard focus and on tap/click
// (tap again, tap elsewhere or press Escape to close). The explanation is linked with aria-describedby.
export default function Term({ children, tip }: { children: React.ReactNode; tip: string }) {
  const id = useId();
  const ref = useRef<HTMLSpanElement>(null);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [pinned, setPinned] = useState(false);
  const open = hover || focus || pinned;

  useEffect(() => {
    if (!pinned) return;
    const outside = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) setPinned(false); };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [pinned]);

  return (
    <span
      ref={ref}
      className={`term-wrap ${open ? "open" : ""}`}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHover(false)}
    >
      <button
        type="button"
        className="term"
        aria-describedby={id}
        onClick={() => setPinned(!pinned)}
        onFocus={(e) => setFocus(e.currentTarget.matches(":focus-visible"))}
        onBlur={() => { setFocus(false); setPinned(false); }}
        onKeyDown={(e) => { if (e.key === "Escape") { setFocus(false); setPinned(false); setHover(false); } }}
      >
        {children}
      </button>
      <span id={id} className="pop" role="tooltip">{tip}</span>
    </span>
  );
}
