import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 12,
          background: "#0D1B3D",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="40" height="34" viewBox="0 0 56 48" fill="none">
          <path d="M8 44V18" stroke="white" strokeWidth="5" strokeLinecap="round" />
          <circle cx="8" cy="12" r="5" fill="white" />
          <path
            d="M14 44L28 20L42 44"
            stroke="#60A5FA"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M48 44V18" stroke="#5EEAD4" strokeWidth="5" strokeLinecap="round" />
          <circle cx="48" cy="12" r="5" fill="#5EEAD4" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
