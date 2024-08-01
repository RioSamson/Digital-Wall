import React, { useEffect } from "react";

const Canvas = React.forwardRef(({ colors, selectedColor, lineWidth, mode, setIsPressed, updateDraw }, ref) => {
  
    // Set up the canvas dimensions and initial drawing context
  useEffect(() => {
    const canvas = ref.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = colors[0];
    context.lineWidth = 5;

    const clearCanvas = () => {
      context.fillStyle = "#F8F8F8";
      context.fillRect(0, 0, canvas.width, canvas.height);
    };

    clearCanvas();
  }, [colors, ref]);

  // Prevent default touch actions to enable drawing on mobile devices
  useEffect(() => {
    const canvas = ref.current;
    const preventDefault = (e) => e.preventDefault();

    canvas.addEventListener("touchstart", preventDefault, { passive: false });
    canvas.addEventListener("touchmove", preventDefault, { passive: false });
    canvas.addEventListener("touchend", preventDefault, { passive: false });

    return () => {
      canvas.removeEventListener("touchstart", preventDefault);
      canvas.removeEventListener("touchmove", preventDefault);
      canvas.removeEventListener("touchend", preventDefault);
    };
  }, [ref]);

  const beginDraw = (e) => {
    // if (isZooming) return;
    const canvas = ref.current;
    const context = canvas.getContext("2d");
    context.beginPath();
    const offsetX = e.nativeEvent.offsetX !== undefined ? e.nativeEvent.offsetX : e.touches[0].clientX - canvas.getBoundingClientRect().left;
    const offsetY = e.nativeEvent.offsetY !== undefined ? e.nativeEvent.offsetY : e.touches[0].clientY - canvas.getBoundingClientRect().top;
    context.moveTo(offsetX, offsetY);
    context.lineTo(offsetX, offsetY); 
    context.stroke(); 
    setIsPressed(true);
  };

  const endDraw = () => {
    // if (isZooming) return;
    const canvas = ref.current;
    const context = canvas.getContext("2d");
    context.closePath();
    setIsPressed(false);
  };

  return (
    <canvas
      ref={ref}
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      onMouseDown={beginDraw}
      onMouseMove={updateDraw}
      onMouseUp={endDraw}
      onTouchStart={beginDraw}
      onTouchMove={updateDraw}
      onTouchEnd={endDraw}
    />
  );
});

export default Canvas;
