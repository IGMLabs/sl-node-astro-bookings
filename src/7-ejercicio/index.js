import * as cp from "child_process";
import * as fs from "fs/promises";

const seeds = [0, 1, 2, 3, 5, 7, 11, 13, "wsdfs"];
let child;
const scriptFile = process.argv[1];

seeds.forEach((seed) => {
  child = cp.fork("./src/7.1-child-practice/child.js");
  child.send({ seed });
  child.on("message", (arg) => {
    writeFile(arg.semillas, arg.seedOriginal, arg.err);
    console.log(`Recibido error: ${arg.msg} de ${arg.seed} con error: ${arg.err}`);
  });
});

async function writeFile(semillas, seedOriginal) {
  await fs
    .writeFile(`${scriptFile}.${seedOriginal}.txt`, semillas)
    .then(onWriteEnd)
    .catch((err) => console.log(`${err}`))
    .finally(() => console.log("Finalizado"));
}

function onWriteEnd() {
  console.log(`Resultado OK`);
}
