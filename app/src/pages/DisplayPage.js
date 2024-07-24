import React, { useEffect, useState, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

function DisplayPage() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const selectedScene = searchParams.get("theme");
  const { imageUrl } = location.state || {};
  const [backgroundImage, setBackgroundImage] = useState(imageUrl);
  const [topDrawings, setTopDrawings] = useState([]);
  const [centerDrawings, setCenterDrawings] = useState([]);
  const [bottomDrawings, setBottomDrawings] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [readCount, setReadCount] = useState(0);
  const [onlyReviewedDrawings, setOnlyReviewedDrawings] = useState(false);
  const containerRef = useRef(null);
  const drawingSize = 15;

  const incrementReadCount = (count) => {
    setReadCount((prevCount) => prevCount + count);
  };

  useEffect(() => {
    const fetchScene = async () => {
      if (selectedScene) {
        try {
          console.log("Fetching scene for selected scene:", selectedScene);
          const docRef = doc(db, "Themes", selectedScene);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setCoordinates(data.coordinates || []);
            setOnlyReviewedDrawings(data.onlyReviewedDrawings || false);
            incrementReadCount(1); // Counting the read for the scene document
            if (!backgroundImage) {
              setBackgroundImage(data.background_img);
            }
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching scene:", error);
        }
      }
    };

    fetchScene();
  }, []);

  useEffect(() => {
    const fetchDrawings = async () => {
      if (coordinates.length === 0) return;

      try {
        // Fetch drawings based on the fetched coordinates
        const topCoords = coordinates.filter((coord) => coord.area === "top");
        const centerCoords = coordinates.filter(
          (coord) => coord.area === "center"
        );
        const bottomCoords = coordinates.filter(
          (coord) => coord.area === "bottom"
        );

        const commonConditions = [
          where("theme_id", "==", doc(db, "Themes", selectedScene)),
          orderBy("created_at", "desc"),
        ];

        if (onlyReviewedDrawings) {
          commonConditions.push(where("isReviewed", "==", true));
        }

        const topDrawingsQuery = query(
          collection(db, "Drawings"),
          where("displayArea", "==", "top"),
          ...commonConditions,
          limit(topCoords.length)
        );
        const centerDrawingsQuery = query(
          collection(db, "Drawings"),
          where("displayArea", "==", "center"),
          ...commonConditions,
          limit(centerCoords.length)
        );
        const bottomDrawingsQuery = query(
          collection(db, "Drawings"),
          where("displayArea", "==", "bottom"),
          ...commonConditions,
          limit(bottomCoords.length)
        );

        const [
          topDrawingsSnapshot,
          centerDrawingsSnapshot,
          bottomDrawingsSnapshot,
        ] = await Promise.all([
          getDocs(topDrawingsQuery),
          getDocs(centerDrawingsQuery),
          getDocs(bottomDrawingsQuery),
        ]);

        setTopDrawings(
          topDrawingsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        setCenterDrawings(
          centerDrawingsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
        setBottomDrawings(
          bottomDrawingsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );

        incrementReadCount(topDrawingsSnapshot.docs.length);
        incrementReadCount(centerDrawingsSnapshot.docs.length);
        incrementReadCount(bottomDrawingsSnapshot.docs.length);

        console.log(
          "Top drawings: ",
          topDrawingsSnapshot.docs.map((doc) => doc.data())
        );
        console.log(
          "Center drawings: ",
          centerDrawingsSnapshot.docs.map((doc) => doc.data())
        );
        console.log(
          "Bottom drawings: ",
          bottomDrawingsSnapshot.docs.map((doc) => doc.data())
        );
      } catch (error) {
        console.error("Error fetching drawings:", error);
      }
    };

    fetchDrawings();
  }, [coordinates, selectedScene, onlyReviewedDrawings]);

  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      const aspectRatio = 1920 / 1080;
      const windowAspectRatio = window.innerWidth / window.innerHeight;

      if (windowAspectRatio > aspectRatio) {
        container.style.width = `${window.innerHeight * aspectRatio}px`;
        container.style.height = `${window.innerHeight}px`;
      } else {
        container.style.width = `${window.innerWidth}px`;
        container.style.height = `${window.innerWidth / aspectRatio}px`;
      }
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.log(`Total database reads: ${readCount}`);
  }, [readCount]);

  useEffect(() => {
    if (!selectedScene) return;

    const commonConditions = [
      where("theme_id", "==", doc(db, "Themes", selectedScene)),
      orderBy("created_at", "desc"),
    ];

    if (onlyReviewedDrawings) {
      commonConditions.push(where("isReviewed", "==", true));
    }

    const newDrawingsQuery = query(
      collection(db, "Drawings"),
      ...commonConditions
    );

    const unsubscribe = onSnapshot(newDrawingsQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const drawing = { id: change.doc.id, ...change.doc.data() };
        const { displayArea } = drawing;

        if (change.type === "added") {
          switch (displayArea) {
            case "top":
              setTopDrawings((prev) => {
                if (prev.find((d) => d.id === drawing.id)) return prev;
                if (
                  prev.length <
                  coordinates.filter((coord) => coord.area === "top").length
                ) {
                  return [drawing, ...prev];
                } else {
                  return [drawing, ...prev.slice(0, -1)];
                }
              });
              break;
            case "center":
              setCenterDrawings((prev) => {
                if (prev.find((d) => d.id === drawing.id)) return prev;
                if (
                  prev.length <
                  coordinates.filter((coord) => coord.area === "center").length
                ) {
                  return [drawing, ...prev];
                } else {
                  return [drawing, ...prev.slice(0, -1)];
                }
              });
              break;
            case "bottom":
              setBottomDrawings((prev) => {
                if (prev.find((d) => d.id === drawing.id)) return prev;
                if (
                  prev.length <
                  coordinates.filter((coord) => coord.area === "bottom").length
                ) {
                  return [drawing, ...prev];
                } else {
                  return [drawing, ...prev.slice(0, -1)];
                }
              });
              break;
            default:
              break;
          }
        } else if (change.type === "removed") {
          switch (displayArea) {
            case "top":
              setTopDrawings((prev) =>
                prev.filter((drawing) => drawing.id !== change.doc.id)
              );
              break;
            case "center":
              setCenterDrawings((prev) =>
                prev.filter((drawing) => drawing.id !== change.doc.id)
              );
              break;
            case "bottom":
              setBottomDrawings((prev) =>
                prev.filter((drawing) => drawing.id !== change.doc.id)
              );
              break;
            default:
              break;
          }
        }
      });
    });

    return () => unsubscribe();
  }, [selectedScene, coordinates, onlyReviewedDrawings]);

  const renderDrawings = (drawings, areaCoords) => {
    return drawings.map((drawing, index) => {
      const coord = areaCoords[index];
      if (!coord) return null; // Ensure coord exists
      return (
        <img
          key={drawing.id}
          src={drawing.enhanced_drawings[0]}
          alt={`Drawing ${drawing.id}`}
          style={{
            position: "absolute",
            width: `${drawingSize}%`,
            height: `${drawingSize}%`,
            top: `${coord.y - drawingSize / 2.3}%`,
            left: `${coord.x - drawingSize / 2}%`,
            objectFit: "contain",
          }}
        />
      );
    });
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          maxWidth: "1920px",
          maxHeight: "1080px",
        }}
      >
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt="Background"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "100%",
              height: "100%",
              objectFit: "contain",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          {renderDrawings(
            topDrawings,
            coordinates.filter((coord) => coord.area === "top")
          )}
          {renderDrawings(
            centerDrawings,
            coordinates.filter((coord) => coord.area === "center")
          )}
          {renderDrawings(
            bottomDrawings,
            coordinates.filter((coord) => coord.area === "bottom")
          )}
        </div>
      </div>
    </div>
  );
}

export default DisplayPage;
