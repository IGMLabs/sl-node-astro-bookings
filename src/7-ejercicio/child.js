import * as fs from "fs/promises";

console.log("child started working");

let semillas = [];

process.on("seed", (arg) => {
  let seed = arg.seed;
  semillas.push(seed);
  if (seed === 0) {
    process.exit(1);
  }
  while (seed > 1) {
    if (isEven(seed)) {
      seed = seed / 2;
      semillas.push(seed);
    } else {
      seed = seed * 3 + 1;
      semillas.push(seed);
    }
  }
  process.send({ semillas: semillas.toString });
  console.log("Seed 1");
  process.exit(0);
});

function isEven(seed) {
  return seed % 2 == 0;
}
