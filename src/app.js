const express = require('express');
const { readFile } = require('fs/promises');
const app = express();

const path = require('path');

const serve = relativePath => (_req, res) =>
  res.sendFile(path.join(`${__dirname}/${relativePath}`));

app.use(express.static(__dirname + '/public'));

// routes
app
  .get('/', serve('index.html'))
  .get('/main', serve('main.js'))
  .get('/styles', serve('styles.css'))
  .get('/shapes', shapesHandler);

const port = process.env.PORT || 1111;
app.listen(port, () =>
  console.log(`Server listening on: http://localhost:${port}`),
);

async function shapesHandler(req, res) {
  const color = req.query?.color;
  await wait(color == undefined ? 2000 : 500); // longer respons time when sending all shapes
  const shapes = JSON.parse(
    (await readFile('data/shapes.json')).toString('utf-8'),
  );
  if (color) {
    res.send(shapes.filter(shape => shape.color == color));
  } else {
    res.send(shapes);
  }
}

async function wait(timeoutInMillis) {
  return new Promise(res => {
    setTimeout(res, timeoutInMillis);
  });
}
