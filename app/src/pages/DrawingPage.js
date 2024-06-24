import React, { useRef, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { storage, db, auth } from "../firebase/firebase";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, doc } from "firebase/firestore";
import "./DrawingPage.css";
import Canvas from "../components/Canvas";
import Toolbox from "../components/Toolbox";
import ColorPicker from "../components/ColorPicker";
import TextInput from "../components/TextInput";
import LineWidthPicker from "../components/LineWidthPicker";

function DrawingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const canvasRef = useRef(null);
  const [isPressed, setIsPressed] = useState(false);
  const [selectedColor, setSelectedColor] = useState("black");
  const [mode, setMode] = useState("pencil");
  const [showTextInput, setShowTextInput] = useState(false);
  const [inputText, setInputText] = useState("");
  const { selectedScene, area } = location.state || {};
  const [showColorPopup, setShowColorPopup] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [showEraserPopup, setShowEraserPopup] = useState(false);

  const uploadDrawing = async () => {
    const canvas = canvasRef.current;
    const base64Image = canvas.toDataURL("image/png");

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/png")
    );
    if (!blob) return;

    const displayArea = area === "air" ? "top" : area === "land" ? "center" : area === "water" ? "bottom" : "undefined";

    let originalUrl = "";
    const uploadImage = async (path, imageBlob) => {
      const storageReference = storageRef(storage, path);
      const snapshot = await uploadBytes(storageReference, imageBlob);
      return getDownloadURL(snapshot.ref);
    };

    originalUrl = await uploadImage(`drawing/original-${Date.now()}.png`, blob);

    const sendToBaseten = async (base64Img) => {
      const url = "/model_versions/q48rmd3/predict"; // Replace with your Baseten endpoint
      const headers = {
        Authorization: "Api-Key 13235osK.AVglR2jVhzMHR1txMuFJCD49TEmV6FXY",
        "Content-Type": "application/json",
      };

      const imageData = base64Img.split(",")[1];
      const data = {
        prompt: "a plushy dog",
        images_data: imageData,
        guidance_scale: 8,
        lcm_steps: 50,
        seed: 2159232,
        num_inference_steps: 4,
        strength: 0.7,
        width: 512,
        height: 512,
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const jsonResponse = await response.json();
          return `data:image/png;base64,${jsonResponse.model_output.image}`;
        } else {
          console.error("Server returned an error", response.statusText);
          return null;
        }
      } catch (error) {
        console.error("Error sending image to server:", error);
        return null;
      }
    };

    const enhancedBase64 = await sendToBaseten(base64Image);
    if (!enhancedBase64) return;

    const enhancedBlob = await fetch(enhancedBase64)
      .then((res) => res.blob())
      .catch((error) =>
        console.error("Error converting base64 to Blob:", error)
      );

    const enhancedUrl = await uploadImage(`drawing/enhanced-${Date.now()}.png`, enhancedBlob);

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
      isReviewed: false,
    };

    const docRef = await addDoc(drawingsCollection, drawingData);

    navigate("/review", {
      state: { docId: docRef.id },
    });
  };

  const colors = useMemo(() => ["black", "red", "green", "orange", "blue", "purple"], []);

  const updateDraw = (e) => {
    if (!isPressed) return;

    const canvas = canvasRef.current;
    const offsetX = e.nativeEvent.offsetX !== undefined ? e.nativeEvent.offsetX : (e.touches[0]?.clientX || 0) - canvas.getBoundingClientRect().left;
    const offsetY = e.nativeEvent.offsetY !== undefined ? e.nativeEvent.offsetY : (e.touches[0]?.clientY || 0) - canvas.getBoundingClientRect().top;

    const context = canvas.getContext("2d");
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const setColor = (color) => {
    const context = canvasRef.current.getContext("2d");
    context.strokeStyle = color;
    setSelectedColor(color);
    setMode("pencil");
  };

  const toggleColorPicker = () => {
    setShowEraserPopup(false);
    setShowColorPopup(!showColorPopup);
  };

  const setWidth = (width) => {
    const context = canvasRef.current.getContext("2d");
    context.lineWidth = width;
    setLineWidth(width);
  };

  const setEraser = () => {
    setShowEraserPopup(!showEraserPopup);
    setShowColorPopup(false);
    const context = canvasRef.current.getContext("2d");
    context.strokeStyle = "white";
    setMode("eraser");
  };

  const handleDescribeDrawing = () => {
    setShowTextInput(true);
  };

  const handleFill = () => {
    // handle fill
  };

  const handleTextSubmit = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.font = "20px Arial";
    context.fillStyle = "black";
    context.fillText(inputText, 50, 50);
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
      <button onClick={() => canvasRef.current.getContext("2d").clearRect(0, 0, 500, 500)} style={{ margin: "10px", padding: "10px 20px" }}>
        Clear
      </button>
      <div className="DrawingPage">
        <Canvas ref={canvasRef} colors={colors} selectedColor={selectedColor} lineWidth={lineWidth} mode={mode} setIsPressed={setIsPressed} updateDraw={updateDraw} />
        <Toolbox setEraser={setEraser} toggleColorPicker={toggleColorPicker} handleFill={handleFill} handleDescribeDrawing={handleDescribeDrawing} />
        <ColorPicker colors={colors} selectedColor={selectedColor} setColor={setColor} showColorPopup={showColorPopup} />
        <LineWidthPicker setWidth={setWidth} lineWidth={lineWidth} showLineWidthPopup={showColorPopup || showEraserPopup} />
        <TextInput showTextInput={showTextInput} inputText={inputText} setInputText={setInputText} handleTextSubmit={handleTextSubmit} />
      </div>
    </div>
  );
}

export default DrawingPage;
