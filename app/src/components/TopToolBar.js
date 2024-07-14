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
}) => {
  return (
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
  );
};

export default TopToolbar;
