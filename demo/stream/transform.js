const {createReadStream} = require('fs');
const {createGzip} = require('zlib');

createReadStream(__filename)
  .pipe(createGzip())         
  .pipe(process.stdout);

  // node transform | gzip -d | cat