import React from "react";

/**
 * TextInput component
 *
 * This component displays a text input field and a submit button, allowing users to enter and submit text.
 *
 * @param {Object} props - The component props
 * @param {boolean} props.showTextInput - Flag to show or hide the text input
 * @param {string} props.inputText - The current text input value
 * @param {Function} props.setInputText - Function to update the text input value
 * @param {Function} props.handleTextSubmit - Function to handle text submission
 * @param {string} props.buttonLabel - Label for the submit button
 * @returns {JSX.Element | null} The TextInput component, or null if showTextInput is false
 */
const TextInput = ({
  showTextInput,
  inputText,
  setInputText,
  handleTextSubmit,
  buttonLabel,
}) => {
  if (!showTextInput) return null; // Return null if showTextInput is false

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
        onChange={(e) => setInputText(e.target.value)} // Update inputText on change
        style={{ width: "200px", height: "30px", color: "black" }} // Inline styles for the input field
      />
      <button
        onClick={handleTextSubmit} // Handle button click event
        style={{ width: "80px", height: "40px" }} // Inline styles for the button
      >
        {buttonLabel} // Display the button label
      </button>
    </div>
  );
};

export default TextInput;
