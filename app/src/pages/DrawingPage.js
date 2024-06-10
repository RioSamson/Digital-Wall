import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DrawingPage.css";

function DrawingPage() {
  const navigate = useNavigate();
  const canvasReference = useRef(null);
  const contextReference = useRef(null);
  const [isPressed, setIsPressed] = useState(false);
  const [lastColor, setLastColor] = useState("black");
  const [mode, setMode] = useState("pencil");
  const [showTextInput, setShowTextInput] = useState(false);
  const [inputText, setInputText] = useState("");

  const uploadClick = () => {
    const canvas = canvasReference.current;
    const base64Image = canvas.toDataURL("image/png");
    navigate("/review", { state: { image: base64Image } });
  };

  const colors = useMemo(
    () => ["black", "red", "green", "orange", "blue", "purple"],
    []
  );

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

  const endDraw = () => {
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
    contextReference.current.lineWidth = 5;
    setLastColor(color);
    setMode("pencil");
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
        onClick={uploadClick}
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
        <div className="buttons">
          {colors.map((color) => (
            <button
              className="colorButtons"
              key={color}
              onClick={() => setColor(color)}
              style={{ backgroundColor: color }}
            ></button>
          ))}
        </div>
      </div>
      <div
        className="tools"
        style={{ display: "flex", gap: "10px", marginTop: "10px" }}
      >
        <button onClick={setEraser} style={{ width: "60px", height: "60px" }}>
          Eraser
        </button>
        <button
          onClick={() => setColor(lastColor)}
          style={{ width: "60px", height: "60px" }}
        >
          Pencil
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
