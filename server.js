
var port = process.env.PORT || 1337;
var argo = require('argo');



argo()
  .get('^/dogs$', function(handle) {
    handle('request', function(env, next) {
      env.response.statusCode = 200;
      env.response.body = 'hello';
      next(env);
    });
  }).listen(port);