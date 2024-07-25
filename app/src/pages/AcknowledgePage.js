import React from "react";

function AcknowledgePage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 10, // Ensure it's on top
        }}
      >
        <svg width="168" height="289" viewBox="0 0 168 289" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="126.834" cy="199.71" rx="54.857" ry="50.7719" transform="rotate(12.5958 126.834 199.71)" fill="#FFD5A6"/>
          <ellipse cx="172.035" cy="120.961" rx="54.857" ry="50.7719" transform="rotate(12.5958 172.035 120.961)" fill="#FFD5A6"/>
          <ellipse cx="208.234" cy="36.3179" rx="54.857" ry="50.7719" transform="rotate(12.5958 208.234 36.3179)" fill="#FFD5A6"/>
        </svg>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "-3500%",
          left: 0,
          width: "auto",
          height: "auto",
          zIndex: 10, // Ensure it's on top
        }}
      >
        <svg
          width="322"
          height="241"
          viewBox="0 0 322 241"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "auto" }} // Ensures responsiveness
        >
          <path
            d="M-32.9952 5.40134L-35.8151 60.245C30.0767 46.6642 55.7297 57.588 54.6651 66.618C53.6005 75.648 40.3806 80.5712 8.39501 83.8491C-23.5906 87.127 -51.4679 104.704 -67.0382 128.876C-82.6086 153.049 -79.0813 203.536 -24.0989 225.453C30.8835 247.37 80.0016 221.441 107.617 201.97C135.232 182.499 141.814 186.799 153.984 227.206C166.154 267.612 196.95 290.567 266.314 288.09C321.804 286.109 324.705 199.084 319.219 155.82L250.007 160.786L246.662 211.84C246.187 217.699 243.031 229.375 234.203 229.209C223.168 229.002 221.066 240.3 203.516 179.206C185.967 118.112 142.78 108.848 94.7134 142.355C46.6464 175.863 5.81152 200.257 -7.97603 171.854C-19.0061 149.131 4.51036 138.905 17.6473 136.632C54.9287 130.238 126.009 103.76 112.08 48.9994C98.1508 -5.76095 9.55937 -2.88278 -32.9952 5.40134Z"
            fill="#C9F2D2"
          />
        </svg>
      </div>
      <span>Hi</span>
    </div>
  );
}

export default AcknowledgePage;
