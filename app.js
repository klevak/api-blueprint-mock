

// Installation 
 
// 1. Install Node.js http://nodejs.org/download/
// 2. In Terminal, cd (navigate) to the directory where you saved this file
// 3. Run 'npm install request', let it install, then run 'npm install async'.
// 4. Edit the script config below with your token, org, app, and collection name.
// 5. To run the script, at the Terminal prompt, run 'node api_baas_deleter.js'
 
// Note: some minor updates were made to this file because.sillypeople
 
// Config
 
var access_token = "YWMtwMnb-iGIEeSfoFHasknjbAAAAUfqd1oItT1I2curL5Y0Js5TQh1nDn_fpnM";
var as_basepath = "http://api.llbean.com/appservices/v1/llbean-baas/sandbox/"; // You need the trailing slash!
var collection = "visitors";
 
// End Config
 
var request = require('request');
var async = require('async');
 
var authstring = "access_token=" + access_token; 
var qlstring = "ql=select * where isError = true";
 
var total = 0;
var startTime = Date.now();

function getRecords(){
    request.get(as_basepath + collection + "?" + qlstring + "&limit=10&" + authstring, function(e, r, data) {

        json = JSON.parse(data);
        if (json.count === undefined) {
              console.log("Error:  Check your basepath and collection name.");
              process.exit(1);
         }
        console.log("Got " + json.count + " entities");

        if (json.count > 0)
        {
            var records = [];
            for (var i = 0; i < json.count; i++) {

                console.log(json.entities[i].uuid);
                
                var getFunction = makeGetFunction(json.entities[i].uuid);
                
                records.push(getFunction);
            

            }
            
            async.parallel(records,function(err, results) {
                    console.log("Finished batch; re-running");
                    setTimeout(function() {
                        //getRecords();
                    }, 600); // Mandatory, since it seems to not retrieve entities if you make a request in < 600ms
                    return;
                });
            
        }
        else
        {
            console.log("No entities, exiting");
            var endTime = Date.now();
            console.log("Found a total of " + total + " entities in " + minutesFromMs(endTime - startTime));
            process.exit(0);
        }


    });
}
 
function deleteRecords() {
    console.log(as_basepath);

    request.get(as_basepath + collection + "?limit=50&" + authstring, function(e, r, data) {
        json = JSON.parse(data);
        if (json.count === undefined)
        {
            console.log("Error: invalid endpoint. Check your basepath and collection name.");
            process.exit(1);
        }
        console.log("Got " + json.count + " entities");

        if (json.count > 0)
        {
            var deletes = [];
            for (var i = 0; i < json.count; i++) {
                var deleteFunction = makeDeleteFunction(json.entities[i].uuid);
                deletes.push(deleteFunction);
            }
 
            async.parallel(
                deletes,
                function(err, results) {
                    console.log("Finished batch; re-running");
                    setTimeout(function() {
                        deleteRecords();
                    }, 600); // Mandatory, since it seems to not retrieve entities if you make a request in < 600ms
                    return;
                }
            );
        }
        else
        {
            console.log("No entities, exiting");
            var endTime = Date.now();
            console.log("Deleted a total of " + total + " entities in " + minutesFromMs(endTime - startTime));
            process.exit(0);
        }
    });
};
 
function makeDeleteFunction(uuid) {
    return function(callback) {
        console.log("deleted " + uuid);
        request.del(as_basepath + collection + "/" + uuid + "?" + authstring, function(e, r, data) {
            total++;
            callback(r.statusCode);
        });
    };
}

function makeGetFunction(uuid) {
    return function(callback) {
        console.log("get " + uuid);
        request.get(as_basepath + collection + "/" + uuid + "?" + authstring, function(e, r, data) {
            total++;
            callback(r.statusCode);
        });
    };
}
 
function minutesFromMs(time) {
    return Math.round(((time % 86400000) % 3600000) / 60000).toString() + " minutes"; // minutes
}
 
getRecords();

//deleteRecords();





