import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import rough from "roughjs/bundled/rough.esm";
import { useNavigate } from "react-router-dom";
import "./DrawingPage.css";
import { storage, db, auth } from "../firebase/firebase"; // Import Firestore and Auth
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function DrawingPage() {
  const navigate = useNavigate();

  const uploadClick = () => {
    const canvas = canvasReference.current;
    canvas.toBlob((blob) => {
      if (blob) {
        const storageRef = ref(storage, `drawing/${Date.now()}.png`);
        uploadBytes(storageRef, blob).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            onAuthStateChanged(auth, async (user) => {
              if (user) {
                const email = user.email;

                const drawingsCollection = collection(db, "drawing");
                const q = query(drawingsCollection, where("email", "==", email));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                  // Update existing document
                  console.log("this is an existing account")
                  const docId = querySnapshot.docs[0].id;
                  const docRef = doc(db, "drawing", docId);
                  const existingDrawings = querySnapshot.docs[0].data().drawings;

                  await updateDoc(docRef, {
                    drawings: [...existingDrawings, url],
                    updatedAt: new Date()
                  });
                  console.log("Document successfully updated!");
                } else {
                  // Create new document
                  await addDoc(drawingsCollection, {
                    email: email,
                    drawings: [url],
                    createdAt: new Date()
                  });
                  console.log("Document successfully created!");
                }

                navigate("/review", { state: { image: url } });
              } else {
                console.log("No user is signed in.");
              }
            });
          });
        });
      }
    }, "image/png");
  };

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
    contextReference.current.closePath();
    setIsPressed(false);
  };

  const updateDraw = (e) => {
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
    canvas.width = 500;
    canvas.height = 500;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = colors[0];
    context.lineWidth = 5;
    contextReference.current = context;
  }, [colors]);

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

  const setColor = (color) => {
    contextReference.current.strokeStyle = color;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>Drawing Page</h1>
      <button
        className="completeButton"
        onClick={uploadClick}
        style={{ margin: "10px", padding: "10px 20px" }}
      >
        Complete
      </button>
      <div className="DrawingPage">
        <canvas
          ref={canvasReference}
          onMouseDown={beginDraw}
          onMouseMove={updateDraw}
          onMouseUp={endDraw}
          onTouchStart={beginDraw}
          onTouchMove={updateDraw}
          onTouchEnd={endDraw}
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
    </div>
  );
}

export default DrawingPage;
