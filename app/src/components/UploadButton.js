import React from "react";

const UploadButton = ({ handleUploadClick }) => {
  return (
    <button className="completeButton" onClick={handleUploadClick}>
      Next
    </button>
  );
};

export default UploadButton;
