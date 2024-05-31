import fs from "fs";
import http from "http";

const port = 4000;

const server = http.createServer((req, res) => {
  // utf8 makes readfile method prints file as text instead of bytes
  fs.readFile("./planets.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
    res.end(data);
    res.end();
  });
});

server.listen(port, (err) => {
  if (err) console.log("Error", err.message);
  console.log(`Listening on port ${port}`);
});
