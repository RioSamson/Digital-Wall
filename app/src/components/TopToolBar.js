import React from "react";
import ActionButtons from "./ActionButton";
import UploadButton from "./UploadButton";

/**
 * TopToolbar component
 *
 * This component provides a toolbar with action buttons (clear, undo, redo) and an upload button.
 * It also displays the current theme name in the center.
 *
 * @param {Object} props - The component props
 * @param {Function} props.onClear - Function to clear the canvas
 * @param {Function} props.onUndo - Function to undo the last action
 * @param {Function} props.onRedo - Function to redo the last undone action
 * @param {boolean} props.undoDisabled - Boolean to disable the undo button
 * @param {boolean} props.redoDisabled - Boolean to disable the redo button
 * @param {Function} props.handleUploadClick - Function to handle the upload button click
 * @param {string} props.themeName - The name of the current theme
 * @returns {JSX.Element} The TopToolbar component
 */
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
        {/* Action buttons: Clear, Undo, Redo */}
        <ActionButtons
          onClear={onClear}
          onUndo={onUndo}
          onRedo={onRedo}
          undoDisabled={undoDisabled}
          redoDisabled={redoDisabled}
        />
        {/* Upload button */}
        <UploadButton handleUploadClick={handleUploadClick} />
      </div>
      {/* Centered text displaying the theme name */}
      <div className="centered-text">
        <h2 style={{ fontWeight: 600, fontSize: "22px", textAlign: "center" }}>
          {themeName}
        </h2>
      </div>
    </div>
  );
};

export default TopToolbar;
