function hello(req, res) {
    res.writeHead(200)
    res.end("Hello world!")
}

module.exports = {
    hello
}