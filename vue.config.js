// var path = require('path');
// var MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

    // отключение хэшей в именах файлов
    // filenameHashing: false,

    // devServer: {
    //     proxy: {
    //         "/api/*": {
    //             target: "http://localhost:3000",
    //             secure: false
    //         }
    //     }
    // },

    configureWebpack: {
        module: {
            rules: [

            ]
        },
        plugins: [
            // ... плагин Vue Loader опущен
            // new MiniCssExtractPlugin({
            //     filename: 'app.css'
            // })
        ]
    },

    chainWebpack: config => {
        // uncomment on PRODUCTION
        config.plugin('copy').tap(([options])=> {
            options[0].ignore.push('**/sass/**');
            return [options]
        });

        // удаление плагинов webpack связанных с HTML
        //    config.plugins.delete('html')
        //    config.plugins.delete('preload')
        //    config.plugins.delete('prefetch')
    },


};