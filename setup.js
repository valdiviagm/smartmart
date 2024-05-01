// setup.js
// window.addEventListener('DOMContentLoaded', function() {
        // Check if the element with ID 'app' already exists
        if (document.querySelector('button#app') === null) {
            // Create a new button element
            var button = document.createElement('button');
            button.id = 'app';  // Setting button ID to "app"
            // button.textContent = '';  // No text content needed
            button.textContent = 'TEMP';  // No text content needed
    
            // Make the button invisible and non-interactive
            // button.style.opacity = '0'; // Make the button fully transparent
            // button.style.position = 'absolute'; // Remove the button from the document flow
            // button.style.pointerEvents = 'none'; // Disabling pointer events to make it non-clickable through UI
    
            // Append the button to the DOM (usually to the body or a specific container)
            document.body.appendChild(button);
    
            
        } 
//});