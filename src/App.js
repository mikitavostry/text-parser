import { useState, useEffect } from "react";
import "./App.css";
import parse from "html-react-parser";
import { textParser } from "./textParser";

function App() {
  const text = "zdanie peirwsze. zdanie drugie. zdanie trzecie.";
  const indexes = [
    [2, 5],
    [10, 20],
    [30, 34],
  ];
  const sentences = textParser(text, indexes);
  return (
    <div className="App">
      <div className="links">
        {sentences.map((sentence, index) => (
          <a className="link" href={Object.keys(sentence)[0]} key={index}>
            {parse(sentence[Object.keys(sentence)[0]])}
          </a>
        ))}
      </div>
    </div>
  );
}

export default App;
