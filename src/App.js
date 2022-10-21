import parse from "html-react-parser";
import { textParser } from "./textParser";
import "./App.css";

function App() {
  const text = "zdanie peirwsze. zdanie drugie. zdanie trzecie.";
  const indexes = [
    [2, 5],
    [10, 20],
    [30, 34],
  ];
  const formattedLinks = textParser(text, indexes);
  return (
    <div className="App">
      <div>
        {formattedLinks.map((sentence, index) => (
          <a href={sentence.link} key={index}>
            {parse(sentence.formatted)}
          </a>
        ))}
      </div>
    </div>
  );
}

export default App;
