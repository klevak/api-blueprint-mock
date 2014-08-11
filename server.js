
var port = process.env.PORT || 1337;
var argo = require('argo');



argo()
  .post('^/dogs$', function(handle) {
    handle('request', function(env, next) { 
      env.response.statusCode = 200;
      env.response.body = '<xml></xml>';
      env.response.header('Content-Type','text/xml');
      next(env);
    });
  }).listen(port);