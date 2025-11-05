// src/components/ChatbaseIdentify.tsx
"use client";

import { useEffect } from "react";

async function fetchToken() {
  const res = await fetch("/api/chatbase-identify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}), // server validates session; do not send untrusted userId
    credentials: "include", // if you use cookies/sessions; optional
  });

  if (!res.ok) {
    console.error("Failed to get chatbase token:", await res.text());
    return null;
  }
  const data = await res.json();
  return data.token as string | null;
}

export default function ChatbaseIdentify() {
  useEffect(() => {
    let mounted = true;

    async function identifyUserWhenReady() {
      const timeoutMs = 10000;
      const intervalMs = 200;
      const started = Date.now();

      // wait until Chatbase embed appears on window
      while (mounted && Date.now() - started < timeoutMs) {
        // @ts-ignore
        if (typeof window !== "undefined" && (window as any).chatbase && typeof (window as any).chatbase === "function") {
          break;
        }
        await new Promise((r) => setTimeout(r, intervalMs));
      }

      const token = await fetchToken();
      if (!token) return;

      try {
        // @ts-ignore
        (window as any).chatbase?.("identify", { token });
        console.log("Chatbase identify called");
      } catch (e) {
        console.error("chatbase identify failed", e);
      }
    }

    identifyUserWhenReady();
    return () => {
      mounted = false;
    };
  }, []);

  return null;
}
