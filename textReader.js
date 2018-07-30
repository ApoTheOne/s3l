const fs = require('fs')
const aws = require('aws-sdk');

var s3 = new aws.s3({
    maxRetries: 0,
    region: 'us-east-1'
});

exports.handler = function(event, context, callback) {
    console.log(event);
    var bucket = event.Records[0].s3.name;
    var srcKey = event.Records[0].s3.object.key;

    if (srcKey.match('/.txt$') === null) {
        var msg = `${srcKey} is not a txt file`;
        console.log(msg);
        return callback(null, { message: msg });
    }
    s3.getObject(
        {
            Bucket: bucket,
            Key: srcKey
        },
        function(err, data) {
            if (err) {
                return callback(err, null);
            }
            console.log(`Text file data: ${data.Body.toString('utf-8')}`);
            return callback(null, data);
        }
    );
};
