import React from "react";
import { useLocation } from "react-router-dom";

function ReviewPage() {
  const location = useLocation();
  const { image } = location.state || {};

  return (
    <div>
      <h1>Congratulation!</h1>
      {image ? <img src={image} alt="Drawing" /> : <p>No drawing found.</p>}
    </div>
  );
}

export default ReviewPage;
