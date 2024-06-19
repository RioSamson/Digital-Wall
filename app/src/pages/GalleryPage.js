import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { auth, db } from "../firebase/firebase";
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

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const getDrawings = async () => {
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
            console.log("user id is ", email);
            if (currentUser.email === email) {
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
          .filter((url) => url !== null);
        setPrevDrawing(drawings);
      }
    } catch (error) {
      console.error("Error getting drawings:", error);
    }
  };

  useEffect(() => {
    getDrawings();
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
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <h3>Hello {currentUser ? currentUser.email : "Guest"}</h3>
        <button
          onClick={handleLogout}
          style={{
            padding: "5px 15px",
            borderRadius: "5px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
        >
          Log Out
        </button>
      </div>
      <h1>My drawings</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        {prevDrawing.length > 0 ? (
          prevDrawing.map((url, index) => (
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
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        View the display
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
