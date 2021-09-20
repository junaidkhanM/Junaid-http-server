const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const jsonFile = require('./Files/data.json');

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello from server<h1>');
});

app.get('/html', (req, res) => {
  res.sendFile(path.join(__dirname, 'Files/file.html'));
});

app.get('/json', (req, res) => {
  res.json(jsonFile);
});

app.get('/uuid', (req, res) => {
  res.json({ uuid: uuidv4() });
});

app.get('/status/:id', (req, res) => {
  res.status(req.params.id);
  res.send(`<h1>Response with status code ${req.params.id}.<h1>`);
});

app.get('/delay/:id', (req, res) => {
  setTimeout(() => {
    res.send(`<h1>Response after delay of ${req.params.id} sec.<h1>`);
  }, req.params.id * 1000);
});

app.get('*', function (req, res) {
  res.status(404).send('<h4> Error 404 : Page Not Found!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
