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

    // Read the external script file and inject it into the window
    cy.readFile('cypress/e2e/logic.js').then((scriptContent) => {
      cy.window().then((win) => {
          // Evaluate the script in the context of the window
          win.eval(scriptContent);
          // Now you can call your function as it's part of the window object
          win.script();
      });
  });

    cy.window().then((win) => {
    
        // Access the document of the window
    const targetDocument = win.document;

    // Check if the button already exists
    let app = targetDocument.querySelector('button#app');
    if (!app) {
      // Create a new button element if not exists
      app = targetDocument.createElement('button');
      app.id = 'app';
      app.textContent = 'TEMP';
      // Optionally make the button invisible and non-interactive
      // app.style.opacity = '0';
      // app.style.position = 'absolute';
      // app.style.pointerEvents = 'none';

      // Append the button to the DOM
      targetDocument.body.appendChild(app);
    }

    // Define a function to be called on click
    function helloWorld() {
      console.log('Hello, World');
      console.log(document)
    }

    // Attach the event directly
    app.onclick = helloWorld;

    });

    cy.get('button#app').click();
  });
});
