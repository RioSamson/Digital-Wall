import React from "react";
import ColorPicker from "../components/ColorPicker";
import LineWidthPicker from "../components/LineWidthPicker";

/**
 * ColorPickerPopup component
 * 
 * This component conditionally renders either the ColorPicker or LineWidthPicker
 * based on the provided props. It is used to show a popup for selecting colors,
 * line width settings, or eraser settings.
 * 
 * @param {Object} props - The properties passed to the component
 * @param {boolean} props.showFillPopup - Determines if the fill color picker popup should be shown
 * @param {boolean} props.showColorPopup - Determines if the color picker popup should be shown
 * @param {boolean} props.showEraserPopup - Determines if the eraser settings popup should be shown
 * @param {Array<string>} props.colors - Array of colors available for selection
 * @param {string} props.selectedColor - The currently selected color
 * @param {Function} props.setColor - Function to set the selected color
 * @param {Function} props.generateRandomColors - Function to generate random colors
 * @param {Function} props.floodFill - Function to perform flood fill on the canvas
 * @param {Object} props.canvasRef - Reference to the canvas element
 * @param {number} props.lineWidth - The current line width
 * @param {Function} props.setWidth - Function to set the line width
 * @returns {JSX.Element} The ColorPickerPopup component
 */
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
      {/* Uncomment the following block if you want to enable the fill color picker popup */}
      {/* {showFillPopup && (
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
      )} */}
      {/* Show color picker popup if showColorPopup is true */}
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
      {/* Show eraser settings popup if showEraserPopup is true */}
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
