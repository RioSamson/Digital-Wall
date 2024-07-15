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
  const handleBackClick = () => {
    navigate(-1);
  };

  const backButtonStyle = {
    position: "absolute",
    top: "10px",
    left: "20px",
    cursor: "pointer",
    margin: "5px",
    padding:"5px"
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
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
      </div>
      <h1 style={{ fontWeight: "normal", margin: "auto", flexGrow: 1, textAlign: "center" }}>My Drawings</h1>     
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
