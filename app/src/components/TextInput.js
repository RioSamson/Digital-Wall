import React from "react";

const TextInput = ({ showTextInput, inputText, setInputText, handleTextSubmit }) => {
  if (!showTextInput) return null;

  return (
    <div
      className="text-input"
      style={{
        display: "flex",
        gap: "10px",
        marginTop: "10px",
        alignItems: "center",
      }}
    >
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        style={{ width: "200px", height: "30px" }}
      />
      <button
        onClick={handleTextSubmit}
        style={{ width: "60px", height: "60px" }}
      >
        Enhance
      </button>
    </div>
  );
};

export default TextInput;
