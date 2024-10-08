'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASEURL: "'/'",
  // WS_BASEURL: "'/server_85/WEBSOCKET'",
  // WS_SERVER: "'localhost:9009'",
  // WS_SERVER: "'localhost:8803'",
  
  BASE_API: '"http://localhost:8803"',
})
