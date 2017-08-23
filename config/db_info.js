module.exports = (function () {
  return {
    local: { // localhost
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '',
      database: ''
    },
    real: { // real server db info
      host: '125.128.8.113',
      port: '3306',
      user: 'citymanage',
      password: 'sjj',
      database: 'citymanage'
    },
    dev: { // dev server db info
      host: '',
      port: '',
      user: '',
      password: '',
      database: ''
    }
  }
})();
