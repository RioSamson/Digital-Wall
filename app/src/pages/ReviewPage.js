import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import Lottie from "lottie-react";
import animationData from "../assets/paper-plane.json";

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
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center", // Center content vertically
        overflow: "hidden",
      }}
    >
      <h1>Your drawing has been submitted!</h1>
      <div style={{ flex: 1, maxWidth: "100%" }}>
        <Lottie
          animationData={animationData}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          maxWidth: "100%",
          flex: 1,
          marginTop: "2%",
          marginBottom: "2%", // Adjust the spacing here
        }}
      >
        <div>
          {originalImage ? (
            <img
              src={originalImage}
              alt="Original Drawing"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          ) : (
            <p>--</p>
          )}
        </div>
        <div>
          {enhancedImage ? (
            <img
              src={enhancedImage}
              alt="Enhanced Drawing"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          ) : (
            <p>--</p>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          style={{
            margin: "10px",
            width: "100%",
            height: "50px",
            fontSize: "1.125rem",
            backgroundColor: "black",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          disabled
        >
          View Display
        </button>
        <button
          onClick={handleNavigate}
          style={{
            margin: "10px",
            width: "100%",
            height: "50px",
            fontSize: "1.125rem",
            backgroundColor: "white",
            color: "black",
            border: "2px solid black",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Go to Home Page
        </button>
      </div>
    </div>
  );
}

export default ReviewPage;
