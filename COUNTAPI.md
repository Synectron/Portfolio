# CountAPI Visitor Counter

This project now includes a public visitor counter using CountAPI (`src/lib/visitorCounter.tsx`). CountAPI is a free public counter service (https://countapi.xyz).

How it works:

- On first visit (per browser), the page will call CountAPI's `hit` endpoint to increment the public counter.
- Subsequent visits from the same browser will only `get` the current value (we use `localStorage` to avoid re-counting the same browser).
- The counter is displayed in the footer.

Configuration:

- You can override the CountAPI namespace by setting `VITE_VISITOR_NAMESPACE` in your `.env` (defaults to `portfolio_synectron`).
- The key defaults to `unique_visitors`.

Limitations:

- This approximates unique visitors per browser only. For stricter uniqueness (IP-based or cross-device), a server-side analytics backend is required.
