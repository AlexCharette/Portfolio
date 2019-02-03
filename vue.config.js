// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const PrerenderSPAPlugin = require('prerender-spa-plugin');

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/styles/_settings.scss";
               @import "@/assets/styles/_mediaQueries.scss";`
      }
    }
  }
  // configureWebpack: config => {
  //   if (process.env.NODE_ENV === 'development') {
  //     plugins: [
  //       new HtmlWebpackPlugin({
  //         template: './public/index.html',
  //         inject: false
  //       }),
  //       new PrerenderSPAPlugin({
  //         staticDir: path.join(__dirname, 'public'),
  //         routes: ['/', '/about', '/blog']
  //       })
  //     ]
  //   }
  // }
};
