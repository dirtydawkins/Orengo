import { ImageResponse } from "next/og";
export const dynamic = "force-static";
export const alt = "Lameck Orengo, full-stack developer in Nairobi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: 70,
        background: "#0B0D10",
        color: "#F2EEE6",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
        }}
      >
        <span>Lameck Orengo.</span>
        <span style={{ color: "#C8AD82" }}>Nairobi, Kenya</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 80,
          lineHeight: 1.05,
          letterSpacing: -4,
        }}
      >
        <span>Websites and systems</span>
        <span>built to work.</span>
      </div>
      <div style={{ display: "flex", fontSize: 22, color: "#C8AD82" }}>
        Full-stack developer · lamecorengo.vercel.app
      </div>
    </div>,
    size,
  );
}
