import React from "react";

const PopupMessage = ({ area }) => {
  let message;
  if (area === "top") {
    message = "Draw a single object in the sky!";
  } else if (area === "center") {
    message = "Draw a single object on the land!";
  } else if (area === "bottom") {
    message = "Draw a single object in the water!";
  } else {
    message = "Specify a valid area!";
  }

  return (
    <div className="popup-message">
      <div className="popup-content">
        <p style={{ padding: "10px" }}>{message}</p>
      </div>
    </div>
  );
};

export default PopupMessage;