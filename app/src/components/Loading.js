import React from "react";

const Loading = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        color: "white",
        fontSize: "24px",
      }}
    >
      <div>Loading...</div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
        <div style={{
          width: "10px",
          height: "10px",
          margin: "0 5px",
          backgroundColor: "orange",
          borderRadius: "50%",
          animation: "dot-blink 1s infinite",
        }}></div>
        <div style={{
          width: "10px",
          height: "10px",
          margin: "0 5px",
          backgroundColor: "orange",
          borderRadius: "50%",
          animation: "dot-blink 1s infinite",
          animationDelay: "0.2s",
        }}></div>
        <div style={{
          width: "10px",
          height: "10px",
          margin: "0 5px",
          backgroundColor: "orange",
          borderRadius: "50%",
          animation: "dot-blink 1s infinite",
          animationDelay: "0.4s",
        }}></div>
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
