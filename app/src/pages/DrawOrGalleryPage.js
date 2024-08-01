import React from "react";
import { useNavigate } from "react-router-dom";
import "./DrawOrGalleryPage.css";
import startDrawingImage from "../assets/startDrawing.png";
import viewGalleryImage from "../assets/viewGallery.png";

/**
 * DrawOrGalleryPage component
 * 
 * This component provides a choice between starting a drawing and viewing the gallery.
 * It displays two fullscreen buttons that navigate to the respective pages.
 * 
 * @component
 * @example
 * return (
 *   <DrawOrGalleryPage />
 * )
 */
function DrawOrGalleryPage() {
  const navigate = useNavigate();

  /**
   * Navigates to the SceneSelect page with drawing mode
   */
  const navigateToDrawing = () => {
    navigate("/SceneSelect", { state: { mode: "drawing" } });
  };

  /**
   * Navigates to the SceneSelect page with gallery mode
   */
  const navigateToGallery = () => {
    navigate("/SceneSelect", { state: { mode: "gallery" } });
  };

  return (
    <div className="container">
      {/* Button to navigate to the drawing scene selection */}
      <button className="full-screen-button" onClick={navigateToDrawing}>
        <img
          src={startDrawingImage}
          alt="Start Drawing"
          className="button-image"
        />
      </button>
      {/* Button to navigate to the gallery scene selection */}
      <button className="full-screen-button" onClick={navigateToGallery}>
        <img
          src={viewGalleryImage}
          alt="View Gallery"
          className="button-image"
        />
      </button>
    </div>
  );
}

export default DrawOrGalleryPage;
