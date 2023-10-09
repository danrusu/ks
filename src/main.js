const COLORS_MAP = {
  red: 'crimson',
  green: 'rgb(80, 200, 120',
  blue: 'rgb(0, 150, 255)',
};

async function getShapes(color) {
  const searchParams = new URLSearchParams();
  if (color != 'all') {
    searchParams.append('color', color);
  }
  const response = await fetch(`/shapes?${searchParams.toString()}`);
  const shapes = await response.json();
  const htmlShapes = shapes.map(htmlShape).join('\n');

  document.getElementById('shapes').innerHTML = htmlShapes;
  document
    .querySelectorAll('button')
    .forEach(element => element.classList.remove('pressed'));
  document.querySelector(`#${color}-filter`).classList.add('pressed');
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
