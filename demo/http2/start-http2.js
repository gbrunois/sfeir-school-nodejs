const http2 = require('http2');
const fs = require('fs');

const imgPath = './horizon-4K.jpg'
const port = 8443

const server = http2.createSecureServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
});
server.on('error', (err) => console.error(err));

server.on('stream', (stream, headers) => {

    function statCheck(stat, headers) {
        headers['last-modified'] = stat.mtime.toUTCString();
    }

    function onError(err) {
        if (err.code === 'ENOENT') {
            stream.respond({ ':status': 404 });
        } else {
            stream.respond({ ':status': 500 });
        }
        console.error(err)
        stream.end();
    }

    stream.respondWithFile(imgPath,
        { 'content-type': 'image/jpg' },
        { statCheck, onError });

});

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
