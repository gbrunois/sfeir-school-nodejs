const { scrypt } = require("crypto");
const express = require("express");
const passport = require("passport");

const { SALT } = process.env;

const doLogin = (req, res) => {
  res.sendStatus(200);
};

const doRegister = db => (req, res, next) => {
  const { username, password } = req.body;

  scrypt(password, SALT, 64, (err, derivedKey) => {
    if (err) {
      console.error("Failed to generate password", err);
      err.statusCode = 500;
      return next(err);
    }
    const userRef = db.collection("users").doc();
    userRef
      .set({
        username,
        password: derivedKey.toString("hex")
      })
      .then(() => {
        res.sendStatus(201);
      })
      .catch(err => {
        console.error("Failed to save user", err);
        err.statusCode = 500;
        next(err);
      });
  });
};

module.exports = db => {
  const router = express.Router();

  router.post("/login", passport.authenticate("local"), doLogin);
  router.post("/register", doRegister(db));

  return router;
};
