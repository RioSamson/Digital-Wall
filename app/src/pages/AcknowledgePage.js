import React from "react";

/**
 * AcknowledgePage component
 * 
 * This component renders an acknowledgement page with a specific layout and styling. 
 * It includes SVG graphics and multiple sections of text acknowledging various teams 
 * and individuals involved in the project.
 * 
 * @component
 * @example
 * return (
 *   <AcknowledgePage />
 * )
 */
function AcknowledgePage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      {/* Top right SVG graphic */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 10,
        }}
      >
        <svg
          width="168"
          height="289"
          viewBox="0 0 168 289"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse
            cx="126.834"
            cy="199.71"
            rx="54.857"
            ry="50.7719"
            transform="rotate(12.5958 126.834 199.71)"
            fill="#FFD5A6"
          />
          <ellipse
            cx="172.035"
            cy="120.961"
            rx="54.857"
            ry="50.7719"
            transform="rotate(12.5958 172.035 120.961)"
            fill="#FFD5A6"
          />
          <ellipse
            cx="208.234"
            cy="36.3179"
            rx="54.857"
            ry="50.7719"
            transform="rotate(12.5958 208.234 36.3179)"
            fill="#FFD5A6"
          />
        </svg>
      </div>

      {/* Acknowledgement heading */}
      <h2
        style={{
          fontSize: "32px",
          fontWeight: 600,
        }}
      >
        Acknowledgement
      </h2>

      {/* Acknowledgement text */}
      <span
        style={{
          fontSize: "11px",
          fontWeight: 400,
          marginTop: "0px",
          marginBottom: "25px",
          marginLeft: "20px",
          marginRight: "20px",
          zIndex: 20,
          padding: "10px",
          borderRadius: "5px",
          textAlign: "left",
        }}
      >
        Artspark was developed through a collaborative partnership between
        students of the Masters in Digital Media at the Centre for Digital
        Media, and the Digital Lab at BC Children’s Hospital. We acknowledge the
        dedication and expertise of all those involved, whose contributions have
        been vital to success. Our heartfelt thanks go to the following teams
        and individuals for their instrumental roles in bringing this project to
        life.
      </span>

      {/* Subject Matter Experts heading */}
      <h2
        style={{
          fontSize: "11px",
          fontWeight: 700,
          marginTop: "0px",
          marginBottom: "0px",
          marginLeft: "20px",
          marginRight: "20px",
          zIndex: 20,
          padding: "10px",
          paddingTop: "5px",
          borderRadius: "5px",
          textAlign: "left",
          alignSelf: "flex-start",
        }}
      >
        Subject Matter Experts
      </h2>

      {/* Subject Matter Experts list */}
      <span
        style={{
          fontSize: "11px",
          fontWeight: 400,
          marginTop: "0px",
          marginBottom: "25px",
          marginLeft: "20px",
          marginRight: "20px",
          zIndex: 20,
          padding: "10px",
          paddingTop: "0px",
          borderRadius: "5px",
          textAlign: "left",
          alignSelf: "flex-start",
        }}
      >
        Dr. John Jacob, PhD, MSc, MBA
        <br />
        Head, Digital Lab, BC Children’s Hospital
        <br />
        <br />
        Dr. Sima Zakani, PhD
        <br />
        Associate Director, Digital Lab
        <br />
        <br />
        Jenny Huang, MHA
        <br />
        Project Manager, Digital Lab
      </span>

      {/* Digital Lab heading */}
      <h2
        style={{
          fontSize: "11px",
          fontWeight: 700,
          marginTop: "0px",
          marginBottom: "5px",
          marginLeft: "20px",
          marginRight: "20px",
          zIndex: 20,
          padding: "10px",
          paddingTop: "0px",
          borderRadius: "5px",
          textAlign: "left",
          alignSelf: "flex-start",
        }}
      >
        Digital Lab at BC Children’s Hospital
      </h2>

      {/* Digital Lab description */}
      <span
        style={{
          fontSize: "11px",
          fontWeight: 400,
          marginTop: "0px",
          marginBottom: "25px",
          marginLeft: "20px",
          marginRight: "20px",
          zIndex: 20,
          padding: "10px",
          paddingTop: "0px",
          borderRadius: "5px",
          textAlign: "left",
          alignSelf: "flex-start",
        }}
      >
        The Digital Lab is an integrated unit of BC Children’s Hospital and the
        University of British Columbia’s. The aim of the Lab is to improve
        health outcomes and the delivery of health services through digital
        innovation and technology.
      </span>

      {/* Technical Project Team heading */}
      <h2
        style={{
          fontSize: "11px",
          fontWeight: 700,
          marginTop: "0px",
          marginBottom: "0px",
          marginLeft: "20px",
          marginRight: "20px",
          zIndex: 20,
          padding: "10px",
          paddingTop: "5px",
          borderRadius: "5px",
          textAlign: "left",
          alignSelf: "flex-start",
        }}
      >
        Technical Project Team
      </h2>

      {/* Technical Project Team members */}
      <span
        style={{
          fontSize: "11px",
          fontWeight: 400,
          marginTop: "0px",
          marginBottom: "100px",
          marginLeft: "20px",
          marginRight: "20px",
          zIndex: 20,
          padding: "10px",
          paddingTop: "0px",
          borderRadius: "5px",
          textAlign: "left",
          alignSelf: "flex-start",
        }}
      >
        Advisor: Bill Zhao
        <br />
        Team: Carol Tseng, Nicole Gao, Qianhui Qin, Rio Samson, Sadaf Ahmadi,
        Zoe Lu
        <br />
        <br />
      </span>

      {/* Bottom left SVG graphic */}
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: 0,
          width: "auto",
          height: "auto",
          zIndex: 10,
        }}
      >
        <svg
          width="322"
          height="241"
          viewBox="0 0 322 241"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "auto" }} // Ensures responsiveness
        >
          <path
            d="M-32.9952 5.40134L-35.8151 60.245C30.0767 46.6642 55.7297 57.588 54.6651 66.618C53.6005 75.648 40.3806 80.5712 8.39501 83.8491C-23.5906 87.127 -51.4679 104.704 -67.0382 128.876C-82.6086 153.049 -79.0813 203.536 -24.0989 225.453C30.8835 247.37 80.0016 221.441 107.617 201.97C135.232 182.499 141.814 186.799 153.984 227.206C166.154 267.612 196.95 290.567 266.314 288.09C321.804 286.109 324.705 199.084 319.219 155.82L250.007 160.786L246.662 211.84C246.187 217.699 243.031 229.375 234.203 229.209C223.168 229.002 221.066 240.3 203.516 179.206C185.967 118.112 142.78 108.848 94.7134 142.355C46.6464 175.863 5.81152 200.257 -7.97603 171.854C-19.0061 149.131 4.51036 138.905 17.6473 136.632C54.9287 130.238 126.009 103.76 112.08 48.9994C98.1508 -5.76095 9.55937 -2.88278 -32.9952 5.40134Z"
            fill="#C9F2D2"
          />
        </svg>
      </div>
    </div>
  );
}

export default AcknowledgePage;
