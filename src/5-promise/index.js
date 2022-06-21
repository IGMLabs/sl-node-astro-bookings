import * as fs from "fs/promises";

const scriptFile = process.argv[1];
fs.readFile(scriptFile)
  .then(copyFile)
  .catch((err) => {
    console.log(`Error: ${err} `);
  })
  .finally(() => {
    console.log("Terminado");
  });

//Leer fichero y copiarlo.

function onWriteEnd() {
  console.log("Archivo copiado");
}

function copyFile(fileContent) {
  fs.writeFile(`${scriptFile}.copy.txt`, fileContent)
    .then(onWriteEnd)
    .catch((err) => console.log(`Error ${err}`))
    .finally(() => console.log("acabei"));
}
