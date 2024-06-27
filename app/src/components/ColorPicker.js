import React from "react";

const ColorPicker = ({ colors, selectedColor, setColor, showColorPopup }) => {
  if (!showColorPopup) return null;

  return (
    <div className="colorPopup" style={{ display: "flex", flexDirection: "column", padding: "10px", background: "#fff", border: "none" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setColor(color)}
            style={{
              backgroundColor: color,
              width: "25px",
              height: "25px",
              borderRadius: "50%",
              margin: "5px",
              border: selectedColor === color ? "2px solid black" : "none",
              padding: "10px",
              boxSizing: "border-box",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
