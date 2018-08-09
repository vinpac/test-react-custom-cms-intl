const fs = require('fs')
const path = require('path')
const withTypescript = require('@zeit/next-typescript')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

// Utils
const { assign } = Object
const resolve = function() {
  return path.resolve.apply(
    path,
    ['./src'].concat(Array.prototype.slice.call(arguments)),
  )
}

module.exports = withTypescript({
  serverRuntimeConfig: {
    staticDistDirname: `${Math.random()
      .toString(36)
      .substring(7)}-${Date.now()}`,
  },
  publicRuntimeConfig: {
    apiURL: process.env.API_URL || 'http://localhost:8000',
    appURL: process.env.API_URL || 'http://localhost:3000',
  },
  useFileSystemPublicRoutes: false,
  webpack(config, { isServer, dev }) {
    // Do not run type checking twice
    if (isServer) {
      config.plugins.push(
        new ForkTsCheckerWebpackPlugin({
          tsconfig: path.resolve('tsconfig.json'),
        }),
      )
    }

    assign(config, {
      resolve: assign(config.resolve, {
        alias: assign({}, config.resolve.alias, {
          '~/channel': resolve('channel'),
          '~/components': resolve('components'),
          '~/lib': resolve('lib'),
          '~/core': resolve('core'),
          '~/redux': resolve('redux'),
        }),
      }),
    })

    return config
  },
})
