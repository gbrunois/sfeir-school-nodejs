const { createReadStream } = require("fs");

createReadStream(__filename, { highWaterMark: 100 })
  .on("end", () => console.log("Lecture terminée"))
  .on("data", data => {
    console.log("%d octets reçus", data.length);
  });
