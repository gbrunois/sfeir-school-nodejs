import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as passport from "passport";
import * as session from "express-session";

const durationMw = require("./middlewares/duration");
const errorMw = require("./middlewares/error");

const schools = require("./routes/schools");
import users from "./routes/users";

const app = express();

const getUserStrategy = require("./auth/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "SFEIR",
    resave: false,
    saveUninitialized: true
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

export default (db: PouchDB.Database) => {
  passport.use(getUserStrategy(db));

  app.use("/schools", schools(db));
  app.use("/users", users(db));

  app.use(errorMw);

  return app;
};
