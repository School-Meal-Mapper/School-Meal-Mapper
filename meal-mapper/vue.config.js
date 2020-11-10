const path = require('path')

if (process.env.VUE_APP_THEME == null) {
  throw new Error('Please provide VUE_APP_THEME environment variable')
}

const themePath = './src/themes/MealsForFamilies/' // Remnant of parent project, hardcoded in as MealsForFamilies instead of switching on ENV theme variable.
const themeContent = require(`${themePath}theme.content.js`) // TODO: evaluate whether this and the above are necessary

const mapEnvVariables = {
  BASE_URL: process.env.BASE_URL,
  GA_ID: process.env.GA_ID,
  FB_ID: process.env.FB_ID,
  VUE_APP_THEME: process.env.VUE_APP_THEME
}

const themeMeta = Object.assign(mapEnvVariables, themeContent)

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' && process.env.VUE_APP_THEME === 'DurhamMeal' ? '/dps' : '/', // TODO what does this do
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].theme = themeMeta
      return args
    })
  },
  configureWebpack: { // TODO: evaluate whether necessary
    resolve: {
      alias: {
        ['districtData.config$']: path.resolve(__dirname, themePath + '/districtData.config.js'),
        ['theme.header$']: path.resolve(__dirname, themePath + '/components/theme.header.vue')
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
       @import "./node_modules/bootstrap/scss/_functions.scss";
       @import "~bootstrap/scss/variables";
       @import "~bootstrap/scss/mixins";
       @import './src/scss/Mixins.scss';
       @import "./src/themes/MealsForFamilies/SCSS/custom.scss"; 
      ` // Hardcoded the above to MealsForFamilies theme
      }
    }
  }
}
