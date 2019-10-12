const http = require('http')
const port = 3001
const fs = require('fs')

const imgPath = './horizon-4K.jpg'

const server = http.createServer(function (req, res) {
    fs.createReadStream(imgPath).pipe(res)
})

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})