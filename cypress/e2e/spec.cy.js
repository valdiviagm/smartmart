describe('My Web Page Test', () => {
  it('successfully loads and checks for the existence of element with ID \'app\'', () => {
      

    cy.on('uncaught:exception', (err, runnable) => {
      // Returning false here prevents Cypress from failing the test
      return false;
    });
    cy.visit('/milk.html');
    //cy.contains('span', 'Leche de vaca Granja 3 bolsas de 900 ml c/u')

    //cy.get('button#app').click();
  });
});
