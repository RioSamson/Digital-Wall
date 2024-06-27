import React from "react";
import penImage from "../assets/pen.png";
import eraserImage from "../assets/eraser.png";
import fillImage from "../assets/fill.png";
import magicImage from "../assets/magic.png";

const Toolbox = ({ setEraser, toggleColorPicker, handleFill, handleDescribeDrawing }) => {
  return (
    <div>
      <button
        onClick={toggleColorPicker}
        style={{
          width: "60px",
          height: "60px",
          padding: "10px",
          background: `url(${penImage}) no-repeat center center`,
          backgroundSize: "cover",
          border: "none",
        }}
      />
      <button
        onClick={setEraser}
        style={{
          width: "60px",
          height: "60px",
          padding: "10px",
          background: `url(${eraserImage}) no-repeat center center`,
          backgroundSize: "cover",
          border: "none",
        }}
      />
      <button
        onClick={handleFill}
        style={{
          width: "60px",
          height: "60px",
          padding: "10px",
          background: `url(${fillImage}) no-repeat center center`,
          backgroundSize: "cover",
          border: "none",
        }}
      />
      <button
        onClick={handleDescribeDrawing}
        style={{
          width: "60px",
          height: "60px",
          padding: "10px",
          background: `url(${magicImage}) no-repeat center center`,
          backgroundSize: "cover",
          border: "none",
        }}
      />
    </div>
  );
};

export default Toolbox;
