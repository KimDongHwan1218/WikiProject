const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
    '/api', 
    createProxyMiddleware({  //도메인 api로 호출
      target: 'http://localhost:4000', //통신할 서버의 도메인주소
      changeOrigin: true,
    })
  )
}

// const proxy = require('http-proxy-middleware');

// module.exports = (app) => {
//   app.use(
//     proxy('/api', {  //도메인 api로 호출
//       target: 'http://localhost:4000/', //통신할 서버의 도메인주소
//       changeOrigin: true,
//     })
//   )
// }