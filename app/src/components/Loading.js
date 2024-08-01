import React from "react";

/**
 * Loading component
 *
 * This component provides a loading screen overlay with an animated loading indicator.
 *
 * @returns {JSX.Element} The Loading component
 */
const Loading = () => {
  return (
    <div
      style={{
        position: "fixed", // Ensures the loading overlay covers the entire screen
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000, // High z-index to ensure it overlays other content
        color: "white",
        fontSize: "24px",
      }}
    >
      <div>Loading...</div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        {/* Animated dots indicating loading */}
        <div
          style={{
            width: "10px",
            height: "10px",
            margin: "0 5px",
            backgroundColor: "orange",
            borderRadius: "50%",
            animation: "dot-blink 1s infinite",
          }}
        ></div>
        <div
          style={{
            width: "10px",
            height: "10px",
            margin: "0 5px",
            backgroundColor: "orange",
            borderRadius: "50%",
            animation: "dot-blink 1s infinite",
            animationDelay: "0.2s", // Delay for staggered blinking effect
          }}
        ></div>
        <div
          style={{
            width: "10px",
            height: "10px",
            margin: "0 5px",
            backgroundColor: "orange",
            borderRadius: "50%",
            animation: "dot-blink 1s infinite",
            animationDelay: "0.4s", // Delay for staggered blinking effect
          }}
        ></div>
      </div>
      <style>{`
        @keyframes dot-blink {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
