const path = require('path')

module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    rules: [
      {
        loader: require.resolve('awesome-typescript-loader'),
        options: {
          silent: true,
          useBabel: true,
        },
      },
      { loader: require.resolve('react-docgen-typescript-loader') },
    ],
  })
  config.resolve.extensions.push('.ts', '.tsx')
  return config
}
