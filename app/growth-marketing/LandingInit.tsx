"use client";

import { useEffect } from "react";
import { initGrowthLanding } from "./landing-script";

/** Runs the landing page behaviour once per visit to the page (also safe under React strict mode). */
export default function LandingInit() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".lpg");
    if (!root || root.dataset.ready) return;
    root.dataset.ready = "1";
    initGrowthLanding();
  }, []);

  return null;
}
