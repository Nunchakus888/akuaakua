const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://8.209.252.109:30000/',
            changeOrigin: true
        })
    );
};
