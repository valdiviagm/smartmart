// setup.js

const targetDocument = window.frameElement ? window.frameElement.contentDocument : document;

if (targetDocument.querySelector('button#app') === null) {

    var button = targetDocument.createElement('button');
    button.id = 'app';
    button.textContent = '';

    button.style.opacity = '0';
    button.style.position = 'absolute';

    // button.style.pointerEvents = 'none';
    
    targetDocument.body.appendChild(button);
}