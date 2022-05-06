// Functions
function urlToObject(url) {
  const keys = [
    'hash',
    'host',
    'hostname',
    'href',
    'origin',
    'password',
    'pathname',
    'port',
    'protocol',
    'search',
    'username',
  ];

  return Object.fromEntries(
    keys
      .filter(key => typeof url[key] !== 'undefined')
      .map(key => [key, url[key]]),
  );
}

function urlToHtml(url) {
  return [
    ['URL Parts', urlToObject(url)],
    ['Query String Splitter', Object.fromEntries(url.searchParams.entries())],
  ]
    .filter(([, obj]) => Object.keys(obj).length > 0)
    .map(
      ([heading, obj]) => `<h2>${heading}</h2>
      <table>
        <tbody>
          ${Object.entries(obj)
            .filter(([, value]) => value !== '')
            .map(
              ([key, value]) =>
                `<tr><td>${key}</td><td>${
                  decode.checked ? decodeURIComponent(value) : value
                }</td></tr>`,
            )
            .join('')}
        </tbody>
      </table>`,
    )
    .join('');
}

function renderOutput() {
  output.innerHTML = urlToHtml(new URL(input.value));
}

// Variables
const input = document.querySelector('#url');
const decode = document.querySelector('#decode');
const output = document.querySelector('#output');

// Events
input.addEventListener('input', renderOutput);
decode.addEventListener('change', renderOutput);
