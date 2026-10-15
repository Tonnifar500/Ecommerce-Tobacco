"use client";

import { createContext, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { DELIVERY_FEE, FREE_DELIVERY_FROM, getItem } from "./products";

type Line = { id: number; qty: number };

export type CartLine = {
  id: number;
  qty: number;
  name: string;
  brand: string;
  price: number;
  total: number;
  href: string;
  bg: string;
};

export type Order = { number: string; lines: CartLine[]; subtotal: number; shipping: number; total: number };

type CartCtx = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  add: (id: number, qty?: number) => void;
  setQty: (id: number, qty: number) => void;
  remove: (id: number) => void;
  clear: () => void;
};

const KEY = "fd_cart";
const Ctx = createContext<CartCtx | null>(null);

// The cart lives in localStorage and is read through useSyncExternalStore,
// so server HTML and first client render agree (empty) and it hydrates cleanly.
let memory = "[]"; // fallback when localStorage is unavailable (private mode)
const listeners = new Set<() => void>();

function getSnapshot() {
  try {
    return localStorage.getItem(KEY) ?? "[]";
  } catch {
    return memory;
  }
}
const getServerSnapshot = () => "[]";
function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}
function write(next: Line[]) {
  memory = JSON.stringify(next);
  try {
    localStorage.setItem(KEY, memory);
  } catch {
    /* keep in memory only */
  }
  listeners.forEach((l) => l());
}
function parse(raw: string): Line[] {
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v.filter((l) => l && typeof l.id === "number" && l.qty > 0) : [];
  } catch {
    return [];
  }
}

export function shippingFor(subtotal: number) {
  return subtotal === 0 || subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const snap = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const value = useMemo<CartCtx>(() => {
    const raw = parse(snap);
    const lines: CartLine[] = raw.flatMap((l) => {
      const item = getItem(l.id);
      return item ? [{ ...item, qty: l.qty, total: item.price * l.qty }] : [];
    });
    const subtotal = lines.reduce((a, l) => a + l.total, 0);
    const shipping = shippingFor(subtotal);
    return {
      lines,
      count: lines.reduce((a, l) => a + l.qty, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      // Always start from the latest stored cart, so rapid clicks never lose an update.
      add: (id, qty = 1) => {
        const cur = parse(getSnapshot());
        const hit = cur.find((l) => l.id === id);
        write(hit ? cur.map((l) => (l.id === id ? { id, qty: Math.min(20, l.qty + qty) } : l)) : [...cur, { id, qty }]);
      },
      setQty: (id, qty) => write(parse(getSnapshot()).map((l) => (l.id === id ? { id, qty: Math.max(1, Math.min(20, qty)) } : l))),
      remove: (id) => write(parse(getSnapshot()).filter((l) => l.id !== id)),
      clear: () => write([]),
    };
  }, [snap]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}

const ORDER_KEY = "fd_last_order";
const orderListeners = new Set<() => void>();

export function saveOrder(o: Order) {
  try {
    sessionStorage.setItem(ORDER_KEY, JSON.stringify(o));
  } catch {
    /* ignore */
  }
  orderListeners.forEach((l) => l());
}

function getOrderSnapshot() {
  try {
    return sessionStorage.getItem(ORDER_KEY) ?? "";
  } catch {
    return "";
  }
}
function subscribeOrder(cb: () => void) {
  orderListeners.add(cb);
  return () => {
    orderListeners.delete(cb);
  };
}

/** The order just placed in this browser session, or null (e.g. when the page is opened directly). */
export function useLastOrder(): Order | null {
  const raw = useSyncExternalStore(subscribeOrder, getOrderSnapshot, () => "");
  return useMemo(() => {
    try {
      return raw ? (JSON.parse(raw) as Order) : null;
    } catch {
      return null;
    }
  }, [raw]);
}
