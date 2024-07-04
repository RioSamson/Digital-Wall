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
  const [coordinates, setCoordinates] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchScene = async () => {
      if (selectedScene) {
        try {
          const docRef = doc(db, "Themes", selectedScene);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setCoordinates(data.coordinates || []);
            if (!backgroundImage) {
              setBackgroundImage(data.background_img);
            }
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
        } catch (error) {
          console.error("Error fetching drawings:", error);
        }
      }
    };

    fetchScene();
    fetchDrawings();
  }, [selectedScene, currentUser, backgroundImage]);

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

  const getRandomDrawings = (drawingsList, area, numCoordinates) => {
    const filteredDrawings = drawingsList.filter(
      (drawing) => drawing.displayArea === area
    );
    const shuffledDrawings = filteredDrawings.sort(() => 0.5 - Math.random());
    return shuffledDrawings.slice(0, numCoordinates);
  };

  const groupedCoordinates = coordinates.reduce((acc, coord) => {
    if (!acc[coord.area]) acc[coord.area] = [];
    acc[coord.area].push(coord);
    return acc;
  }, {});

  const selectedDrawings = {};
  Object.keys(groupedCoordinates).forEach((area) => {
    selectedDrawings[area] = getRandomDrawings(
      drawings,
      area,
      groupedCoordinates[area].length
    );
  });

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
          {Object.keys(groupedCoordinates).map((area) =>
            groupedCoordinates[area].map((coord, index) => {
              const drawing = selectedDrawings[area][index];
              if (drawing) {
                return (
                  <div
                    key={`${area}-${index}`}
                    style={{
                      position: "absolute",
                      width: "13%",
                      height: "13%",
                      top: `${coord.y}%`,
                      left: `${coord.x}%`,
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
                );
              }
              return null;
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default DisplayPage;
