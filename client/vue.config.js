const path = require('path');
module.exports = {
  //outputDir: path.resolve(__dirname, '../server/public'),
  devServer:{
    proxy:{
      '/api':{
        target: 'http://localhost:5000'
      }
    }
  },
  configureWebpack: (config) => {
    config.devtool = 'source-map'
},
runtimeCompiler: true,
  "transpileDependencies": [
    "vuetify"
  ]
}