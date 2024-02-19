const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  fs.readFile("./data.json", (err, data) => {
    if (err) {
      res.writeHead(500); 
    //   500-internal server error
      res.end(JSON.stringify({ error: "Internal Server Error" }));
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });//shows that it is a json file being read
    // 200- status code for OK
    res.end(data);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
