import logo from './logo.svg';
import './App.css';
import React, {useLayoutEffect, useState} from "react";
import rough from 'roughjs/bundled/rough.esm'

const generator = rough.generator();

function App() {
  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // ctx.fillStyle = "green";
    // ctx.fillRect(10, 10, 150, 100);
    // ctx.strokeRect(200,200,100,100)

    const roughCanvas = rough.canvas(canvas);
    const rect = generator.rectangle(10,10,100,100);
    roughCanvas.draw(rect);

  }
  )
  return (
    <canvas id='canvas' width={window.innerWidth} height={window.innerHeight}>
      canvas
    </canvas>
    // <div className="App">
    //   <header className="App-header">
    //     <p>
    //       Hello world
    //     </p>
    //   </header>
    // </div>
  );
}

export default App;
