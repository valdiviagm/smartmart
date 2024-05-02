describe('My Web Page Test', () => {
  it('successfully loads and checks for the existence of element with ID \'app\'', () => {
      

    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });
    cy.visit('/milk.html');

    cy.get('span[data-automation-id="product-title"]span[data-automation-id="product-title"]').eq(1)
    .should('exist')  // Assert that the element exists
    .then(($description) => {
      const description = $description.text();
      cy.log('Product description: ', description); // Log the text of the price
      expect(description).to.equal('Leche de vaca Granja 3 bolsas de 900 ml c/u'); // Assert the price format, assuming it starts with a dollar sign followed by digits
    });

    //cy.get('button#app').click();
  });
});
