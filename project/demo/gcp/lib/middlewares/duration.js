const onHeaders = require("on-headers");

const NS_PER_SEC = 1e9;

module.exports = (req, res, next) => {
  const time = process.hrtime();

  onHeaders(res, () => {
    const diff = process.hrtime(time);
    console.log(
      `${req.method} ${req.url} took ${diff[0] * NS_PER_SEC +
        diff[1]} nanoseconds`
    );
  });

  next();
};
