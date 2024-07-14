import React from "react";

const UploadButton = ({ handleUploadClick }) => {
  return (
    <button className="completeButton" onClick={handleUploadClick}>
      Upload
    </button>
  );
};

export default UploadButton;
