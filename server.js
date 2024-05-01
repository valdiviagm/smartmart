const express = require('express');
const path = require('path');
const app = express();

const PORT = 8080;
const directoryToServe = 'cache';
const serveFrom = path.join(__dirname, directoryToServe);

app.use(express.static(serveFrom));

app.listen(PORT, () => {
    console.log(`Serving files from ${serveFrom} on http://localhost:${PORT}`);
});
