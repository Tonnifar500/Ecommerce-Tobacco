"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Logs clicks on elements marked with data-funnel="stage:action" into
 * window.dataLayer (and the console in dev), so the funnel KPIs from the
 * team's funnel work can be wired to real analytics later.
 */
export default function FunnelTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-funnel]");
      if (!el) return;
      const [stage, action] = (el.dataset.funnel || "").split(":");
      const evt = { event: "funnel", stage, action, path: location.pathname, t: Date.now() };
      (window.dataLayer = window.dataLayer || []).push(evt);
      if (process.env.NODE_ENV !== "production") console.debug("[funnel]", evt);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
