const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const passport = require("passport");
const session = require("express-session");

const durationMw = require("./middlewares/duration");
const errorMw = require("./middlewares/error");

const schools = require("./routes/schools");
const users = require("./routes/users");
const PouchSession = require("session-pouchdb-store");

const app = express();

const getUserStrategy = require("./auth/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "SFEIR",
    resave: false,
    saveUninitialized: true,
    store : new PouchSession('http://localhost:5984/sessions')
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());

app.use(durationMw);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((sessionUser, done) => {
  done(null, sessionUser);
});

module.exports = db => {
  passport.use(getUserStrategy(db));

  app.use("/schools", schools(db));
  app.use("/users", users(db));

  app.use(errorMw);

  return app;
};
