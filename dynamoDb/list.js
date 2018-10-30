const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-west-1',
    endpoint: 'http://localhost:8000'
});

// Uncomment above config and uncomment following in order to create DynamoDb table in web/cloud
// AWS.config.update({
//     region: 'eu-west-1'
// });
// // Setup aws credentials in the .aws folder using aws configure
// const credentials = new AWS.SharedIniFileCredentials({
//     profile: 'profileName'
// });
// AWS.config.credentials = credentials;

var ddb = new AWS.DynamoDB({ apiVersion: '2012-10-08' });

ddb.listTables({ Limit: 10 }, function(err, data) {
    if (err) {
        console.log('Error', err.code);
    } else {
        console.log('Table names are ', data.TableNames);
    }
});
