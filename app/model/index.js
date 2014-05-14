var fs = require('fs'),
  path = require('path'),
  path = require('path'),
  Lookup = require("json-lookup"),
  db_path = require('../../config/config.json'),
  netra = Lookup(db_path, process.env.NODE_ENV),
  Sequelize = require('sequelize'),
  lodash = require('lodash'),
  db = {};
console.log(netra.database, netra.username, netra.password);
sequelize = new Sequelize(netra.database, netra.username, netra.password, {
  dialect: netra.dialect, // or 'sqlite', 'postgres', 'mariadb'
  port: 3306,
  host: netra.host,

  // disable inserting undefined values as NULL
  // - default: false
  omitNull: true,

  // a flag for using a native library or not.
  // in the case of 'pg' -- set this to true will allow SSL support
  // - default: false
  native: true,

  // similiar for sync: you can define this to always force sync for models
  sync: {
    force: true
  },

  // sync after each association (see below). If set to false, you need to sync manually after setting all associations. Default: true
  syncOnAssociation: true,

  // use pooling in order to reduce db connection overload and to increase speed
  // currently only for mysql and postgresql (since v1.5.0)
  pool: {
    maxConnections: 5,
    maxIdleTime: 30
  },

  // language is used to determine how to translate words into singular or plural form based on the [lingo project](https://github.com/visionmedia/lingo)
  // options are: en [default], es
  language: 'en'
})
sequelize
  .authenticate()
  .complete(function(err) {
    if ( !! err) {
      console.log('Unable to connect to the database:', err)
    } else {
      console.log('Connection has been established successfully.')
    }
  })
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return ((file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) == '.js'))
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].options.hasOwnProperty('associate')) {
    db[modelName].options.associate(db)
  }
})

module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db)