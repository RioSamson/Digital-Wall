import express from "express";
import cors from "cors";
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
import { config } from "dotenv";

config();

const app = express();
const PORT = process.env.PORT || 4000; // Ensure it uses the port from .env

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.post("/api/enhance", async (req, res) => {
  const { base64Img, prompt } = req.body;

  const url = "https://app.baseten.co/model_versions/q48rmd3/predict"; // Replace with your Baseten endpoint
  const headers = {
    Authorization: "Api-Key 13235osK.AVglR2jVhzMHR1txMuFJCD49TEmV6FXY",
    "Content-Type": "application/json",
  };

  const imageData = base64Img.split(",")[1];
  const data = {
    prompt: prompt || "a polarbear", // Use the prompt passed to this function
    images_data: imageData,
    guidance_scale: 8,
    lcm_steps: 50,
    seed: 2159232,
    num_inference_steps: 4,
    strength: 0.7,
    width: 512,
    height: 512,
  };

  console.log("Data being sent to Baseten:", data);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      res.json({
        enhancedImage: `data:image/png;base64,${jsonResponse.model_output.image}`,
      });
    } else {
      console.error("Server returned an error", response.statusText);
      res.status(500).json({ error: "Baseten API error" });
    }
  } catch (error) {
    console.error("Error sending image to server:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
