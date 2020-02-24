const { parentPort } = require('worker_threads')
const { generatePrimes } = require('./generate-primes')
const max = 1e7;

generatePrimes(2, max)
parentPort.postMessage({ hello: "generatePrimes done!!!" })