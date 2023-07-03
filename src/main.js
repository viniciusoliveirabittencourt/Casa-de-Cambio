const button = document.getElementById("button");

async function callApi(cur) {
  return fetch(`https://api.exchangerate.host/latest?base=${cur}`)
    .then((promise) => promise.json())
    .then((data) => data.rates)
}

function createTbody(body) {
  const currency = Object.keys(body);
  const values = Object.values(body);
  const tbody = document.getElementById('tbody');

  for (let i = 0; i <= currency.length; i += 1) {
    const cellBody = document.createElement('td');
    cellBody.innerHTML = `💰${currency[i]}: ${values[i]}`;
    tbody.appendChild(cellBody);
  }
}

function createTheadAndCallTbody(head, body) {
  const thead = document.getElementById('thead');
  const header = document.createElement('td');
  header.innerHTML = `Valores referentes a 1 ${head}`;
  thead.appendChild(header);

  createTbody(body);
}

function switchOffTd() {
  const thead = document.getElementById('thead');
  const tbody = document.getElementById('tbody');

  thead.innerHTML = "";
  tbody.innerHTML = "";
}

button.addEventListener('click', async (e) => {
  e.preventDefault();
  const currency = document.getElementById('currency').value;
  switchOffTd();

  const allCurrencys = await callApi(currency);
  createTheadAndCallTbody(currency, allCurrencys);
});
