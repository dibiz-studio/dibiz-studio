"use client";

import { useEffect } from "react";
import { initWebLanding } from "./landing-script";

/** Runs the landing page behaviour once per visit to the page (also safe under React strict mode). */
export default function LandingInit() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".lpw");
    if (!root || root.dataset.ready) return;
    root.dataset.ready = "1";
    initWebLanding();
  }, []);

  return null;
}
