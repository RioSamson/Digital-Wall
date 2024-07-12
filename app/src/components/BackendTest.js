import React, { useEffect, useState } from "react";

function BackendTest() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch("/api/test");
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        console.error("Error fetching message:", error);
      }
    };

    fetchMessage();
  }, []);

  return <div>{message ? <p>{message}</p> : <p>Loading...</p>}</div>;
}

export default BackendTest;
