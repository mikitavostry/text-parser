import { useState, useEffect } from "react";
import "./App.css";
import parse from "html-react-parser";
import { textParser } from "./textParser";

function App() {
  const text =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  const indexes = [
    [2, 23],
    [28, 66],
    [90, 200],
    [204, 290],
  ];
  const sentences = textParser(text, indexes);
  console.log(sentences);
  return (
    <div className="App">
      <div className="links">
        {sentences.map((sentence, index) => (
          <a className="link" href={Object.keys(sentence)[0]} key={index}>
            {parse("sentence[Object.keys(sentence)[0]]")}
          </a>
        ))}
      </div>
    </div>
  );
}

export default App;

function fibbonaci(num) {
  if (num <= 1) {
    return num;
  }
  return fibbonaci(num - 2) + fibbonaci(num - 1);
}
