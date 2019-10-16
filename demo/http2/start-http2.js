const http2 = require("http2");
const fs = require("fs");
const path = require("path");
const helper = require("./helper");

const {
  HTTP2_HEADER_PATH,
  HTTP2_HEADER_METHOD,
  HTTP_STATUS_NOT_FOUND,
  NGHTTP2_REFUSED_STREAM,
  HTTP_STATUS_INTERNAL_SERVER_ERROR
} = http2.constants;

const port = 8443;

const assets = helper.getFiles("assets");

const serverRoot = "./";
const pushAsset = (stream, file) => {
  const filePath = path.resolve(path.join(serverRoot, file.filePath));

  stream.pushStream(
    { [HTTP2_HEADER_PATH]: file.path },
    { parent: stream.id },
    (err, pushStream) => {
      if (err) {
        console.log(">> Pushing error:", err);
        return;
      }

      console.log(">> Pushing:", file.path);

      pushStream.on("error", err =>
        respondToStreamError(err, pushStream, file)
      );
      pushStream.respondWithFile(filePath, file.headers, { statCheck });
    }
  );
};

function respondToStreamError(err, stream, file = {}) {
  console.log("respondToStreamError: ", file.path + "\n" || "", err);

  const isRefusedStream =
    err.code === "ERR_HTTP2_STREAM_ERROR" &&
    stream.rstCode === NGHTTP2_REFUSED_STREAM;

  if (isRefusedStream || stream.closed) {
    return;
  }

  if (err.code === "ENOENT") {
    stream.respond({ ":status": HTTP_STATUS_NOT_FOUND });
  } else {
    stream.respond({ ":status": HTTP_STATUS_INTERNAL_SERVER_ERROR });
  }

  stream.end();
}

function statCheck(stat, headers) {
  headers["last-modified"] = stat.mtime.toUTCString();
}

const server = http2.createSecureServer({
  key: fs.readFileSync("./ssl/key.pem"),
  cert: fs.readFileSync("./ssl/cert.pem")
});
server.on("error", error => console.error(error));

server.on('timeout', error => {
    console.log('On server timeout:', error);
});

server.on("stream", (stream, headers) => {
  const fullPath = headers[HTTP2_HEADER_PATH];
  const method = headers[HTTP2_HEADER_METHOD];

  console.log(">> Path:", fullPath);
  console.log(">> Method:", method);
  if (fullPath === "/") {
    stream.respond({
      "content-type": "text/html",
      ":status": 200
    });

    assets.forEach(file => {
      pushAsset(stream, file);
    });

    stream.end(
      "<html><body>\n" +
        '<link rel="stylesheet" type="text/css"  href="assets/demo.css">\n' +
        "<h1>Hello HTTP2</h1>" +
        '<img src="assets/horizon-4K.jpg">\n' +
        "</body>\n" +
        "<html>"
    );
  }
});

server.listen(port, err => {
  if (err) {
    return console.log("something bad happened", err);
  }

  console.log(`server is listening on ${port}`);
});
