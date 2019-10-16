const url = require('url')

const { compute, computeWithWorker } = require('./compute')
const { hello } = require('./hello')

function createRouter(setWorkers) {

    const routesMap = new Map()
    routesMap.set('/hello', hello)
    const computeHandler = setWorkers ? computeWithWorker : compute
    routesMap.set('/compute', computeHandler)

    return function router(req, res) {
        const incUrl = url.parse(req.url)
        let handler = routesMap.get(incUrl.path)
        if (!handler) {
            handler = unknwon
        }
        handler(req, res)
    }

}

function unknwon(req, res) {
    res.writeHead(404)
    res.end("This page does not exist")
}

module.exports.createRouter = createRouter