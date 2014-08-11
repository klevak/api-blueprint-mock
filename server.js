
var port = process.env.PORT || 1337;
var argo = require('argo');



argo()
  .post('^/eda$', function(handle) {
    handle('request', function(env, next) { 
      env.response.statusCode = 200;
      env.response.body = '<xml></xml>';
      next(env);
    });
  }).listen(port);