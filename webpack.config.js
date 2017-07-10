var path = require('path');

module.exports = [{
    entry: {
        js: "./src/app.js"
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/js')
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    }
}];
