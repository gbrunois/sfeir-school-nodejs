import * as PouchDB from "pouchdb";
PouchDB.plugin(require("pouchdb-find"));

import app from "./lib/app";
const log = require("./lib/logger")();

const {
  INITDB_DATABASE = "schoolsdb",
  DATABASE_HOST = "localhost",
  DATABASE_PORT = 5984,
  PORT = 3000
} = process.env;

const url = `http://${DATABASE_HOST}:${DATABASE_PORT}/${INITDB_DATABASE}`;

process.on("uncaughtException", err => {
  log.error({ err }, "Got an uncaught exception");
  process.exit(1);
});

process.on("unhandledRejection", err => {
  log.error({ err }, "Got an unhandled rejection");
  process.exit(1);
});

const connect = () => {
  const db = new PouchDB(url);
  db.info()
    .then(info => log.info(info))
    .catch(err => {
      log.error({ err }, "Error while connecting to DB");
    })
    .then(() => {
      clearInterval(interval);
      clearTimeout(timeout);
      app(db).listen(PORT, () => log.info(`App listening on port ${PORT}!`));
    });
};

const interval = setInterval(connect, 3000);

const timeout = setTimeout(() => {
  clearInterval(interval);

  log.error("Failed to connect to database!");

  process.exit(1);
}, 10000);
