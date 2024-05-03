// index.js

// import { helloWorld } from './utils.js';
import { script } from './logic.js';

const app = document.querySelector('button#app');
function main() {
    
    // Ensure the element exists
    if (app) {
        // Set up the button click event
        
        app.onclick = script;
        
        // Programmatically click the button
        app.click();
    } else {
        console.error('The element with ID \'app\' was not found.');
    }
}

main();