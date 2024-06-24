import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { db } from "../firebase/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

function DisplayPage() {
  const location = useLocation();
  const { selectedScene, imageUrl } = location.state || {};
  const { currentUser } = useAuth();
  const [backgroundImage, setBackgroundImage] = useState(imageUrl);
  const [drawings, setDrawings] = useState([]);
  const [drawingPositions, setDrawingPositions] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchScene = async () => {
      if (!backgroundImage && selectedScene) {
        try {
          const docRef = doc(db, "Themes", selectedScene);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setBackgroundImage(docSnap.data().background_img);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching scene:", error);
        }
      }
    };

    const fetchDrawings = async () => {
      if (currentUser) {
        try {
          const drawingsRef = collection(db, "Drawings");
          const q = query(
            drawingsRef,
            where("user_id", "==", doc(db, "Users", currentUser.email)),
            where("theme_id", "==", doc(db, "Themes", selectedScene))
          );

          const querySnapshot = await getDocs(q);
          const drawingsList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setDrawings(drawingsList);
          calculatePositions(drawingsList);
        } catch (error) {
          console.error("Error fetching drawings:", error);
        }
      }
    };

    fetchScene();
    fetchDrawings();
  }, [selectedScene, currentUser, backgroundImage]);

  const calculatePositions = (drawingsList) => {
    const positions = [];
    const checkOverlap = (newPos, positions) => {
      return positions.some(
        (pos) =>
          Math.abs(newPos.top - pos.top) < 10 &&
          Math.abs(newPos.left - pos.left) < 10
      );
    };

    drawingsList.forEach((drawing) => {
      let top, left, newPos;

      do {
        left = Math.random() * 90; // Random left position between 0 and 90%
        if (drawing.displayArea === "top") {
          top = Math.random() * 30; // Random top position in the top third (0-30%)
        } else if (drawing.displayArea === "center") {
          top = 30 + Math.random() * 30; // Random top position in the middle third (30-60%)
        } else if (drawing.displayArea === "bottom") {
          top = 60 + Math.random() * 30; // Random top position in the bottom third (60-90%)
        }

        newPos = { top, left };
      } while (checkOverlap(newPos, positions));

      positions.push(newPos);
    });

    setDrawingPositions(
      positions.map((pos) => ({
        top: `${pos.top}%`,
        left: `${pos.left}%`,
      }))
    );
  };

  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      const aspectRatio = 1920 / 1080;
      const windowAspectRatio = window.innerWidth / window.innerHeight;

      if (windowAspectRatio > aspectRatio) {
        container.style.width = `${window.innerHeight * aspectRatio}px`;
        container.style.height = `${window.innerHeight}px`;
      } else {
        container.style.width = `${window.innerWidth}px`;
        container.style.height = `${window.innerWidth / aspectRatio}px`;
      }
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          maxWidth: "1920px",
          maxHeight: "1080px",
        }}
      >
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt="Background"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "100%",
              height: "100%",
              objectFit: "contain",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
        >
          {drawings.map((drawing, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                width: "10%",
                height: "10%",
                top: drawingPositions[index]?.top || "0%",
                left: drawingPositions[index]?.left || "0%",
                boxSizing: "border-box",
              }}
            >
              <img
                src={drawing.enhanced_drawings}
                alt={`Drawing ${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DisplayPage;
