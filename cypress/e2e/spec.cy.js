// const { script } = require('../../src/logic');

describe('My Web Page Test', () => {
  it('successfully loads and checks for the proper computation of price per unit of product', () => {
      
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

    
    cy.readFile('src/logic.js').then((scriptContent) => {
      cy.window().then((win) => {
          
          win.eval(scriptContent);
          
          win.script();

          //win.script = script
          //win.script();
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

    //app.onclick =  script;
    // app.click()

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
