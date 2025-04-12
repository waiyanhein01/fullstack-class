import http from "http";

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" }),
      res.write("Hello World!"),
      res.end();
  }

  if (url === "/users") {
    res.setHeader("Content-Type","text/html" ),
    res.statusCode = 200,
      res.write("Hello Users!"),
      res.end();
  }
});

server.listen(8080);
