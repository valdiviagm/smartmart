describe('My Web Page Test', () => {
  it('successfully loads and checks for the existence of element with ID \'app\'', () => {
      

    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });
    cy.visit('/milk.html');

    cy.get('span[data-automation-id="product-title"]span[data-automation-id="product-title"]')
    .eq(1)
    .should('exist')
    .then(($description) => {
      const description = $description.text();
      cy.log('Product description: ', description);
      expect(description).to.equal('Leche de vaca Granja 3 bolsas de 900 ml c/u');
    });

    cy.readFile('cypress/e2e/logic.js').then((scriptContent) => {
      cy.window().then((win) => {
          
          win.eval(scriptContent);
          
          win.script();
      });
  });

    cy.window().then((win) => {
    
    const targetDocument = win.document;

    let app = targetDocument.querySelector('button#app');
    if (!app) {
      
      app = targetDocument.createElement('button');
      app.id = 'app';
      app.textContent = '';
      
      app.style.opacity = '0';
      app.style.position = 'absolute';
      // app.style.pointerEvents = 'none';

      targetDocument.body.appendChild(app);
    }

    function helloWorld() {
      console.log('Hello, World');
      console.log(document)
    }

    app.onclick = helloWorld;

    });

    cy.get('button#app').click();

    cy.get('[data-label="pricePerUnit"]')
    .eq(1)
    .should('exist')
    .then(($pricePerUnitLabel) => {
      const pricePerUnit = $pricePerUnitLabel.text();
      cy.log('Price per unit: ', pricePerUnit);
      expect(pricePerUnit).to.equal('15.93');
    });

  });
});
