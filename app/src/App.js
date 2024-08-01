import React from "react"; // Import React library
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation

// Import the video and logo assets
// import videoSource from "./assets/Animation-Digitallab_3.mp4";
// import videoSource from "./assets/jellyfish.mp4";
import videoSource from "./assets/DigitalLabV3.mp4";
import labLogo from "./assets/digitalLab.png";

/**
 * The App component renders the landing page of the application, providing options
 * for users to either log in or continue as a guest. The page includes a background
 * video and a logo for branding purposes.
 *
 * @component
 * @returns {JSX.Element} The landing page with video background and navigation buttons.
 */
const App = () => {
  const navigate = useNavigate(); // Hook for navigating programmatically

  /**
   * Navigate to the SceneSelect page in drawing mode when the guest button is clicked.
   */
  const handleGuestClick = () => {
    navigate("/SceneSelect", { state: { mode: "drawing" } });
  };

  /**
   * Navigate to the login page when the login button is clicked.
   */
  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100svw", // Full viewport width
        height: "100svh", // Full viewport height
        overflow: "hidden", // Ensures content does not overflow
        boxSizing: "border-box", // Includes padding and border in element's dimensions
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
          objectFit: "cover", // Maintains aspect ratio while covering the entire container
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
          zIndex: 1, // Content is above the video
          boxSizing: "border-box",
          padding: "0 20px", // Padding for the container
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
            zIndex: 2, // Ensures logo is visible above other elements
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "75%",
            transform: "translateY(-50%)", // Vertically centers the buttons
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
              padding: "2vh 33vw", // Responsive padding
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
              backgroundColor: "transparent", // Distinct style for guest button
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

export default App; // Export the component for use in other parts of the application
