const $table = document.querySelector('#table-title');
const $calculator = document.querySelector('#calculator-title');

export function allowSwitchToTable() {
  $table.addEventListener('click', () => {
    $table.classList.remove('no-selected');
    $calculator.classList.add('no-selected');
    document.querySelectorAll('.currency-calculator').forEach((elemento) => {
      elemento.classList.add('oculto');
    });
    document.querySelectorAll('.currency-table').forEach((elemento) => {
      elemento.classList.remove('oculto');
    });
  });
}

export function allowSwitchToCalculator() {
  $calculator.addEventListener('click', () => {
    $table.classList.add('no-selected');
    $calculator.classList.remove('no-selected');
    document.querySelectorAll('.currency-calculator').forEach((elemento) => {
      elemento.classList.remove('oculto');
    });

    document.querySelectorAll('.currency-table').forEach((elemento) => {
      elemento.classList.add('oculto');
    });
  });
}
