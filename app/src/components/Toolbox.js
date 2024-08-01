import React from "react";

// SVG icons for selected and default states of pen and eraser tools
// Selected Pen SVG
const SelectedPenSVG = (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.0805 30.8987L2 34L5.10254 22.9238L25.3922 2.74057C25.6215 2.50613 25.8954 2.31986 26.1977 2.19268C26.5 2.06551 26.8247 2 27.1527 2C27.4808 2 27.8055 2.06551 28.1078 2.19268C28.4101 2.31986 28.684 2.50613 28.9133 2.74057L33.2716 7.12181C33.5024 7.35063 33.6856 7.62286 33.8106 7.9228C33.9356 8.22274 34 8.54445 34 8.86938C34 9.19432 33.9356 9.51603 33.8106 9.81597C33.6856 10.1159 33.5024 10.3881 33.2716 10.617L13.0805 30.8987Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Selected Eraser SVG
const SelectedEraserSVG = (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5627 34H34M2.73019 21.4279L8.33952 27.0372C8.80703 27.5047 9.44116 27.7674 10.1023 27.7674H18.0092C18.6704 27.7674 19.3045 27.5047 19.772 27.0372L30.9907 15.8186C31.9642 14.845 31.9642 13.2665 30.9907 12.2929L21.4279 2.73019C20.4543 1.7566 18.8758 1.7566 17.9022 2.73019L2.73019 17.9022C1.7566 18.8758 1.7566 20.4543 2.73019 21.4279Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Default Pen SVG
const DefaultPenSVG = (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.0805 30.8987L2 34L5.10254 22.9238L25.3922 2.74057C25.6215 2.50613 25.8954 2.31986 26.1977 2.19268C26.5 2.06551 26.8247 2 27.1527 2C27.4808 2 27.8055 2.06551 28.1078 2.19268C28.4101 2.31986 28.684 2.50613 28.9133 2.74057L33.2716 7.12181C33.5024 7.35063 33.6856 7.62286 33.8106 7.9228C33.9356 8.22274 34 8.54445 34 8.86938C34 9.19432 33.9356 9.51603 33.8106 9.81597C33.6856 10.1159 33.5024 10.3881 33.2716 10.617L13.0805 30.8987Z" stroke="#000001" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Default Eraser SVG
const DefaultEraserSVG = (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5627 34H34M2.73019 21.4279L8.33952 27.0372C8.80703 27.5047 9.44116 27.7674 10.1023 27.7674H18.0092C18.6704 27.7674 19.3045 27.5047 19.772 27.0372L30.9907 15.8186C31.9642 14.845 31.9642 13.2665 30.9907 12.2929L21.4279 2.73019C20.4543 1.7566 18.8758 1.7566 17.9022 2.73019L2.73019 17.9022C1.7566 18.8758 1.7566 20.4543 2.73019 21.4279Z" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/**
 * Toolbox component
 *
 * This component provides buttons for selecting pen and eraser tools. The appearance of the buttons changes based on the selected tool.
 *
 * @param {Object} props - The component props
 * @param {Function} props.setEraser - Function to activate the eraser tool
 * @param {Function} props.toggleColorPicker - Function to toggle the color picker
 * @param {string} props.mode - The current mode (either "pencil" or "eraser")
 * @param {Function} props.setMode - Function to set the current mode
 * @returns {JSX.Element} The Toolbox component
 */
const Toolbox = ({ setEraser, toggleColorPicker, mode, setMode }) => {

  /**
   * Handle pen button click
   * Sets the mode to "pencil" and toggles the color picker
   */
  const handlePenClick = () => {
    setMode("pencil");
    toggleColorPicker();
  };

  /**
   * Handle eraser button click
   * Sets the mode to "eraser" and activates the eraser tool
   */
  const handleEraserClick = () => {
    setMode("eraser");
    setEraser();
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {/* Pen Button */}
      <button
        onClick={handlePenClick}
        style={{
          width: "60px",
          height: "60px",
          padding: "5px",
          background: mode === "pencil" ? "orange" : "#F8F8F8",
          border: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "5px",
        }}
      >
        {mode === "pencil" ? SelectedPenSVG : DefaultPenSVG}
      </button>

      {/* Eraser Button */}
      <button
        onClick={handleEraserClick}
        style={{
          width: "60px",
          height: "60px",
          padding: "5px",
          background: mode === "eraser" ? "orange" : "#F8F8F8",
          border: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "5px",
        }}
      >
        {mode === "eraser" ? SelectedEraserSVG : DefaultEraserSVG}
      </button>
    </div>
  );
};

export default Toolbox;
