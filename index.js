var express = require('express');
var path = require('path');

var index = require('./routes/index')
var partials = require('./views/partials');

var app = express();

// Config
app.engine('html', require('hogan-express'));
app.disable('x-powered-by');
app.set('view engine', 'html');
app.set('layout', 'layout');
app.enable('view cache');
app.set('views', path.join(__dirname, 'views'));
app.set('partials', partials);

// Global Middleware
app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.get('/', index.index);

module.exports = app;
