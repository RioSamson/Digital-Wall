import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DrawOrGalleryPage.css';
import startDrawingImage from '../assets/startDrawing.png';
import viewGalleryImage from '../assets/viewGallery.png';

function DrawOrGalleryPage() {
  const navigate = useNavigate();

  const navigateToDrawing = () => {
    navigate('/SceneSelect');
  };

  const navigateToGallery = () => {
    navigate('/gallery');
  };

  return (
    <div className="container">
      <button className="full-screen-button" onClick={navigateToDrawing}>
        <img src={startDrawingImage} alt="Start Drawing" className="button-image" />
      </button>
      <button className="full-screen-button" onClick={navigateToGallery}>
        <img src={viewGalleryImage} alt="View Gallery" className="button-image" />
      </button>
    </div>
  );
}

export default DrawOrGalleryPage;
