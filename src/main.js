const COLORS_MAP = {
  red: 'crimson',
  green: 'rgb(80, 200, 120)',
  blue: 'rgb(0, 150, 255)',
};

const HANDLERS = {
  withCancel: getShapesWithCancel,
  withoutCancel: getShapesWithoutCancel,
};

async function getShapes(color) {
  const handler = [...document.querySelectorAll('[name=handler]')].find(
    el => el.checked,
  ).id;
  HANDLERS[handler](color);
}

async function getShapesWithoutCancel(color) {
  log(`start getShapes(${color})`);

  updatePressedButton(color);
  displayLoading();

  const response = await fetch(getShapesUrl(color));
  const shapes = await response.json();
  const htmlShapes = shapes.map(toHtmlShape).join('\n');

  setShapesContent(htmlShapes);

  log(`finished getShapes(${color})`);
}

let abortController;
const log = console.log;

async function getShapesWithCancel(color) {
  log(`start getShapes(${color})`);
  const requestOptions = {};
  if (!abortController) {
    log(`new abort controler for getShapes(${color})`);
    abortController = new AbortController();
    requestOptions.signal = abortController.signal;
    abortController.source = color;
  } else {
    log(`abort for getShapes(${abortController.source})`);
    abortController.abort();
  }
  updatePressedButton(color);

  displayLoading();

  let shapes;
  try {
    const response = await fetch(getShapesUrl(color), requestOptions);
    shapes = await response.json();
  } catch (error) {
    if (error instanceof DOMException) {
      log(error);
    } else {
      throw error;
    }
  }
  if (shapes) {
    const htmlShapes = shapes.map(toHtmlShape).join('\n');
    setShapesContent(htmlShapes);
    abortController = undefined;
    log(`finished getShapes(${color})`);
  }
}

function updatePressedButton(color) {
  document
    .querySelectorAll('button')
    .forEach(element => element.classList.remove('pressed'));
  document.querySelector(`#${color}-filter`).classList.add('pressed');
}

function displayLoading() {
  setShapesContent(
    '<img class="loading" src="images/loading.gif" alt="...loading" />',
  );
}

function setShapesContent(innerHTML) {
  document.getElementById('shapes').innerHTML = innerHTML;
}

function getShapesUrl(color) {
  const searchParams = new URLSearchParams();
  if (color != 'all') {
    searchParams.append('color', color);
  }
  return `/shapes?${searchParams.toString()}`;
}

function toHtmlShape(shape) {
  const color = isTriangle(shape) ? '' : shape.color;
  const style = isTriangle(shape)
    ? `style="border-bottom-color: ${COLORS_MAP[shape.color]}"`
    : '';
  return `<span ${style} class="shape  ${shape.type} ${color}"></span>`;
}

function isTriangle(shape) {
  return shape.type == 'triangle';
}

function displayQuote(quoteIndex) {
  document.querySelectorAll('q[id^=quote]').forEach(el => {
    el.style.display = 'none';
  });
  document.getElementById(`quote${quoteIndex}`).style.display = 'block';
}

function setGetShapesHandler() {
  if (localStorage.handler) {
    document.getElementById(localStorage.handler).checked = true;
    return;
  }
  document.getElementById('withoutCancel').checked = true;
}

function saveHandler(handlerId) {
  localStorage.handler = handlerId;
}
