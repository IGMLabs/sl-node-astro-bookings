console.log("child started working");

process.send({ msg: "I am a child working" });

process.on("message", (arg) => {
  if (arg.msg) {
    console.log(`Receive from parent ${arg.msg}`);
  }
  if (arg.close) {
    console.log("Parent make me close");
    process.exit();
  }
});
