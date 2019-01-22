const htmlWebpackPlugin = require('html-webpack-plugin');

const htmlWebpackPluginOptions = {
    template: 'src/index.html'
};
const plugins = [
    new htmlWebpackPlugin(htmlWebpackPluginOptions)
];

module.exports = { 
    plugins 
};