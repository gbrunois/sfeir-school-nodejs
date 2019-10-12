module.exports = (err, req, res, next) => {
  console.error("A wild error appears!", err);

  res.sendStatus(err.statusCode || 500);
};
