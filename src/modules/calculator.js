import { getDate } from '../main.js';
import { showLoading } from './table.js';

function getParameters() {
  const base = document.querySelector('#convert-from').value;
  const to = document.querySelector('#convert-to').value;
  const amount = document.querySelector('#amount').value;
  const date = getDate();
  if (base.length === 3 && to.length === 3 && amount > 0) {
    return [base, to, amount, date];
  }
}

function calculateExchange(base, to, amount, date) {
  const url = 'https://api.exchangerate.host/convert?';
  fetch(`${url}from=${base}&to=${to}&amount=${amount}&date=${date}`)
    .then((response) => response.json())
    .then((responseJSON) => {
      if (responseJSON.result === null) {
        document.querySelector('#result').textContent = 'There is no data on the selected date';
      } else if (date) { document.querySelector('#result').textContent = `${amount} ${base} on ${date} is equal to ${responseJSON.result} ${to}`; } else if (base && to) { document.querySelector('#result').textContent = `${amount} ${base} is equal to ${responseJSON.result} ${to}`; } else { document.querySelector('#result').textContent = 'You need to have at least the selected currencies'; }
    });
}

export function setCurrencyOptions() {
  fetch('https://api.exchangerate.host/latest')
    .then((response) => response.json())
    .then((responseJSON) => {
      Object.keys(responseJSON.rates).forEach((currency) => {
        const $newFromOption = document.createElement('option');
        $newFromOption.textContent = currency;
        const $newToOption = document.createElement('option');
        $newToOption.textContent = currency;
        document.querySelector('#convert-from').appendChild($newFromOption);
        document.querySelector('#convert-to').appendChild($newToOption);
      });
    });
}

export function setCalculatorCall() {
  const convertButton = document.querySelector('#convert-button');
  convertButton.addEventListener('click', () => {
    if (document.querySelector('#convert-from').value !== 'Select currency' && document.querySelector('#convert-to').value !== 'Select currency') {
      showLoading(document.querySelector('#result'));
      const apiParameters = getParameters();
      calculateExchange(apiParameters[0], apiParameters[1], apiParameters[2], apiParameters[3]);
    }
  });
}
