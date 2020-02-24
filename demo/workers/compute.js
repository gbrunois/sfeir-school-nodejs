const { Worker } = require('worker_threads')
const { generatePrimes } = require('./generate-primes')

const max = 1e7;

function compute(req, res) {
    generatePrimes(2, max)
    res.writeHead(200)
    res.end("Intensive compute done")
    return
}

async function computeWithWorker(req, res) {

    const wp = new Promise((resolve, reject) => {
        const worker = new Worker('./compute-worker.js', {});
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`));
        })
    })

    try {
        const result = await wp
        console.log(result)
        res.writeHead(200)
        res.end("Intensive compute done")
    } catch (err) {
        console.log("Fail to sort")
        console.error(err)
        res.writeHead(500)
        res.end("Intensive compute failed")
    }

}

module.exports = {
    compute,
    computeWithWorker
}