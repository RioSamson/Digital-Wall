import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "../pages/DrawingPage.css";
import "../components/drawingCanvas";

function DrawingCanvas() {
  const colors = useMemo(
    () => ["black", "red", "green", "orange", "blue", "purple"],
    []
  );

  const canvasReference = useRef(null);
  const contextReference = useRef(null);

  const [isPressed, setIsPressed] = useState(false);

  const clearCanvas = () => {
    const canvas = canvasReference.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const beginDraw = (e) => {
    // e.preventDefault();
    contextReference.current.beginPath();
    const offsetX =
      e.nativeEvent.offsetX !== undefined
        ? e.nativeEvent.offsetX
        : e.touches[0].clientX -
          canvasReference.current.getBoundingClientRect().left;
    const offsetY =
      e.nativeEvent.offsetY !== undefined
        ? e.nativeEvent.offsetY
        : e.touches[0].clientY -
          canvasReference.current.getBoundingClientRect().top;
    contextReference.current.moveTo(offsetX, offsetY);
    setIsPressed(true);
  };

  const endDraw = (e) => {
    // e.preventDefault(); //this was causeing a bug with the phone version
    contextReference.current.closePath();
    //tell update draw that mouse click has ended
    setIsPressed(false);
  };

  const updateDraw = (e) => {
    // e.preventDefault();
    if (!isPressed) return;

    const offsetX =
      e.nativeEvent.offsetX !== undefined
        ? e.nativeEvent.offsetX
        : (e.touches[0]?.clientX || 0) -
          canvasReference.current.getBoundingClientRect().left;
    const offsetY =
      e.nativeEvent.offsetY !== undefined
        ? e.nativeEvent.offsetY
        : (e.touches[0]?.clientY || 0) -
          canvasReference.current.getBoundingClientRect().top;

    contextReference.current.lineTo(offsetX, offsetY);
    contextReference.current.stroke();
  };

  useEffect(() => {
    const canvas = canvasReference.current;
    //if you change the w and h, then you have to update the css page .Drawing page width too
    canvas.width = 500;
    canvas.height = 500;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = colors[0];
    context.lineWidth = 5;
    contextReference.current = context;
  }, [colors]);

  //this use effect prevents the phone from scrolling when touch drawing on canvas
  useEffect(() => {
    const canvas = canvasReference.current;

    const preventDefault = (e) => e.preventDefault();

    canvas.addEventListener("touchstart", preventDefault, { passive: false });
    canvas.addEventListener("touchmove", preventDefault, { passive: false });
    canvas.addEventListener("touchend", preventDefault, { passive: false });

    return () => {
      canvas.removeEventListener("touchstart", preventDefault);
      canvas.removeEventListener("touchmove", preventDefault);
      canvas.removeEventListener("touchend", preventDefault);
    };
  }, []);

  //set color is a function that receives a color,
  const setColor = (color) => {
    contextReference.current.strokeStyle = color;
  };

  return (
    <div className="DrawingPage">
      <canvas
        ref={canvasReference}
        onMouseDown={beginDraw} // When click down
        onMouseMove={updateDraw} // When clicked and moving
        onMouseUp={endDraw} // When click up/done
        onTouchStart={beginDraw} // When touch starts
        onTouchMove={updateDraw} // When touch moves
        onTouchEnd={endDraw} // When touch ends
      />
      <div className="buttons">
        <button onClick={clearCanvas}>Clear</button>
        {colors.map((color) => (
          <button
            className="colorButtons"
            key={color}
            onClick={() => setColor(color)}
            style={{ backgroundColor: color }}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default DrawingCanvas;
