console.log("child started working");

process.on("message", (arg) => {
  parOImpar(arg.seed);
});

function parOImpar(seed) {
  let seedOriginal = " " + seed;
  let seedTexto = "" + seed;
  let seedOpera = seed;
  const start = process.hrtime();

  try {
    if (!parseInt(seed)) {
      throw new Error("No es un número válido ");
    }
    if (seedOpera <= 0) {
      seedTexto = "error";
    }

    while (seedOpera > 1) {
      if (isEven(seedOpera)) {
        seedOpera = seedOpera / 2;
        seedTexto += " " + seedOpera;
      } else {
        seedOpera = seedOpera * 3 + 1;
        seedTexto += " " + seedOpera;
      }
    }
    const end = process.hrtime();
    const tiempoEjecucion = end[1] - start[1];
    seedTexto += " , Nanosecond Start: " + start[1];
    seedTexto += " , Nanoseconds End: " + end[1];
    seedTexto += " , Total Nanoseconds : " + tiempoEjecucion;

    process.send({ semillas: seedTexto, seedOriginal: seedOriginal });
    process.exit(0);
  } catch (error) {
    console.log(error + ", Error Fatal!");
    process.send({ msg: "Child Error", err: error, seed: seed });
    process.exit(1);
  }
}

function isEven(seed) {
  return seed % 2 == 0;
}
