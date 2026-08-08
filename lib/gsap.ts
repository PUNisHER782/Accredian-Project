"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

let registered = false;

/**
 * Registers GSAP plugins exactly once, client-side only.
 * Import this in any component that needs ScrollTrigger/ScrollToPlugin
 * instead of registering plugins ad-hoc in every file.
 */
export function useGsapPlugins() {
  if (typeof window !== "undefined" && !registered) {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    registered = true;
  }
  return gsap;
}

export { gsap, ScrollTrigger, ScrollToPlugin };
