const https = require("https");
const port = 3001;
const fs = require("fs");
const helper = require("./helper");

const assets = helper.getFiles("assets");

const options = {
  key: fs.readFileSync("./ssl/key.pem"),
  cert: fs.readFileSync("./ssl/cert.pem")
};

const server = https.createServer(options, function(req, res) {
  console.log(req.url);
  if (req.url === "/") {
    res.end(
      "<html><body>\n" +
        '<link rel="stylesheet" type="text/css"  href="assets/demo.css">\n' +
        "<h1>Hello HTTP2</h1>" +
        '<img src="assets/horizon-4K.jpg">\n' +
        "</body>\n" +
        "<html>"
    );
  } else {
    const asset = assets.get(req.url);
    if (!asset) {
      res.statusCode = 404;
      res.end();
    } else {
        fs.createReadStream(asset.filePath).pipe(res);
    }
  }
});

server.listen(port, err => {
  if (err) {
    return console.log("something bad happened", err);
  }

  console.log(`server is listening on ${port}`);
});
