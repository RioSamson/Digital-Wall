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
  const [themeId, setThemeId] = useState(null);
  const [themeBackgroundImage, setThemeBackgroundImage] = useState(null);

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
            const themeId = drawingData.theme_id.id;
            setThemeId(themeId);

            // Fetch theme background image
            const themeDocRef = doc(db, "Themes", themeId);
            const themeDoc = await getDoc(themeDocRef);
            if (themeDoc.exists()) {
              const themeData = themeDoc.data();
              setThemeBackgroundImage(themeData.background_img);
            } else {
              console.error("No such theme document!");
            }
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

  const handleViewDisplay = () => {
    if (themeId) {
      navigate(`/display?theme=${themeId}`, {
        state: { imageUrl: themeBackgroundImage },
      });
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center", // Center content vertically
        overflow: "hidden",
        paddingTop: "15%"
      }}
    >
      <h1
      style={{
        fontWeight: "normal",
        color: "#F3801F"
      }}>Hurray!</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flex: 1,
          maxWidth: "100%",
          paddingTop:"10%"
        }}
      >
        <Lottie
          animationData={animationData}
          style={{ maxWidth: "65%", height: "auto" }}
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
          marginTop: "10%",
          marginBottom: "5%", 
        }}
      >
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
          onClick={handleNavigate}
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
            padding: "0 60px",
          }}
          disabled={!themeId || !themeBackgroundImage}
        >
          Home
        </button>
        <button
          onClick={handleViewDisplay}
          style={{
            margin: "10px",
            width: "100%",
            height: "50px",
            fontSize: "1.4rem",
            backgroundColor: "white",
            color: "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            padding: "0 40px",
            display: "flex", 
            alignItems: "center",
            justifyContent: "center", 
            gap: "5px", 
          }}>
            View Live Display
            <svg width="27" height="20" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.7857 13C22.5395 13 22.3033 13.0978 22.1291 13.272C21.955 13.4461 21.8572 13.6823 21.8572 13.9286L21.8572 20.6143C21.8559 21.3035 21.5816 21.9641 21.0943 22.4514C20.607 22.9387 19.9463 23.2131 19.2572 23.2143L5.88573 23.2143C5.19655 23.2131 4.53594 22.9387 4.04861 22.4514C3.56128 21.9641 3.28696 21.3035 3.28573 20.6143L3.28573 7.24285C3.28696 6.55366 3.56128 5.89306 4.04861 5.40573C4.53594 4.9184 5.19655 4.64408 5.88573 4.64285L12.5714 4.64285C12.8177 4.64285 13.0539 4.54502 13.228 4.37088C13.4022 4.19674 13.5 3.96055 13.5 3.71428C13.5 3.468 13.4022 3.23182 13.228 3.05768C13.0539 2.88354 12.8177 2.78571 12.5714 2.78571L5.88573 2.78571C4.70415 2.78742 3.57146 3.25757 2.73595 4.09307C1.90045 4.92858 1.43031 6.06127 1.42859 7.24285L1.42859 20.6143C1.43031 21.7959 1.90045 22.9286 2.73595 23.7641C3.57146 24.5996 4.70415 25.0697 5.88573 25.0714L19.2572 25.0714C20.4387 25.0697 21.5714 24.5996 22.4069 23.7641C23.2424 22.9286 23.7126 21.7959 23.7143 20.6143L23.7143 13.9286C23.7143 13.6823 23.6165 13.4461 23.4423 13.272C23.2682 13.0978 23.032 13 22.7857 13Z" fill="black"/>
            <path d="M23.7143 1.85712L16.2857 1.85712C16.0395 1.85712 15.8033 1.95495 15.6291 2.12909C15.455 2.30323 15.3572 2.53942 15.3572 2.78569C15.3572 3.03196 15.455 3.26815 15.6291 3.44229C15.8033 3.61643 16.0395 3.71426 16.2857 3.71426L21.4727 3.71426L11.915 13.272C11.8263 13.3577 11.7555 13.4602 11.7069 13.5735C11.6582 13.6867 11.6326 13.8086 11.6315 13.9319C11.6304 14.0552 11.6539 14.1775 11.7006 14.2916C11.7473 14.4057 11.8163 14.5094 11.9034 14.5966C11.9906 14.6837 12.0943 14.7527 12.2084 14.7994C12.3225 14.8461 12.4448 14.8696 12.5681 14.8685C12.6914 14.8674 12.8133 14.8418 12.9265 14.7931C13.0398 14.7445 13.1423 14.6737 13.228 14.585L22.7857 5.02726L22.7857 10.2143C22.7857 10.4605 22.8836 10.6967 23.0577 10.8709C23.2319 11.045 23.468 11.1428 23.7143 11.1428C23.9606 11.1428 24.1968 11.045 24.3709 10.8709C24.5451 10.6967 24.6429 10.4605 24.6429 10.2143L24.6429 2.78569C24.6429 2.53942 24.5451 2.30323 24.3709 2.12909C24.1968 1.95495 23.9606 1.85712 23.7143 1.85712Z" fill="black"/>
            </svg>
        </button>
      </div>
    </div>
  );
}

export default ReviewPage;
