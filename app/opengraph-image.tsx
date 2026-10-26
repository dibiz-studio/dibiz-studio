import { ImageResponse } from "next/og";

// Default share image (WhatsApp, LinkedIn, X, etc.) for every page that doesn't set its own.
export const alt = "Dibiz Studio — D2C growth agency in Mumbai for content, Meta ads and websites";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0a0a0a",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 6, color: "#f58327", fontWeight: 700 }}>
          DIBIZ STUDIO
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>
            Scaling D2C brands
          </div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.05, color: "#f58327" }}>
            via content &amp; tech.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#bdbdbd" }}>
          Content · Meta &amp; Google ads · Websites · Brand — Mumbai
        </div>
      </div>
    ),
    size
  );
}
