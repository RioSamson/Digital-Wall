import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import LoginPage from "./pages/LoginPage";
import DrawingPage from "./pages/DrawingPage";
import ReviewPage from "./pages/ReviewPage";
import GalleryPage from "./pages/GalleryPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./contexts/authContext";
import SceneSelectorPage from "./pages/SceneSelectorPage";
import SceneAreaSelector from "./pages/SceneAreaSelectorPage";
import DrawOrGalleryPage from "./pages/DrawOrGalleryPage";
import DisplayPage from "./pages/DisplayPage";
import EmailVerification from "./pages/EmailVerificationPage";
import MyDrawingPage from "./pages/MyDrawingPage";
import AcknowledgePage from "./pages/AcknowledgePage";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="drawing" element={<DrawingPage />} />
          <Route path="review" element={<ReviewPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="SceneSelect" element={<SceneSelectorPage />} />
          <Route path="SceneAreaSelect" element={<SceneAreaSelector />} />
          <Route path="selection" element={<DrawOrGalleryPage />} />
          <Route path="display" element={<DisplayPage />} />
          <Route path="verification" element={<EmailVerification />} />
          <Route path="myDrawing" element={<MyDrawingPage />} />
          <Route path="acknowledge" element={<AcknowledgePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
