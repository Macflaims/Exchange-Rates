const $URL = 'http://127.0.0.1:5500/index.html';

describe('Test exchange', () => {
  before(() => {
    cy.visit($URL);
  });

  it('tests for non-conversion due to lack of information', () => {
    cy.get('#amount').type('0');
    cy.get('#convert-from').select('EUR');
    cy.get('#convert-to').select('USD');
    cy.get('#result').should('have.value', '');
  });

  it('test the correct currency calculator conversion', () => {
    cy.visit($URL);
    cy.get('#amount').type('0');
    cy.get('#convert-from').select('EUR');
    cy.get('#convert-to').select('USD');
    cy.get('#date').type('2022-12-13');
    cy.get('#convert-button').click();
    cy.get('#result').should('not.equal', '');
  });
});

describe('Test Table', () => {
  before(() => {
    cy.visit($URL);
  });

  it('check the display table', () => {
    cy.get('#table-title').click();
    const $table = document.querySelector('#currency-table');
    cy.get('#convert-from').select('ARS');
    cy.get('#convert-from').should('not.deep.equal', $table);
    const $newTable = document.querySelector('#currency-table');
    cy.get('#date').type('2020-12-13');
    cy.get('#convert-from').select('EUR');
    cy.get('#convert-from').should('not.deep.equal', $newTable);
  });
});
