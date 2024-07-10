import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

function GalleryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedScene, imageUrl } = location.state || {};
  const { currentUser } = useAuth();
  const [prevDrawing, setPrevDrawing] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleDisplay = () => {
    navigate("/display", { state: { selectedScene, imageUrl } });
  };

  const viewAllHandler = () => {
    navigate("/myDrawing", { state: { drawings: prevDrawing, selectedScene, imageUrl } });
  };

  const getDrawings = async (selectedScene) => {
    try {
      const querySnapshot = await getDocs(collection(db, "Drawings"));
      if (querySnapshot.empty) {
        console.log("No matching documents.");
      } else {
        const drawings = querySnapshot.docs
          .map((doc) => {
            const data = doc.data();
            const enhancedDrawings = data.enhanced_drawings;
            const email = data?.user_id?.id;
            const themeId = data?.theme_id?.id;

            if (currentUser.email === email && themeId === selectedScene) {
              if (enhancedDrawings && enhancedDrawings.length > 0) {
                return enhancedDrawings[enhancedDrawings.length - 1];
              } else {
                console.log("Nothing found");
                return null;
              }
            } else {
              return null;
            }
          })
          .filter((url) => url !== null)
          .sort((a, b) => b.timestamp - a.timestamp); 
        setPrevDrawing(drawings);
      }
    } catch (error) {
      console.error("Error getting drawings:", error);
    }
  };

  useEffect(() => {
    getDrawings(selectedScene);
  }, []);

  const handleImageClick = (url) => {
    setSelectedImage(url);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
      </div>
      <h1>Gallery</h1>
      <div style={{ display: "flex", alignItems: "center", marginTop: "10px", justifyContent: "space-between", width: "100%" }}>
      <h5 style={{ fontSize: "1.2rem", marginLeft:"20px" }}>My drawings on the display</h5>
      </div>
      <div style={{ display: "flex", alignItems: "center", marginTop: "10px", justifyContent: "space-between", width: "100%" }}>
      <h5 style={{ fontSize: "1.2rem", marginLeft:"20px" }}>My drawings</h5>
      <button onClick={viewAllHandler} style={{ marginRight: '20px', color: 'black', textDecoration: 'underline', fontSize: '1rem', border: "none", background:"white" }}>
          View All
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        {prevDrawing.length > 0 ? (
          prevDrawing.slice(0,4).map((url, index) => (
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
      <button
        onClick={handleDisplay}
        style={{ margin: '20px', padding: '10px 45px',backgroundColor: 'black', color:'white', border:'none', borderRadius:'5px', fontSize: '1rem'  }}
      >
        View Live Display
      </button>

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
    </div>
  );
}

export default GalleryPage;
