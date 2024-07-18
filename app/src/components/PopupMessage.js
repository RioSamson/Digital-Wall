import React from "react";

const PopupMessage = ({ area, topAreaName, centerAreaName, bottomAreaName, }) => {
  let message;
  if (area === "top") {
    message = `Draw a single object in the ${topAreaName}!`;
  } else if (area === "center") {
    message = `Draw a single object in the ${centerAreaName}!`;
  } else if (area === "bottom") {
    message = `Draw a single object in the ${bottomAreaName}!`;
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