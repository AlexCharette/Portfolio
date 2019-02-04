const path = require('path')
const PrerenderSpaPlugin = require('prerender-spa-plugin')

const productionPlugins = [
    new PrerenderSpaPlugin({
      staticDir: path.join(__dirname, 'public'),
      routes: ['/', '/about', '/blog']
    }),
];

module.exports = {
    css: {
        loaderOptions: {
            sass: {
            data: `@import "~@/assets/styles/_settings.scss";
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