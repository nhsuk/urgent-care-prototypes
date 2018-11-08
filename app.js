const express = require('express');
const app = express();
const path = require('path');
const nunjucks = require('nunjucks');

app.use('/assets', express.static(path.join(__dirname, '/node_modules')));
app.use('/nhsuk-frontend', express.static(path.join(__dirname, '/node_modules/nhsuk-frontend/packages')));

var appViews = [
    path.join(__dirname, '/node_modules/nhsuk-frontend/packages/'),
    path.join(__dirname, '/public/')
  ]

nunjucks.configure(appViews, {
    autoescape: true,
    express: app,
    noCache: true,
    watch: true
})

app.get('/', function(req, res) {
    res.render('index.html');
});

app.listen(8081);