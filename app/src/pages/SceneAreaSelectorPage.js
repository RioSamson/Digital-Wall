import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function SceneAreaSelector() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedScene, imageUrl } = location.state || {};

  const handleAreaSelect = (area) => {
    navigate("/drawing", { state: { selectedScene, area } });
  };

  const sceneContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    height: "100vh",
    boxSizing: "border-box",
  };

  const buttonContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    width: "80%",
    flexGrow: 1,
  };

  const buttonStyle = {
    position: "relative",
    backgroundSize: "100% 300%", // 300% to divide into three equal parts
    border: "none",
    cursor: "pointer",
    width: "100%",
    height: "calc((60vh - 40px) / 3)", // Adjusted for three buttons
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    color: "white",
    fontWeight: "bold",
    transition: "transform 0.3s ease, background-color 0.3s ease",
    boxSizing: "border-box",
  };

  const buttonOverlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark overlay
    zIndex: 1,
  };

  const buttonTextStyle = {
    position: "relative",
    zIndex: 2,
  };

  const buttonHoverStyle = {
    transform: "scale(1.05)",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  };

  const handleMouseOver = (e) => {
    Object.assign(e.currentTarget.style, buttonHoverStyle);
  };

  const handleMouseOut = (e) => {
    Object.assign(e.currentTarget.style, {
      transform: "scale(1)",
      backgroundColor: "transparent",
    });
  };

  return (
    <div style={sceneContainerStyle}>
      <h1>Select Area of Scene</h1>
      <div style={buttonContainerStyle}>
        <button
          style={{
            ...buttonStyle,
            backgroundImage: `url(${imageUrl})`,
            backgroundPosition: "top",
          }}
          onClick={() => handleAreaSelect("air")}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <div style={buttonOverlayStyle}></div>
          <span style={buttonTextStyle}>Air</span>
        </button>
        <button
          style={{
            ...buttonStyle,
            backgroundImage: `url(${imageUrl})`,
            backgroundPosition: "center",
          }}
          onClick={() => handleAreaSelect("land")}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <div style={buttonOverlayStyle}></div>
          <span style={buttonTextStyle}>Land</span>
        </button>
        <button
          style={{
            ...buttonStyle,
            backgroundImage: `url(${imageUrl})`,
            backgroundPosition: "bottom",
          }}
          onClick={() => handleAreaSelect("water")}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <div style={buttonOverlayStyle}></div>
          <span style={buttonTextStyle}>Water</span>
        </button>
      </div>
    </div>
  );
}

export default SceneAreaSelector;
