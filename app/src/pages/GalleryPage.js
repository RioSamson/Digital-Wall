import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function GalleryPage() {
  const navigate = useNavigate();

  const handleDraw = () => {
    navigate('/drawing');
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>This is a gallery of all your previous art works</h1>
      <button 
        onClick={handleDraw} 
        style={{ margin: '10px', padding: '10px 20px' }}
      >
        Click to Draw
      </button>
    </div>
  )
}

export default GalleryPage