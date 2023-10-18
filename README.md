# Race condition POC & Chrome Dev Tools Overrides

## 1. Prerequisites

- [install Node.js](https://nodejs.org/ro/download)
- [install Git](https://git-scm.com/downloads)

```bash
# My setup:

$ node --version
v18.16.0

$ npm --version
8.18.0

$ git --version
git version 2.40.1.windows.1
```

## 2. Steps for exploring the web app

- clone repository locally

```bash
git clone https://github.com/danrusu/ks-async-shapes.git
```

- install dependecies

```bash
npm install
```

- start web server

```bash
npm start
```

- start web server in dev mode

```bash
npm run dev
```

- navigate to [http://localhost:1111](http://localhost:1111) end explore the functionality; do you find any bug?

- switch the radio button on the top left are and observe if there is any difference in functionality

**Hint:** `Open Chrome Dev tools (F12), and observe the Network tab (Time and Waterfall columns) while clicking All/Red/Green/Blue buttons.`

## 3. Resources

- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

  - [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)

  - [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)

- [What is new in Dev Tools 117](https://developer.chrome.com/blog/new-in-devtools-117/)

  - [Local overrides - http mocking](https://developer.chrome.com/docs/devtools/overrides/)

- [Encode/Decode URL](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent)

  i.e.

  ```javascript
  const url = 'https://localhost:1111/shapes?color=red';
  const encodedUrl = encodeURIComponent(url); // encodedUrl = 'https%3A%2F%2Flocalhost%3A1111%2Fshapes%3Fcolor%3Dred'
  const decodedUrl = decodeURIComponent(encodedUrl); // decodedUrl = 'https://localhost:1111/shapes?color=red'
  console.assert(url == decodedUrl, 'URL encoding/decoding does not work!');
  ```
