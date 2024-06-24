import React from "react";
import width1Image from "../assets/width1.png";
import width2Image from "../assets/width2.png";
import width3Image from "../assets/width3.png";
import width4Image from "../assets/width4.png";
import width5Image from "../assets/width5.png";

const LineWidthPicker = ({ setWidth, lineWidth, showLineWidthPopup }) => {
  if (!showLineWidthPopup) return null;

  return (
    <div className="lineWidthPopup" style={{ display: "flex", flexDirection: "column", padding: "10px", background: "#fff", border: "none" }}>
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={() => setWidth(1)} style={{ background: `url(${width1Image})`, width: "30px", height: "30px", backgroundSize: "cover", border: lineWidth === 1 ? "2px solid blue" : "none" }} />
          <button onClick={() => setWidth(3)} style={{ background: `url(${width2Image})`, width: "30px", height: "30px", backgroundSize: "cover", border: lineWidth === 3 ? "2px solid blue" : "none" }} />
          <button onClick={() => setWidth(5)} style={{ background: `url(${width3Image})`, width: "30px", height: "30px", backgroundSize: "cover", border: lineWidth === 5 ? "2px solid blue" : "none" }} />
          <button onClick={() => setWidth(10)} style={{ background: `url(${width4Image})`, width: "30px", height: "30px", backgroundSize: "cover", border: lineWidth === 10 ? "2px solid blue" : "none" }} />
          <button onClick={() => setWidth(15)} style={{ background: `url(${width5Image})`, width: "30px", height: "30px", backgroundSize: "cover", border: lineWidth === 15 ? "2px solid blue" : "none" }} />
        </div>
      </div>
    </div>
  );
};

export default LineWidthPicker;
