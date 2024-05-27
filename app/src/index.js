import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider, Route,} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import DrawingPage from './pages/DrawingPage';
import ReviewPage from './pages/ReviewPage';
import GalleryPage from './pages/GalleryPage';

const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
  },
  {
    path:"login",
    element: <LoginPage/>,
  },
  {
    path:"drawing",
    element: <DrawingPage/>,
  },
  {
    path:"review",
    element: <ReviewPage/>,
  },
  {
    path:"gallery",
    element: <GalleryPage/>,
  },
  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
     <RouterProvider router={router}/>
    // <React.StrictMode>
    // <App />
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
