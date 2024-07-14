import React from "react";
import Toolbox from "./Toolbox";
import ColorPickerPopup from "./ColorPickerPopup";

const BottomToolbar = ({
  setEraser,
  toggleColorPicker,
  handleFill,
  handleDescribeDrawing,
  mode,
  setMode,
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
    <div className="bottom-toolbar">
      <Toolbox
        setEraser={setEraser}
        toggleColorPicker={toggleColorPicker}
        handleFill={handleFill}
        handleDescribeDrawing={handleDescribeDrawing}
        mode={mode}
        setMode={setMode}
      />
      <ColorPickerPopup
        showFillPopup={showFillPopup}
        showColorPopup={showColorPopup}
        showEraserPopup={showEraserPopup}
        colors={colors}
        selectedColor={selectedColor}
        setColor={setColor}
        generateRandomColors={generateRandomColors}
        floodFill={floodFill}
        canvasRef={canvasRef}
        lineWidth={lineWidth}
        setWidth={setWidth}
      />
    </div>
  );
};

export default BottomToolbar;
