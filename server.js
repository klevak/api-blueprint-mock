
var port = process.env.PORT || 1337;
var argo = require('argo');

var xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Body>
      <publishMarketingEventResponse xmlns="http://services.llbean.com/marketing/event/publication/v1_0">
         <responseSummary>
            <requestReceivedTimestamp>2014-07-20T12:00:00.100</requestReceivedTimestamp>
            <processingCompleteTimestamp>2014-07-20T12:00:00.150</processingCompleteTimestamp>
            <processingTimeMilliseconds>50</processingTimeMilliseconds>
            <requestorAuditId>2</requestorAuditId>
            <serviceAuditId>3</serviceAuditId>
            <unitOfWorkId>4</unitOfWorkId>
            <responseCode>00</responseCode>
            <responseDetailList/>
            <registryConsumerId>0</registryConsumerId>
            <registryContextId>1</registryContextId>
            <originatingRequestor>aRequestor</originatingRequestor>
            <originatingUserName>aUser</originatingUserName>
            <originatingTimestamp>2014-07-20T12:00:00.000</originatingTimestamp>
         </responseSummary>
         <eventGUID>someGUIDsomeGUIDsomeGUIDsomeGUID</eventGUID>
      </publishMarketingEventResponse>
   </soapenv:Body>
</soapenv:Envelope>
';

var options = { methods: ['GET','POST'] };

argo()
  .get('^/dogs$', options, function(handle) {
    handle('request', function(env, next) {
      env.response.statusCode = 200;
      env.response.body = 'hello';
      next(env);
    });
  }).listen(port);