const { scrypt } = require("crypto");

const LocalStrategy = require("passport-local").Strategy;

const { SALT } = process.env;

const findUser = db => (username, password, done) => {
  scrypt(password, SALT, 64, (err, derivedKey) => {
    if (err) {
      console.error("Failed to generate password", err);
      err.statusCode = 401;
      done(err);
    } else {
      let usersRef = db.collection("users");
      let query = usersRef
        .where("username", "==", username)
        .where("password", "==", derivedKey.toString("hex"))
        .get()
        .then(querySnapshot => {
          if (querySnapshot.empty) {
            return done(null, false, { message: "Incorrect username." });
          }
          return done(null, querySnapshot.docs[0]);
        })
        .catch(err => {
          console.log("Error getting documents", err);
          return done(err);
        });
    }
  });
};

module.exports = db => {
  return new LocalStrategy(findUser(db));
};
