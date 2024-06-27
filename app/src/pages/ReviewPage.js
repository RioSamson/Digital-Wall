import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

function ReviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { docId } = location.state || {};
  const [originalImage, setOriginalImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      if (docId) {
        try {
          const drawingDocRef = doc(db, "Drawings", docId);
          const drawingDoc = await getDoc(drawingDocRef);

          if (drawingDoc.exists()) {
            const drawingData = drawingDoc.data();
            setOriginalImage(drawingData.original_drawing);
            setEnhancedImage(drawingData.enhanced_drawings[0]);
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching document:", error);
        }
      }
    };

    fetchImages();
  }, [docId]);

  const handleNavigate = () => {
    navigate("/selection");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Your Drawings</h1>
      <div>
        <h2>Original Drawing</h2>
        {originalImage ? (
          <img
            src={originalImage}
            alt="Original Drawing"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        ) : (
          <p>No original drawing found.</p>
        )}
      </div>
      <div>
        <h2>Enhanced Drawing</h2>
        {enhancedImage ? (
          <img
            src={enhancedImage}
            alt="Enhanced Drawing"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        ) : (
          <p>No enhanced drawing found.</p>
        )}
      </div>
      <button
        onClick={handleNavigate}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          color: "white",
          backgroundColor: "#007bff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Go to Home Page
      </button>
      <button
        style={{
          marginTop: "10px", // Smaller margin to differentiate spacing
          marginRight: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          color: "white",
          backgroundColor: "#6c757d", // Different color to indicate inactive state
          border: "none",
          borderRadius: "5px",
          cursor: "not-allowed", // Cursor to indicate non-interactive button
        }}
      >
        View Display
      </button>
    </div>
  );
}

export default ReviewPage;
