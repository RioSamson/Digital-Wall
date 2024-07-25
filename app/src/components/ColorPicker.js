import React from "react";
import regenerateImg from "../assets/regenarate.png";

const ColorPicker = ({ colors, selectedColor, setColor, showColorPopup, generateRandomColors }) => {
  if (!showColorPopup) return null;

  return (
    <div className="colorPopup" style={{ display: "flex", flexDirection: "column", padding: "10px", background: "#fff", border: "none", width: "250px" }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
              padding: selectedColor === color ? "15px" : "5px",
              boxSizing: "border-box",
            }}
          />
        ))}
        <button
          onClick={generateRandomColors}
          style={{
            width: "25px",
            height: "25px",
            background: `url(${regenerateImg}) no-repeat center center`,
            backgroundSize: "cover",
            border: "none",
            padding:"5px",
            marginLeft: "5px",
          }}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
