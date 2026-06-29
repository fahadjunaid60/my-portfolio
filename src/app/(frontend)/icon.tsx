import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Favicon: the FJ monogram on the brand purple gradient (the orbit mark is too
// fine to read at favicon scale, per the logo system).
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(155deg, #8b5cf6 0%, #6d28d9 100%)",
          color: "white",
          fontSize: 17,
          fontWeight: 800,
          letterSpacing: "-1px",
          borderRadius: 7,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        FJ
      </div>
    ),
    { ...size },
  );
}
