import React, { useEffect, useState } from "react";
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
        } catch (error) {
          console.error("Error fetching drawings:", error);
        }
      }
    };

    fetchScene();
    fetchDrawings();
  }, [selectedScene, currentUser, backgroundImage]);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        overflow: "hidden",
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
          top: "50%",
          left: "50%",
          width: "100%",
          height: "100%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        {drawings.map((drawing, index) => (
          <div
            key={index}
            style={{
              width: "5vw",
              height: "5vw",
              margin: "5px",
              boxSizing: "border-box",
            }}
          >
            <img
              src={drawing.original_drawing}
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
  );
}

export default DisplayPage;
