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
  handleClose,
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
                onClick={handleNext}
                style={{
                  width: "40%",
                  padding: "10px 20px",
                  margin: "10px",
                  borderRadius: "5px",
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  fontSize: "18px",
                  cursor: "pointer",
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
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
                fontSize: "24px",
                color: "white",
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
            <div
              style={{
                width: "90%",
                maxWidth: "500px",
                margin: "auto auto",
                textAlign: "left",
              }}
            >
              <h2
                style={{
                  marginBottom: "20px",
                  fontWeight: "normal",
                  color: "white",
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
                  alignItems: "center",
                  gap: "30px",
                }}
              >
                <input
                  type="text"
                  value={inputText}
                  placeholder="eg. an elephant with pink hat"
                  onChange={(e) => setInputText(e.target.value)}
                  style={{
                    width: "90%",
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
