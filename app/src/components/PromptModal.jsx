import React, { useState } from "react";

/**
 * PromptModal component
 *
 * This component displays a modal that allows users to enter text prompts for AI to enhance their drawings
 * and to navigate through the enhancement process.
 *
 * @param {Object} props - The component props
 * @param {boolean} props.showTextInput - Flag to show or hide the text input modal
 * @param {string} props.enhancedImage - URL of the enhanced image
 * @param {string} props.inputText - The current text input value
 * @param {Function} props.setInputText - Function to update the text input value
 * @param {boolean} props.isUploading - Flag to indicate if the uploading is in progress
 * @param {Function} props.handleTextSubmit - Function to handle text submission
 * @param {Function} props.handleCancel - Function to handle cancel action
 * @param {Function} props.handleNext - Function to handle next action
 * @param {Function} props.handleClose - Function to handle close action
 * @returns {JSX.Element} The PromptModal component
 */
const PromptModal = ({
  showTextInput,
  enhancedImage,
  inputText,
  setInputText,
  isUploading,
  handleTextSubmit,
  handleCancel,
  handleNext,
  handleClose,
}) => {
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  // Handle the click event for the "Next" button
  const handleNextClick = () => {
    setIsNextDisabled(true); // Disable the button after click
    handleNext(); // Call the next action handler
  };

  return (
    showTextInput && (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        {enhancedImage ? (
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "90%",
              maxWidth: "500px",
              textAlign: "center",
            }}
          >
            <img
              src={enhancedImage}
              alt="Enhanced Drawing"
              style={{ maxWidth: "90%", marginBottom: "20px" }}
            />
            <div>
              <button
                onClick={handleCancel}
                style={{
                  width: "40%",
                  padding: "10px 20px",
                  margin: "10px",
                  borderRadius: "5px",
                  backgroundColor: "white",
                  color: "black",
                  border: "solid grey 2px",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                Redo
              </button>
              <button
                onClick={handleNextClick}
                disabled={isNextDisabled}
                style={{
                  width: "40%",
                  padding: "10px 20px",
                  margin: "10px",
                  borderRadius: "5px",
                  backgroundColor: isNextDisabled ? "#ccc" : "black",
                  color: "white",
                  border: "none",
                  fontSize: "18px",
                  cursor: isNextDisabled ? "not-allowed" : "pointer",
                }}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <>
            <div
              style={{
                width: "90%",
                maxWidth: "500px",
                margin: "auto auto",
                textAlign: "left",
                position: "relative", // Add relative positioning
              }}
            >
              <div
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "-20px",
                  cursor: "pointer",
                  fontSize: "24px",
                  color: "white",
                  marginBottom: "25px"
                }}
                onClick={handleClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="white"
                >
                  <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11l4.89 4.89-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.41z" />
                </svg>
              </div>
              <h2
                style={{
                  marginBottom: "30px",
                  fontWeight: 500,
                  color: "white",
                  margin: "10px",
                  padding: "0px"
                }}
              >
                Enter a prompt for AI to enhance your drawing:
              </h2>
              <div
                style={{
                  backgroundColor: "white",
                  padding: "5px",
                  borderRadius: "10px",
                  width: "90%",
                  margin: "10px",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  gap: "30px",
                }}
              >
                <input
                  type="text"
                  value={inputText}
                  placeholder="eg. an elephant with pink hat"
                  onChange={(e) => setInputText(e.target.value)}
                  style={{
                    width: "85%",
                    borderRadius: "5px",
                    border: "none",
                    fontSize: "16px",
                    paddingBottom: "40px",
                    marginBottom: "10px",
                    height: "60px",
                  }}
                />
                <button
                  onClick={handleTextSubmit}
                  disabled={isUploading}
                  style={{
                    width: "55%",
                    padding: "15px",
                    borderRadius: "5px",
                    backgroundColor: isUploading ? "#ccc" : "black",
                    color: "white",
                    border: "none",
                    fontSize: "16px",
                    marginBottom: "10px",
                    cursor: isUploading ? "not-allowed" : "pointer",
                  }}
                >
                  <svg
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="buttonIcon"
                  >
                    <path
                      d="M1 21L14.8462 7.15385M17.9231 4.07692L19.4615 2.53846M14.0769 3.30769V1M18.6923 7.92308H21M17.1538 11L18.6923 12.5385M9.46154 3.30769L11 4.84615"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  AI Enhance
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    )
  );
};

export default PromptModal;
