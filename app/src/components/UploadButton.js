import React from "react";

/**
 * UploadButton component
 *
 * This component renders a button that triggers an upload action when clicked.
 *
 * @param {Object} props - The component props
 * @param {Function} props.handleUploadClick - Function to handle the upload button click
 * @returns {JSX.Element} The UploadButton component
 */
const UploadButton = ({ handleUploadClick }) => {
  return (
    // The button element with a class name for styling and an onClick event handler
    <button className="completeButton" onClick={handleUploadClick}>
      Next
    </button>
  );
};

export default UploadButton;
