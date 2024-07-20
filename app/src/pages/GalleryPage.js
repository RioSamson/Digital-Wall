import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { db } from "../firebase/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  doc,
} from "firebase/firestore";

function GalleryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedScene, imageUrl } = location.state || {};
  const { currentUser } = useAuth();
  const [prevDrawing, setPrevDrawing] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [readCount, setReadCount] = useState(0);

  const handleDisplay = () => {
    navigate(`/display?theme=${selectedScene}`, { state: { imageUrl } });
  };

  const viewAllHandler = () => {
    navigate("/myDrawing", {
      state: { selectedScene, userId: currentUser.email },
    });
  };

  const getDrawings = useCallback(
    async (selectedScene) => {
      try {
        const drawingsQuery = query(
          collection(db, "Drawings"),
          where("user_id", "==", doc(db, "Users", currentUser.email)),
          where("theme_id", "==", doc(db, "Themes", selectedScene)),
          orderBy("created_at", "desc"),
          limit(4)
        );

        const querySnapshot = await getDocs(drawingsQuery);
        const drawings = querySnapshot.docs
          .map((doc) => {
            const data = doc.data();
            return data.enhanced_drawings
              ? data.enhanced_drawings[data.enhanced_drawings.length - 1]
              : null;
          })
          .filter((url) => url !== null);

        setPrevDrawing(drawings);
        setReadCount(querySnapshot.size); // Log the number of documents read
      } catch (error) {
        console.error("Error getting drawings:", error);
      }
    },
    [currentUser.email]
  );

  useEffect(() => {
    getDrawings(selectedScene);
  }, [getDrawings, selectedScene]);

  const handleImageClick = (url) => {
    setSelectedImage(url);
  };

  const closeModal = () => {
    setSelectedImage(null);
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
    padding: "5px",
  };

  useEffect(() => {
    console.log(`Total documents read: ${readCount}`);
  }, [readCount]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#F8F8F8",
        width: "100%",
        height: "100%"
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          marginTop: "10px"
        }}
      >
        <svg
          onClick={handleBackClick}
          style={backButtonStyle}
          width="20"
          height="32"
          viewBox="0 0 25 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5309 17.1421L16.8658 31.5276C17.5826 32.1575 18.7439 32.1575 19.4624 31.5276C20.1792 30.8978 20.1792 29.8747 19.4624 29.2449L4.42318 16.0008L19.4606 2.75669C20.1774 2.12685 20.1774 1.10382 19.4606 0.472382C18.7438 -0.157461 17.5808 -0.157461 16.864 0.472382L0.529089 14.8578C-0.176665 15.4811 -0.176664 16.5202 0.5309 17.1421Z"
            fill="black"
          />
        </svg>
        <h2
        style={{
          fontWeight: 600,
          fontSize: "32px",
          margin: "0 auto",
          flexGrow: 1,
          textAlign: "center",
          color: "black",
        }}
      >
        Gallery
      </h2>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "10px",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <h3 style={{ fontWeight: 500, fontSize: "24px", marginLeft: "20px", color:"black" }}>
          My drawings
        </h3>
        <h3
          onClick={viewAllHandler}
          style={{
            marginRight: "20px",
            color: "black",
            textDecoration: "underline",
            fontSize: "24px",
            border: "none",
            fontWeight: 500,
          }}
        >
          View all
        </h3>
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
                background: "white",
                cursor: "pointer",
                borderRadius: "10px",
                padding: "5px"
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
          <p style={{ fontWeight: 500, fontSize: "24px", marginLeft: "20px", color:"black" }}>No drawings found</p>
        )}
      </div>
      <button
        onClick={handleDisplay}
        style={{
          display: 'flex',
          alignItems: "center",
          justifyContent: 'center',
          padding: '12px',
        backgroundColor: 'black',
        width: '90%',
        height: '56px',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        fontSize: '24px',
        boxSizing: 'border-box',
        margin: "30px",
        gap: "8px"
        }}
      >
        View Live Display
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.7857 13C22.5395 13 22.3033 13.0978 22.1291 13.272C21.955 13.4461 21.8572 13.6823 21.8572 13.9286L21.8572 20.6143C21.8559 21.3035 21.5816 21.9641 21.0943 22.4514C20.607 22.9387 19.9463 23.2131 19.2572 23.2143L5.88573 23.2143C5.19655 23.2131 4.53594 22.9387 4.04861 22.4514C3.56128 21.9641 3.28696 21.3035 3.28573 20.6143L3.28573 7.24285C3.28696 6.55366 3.56128 5.89306 4.04861 5.40573C4.53594 4.9184 5.19655 4.64408 5.88573 4.64285L12.5714 4.64285C12.8177 4.64285 13.0539 4.54502 13.228 4.37088C13.4022 4.19674 13.5 3.96055 13.5 3.71428C13.5 3.468 13.4022 3.23182 13.228 3.05768C13.0539 2.88354 12.8177 2.78571 12.5714 2.78571L5.88573 2.78571C4.70415 2.78742 3.57146 3.25757 2.73595 4.09307C1.90045 4.92858 1.43031 6.06127 1.42859 7.24285L1.42859 20.6143C1.43031 21.7959 1.90045 22.9286 2.73595 23.7641C3.57146 24.5996 4.70415 25.0697 5.88573 25.0714L19.2572 25.0714C20.4387 25.0697 21.5714 24.5996 22.4069 23.7641C23.2424 22.9286 23.7126 21.7959 23.7143 20.6143L23.7143 13.9286C23.7143 13.6823 23.6165 13.4461 23.4423 13.272C23.2682 13.0978 23.032 13 22.7857 13Z" fill="white"/>
            <path d="M23.7143 1.85712L16.2857 1.85712C16.0395 1.85712 15.8033 1.95495 15.6291 2.12909C15.455 2.30323 15.3572 2.53942 15.3572 2.78569C15.3572 3.03196 15.455 3.26815 15.6291 3.44229C15.8033 3.61643 16.0395 3.71426 16.2857 3.71426L21.4727 3.71426L11.915 13.272C11.8263 13.3577 11.7555 13.4602 11.7069 13.5735C11.6582 13.6867 11.6326 13.8086 11.6315 13.9319C11.6304 14.0552 11.6539 14.1775 11.7006 14.2916C11.7473 14.4057 11.8163 14.5094 11.9034 14.5966C11.9906 14.6837 12.0943 14.7527 12.2084 14.7994C12.3225 14.8461 12.4448 14.8696 12.5681 14.8685C12.6914 14.8674 12.8133 14.8418 12.9265 14.7931C13.0398 14.7445 13.1423 14.6737 13.228 14.585L22.7857 5.02726L22.7857 10.2143C22.7857 10.4605 22.8836 10.6967 23.0577 10.8709C23.2319 11.045 23.468 11.1428 23.7143 11.1428C23.9606 11.1428 24.1968 11.045 24.3709 10.8709C24.5451 10.6967 24.6429 10.4605 24.6429 10.2143L24.6429 2.78569C24.6429 2.53942 24.5451 2.30323 24.3709 2.12909C24.1968 1.95495 23.9606 1.85712 23.7143 1.85712Z" fill="white"/>
        </svg>
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
