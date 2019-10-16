//O(n)

function avg(n) {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += i;
  }
  let avg = sum / n;

  console.log(`avg of 1-${n}: ${avg}`);
}

const values = [206432, 894378, 4054, 495043, 343, 4553, 47083];
values.forEach(v => avg(v));
