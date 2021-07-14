const { override, addWebpackAlias, useBabelRc } = require('customize-cra');
const path = require('path');
const paths = require('react-scripts/config/paths');

function resolve(dir) {
    return path.join(__dirname, '.', dir);
}
const rootUrl = 'outcall_web';
const { name } = require('./package');
paths.appBuild = path.join(path.dirname(paths.appBuild), `build/${rootUrl}`);
const addCustomize = () => config => {
    if (process.env.NODE_ENV === 'production') {
        config.devtool = false; //去掉map文件
    }
    if (process.env.NODE_ENV === 'development') {
        config.output.chunkFilename = 'static/js/[name].[contenthash:8].chunk.js'; // 清缓存
    }
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = 'umd';
    config.output.jsonpFunction = `webpackJsonp_${name}`;
    config.output.globalObject = 'window';
    return config;
};

module.exports = {
    webpack: override(
        addWebpackAlias({
            '@': resolve('src'),
            react: path.resolve('./node_modules/react')
        }),
        useBabelRc(),
        addCustomize(),
    ),
    devServer: (configFunction) => {
        return function (proxy, allowedHost) {
            const config = configFunction(proxy, allowedHost);
            config.open = false;
            config.hot = false;
            config.headers = {
                'Access-Control-Allow-Origin': '*',
            }
            return config;
        }
    }
}
