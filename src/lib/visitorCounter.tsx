import { useEffect, useState } from "react";

type Props = {
  namespace?: string;
  keyName?: string;
};

const VISITED_KEY = "visitor_counted_v1";

export default function VisitorCounter({ namespace, keyName }: Props) {
  const ns =
    namespace ??
    (import.meta as any).env.VITE_VISITOR_NAMESPACE ??
    "portfolio_synectron";
  const key = keyName ?? "unique_visitors";
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const apiBase = "https://api.countapi.xyz";

    const fetchValue = async () => {
      try {
        const res = await fetch(
          `${apiBase}/get/${encodeURIComponent(ns)}/${encodeURIComponent(key)}`,
        );
        const json = await res.json();
        if (json && typeof json.value === "number") setCount(json.value);
      } catch (e) {
        // ignore
      }
    };

    const hit = async () => {
      try {
        const res = await fetch(
          `${apiBase}/hit/${encodeURIComponent(ns)}/${encodeURIComponent(key)}`,
        );
        const json = await res.json();
        if (json && typeof json.value === "number") setCount(json.value);
      } catch (e) {
        await fetchValue();
      }
    };

    try {
      const hasVisited = localStorage.getItem(VISITED_KEY);
      if (!hasVisited) {
        hit();
        try {
          localStorage.setItem(VISITED_KEY, Date.now().toString());
        } catch {}
      } else {
        fetchValue();
      }
    } catch (e) {
      // localStorage may be unavailable; still try to fetch
      fetchValue();
    }
  }, [namespace, keyName]);

  return (
    <span className="text-sm text-muted-foreground">
      Visitors: {count ?? "—"}
    </span>
  );
}
