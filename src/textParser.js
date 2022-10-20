export const textParser = (text, ranges) => {
  if (text.slice(-1) !== ".") {
    // add '.' in the end of string
    text += ".";
  }
  ranges.sort((a, b) => a[0] - b[0]); // sort of ranges array by 1st value
  const sentences = [];
  let index = 0; // current in ranges array
  let buffer = "";
  let flag = true; // flag to check if <span> tag is closed at the end
  let sentenceStart = 0; // start index of new sentence
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
      const sentence = text.slice(sentenceStart, i);
      if (flag) {
        sentences.push({
          [sentence]: buffer,
        });
        buffer = "";
      } else {
        buffer += "</span>";
        sentences.push({
          [sentence]: buffer,
        });
        buffer = "<span>";
      }
      sentenceStart = i + 2;
      i++;
    }
  }
  return sentences;
};
