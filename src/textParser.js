export const textParser = (text, ranges) => {
  if (text.slice(-1) !== ".") {
    // add '.' at the end of string
    text += ".";
  }
  ranges.sort((a, b) => a[0] - b[0]); // sort of ranges array by 1st value
  const sentences = []; // to store key: value pairs where key is sentence and value is formatted sentence
  let index = 0; // current index of ranges array
  let buffer = ""; // to store every new sentence
  let flag = true; // flag to check if <span> tag is closed at the end of a sentence
  let sentenceStart = 0; // start index of a new sentence
  for (let i = 0; i < text.length; i++) {
    if (i === ranges[index][0]) {
      buffer += "<span>";
      flag = false;
    }
    if (i === ranges[index][1]) {
      buffer += "</span>";
      flag = true;
      if (index < ranges.length - 1) index++; // increase index of ranges array by 1
    }
    buffer += text[i];

    if (text[i] === ".") {
      // if we are at the end of sentence
      const sentence = text.slice(sentenceStart, i); // extracting not formatted sentence from text
      if (flag) {
        sentences.push({
          [sentence]: buffer,
        });
        buffer = ""; // starting a new sentence when <span> tag is closed
      } else {
        buffer += "</span>"; // when <span> tag is not closed we add </span> at the end of sentence
        sentences.push({
          [sentence]: buffer,
        });
        buffer = "<span>"; // when <span> tag is not closed we add <span> at the beginning of next sentence
      }
      sentenceStart = i + 2; // skipping ". " in links
    }
  }
  return sentences;
};
