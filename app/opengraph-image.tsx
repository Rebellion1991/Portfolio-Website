import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const alt = "Ahmed Shenawy - Mobile Network Specialist"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

// Image generation
export default async function Image() {
  // Font
  const interSemiBold = fetch(
    new URL(
      "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZFhjQ.woff2",
      import.meta.url,
    ),
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    <div
      style={{
        fontSize: 128,
        background: "linear-gradient(to bottom, #ffffff, #f5f5f5)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "20px",
          background: "white",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "100%",
          height: "100%",
          padding: "40px",
        }}
      >
        <div
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            color: "#007bff",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Ahmed Shenawy
        </div>
        <div
          style={{
            fontSize: "32px",
            color: "#333",
            marginBottom: "40px",
            textAlign: "center",
          }}
        >
          Mobile Network Specialist
        </div>
        <div
          style={{
            fontSize: "24px",
            color: "#666",
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          Specializing in Mobile Core Network Services and Roaming Services Optimization
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: await interSemiBold,
          style: "normal",
          weight: 600,
        },
      ],
    },
  )
}
