// Functions
function urlToObject(entries) {
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
      .filter(key => typeof entries[key] !== 'undefined')
      .map(key => [key, entries[key]]),
  );
}

function parseSearchParams(search) {
  return Object.fromEntries(Array.from(new URLSearchParams(search).entries()));
}

function urlToHtml(url) {
  const searchParams = parseSearchParams(url.search.slice(1));

  return [
    ['URL Parts', url],
    ['Query String Splitter', searchParams],
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
  output.innerHTML = urlToHtml(urlToObject(new URL(input.value)));
}

// Variables
const input = document.querySelector('#url');
const decode = document.querySelector('#decode');
const output = document.querySelector('#output');

// Events
input.addEventListener('input', renderOutput);
decode.addEventListener('change', renderOutput);
