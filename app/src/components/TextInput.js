import React from "react";

const TextInput = ({
  showTextInput,
  inputText,
  setInputText,
  handleTextSubmit,
  buttonLabel,
}) => {
  if (!showTextInput) return null;

  return (
    <div
      className="text-input"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginTop: "10px",
        alignItems: "center",
      }}
    >
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        style={{ width: "200px", height: "30px", color: "black" }} // Adjust text color for visibility
      />
      <button
        onClick={handleTextSubmit}
        style={{ width: "80px", height: "40px" }} // Adjust button size for better appearance
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default TextInput;
