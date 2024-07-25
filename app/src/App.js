import React from "react";
import { useNavigate } from "react-router-dom";
// import videoSource from "./assets/Animation-Digitallab_3.mp4";
// import videoSource from "./assets/jellyfish.mp4";
import videoSource from "./assets/DigitalLabV3.mp4";
import labLogo from "./assets/digitalLab.png";

const App = () => {
  const navigate = useNavigate();

  const handleGuestClick = () => {
    navigate("/SceneSelect", { state: { mode: "drawing" } });
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100svw",
        height: "100svh",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          top: 0,
          left: 0,
        }}
      >
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
          boxSizing: "border-box",
          padding: "0 20px",
        }}
      >
         <img
          src={labLogo}
          alt="Lab Logo"
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            width: "150px",
            height: "auto",
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "75%", 
            transform: "translateY(-50%)", 
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <button
            onClick={handleLoginClick}
            style={{
              margin: "10px",
              padding: "2vh 33vw",
              fontSize: "24px",
              fontWeight: 500,
              backgroundColor: "black",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              boxSizing: "border-box",
            }}
          >
            Login
          </button>
          <button
            onClick={handleGuestClick}
            style={{
              margin: "10px",
              padding: "2vh 33vw",
              fontSize: "24px",
              fontWeight: 500,
              backgroundColor: "transparent",
              color: "black",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              boxSizing: "border-box",
            }}
          >
            Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
