import React from "react";

//default
const DefaultWidth1SVG = (
  <svg width="19" height="25" viewBox="0 0 19 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="1.45333" y1="1.66016" x2="17.1457" y2="28.8401" stroke="#505050" strokeWidth="3"/>
  </svg>
);

const DefaultWidth2SVG = (
  <svg width="21" height="26" viewBox="0 0 21 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="2.31936" y1="2.16016" x2="18.0117" y2="29.3401" stroke="#505050" strokeWidth="5"/>
  </svg>
);

const DefaultWidth3SVG = (
  <svg width="23" height="27" viewBox="0 0 23 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="3.6184" y1="2.41016" x2="19.3108" y2="29.5901" stroke="#505050" strokeWidth="8"/>
  </svg>
);

const DefaultWidth4SVG = (
  <svg width="27" height="28" viewBox="0 0 27 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="5.35045" y1="3.41016" x2="21.0428" y2="30.5901" stroke="#505050" strokeWidth="12"/>
  </svg>
);
const DefaultWidth5SVG = (
  <svg width="32" height="29" viewBox="0 0 32 37" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="7.94853" y1="4.91016" x2="23.6409" y2="32.0901" stroke="#505050" strokeWidth="18"/>
  </svg>
);

//selected
const SelectedWidth1SVG = (
  <svg width="19" height="35" viewBox="0 0 19 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="1.45333" y1="1.66016" x2="17.1457" y2="28.8401" stroke="white" strokeWidth="3"/>
  </svg>
);
const SelectedWidth2SVG = (
  <svg width="21" height="26" viewBox="0 0 21 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="2.31936" y1="2.16016" x2="18.0117" y2="29.3401" stroke="white" strokeWidth="5"/>
  </svg>
);
const SelectedWidth3SVG = (
  <svg width="23" height="27" viewBox="0 0 23 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="3.6184" y1="2.41016" x2="19.3108" y2="29.5901" stroke="white" strokeWidth="8"/>
  </svg>
);

const SelectedWidth4SVG = (
  <svg width="27" height="28" viewBox="0 0 27 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="5.35045" y1="3.41016" x2="21.0428" y2="30.5901" stroke="white" strokeWidth="12"/>
  </svg>
);
const SelectedWidth5SVG = (
<svg width="32" height="29" viewBox="0 0 32 37" fill="none" xmlns="http://www.w3.org/2000/svg">
  <line x1="7.94853" y1="4.91016" x2="23.6409" y2="32.0901" stroke="white" strokeWidth="18"/>
</svg>
);
const LineWidthPicker = ({ setWidth, lineWidth, showLineWidthPopup }) => {
  if (!showLineWidthPopup) return null;

  return (
    <div className="lineWidthPopup" style={{ display: "flex", flexDirection: "column", padding: "5px", background: "#fff", border: "none" }}>
      <div style={{ marginTop: "5px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={() => setWidth(1)} style={{ background: lineWidth === 1 ? "#505050" : "white", border: "none", padding: "5px", borderRadius: "5px", width: "40px", height: "40px" }}>
            {lineWidth === 1 ? SelectedWidth1SVG : DefaultWidth1SVG}
          </button>
          <button onClick={() => setWidth(3)} style={{ background: lineWidth === 3 ? "#505050" : "white", border: "none", padding: "5px", borderRadius: "5px", width: "40px", height: "40px" }}>
            {lineWidth === 3 ? SelectedWidth2SVG : DefaultWidth2SVG}
          </button>
          <button onClick={() => setWidth(5)} style={{ background: lineWidth === 5 ? "#505050" : "white", border: "none", padding: "5px", borderRadius: "5px", width: "40px", height: "40px" }}>
            {lineWidth === 5 ? SelectedWidth3SVG : DefaultWidth3SVG}
          </button>
          <button onClick={() => setWidth(10)} style={{ background: lineWidth === 10 ? "#505050" : "white", border: "none", padding: "5px", borderRadius: "5px", width: "40px", height: "40px" }}>
            {lineWidth === 10 ? SelectedWidth4SVG : DefaultWidth4SVG}
          </button>
          <button onClick={() => setWidth(15)} style={{ background: lineWidth === 15 ? "#505050" : "white", border: "none", padding: "5px", borderRadius: "5px", width: "40px", height: "40px" }}>
            {lineWidth === 15 ? SelectedWidth5SVG : DefaultWidth5SVG}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LineWidthPicker;
