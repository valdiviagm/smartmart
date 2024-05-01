const { defineConfig } = require('cypress');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium' && browser.name === 'chrome') {
          const extensionPath = path.resolve('/Users/valdiviagm/Documents/programming/chrome-extensions/smartmart');
          launchOptions.args.push(`--load-extension=${extensionPath}`);
        }
        return launchOptions;
      });

      return config;
    },

    baseUrl: 'http://localhost:8080',  // Adjust according to your application's URL
    browser: 'chrome',
    chromeWebSecurity: false,
  }
});
