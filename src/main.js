async function getShapes() {
  const response = await fetch('/shapes');
  const shapes = await response.json();
  const htmlShapes = shapes.map(shape => htmlShape(shape)).join('\n');

  document.getElementById('shapes').innerHTML = htmlShapes;
}

function htmlShape(shape) {
  const color = isTriangle(shape) ? '' : shape.color;
  const style = isTriangle(shape)
    ? `style="border-bottom-color: ${shape.color}"`
    : '';
  return `<span ${style} class="shape  ${shape.type} ${color}"></span>`;
}

function isTriangle(shape) {
  return shape.type == 'triangle';
}
