import add from "./math";

const myName = "Wai";

{
  const myName = "Inner Scope Wai";
  const output = `My name is ${myName}`;
  console.log(output);
}

add(1, 2);
