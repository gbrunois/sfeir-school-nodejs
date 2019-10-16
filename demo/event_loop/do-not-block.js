// O(1)
function asyncAvg(n, avgCB) {
  // Save ongoing sum in JS closure.
  var sum = 0;
  function help(i, cb) {
    sum += i;
    if (i == n - 1) {
      cb(sum);
      return;
    }

    // "Asynchronous recursion".
    // Schedule next operation asynchronously.
    setImmediate(help.bind(null, i + 1, cb));
  }

  // Start the helper, with CB to call avgCB.
  help(1, function(sum) {
    var avg = sum / n;
    avgCB(n, avg);
  });
}

let n = 100;

const display = function(n, avg) {
  console.log(`avg of 1-${n}: ${avg}`);
};

const values = [206432, 894378, 4054, 495043, 343, 4553, 47083];
values.forEach(v => asyncAvg(v, display));
