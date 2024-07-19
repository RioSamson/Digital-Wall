import React, { useEffect, useState, useRef } from "react";

const Canvas = React.forwardRef(({ colors, selectedColor, lineWidth, mode, setIsPressed, setMode }, ref) => {
  const [scale, setScale] = useState(1);
  const [lastTouchDistance, setLastTouchDistance] = useState(null);
  const [transformOrigin, setTransformOrigin] = useState({ x: 0, y: 0 });
  const canvasRef = ref;

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = colors[0];
    context.lineWidth = 5;

    const fillWhiteBackground = () => {
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
    };

    fillWhiteBackground();

    const clearCanvas = () => {
      context.fillStyle = "white";
      context.fillRect(0, 0, canvas.width, canvas.height);
    };

    clearCanvas();
  }, [colors, canvasRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const preventDefault = (e) => e.preventDefault();

    canvas.addEventListener("touchstart", preventDefault, { passive: false });
    canvas.addEventListener("touchmove", preventDefault, { passive: false });
    canvas.addEventListener("touchend", preventDefault, { passive: false });

    return () => {
      canvas.removeEventListener("touchstart", preventDefault);
      canvas.removeEventListener("touchmove", preventDefault);
      canvas.removeEventListener("touchend", preventDefault);
    };
  }, [canvasRef]);

  const getTouchDistance = (touches) => {
    const [touch1, touch2] = touches;
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getMidPoint = (touches) => {
    const [touch1, touch2] = touches;
    const midX = (touch1.clientX + touch2.clientX) / 2;
    const midY = (touch1.clientY + touch2.clientY) / 2;
    return { x: midX, y: midY };
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      setLastTouchDistance(getTouchDistance(e.touches));
      setTransformOrigin(getMidPoint(e.touches));
      setMode(null); // Disable drawing mode
    } else {
      beginDraw(e);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      const currentDistance = getTouchDistance(e.touches);
      const scaleChange = currentDistance / lastTouchDistance;
      setScale((prevScale) => Math.max(1, prevScale * scaleChange)); // Prevent scaling below 1
      setLastTouchDistance(currentDistance);
    } else {
      handleDrawing(e);
    }
  };

  const getAdjustedCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const offsetX = e.nativeEvent.offsetX !== undefined ? e.nativeEvent.offsetX : e.touches[0].clientX - rect.left;
    const offsetY = e.nativeEvent.offsetY !== undefined ? e.nativeEvent.offsetY : e.touches[0].clientY - rect.top;
    return { x: offsetX / scale, y: offsetY / scale };
  };

  const beginDraw = (e) => {
    if (!mode) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.beginPath();
    const { x, y } = getAdjustedCoordinates(e);
    context.moveTo(x, y);
    context.lineTo(x, y);
    context.stroke();
    setIsPressed(true);
  };

  const endDraw = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.closePath();
    setIsPressed(false);
  };

  const handleDrawing = (e) => {
    if (!mode) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const { x, y } = getAdjustedCoordinates(e);
    context.lineTo(x, y);
    context.stroke();
  };

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        transform: `scale(${scale})`,
        transformOrigin: `${transformOrigin.x}px ${transformOrigin.y}px`
      }}
      onMouseDown={beginDraw}
      onMouseMove={handleDrawing}
      onMouseUp={endDraw}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={endDraw}
    />
  );
});

export default Canvas;
