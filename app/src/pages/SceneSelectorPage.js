import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase"; 
import { collection, getDocs } from "firebase/firestore";

function SceneSelector() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const [scenes, setScenes] = useState([]);

  useEffect(() => {
    getThemes();
  }, []);

  const getThemes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Themes"));
      if (querySnapshot.empty) {
        console.log("No matching documents.");
      } else {
        const themes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().Name,
          imageUrl: doc.data().background_img,
          clickable: true
        }));
        setScenes(themes);
      }
    } catch (error) {
      console.error("Error getting themes:", error);
    }
  };

  const handleSceneSelect = (scene) => {
    if (scene.clickable) {
      navigate("/SceneAreaSelect", {
        state: { selectedScene: scene.id, imageUrl: scene.imageUrl },
      });
    }
  };

  const sceneGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "20px",
    width: "100%",
    maxWidth: "800px",
    margin: "0 auto",
  };

  const sceneItemStyle = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #ccc",
    padding: "10px",
    cursor: "pointer",
    transition: "transform 0.3s ease",
  };

  const sceneImageStyle = {
    width: "100%",
    height: "auto",
    objectFit: "cover",
  };

  const sceneItemHoverStyle = {
    transform: "scale(1.05)",
  };

  const handleMouseOver = (id) => {
    setHovered(id);
  };

  const handleMouseOut = () => {
    setHovered(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
      <h1>Select a Scene</h1>
      <div style={sceneGridStyle}>
        {scenes.map((scene) => (
          <div
            key={scene.id}
            style={{
              ...sceneItemStyle,
              ...(hovered === scene.id && sceneItemHoverStyle),
            }}
            onClick={() => handleSceneSelect(scene)}
            onMouseOver={() => handleMouseOver(scene.id)}
            onMouseOut={handleMouseOut}
          >
            <img
              src={scene.imageUrl}
              alt={scene.name}
              style={sceneImageStyle}
            />
            <p>{scene.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SceneSelector;
