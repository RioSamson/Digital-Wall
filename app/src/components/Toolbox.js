import React, { useState } from "react";

//selected
const SelectedPenSVG = (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.0805 30.8987L2 34L5.10254 22.9238L25.3922 2.74057C25.6215 2.50613 25.8954 2.31986 26.1977 2.19268C26.5 2.06551 26.8247 2 27.1527 2C27.4808 2 27.8055 2.06551 28.1078 2.19268C28.4101 2.31986 28.684 2.50613 28.9133 2.74057L33.2716 7.12181C33.5024 7.35063 33.6856 7.62286 33.8106 7.9228C33.9356 8.22274 34 8.54445 34 8.86938C34 9.19432 33.9356 9.51603 33.8106 9.81597C33.6856 10.1159 33.5024 10.3881 33.2716 10.617L13.0805 30.8987Z" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);

const SelectedEraserSVG = (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5627 34H34M2.73019 21.4279L8.33952 27.0372C8.80703 27.5047 9.44116 27.7674 10.1023 27.7674H18.0092C18.6704 27.7674 19.3045 27.5047 19.772 27.0372L30.9907 15.8186C31.9642 14.845 31.9642 13.2665 30.9907 12.2929L21.4279 2.73019C20.4543 1.7566 18.8758 1.7566 17.9022 2.73019L2.73019 17.9022C1.7566 18.8758 1.7566 20.4543 2.73019 21.4279Z" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);

const SelectedFillSVG = (
  <svg width="40" height="36" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.5983 15.1885L5.18309 4.12947M34.5308 18.5093L19.2841 33.2802C18.8083 33.7411 18.1631 34 17.4903 34C16.8176 34 16.1723 33.7411 15.6966 33.2802L2.24299 20.2464C2.00743 20.0182 1.82058 19.7473 1.6931 19.4491C1.56561 19.151 1.5 18.8314 1.5 18.5087C1.5 18.1859 1.56561 17.8663 1.6931 17.5682C1.82058 17.27 2.00743 16.9991 2.24299 16.7709L17.4897 2L34.5308 18.5093ZM32.1582 30.8763C32.1582 27.8052 35.3291 24.7324 35.3291 24.7324C35.3291 24.7324 38.5 27.8052 38.5 30.8763C38.5 31.691 38.1659 32.4724 37.5713 33.0485C36.9766 33.6246 36.1701 33.9482 35.3291 33.9482C34.4881 33.9482 33.6816 33.6246 33.0869 33.0485C32.4923 32.4724 32.1582 31.691 32.1582 30.8763Z" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);

//default
const DefaultPenSVG = (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.0805 30.8987L2 34L5.10254 22.9238L25.3922 2.74057C25.6215 2.50613 25.8954 2.31986 26.1977 2.19268C26.5 2.06551 26.8247 2 27.1527 2C27.4808 2 27.8055 2.06551 28.1078 2.19268C28.4101 2.31986 28.684 2.50613 28.9133 2.74057L33.2716 7.12181C33.5024 7.35063 33.6856 7.62286 33.8106 7.9228C33.9356 8.22274 34 8.54445 34 8.86938C34 9.19432 33.9356 9.51603 33.8106 9.81597C33.6856 10.1159 33.5024 10.3881 33.2716 10.617L13.0805 30.8987Z" stroke="#000001" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);

const DefaultEraserSVG = (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5627 34H34M2.73019 21.4279L8.33952 27.0372C8.80703 27.5047 9.44116 27.7674 10.1023 27.7674H18.0092C18.6704 27.7674 19.3045 27.5047 19.772 27.0372L30.9907 15.8186C31.9642 14.845 31.9642 13.2665 30.9907 12.2929L21.4279 2.73019C20.4543 1.7566 18.8758 1.7566 17.9022 2.73019L2.73019 17.9022C1.7566 18.8758 1.7566 20.4543 2.73019 21.4279Z" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);
const DefaultFillSVG = (
  <svg width="40" height="36" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.5983 15.1885L5.18309 4.12947M34.5308 18.5093L19.2841 33.2802C18.8083 33.7411 18.1631 34 17.4903 34C16.8176 34 16.1723 33.7411 15.6966 33.2802L2.24299 20.2464C2.00743 20.0182 1.82058 19.7473 1.6931 19.4491C1.56561 19.151 1.5 18.8314 1.5 18.5087C1.5 18.1859 1.56561 17.8663 1.6931 17.5682C1.82058 17.27 2.00743 16.9991 2.24299 16.7709L17.4897 2L34.5308 18.5093ZM32.1582 30.8763C32.1582 27.8052 35.3291 24.7324 35.3291 24.7324C35.3291 24.7324 38.5 27.8052 38.5 30.8763C38.5 31.691 38.1659 32.4724 37.5713 33.0485C36.9766 33.6246 36.1701 33.9482 35.3291 33.9482C34.4881 33.9482 33.6816 33.6246 33.0869 33.0485C32.4923 32.4724 32.1582 31.691 32.1582 30.8763Z" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);

const Toolbox = ({ setEraser, toggleColorPicker, handleFill, handleDescribeDrawing }) => {
  const [selectedTool, setSelectedTool] = useState(null);

  const handlePenClick = () => {
    const isSelected = selectedTool === "pen";
    setSelectedTool(isSelected ? null : "pen");
    toggleColorPicker();
  };

  const handleEraserClick = () => {
    const isSelected = selectedTool === "eraser";
    setSelectedTool(isSelected ? null : "eraser");
    setEraser();
  };

  const handleFillClick = () => {
    const isSelected = selectedTool === "fill";
    setSelectedTool(isSelected ? null : "fill");
    handleFill();
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <button
        onClick={handlePenClick}
        style={{
          width: "60px",
          height: "60px",
          padding: "10px",
          background: selectedTool === "pen" ? "orange" : "white",
          border: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {selectedTool === "pen" ? SelectedPenSVG : DefaultPenSVG}
      </button>

      <button
        onClick={handleEraserClick}
        style={{
          width: "60px",
          height: "60px",
          padding: "10px",
          background: selectedTool === "eraser" ? "orange" : "white",
          border: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {selectedTool === "eraser" ? SelectedEraserSVG : DefaultEraserSVG}
      </button>
  
      {/* Fill button */}
      <button
        onClick={handleFillClick}
        style={{
          width: "60px",
          height: "60px",
          padding: "10px",
          background: selectedTool === "fill" ? "orange" : "white",
          border: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {selectedTool === "fill" ? SelectedFillSVG : DefaultFillSVG}
      </button>
    </div>
  );
};

export default Toolbox;
