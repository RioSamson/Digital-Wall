import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

function ReviewPage() {
  const location = useLocation();
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

  return (
    <div>
      <h1>Your Drawings</h1>
      <div>
        <h2>Original Drawing</h2>
        {originalImage ? (
          <img src={originalImage} alt="Original Drawing" />
        ) : (
          <p>No original drawing found.</p>
        )}
      </div>
      <div>
        <h2>Enhanced Drawing</h2>
        {enhancedImage ? (
          <img src={enhancedImage} alt="Enhanced Drawing" />
        ) : (
          <p>No enhanced drawing found.</p>
        )}
      </div>
    </div>
  );
}

export default ReviewPage;
