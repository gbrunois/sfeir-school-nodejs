const { scrypt } = require("crypto");
const express = require("express");
const passport = require("passport");
const uuidv1 = require("uuid/v1");

const log = require("../logger")();

const { SALT } = process.env;

const doLogin = (req, res) => {
  res.sendStatus(200);
};

const doRegister = db => (req, res, next) => {
  const { username, password } = req.body;

  scrypt(password, SALT, 64, (err, derivedKey) => {
    if (err) {
      log.error({ err }, "Failed to generate password");
      err.statusCode = 500;
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
      .catch(err => {
        log.error({ err }, "Failed to save user");
        err.statusCode = 500;
        next(err);
      });
  });
};

module.exports = db => {
  const router = express.Router();

  /**
   * @swagger
   *
   * /users/login:
   *   post:
   *     description: Login to the application
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: username
   *         description: Username to use for login.
   *         in: formData
   *         required: true
   *         type: string
   *       - name: password
   *         description: User's password.
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: login
   */
  router.post("/login", passport.authenticate("local"), doLogin);

  /**
   * @swagger
   *
   * /users/register:
   *   post:
   *     description: Register a new user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: username
   *         description: Username to use for login.
   *         in: formData
   *         required: true
   *         type: string
   *       - name: password
   *         description: User's password.
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: register
   */
  router.post("/register", doRegister(db));

  return router;
};
