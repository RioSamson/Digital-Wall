import React from "react";
import regenerateImg from "../assets/regenarate.png";

/**
 * ColorPicker component
 * 
 * This component renders a color picker popup allowing users to select a color
 * from the available options or generate random colors.
 * 
 * @param {Object} props - The properties passed to the component
 * @param {Array<string>} props.colors - Array of colors available for selection
 * @param {string} props.selectedColor - The currently selected color
 * @param {Function} props.setColor - Function to set the selected color
 * @param {boolean} props.showColorPopup - Determines if the color picker popup should be shown
 * @param {Function} props.generateRandomColors - Function to generate random colors
 * @returns {JSX.Element|null} The ColorPicker component or null if showColorPopup is false
 */
const ColorPicker = ({ colors, selectedColor, setColor, showColorPopup, generateRandomColors }) => {
  if (!showColorPopup) return null;

  return (
    <div className="colorPopup" style={styles.popup}>
      <div style={styles.container}>
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setColor(color)}
            style={{
              ...styles.colorButton,
              backgroundColor: color,
              border: selectedColor === color ? "2px solid black" : "none",
              padding: selectedColor === color ? "15px" : "5px",
            }}
            aria-label={`Select color ${color}`}
          />
        ))}
        <button
          onClick={generateRandomColors}
          style={styles.regenerateButton}
          aria-label="Generate random colors"
        />
      </div>
    </div>
  );
};

// Inline styles for the component
const styles = {
  popup: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    background: "#fff",
    border: "none",
    width: "250px",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  colorButton: {
    width: "25px",
    height: "25px",
    borderRadius: "50%",
    margin: "5px",
    boxSizing: "border-box",
  },
  regenerateButton: {
    width: "25px",
    height: "25px",
    background: `url(${regenerateImg}) no-repeat center center`,
    backgroundSize: "cover",
    border: "none",
    padding: "5px",
    marginLeft: "5px",
  },
};

export default ColorPicker;
