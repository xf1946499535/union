
const scssVariables = require('./src/styles/element-variables.scss.js')

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],

  css: {
    loaderOptions: {
      sass: {
        // prependData: '@import "@/styles/variables.scss";'
        prependData: Object.keys(scssVariables)
          .map((k) => `$${k}: ${scssVariables[k]};`)
          .join('\n')
      }
    }
  }

}
