const express = require("express");

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    const err = new Error("Not authenticated");
    err.statusCode = 401;
    next(err);
  }
}

const doGet = db => (req, res, next) => {
  db.collection("schools")
    .get()
    .then(snapshot => {
      const schools = [];
      snapshot.forEach(function(childSnapshot) {
        schools.push({
          ...childSnapshot.data(),
          id: childSnapshot.id
        });
      });
      console.log("Found schools", schools);
      res.send(schools);
    })
    .catch(err => {
      console.error("Failed to find schools", err);
      err.statusCode = 500;
      next(err);
    });
};

const doPost = db => (req, res, next) => {
  const school = req.body;
  db.collection("schools")
    .doc()

    .set(school)
    .then(() => {
      console.log("Save successful", school);
      res.sendStatus(201);
    })
    .catch(err => {
      console.error("Failed to insert school", school, err);
      err.statusCode = 500;
      next(err);
    });
};

module.exports = db => {
  const router = express.Router();

  router.get("/", doGet(db));
  router.post("/", ensureAuthenticated, doPost(db));

  return router;
};
