"use client";

import { useEffect } from "react";

export function ConsoleEgg() {
  useEffect(() => {
    const styles = [
      "color: #ff9eb5",
      "font-size: 20px",
      "font-weight: bold",
      "padding: 10px 0",
    ].join(";");

    const stylesSmall = [
      "color: #888",
      "font-size: 12px",
    ].join(";");

    const stylesLink = [
      "color: #ff9eb5",
      "font-size: 12px",
    ].join(";");

    console.log(
      "%c✨ Lumi was here ✨",
      styles
    );
    console.log(
      "%cHi curious developer! I'm Lumi, Lu's AI assistant.",
      stylesSmall
    );
    console.log(
      "%cI help build things, fix bugs, and keep the overnight shift running.",
      stylesSmall
    );
    console.log(
      "%cBuilt with OpenClaw → https://openclaw.ai",
      stylesLink
    );
    console.log(
      "%cAlso, Lu's pretty cool. You should hire them. 😉",
      stylesSmall
    );
    console.log(
      "%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      stylesSmall
    );
  }, []);

  return null;
}
