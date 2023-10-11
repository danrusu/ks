const COLORS_MAP = {
  red: 'crimson',
  green: 'rgb(80, 200, 120',
  blue: 'rgb(0, 150, 255)',
};

let abortController, signal;
async function getShapes(color) {
  if (!abortController) {
    abortController = new AbortController();
    signal = abortController.signal;
  } else {
    abortController.abort();
  }
  updatePressedButton(color);

  setShapesContent(
    '<img class="loading" src="images/loading.gif" alt="...loading" />',
  );

  const searchParams = new URLSearchParams();
  if (color != 'all') {
    searchParams.append('color', color);
  }

  const response = await fetch(`/shapes?${searchParams.toString()}`);
  const shapes = await response.json();
  const htmlShapes = shapes.map(htmlShape).join('\n');

  setShapesContent(htmlShapes);
  abortController = undefined;
}

async function getShapesOnce(color) {
  updatePressedButton(color);

  setShapesContent(
    '<img class="loading" src="images/loading.gif" alt="...loading" />',
  );

  const searchParams = new URLSearchParams();
  if (color != 'all') {
    searchParams.append('color', color);
  }

  const response = await fetch(`/shapes?${searchParams.toString()}`, {
    signal,
  });
  const shapes = await response.json();
  const htmlShapes = shapes.map(htmlShape).join('\n');

  setShapesContent(htmlShapes);
}

function updatePressedButton(color) {
  document
    .querySelectorAll('button')
    .forEach(element => element.classList.remove('pressed'));
  document.querySelector(`#${color}-filter`).classList.add('pressed');
}
function setShapesContent(innerHTML) {
  document.getElementById('shapes').innerHTML = innerHTML;
}

function htmlShape(shape) {
  const color = isTriangle(shape) ? '' : shape.color;
  const style = isTriangle(shape)
    ? `style="border-bottom-color: ${COLORS_MAP[shape.color]}"`
    : '';
  return `<span ${style} class="shape  ${shape.type} ${color}"></span>`;
}

function isTriangle(shape) {
  return shape.type == 'triangle';
}

function displayQuote() {
  document.getElementById('quote').style.display = 'block';
}
