import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { auth, db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

function GalleryPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [prevDrawing, setPrevDrawing] = useState([]);

  const handleDraw = () => {
    navigate("/SceneSelect");
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const getDrawings = async () => {
    const querySnapshot = await getDocs(collection(db, "drawing"));
    if (querySnapshot.empty) {
      console.log("No matching documents.");
    } else {
      //reading the drawings from DB
      const drawings = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const dataEmail = data.email;

          if (dataEmail === currentUser.email) {
            const urls = data.drawings;
            return urls; // Return the array of URLs
          } else {
            console.log("Email is different");
            return null;
          }
        })
      );

      // Filter out any null values and flatten the array of arrays
      const filteredDrawings = drawings.filter((urls) => urls !== null).flat();
      setPrevDrawing(filteredDrawings);
    }
  };

  useEffect(() => {
    getDrawings();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <h3>Hello {currentUser ? currentUser.email : "Guest"}</h3>
        <button
          onClick={handleLogout}
          style={{
            padding: "5px 15px",
            borderRadius: "5px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
        >
          Log Out
        </button>
      </div>
      <h1>My drawings</h1>
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
                border: "1px solid #ccc",
              }}
            >
              <img
                src={url}
                alt={`Drawing ${index}`}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          ))
        ) : (
          <p>No drawings found</p>
        )}
      </div>
      <button
        onClick={handleDraw}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Click to Draw
      </button>
    </div>
  );
}

export default GalleryPage;
