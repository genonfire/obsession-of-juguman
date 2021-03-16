module.exports = {
  outputDir: 'docs',

  publicPath: process.env.NODE_ENV === 'production'
    ? '/obsession-of-juguman/'
    : '/',

  transpileDependencies: [
    'vuetify'
  ]
}
