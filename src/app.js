const express = require('express');
const { readFile } = require('fs/promises');
const app = express();

const path = require('path');

const serve = relativePath => (_req, res) =>
  res.sendFile(path.join(`${__dirname}/${relativePath}`));

// routes
app
  .get('/', serve('index.html'))
  .get('/main', serve('main.js'))
  .get('/styles', serve('styles.css'))
  .get('/shapes', getShapes);

const port = process.env.PORT || 1111;
app.listen(port, () =>
  console.log(`Server listening on: http://localhost:${port}`),
);

async function getShapes(req, res) {
  const shapes = JSON.parse(
    (await readFile('data/shapes.json')).toString('utf-8'),
  );
  const color = req.query?.color;
  if (color == undefined) {
    res.send(shapes);
  }
}
