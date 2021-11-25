const { createProxyMiddleware } = require('http-proxy-middleware');
const { proxyRouter, defaultRouterPath } = require('./config')

module.exports.reverseProxyRouter = createProxyMiddleware({
    target: defaultRouterPath, // target host
    changeOrigin: true,
    router: proxyRouter
})