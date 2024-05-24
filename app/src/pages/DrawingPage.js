import React, { useLayoutEffect } from "react";
import rough from 'roughjs/bundled/rough.esm';
import { useNavigate } from 'react-router-dom';

function DrawingPage() {
  const navigate = useNavigate();
  const generator = rough.generator();

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "green";
    ctx.fillRect(10, 10, 150, 100);
    const roughCanvas = rough.canvas(canvas);
    const rect = generator.rectangle(10, 10, 100, 100);
    roughCanvas.draw(rect);
  }, [generator]);

  const uploadClick = () => {
    // Ensure the /review route exists or update this to an existing route
    navigate('/review');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Drawing Page</h1>
      <button onClick={uploadClick} style={{ margin: '10px', padding: '10px 20px' }}>
        Upload
      </button>
      <canvas id='canvas' width={window.innerWidth} height={window.innerHeight}>
        canvas
      </canvas>
    </div>
  );
}

export default DrawingPage;
