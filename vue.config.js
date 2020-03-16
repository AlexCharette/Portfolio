<<<<<<< HEAD
const path = require('path')
const PrerenderSpaPlugin = require('prerender-spa-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default

const productionPlugins = [
    new PrerenderSpaPlugin({
      staticDir: path.join(__dirname, 'public'),
      routes: ['/', '/about', '/gallery']
    }),
    new ImageminPlugin({
        pngquant: {
            quality: '90-95'
        }
    })
];

module.exports = {
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "~@/assets/styles/_base.scss";`
            }
        }
    },
    lintOnSave: false,
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            config.plugins.push(...productionPlugins);
        }
    },
=======
const path = require('path')
const PrerenderSpaPlugin = require('prerender-spa-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default

const productionPlugins = [
    new PrerenderSpaPlugin({
      staticDir: path.join(__dirname, 'public'),
      routes: ['/', '/about', '/gallery']
    }),
    new ImageminPlugin({
        pngquant: {
            quality: '90-95'
        }
    })
];

module.exports = {
    css: {
        loaderOptions: {
            sass: {
            data: `@import "~@/assets/styles/_variables.scss";
                   @import "~@/assets/styles/_mediaQueries.scss";`
            }
        }
    },
    lintOnSave: false,
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            config.plugins.push(...productionPlugins);
        }
    },
>>>>>>> 37d16293c0a0af7383dd9aa7fef12f8653a8ee8c
};