import React from "react";
import ActionButtons from "./ActionButton";
import UploadButton from "./UploadButton";

const TopToolbar = ({
  onClear,
  onUndo,
  onRedo,
  undoDisabled,
  redoDisabled,
  handleUploadClick,
  themeName,  
}) => {
  return (
    <div className="top-toolbar-container">
      <div className="top-toolbar">
        <ActionButtons
          onClear={onClear}
          onUndo={onUndo}
          onRedo={onRedo}
          undoDisabled={undoDisabled}
          redoDisabled={redoDisabled}
        />
        <UploadButton handleUploadClick={handleUploadClick} />
      </div>
      <div className="centered-text">
        <h2 style={{fontWeight:"normal"}}>{themeName}</h2>
      </div>
    </div>
  );
};

export default TopToolbar;
