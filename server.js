const http = require('http');
const fs = require('fs');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const arr = req.url.split('/');

  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Hello from server<h1>');
  } else if (req.url === '/html') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    readFile('./Files/file.html', res);
  } else if (req.url === '/json') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    readFile('./Files/data.json', res);
  } else if (req.url === '/uuid') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    readFile('./Files/uuid.json', res);
  } else if (req.url === '/status/' + arr[2]) {
    res.writeHead(arr[2], { 'Content-Type': 'text/html' });
    res.end(`<h1>Response with status code ${arr[2]}.<h1>`);
  } else if (req.url === '/delay/' + arr[2]) {
    setTimeout(() => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(`<h1>Response after delay of ${arr[2]} sec.<h1>`);
      res.end();
    }, arr[2] * 1000);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h4>404 Not Found<h4>');
  }
});

const readFile = (fileName, res) => {
  fs.readFile(fileName, function (err, data) {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end('<h4>404 Not Found<h4>');
    }
    res.write(data);
    return res.end();
  });
};

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
