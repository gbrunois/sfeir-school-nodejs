const { parentPort } = require('worker_threads')
const { sort } = require('./compute-service')

sort()
parentPort.postMessage({ hello: "sort done!!!" })