import React from "react";
import ColorPicker from "../components/ColorPicker";
import LineWidthPicker from "../components/LineWidthPicker";

const ColorPickerPopup = ({
  showFillPopup,
  showColorPopup,
  showEraserPopup,
  colors,
  selectedColor,
  setColor,
  generateRandomColors,
  floodFill,
  canvasRef,
  lineWidth,
  setWidth,
}) => {
  return (
    <>
      {showFillPopup && (
        <div className="popup">
          <ColorPicker
            colors={colors}
            selectedColor={selectedColor}
            setColor={setColor}
            showColorPopup={showFillPopup}
            generateRandomColors={generateRandomColors}
            floodFill={floodFill}
            canvasRef={canvasRef}
          />
        </div>
      )}
      {showColorPopup && (
        <div className="popup">
          <div className="color-picker-wrapper">
            <ColorPicker
              colors={colors}
              selectedColor={selectedColor}
              setColor={setColor}
              showColorPopup={showColorPopup}
              generateRandomColors={generateRandomColors}
              canvasRef={canvasRef}
            />
            <div className="divider"></div>
            <LineWidthPicker
              setWidth={setWidth}
              lineWidth={lineWidth}
              showLineWidthPopup={showColorPopup}
            />
          </div>
        </div>
      )}
      {showEraserPopup && (
        <div className="popup">
          <LineWidthPicker
            setWidth={setWidth}
            lineWidth={lineWidth}
            showLineWidthPopup={showEraserPopup}
          />
        </div>
      )}
    </>
  );
};

export default ColorPickerPopup;
