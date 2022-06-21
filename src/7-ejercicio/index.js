import * as cp from "child_process";
import * as fs from "fs/promises";

const child = cp.fork("./src/7-ejercicio/child.js");

child.send({ seed: 4 });

child.on("close", (code) => console.log("child closed, code: " + code));

child.send({ close: true });

console.log("parent started working");

function writeFile(semillas) {
  fs.writeFile(`${seed}.txt`, semillas)
    .then(onWriteEnd)
    .catch((err) => console.log(`Error ${err}`))
    .finally(() => console.log("acabei"));
}

function onWriteEnd() {
  console.log("Resultado OK");
}
