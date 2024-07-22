import React, { useRef, useState, useEffect, useCallback  } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { storage, db, auth } from "../firebase/firebase";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import Canvas from "../components/Canvas";
import PromptModal from "../components/PromptModal";
import TopToolbar from "../components/TopToolBar";
import BottomToolbar from "../components/BottomToolBar";
import LoadingScreen from "../components/Loading";
import "./DrawingPage.css";

function DrawingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const canvasRef = useRef(null);
  const [isPressed, setIsPressed] = useState(false);
  const [selectedColor, setSelectedColor] = useState("black");
  const [mode, setMode] = useState("pencil");
  const [showTextInput, setShowTextInput] = useState(false);
  const [inputText, setInputText] = useState("");
  const { selectedScene, area, themeName, topAreaName, centerAreaName, bottomAreaName} = location.state || {};
  const [showColorPopup, setShowColorPopup] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [showEraserPopup, setShowEraserPopup] = useState(false);
  const [showFillPopup, setShowFillPopup] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [colors, setColors] = useState([
    "black",
    "red",
    "green",
    "orange",
    "blue",
    "purple",
  ]);
  const [isUploading, setIsUploading] = useState(false); 
  const [enhancedImage, setEnhancedImage] = useState(null); 
  const [docId, setDocId] = useState(null); 

  const handleUploadClick = () => {
    setShowTextInput(true);
  };

  const handleClose = () => {
    setShowTextInput(false);
  }
  const fetchAdminPrompt = async (themeId) => {
    const themeDocRef = doc(db, "Themes", themeId);
    const themeDoc = await getDoc(themeDocRef);
    if (themeDoc.exists()) {
      return themeDoc.data().aiPrompts;
    } else {
      console.error("No such theme document!");
      return "";
    }
  };

  const handleTextSubmit = async () => {
    setIsUploading(true); // Set uploading state to true

    console.log("User's input:", inputText);

    const adminPrompt = await fetchAdminPrompt(selectedScene); // Fetch the admin's prompt
    const combinedPrompt = `${inputText}, ${adminPrompt}`; // Concatenate user's prompt with admin's prompt

    await uploadDrawing(combinedPrompt); // Pass the combined prompt to uploadDrawing
    setIsUploading(false); // Set uploading state to false after upload completes
  };

  const uploadDrawing = async (prompt) => {
    const canvas = canvasRef.current;
    const base64Image = canvas.toDataURL("image/png");

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/png")
    );
    if (!blob) return;

    let originalUrl = "";
    const uploadImage = async (path, imageBlob) => {
      const storageReference = storageRef(storage, path);
      const snapshot = await uploadBytes(storageReference, imageBlob);
      return getDownloadURL(snapshot.ref);
    };

    originalUrl = await uploadImage(`drawing/original-${Date.now()}.png`, blob);

    const sendToBackend = async (base64Img, prompt) => {
      try {
        const response = await fetch("/api/enhance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ base64Img, prompt }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(
            "Enhanced image received from backend:",
            data.enhancedImage
          );
          return data.enhancedImage; // Ensure this matches the backend's return key
        } else {
          console.error("Server returned an error", response.statusText);
          return null;
        }
      } catch (error) {
        console.error("Error sending image to backend:", error);
        return null;
      }
    };

    const enhancedBase64 = await sendToBackend(base64Image, prompt);
    if (!enhancedBase64) return;

    const enhancedBlob = await fetch(enhancedBase64)
      .then((res) => res.blob())
      .catch((error) => {
        console.error("Error converting base64 to Blob:", error);
        return null;
      });

    if (!enhancedBlob) return;

    const enhancedUrl = await uploadImage(
      `drawing/enhanced-${Date.now()}.png`,
      enhancedBlob
    );

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
      displayArea: area,
      isReviewed: false,
    };

    const docRef = await addDoc(drawingsCollection, drawingData);
    setDocId(docRef.id); // Store the document ID
    setEnhancedImage(enhancedBase64); // Store the enhanced image

    // navigate("/review", {
    //   state: { docId: docRef.id },
    // });
  };

  const generateRandomColors = () => {
    const canvas = canvasRef.current;
    const currentDrawing = canvas.toDataURL();

    const randomColors = [];
    while (randomColors.length < 6) {
      let color;
      let isUnique = true;

      do {
        color = `#${Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")}`;
        isUnique = true;

        // Avoid white color
        if (color.toLowerCase() === "#ffffff") {
          isUnique = false;
          continue;
        }

        // Check if the color is similar to existing colors
        for (let i = 0; i < randomColors.length; i++) {
          if (isColorSimilar(color, randomColors[i])) {
            isUnique = false;
            break;
          }
        }
      } while (!isUnique);

      randomColors.push(color);
    }

    setColors(randomColors);

    const context = canvas.getContext("2d");
    const img = new Image();
    img.src = currentDrawing;
    img.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
    };
  };

  const isColorSimilar = (color1, color2) => {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    const threshold = 50;

    return (
      Math.abs(rgb1.r - rgb2.r) < threshold &&
      Math.abs(rgb1.g - rgb2.g) < threshold &&
      Math.abs(rgb1.b - rgb2.b) < threshold
    );
  };

  // Function to convert hex color to RGB
  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  const updateDraw = (e) => {

    if (!isPressed) return;
    setShowColorPopup(false);
    setShowEraserPopup(false);
    setShowFillPopup(false);

    const canvas = canvasRef.current;
    const offsetX =
      e.nativeEvent.offsetX !== undefined
        ? e.nativeEvent.offsetX
        : (e.touches[0]?.clientX || 0) - canvas.getBoundingClientRect().left;
    const offsetY =
      e.nativeEvent.offsetY !== undefined
        ? e.nativeEvent.offsetY
        : (e.touches[0]?.clientY || 0) - canvas.getBoundingClientRect().top;

    const context = canvas.getContext("2d");
    if (mode === "eraser") {
      context.globalCompositeOperation = "destination-out";
      context.strokeStyle = "rgba(0,0,0,1)";
    } else {
      context.globalCompositeOperation = "source-over";
      context.strokeStyle = selectedColor;
    }
  
    context.lineWidth = lineWidth;
    context.lineCap = "round";
    context.lineJoin = "round";
  
    context.lineTo(offsetX, offsetY);
    context.stroke();
    context.beginPath();
    context.moveTo(offsetX, offsetY);
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
    setShowFillPopup(false);
  };

  const setWidth = (width) => {
    const context = canvasRef.current.getContext("2d");
    context.lineWidth = width;
    setLineWidth(width);
  };

  const setEraser = () => {
    setShowEraserPopup(!showEraserPopup);
    setShowColorPopup(false);
    setShowFillPopup(false);
    setMode("eraser");
  };

  const handleDescribeDrawing = () => {
    setShowTextInput(true);
  };

  const handleFill = () => {
    setShowColorPopup(false);
    setShowEraserPopup(false);
    setShowFillPopup(!showFillPopup);
    setMode("fill");
  };

  const drawingRef = useRef(null); // Ref to store current drawing

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        // Save current drawing to a data URL
        drawingRef.current = canvas.toDataURL();

        // Resize the canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Restore the saved drawing
        const context = canvas.getContext("2d");
        const img = new Image();
        img.src = drawingRef.current;
        img.onload = () => {
          context.drawImage(img, 0, 0);
        };
      }
    };

    window.addEventListener("resize", handleResize);

    // Initial resize
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const historyRef = useRef([]);
const historyIndexRef = useRef(-1);

const saveHistory = useCallback(() => {
  const canvas = canvasRef.current;
  const newHistory = historyRef.current.slice(0, historyIndexRef.current + 1);
  newHistory.push(canvas.toDataURL());
  historyRef.current = newHistory;
  historyIndexRef.current = newHistory.length - 1;
  setHistory(newHistory);
  setHistoryIndex(newHistory.length - 1);
}, []);

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const img = new Image();
      img.src = history[newIndex];
      img.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#F8F8F8"; 
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.globalCompositeOperation = "source-over";
        context.drawImage(img, 0, 0);
      };
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const img = new Image();
      img.src = history[newIndex];
      img.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#F8F8F8"; 
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.globalCompositeOperation = "source-over";
        context.drawImage(img, 0, 0);
      };
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      saveHistory();
    }
  }, [saveHistory]);

  useEffect(() => {
    if (!isPressed) {
      saveHistory();
    }
  }, [isPressed, saveHistory]);


  const handleCancel = () => {
    setShowTextInput(false);
    setEnhancedImage(null);
  };

  const handleNext = () => {
    navigate("/review", {
      state: { docId: docId },
    });
  };

  return (
    <div className="DrawingPage">
      <TopToolbar
        onClear={() => {
          const canvas = canvasRef.current;
          const context = canvas.getContext("2d");
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.fillStyle = "#F8F8F8"; // Set the background to white
          context.fillRect(0, 0, canvas.width, canvas.height);
          saveHistory();
        }}
        onUndo={undo}
        onRedo={redo}
        undoDisabled={historyIndex <= 0}
        redoDisabled={historyIndex >= history.length - 1}
        handleUploadClick={handleUploadClick}
        themeName={themeName} 
      />
      <div className="canvas-container"> {/*onClick={handleCanvasClick} */}
        <Canvas
          ref={canvasRef}
          colors={colors}
          selectedColor={selectedColor}
          lineWidth={lineWidth}
          mode={mode}
          setIsPressed={setIsPressed}
          updateDraw={updateDraw}
        />
      </div>
      <BottomToolbar
        setEraser={setEraser}
        toggleColorPicker={toggleColorPicker}
        handleFill={handleFill}
        handleDescribeDrawing={handleDescribeDrawing}
        mode={mode}
        setMode={setMode}
        showFillPopup={showFillPopup}
        showColorPopup={showColorPopup}
        showEraserPopup={showEraserPopup}
        colors={colors}
        selectedColor={selectedColor}
        setColor={setColor}
        generateRandomColors={generateRandomColors}
        canvasRef={canvasRef}
        lineWidth={lineWidth}
        setWidth={setWidth}
        area={area}
        topAreaName={topAreaName}
        centerAreaName={centerAreaName}
        bottomAreaName={bottomAreaName}
      />
      <PromptModal
        showTextInput={showTextInput}
        enhancedImage={enhancedImage}
        inputText={inputText}
        setInputText={setInputText}
        isUploading={isUploading}
        handleTextSubmit={handleTextSubmit}
        handleCancel={handleCancel}
        handleNext={handleNext}
        handleClose={handleClose}
      />
      {isUploading && <LoadingScreen />}
    </div> 
  );
}

export default DrawingPage;
