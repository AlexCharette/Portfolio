const path = require('path')
const PrerenderSpaPlugin = require('prerender-spa-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default

const productionPlugins = [
    new PrerenderSpaPlugin({
      staticDir: path.join(__dirname, 'public'),
      routes: ['/', '/about', '/gallery', '/blog']
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
};