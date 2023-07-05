import Swal from 'sweetalert2';
import './style.css';

const button = document.getElementById("button");

async function callApi(cur) {
  return fetch(`https://api.exchangerate.host/latest?base=${cur}`)
    .then((promise) => promise.json())
    .then((data) => data.rates)
    .then((objectCurrency) => {
      const currencyArr = Object.keys(objectCurrency);
      return currencyArr.find((element) => element === cur);
    })
}

function erroMessage(message) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
  });
}

function createTbody(body) {
  const currency = Object.keys(body);
  const values = Object.values(body);
  const containerCurrency = document.getElementById('container-currency');

  for (let i = 0; i <= (currency.length - 1); i += 1) {
    const cellBody = document.createElement('div');
    cellBody.classList.add('container-cur')
    const containerCoin = document.createElement('div');
    containerCoin.classList.add('container-coin');
    const coin = document.createElement('div');
    const currencyName = document.createElement('p');
    const currencyValue = document.createElement('p');
    currencyValue.innerHTML = values[i].toFixed(2);
    currencyName.innerHTML = currency[i];
    containerCoin.appendChild(coin);
    containerCoin.appendChild(currencyName);
    cellBody.appendChild(containerCoin);
    cellBody.appendChild(currencyValue);
    containerCurrency.appendChild(cellBody);
  }
}

function createTheadAndCallTbody(head, body) {
  const currencyTitle = document.getElementById('currency-title');
  currencyTitle.innerHTML = `Valores referentes a 1 ${head}`;

  createTbody(body);
}

function switchOffTd() {
  const currencyTitle = document.getElementById('currency-title');
  const containerCurrency = document.getElementById('container-currency');

  currencyTitle.innerHTML = "";
  containerCurrency.innerHTML = "";
}

button.addEventListener('click', async (e) => {
  e.preventDefault();
  switchOffTd();
  const currency = document.getElementById('currency').value;

  if (!currency)
    return erroMessage("Você precisa passar uma moeda");

  const allCurrencys = await callApi(currency);

  if (!allCurrencys)
    return erroMessage("Moeda não existente!");

  createTheadAndCallTbody(currency, allCurrencys);
});
