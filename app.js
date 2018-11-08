const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));
app.use('/assets', express.static(path.join(__dirname, '/node_modules')));
app.use('/nhsuk-frontend', express.static(path.join(__dirname, '/node_modules/nhsuk-frontend')));

app.listen(8081);