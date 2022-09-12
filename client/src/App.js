import React from "react";
import "./App.css";
import Dragdrop from "./DragDrop";
//
function App() {
  {
    console.log(
      "%cDeveloped by : @rishikkshah",
      "color: blue; font-family:monospace; font-size: 20px"
    );
    console.log(
      "%cI know the accuracy is terrible, but I am working on it. :)",
      "color: blue; font-family:monospace; font-size: 20px"
    );
    console.log(
      "%cAny feedback is appreciated. :)",
      "color: blue; font-family:monospace; font-size: 20px"
    );
    console.log(
      "%cLinkedIn: https://www.linkedin.com/in/rishikkshah/",
      "color: blue; font-family:monospace; font-size: 20px"
    );
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>TWIN KIITIANS</h1>
        <h2>Find your lookalike in KIIT</h2>
        <Dragdrop />
      </header>
    </div>
  );
}

export default App;
