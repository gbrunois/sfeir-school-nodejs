const Firestore = require("@google-cloud/firestore");

const app = require("./lib/app");

const { PORT = 3000 } = process.env;

process.on("uncaughtException", err => {
  console.error("Got an uncaught exception", err);
  process.exit(1);
});

process.on("unhandledRejection", err => {
  console.error("Got an unhandled rejection", err);
  process.exit(1);
});
const settings = {};
if (process.env.NODE_ENV !== "production") {
  // Pour tester en local
  settings.keyFilename = "secret/key.json";
}

const db = new Firestore(settings);

app(db).listen(PORT, () => console.log(`App listening on port ${PORT}!`));
