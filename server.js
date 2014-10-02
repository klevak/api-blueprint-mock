
var port = process.env.PORT || 1337;
var argo = require('argo');



argo()
  .post('^/eda$', function(handle) {
    handle('request', function(env, next) { 
      env.response.statusCode = 200;
      env.response.body = '<NS1:Envelope xmlns:NS1="http://schemas.xmlsoap.org/soap/envelope/"><NS1:Header></NS1:Header><NS1:Body><NS2:publishMarketingEventResponse xmlns:NS2="http://services.llbean.com/marketing/event/publication/v1_0"><NS2:responseSummary><NS2:requestReceivedTimestamp>2014-10-02T12:34:48.055</NS2:requestReceivedTimestamp><NS2:processingCompleteTimestamp>2014-10-02T13:34:48.524305</NS2:processingCompleteTimestamp><NS2:processingTimeMilliseconds>3600469.305000</NS2:processingTimeMilliseconds><NS2:requestorAuditId>123456</NS2:requestorAuditId><NS2:serviceAuditId>170266</NS2:serviceAuditId><NS2:unitOfWorkId>0</NS2:unitOfWorkId><NS2:responseCode>SUCCESS</NS2:responseCode><NS2:responseDetailList><NS2:responseDetail>Event Message Accepted Successfully</NS2:responseDetail></NS2:responseDetailList><NS2:registryConsumerId>0</NS2:registryConsumerId><NS2:registryContextId>0</NS2:registryContextId><NS2:originatingRequestor>APIGE</NS2:originatingRequestor><NS2:originatingUserName>APIGE</NS2:originatingUserName><NS2:originatingTimestamp>2014-10-02T12:34:48.055</NS2:originatingTimestamp></NS2:responseSummary><NS2:eventGUID>684b7614-4a5a-11e4-a79b-0a74f50a0000</NS2:eventGUID></NS2:publishMarketingEventResponse></NS1:Body></NS1:Envelope>';
      next(env);
    });
  }).listen(port);
