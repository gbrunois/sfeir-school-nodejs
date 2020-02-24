const http = require('http')
const port = 3001

const { createRouter } = require('./router')

const router = createRouter()

const server = http.createServer(router)

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})
