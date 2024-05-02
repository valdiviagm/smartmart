// setup.js
// window.addEventListener('DOMContentLoaded', function() {
        
        const targetDocument = window.frameElement ? window.frameElement.contentDocument : document;

        if (targetDocument.querySelector('button#app') === null) {
  
            var button = targetDocument.createElement('button');
            button.id = 'app';
            button.textContent = 'TEMP';
    
            /*
            button.style.opacity = '0';  // Make the button fully transparent
            button.style.position = 'absolute';  // Remove the button from the document flow
            button.style.pointerEvents = 'none';  // Disabling pointer events to make it non-clickable through UI
            */

            targetDocument.body.appendChild(button);
        }
      
//});