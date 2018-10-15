'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '" https://www.easy-mock.com/mock/5ba33ae925504a0779f1e0e6/vue-element-admin"',
})
