const { createReadStream, createWriteStream } = require("fs");
const { join } = require("path");

const filename_copy = join(__dirname, "sample.copy.txt");
const source = createReadStream("sample.txt");
const dest = createWriteStream(filename_copy);

source.pipe(dest).on("finish", () => console.log("Copie terminée !"));
