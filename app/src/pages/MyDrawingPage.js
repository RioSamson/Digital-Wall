import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function MyDrawingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { drawings = [], selectedScene, imageUrl } = location.state || {};
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    console.log("Number of drawings:", drawings.length);
    console.log("selected scene is:", selectedScene);
    console.log("Drawings:", drawings);

  }, [drawings]);

  const handleImageClick = (url) => {
    setSelectedImage(url);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };
  const handleDisplay = () => {
    navigate("/display", { state: { selectedScene, imageUrl } });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>My Drawings</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        {drawings.length > 0 ? (
          drawings.map((url, index) => (
            <div
              key={index}
              style={{
                width: "150px",
                height: "150px",
                margin: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #ccc",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(url)}
            >
              <img
                src={url}
                alt={`Drawing ${index}`}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          ))
        ) : (
          <p>No drawings found</p>
        )}
      </div>

      {selectedImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "transparent",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                color: "black",
              }}
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Selected Drawing"
              style={{ maxWidth: "100%", maxHeight: "80vh" }}
            />
          </div>
        </div>
      )}

      <button
        onClick={handleDisplay}
        style={{ margin: '20px', padding: '10px 45px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '5px', fontSize: '1rem' }}
      >
        View Live Display
      </button>
    </div>
  );
}

export default MyDrawingPage;
