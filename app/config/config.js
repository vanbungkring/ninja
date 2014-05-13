var config = {
  development: {
    port: 3000,
    host: '',
  },
  test: {
    port: 3000,
    host: '',
  },
  production: {
    port: 3001,
    host: '',
  }
}
module.exports = config[process.env.NODE_ENV || 'development'];