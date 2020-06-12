// https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually
const { createProxyMiddleware } = require('http-proxy-middleware');

const baseUrl = {
  dev: 'http://192.168.0.202',
  prod: ' https://exmiroserver.mirrormedia.cn',
  mock: 'http://localhost:3668'
}.mock

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: baseUrl,
      changeOrigin: true
    })
  );
};
