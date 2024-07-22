import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function SceneAreaSelector() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedScene, imageUrl, themeName, topAreaName, centerAreaName, bottomAreaName } = location.state || {};

  const handleAreaSelect = (area) => {
    navigate("/drawing", { state: { selectedScene, area, themeName, topAreaName, centerAreaName, bottomAreaName, } });
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
    width: "90%",
    maxWidth: "600px",
    marginTop: "20px",
    overflow: "hidden",
    borderRadius: "10px",
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
    color: "white",
    transition: "transform 0.3s ease, background-color 0.3s ease",
    boxSizing: "border-box",
    borderRadius: "20px",
  };

  const buttonOverlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark overlay
    zIndex: 1,
    borderRadius: "20px",
  };
  const backButtonStyle = {
    position: "absolute",
    top: "10px",
    left: "20px",
    cursor: "pointer",
    margin: "5px",
    padding: "5px",
  };

  const buttonTextStyle = {
    position: "relative",
    zIndex: 2,
    fontWeight: 600,
    fontSize: "32px",
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
<div style={{ display: "flex", alignItems: "center", width: "100%", marginBottom: "10px" }}>
  <svg
          onClick={handleBackClick}
          style={backButtonStyle}
          width="20"
          height="32"
          viewBox="0 0 20 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5309 17.1421L16.8658 31.5276C17.5826 32.1575 18.7439 32.1575 19.4624 31.5276C20.1792 30.8978 20.1792 29.8747 19.4624 29.2449L4.42318 16.0008L19.4606 2.75669C20.1774 2.12685 20.1774 1.10382 19.4606 0.472382C18.7438 -0.157461 17.5808 -0.157461 16.864 0.472382L0.529089 14.8578C-0.176665 15.4811 -0.176664 16.5202 0.5309 17.1421Z"
            fill="black"
          />
        </svg>
        {/* <button style={{marginLeft: 'auto', fontSize:"22px", fontWeight:500, background: "black", color: "white", padding:"14px 22px", borderRadius: "10px"}}>start</button> */}
        </div>
      <h2 style={{fontWeight:500, fontSize: "24px", marginTop: "10px", marginLeft: "10px"}}>Choose a spot to place your drawing!</h2>
      <div style={buttonContainerStyle}>
        <button
          style={{
            ...buttonStyle,
            backgroundImage: `url(${imageUrl})`,
            backgroundPosition: "top",
          }}
          onClick={() => handleAreaSelect("top")}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <div style={buttonOverlayStyle}></div>
          <h2 style={buttonTextStyle}>{topAreaName}</h2>
        </button>
        <button
          style={{
            ...buttonStyle,
            backgroundImage: `url(${imageUrl})`,
            backgroundPosition: "center",
          }}
          onClick={() => handleAreaSelect("center")}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <div style={buttonOverlayStyle}></div>
          <h2 style={buttonTextStyle}>{centerAreaName}</h2>
        </button>
        <button
          style={{
            ...buttonStyle,
            backgroundImage: `url(${imageUrl})`,
            backgroundPosition: "bottom",
          }}
          onClick={() => handleAreaSelect("bottom")}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <div style={buttonOverlayStyle}></div>
          <h2 style={buttonTextStyle}>{bottomAreaName}</h2>
        </button>
      </div>
    </div>
  );
}

export default SceneAreaSelector;
