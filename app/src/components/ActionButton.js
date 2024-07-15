import React from "react";
import redoImg from "../assets/redo.png";
import undoImg from "../assets/undo.png";
import clearImg from "../assets/garbage.png";

const ActionButtons = ({ onClear, onUndo, onRedo, undoDisabled, redoDisabled }) => {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <button
        onClick={onUndo}
        disabled={undoDisabled}
        style={{
          background: `url(${undoImg}) no-repeat center center`,
          backgroundSize: "contain",
          width: "30px",
          height: "30px",
          border: "none",
          cursor: "pointer",
          margin: "3px",
          opacity: undoDisabled ? 0.5 : 1,
        }}
        aria-label="Undo"
      />
      <button
        onClick={onRedo}
        disabled={redoDisabled}
        style={{
          background: `url(${redoImg}) no-repeat center center`,
          backgroundSize: "contain",
          width: "30px",
          height: "30px",
          border: "none",
          cursor: "pointer",
          margin: "3px",
          marginRight: "25px",
          opacity: redoDisabled ? 0.5 : 1,
        }}
        aria-label="Redo"
      />
      <button
        onClick={onClear}
        style={{
          background: `url(${clearImg}) no-repeat center center`,
          backgroundSize: "contain",
          width: "30px",
          height: "30px",
          border: "none",
          cursor: "pointer",
          margin: "3px",
        }}
        aria-label="Clear"
      />
    </div>
  );
};

export default ActionButtons;
