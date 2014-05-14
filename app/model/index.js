var fs = require('fs'),
  path = require('path'),
  path = require('path'),
  Lookup = require("json-lookup"),
  db_path = require('../../config/config.json'),
  netra = Lookup(db_path, process.env.NODE_ENV),
  Sequelize = require('sequelize'),
  lodash = require('lodash'),
  db = {};
sequelize = new Sequelize(netra.database, netra.username, netra.password, {
  dialect: netra.dialect, // or 'sqlite', 'postgres', 'mariadb'
  port: 3306, // or 5432 (for postgres)
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
console.log(netra.host);
console.log();
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