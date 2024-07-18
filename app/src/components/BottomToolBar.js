import React, { useState, useEffect } from "react";
import Toolbox from "./Toolbox";
import ColorPickerPopup from "./ColorPickerPopup";
import PopupMessage from "./PopupMessage";

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
  area,
}) => {
  const [svgBgColor, setSvgBgColor] = useState("white");
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleQuestionMarkClick = () => {
    setSvgBgColor((prevColor) => (prevColor === "white" ? "#FFD5A6" : "white"));
    setShowPopup((prevShowPopup) => !prevShowPopup);
  };

  return (
    <div className="bottom-toolbar-container">
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
      <div className="svg-container" onClick={handleQuestionMarkClick} style={{ backgroundColor: svgBgColor }}>
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.8698 4.92998C16.0656 4.12416 15.0403 3.57519 13.9239 3.35264C12.8074 3.13009 11.65 3.24397 10.5983 3.67986C9.54656 4.11574 8.64792 4.85401 8.01622 5.80112C7.38451 6.74823 7.04817 7.86154 7.04981 8.99998C7.04981 9.1989 7.12883 9.38966 7.26948 9.53031C7.41013 9.67097 7.6009 9.74998 7.79981 9.74998C7.99872 9.74998 8.18949 9.67097 8.33014 9.53031C8.47079 9.38966 8.54981 9.1989 8.54981 8.99998C8.54783 8.15659 8.79625 7.33158 9.26358 6.6295C9.73092 5.92742 10.3961 5.37985 11.175 5.05618C11.9538 4.73251 12.8111 4.64731 13.6384 4.81136C14.4657 4.97542 15.2257 5.38135 15.8221 5.97772C16.4184 6.57409 16.8244 7.33407 16.9884 8.16136C17.1525 8.98865 17.0673 9.84602 16.7436 10.6248C16.4199 11.4037 15.8724 12.0689 15.1703 12.5362C14.4682 13.0035 13.6432 13.252 12.7998 13.25C12.6017 13.2526 12.4124 13.3324 12.2723 13.4725C12.1323 13.6126 12.0524 13.8019 12.0498 14V16C12.0498 16.1989 12.1288 16.3897 12.2695 16.5303C12.4101 16.671 12.6009 16.75 12.7998 16.75C12.9987 16.75 13.1895 16.671 13.3301 16.5303C13.4708 16.3897 13.5498 16.1989 13.5498 16V14.7C14.6129 14.5576 15.615 14.1212 16.4434 13.44C17.2718 12.7587 17.8936 11.8598 18.2387 10.8442C18.5838 9.82874 18.6385 8.73706 18.3966 7.69214C18.1548 6.64723 17.626 5.6906 16.8698 4.92998Z" fill="black" />
          <path d="M12.7998 20.75C13.4902 20.75 14.0498 20.1904 14.0498 19.5C14.0498 18.8096 13.4902 18.25 12.7998 18.25C12.1094 18.25 11.5498 18.8096 11.5498 19.5C11.5498 20.1904 12.1094 20.75 12.7998 20.75Z" fill="black" />
        </svg>
      </div>
      {showPopup && <PopupMessage
      area={area}
      />}
    </div>
  );
};

export default BottomToolbar;
