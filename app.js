const express = require('express');
const app = express();
const path = require('path');
const nunjucks = require('nunjucks');
const routing = require('./routing');

app.set('view engine', 'html');
app.set('port', process.env.PORT || 8081);
app.use('/assets', express.static(path.join(__dirname, '/public/assets')));
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

app.get(/^([^.]+)$/, function (req, res, next) {
  routing.matchRoutes(req, res, next)
})

app.listen(app.get('port'), function() {
    console.log('Listening for changes at http://localhost:' + app.get('port'));
});
