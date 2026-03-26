import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "OpenClaw Is Dead — Declared dead many times, still alive with 335K stars";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Georgia, serif",
          padding: "60px 80px",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#111827",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          OpenClaw Is Dead
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#9ca3af",
            marginTop: 20,
            textAlign: "center",
          }}
        >
          ...but it keeps coming back.
        </div>
        <div
          style={{
            display: "flex",
            gap: 60,
            marginTop: 50,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 900, color: "#dc2626" }}>
              Declared Dead
            </div>
            <div
              style={{
                fontSize: 16,
                color: "#9ca3af",
                textTransform: "uppercase",
                letterSpacing: 3,
              }}
            >
              Many Times
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 900, color: "#16a34a" }}>
              Still Growing
            </div>
            <div
              style={{
                fontSize: 16,
                color: "#9ca3af",
                textTransform: "uppercase",
                letterSpacing: 3,
              }}
            >
              335K Stars
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: 18,
            color: "#d1d5db",
            marginTop: 50,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          openclawdeaths.xyz
        </div>
      </div>
    ),
    { ...size }
  );
}
