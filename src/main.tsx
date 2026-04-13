import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Prevent PWA service worker registration inside iframes (e.g. Opsette embed)
const isInIframe = (() => {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
})();

if (isInIframe) {
  navigator.serviceWorker?.getRegistrations().then((registrations) => {
    registrations.forEach((r) => r.unregister());
  });
}

createRoot(document.getElementById("root")!).render(<App />);
