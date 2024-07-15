import React from "react";

const PromptModal = ({
  showTextInput,
  enhancedImage,
  inputText,
  setInputText,
  isUploading,
  handleTextSubmit,
  handleCancel,
  handleNext,
}) => {
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
          {enhancedImage ? (
            <>
              <img
                src={enhancedImage}
                alt="Enhanced Drawing"
                style={{ maxWidth: "100%", marginBottom: "20px" }}
              />
              <div>
                <button
                  onClick={handleCancel}
                  style={{
                    padding: "10px 20px",
                    margin: "10px",
                    borderRadius: "5px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  Redo / Keep Drawing
                </button>
                <button
                  onClick={handleNext}
                  style={{
                    padding: "10px 20px",
                    margin: "10px",
                    borderRadius: "5px",
                    backgroundColor: "#4caf50",
                    color: "white",
                    border: "none",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 style={{ marginBottom: "20px" }}>
              Enter a prompt for AI to enhance your drawing:
              </h2>
              <div
                className="text-input"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <input
                  type="text"
                  value={inputText}
                  placeholder="eg. an elephant with pink hat"
                  onChange={(e) => setInputText(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    fontSize: "16px",
                  }}
                />
                <button
                  onClick={handleTextSubmit}
                  disabled={isUploading}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    backgroundColor: isUploading ? "#ccc" : "black",
                    color: "white",
                    border: "none",
                    fontSize: "16px",
                    cursor: isUploading ? "not-allowed" : "pointer",
                  }}
                >
                  <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="buttonIcon">
                  <path d="M1 21L14.8462 7.15385M17.9231 4.07692L19.4615 2.53846M14.0769 3.30769V1M18.6923 7.92308H21M17.1538 11L18.6923 12.5385M9.46154 3.30769L11 4.84615" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                AI Enhance
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  );
};

export default PromptModal;
