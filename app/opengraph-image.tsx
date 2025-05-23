import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Ahmed Shenawy - Mobile Network Specialist";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "40px 80px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "60px",
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              color: "#1a365d",
              lineHeight: 1.2,
              whiteSpace: "pre-wrap",
            }}
          >
            Ahmed Shenawy
          </h1>
          <p
            style={{
              fontSize: "30px",
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              color: "#4b5563",
              marginTop: "8px",
            }}
          >
            Senior Roaming Engineer
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
