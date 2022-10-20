import { textParser } from "../textParser";

describe("Parser function", () => {
  test("Higlight from index to index inside text range", () => {
    const text = "Hello. My name is Mikita.";
    const indexes = [
      [2, 10],
      [13, 15],
    ];
    const output = [
      { Hello: "He<span>llo.</span>" },
      {
        "My name is Mikita": "<span>My </span>nam<span>e </span>is Mikita.",
      },
    ];
    expect(JSON.stringify(textParser(text, indexes))).toEqual(
      JSON.stringify(output)
    );
  });
  test("Higlight with one index inside of text range and one outside", () => {
    const text = "Hello. My name is Mikita.";
    const indexes = [
      [2, 10],
      [13, 100],
    ];
    const output = [
      { Hello: "He<span>llo.</span>" },
      {
        "My name is Mikita": "<span>My </span>nam<span>e is Mikita.</span>",
      },
    ];
    expect(JSON.stringify(textParser(text, indexes))).toEqual(
      JSON.stringify(output)
    );
  });
  test("Higlight with indexes outside of text range", () => {
    const text = "Hello. My name is Mikita.";
    const indexes = [
      [100, 200],
      [202, 303],
    ];
    const output = [
      { Hello: "Hello." },
      { "My name is Mikita": "My name is Mikita." },
    ];
    expect(JSON.stringify(textParser(text, indexes))).toEqual(
      JSON.stringify(output)
    );
  });
  test("Higlight without dot in the end", () => {
    const text = "Hello. My name is Mikita";
    const indexes = [
      [2, 10],
      [13, 15],
    ];
    const output = [
      { Hello: "He<span>llo.</span>" },
      {
        "My name is Mikita": "<span>My </span>nam<span>e </span>is Mikita.",
      },
    ];
    expect(JSON.stringify(textParser(text, indexes))).toEqual(
      JSON.stringify(output)
    );
  });
  test("Higlight with same sentences", () => {
    const text = "Hello. My name is Mikita. Hello. Hello";
    const indexes = [
      [2, 10],
      [13, 34],
    ];
    const output = [
      { Hello: "He<span>llo.</span>" },
      {
        "My name is Mikita": "<span>My </span>nam<span>e is Mikita.</span>",
      },
      { Hello: "<span>Hello.</span>" },
      { Hello: "<span>H</span>ello." },
    ];
    expect(JSON.stringify(textParser(text, indexes))).toEqual(
      JSON.stringify(output)
    );
  });
  test("Higlight with not sorted indexes", () => {
    const text = "Hello. My name is Mikita. Hello. Hello";
    const indexes = [
      [13, 34],
      [2, 10],
    ];
    const output = [
      { Hello: "He<span>llo.</span>" },
      {
        "My name is Mikita": "<span>My </span>nam<span>e is Mikita.</span>",
      },
      { Hello: "<span>Hello.</span>" },
      { Hello: "<span>H</span>ello." },
    ];
    expect(JSON.stringify(textParser(text, indexes))).toEqual(
      JSON.stringify(output)
    );
  });
});
