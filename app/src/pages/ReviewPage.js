import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ReviewPage() {
  const location = useLocation();
  const { image } = location.state || {};
  const [generatedImage, setGeneratedImage] = useState(null);

  useEffect(() => {
    if (image) {
      const sendImageToServer = async () => {
        const url = "https://app.baseten.co/model_versions/q48rmd3/predict"; // Relative URL
        const headers = {
          Authorization: "Api-Key 13235osK.AVglR2jVhzMHR1txMuFJCD49TEmV6FXY",
          "Content-Type": "application/json",
        };

        const imageData = image.split(",")[1];
        const data = {
          prompt: "a plushy dog",
          images_data: imageData,
          guidance_scale: 8,
          lcm_steps: 50,
          seed: 2159232,
          num_inference_steps: 4,
          strength: 0.7,
          width: 512,
          height: 512,
        };

        try {
          const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
          });

          if (response.ok) {
            const jsonResponse = await response.json();
            const imgStr = jsonResponse.model_output.image;
            setGeneratedImage(`data:image/png;base64,${imgStr}`);
          } else {
            console.error("Server returned an error", response.statusText);
          }
        } catch (error) {
          console.error("Error sending image to server:", error);
        }
      };

      sendImageToServer();
    }
  }, [image]);

  return (
    <div>
      <h1>Generated image</h1>
      {generatedImage ? (
        <img src={generatedImage} alt="Generated Drawing" />
      ) : (
        <p>No generated drawing found.</p>
      )}
      <div>
        <h1>Your Drawing</h1>
        {image ? <img src={image} alt="Drawing" /> : <p>No drawing found.</p>}
      </div>
    </div>
  );
}

export default ReviewPage;
