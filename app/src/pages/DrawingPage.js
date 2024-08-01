import React, { useRef, useState, useEffect, useCallback } from "react";
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

/**
 * DrawingPage component
 * 
 * This component renders a drawing canvas with various tools and functionalities,
 * including color selection, erasing, filling, and the ability to describe and
 * enhance the drawing. The enhanced drawing can be uploaded and stored in Firebase.
 * 
 * @component
 * @example
 * return (
 *   <DrawingPage />
 * )
 */
function DrawingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const canvasRef = useRef(null);
  const [isPressed, setIsPressed] = useState(false);
  const [selectedColor, setSelectedColor] = useState("black");
  const [mode, setMode] = useState("pencil");
  const [showTextInput, setShowTextInput] = useState(false);
  const [inputText, setInputText] = useState("");
  const {
    selectedScene,
    area,
    themeName,
    topAreaName,
    centerAreaName,
    bottomAreaName,
  } = location.state || {};
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

  /**
   * Shows the text input for describing the drawing
   */
  const handleUploadClick = () => {
    setShowTextInput(true);
  };

  /**
   * Closes the text input modal
   */
  const handleClose = () => {
    setShowTextInput(false);
  };

  /**
   * Fetches the admin prompt for the selected theme
   * 
   * @param {string} themeId - The ID of the selected theme
   * @returns {Promise<string>} - The admin's prompt for the theme
   */
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

  /**
   * Handles the submission of the user's description text
   */
  const handleTextSubmit = async () => {
    // Set uploading state to true
    setIsUploading(true);

    console.log("User's input:", inputText);

    // Fetch the admin's prompt
    const adminPrompt = await fetchAdminPrompt(selectedScene);
    // Concatenate user's prompt with admin's prompt
    const combinedPrompt = `${inputText}, ${adminPrompt}`;

    // Enhance the drawing with the combined prompt
    const enhancedImg = await enhanceDrawing(combinedPrompt);
    if (enhancedImg) {
      setEnhancedImage(enhancedImg); // Store the enhanced image
    }
    // Set uploading state to false after enhancement completes
    setIsUploading(false);
  };

  /**
   * Enhances the drawing based on the provided prompt
   * 
   * @param {string} prompt - The combined prompt of the user and admin
   * @returns {Promise<string|null>} - The URL of the enhanced image
   */
  const enhanceDrawing = async (prompt) => {
    const canvas = canvasRef.current;
    const base64Image = canvas.toDataURL("image/png");

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

    return await sendToBackend(base64Image, prompt);
  };

  /**
   * Uploads the original and enhanced drawings to Firebase Storage and Firestore
   */
  const uploadDrawing = async () => {
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

    const enhancedBlob = await fetch(enhancedImage)
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

    navigate("/review", {
      state: { docId: docRef.id },
    });
  };

  /**
   * Generates an array of random colors
   */
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

  /**
   * Checks if two colors are similar
   * 
   * @param {string} color1 - The first color in hex format
   * @param {string} color2 - The second color in hex format
   * @returns {boolean} - True if colors are similar, false otherwise
   */
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

  /**
   * Converts hex color to RGB
   * 
   * @param {string} hex - The color in hex format
   * @returns {Object} - The RGB representation of the color
   */
  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  /**
   * Updates the drawing on the canvas based on the user's input
   * 
   * @param {Object} e - The event object
   */
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
      context.globalCompositeOperation = "source-over";
      context.strokeStyle = "#F8F8F8";
    } else {
      context.globalCompositeOperation = "source-over";
      context.strokeStyle = selectedColor;
    }

    context.lineWidth = lineWidth * 2.5;
    context.lineCap = "round";
    context.lineJoin = "round";

    context.lineTo(offsetX, offsetY);
    context.stroke();
    context.beginPath();
    context.moveTo(offsetX, offsetY);
  };

  /**
   * Sets the selected color for drawing
   * 
   * @param {string} color - The color to be set
   */
  const setColor = (color) => {
    const context = canvasRef.current.getContext("2d");
    context.strokeStyle = color;
    setSelectedColor(color);
    setMode("pencil");
  };

  /**
   * Toggles the color picker popup
   */
  const toggleColorPicker = () => {
    setShowEraserPopup(false);
    setShowColorPopup(!showColorPopup);
    setShowFillPopup(false);
  };

  /**
   * Sets the line width for drawing
   * 
   * @param {number} width - The line width to be set
   */
  const setWidth = (width) => {
    const context = canvasRef.current.getContext("2d");
    context.lineWidth = width;
    setLineWidth(width);
  };

  /**
   * Activates the eraser mode
   */
  const setEraser = () => {
    setShowEraserPopup(!showEraserPopup);
    setShowColorPopup(false);
    setShowFillPopup(false);
    setMode("eraser");
  };

  /**
   * Shows the text input modal for describing the drawing
   */
  const handleDescribeDrawing = () => {
    setShowTextInput(true);
  };

  /**
   * Activates the fill mode
   */
  const handleFill = () => {
    setShowColorPopup(false);
    setShowEraserPopup(false);
    setShowFillPopup(!showFillPopup);
    setMode("fill");
  };

  const drawingRef = useRef(null); // Ref to store current drawing

  /**
   * Handles canvas resizing and restores the drawing
   */
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
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const historyRef = useRef([]);
  const historyIndexRef = useRef(-1);

  /**
   * Saves the current drawing to history
   */
  const saveHistory = useCallback(() => {
    const canvas = canvasRef.current;
    const newHistory = historyRef.current.slice(0, historyIndexRef.current + 1);
    newHistory.push(canvas.toDataURL());
    historyRef.current = newHistory;
    historyIndexRef.current = newHistory.length - 1;
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, []);

  /**
   * Undoes the last drawing action
   */
  const undo = () => {
    if (historyIndexRef.current > 0) {
      const newIndex = historyIndexRef.current - 1;
      historyIndexRef.current = newIndex;
      setHistoryIndex(newIndex);
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const img = new Image();
      img.src = historyRef.current[newIndex];
      img.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#F8F8F8";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.globalCompositeOperation = "source-over";
        context.drawImage(img, 0, 0);
      };
    }
  };

  /**
   * Redoes the last undone drawing action
   */
  const redo = () => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      const newIndex = historyIndexRef.current + 1;
      historyIndexRef.current = newIndex;
      setHistoryIndex(newIndex);
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const img = new Image();
      img.src = historyRef.current[newIndex];
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

  /**
   * Cancels the text input and resets the enhanced image
   */
  const handleCancel = () => {
    setShowTextInput(false);
    setEnhancedImage(null);
  };

  /**
   * Uploads the drawing to Firebase and navigates to the review page
   */
  const handleNext = async () => {
    await uploadDrawing();
  };

  return (
    <div className="DrawingPage" style={{ height: "100svh" }}>
      <TopToolbar
        onClear={() => {
          const canvas = canvasRef.current;
          const context = canvas.getContext("2d");
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.fillStyle = "#F8F8F8";
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
      <div className="canvas-container">
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
