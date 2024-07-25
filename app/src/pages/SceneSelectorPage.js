import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

function SceneSelector() {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode } = location.state || {};
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
        const themes = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.Name,
            imageUrl: data.background_img,
            topAreaName: data.topAreaName,
            centerAreaName: data.centerAreaName,
            bottomAreaName: data.bottomAreaName,
            clickable: true,
          };
        });
        setScenes(themes);
      }
    } catch (error) {
      console.error("Error getting themes:", error);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSceneSelect = (scene) => {
    if (scene.clickable) {
      if (mode === "drawing") {
        navigate("/SceneAreaSelect", {
          state: {
            selectedScene: scene.id,
            imageUrl: scene.imageUrl,
            themeName: scene.name,
            topAreaName: scene.topAreaName,
            centerAreaName: scene.centerAreaName,
            bottomAreaName: scene.bottomAreaName,
          },
        });
      } else if (mode === "gallery") {
        navigate("/gallery", {
          state: { selectedScene: scene.id, imageUrl: scene.imageUrl },
        });
      }
    }
  };

  const handleMouseOver = (id) => {
    setHovered(id);
  };

  const handleMouseOut = () => {
    setHovered(null);
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      height: "100vh",
      boxSizing: "border-box",
    },
    headerContainer: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      width: "100%",
      justifyContent: "space-between",
      marginBottom: "10px",
    },
    backButton: {
      cursor: "pointer",
      margin: "5px",
      padding: "5px",
    },
    galleryText: {
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      fontWeight: 500,
      fontSize: "40px",
      textAlign: "center",
    },
    modeText: {
      fontWeight: 500,
      fontSize: "24px",
      marginTop: "0",
      marginBottom: "20px",
      textAlign: "center",
    },
    sceneGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
      gap: "20px",
      justifyContent: "center",
      width: "100%",
      maxWidth: "800px",
      margin: "0 auto",
      boxSizing: "border-box",
      alignItems: "center",
    },
    sceneItem: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      overflow: "hidden",
      borderRadius: "15px",
      aspectRatio: "1 / 1",
      transition: "transform 0.3s",
    },
    sceneItemHover: {
      transform: "scale(1.05)",
    },
    sceneImage: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    sceneName: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      color: "white",
      fontSize: "1.5em",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
      zIndex: 2,
      pointerEvents: "none",
      textAlign: "center",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      zIndex: 1,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <svg
          onClick={handleBackClick}
          style={styles.backButton}
          width="27"
          height="50"
          viewBox="0 0 25 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5309 17.1421L16.8658 31.5276C17.5826 32.1575 18.7439 32.1575 19.4624 31.5276C20.1792 30.8978 20.1792 29.8747 19.4624 29.2449L4.42318 16.0008L19.4606 2.75669C20.1774 2.12685 20.1774 1.10382 19.4606 0.472382C18.7438 -0.157461 17.5808 -0.157461 16.864 0.472382L0.529089 14.8578C-0.176665 15.4811 -0.176664 16.5202 0.5309 17.1421Z"
            fill="black"
          />
        </svg>
        {mode !== "drawing" && <h1 style={styles.galleryText}>Gallery</h1>}
      </div>
      <h3 style={styles.modeText}>
        {mode === "drawing"
          ? "Pick a theme to draw on!"
          : "View your previous drawings"}
      </h3>
      <div style={styles.sceneGrid}>
        {scenes.map((scene) => (
          <div
            key={scene.id}
            style={{
              ...styles.sceneItem,
              ...(hovered === scene.id && styles.sceneItemHover),
            }}
            onClick={() => handleSceneSelect(scene)}
            onMouseOver={() => handleMouseOver(scene.id)}
            onMouseOut={handleMouseOut}
          >
            <div style={styles.overlay}></div>
            <img
              src={scene.imageUrl}
              alt={scene.name}
              style={styles.sceneImage}
            />
            <div style={styles.sceneName}>{scene.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SceneSelector;
