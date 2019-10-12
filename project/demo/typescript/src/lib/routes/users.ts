import { scrypt } from "crypto";
import * as express from "express";
import * as passport from "passport";
import * as uuidv1 from "uuid/v1";

const log = require("../logger")();

const { SALT } = process.env;

interface User {
  username: string
  password: string
}

const doLogin = (req, res) => {
  res.sendStatus(200);
};

const doRegister = (db: PouchDB.Database) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { username, password }: User = req.body;

  scrypt(password, SALT, 64, (err, derivedKey) => {
    if (err) {
      log.error({ err }, "Failed to generate password");
      res.status(500);
      return next(err);
    }
    db.put({
      username,
      password: derivedKey.toString("hex"),
      type: "user",
      _id: uuidv1()
    })
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err: Error) => {
        log.error({ err }, "Failed to save user");
        res.status(500);
        next(err);
      });
  });
};

export default (db: PouchDB.Database) => {
  const router = express.Router();

  router.post("/login", passport.authenticate("local"), doLogin);
  router.post("/register", doRegister(db));

  return router;
};
