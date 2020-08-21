// eslint-disable-next-line import/no-commonjs
const path = require('path')

const webpackConfig = {
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json'],
    alias: {
      '_/': path.resolve(__dirname, '..', 'src')
    }
  }
}

module.exports = webpackConfig
