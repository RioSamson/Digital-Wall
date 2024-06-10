import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import forestScene from "../assets/forestScene.png";
import loginScene from "../assets/login.png";

function SceneSelector() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  const scenes = [
    { id: "scene1", name: "Scene 1", imageUrl: forestScene, clickable: true },
    { id: "scene2", name: "Scene 2", imageUrl: loginScene, clickable: false },
    // Add more scenes as needed, with imported image references
  ];

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
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
            {hovered === scene.id && !scene.clickable && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  color: "white",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                Coming soon
              </div>
            )}
            <p>{scene.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SceneSelector;
