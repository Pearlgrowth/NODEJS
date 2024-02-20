
// You can either use method one or two.
// METHOD ONE:
const fs = require('fs');
const path = require('path');
const fsPromise = require('fs').promises
 const file = (path.join(__dirname, "files", "data.txt"));
//  const writeStream = fs.createWriteStream('output.txt');
const readLineByLine = async () => {
  try {
    const data = await fsPromise.readFile(file, { encoding: "utf8" })
    console.log(data)
//     const readStream = fs.ReadStream(file, { encoding: "utf8" })
// //    readStream.pipe(writeStream)
// readStream.on('data', (dataChunk)=>{
//     writeStream.write(dataChunk)
// })
  } catch (err) {
    console.error(err);
  }
};
readLineByLine();


// METHOD TWO:
const readline = require('readline');
const fs = require('fs');
const readInterface = readline.createInterface({
    input: fs.createReadStream('data.txt'),
    output: process.stdout,
    console: false
});
readInterface.on('line', function(line) {
    console.log(line);
});