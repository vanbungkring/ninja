var path = require('path'),
  favicon = require('static-favicon'),
  logger = require('morgan'),
  db = require('../model'),
  config = require('./config.js'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  routes = require('../routes/index');
module.exports = function(app, express) {
  var expressc = this;
  // view engine setup
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'ejs');

  app.use(favicon());
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../public')));

  app.enable('trust proxy')
  app.disable('x-powered-by')

  app.use(routes);
  app.use(require('asset-pipeline')({
    // reference to a server itself (used in views rendering)
    server: app,
    // directory with your stylesheets or client-side scripts
    assets: '../public',
    // directory for cache
    cache: '../cache',
  }))

  /// catch 404 and forwarding to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  /// error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

  db.sequelize
    .sync({
      force: true
    })
    .complete(function(err) {
      if (err) {
        throw err
      } else {
        console.log('Express server listening on port ' + app.get('port'))
      }
    })

  return expressc;
}