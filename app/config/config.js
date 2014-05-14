var config = {
  development: {
    port: 3002,
    host: '',
  },
  test: {
    port: 3003,
    host: '',
  },
  production: {
    port: 3004,
    host: '',
  }
}
module.exports = config[process.env.NODE_ENV || 'development'];