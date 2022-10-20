const simpleTextParser = (text, ranges) => {
  if (text.slice(-1) !== ".") {
    // add '.' in the end of string
    text += ".";
  }
  ranges.sort((a, b) => a[0] - b[0]); // sort of ranges array by 1st value
  const sentences = [];

  let index = 0;
  let formattedText = "";
  for (let i = 0; i < ranges.length; i++) {
    formattedText +=
      text.slice(index, ranges[i][0]) +
      "<span>" +
      text.slice(ranges[i][0], ranges[i][1]) +
      "</span>";
    index = ranges[i][1];
  }
  formattedText += text.slice(index);
  return formattedText.split(". ");
};

const text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const indexes = [
  [2, 23],
  [28, 66],
  [90, 200],
  [204, 290],
];

function queensAttack(n, k, r_q, c_q, obstacles) {
  let count = 0;
  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < n + 1; j++) {
      if (
        isEmptyDiagonal([c_q, r_q], [i, j], obstacles) ||
        isEmptyHorizontal([c_q, r_q], [i, j], obstacles) ||
        isEmptyVertical([c_q, r_q], [i, j], obstacles)
      ) {
        console.log(i, j);
        count++;
      }
    }
  }
  return count;
}

function isEmptyVertical(start, target, obstacles) {
  if (start[0] !== target[0]) {
    return false;
  }
  if (start[0] === target[0] && start[1] === target[1]) {
    return false;
  }

  const min = Math.min(start[1], target[1]);
  const max = Math.max(start[1], target[1]);
  for (let y = min + 1; y < max; y++) {
    obstacles.forEach((cell) => {
      if (cell[0] === start[0] && cell[1] === y) {
        return false;
      }
    });
  }
  return true;
}

function isEmptyHorizontal(start, target, obstacles) {
  if (start[1] !== target[1]) {
    return false;
  }
  if (start[0] === target[0] && start[1] === target[1]) {
    return false;
  }
  const min = Math.min(start[0], target[0]);
  const max = Math.max(start[0], target[0]);
  for (let x = min + 1; x < max; x++) {
    obstacles.forEach((cell) => {
      if (cell[0] === x && cell[1] === start[1]) {
        return false;
      }
    });
  }
  return true;
}

function isEmptyDiagonal(start, target, obstacles) {
  const absX = Math.abs(target[0] - start[0]);
  const absY = Math.abs(target[1] - start[1]);
  if (absY !== absX) return false;
  if (start[0] === target[0] && start[1] === target[1]) {
    return false;
  }
  const dy = start[1] < target[1] ? 1 : -1;
  const dx = start[0] < target[0] ? 1 : -1;

  for (let i = 1; i < absY; i++) {
    obstacles.forEach((cell) => {
      if (cell[0] === start[0] + dx * i && cell[1] === start[1] + dy * i) {
        return false;
      }
    });
  }

  return true;
}

console.log(
  queensAttack(5, 3, 3, 4, [
    [5, 5],
    [2, 3],
    [3, 2],
  ])
);
