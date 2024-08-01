import React from "react";

/**
 * PopupMessage component
 *
 * This component displays a popup message based on the selected drawing area.
 *
 * @param {Object} props - The component props
 * @param {string} props.area - The area selected ("top", "center", or "bottom")
 * @param {string} props.topAreaName - The name of the top area
 * @param {string} props.centerAreaName - The name of the center area
 * @param {string} props.bottomAreaName - The name of the bottom area
 * @returns {JSX.Element} The PopupMessage component
 */
const PopupMessage = ({ area, topAreaName, centerAreaName, bottomAreaName }) => {
  // Determine the message based on the selected area
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
