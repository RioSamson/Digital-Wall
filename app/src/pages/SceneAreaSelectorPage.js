import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function SceneAreaSelector() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedScene, imageUrl, themeName } = location.state || {};

  const handleAreaSelect = (area) => {
    navigate("/drawing", { state: { selectedScene, area, themeName } });
  };

  const handleBackClick = () => {
    navigate(-1); 
  };

  const sceneContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    height: "85vh",
    boxSizing: "border-box",
    position: "relative",
  };

  const buttonContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    width: "80%",
    marginTop: "20px",
    overflow: "hidden",
    borderRadius: "10px"
  };

  const buttonStyle = {
    position: "relative",
    backgroundSize: "100% 300%", 
    border: "none",
    cursor: "pointer",
    width: "100%",
    height: "calc((60vh - 40px) / 3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    color: "white",
    fontWeight: "bold",
    transition: "transform 0.3s ease, background-color 0.3s ease",
    boxSizing: "border-box",
    borderRadius: "10px",
  };

  const buttonOverlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark overlay
    zIndex: 1,
    borderRadius: "10px"
  };
   const backButtonStyle = {
    position: "absolute",
    top: "10px",
    left: "20px",
    cursor: "pointer",
    margin: "5px",
    padding:"5px"
  };

  const buttonTextStyle = {
    position: "relative",
    zIndex: 2,
    fontWeight: "normal",
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
      <svg
        onClick={handleBackClick}
        style={backButtonStyle}
        width="20"
        height="25"
        viewBox="0 0 25 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.5309 17.1421L16.8658 31.5276C17.5826 32.1575 18.7439 32.1575 19.4624 31.5276C20.1792 30.8978 20.1792 29.8747 19.4624 29.2449L4.42318 16.0008L19.4606 2.75669C20.1774 2.12685 20.1774 1.10382 19.4606 0.472382C18.7438 -0.157461 17.5808 -0.157461 16.864 0.472382L0.529089 14.8578C-0.176665 15.4811 -0.176664 16.5202 0.5309 17.1421Z"
          fill="black"
        />
      </svg>

      <h2 style={{fontWeight:"normal", marginTop: "10px", marginLeft: "10px"}}>Choose a spot to place your drawing!</h2>
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
          <span style={buttonTextStyle}>Sky</span>
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
