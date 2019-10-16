const { createWriteStream, readFile } = require("fs");
const { join } = require("path");

const dest = join(__dirname, "debug.txt");
const stream = createWriteStream(dest);

stream.on("finish", () => {
  readFile(dest, (error, data) => {
    console.log(String(data));
  });
});

stream.write("Hell");
stream.write("o Worl");
stream.end("d!");
