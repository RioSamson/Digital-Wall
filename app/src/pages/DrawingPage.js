import React, { useEffect, useMemo, useRef, useState } from "react";
import rough from "roughjs/bundled/rough.esm";
import { useNavigate, useLocation } from "react-router-dom";
import "./DrawingPage.css";
import { storage, db, auth } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import penImage from "../assets/pen.png";
import eraserImage from "../assets/eraser.png";
import width1Image from "../assets/width1.png";
import width2Image from "../assets/width2.png";
import width3Image from "../assets/width3.png";
import width4Image from "../assets/width4.png";
import width5Image from "../assets/width5.png";



function DrawingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const canvasReference = useRef(null);
  const contextReference = useRef(null);
  const [isPressed, setIsPressed] = useState(false);
  const [selectedColor, setSelectedColor] = useState("black"); 
  const [mode, setMode] = useState("pencil");
  const [showTextInput, setShowTextInput] = useState(false);
  const [inputText, setInputText] = useState("");
  const { selectedScene, area } = location.state || {};
  const [showColorPopup, setShowColorPopup] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);


  const uploadDrawing = async () => {
    const canvas = canvasReference.current;
    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/png")
    );
    if (!blob) return;

    const displayArea = area === 'air' ? 'top' :
                        area === 'land' ? 'center' : 
                        area === 'water' ? 'bottom' : 'undefined';

    let originalUrl = "", enhancedUrl = "";
    const uploadImage = async (path, imageBlob) => {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, imageBlob);
      return getDownloadURL(snapshot.ref);
    };

    originalUrl = await uploadImage(`drawing/original-${Date.now()}.png`, blob);
    enhancedUrl = await uploadImage(`drawing/enhanced-${Date.now()}.png`, blob);

    const currentUser = auth.currentUser;
    const drawingsCollection = collection(db, "Drawings");
    const themeRef = doc(db, "Themes", selectedScene);

    let userRef;
    if (currentUser) {
        userRef = doc(db, "Users", currentUser.email); 
    } else {
        userRef = doc(db, "Users", "guest"); 
    }

    const drawingData = {
         created_at: new Date(),
        original_drawing: originalUrl,
        enhanced_drawings: [enhancedUrl],
        user_id: userRef,
        theme_id: themeRef,
        email: currentUser ? currentUser.email : "guest",
        displayArea: displayArea,
        isReviewed: false
    };

    await addDoc(drawingsCollection, drawingData);

    console.log("Document successfully created!");
    navigate("/review", { state: { image: originalUrl } });
};

  const colors = useMemo(
    () => ["black", "red", "green", "orange", "blue", "purple"],
    []
  );

  const drawDottedBackground = (context, canvas) => {
    const dotRadius = 2; // Radius of each dot
    const spacing = 20; // Space between dots
    
    context.fillStyle = 'black'; // Color of dots
    for (let x = 0; x < canvas.width; x += spacing) {
      for (let y = 0; y < canvas.height; y += spacing) {
        context.beginPath();
        context.arc(x, y, dotRadius, 0, 2 * Math.PI);
        context.fill();
      }
    }
  };
  

  const clearCanvas = () => {
    const canvas = canvasReference.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const beginDraw = (e) => {
    contextReference.current.beginPath();
    const offsetX =
      e.nativeEvent.offsetX !== undefined
        ? e.nativeEvent.offsetX
        : e.touches[0].clientX -
          canvasReference.current.getBoundingClientRect().left;
    const offsetY =
      e.nativeEvent.offsetY !== undefined
        ? e.nativeEvent.offsetY
        : e.touches[0].clientY -
          canvasReference.current.getBoundingClientRect().top;
    contextReference.current.moveTo(offsetX, offsetY);
    setIsPressed(true);
  };

  const endDraw = (e) => {
    contextReference.current.closePath();
    setIsPressed(false);
  };

  const updateDraw = (e) => {
    if (!isPressed) return;

    const offsetX =
      e.nativeEvent.offsetX !== undefined
        ? e.nativeEvent.offsetX
        : (e.touches[0]?.clientX || 0) -
          canvasReference.current.getBoundingClientRect().left;
    const offsetY =
      e.nativeEvent.offsetY !== undefined
        ? e.nativeEvent.offsetY
        : (e.touches[0]?.clientY || 0) -
          canvasReference.current.getBoundingClientRect().top;

    contextReference.current.lineTo(offsetX, offsetY);
    contextReference.current.stroke();
  };

  useEffect(() => {
    const canvas = canvasReference.current;
    canvas.width = 500;
    canvas.height = 500;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = colors[0];
    context.lineWidth = 5;
    contextReference.current = context;

    clearCanvas();
  }, [colors]);

  useEffect(() => {
    const canvas = canvasReference.current;
    const preventDefault = (e) => e.preventDefault();

    canvas.addEventListener("touchstart", preventDefault, { passive: false });
    canvas.addEventListener("touchmove", preventDefault, { passive: false });
    canvas.addEventListener("touchend", preventDefault, { passive: false });

    return () => {
      canvas.removeEventListener("touchstart", preventDefault);
      canvas.removeEventListener("touchmove", preventDefault);
      canvas.removeEventListener("touchend", preventDefault);
    };
  }, []);

  const setColor = (color) => {
    contextReference.current.strokeStyle = color;
    setSelectedColor(color);
    setMode("pencil");
  };
  const toggleColorPicker = () => {
    setShowColorPopup(!showColorPopup);
  };
  const setWidth = (width) => {
    contextReference.current.lineWidth = width;
    setLineWidth(width);
  };

  const setEraser = () => {
    contextReference.current.strokeStyle = "white";
    contextReference.current.lineWidth = 10;
    setMode("eraser");
  };

  const handleDescribeDrawing = () => {
    setShowTextInput(true);
  };

  const handleMagic = () => {
    console.log("Magic button clicked");
    // Implement your magic functionality here
  };

  const handleTextSubmit = () => {
    const canvas = canvasReference.current;
    const context = canvas.getContext("2d");
    context.font = "20px Arial";
    context.fillStyle = "black";
    context.fillText(inputText, 50, 50); // Position text at 50, 50 for simplicity
    setInputText("");
    setShowTextInput(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <button
        className="completeButton"
        onClick={uploadDrawing}
        style={{ margin: "10px", padding: "10px 20px" }}
      >
        Upload
      </button>
      <button
        onClick={clearCanvas}
        style={{ margin: "10px", padding: "10px 20px" }}
      >
        Clear
      </button>
      <div className="DrawingPage">
        <canvas
          ref={canvasReference}
          onMouseDown={beginDraw}
          onMouseMove={updateDraw}
          onMouseUp={endDraw}
          onTouchStart={beginDraw}
          onTouchMove={updateDraw}
          onTouchEnd={endDraw}
        />
        {showColorPopup && (
        <div className="colorPopup" style={{ display: "flex", flexDirection: "column", padding: "10px", background: "#fff", border: "none" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setColor(color)}
                style={{
                  backgroundColor: color,
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  margin: "5px", 
                  border: selectedColor === color ? "2px solid black" : "none",
                  padding: "10px",
                  boxSizing: "border-box",
                }}
              ></button>
            ))}
          </div>
          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button onClick={() => setWidth(1)} style={{ background: `url(${width1Image})`, width: "30px", height: "30px", backgroundSize: "cover", border: lineWidth === 1 ? "2px solid blue" : "none" }}></button>
              <button onClick={() => setWidth(3)} style={{ background: `url(${width2Image})`, width: "30px", height: "30px", backgroundSize: "cover", border: lineWidth === 3 ? "2px solid blue" : "none" }}></button>
              <button onClick={() => setWidth(5)} style={{ background: `url(${width3Image})`, width: "30px", height: "30px", backgroundSize: "cover", border: lineWidth === 5 ? "2px solid blue" : "none" }}></button>
              <button onClick={() => setWidth(10)} style={{ background: `url(${width4Image})`, width: "30px", height: "30px", backgroundSize: "cover", border: lineWidth === 10 ? "2px solid blue" : "none" }}></button>
              <button onClick={() => setWidth(15)} style={{ background: `url(${width5Image})`, width: "30px", height: "30px", backgroundSize: "cover", border: lineWidth === 15 ? "2px solid blue" : "none" }}></button>
            </div>
          </div>
        </div>
      )}
        <button
            onClick={toggleColorPicker}
            style={{
              width: "60px",
              height: "60px",
              padding: "10px",
              background: `url(${penImage}) no-repeat center center`,
              backgroundSize: "cover",
              border: "none"
            }}
          >
          </button>
        <button
      onClick={() => setEraser()}
    style={{
      width: "60px",
      height: "60px",
      padding: "10px",
      background: `url(${eraserImage}) no-repeat center center`,
      backgroundSize: "cover",
      border: "none"
    }}
  >
        </button>
        <button
          onClick={handleDescribeDrawing}
          style={{ width: "60px", height: "60px" }}
        >
          Describe Drawing
        </button>
      </div>
      {showTextInput && (
        <div
          className="text-input"
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "10px",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{ width: "200px", height: "30px" }}
          />
          <button
            onClick={handleTextSubmit}
            style={{ width: "60px", height: "60px" }}
          >
            Enhance
          </button>
        </div>
      )}
    </div>
  );
}

export default DrawingPage;
